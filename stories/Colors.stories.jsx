import React, { useState } from 'react';
import './ds-styles.css';

const CopyBadge = ({ show }) => (
  <span className={`ds-copied ${show ? 'show' : ''}`}>Copied!</span>
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
    <div className="ds-swatch" onClick={copy} title={`Click to copy ${cssVar}`}>
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

export const White = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">White<span className="ds-badge">1</span></h1>
      <p className="ds-page-subtitle">Click any swatch to copy the CSS variable name.</p>
    </div>
    <div className="ds-color-grid">
      <Swatch name="white" value="#FFFFFF" cssVar="--white" description={null} />
    </div>
  </div>
);

export const Black = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Black<span className="ds-badge">1</span></h1>
      <p className="ds-page-subtitle">Click any swatch to copy the CSS variable name.</p>
    </div>
    <div className="ds-color-grid">
      <Swatch name="black" value="#000000" cssVar="--black" description={null} />
    </div>
  </div>
);

export const Transparent = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Transparent<span className="ds-badge">1</span></h1>
      <p className="ds-page-subtitle">Click any swatch to copy the CSS variable name.</p>
    </div>
    <div className="ds-color-grid">
      <Swatch name="transparent" value="transparent" cssVar="--transparent" description={null} />
    </div>
  </div>
);

export const Neutral = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Neutral<span className="ds-badge">12</span></h1>
      <p className="ds-page-subtitle">Click any swatch to copy the CSS variable name.</p>
    </div>
    <div className="ds-color-grid">
      <Swatch name="neutral-0" value="#FFFFFF" cssVar="--neutral-0" description={null} />
      <Swatch name="neutral-50" value="#F9FAFB" cssVar="--neutral-50" description={null} />
      <Swatch name="neutral-100" value="#F3F4F6" cssVar="--neutral-100" description={null} />
      <Swatch name="neutral-200" value="#E5E7EB" cssVar="--neutral-200" description={null} />
      <Swatch name="neutral-300" value="#D1D5DB" cssVar="--neutral-300" description={null} />
      <Swatch name="neutral-400" value="#9CA3AF" cssVar="--neutral-400" description={null} />
      <Swatch name="neutral-500" value="#6B7280" cssVar="--neutral-500" description={null} />
      <Swatch name="neutral-600" value="#4B5563" cssVar="--neutral-600" description={null} />
      <Swatch name="neutral-700" value="#374151" cssVar="--neutral-700" description={null} />
      <Swatch name="neutral-800" value="#1F2937" cssVar="--neutral-800" description={null} />
      <Swatch name="neutral-900" value="#111827" cssVar="--neutral-900" description={null} />
      <Swatch name="neutral-950" value="#030712" cssVar="--neutral-950" description={null} />
    </div>
  </div>
);

export const Primary = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Primary<span className="ds-badge">11</span></h1>
      <p className="ds-page-subtitle">Click any swatch to copy the CSS variable name.</p>
    </div>
    <div className="ds-color-grid">
      <Swatch name="primary-50" value="#EFF6FF" cssVar="--primary-50" description={null} />
      <Swatch name="primary-100" value="#DBEAFE" cssVar="--primary-100" description={null} />
      <Swatch name="primary-200" value="#BFDBFE" cssVar="--primary-200" description={null} />
      <Swatch name="primary-300" value="#93C5FD" cssVar="--primary-300" description={null} />
      <Swatch name="primary-400" value="#60A5FA" cssVar="--primary-400" description={null} />
      <Swatch name="primary-500" value="#3B82F6" cssVar="--primary-500" description={null} />
      <Swatch name="primary-600" value="#5f0" cssVar="--primary-600" description={null} />
      <Swatch name="primary-700" value="#1D4ED8" cssVar="--primary-700" description={null} />
      <Swatch name="primary-800" value="#1E40AF" cssVar="--primary-800" description={null} />
      <Swatch name="primary-900" value="#1E3A8A" cssVar="--primary-900" description={null} />
      <Swatch name="primary-950" value="#172554" cssVar="--primary-950" description={null} />
    </div>
  </div>
);

export const Success = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Success<span className="ds-badge">10</span></h1>
      <p className="ds-page-subtitle">Click any swatch to copy the CSS variable name.</p>
    </div>
    <div className="ds-color-grid">
      <Swatch name="success-50" value="#F0FDF4" cssVar="--success-50" description={null} />
      <Swatch name="success-100" value="#DCFCE7" cssVar="--success-100" description={null} />
      <Swatch name="success-200" value="#BBF7D0" cssVar="--success-200" description={null} />
      <Swatch name="success-300" value="#86EFAC" cssVar="--success-300" description={null} />
      <Swatch name="success-400" value="#4ADE80" cssVar="--success-400" description={null} />
      <Swatch name="success-500" value="#22C55E" cssVar="--success-500" description={null} />
      <Swatch name="success-600" value="#16A34A" cssVar="--success-600" description={null} />
      <Swatch name="success-700" value="#15803D" cssVar="--success-700" description={null} />
      <Swatch name="success-800" value="#166534" cssVar="--success-800" description={null} />
      <Swatch name="success-900" value="#14532D" cssVar="--success-900" description={null} />
    </div>
  </div>
);

export const Warning = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Warning<span className="ds-badge">10</span></h1>
      <p className="ds-page-subtitle">Click any swatch to copy the CSS variable name.</p>
    </div>
    <div className="ds-color-grid">
      <Swatch name="warning-50" value="#FFFBEB" cssVar="--warning-50" description={null} />
      <Swatch name="warning-100" value="#FEF3C7" cssVar="--warning-100" description={null} />
      <Swatch name="warning-200" value="#FDE68A" cssVar="--warning-200" description={null} />
      <Swatch name="warning-300" value="#FCD34D" cssVar="--warning-300" description={null} />
      <Swatch name="warning-400" value="#FBBF24" cssVar="--warning-400" description={null} />
      <Swatch name="warning-500" value="#F59E0B" cssVar="--warning-500" description={null} />
      <Swatch name="warning-600" value="#D97706" cssVar="--warning-600" description={null} />
      <Swatch name="warning-700" value="#B45309" cssVar="--warning-700" description={null} />
      <Swatch name="warning-800" value="#92400E" cssVar="--warning-800" description={null} />
      <Swatch name="warning-900" value="#78350F" cssVar="--warning-900" description={null} />
    </div>
  </div>
);

export const Danger = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Danger<span className="ds-badge">10</span></h1>
      <p className="ds-page-subtitle">Click any swatch to copy the CSS variable name.</p>
    </div>
    <div className="ds-color-grid">
      <Swatch name="danger-50" value="#FEF2F2" cssVar="--danger-50" description={null} />
      <Swatch name="danger-100" value="#FEE2E2" cssVar="--danger-100" description={null} />
      <Swatch name="danger-200" value="#FECACA" cssVar="--danger-200" description={null} />
      <Swatch name="danger-300" value="#FCA5A5" cssVar="--danger-300" description={null} />
      <Swatch name="danger-400" value="#F87171" cssVar="--danger-400" description={null} />
      <Swatch name="danger-500" value="#EF4444" cssVar="--danger-500" description={null} />
      <Swatch name="danger-600" value="#DC2626" cssVar="--danger-600" description={null} />
      <Swatch name="danger-700" value="#B91C1C" cssVar="--danger-700" description={null} />
      <Swatch name="danger-800" value="#991B1B" cssVar="--danger-800" description={null} />
      <Swatch name="danger-900" value="#7F1D1D" cssVar="--danger-900" description={null} />
    </div>
  </div>
);

