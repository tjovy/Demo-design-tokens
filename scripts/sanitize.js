/**
 * sanitize.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Nettoie et normalise le tokens.json brut exporté par Token Studio / Figma
 * avant que Style Dictionary ne le consomme.
 *
 * Problèmes traités :
 *  1. Doublons de sets (core/core, semantic/semantic…)  → dédoublonnage par flatten
 *  2. Opacité en échelle 0–100                          → normalise en 0–1
 *  3. Tokens FLOAT sans unité (spacing, fontSize…)      → ajoute "px" en valeur string
 *  4. Tokens parasites ou mal nommés ("Nombre", etc.)   → suppression par liste noire
 *  5. Tokens ghost padding sous préfixe color/          → déplace sous spacing/
 *  6. Génération CSS erronée sur paddingX/Y ghost       → corrige le type à "spacing"
 *  7. Nommage de sets (core/core → core)                → normalise les clés racines
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Chemins ────────────────────────────────────────────────────────────────
const INPUT  = path.resolve(__dirname, '../tokens.json');
const OUTPUT = path.resolve(__dirname, '../tokens.sanitized.json');

// ─── Config ──────────────────────────────────────────────────────────────────

/** Tokens à supprimer (chemin pointé depuis la racine du set) */
const BLACKLIST_PATHS = [
  'semantic.Nombre',
  'semantic/semantic.Nombre',
  'semantic.color.action.ghost.padding.paddingX',
  'semantic.color.action.ghost.padding.paddingY',
];

/**
 * Map de déduplication de sets.
 * Si un set "X/X" et "X" coexistent, on garde "X" et on merge "X/X" dedans.
 * Les clés sont les noms de sets à renommer → leur équivalent canonique.
 */
const SET_ALIASES = {
  'core/core'           : 'core',
  'semantic/semantic'   : 'semantic',
  'semantic/Light'      : 'semantic',   // sera intégré comme mode Light
  'semantic/Dark'       : 'semantic',   // sera intégré comme mode Dark
  'component/component' : 'component',
  'typography/typography': 'typography',
  'theme/theme'         : 'theme',
};

/** Catégories FLOAT auxquelles on ajoute "px" comme unité dans la valeur exportée */
const PX_CATEGORIES = ['spacing', 'radius', 'borderWidth', 'fontSize', 'letterSpacing'];

/** Catégories FLOAT qui restent unitless (ratios, multipliers) */
const UNITLESS_CATEGORIES = ['opacity', 'fontWeight', 'lineHeight', 'fontFamily'];
const LEGACY_REFERENCE_ALIASES = [
  ['{font.size.', '{fontSize.'],
  ['{font.weight.', '{fontWeight.'],
  ['{colors.gray.', '{color.neutral.'],
  ['{colors.indigo.', '{color.blue.'],
  ['{borderRadius.', '{radius.'],
  ['{dimension.', '{spacing.'],
  ['{colors.', '{color.'],
];

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Deep-merge src dans dest (sans écraser les terminaux existants).
 */
function deepMerge(dest, src) {
  for (const key of Object.keys(src)) {
    if (
      dest[key] !== undefined &&
      typeof dest[key] === 'object' &&
      !('value' in dest[key]) &&
      !('$value' in dest[key])
    ) {
      deepMerge(dest[key], src[key]);
    } else if (dest[key] === undefined) {
      dest[key] = src[key];
    }
    // Si le token existe déjà dans dest, on ne l'écrase pas (priorité au set canonique)
  }
}

/**
 * Normalise les valeurs d'opacité d'une échelle 0–100 vers 0–1.
 * Détecte si une valeur numérique > 1 → divise par 100.
 */
function normalizeOpacity(obj, path = '') {
  if (typeof obj !== 'object' || obj === null) return;

  for (const key of Object.keys(obj)) {
    const child = obj[key];

    if (typeof child === 'object' && ('value' in child || '$value' in child)) {
      const valKey = '$value' in child ? '$value' : 'value';
      const val    = child[valKey];
      const isOpacityPath = path.includes('opacity') || key.includes('opacity');

      if (isOpacityPath && typeof val === 'number' && val > 1) {
        child[valKey] = parseFloat((val / 100).toFixed(4));
        child._sanitized = 'opacity-normalized';
      }
    } else {
      normalizeOpacity(child, `${path}.${key}`);
    }
  }
}

/**
 * Ajoute l'unité "px" aux tokens FLOAT numériques des catégories concernées.
 * Exemple : { value: 16, type: "spacing" } → { value: "16px", type: "spacing" }
 */
