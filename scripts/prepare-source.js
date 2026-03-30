const fs = require('fs');

const SOURCE_FILE = 'tokens.json';
const OUTPUT_FILE = 'tokens-build-source.json';

/**
 * Deep merge: source values override target values.
 * Figma exports tokens in both "core" (stale cache) and "core/core" (fresh).
 * We merge "core/core" INTO "core" so the latest Figma values win.
 */
function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (
      value && typeof value === 'object' && !Array.isArray(value) &&
      target[key] && typeof target[key] === 'object' && !Array.isArray(target[key]) &&
      !('value' in value) && !('$value' in value)
    ) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

/**
 * For each top-level key like "core/core", merge it into "core".
 * Then remove all slash keys. This ensures Figma's latest values
 * always override stale cached copies.
 */
function prepareSource(source) {
  // Step 1: merge slash keys into their base (e.g. "core/core" → "core")
  for (const key of Object.keys(source)) {
    if (!key.includes('/')) continue;
    const base = key.split('/')[0];
    if (source[base] && typeof source[base] === 'object') {
      deepMerge(source[base], source[key]);
    } else {
      source[base] = source[key];
    }
    delete source[key];
  }

  // Step 2: remove $themes / $metadata
  delete source['$themes'];
  delete source['$metadata'];

  return source;
}

try {
  const source = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
  const cleaned = prepareSource(source);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cleaned, null, 2));
  console.log(`✅ Source préparée : ${OUTPUT_FILE}`);
} catch (error) {
  console.error('❌ Impossible de préparer la source tokens :', error);
  process.exit(1);
}
