const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  onClick,
  type = "button",
  ...props
}) => (
  <button
    type={type}
    className={`btn btn--${variant} btn--${size}`}
    disabled={disabled}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

// Demo
const ButtonDemo = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 16 }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
    <Button disabled>Disabled</Button>
  </div>
);