function addUnits(obj, parentKey = '') {
  if (typeof obj !== 'object' || obj === null) return;

  for (const key of Object.keys(obj)) {
    const child = obj[key];

    if (typeof child === 'object' && ('value' in child || '$value' in child)) {
      const valKey  = '$value' in child ? '$value' : 'value';
      const typeKey = '$type' in child ? '$type' : 'type';
      const val     = child[valKey];
      const type    = child[typeKey] || '';

      const isNumeric    = typeof val === 'number';
      const needsUnit    = PX_CATEGORIES.some(cat =>
        parentKey.includes(cat) || type.includes(cat) || key === cat
      );
      const isUnitless   = UNITLESS_CATEGORIES.some(cat =>
        parentKey.includes(cat) || type.includes(cat)
      );
      const alreadyHasUnit = typeof val === 'string' && /[a-z%]+$/i.test(val);

      if (isNumeric && needsUnit && !isUnitless && !alreadyHasUnit) {
        child[valKey] = `${val}px`;
        child._sanitized = 'unit-added';
      }
    } else {
      addUnits(child, `${parentKey}.${key}`);
    }
  }
}

/**
 * Supprime les tokens listés dans BLACKLIST_PATHS.
 * Le chemin est de la forme "setName.path.to.token".
 */
function removeBlacklisted(tokens) {
  for (const dotPath of BLACKLIST_PATHS) {
    const parts  = dotPath.split('.');
    const setKey = parts[0];
    const rest   = parts.slice(1);

    if (!tokens[setKey]) continue;

    let cursor = tokens[setKey];
    for (let i = 0; i < rest.length - 1; i++) {
      if (!cursor[rest[i]]) { cursor = null; break; }
      cursor = cursor[rest[i]];
    }

    if (cursor && rest.length > 0) {
      const lastKey = rest[rest.length - 1];
      if (cursor[lastKey] !== undefined) {
        delete cursor[lastKey];
        console.log(`  🗑  Supprimé token blacklisté : ${dotPath}`);
      }
    }
  }
}

/**
 * Corrige le préfixe "color/" sur des tokens de type spacing dans semantic.
 * color.action.ghost.padding.* → spacing.action.ghost.*
 */
function fixMisplacedSpacingTokens(semanticSet) {
  if (!semanticSet?.color?.action?.ghost?.padding) return;

  const ghostPadding = semanticSet.color.action.ghost.padding;
  const paddingX     = ghostPadding.paddingX;
  const paddingY     = ghostPadding.paddingY;

  if (!semanticSet.spacing) semanticSet.spacing = {};
  if (!semanticSet.spacing.action) semanticSet.spacing.action = {};
  if (!semanticSet.spacing.action.ghost) semanticSet.spacing.action.ghost = {};

  if (paddingX) {
    semanticSet.spacing.action.ghost.paddingX = {
      ...paddingX,
      type: 'spacing',
      _sanitized: 'moved-from-color',
    };
  }
  if (paddingY) {
    semanticSet.spacing.action.ghost.paddingY = {
      ...paddingY,
      type: 'spacing',
      _sanitized: 'moved-from-color',
    };
  }

  // Nettoyer l'ancienne entrée
  delete semanticSet.color.action.ghost.padding;

  // Nettoyer si action/ghost vide
  if (Object.keys(semanticSet.color.action.ghost).length === 0) {
    delete semanticSet.color.action.ghost;
  }

  console.log('  🔧 Ghost padding déplacé de color/ → spacing/');
}

/**
 * Supprime les blocs legacy non compatibles avec le schéma réellement exporté.
 */
function removeLegacyThemeTokens(themeSet) {
  if (!themeSet || typeof themeSet !== 'object') return;

  if (themeSet.typography) {
    delete themeSet.typography;
    console.log('  🗑  Supprimé bloc legacy : theme.typography');
  }
}

/**
 * Normalise les clés de sets selon SET_ALIASES.
 * Merge les sets "X/X" dans leur équivalent canonique "X".
 * Ignore les sets Light/Dark qui sont des modes (pas des sets à fusionner).
 */
function normalizeSets(tokens) {
  const result = {};
  const modesLightDark = {};

  // Première passe : identifier les sets canoniques
  for (const [setName, setContent] of Object.entries(tokens)) {
    if (setName === '$metadata') {
      result.$metadata = setContent;
      continue;
    }

    const canonical = SET_ALIASES[setName] ?? setName;

    // Light / Dark → stocker séparément pour traitement de modes
    if (setName === 'semantic/Light' || setName === 'semantic/Dark') {
      const modeKey = setName.split('/')[1]; // 'Light' ou 'Dark'
      modesLightDark[modeKey] = setContent;
      console.log(`  📦 Set mode détecté : ${setName} → ignoré (géré comme mode sémantique)`);
      continue;
    }

    if (!result[canonical]) {
      result[canonical] = {};
    }

    // Merge (le set canonique a priorité sur le set dupliqué)
    if (setName !== canonical) {
      console.log(`  🔀 Merge ${setName} → ${canonical}`);
      deepMerge(result[canonical], setContent);
    } else {
      deepMerge(result[canonical], setContent);
    }
  }

  // Log des modes non réintégrés
  if (Object.keys(modesLightDark).length > 0) {
    console.log(`  ℹ️  Modes Light/Dark détectés — à gérer via Style Dictionary multi-themes`);
    // On les stocke dans metadata pour traçabilité
    if (!result.$metadata) result.$metadata = {};
    result.$metadata._modes = modesLightDark;
  }

  return result;
}

