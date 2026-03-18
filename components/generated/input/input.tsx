const Input = ({
  size = 'md',
  state,
  label,
  id,
  errorMessage,
  placeholder = 'Placeholder...',
  disabled,
  ...props
}) => {
  const isError = state === 'error';
  const isDisabled = disabled || state === 'disabled';
  const inputId = id || `input-${size}`;
  return (
    <div className="input-wrapper">
      {label && <label className="input-label" htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        className={`input input--${size}${isError ? ' input--error' : ''}${isDisabled ? ' input--disabled' : ''}`}
        placeholder={placeholder}
        disabled={isDisabled}
        aria-invalid={isError}
        aria-describedby={isError && errorMessage ? `${inputId}-error` : undefined}
        {...props}
      />
      {isError && errorMessage && (
        <span id={`${inputId}-error`} className="input-error-msg" role="alert">{errorMessage}</span>
      )}
    </div>
  );
};

// Demo
const App = () => (
  <div style={{display:'flex',flexDirection:'column',gap:16,padding:16,maxWidth:360}}>
    <Input size="sm" label="Small" placeholder="Small input" />
    <Input size="md" label="Medium" placeholder="Medium input" />
    <Input size="lg" label="Large" placeholder="Large input" />
    <Input size="md" label="Focus" state="focus" placeholder="Focused" />
    <Input size="md" label="Error" state="error" errorMessage="Champ requis" placeholder="Error state" />
    <Input size="md" label="Disabled" state="disabled" placeholder="Disabled" />
  </div>
);