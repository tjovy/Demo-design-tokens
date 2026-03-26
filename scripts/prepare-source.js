const fs = require('fs');

const SOURCE_FILE = 'tokens.json';
const OUTPUT_FILE = 'tokens-build-source.json';

function removeSlashKeys(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    return node;
  }

  const cleaned = {};

  for (const [key, value] of Object.entries(node)) {
    if (key.includes('/')) {
      continue;
    }
    cleaned[key] = removeSlashKeys(value);
  }

  return cleaned;
}

try {
  const source = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
  const cleaned = removeSlashKeys(source);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cleaned, null, 2));
  console.log(`✅ Source préparée : ${OUTPUT_FILE}`);
} catch (error) {
  console.error('❌ Impossible de préparer la source tokens :', error);
  process.exit(1);
}
