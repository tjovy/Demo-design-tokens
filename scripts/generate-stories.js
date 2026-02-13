/**
 * generate-stories.js (React version — Zeroheight quality)
 * 
 * Lit tokens.json et génère des stories React avec :
 * - Swatches couleurs cliquables (copie la variable CSS)
 * - Preview live des composants (boutons, inputs, cards, badges)
 * - Design soigné, typographie Inter
 * - Infos complètes : nom, valeur, référence, description
 * 
 * Usage : node scripts/generate-stories.js
 */

const fs = require('fs');
const path = require('path');

const TOKENS_PATH = path.join(__dirname, '..', 'tokens.json');
const STORIES_DIR = path.join(__dirname, '..', 'stories');

const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));

if (!fs.existsSync(STORIES_DIR)) {
  fs.mkdirSync(STORIES_DIR, { recursive: true });
}

// ── SHARED STYLES ──────────────────────────────────────────

const SHARED_CSS = `
/* Design System Documentation Styles */
.ds-page {
  padding: 40px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  color: #111827;
  -webkit-font-smoothing: antialiased;
}
.ds-page-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid #E5E7EB;
}
.ds-page-title {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
}
.ds-page-subtitle {
  font-size: 15px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
}
.ds-section {
  margin-bottom: 48px;
}
.ds-section-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 20px 0;
  letter-spacing: -0.01em;
}
.ds-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #F3F4F6;
  color: #6B7280;
  margin-left: 8px;
  vertical-align: middle;
}

/* ── Color Swatches ── */
.ds-color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}
.ds-swatch {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #F3F4F6;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
}
.ds-swatch:hover {
  border-color: #D1D5DB;
  background: #FAFAFA;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.ds-swatch-color {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.06);
}
.ds-swatch-info {
  flex: 1;
  min-width: 0;
}
.ds-swatch-name {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ds-swatch-value {
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  color: #9CA3AF;
}
.ds-swatch-desc {
  font-size: 11px;
  color: #9CA3AF;
  margin-top: 2px;
}
.ds-copied {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 11px;
  font-weight: 500;
  color: #16A34A;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.ds-copied.show {
  opacity: 1;
}

/* ── Spacing ── */
.ds-spacing-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #F9FAFB;
}
.ds-spacing-label {
  width: 60px;
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  text-align: right;
  flex-shrink: 0;
}
.ds-spacing-bar-container {
  flex: 1;
  height: 36px;
  display: flex;
  align-items: center;
}
.ds-spacing-bar {
  height: 100%;
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  border-radius: 6px;
  transition: width 0.3s ease;
  min-width: 4px;
}
.ds-spacing-value {
  width: 60px;
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  color: #6B7280;
  text-align: right;
  flex-shrink: 0;
}

/* ── Radius ── */
.ds-radius-grid {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.ds-radius-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.ds-radius-box {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  transition: border-radius 0.3s ease;
}
.ds-radius-label {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
}
.ds-radius-value {
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  color: #9CA3AF;
}

/* ── Shadows ── */
.ds-shadow-grid {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding: 24px 0;
}
.ds-shadow-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.ds-shadow-box {
  width: 140px;
  height: 100px;
  background: #FFFFFF;
  border-radius: 12px;
}
.ds-shadow-label {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
}
.ds-shadow-value {
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  color: #9CA3AF;
  max-width: 160px;
  text-align: center;
  line-height: 1.4;
}

/* ── Opacity ── */
.ds-opacity-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
}
.ds-opacity-label {
  width: 40px;
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  text-align: right;
  flex-shrink: 0;
}
.ds-opacity-preview {
  width: 140px;
  height: 36px;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
.ds-opacity-checker {
  position: absolute;
  inset: 0;
  background: repeating-conic-gradient(#E5E7EB 0% 25%, transparent 0% 50%) 50% / 12px 12px;
}
.ds-opacity-fill {
  position: absolute;
  inset: 0;
  background: #3B82F6;
}
.ds-opacity-value {
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  color: #6B7280;
}

/* ── Typography ── */
.ds-type-item {
  padding: 24px 0;
  border-bottom: 1px solid #F3F4F6;
}
.ds-type-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.ds-type-tag {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #3B82F6;
  background: #EFF6FF;
  padding: 3px 8px;
  border-radius: 4px;
}
.ds-type-sample {
  color: #111827;
  margin: 0 0 12px 0;
  font-family: 'Inter', sans-serif;
}
.ds-type-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.ds-type-meta-item {
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'JetBrains Mono', monospace;
}
.ds-type-meta-item span {
  color: #6B7280;
}

/* ── Semantic Tokens ── */
.ds-token-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  overflow: hidden;
}
.ds-token-table th {
  text-align: left;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6B7280;
  background: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
}
.ds-token-table td {
  padding: 10px 16px;
  font-size: 13px;
  border-bottom: 1px solid #F3F4F6;
  vertical-align: middle;
}
.ds-token-table tr:last-child td {
  border-bottom: none;
}
.ds-token-table tr:hover td {
  background: #FAFAFA;
}
.ds-token-name {
  font-weight: 500;
  color: #111827;
}
.ds-token-ref {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #9CA3AF;
}
.ds-token-resolved {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #6B7280;
}
.ds-mini-swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.06);
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}

/* ── Component Preview ── */
.ds-preview-section {
  margin-bottom: 40px;
}
.ds-preview-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #9CA3AF;
  margin-bottom: 16px;
}
.ds-preview-box {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
.ds-preview-box-dark {
  background: #111827;
}
.ds-preview-box-grid {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
`;

