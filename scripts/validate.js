/**
 * validate.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Valide tokens.sanitized.json AVANT que Style Dictionary ne le consomme.
 * Détecte les problèmes qui causeraient une génération CSS erronée.
 *
 * Checks effectués :
 *  1. Tokens FLOAT dimensionnels sans unité (génèrent "--spacing-4: 16" unitless)
 *  2. Tokens opacité hors range 0–1
 *  3. Tokens COLOR de type spacing (bug ghost padding)
 *  4. Tokens sans type déclaré
 *  5. Alias brisés (référence vers token inexistant)
 *  6. Tokens avec nom non-conforme (espaces, majuscules parasites)
 *  7. Tokens parasites dans la blacklist
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { createBuildView } = require('./build-view');

const SOURCE = path.resolve(__dirname, '../tokens.sanitized.json');

// ─── Config ───────────────────────────────────────────────────────────────────

const DIMENSIONAL_TYPES = ['spacing', 'fontSize', 'borderRadius', 'borderWidth', 'radius', 'size', 'dimension'];

const BLACKLISTED_NAMES = ['Nombre', 'test', 'Test', 'temp', 'TODO'];

// ─── Collecte de tous les tokens (flatten) ────────────────────────────────────

function collectTokens(obj, prefix = '', tokens = []) {
  if (!obj || typeof obj !== 'object') return tokens;

  for (const [key, val] of Object.entries(obj)) {
    if (key === '$metadata' || key === '_modes') continue;

    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (typeof val === 'object' && ('value' in val || '$value' in val)) {
      tokens.push({
        path: currentPath,
        value: val.value ?? val.$value,
        type: val.type ?? val.$type ?? null,
        raw: val,
      });
    } else if (typeof val === 'object') {
      collectTokens(val, currentPath, tokens);
    }
  }

  return tokens;
}

/**
 * Construit un Set de tous les chemins de tokens pour valider les alias.
 */
function buildPathSet(tokens) {
  return new Set(tokens.map(t => t.path));
}

/**
 * Résout un alias "{a.b.c}" en chemin "a.b.c".
 */
function resolveAliasPath(aliasStr) {
  const match = aliasStr.match(/^\{(.+)\}$/);
  return match ? match[1] : null;
}

// ─── Checks ───────────────────────────────────────────────────────────────────

function checkDimensionalUnits(tokens) {
  const issues = [];
  for (const t of tokens) {
    if (!DIMENSIONAL_TYPES.includes(t.type)) continue;
    if (typeof t.value === 'number') {
      issues.push({
        path: t.path,
        issue: `FLOAT sans unité`,
        detail: `value=${t.value} type=${t.type} → devrait être "${t.value}px"`,
        severity: 'ERROR',
      });
    }
  }
  return issues;
}

function checkOpacityRange(tokens) {
  const issues = [];
  for (const t of tokens) {
    if (t.type !== 'opacity') continue;
    const v = parseFloat(t.value);
    if (!isNaN(v) && v > 1) {
      issues.push({
        path: t.path,
        issue: `Opacité hors range CSS`,
        detail: `value=${t.value} → devrait être entre 0 et 1`,
        severity: 'ERROR',
      });
    }
  }
  return issues;
}

function checkMisplacedSpacing(tokens) {
  const issues = [];
  for (const t of tokens) {
    if (t.type !== 'spacing') continue;
    if (t.path.includes('.color.')) {
      issues.push({
        path: t.path,
        issue: `Token spacing dans namespace color/`,
        detail: `type=spacing mais chemin contient ".color." → CSS générerait une couleur`,
        severity: 'ERROR',
      });
    }
  }
  return issues;
}

function checkMissingTypes(tokens) {
  const issues = [];
  for (const t of tokens) {
    if (!t.type) {
      // Uniquement alerter si c'est une valeur littérale (pas un alias)
      const isAlias = typeof t.value === 'string' && t.value.startsWith('{');
      if (!isAlias) {
        issues.push({
          path: t.path,
          issue: `Type manquant`,
          detail: `value="${t.value}" sans type déclaré — Style Dictionary utilisera le fallback`,
          severity: 'WARN',
        });
      }
    }
  }
  return issues;
}

