/**
 * config.js  — Style Dictionary v4 configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * Consomme tokens.sanitized.json (produit par sanitize.js).
 * Génère : CSS custom properties, SCSS variables, JS/TS exports, JSON résolu.
 *
 * API v4 :
 *  - new StyleDictionary(config) au lieu de StyleDictionary.extend(config)
 *  - buildAllPlatforms() est async
 *  - Les transforms/formats/parsers passent par config.hooks (plus de méthodes statiques)
 *  - filter remplace matcher, transform remplace transformer
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

const path            = require('path');
const { createBuildView } = require('./scripts/build-view');

// ─── Constantes ──────────────────────────────────────────────────────────────

const TOKENS_SOURCE = path.resolve(__dirname, 'tokens.sanitized.json');
const BUILD_PATH    = path.resolve(__dirname, 'build');
const TARGET_PLATFORMS = process.argv.slice(2);

// ─── Dimensions : types qui nécessitent une unité px ────────────────────────

const DIMENSIONAL_TYPES = [
  'spacing', 'fontSize', 'borderRadius', 'borderWidth',
  'size', 'dimension', 'radius',
];

// ─── Config Style Dictionary v4 ──────────────────────────────────────────────

async function buildTokens() {
  const { default: StyleDictionary } = await import('style-dictionary');

  const sd = new StyleDictionary({
    source: [TOKENS_SOURCE],
    parsers: ['ds/parser'],
    // ── Hooks : remplace les méthodes statiques registerXxx de v3 ─────────────
    hooks: {

    // ── Parsers ──────────────────────────────────────────────────────────────
    parsers: {
      'ds/parser': {
        pattern: /tokens\.sanitized\.json$/,
        parser: ({ contents }) => {
          const tokens = JSON.parse(contents);
          return createBuildView(tokens);
        },
      },
    },

    // ── Transforms custom ────────────────────────────────────────────────────
    transforms: {

      /**
       * ds/size/px
       * Garantit que les tokens dimensionnels numériques ont une unité px.
       * Sécurité supplémentaire au cas où sanitize.js aurait raté un token.
       */
      'ds/size/px': {
        type: 'value',
        filter: (token) => {
          const type = token.$type ?? token.type ?? '';
          return DIMENSIONAL_TYPES.includes(type) && typeof token.value === 'number';
        },
        transform: (token) => `${token.value}px`,
      },

      /**
       * ds/opacity/decimal
       * Normalise l'opacité > 1 (échelle 0–100) en décimal CSS (0–1).
       */
      'ds/opacity/decimal': {
        type: 'value',
        filter: (token) => {
          const type = token.$type ?? token.type ?? '';
          return type === 'opacity' && typeof token.value === 'number' && token.value > 1;
        },
        transform: (token) => parseFloat((token.value / 100).toFixed(4)),
      },
    },

    // ── Transform Groups custom ───────────────────────────────────────────────
    // En v4, la valeur est directement un tableau de noms de transforms (pas un objet).
    // Noms v4 : name/kebab (ex name/cti/kebab), name/pascal (ex name/cti/pascal)
    // content/icon supprimé en v4 (remplacé par html/icon, non nécessaire pour CSS)
    transformGroups: {
      'ds/css': [
        'attribute/cti',
        'name/kebab',
        'time/seconds',
        'color/css',
        'ds/size/px',
        'ds/opacity/decimal',
      ],
      'ds/scss': [
        'attribute/cti',
        'name/kebab',
        'color/css',
        'ds/size/px',
        'ds/opacity/decimal',
      ],
      'ds/js': [
        'attribute/cti',
        'name/pascal',
        'color/hex',
        'ds/size/px',
        'ds/opacity/decimal',
      ],
    },

    // ── Formats custom ───────────────────────────────────────────────────────
    formats: {

      /**
       * ds/css/variables
       * CSS custom properties, avec descriptions optionnelles.
       */
      'ds/css/variables': ({ dictionary, options }) => {
        const selector = options?.selector ?? ':root';
        const includeDescriptions =
          options?.includeDescriptions === true ||
          options?.includeDescriptions === 'true';
        const lines    = [`${selector} {`];

        for (const token of dictionary.allTokens) {
          if (includeDescriptions && token.description) {
            const descLine = token.description
              .split('\n')[0]
              .replace(/^##?\s*/, '')
              .trim();
            if (descLine) lines.push(`\n  /* ${descLine} */`);
          }
          lines.push(`  --${token.name}: ${token.value};`);
        }

        lines.push('}');
        return lines.join('\n');
      },
    },
  },

  // ── Platforms ────────────────────────────────────────────────────────────
  platforms: {

    // ── CSS ──────────────────────────────────────────────────────────────────
    css: {
      transformGroup: 'ds/css',
      buildPath: `${BUILD_PATH}/css/`,
      files: [
        {
          destination: 'variables.css',
          format: 'ds/css/variables',
          options: {
            selector: ':root',
            outputReferences: true,
            showFileHeader: false,
            includeDescriptions: false,
          },
        },
      ],
    },

    // ── SCSS ─────────────────────────────────────────────────────────────────
    scss: {
      transformGroup: 'ds/scss',
      buildPath: `${BUILD_PATH}/scss/`,
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
          options: { outputReferences: true },
        },
      ],
    },

    // ── JS ───────────────────────────────────────────────────────────────────
    js: {
      transformGroup: 'ds/js',
      buildPath: `${BUILD_PATH}/js/`,
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },

    // ── TypeScript ───────────────────────────────────────────────────────────
    ts: {
      transformGroup: 'ds/js',
      buildPath: `${BUILD_PATH}/ts/`,
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },

    // ── JSON résolu (pour Storybook) ─────────────────────────────────────────
    json: {
      transformGroup: 'ds/css',
      buildPath: `${BUILD_PATH}/`,
      files: [
        {
          destination: 'tokens-resolved.json',
          format: 'json/nested',
          options: { outputReferences: false },
        },
      ],
    },
  },
  });

  try {
    if (TARGET_PLATFORMS.length > 0) {
      for (const platform of TARGET_PLATFORMS) {
        await sd.buildPlatform(platform);
      }
      console.log(`\n✅ Style Dictionary build terminé → ${TARGET_PLATFORMS.join(', ')}\n`);
    } else {
      await sd.buildAllPlatforms();
      console.log('\n✅ Style Dictionary build terminé → build/\n');
    }
  } catch (e) {
    console.error('\n❌ Style Dictionary build échoué :', e.message);
    if (e.stack) console.error(e.stack);
    process.exit(1);
  }
}

// ─── Build (async en v4) ──────────────────────────────────────────────────────

buildTokens();