// ── CSS FILE ──────────────────────────────────────────

fs.writeFileSync(path.join(STORIES_DIR, 'ds-styles.css'), SHARED_CSS);
console.log('  ✓ ds-styles.css');

// ── HELPERS ──────────────────────────────────────────

function flattenTokens(obj, prefix = '') {
  const results = [];
  for (const [key, val] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object' && 'value' in val) {
      results.push({
        path: currentPath,
        value: val.value,
        type: val.type || '',
        description: val.description || null,
        cssVar: `--${currentPath}`,
      });
    } else if (val && typeof val === 'object') {
      results.push(...flattenTokens(val, currentPath));
    }
  }
  return results;
}

const allCoreTokens = flattenTokens(tokens.core);

function resolveRef(value) {
  if (typeof value !== 'string' || !value.startsWith('{')) return value;
  const refPath = value.replace(/[{}]/g, '').replace(/\./g, '-');
  const found = allCoreTokens.find(t => t.path === refPath);
  if (found) return resolveRef(found.value);
  return value;
}

function esc(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// ── 1. COLORS ──────────────────────────────────────────

function generateColorStories() {
  const coreColors = flattenTokens(tokens.core.color);
  const palettes = {};
  for (const token of coreColors) {
    const parts = token.path.split('-');
    const paletteName = parts[0];
    if (!palettes[paletteName]) palettes[paletteName] = [];
    palettes[paletteName].push(token);
  }

  let file = `import React, { useState } from 'react';
import './ds-styles.css';

const CopyBadge = ({ show }) => (
  <span className={\`ds-copied \${show ? 'show' : ''}\`}>Copied!</span>
);

const Swatch = ({ name, value, cssVar, description }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(cssVar);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  const isLight = ['#FFFFFF', '#ffffff', 'transparent'].includes(value) || 
    (value.match && value.match(/^#[Ff]{6}$/));
  return (
    <div className="ds-swatch" onClick={copy} title={\`Click to copy \${cssVar}\`}>
      <div className="ds-swatch-color" style={{ 
        background: value,
        border: isLight ? '1px solid #E5E7EB' : '1px solid rgba(0,0,0,0.06)'
      }} />
      <div className="ds-swatch-info">
        <div className="ds-swatch-name">{name}</div>
        <div className="ds-swatch-value">{value}</div>
        {description && <div className="ds-swatch-desc">{description}</div>}
      </div>
      <CopyBadge show={copied} />
    </div>
  );
};

export default { title: 'Design System/Colors' };

`;

  for (const [name, colors] of Object.entries(palettes)) {
    const storyName = name.charAt(0).toUpperCase() + name.slice(1);
    file += `export const ${storyName} = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">${storyName}<span className="ds-badge">${colors.length}</span></h1>
      <p className="ds-page-subtitle">Click any swatch to copy the CSS variable name.</p>
    </div>
    <div className="ds-color-grid">
${colors.map(c => `      <Swatch name="${esc(c.path)}" value="${esc(c.value)}" cssVar="${esc(c.cssVar)}" description={${c.description ? `"${esc(c.description)}"` : 'null'}} />`).join('\n')}
    </div>
  </div>
);

`;
  }

  fs.writeFileSync(path.join(STORIES_DIR, 'Colors.stories.jsx'), file);
  console.log(`  ✓ Colors.stories.jsx (${Object.keys(palettes).length} palettes, ${coreColors.length} tokens)`);
}

// ── 2. SPACING ──────────────────────────────────────────

function generateSpacingStories() {
  const spacings = flattenTokens(tokens.core.spacing);
  const maxVal = Math.max(...spacings.map(s => parseInt(s.value) || 0));

  const rows = spacings.map(s => {
    const px = parseInt(s.value) || 0;
    const pct = maxVal > 0 ? Math.max((px / maxVal) * 100, 1) : 1;
    return `      <div className="ds-spacing-row">
        <div className="ds-spacing-label">${esc(s.path)}</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '${pct}%' }} /></div>
        <div className="ds-spacing-value">${esc(s.value)}</div>
      </div>`;
  }).join('\n');

  const file = `import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Spacing' };

export const Scale = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Spacing<span className="ds-badge">${spacings.length}</span></h1>
      <p className="ds-page-subtitle">Base unit: 4px. Progressive scale for consistent layouts.</p>
    </div>
${rows}
  </div>
);
`;

  fs.writeFileSync(path.join(STORIES_DIR, 'Spacing.stories.jsx'), file);
  console.log(`  ✓ Spacing.stories.jsx (${spacings.length} tokens)`);
}

// ── 3. RADIUS ──────────────────────────────────────────

function generateRadiusStories() {
  const radii = flattenTokens(tokens.core.radius);

  const items = radii.map(r =>
    `      <div className="ds-radius-item">
        <div className="ds-radius-box" style={{ borderRadius: '${esc(r.value)}' }} />
        <div className="ds-radius-label">${esc(r.path)}</div>
        <div className="ds-radius-value">${esc(r.value)}</div>
      </div>`
  ).join('\n');

  const file = `import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Radius' };

export const Scale = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Border Radius<span className="ds-badge">${radii.length}</span></h1>
      <p className="ds-page-subtitle">Corner rounding scale from sharp to fully round.</p>
    </div>
    <div className="ds-radius-grid">
${items}
    </div>
  </div>
);
`;

  fs.writeFileSync(path.join(STORIES_DIR, 'Radius.stories.jsx'), file);
  console.log(`  ✓ Radius.stories.jsx (${radii.length} tokens)`);
}

// ── 4. SHADOWS ──────────────────────────────────────────

function generateShadowStories() {
  const shadows = flattenTokens(tokens.core.shadow);

  const items = shadows.map(s =>
    `      <div className="ds-shadow-item">
        <div className="ds-shadow-box" style={{ boxShadow: '${esc(s.value)}' }} />
        <div className="ds-shadow-label">${esc(s.path)}</div>
        <div className="ds-shadow-value">${esc(s.value)}</div>
      </div>`
  ).join('\n');

  const file = `import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Shadows' };

export const Scale = () => (
  <div className="ds-page" style={{ background: '#F9FAFB' }}>
    <div className="ds-page-header">
      <h1 className="ds-page-title">Box Shadows<span className="ds-badge">${shadows.length}</span></h1>
      <p className="ds-page-subtitle">Elevation levels for layered interfaces.</p>
    </div>
    <div className="ds-shadow-grid">
${items}
    </div>
  </div>
);
`;

  fs.writeFileSync(path.join(STORIES_DIR, 'Shadows.stories.jsx'), file);
  console.log(`  ✓ Shadows.stories.jsx (${shadows.length} tokens)`);
}

// ── 5. OPACITY ──────────────────────────────────────────

function generateOpacityStories() {
  const opacities = flattenTokens(tokens.core.opacity);

  const rows = opacities.map(o =>
    `      <div className="ds-opacity-row">
        <div className="ds-opacity-label">${esc(o.path)}</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: ${o.value} }} />
        </div>
        <div className="ds-opacity-value">${esc(o.value)}</div>
      </div>`
  ).join('\n');

  const file = `import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Opacity' };

export const Scale = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Opacity<span className="ds-badge">${opacities.length}</span></h1>
      <p className="ds-page-subtitle">Transparency levels. Checkerboard shows the transparency effect.</p>
    </div>
${rows}
  </div>
);
`;

  fs.writeFileSync(path.join(STORIES_DIR, 'Opacity.stories.jsx'), file);
  console.log(`  ✓ Opacity.stories.jsx (${opacities.length} tokens)`);
}

// ── 6. TYPOGRAPHY ──────────────────────────────────────────

function generateTypographyStories() {
  let file = `import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Typography' };

`;

  const categories = {
    heading: { label: 'Headings', desc: 'Title hierarchy for page structure.' },
    body: { label: 'Body', desc: 'Paragraph and content text styles.' },
    label: { label: 'Labels', desc: 'Form labels, captions and small UI text.' },
  };

  for (const [catKey, catMeta] of Object.entries(categories)) {
    const variants = tokens.typography[catKey];
    if (!variants) continue;

    const items = [];
    for (const [name, props] of Object.entries(variants)) {
      const fontSize = props.fontSize?.value || '16px';
      const fontWeight = props.fontWeight?.value || '400';
      const lineHeight = props.lineHeight?.value || '1.5';
      const letterSpacing = props.letterSpacing?.value || '0';

      const cleanSize = fontSize.replace(/[{}]/g, '').replace(/\./g, '-');
      const cleanWeight = fontWeight.replace(/[{}]/g, '').replace(/\./g, '-');
      const cleanLH = (typeof lineHeight === 'string' ? lineHeight : String(lineHeight)).replace(/[{}]/g, '').replace(/\./g, '-');

      // Resolve to actual px/value for display
      const sizeRef = fontSize.replace(/[{}]/g, '');
      const weightRef = fontWeight.replace(/[{}]/g, '');

      // Determine numeric weight
      let numWeight = '400';
      if (weightRef.includes('bold')) numWeight = '700';
      else if (weightRef.includes('semibold')) numWeight = '600';
      else if (weightRef.includes('medium')) numWeight = '500';

      // Determine size for sample rendering (approximate)
      let sampleSize = '16px';
      if (sizeRef.includes('4xl')) sampleSize = '36px';
      else if (sizeRef.includes('3xl')) sampleSize = '30px';
      else if (sizeRef.includes('2xl')) sampleSize = '24px';
      else if (sizeRef.includes('xl')) sampleSize = '20px';
      else if (sizeRef.includes('lg')) sampleSize = '18px';
      else if (sizeRef.includes('md')) sampleSize = '16px';
      else if (sizeRef.includes('sm')) sampleSize = '14px';
      else if (sizeRef.includes('xs')) sampleSize = '12px';

      items.push(`      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">${catKey}.${name}</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '${sampleSize}', fontWeight: ${numWeight} }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>${cleanSize}</span></div>
          <div className="ds-type-meta-item">weight <span>${cleanWeight}</span></div>
          <div className="ds-type-meta-item">line-height <span>${cleanLH}</span></div>
        </div>
      </div>`);
    }

    const storyName = catMeta.label;
    file += `export const ${storyName} = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">${storyName}<span className="ds-badge">${items.length}</span></h1>
      <p className="ds-page-subtitle">${catMeta.desc}</p>
    </div>
${items.join('\n')}
  </div>
);

`;
  }

  fs.writeFileSync(path.join(STORIES_DIR, 'Typography.stories.jsx'), file);
  console.log(`  ✓ Typography.stories.jsx`);
}

// ── 7. SEMANTIC ──────────────────────────────────────────

function generateSemanticStories() {
  const semanticColor = tokens.semantic.color;

  let file = `import React, { useState } from 'react';
import './ds-styles.css';

const CopyCell = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <td className="ds-token-name" style={{ cursor: 'pointer' }}
      onClick={() => { navigator.clipboard.writeText('--' + text); setCopied(true); setTimeout(() => setCopied(false), 1000); }}>
      {text} {copied && <span style={{ color: '#16A34A', fontSize: 11, marginLeft: 4 }}>✓</span>}
    </td>
  );
};

export default { title: 'Design System/Semantic' };

`;

  for (const [category, groups] of Object.entries(semanticColor)) {
    const items = flattenTokens(groups, category);
    if (items.length === 0) continue;

    const rows = items.map(item => {
      const resolved = resolveRef(item.value);
      const isColor = resolved.startsWith('#') || resolved.startsWith('rgb') || ['transparent'].includes(resolved);
      const swatchHtml = isColor
        ? `<span className="ds-mini-swatch" style={{ background: '${esc(resolved)}' }} />`
        : '';

      return `        <tr>
          <CopyCell text="${esc(item.path)}" />
          <td>${swatchHtml}<span className="ds-token-ref">${esc(item.value)}</span></td>
          <td className="ds-token-resolved">${resolved !== item.value ? esc(resolved) : '—'}</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>${item.description ? esc(item.description) : '—'}</td>
        </tr>`;
    }).join('\n');

    const storyName = category.charAt(0).toUpperCase() + category.slice(1);
    file += `export const ${storyName} = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Semantic: ${storyName}<span className="ds-badge">${items.length}</span></h1>
      <p className="ds-page-subtitle">Semantic tokens referencing core values. Click a name to copy the CSS variable.</p>
    </div>
    <table className="ds-token-table">
      <thead><tr><th>Token</th><th>Reference</th><th>Resolved</th><th>Description</th></tr></thead>
      <tbody>
${rows}
      </tbody>
    </table>
  </div>
);

`;
  }

  fs.writeFileSync(path.join(STORIES_DIR, 'Semantic.stories.jsx'), file);
  console.log(`  ✓ Semantic.stories.jsx`);
}

// ── 8. COMPONENTS (Live Preview) ──────────────────────────

function generateComponentStories() {
  const file = `import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Components' };

/* ── BUTTON PREVIEW ── */
const BtnPreview = ({ variant, size, children }) => {
  const tokens = ${JSON.stringify(tokens.component.button, null, 2)};
  const colors = ${JSON.stringify(tokens.semantic.color.action, null, 2)};

  const sizeMap = { sm: tokens.size.sm, md: tokens.size.md, lg: tokens.size.lg };
  const s = sizeMap[size] || sizeMap.md;

  const resolveVal = (v) => {
    if (!v || typeof v !== 'string' || !v.startsWith('{')) return v;
    // Simplified resolution for preview
    return v;
  };

  const baseStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease-in-out',
    border: '1px solid',
    lineHeight: 1.5,
  };

  const variants = {
    primary: { background: '#ef007a', color: '#FFFFFF', borderColor: '#ef007a' },
    secondary: { background: '#FFFFFF', color: '#374151', borderColor: '#D1D5DB' },
    ghost: { background: 'transparent', color: '#374151', borderColor: 'transparent' },
    danger: { background: '#DC2626', color: '#FFFFFF', borderColor: '#DC2626' },
  };

  const sizes = {
    sm: { padding: '4px 8px', fontSize: '14px', minHeight: '32px' },
    md: { padding: '8px 16px', fontSize: '14px', minHeight: '40px' },
    lg: { padding: '8px 24px', fontSize: '16px', minHeight: '48px' },
  };

  return (
    <button style={{ ...baseStyle, ...variants[variant], ...sizes[size] }}>
      {children}
    </button>
  );
};

export const Button = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Button</h1>
      <p className="ds-page-subtitle">Interactive preview using design tokens. 4 variants × 3 sizes.</p>
    </div>

    <div className="ds-section">
      <div className="ds-preview-label">Variants</div>
      <div className="ds-preview-box">
        <BtnPreview variant="primary" size="md">Primary</BtnPreview>
        <BtnPreview variant="secondary" size="md">Secondary</BtnPreview>
        <BtnPreview variant="ghost" size="md">Ghost</BtnPreview>
        <BtnPreview variant="danger" size="md">Danger</BtnPreview>
      </div>
    </div>

    <div className="ds-section">
      <div className="ds-preview-label">Sizes</div>
      <div className="ds-preview-box">
        <BtnPreview variant="primary" size="sm">Small</BtnPreview>
        <BtnPreview variant="primary" size="md">Medium</BtnPreview>
        <BtnPreview variant="primary" size="lg">Large</BtnPreview>
      </div>
    </div>

    <div className="ds-section">
      <div className="ds-preview-label">On dark background</div>
      <div className="ds-preview-box ds-preview-box-dark">
        <BtnPreview variant="primary" size="md">Primary</BtnPreview>
        <BtnPreview variant="secondary" size="md">Secondary</BtnPreview>
        <BtnPreview variant="ghost" size="md">Ghost</BtnPreview>
      </div>
    </div>
  </div>
);

/* ── INPUT PREVIEW ── */
const InputPreview = ({ size, placeholder, state }) => {
  const sizes = {
    sm: { padding: '4px 8px', fontSize: '14px', minHeight: '32px' },
    md: { padding: '8px 8px', fontSize: '16px', minHeight: '40px' },
    lg: { padding: '8px 16px', fontSize: '18px', minHeight: '48px' },
  };
  const states = {
    default: { borderColor: '#E5E7EB' },
    hover: { borderColor: '#D1D5DB' },
    focus: { borderColor: '#3B82F6', boxShadow: '0 0 0 2px rgba(59,130,246,0.15)' },
    error: { borderColor: '#EF4444', boxShadow: '0 0 0 2px rgba(239,68,68,0.1)' },
    disabled: { borderColor: '#F3F4F6', background: '#F3F4F6', color: '#D1D5DB', cursor: 'not-allowed' },
  };
  return (
    <input
      placeholder={placeholder || 'Placeholder text'}
      disabled={state === 'disabled'}
      style={{
        fontFamily: "'Inter', sans-serif",
        border: '1px solid',
        borderRadius: '8px',
        outline: 'none',
        width: '100%',
        maxWidth: '320px',
        ...sizes[size],
        ...states[state],
      }}
    />
  );
};

export const Input = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Input</h1>
      <p className="ds-page-subtitle">Text input states and sizes based on design tokens.</p>
    </div>

    <div className="ds-section">
      <div className="ds-preview-label">States</div>
      <div className="ds-preview-box-grid">
        <div><div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>Default</div><InputPreview size="md" state="default" /></div>
        <div><div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>Hover</div><InputPreview size="md" state="hover" /></div>
        <div><div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>Focus</div><InputPreview size="md" state="focus" /></div>
        <div><div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>Error</div><InputPreview size="md" state="error" placeholder="Invalid value" /></div>
        <div><div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>Disabled</div><InputPreview size="md" state="disabled" /></div>
      </div>
    </div>

    <div className="ds-section">
      <div className="ds-preview-label">Sizes</div>
      <div className="ds-preview-box" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <InputPreview size="sm" state="default" placeholder="Small input" />
        <InputPreview size="md" state="default" placeholder="Medium input" />
        <InputPreview size="lg" state="default" placeholder="Large input" />
      </div>
    </div>
  </div>
);

/* ── CARD PREVIEW ── */
export const Card = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Card</h1>
      <p className="ds-page-subtitle">Card component with padding variants.</p>
    </div>
    <div className="ds-preview-box" style={{ gap: 24, alignItems: 'flex-start' }}>
      {['sm', 'md', 'lg'].map(size => {
        const paddings = { sm: '16px', md: '24px', lg: '32px' };
        return (
          <div key={size} style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: paddings[size],
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
            width: '260px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              Padding {size}  —  {paddings[size]}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Card title</div>
            <div style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.5 }}>
              This is a card component using the {size} padding token from the design system.
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

/* ── BADGE PREVIEW ── */
export const Badge = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Badge</h1>
      <p className="ds-page-subtitle">Status badges using feedback color tokens.</p>
    </div>
    <div className="ds-preview-box">
      {[
        { label: 'Success', bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
        { label: 'Warning', bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' },
        { label: 'Error', bg: '#FEF2F2', color: '#B91C1C', border: '#FECACA' },
        { label: 'Info', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
        { label: 'Neutral', bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB' },
      ].map(b => (
        <span key={b.label} style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 8px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: "'Inter', sans-serif",
          background: b.bg,
          color: b.color,
          border: \`1px solid \${b.border}\`,
        }}>{b.label}</span>
      ))}
    </div>
  </div>
);

/* ── FEEDBACK PREVIEW ── */
export const Feedback = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Feedback Messages</h1>
      <p className="ds-page-subtitle">Alert patterns using semantic feedback tokens.</p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { type: 'Success', bg: '#F0FDF4', border: '#BBF7D0', text: '#15803D', icon: '✓', msg: 'Changes saved successfully.' },
        { type: 'Warning', bg: '#FFFBEB', border: '#FDE68A', text: '#B45309', icon: '⚠', msg: 'Your session will expire in 5 minutes.' },
        { type: 'Error', bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C', icon: '✕', msg: 'Failed to save. Please try again.' },
        { type: 'Info', bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8', icon: 'ℹ', msg: 'A new version is available.' },
      ].map(f => (
        <div key={f.type} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 16px', borderRadius: 8,
          background: f.bg, border: \`1px solid \${f.border}\`,
          fontFamily: "'Inter', sans-serif",
        }}>
          <span style={{ fontSize: 16, color: f.text }}>{f.icon}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: f.text }}>{f.type}</div>
            <div style={{ fontSize: 13, color: f.text, opacity: 0.85 }}>{f.msg}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
`;

  fs.writeFileSync(path.join(STORIES_DIR, 'Components.stories.jsx'), file);
  console.log(`  ✓ Components.stories.jsx (Button, Input, Card, Badge, Feedback)`);
}

// ── EXÉCUTION ──────────────────────────────────────────

console.log('\n🔨 Génération des stories React depuis tokens.json...\n');

generateColorStories();
generateSpacingStories();
generateRadiusStories();
generateShadowStories();
generateOpacityStories();
generateTypographyStories();
generateSemanticStories();
generateComponentStories();

