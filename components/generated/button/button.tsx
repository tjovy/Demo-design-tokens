import * as React from 'react';

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  iconOnly = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  ariaLabel,
  ...rest
}) => {
  const cls = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    iconOnly ? 'button--icon-only' : '',
    fullWidth ? 'button--full-width' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={cls}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={iconOnly ? ariaLabel : undefined}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {iconLeft && <span className="button__icon" aria-hidden="true">{iconLeft}</span>}
      {!iconOnly && <span className="button__label">{children}</span>}
      {iconOnly && <span className="button__icon" aria-hidden="true">{children}</span>}
      {iconRight && !iconOnly && <span className="button__icon" aria-hidden="true">{iconRight}</span>}
    </button>
  );
};

/* ── DEMO (Storybook / standalone) ── */
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:'1em',height:'1em'}}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const sectionStyle = { display:'flex', flexWrap:'wrap', alignItems:'center', gap:'12px', marginBottom:'16px' };
const labelStyle  = { fontFamily:'Inter,sans-serif', fontSize:'11px', color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'4px' };
const groupStyle  = { marginBottom:'24px' };

export const ButtonDemo = () => (
  <div style={{ padding:'32px', background:'#F9FAFB', fontFamily:'Inter,sans-serif' }}>

    <div style={groupStyle}>
      <p style={labelStyle}>Variants — MD</p>
      <div style={sectionStyle}>
        <Button variant="primary"   size="md">Primary</Button>
        <Button variant="secondary" size="md">Secondary</Button>
        <Button variant="ghost"     size="md">Ghost</Button>
        <Button variant="danger"    size="md">Danger</Button>
      </div>
    </div>

    <div style={groupStyle}>
      <p style={labelStyle}>Sizes — Primary</p>
      <div style={sectionStyle}>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
      </div>
    </div>

    <div style={groupStyle}>
      <p style={labelStyle}>With Icons</p>
      <div style={sectionStyle}>
        <Button variant="primary"   size="md" iconLeft={<IconPlus/>}>Icon Left</Button>
        <Button variant="secondary" size="md" iconRight={<IconPlus/>}>Icon Right</Button>
        <Button variant="ghost"     size="sm" iconLeft={<IconPlus/>}>Small Ghost</Button>
        <Button variant="danger"    size="lg" iconLeft={<IconPlus/>}>Large Danger</Button>
      </div>
    </div>

    <div style={groupStyle}>
      <p style={labelStyle}>Icon Only</p>
      <div style={sectionStyle}>
        <Button variant="primary"   size="sm" iconOnly ariaLabel="Add item"><IconPlus/></Button>
        <Button variant="secondary" size="md" iconOnly ariaLabel="Add item"><IconPlus/></Button>
        <Button variant="ghost"     size="lg" iconOnly ariaLabel="Add item"><IconPlus/></Button>
        <Button variant="danger"    size="md" iconOnly ariaLabel="Delete"><IconPlus/></Button>
      </div>
    </div>

    <div style={groupStyle}>
      <p style={labelStyle}>Disabled States</p>
      <div style={sectionStyle}>
        <Button variant="primary"   size="md" disabled>Primary Disabled</Button>
        <Button variant="secondary" size="md" disabled>Secondary Disabled</Button>
        <Button variant="ghost"     size="md" disabled>Ghost Disabled</Button>
        <Button variant="danger"    size="md" disabled>Danger Disabled</Button>
      </div>
    </div>

    <div style={groupStyle}>
      <p style={labelStyle}>Full Width</p>
      <div style={{ width:'320px' }}>
        <Button variant="primary" size="md" fullWidth>Full Width Button</Button>
      </div>
    </div>

  </div>
);

export default Button;
