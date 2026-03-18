const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconClear = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Clear input"
    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', color: 'inherit' }}
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </button>
);

const Input = ({
  size = 'md',
  state = 'default',
  label,
  helperText,
  placeholder = 'Placeholder…',
  leadingIcon,
  trailingIcon,
  value: controlledValue,
  defaultValue = '',
  onChange,
  id,
  ...rest
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const isDisabled = state === 'disabled';
  const isError = state === 'error';

  const fieldClasses = [
    'input-field',
    `input-field--${size}`,
    isError ? 'input-field--error' : '',
    isDisabled ? 'input-field--disabled' : '',
  ].filter(Boolean).join(' ');

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange && onChange(e);
  };

  const inputId = id || `input-${size}-${state}`;

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-wrapper__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={fieldClasses} aria-disabled={isDisabled}>
        {leadingIcon && (
          <span className="input-field__icon input-field__icon--leading" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input
          id={inputId}
          className="input-field__input"
          type="text"
          placeholder={placeholder}
          disabled={isDisabled}
          value={value}
          onChange={handleChange}
          aria-invalid={isError ? 'true' : undefined}
          {...rest}
        />
        {trailingIcon && (
          <span className="input-field__icon input-field__icon--trailing">
            {trailingIcon}
          </span>
        )}
      </div>
      {helperText && (
        <span className={`input-wrapper__helper${isError ? ' input-wrapper__helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

/* ── Storybook Demo ── */
const SIZES = ['sm', 'md', 'lg'];
const STATES = ['default', 'error', 'disabled'];

const Demo = () => (
  <div className="input-demo">
    {/* Size matrix */}
    <div>
      <div className="input-demo__label">Sizes</div>
      <div className="input-demo__row">
        {SIZES.map(size => (
          <div key={size} style={{ flex: '1', minWidth: '180px' }}>
            <Input
              size={size}
              label={`Size ${size.toUpperCase()}`}
              placeholder={`Input ${size.toUpperCase()}`}
            />
          </div>
        ))}
      </div>
    </div>

    {/* States matrix */}
    <div>
      <div className="input-demo__label">States (MD)</div>
      <div className="input-demo__row">
        <div style={{ flex: '1', minWidth: '180px' }}>
          <Input size="md" label="Default" placeholder="Default state" helperText="Helper text" />
        </div>
        <div style={{ flex: '1', minWidth: '180px' }}>
          <Input size="md" state="error" label="Error" defaultValue="Bad input" helperText="This field is required." />
        </div>
        <div style={{ flex: '1', minWidth: '180px' }}>
          <Input size="md" state="disabled" label="Disabled" defaultValue="Can't touch this" />
        </div>
      </div>
    </div>

    {/* With icons */}
    <div>
      <div className="input-demo__label">With Icons (MD)</div>
      <div className="input-demo__row">
        <div style={{ flex: '1', minWidth: '220px' }}>
          <Input
            size="md"
            label="Leading icon"
            placeholder="Search…"
            leadingIcon={<IconSearch />}
          />
        </div>
        <div style={{ flex: '1', minWidth: '220px' }}>
          <Input
            size="md"
            label="Trailing icon"
            defaultValue="Clear me"
            trailingIcon={<IconClear onClick={() => {}} />}
          />
        </div>
        <div style={{ flex: '1', minWidth: '220px' }}>
          <Input
            size="md"
            label="Both icons"
            placeholder="Search…"
            leadingIcon={<IconSearch />}
            trailingIcon={<IconClear onClick={() => {}} />}
          />
        </div>
      </div>
    </div>

    {/* Full size × state grid */}
    <div>
      <div className="input-demo__label">Full Matrix (size × state)</div>
      <table style={{ borderCollapse: 'separate', borderSpacing: '8px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', fontSize: '11px', color: '#6B7280', padding: '0 8px' }}></th>
            {STATES.map(s => (
              <th key={s} style={{ textAlign: 'left', fontSize: '11px', color: '#6B7280', padding: '0 8px', fontWeight: 600, textTransform: 'uppercase' }}>{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SIZES.map(size => (
            <tr key={size}>
              <td style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', padding: '4px 8px', verticalAlign: 'middle' }}>{size}</td>
              {STATES.map(state => (
                <td key={state} style={{ padding: '4px 8px', minWidth: '180px', verticalAlign: 'middle' }}>
                  <Input size={size} state={state} placeholder={`${size} / ${state}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

render(<Demo />);