function checkBrokenAliases(tokens, pathSet) {
  const issues = [];
  for (const t of tokens) {
    if (typeof t.value !== 'string') continue;
    const aliasPath = resolveAliasPath(t.value);
    if (!aliasPath) continue;

    if (!pathSet.has(aliasPath)) {
      issues.push({
        path: t.path,
        issue: `Alias brisé`,
        detail: `Référence vers "${t.value}" introuvable dans le fichier`,
        severity: 'ERROR',
      });
    }
  }
  return issues;
}

function checkBlacklistedNames(tokens) {
  const issues = [];
  for (const t of tokens) {
    const lastName = t.path.split('.').pop();
    if (BLACKLISTED_NAMES.includes(lastName)) {
      issues.push({
        path: t.path,
        issue: `Nom blacklisté`,
        detail: `"${lastName}" est un reliquat ou token de test`,
        severity: 'ERROR',
      });
    }
  }
  return issues;
}

function checkNamingConventions(tokens) {
  const issues = [];
  for (const t of tokens) {
    const parts = t.path.split('.');
    for (const part of parts) {
      // Pas d'espaces
      if (/\s/.test(part)) {
        issues.push({ path: t.path, issue: `Espace dans le nom`, detail: `"${part}"`, severity: 'ERROR' });
      }
      // Pas de camelCase mixte (OK: camelCase dans les noms de composants, PAS dans les paths)
      // Vérification légère : pas de majuscule en début sauf les nombres
      if (/^[A-Z][a-z]/.test(part) && !/^\d/.test(part)) {
        issues.push({ path: t.path, issue: `Majuscule initiale non-standard`, detail: `"${part}"`, severity: 'WARN' });
      }
    }
  }
  return issues;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function validate() {
  console.log('\n🔍 Validation de tokens.sanitized.json\n');

  if (!fs.existsSync(SOURCE)) {
    console.error(`❌ Fichier introuvable : ${SOURCE}`);
    console.error('   Exécutez d\'abord : npm run sanitize');
    process.exit(1);
  }

  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(SOURCE, 'utf-8'));
  } catch (e) {
    console.error(`❌ JSON invalide : ${e.message}`);
    process.exit(1);
  }

  const buildView = createBuildView(raw);
  const tokens  = collectTokens(buildView);
  const pathSet = buildPathSet(tokens);

  console.log(`   ${tokens.length} tokens collectés\n`);

  // Lancer tous les checks
  const allIssues = [
    ...checkDimensionalUnits(tokens),
    ...checkOpacityRange(tokens),
    ...checkMisplacedSpacing(tokens),
    ...checkMissingTypes(tokens),
    ...checkBrokenAliases(tokens, pathSet),
    ...checkBlacklistedNames(tokens),
    ...checkNamingConventions(tokens),
  ];

  const errors = allIssues.filter(i => i.severity === 'ERROR');
  const warns  = allIssues.filter(i => i.severity === 'WARN');

  // Affichage
  if (errors.length > 0) {
    console.error(`❌ ${errors.length} ERREUR(S) bloquante(s) :\n`);
    for (const e of errors) {
      console.error(`   [ERROR] ${e.path}`);
      console.error(`           ${e.issue} — ${e.detail}\n`);
    }
  }

  if (warns.length > 0) {
    console.warn(`⚠️  ${warns.length} AVERTISSEMENT(S) :\n`);
    for (const w of warns) {
      console.warn(`   [WARN]  ${w.path}`);
      console.warn(`           ${w.issue} — ${w.detail}\n`);
    }
  }

  if (allIssues.length === 0) {
    console.log('✅ Aucun problème détecté — tokens.sanitized.json est prêt pour le build.\n');
  }

  // Exit code non-zéro si erreurs bloquantes
  if (errors.length > 0) {
    console.error(`\n🚫 Build bloqué : ${errors.length} erreur(s) à corriger dans sanitize.js ou dans Figma.\n`);
    process.exit(1);
  }

  console.log(`✅ Validation OK — ${warns.length} avertissement(s) non-bloquant(s).\n`);
}

validate();
