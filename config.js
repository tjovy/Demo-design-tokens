const collidingScales = new Set(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']);
const collidingWeights = new Set(['regular', 'medium', 'semibold', 'bold']);

function isLegacyCollision(token) {
  const [root, key] = token.path;
  return (
    (root === 'fontSize' && collidingScales.has(key)) ||
    (root === 'fontWeight' && collidingWeights.has(key))
  );
}

module.exports = {
  source: ['tokens-fixed.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          // Keep canonical tokens (font.size / font.weight) and skip legacy duplicates.
          filter: (token) => !isLegacyCollision(token),
        },
      ],
    },
  },
};
