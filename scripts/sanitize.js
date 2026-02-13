/**
 * sanitize.js - Le Nettoyeur Universel DesignOps
 * ------------------------------------------------
 * Scanne profondément le JSON pour éliminer :
 * 1. Les métadonnées inutiles de Figma Tokens
 * 2. Les liens morts (alias non résolus contenant '{' et '}')
 * 3. Les dossiers/groupes devenus vides après le nettoyage
 */

const fs = require('fs');

// Vérifie si un objet est un "Design Token" (il possède une clé value ou $value)
function isToken(obj) {
  return obj && typeof obj === 'object' && ('value' in obj || '$value' in obj);
}

// Fonction récursive qui nettoie l'arbre depuis les feuilles jusqu'à la racine
function sanitizeTokens(obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  let isEmpty = true;

  for (const key in obj) {
    // 1. Élimination des métadonnées Figma Studio
    if (key === '$themes' || key === '$metadata') {
      delete obj[key];
      continue;
    }

    const child = obj[key];

    if (isToken(child)) {
      // 2. Détection des tokens
      const val = child.value !== undefined ? child.value : child.$value;
      
      // On convertit la valeur en texte (utile si c'est un tableau complexe d'ombres)
      const valStr = typeof val === 'object' ? JSON.stringify(val) : String(val);

      // Si la valeur contient encore des accolades, c'est un lien mort !
      if (valStr.includes('{') && valStr.includes('}')) {
        console.log(`🧹 Suppression du token mort : "${key}" (Raison: Alias introuvable)`);
        delete obj[key];
      } else {
        isEmpty = false; // Le token est sain, le dossier n'est donc pas vide
      }
    } else if (typeof child === 'object' && !Array.isArray(child)) {
      // 3. C'est un sous-dossier, on plonge dedans (Récursivité)
      const childIsEmpty = sanitizeTokens(child);
      
      // 4. Nettoyage des dossiers fantômes
      if (childIsEmpty) {
        delete obj[key]; // Si le sous-dossier est vide, on le supprime
      } else {
        isEmpty = false;
      }
    } else {
      // Autres types de données (tableaux purs, etc.)
      isEmpty = false;
    }
  }

  // Retourne 'true' si le dossier actuel ne contient plus aucun token valide
  return isEmpty; 
}

// ── EXÉCUTION ──
const filePath = 'tokens-fixed.json';

try {
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    console.log('🔍 Début de l\'audit universel du JSON...');
    sanitizeTokens(data);
    
    // On réécrit le fichier propre pour Style Dictionary
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('✅ Nettoyage terminé : Le JSON est purifié et prêt à être compilé.');
  } else {
    console.warn(`⚠️ Fichier introuvable : ${filePath}. Avez-vous lancé token-transformer ?`);
  }
} catch (err) {
  console.error('❌ Erreur critique lors du nettoyage :', err);
  process.exit(1); // Fait échouer GitHub Actions en cas de vrai bug script
}