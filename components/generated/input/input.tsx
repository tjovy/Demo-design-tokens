const Input = ({
  size = "md",
  state,
  placeholder = "Placeholder",
  disabled = false,
  id,
  label,
  ...props
}) => {
  const stateClass = state === "error" ? "input--error"
    : state === "focus" ? "input--focus"
    : state === "disabled" ? "input--disabled"
    : "";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && <label htmlFor={id} style={{ fontSize: 14, fontWeight: 500 }}>{label}</label>}
      <input
        id={id}
        className={`input input--${size} ${stateClass}`}
        disabled={disabled || state === "disabled"}
        placeholder={placeholder}
        aria-invalid={state === "error"}
        {...props}
      />
    </div>
  );
};

// Demo
const InputDemo = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16, maxWidth: 320 }}>
    <Input size="sm" label="Small" id="i-sm" placeholder="Small input" />
    <Input size="md" label="Medium" id="i-md" placeholder="Medium input" />
    <Input size="lg" label="Large" id="i-lg" placeholder="Large input" />
    <Input size="md" state="focus" label="Focus" id="i-focus" placeholder="Focused" />
    <Input size="md" state="error" label="Error" id="i-err" placeholder="Error state" />
    <Input size="md" state="disabled" label="Disabled" id="i-dis" placeholder="Disabled" />
  </div>
);