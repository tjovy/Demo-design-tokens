import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Components' };

/* ── BUTTON PREVIEW ── */
const BtnPreview = ({ variant, size, children }) => {
  const tokens = {
  "size": {
    "sm": {
      "paddingX": {
        "value": "{spacing.sm}",
        "type": "spacing",
        "description": "8px"
      },
      "paddingY": {
        "value": "{spacing.xs}",
        "type": "spacing",
        "description": "4px"
      },
      "fontSize": {
        "value": "{font.size.sm}",
        "type": "fontSizes",
        "description": "14px"
      },
      "lineHeight": {
        "value": "{font.lineHeight.normal}",
        "type": "lineHeights"
      },
      "gap": {
        "value": "{spacing.xs}",
        "type": "spacing",
        "description": "4px"
      },
      "minHeight": {
        "value": "32px",
        "type": "sizing"
      },
      "iconSize": {
        "value": "16px",
        "type": "sizing"
      }
    },
    "md": {
      "paddingX": {
        "value": "{spacing.md}",
        "type": "spacing",
        "description": "16px"
      },
      "paddingY": {
        "value": "{spacing.sm}",
        "type": "spacing",
        "description": "8px"
      },
      "fontSize": {
        "value": "{font.size.sm}",
        "type": "fontSizes",
        "description": "14px"
      },
      "lineHeight": {
        "value": "{font.lineHeight.normal}",
        "type": "lineHeights"
      },
      "gap": {
        "value": "{spacing.sm}",
        "type": "spacing",
        "description": "8px"
      },
      "minHeight": {
        "value": "40px",
        "type": "sizing"
      },
      "iconSize": {
        "value": "20px",
        "type": "sizing"
      }
    },
    "lg": {
      "paddingX": {
        "value": "{spacing.lg}",
        "type": "spacing",
        "description": "24px"
      },
      "paddingY": {
        "value": "{spacing.sm}",
        "type": "spacing",
        "description": "8px"
      },
      "fontSize": {
        "value": "{font.size.md}",
        "type": "fontSizes",
        "description": "16px"
      },
      "lineHeight": {
        "value": "{font.lineHeight.normal}",
        "type": "lineHeights"
      },
      "gap": {
        "value": "{spacing.sm}",
        "type": "spacing",
        "description": "8px"
      },
      "minHeight": {
        "value": "48px",
        "type": "sizing"
      },
      "iconSize": {
        "value": "24px",
        "type": "sizing"
      }
    }
  },
  "radius": {
    "value": "{radius.md}",
    "type": "borderRadius"
  },
  "borderWidth": {
    "value": "{borderWidth.default}",
    "type": "borderWidth"
  },
  "fontWeight": {
    "value": "{font.weight.semibold}",
    "type": "fontWeights"
  },
  "fontFamily": {
    "value": "{font.family.default}",
    "type": "fontFamilies"
  },
  "transition": {
    "value": "all 150ms ease-in-out",
    "type": "other"
  },
  "focus": {
    "ringWidth": {
      "value": "2px",
      "type": "borderWidth"
    },
    "ringOffset": {
      "value": "2px",
      "type": "spacing"
    },
    "ringColor": {
      "value": "{color.primary.500}",
      "type": "color"
    }
  }
};
  const colors = {
  "primary": {
    "bg": {
      "default": {
        "value": "{color.primary.600}",
        "type": "color",
        "description": "Bouton primary - fond"
      },
      "hover": {
        "value": "{color.primary.700}",
        "type": "color",
        "description": "Bouton primary - fond hover"
      },
      "active": {
        "value": "{color.primary.800}",
        "type": "color",
        "description": "Bouton primary - fond actif"
      },
      "disabled": {
        "value": "{color.neutral.100}",
        "type": "color",
        "description": "Bouton primary - fond désactivé"
      }
    },
    "text": {
      "default": {
        "value": "{color.white}",
        "type": "color",
        "description": "Bouton primary - texte"
      },
      "disabled": {
        "value": "{color.neutral.300}",
        "type": "color",
        "description": "Bouton primary - texte désactivé"
      }
    },
    "border": {
      "default": {
        "value": "{color.primary.600}",
        "type": "color",
        "description": "Bouton primary - bordure"
      },
      "hover": {
        "value": "{color.primary.700}",
        "type": "color",
        "description": "Bouton primary - bordure hover"
      },
      "disabled": {
        "value": "{color.neutral.100}",
        "type": "color",
        "description": "Bouton primary - bordure désactivée"
      }
    }
  },
  "secondary": {
    "bg": {
      "default": {
        "value": "{color.white}",
        "type": "color",
        "description": "Bouton secondary - fond"
      },
      "hover": {
        "value": "{color.neutral.50}",
        "type": "color",
        "description": "Bouton secondary - fond hover"
      },
      "active": {
        "value": "{color.neutral.100}",
        "type": "color",
        "description": "Bouton secondary - fond actif"
      },
      "disabled": {
        "value": "{color.neutral.50}",
        "type": "color",
        "description": "Bouton secondary - fond désactivé"
      }
    },
    "text": {
      "default": {
        "value": "{color.neutral.700}",
        "type": "color",
        "description": "Bouton secondary - texte"
      },
      "disabled": {
        "value": "{color.neutral.300}",
        "type": "color",
        "description": "Bouton secondary - texte désactivé"
      }
    },
    "border": {
      "default": {
        "value": "{color.neutral.300}",
        "type": "color",
        "description": "Bouton secondary - bordure"
      },
      "hover": {
        "value": "{color.neutral.400}",
        "type": "color",
        "description": "Bouton secondary - bordure hover"
      },
      "disabled": {
        "value": "{color.neutral.200}",
        "type": "color",
        "description": "Bouton secondary - bordure désactivée"
      }
    }
  },
  "ghost": {
    "bg": {
      "default": {
        "value": "{color.transparent}",
        "type": "color",
        "description": "Bouton ghost - fond"
      },
      "hover": {
        "value": "{color.neutral.100}",
        "type": "color",
        "description": "Bouton ghost - fond hover"
      },
      "active": {
        "value": "{color.neutral.200}",
        "type": "color",
        "description": "Bouton ghost - fond actif"
      },
      "disabled": {
        "value": "{color.transparent}",
        "type": "color",
        "description": "Bouton ghost - fond désactivé"
      }
    },
    "text": {
      "default": {
        "value": "{color.neutral.700}",
        "type": "color",
        "description": "Bouton ghost - texte"
      },
      "disabled": {
        "value": "{color.neutral.300}",
        "type": "color",
        "description": "Bouton ghost - texte désactivé"
      }
    },
    "border": {
      "default": {
        "value": "{color.transparent}",
        "type": "color",
        "description": "Bouton ghost - bordure"
      },
      "hover": {
        "value": "{color.transparent}",
        "type": "color",
        "description": "Bouton ghost - bordure hover"
      },
      "disabled": {
        "value": "{color.transparent}",
        "type": "color",
        "description": "Bouton ghost - bordure désactivée"
      }
    }
  },
  "danger": {
    "bg": {
      "default": {
        "value": "{color.danger.600}",
        "type": "color",
        "description": "Bouton danger - fond"
      },
      "hover": {
        "value": "{color.danger.700}",
        "type": "color",
        "description": "Bouton danger - fond hover"
      },
      "active": {
        "value": "{color.danger.800}",
        "type": "color",
        "description": "Bouton danger - fond actif"
      },
      "disabled": {
        "value": "{color.neutral.100}",
        "type": "color",
        "description": "Bouton danger - fond désactivé"
      }
    },
    "text": {
      "default": {
        "value": "{color.white}",
        "type": "color",
        "description": "Bouton danger - texte"
      },
      "disabled": {
        "value": "{color.neutral.300}",
        "type": "color",
        "description": "Bouton danger - texte désactivé"
      }
    },
    "border": {
      "default": {
        "value": "{color.danger.600}",
        "type": "color",
        "description": "Bouton danger - bordure"
      },
      "hover": {
        "value": "{color.danger.700}",
        "type": "color",
        "description": "Bouton danger - bordure hover"
      },
      "disabled": {
        "value": "{color.neutral.100}",
        "type": "color",
        "description": "Bouton danger - bordure désactivée"
      }
    }
  }
};

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
          border: `1px solid ${b.border}`,
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
          background: f.bg, border: `1px solid ${f.border}`,
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
