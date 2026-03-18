const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  iconPosition = 'left',
  children,
  onClick,
  type = 'button',
  ariaLabel,
  ...props
}) => (
  <button
    type={type}
    className={`btn btn--${size} btn--${variant}${disabled ? ' btn--disabled' : ''}`}
    disabled={disabled}
    onClick={onClick}
    aria-label={ariaLabel}
    {...props}
  >
    {icon && iconPosition === 'left' && <span className="btn__icon" aria-hidden="true">{icon}</span>}
    {children}
    {icon && iconPosition === 'right' && <span className="btn__icon" aria-hidden="true">{icon}</span>}
  </button>
);

// Demo
const App = () => (
  <div style={{display:'flex',flexWrap:'wrap',gap:12,padding:16}}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
    <Button disabled>Disabled</Button>
  </div>
);