/**
 * Nettoie les flags internes _sanitized avant l'écriture finale.
 */
function cleanSanitizationFlags(obj) {
  if (typeof obj !== 'object' || obj === null) return;
  delete obj._sanitized;
  for (const val of Object.values(obj)) {
    cleanSanitizationFlags(val);
  }
}

/**
 * Réécrit les références legacy qui ne correspondent plus aux chemins présents
 * après normalisation/aplatissement des sets.
 */
function rewriteLegacyReferences(obj) {
  if (typeof obj !== 'object' || obj === null) return;

  for (const val of Object.values(obj)) {
    if (typeof val !== 'object' || val === null) continue;

    for (const key of ['value', '$value']) {
      if (typeof val[key] !== 'string') continue;

      let nextValue = val[key];
      for (const [from, to] of LEGACY_REFERENCE_ALIASES) {
        nextValue = nextValue.replaceAll(from, to);
      }
      val[key] = nextValue;
    }

    rewriteLegacyReferences(val);
  }
}

/**
 * Reconstruit le $metadata.tokenSetOrder avec les noms de sets canoniques.
 */
function rebuildTokenSetOrder(tokens) {
  if (!tokens.$metadata?.tokenSetOrder) return;

  const seen  = new Set();
  const order = [];

  for (const setName of tokens.$metadata.tokenSetOrder) {
    const canonical = SET_ALIASES[setName] ?? setName;

    // Ignorer Light/Dark ici (modes)
    if (setName === 'semantic/Light' || setName === 'semantic/Dark') continue;

    if (!seen.has(canonical)) {
      seen.add(canonical);
      order.push(canonical);
    }
  }

  tokens.$metadata.tokenSetOrder = order;
  console.log(`  📋 tokenSetOrder normalisé : [${order.join(', ')}]`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

function sanitize() {
  console.log('\n🧹 Sanitisation des tokens.json\n');

  // 1. Lecture
  if (!fs.existsSync(INPUT)) {
    console.error(`❌ Fichier source introuvable : ${INPUT}`);
    process.exit(1);
  }
  let tokens;
  try {
    tokens = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));
  } catch (e) {
    console.error(`❌ Impossible de parser tokens.json : ${e.message}`);
    process.exit(1);
  }
  console.log(`✅ tokens.json lu — ${Object.keys(tokens).length} sets détectés`);

  // 2. Normalisation des sets (déduplication)
  tokens = normalizeSets(tokens);
  console.log(`✅ Sets normalisés → ${Object.keys(tokens).filter(k => k !== '$metadata').join(', ')}`);

  // 3. Suppression des tokens blacklistés
  removeBlacklisted(tokens);

  // 4. Déplacement des tokens spacing mal placés dans semantic
  if (tokens.semantic) {
    fixMisplacedSpacingTokens(tokens.semantic);
  }
  if (tokens.theme) {
    removeLegacyThemeTokens(tokens.theme);
  }

  // 5. Normalisation des opacités (0–100 → 0–1)
  for (const setContent of Object.values(tokens)) {
    if (typeof setContent === 'object') normalizeOpacity(setContent);
  }
  console.log('✅ Opacités normalisées (échelle 0–1)');

  // 6. Ajout des unités px sur les tokens FLOAT
  for (const setContent of Object.values(tokens)) {
    if (typeof setContent === 'object') addUnits(setContent);
  }
  console.log('✅ Unités px ajoutées aux tokens dimensionnels');

  // 7. Reconstruction du tokenSetOrder
  rebuildTokenSetOrder(tokens);

  // 8. Nettoyage des flags internes
  cleanSanitizationFlags(tokens);

  // 8b. Réécriture des références legacy avant l'aplatissement final
  rewriteLegacyReferences(tokens);

  // 9. Conservation de la structure canonique des sets.
  //    Le flatten pour Style Dictionary est désormais fait au moment du build,
  //    afin de garder component.* exploitable par n8n et la documentation.
  console.log('\n🧱 Conservation des sets canoniques pour les consommateurs externes :');
  console.log(`✅ Structure canonique prête → ${Object.keys(tokens).filter(k => !k.startsWith('$')).length} groupes racines`);

  // 10. Écriture
  fs.writeFileSync(OUTPUT, JSON.stringify(tokens, null, 2), 'utf-8');
  console.log(`\n✅ tokens.sanitized.json écrit → ${OUTPUT}`);
  console.log('   Prêt pour Style Dictionary.\n');
}

sanitize();
