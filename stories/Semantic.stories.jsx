import React, { useState } from 'react';
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

export const Bg = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Semantic: Bg<span className="ds-badge">5</span></h1>
      <p className="ds-page-subtitle">Semantic tokens referencing core values. Click a name to copy the CSS variable.</p>
    </div>
    <table className="ds-token-table">
      <thead><tr><th>Token</th><th>Reference</th><th>Resolved</th><th>Description</th></tr></thead>
      <tbody>
        <tr>
          <CopyCell text="bg-primary" />
          <td><span className="ds-mini-swatch" style={{ background: '#FFFFFF' }} /><span className="ds-token-ref">color.white</span></td>
          <td className="ds-token-resolved">#FFFFFF</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Background principal</td>
        </tr>
        <tr>
          <CopyCell text="bg-secondary" />
          <td><span className="ds-mini-swatch" style={{ background: '#F9FAFB' }} /><span className="ds-token-ref">color.neutral.50</span></td>
          <td className="ds-token-resolved">#F9FAFB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Background secondaire</td>
        </tr>
        <tr>
          <CopyCell text="bg-tertiary" />
          <td><span className="ds-mini-swatch" style={{ background: '#F3F4F6' }} /><span className="ds-token-ref">color.neutral.100</span></td>
          <td className="ds-token-resolved">#F3F4F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Background tertiaire</td>
        </tr>
        <tr>
          <CopyCell text="bg-inverse" />
          <td><span className="ds-mini-swatch" style={{ background: '#111827' }} /><span className="ds-token-ref">color.neutral.900</span></td>
          <td className="ds-token-resolved">#111827</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Background inversé</td>
        </tr>
        <tr>
          <CopyCell text="bg-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#F3F4F6' }} /><span className="ds-token-ref">color.neutral.100</span></td>
          <td className="ds-token-resolved">#F3F4F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Background désactivé</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export const Text = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Semantic: Text<span className="ds-badge">7</span></h1>
      <p className="ds-page-subtitle">Semantic tokens referencing core values. Click a name to copy the CSS variable.</p>
    </div>
    <table className="ds-token-table">
      <thead><tr><th>Token</th><th>Reference</th><th>Resolved</th><th>Description</th></tr></thead>
      <tbody>
        <tr>
          <CopyCell text="text-primary" />
          <td><span className="ds-mini-swatch" style={{ background: '#111827' }} /><span className="ds-token-ref">color.neutral.900</span></td>
          <td className="ds-token-resolved">#111827</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Texte principal</td>
        </tr>
        <tr>
          <CopyCell text="text-secondary" />
          <td><span className="ds-mini-swatch" style={{ background: '#4B5563' }} /><span className="ds-token-ref">color.neutral.600</span></td>
          <td className="ds-token-resolved">#4B5563</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Texte secondaire</td>
        </tr>
        <tr>
          <CopyCell text="text-tertiary" />
          <td><span className="ds-mini-swatch" style={{ background: '#9CA3AF' }} /><span className="ds-token-ref">color.neutral.400</span></td>
          <td className="ds-token-resolved">#9CA3AF</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Texte tertiaire / placeholder</td>
        </tr>
        <tr>
          <CopyCell text="text-inverse" />
          <td><span className="ds-mini-swatch" style={{ background: '#FFFFFF' }} /><span className="ds-token-ref">color.white</span></td>
          <td className="ds-token-resolved">#FFFFFF</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Texte sur fond sombre</td>
        </tr>
        <tr>
          <CopyCell text="text-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#D1D5DB' }} /><span className="ds-token-ref">color.neutral.300</span></td>
          <td className="ds-token-resolved">#D1D5DB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Texte désactivé</td>
        </tr>
        <tr>
          <CopyCell text="text-link" />
          <td><span className="ds-mini-swatch" style={{ background: '#5f0' }} /><span className="ds-token-ref">color.primary.600</span></td>
          <td className="ds-token-resolved">#5f0</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Liens</td>
        </tr>
        <tr>
          <CopyCell text="text-linkHover" />
          <td><span className="ds-mini-swatch" style={{ background: '#1D4ED8' }} /><span className="ds-token-ref">color.primary.700</span></td>
          <td className="ds-token-resolved">#1D4ED8</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Liens au survol</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export const Border = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Semantic: Border<span className="ds-badge">4</span></h1>
      <p className="ds-page-subtitle">Semantic tokens referencing core values. Click a name to copy the CSS variable.</p>
    </div>
    <table className="ds-token-table">
      <thead><tr><th>Token</th><th>Reference</th><th>Resolved</th><th>Description</th></tr></thead>
      <tbody>
        <tr>
          <CopyCell text="border-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#E5E7EB' }} /><span className="ds-token-ref">color.neutral.200</span></td>
          <td className="ds-token-resolved">#E5E7EB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bordure par défaut</td>
        </tr>
        <tr>
          <CopyCell text="border-strong" />
          <td><span className="ds-mini-swatch" style={{ background: '#D1D5DB' }} /><span className="ds-token-ref">color.neutral.300</span></td>
          <td className="ds-token-resolved">#D1D5DB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bordure accentuée</td>
        </tr>
        <tr>
          <CopyCell text="border-focus" />
          <td><span className="ds-mini-swatch" style={{ background: '#3B82F6' }} /><span className="ds-token-ref">color.primary.500</span></td>
          <td className="ds-token-resolved">#3B82F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bordure focus</td>
        </tr>
        <tr>
          <CopyCell text="border-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#F3F4F6' }} /><span className="ds-token-ref">color.neutral.100</span></td>
          <td className="ds-token-resolved">#F3F4F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bordure désactivée</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export const Action = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Semantic: Action<span className="ds-badge">36</span></h1>
      <p className="ds-page-subtitle">Semantic tokens referencing core values. Click a name to copy the CSS variable.</p>
    </div>
    <table className="ds-token-table">
      <thead><tr><th>Token</th><th>Reference</th><th>Resolved</th><th>Description</th></tr></thead>
      <tbody>
        <tr>
          <CopyCell text="action-primary-bg-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#5f0' }} /><span className="ds-token-ref">color.primary.600</span></td>
          <td className="ds-token-resolved">#5f0</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton primary - fond</td>
        </tr>
        <tr>
          <CopyCell text="action-primary-bg-hover" />
          <td><span className="ds-mini-swatch" style={{ background: '#1D4ED8' }} /><span className="ds-token-ref">color.primary.700</span></td>
          <td className="ds-token-resolved">#1D4ED8</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton primary - fond hover</td>
        </tr>
        <tr>
          <CopyCell text="action-primary-bg-active" />
          <td><span className="ds-mini-swatch" style={{ background: '#1E40AF' }} /><span className="ds-token-ref">color.primary.800</span></td>
          <td className="ds-token-resolved">#1E40AF</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton primary - fond actif</td>
        </tr>
        <tr>
          <CopyCell text="action-primary-bg-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#F3F4F6' }} /><span className="ds-token-ref">color.neutral.100</span></td>
          <td className="ds-token-resolved">#F3F4F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton primary - fond désactivé</td>
        </tr>
        <tr>
          <CopyCell text="action-primary-text-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#FFFFFF' }} /><span className="ds-token-ref">color.white</span></td>
          <td className="ds-token-resolved">#FFFFFF</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton primary - texte</td>
        </tr>
        <tr>
          <CopyCell text="action-primary-text-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#D1D5DB' }} /><span className="ds-token-ref">color.neutral.300</span></td>
          <td className="ds-token-resolved">#D1D5DB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton primary - texte désactivé</td>
        </tr>
        <tr>
          <CopyCell text="action-primary-border-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#5f0' }} /><span className="ds-token-ref">color.primary.600</span></td>
          <td className="ds-token-resolved">#5f0</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton primary - bordure</td>
        </tr>
        <tr>
          <CopyCell text="action-primary-border-hover" />
          <td><span className="ds-mini-swatch" style={{ background: '#1D4ED8' }} /><span className="ds-token-ref">color.primary.700</span></td>
          <td className="ds-token-resolved">#1D4ED8</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton primary - bordure hover</td>
        </tr>
        <tr>
          <CopyCell text="action-primary-border-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#F3F4F6' }} /><span className="ds-token-ref">color.neutral.100</span></td>
          <td className="ds-token-resolved">#F3F4F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton primary - bordure désactivée</td>
        </tr>
        <tr>
          <CopyCell text="action-secondary-bg-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#FFFFFF' }} /><span className="ds-token-ref">color.white</span></td>
          <td className="ds-token-resolved">#FFFFFF</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton secondary - fond</td>
        </tr>
        <tr>
          <CopyCell text="action-secondary-bg-hover" />
          <td><span className="ds-mini-swatch" style={{ background: '#F9FAFB' }} /><span className="ds-token-ref">color.neutral.50</span></td>
          <td className="ds-token-resolved">#F9FAFB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton secondary - fond hover</td>
        </tr>
        <tr>
          <CopyCell text="action-secondary-bg-active" />
          <td><span className="ds-mini-swatch" style={{ background: '#F3F4F6' }} /><span className="ds-token-ref">color.neutral.100</span></td>
          <td className="ds-token-resolved">#F3F4F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton secondary - fond actif</td>
        </tr>
        <tr>
          <CopyCell text="action-secondary-bg-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#F9FAFB' }} /><span className="ds-token-ref">color.neutral.50</span></td>
          <td className="ds-token-resolved">#F9FAFB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton secondary - fond désactivé</td>
        </tr>
        <tr>
          <CopyCell text="action-secondary-text-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#374151' }} /><span className="ds-token-ref">color.neutral.700</span></td>
          <td className="ds-token-resolved">#374151</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton secondary - texte</td>
        </tr>
        <tr>
          <CopyCell text="action-secondary-text-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#D1D5DB' }} /><span className="ds-token-ref">color.neutral.300</span></td>
          <td className="ds-token-resolved">#D1D5DB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton secondary - texte désactivé</td>
        </tr>
        <tr>
          <CopyCell text="action-secondary-border-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#D1D5DB' }} /><span className="ds-token-ref">color.neutral.300</span></td>
          <td className="ds-token-resolved">#D1D5DB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton secondary - bordure</td>
        </tr>
        <tr>
          <CopyCell text="action-secondary-border-hover" />
          <td><span className="ds-mini-swatch" style={{ background: '#9CA3AF' }} /><span className="ds-token-ref">color.neutral.400</span></td>
          <td className="ds-token-resolved">#9CA3AF</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton secondary - bordure hover</td>
        </tr>
        <tr>
          <CopyCell text="action-secondary-border-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#E5E7EB' }} /><span className="ds-token-ref">color.neutral.200</span></td>
          <td className="ds-token-resolved">#E5E7EB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton secondary - bordure désactivée</td>
        </tr>
        <tr>
          <CopyCell text="action-ghost-bg-default" />
          <td><span className="ds-mini-swatch" style={{ background: 'transparent' }} /><span className="ds-token-ref">color.transparent</span></td>
          <td className="ds-token-resolved">transparent</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton ghost - fond</td>
        </tr>
        <tr>
          <CopyCell text="action-ghost-bg-hover" />
          <td><span className="ds-mini-swatch" style={{ background: '#F3F4F6' }} /><span className="ds-token-ref">color.neutral.100</span></td>
          <td className="ds-token-resolved">#F3F4F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton ghost - fond hover</td>
        </tr>
        <tr>
          <CopyCell text="action-ghost-bg-active" />
          <td><span className="ds-mini-swatch" style={{ background: '#E5E7EB' }} /><span className="ds-token-ref">color.neutral.200</span></td>
          <td className="ds-token-resolved">#E5E7EB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton ghost - fond actif</td>
        </tr>
        <tr>
          <CopyCell text="action-ghost-bg-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: 'transparent' }} /><span className="ds-token-ref">color.transparent</span></td>
          <td className="ds-token-resolved">transparent</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton ghost - fond désactivé</td>
        </tr>
        <tr>
          <CopyCell text="action-ghost-text-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#374151' }} /><span className="ds-token-ref">color.neutral.700</span></td>
          <td className="ds-token-resolved">#374151</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton ghost - texte</td>
        </tr>
        <tr>
          <CopyCell text="action-ghost-text-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#D1D5DB' }} /><span className="ds-token-ref">color.neutral.300</span></td>
          <td className="ds-token-resolved">#D1D5DB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton ghost - texte désactivé</td>
        </tr>
        <tr>
          <CopyCell text="action-ghost-border-default" />
          <td><span className="ds-mini-swatch" style={{ background: 'transparent' }} /><span className="ds-token-ref">color.transparent</span></td>
          <td className="ds-token-resolved">transparent</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton ghost - bordure</td>
        </tr>
        <tr>
          <CopyCell text="action-ghost-border-hover" />
          <td><span className="ds-mini-swatch" style={{ background: 'transparent' }} /><span className="ds-token-ref">color.transparent</span></td>
          <td className="ds-token-resolved">transparent</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton ghost - bordure hover</td>
        </tr>
        <tr>
          <CopyCell text="action-ghost-border-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: 'transparent' }} /><span className="ds-token-ref">color.transparent</span></td>
          <td className="ds-token-resolved">transparent</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton ghost - bordure désactivée</td>
        </tr>
        <tr>
          <CopyCell text="action-danger-bg-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#DC2626' }} /><span className="ds-token-ref">color.danger.600</span></td>
          <td className="ds-token-resolved">#DC2626</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton danger - fond</td>
        </tr>
        <tr>
          <CopyCell text="action-danger-bg-hover" />
          <td><span className="ds-mini-swatch" style={{ background: '#B91C1C' }} /><span className="ds-token-ref">color.danger.700</span></td>
          <td className="ds-token-resolved">#B91C1C</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton danger - fond hover</td>
        </tr>
        <tr>
          <CopyCell text="action-danger-bg-active" />
          <td><span className="ds-mini-swatch" style={{ background: '#991B1B' }} /><span className="ds-token-ref">color.danger.800</span></td>
          <td className="ds-token-resolved">#991B1B</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton danger - fond actif</td>
        </tr>
        <tr>
          <CopyCell text="action-danger-bg-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#F3F4F6' }} /><span className="ds-token-ref">color.neutral.100</span></td>
          <td className="ds-token-resolved">#F3F4F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton danger - fond désactivé</td>
        </tr>
        <tr>
          <CopyCell text="action-danger-text-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#FFFFFF' }} /><span className="ds-token-ref">color.white</span></td>
          <td className="ds-token-resolved">#FFFFFF</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton danger - texte</td>
        </tr>
        <tr>
          <CopyCell text="action-danger-text-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#D1D5DB' }} /><span className="ds-token-ref">color.neutral.300</span></td>
          <td className="ds-token-resolved">#D1D5DB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton danger - texte désactivé</td>
        </tr>
        <tr>
          <CopyCell text="action-danger-border-default" />
          <td><span className="ds-mini-swatch" style={{ background: '#DC2626' }} /><span className="ds-token-ref">color.danger.600</span></td>
          <td className="ds-token-resolved">#DC2626</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton danger - bordure</td>
        </tr>
        <tr>
          <CopyCell text="action-danger-border-hover" />
          <td><span className="ds-mini-swatch" style={{ background: '#B91C1C' }} /><span className="ds-token-ref">color.danger.700</span></td>
          <td className="ds-token-resolved">#B91C1C</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton danger - bordure hover</td>
        </tr>
        <tr>
          <CopyCell text="action-danger-border-disabled" />
          <td><span className="ds-mini-swatch" style={{ background: '#F3F4F6' }} /><span className="ds-token-ref">color.neutral.100</span></td>
          <td className="ds-token-resolved">#F3F4F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>Bouton danger - bordure désactivée</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export const Feedback = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Semantic: Feedback<span className="ds-badge">16</span></h1>
      <p className="ds-page-subtitle">Semantic tokens referencing core values. Click a name to copy the CSS variable.</p>
    </div>
    <table className="ds-token-table">
      <thead><tr><th>Token</th><th>Reference</th><th>Resolved</th><th>Description</th></tr></thead>
      <tbody>
        <tr>
          <CopyCell text="feedback-success-bg" />
          <td><span className="ds-mini-swatch" style={{ background: '#F0FDF4' }} /><span className="ds-token-ref">color.success.50</span></td>
          <td className="ds-token-resolved">#F0FDF4</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-success-text" />
          <td><span className="ds-mini-swatch" style={{ background: '#15803D' }} /><span className="ds-token-ref">color.success.700</span></td>
          <td className="ds-token-resolved">#15803D</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-success-border" />
          <td><span className="ds-mini-swatch" style={{ background: '#BBF7D0' }} /><span className="ds-token-ref">color.success.200</span></td>
          <td className="ds-token-resolved">#BBF7D0</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-success-icon" />
          <td><span className="ds-mini-swatch" style={{ background: '#22C55E' }} /><span className="ds-token-ref">color.success.500</span></td>
          <td className="ds-token-resolved">#22C55E</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-warning-bg" />
          <td><span className="ds-mini-swatch" style={{ background: '#FFFBEB' }} /><span className="ds-token-ref">color.warning.50</span></td>
          <td className="ds-token-resolved">#FFFBEB</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-warning-text" />
          <td><span className="ds-mini-swatch" style={{ background: '#B45309' }} /><span className="ds-token-ref">color.warning.700</span></td>
          <td className="ds-token-resolved">#B45309</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-warning-border" />
          <td><span className="ds-mini-swatch" style={{ background: '#FDE68A' }} /><span className="ds-token-ref">color.warning.200</span></td>
          <td className="ds-token-resolved">#FDE68A</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-warning-icon" />
          <td><span className="ds-mini-swatch" style={{ background: '#F59E0B' }} /><span className="ds-token-ref">color.warning.500}</span></td>
          <td className="ds-token-resolved">#F59E0B</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-error-bg" />
          <td><span className="ds-mini-swatch" style={{ background: '#FEF2F2' }} /><span className="ds-token-ref">color.danger.50</span></td>
          <td className="ds-token-resolved">#FEF2F2</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-error-text" />
          <td><span className="ds-mini-swatch" style={{ background: '#B91C1C' }} /><span className="ds-token-ref">color.danger.700</span></td>
          <td className="ds-token-resolved">#B91C1C</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-error-border" />
          <td><span className="ds-mini-swatch" style={{ background: '#FECACA' }} /><span className="ds-token-ref">color.danger.200</span></td>
          <td className="ds-token-resolved">#FECACA</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-error-icon" />
          <td><span className="ds-mini-swatch" style={{ background: '#EF4444' }} /><span className="ds-token-ref">color.danger.500</span></td>
          <td className="ds-token-resolved">#EF4444</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-info-bg" />
          <td><span className="ds-mini-swatch" style={{ background: '#EFF6FF' }} /><span className="ds-token-ref">color.primary.50</span></td>
          <td className="ds-token-resolved">#EFF6FF</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-info-text" />
          <td><span className="ds-mini-swatch" style={{ background: '#1D4ED8' }} /><span className="ds-token-ref">color.primary.700</span></td>
          <td className="ds-token-resolved">#1D4ED8</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-info-border" />
          <td><span className="ds-mini-swatch" style={{ background: '#BFDBFE' }} /><span className="ds-token-ref">color.primary.200</span></td>
          <td className="ds-token-resolved">#BFDBFE</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
        <tr>
          <CopyCell text="feedback-info-icon" />
          <td><span className="ds-mini-swatch" style={{ background: '#3B82F6' }} /><span className="ds-token-ref">color.primary.500</span></td>
          <td className="ds-token-resolved">#3B82F6</td>
          <td style={{ fontSize: 12, color: '#9CA3AF' }}>—</td>
        </tr>
      </tbody>
    </table>
  </div>
);