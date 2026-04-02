'use strict';

function deepMerge(dest, src) {
  for (const key of Object.keys(src)) {
    if (
      dest[key] !== undefined &&
      typeof dest[key] === 'object' &&
      dest[key] !== null &&
      typeof src[key] === 'object' &&
      src[key] !== null &&
      !('value' in dest[key]) &&
      !('$value' in dest[key])
    ) {
      deepMerge(dest[key], src[key]);
    } else if (dest[key] === undefined) {
      dest[key] = src[key];
    }
  }
}

function removeCollidingFontAliases(tokens) {
  if (tokens.font?.size) {
    delete tokens.font.size;
  }

  if (tokens.font?.weight) {
    delete tokens.font.weight;
  }
}

function normalizeTopLevelPaletteNames(tokens) {
  if (tokens.Blue && !tokens.blue) {
    tokens.blue = tokens.Blue;
    delete tokens.Blue;
  }
}

function flattenSetsForBuild(tokens) {
  const EXCLUDE = new Set(['$metadata', '$themes', 'light', 'light/light', 'dark', 'dark/dark']);
  const MERGE_ORDER = ['core', 'semantic', 'component', 'typography', 'theme'];
  const result = {};
  const modes = {};

  for (const [setName, setContent] of Object.entries(tokens)) {
    if (setName === 'light' || setName === 'light/light') {
      deepMerge(modes, { light: setContent });
    } else if (setName === 'dark' || setName === 'dark/dark') {
      deepMerge(modes, { dark: setContent });
    }
  }

  const unlisted = Object.keys(tokens).filter(
    (key) => !EXCLUDE.has(key) && !MERGE_ORDER.includes(key)
  );

  for (const setName of [...unlisted, ...MERGE_ORDER]) {
    if (EXCLUDE.has(setName) || !tokens[setName]) continue;

    const setContent = tokens[setName];
    if (typeof setContent !== 'object' || setContent === null) continue;

    if (setName === 'theme' && modes.light) {
      deepMerge(result, modes.light);
    }

    deepMerge(result, setContent);
  }

  return result;
}

function createBuildView(tokens) {
  const flat = flattenSetsForBuild(tokens);
  removeCollidingFontAliases(flat);
  normalizeTopLevelPaletteNames(flat);
  return flat;
}

module.exports = {
  createBuildView,
};
