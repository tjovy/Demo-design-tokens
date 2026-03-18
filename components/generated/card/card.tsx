const Card = ({
  size = "md",
  interactive = false,
  title,
  description,
  footer,
  children,
  className = "",
  ...props
}) => {
  const sizeClass = `card--${size}`;
  const interactiveClass = interactive ? "card--interactive" : "";
  const Tag = interactive ? "button" : "div";

  return (
    <Tag
      className={["card", sizeClass, interactiveClass, className].filter(Boolean).join(" ")}
      {...props}
    >
      {(title || description) && (
        <div className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {description && <p className="card__description">{description}</p>}
        </div>
      )}
      {children && <div className="card__body">{children}</div>}
      {footer && <div className="card__footer">{footer}</div>}
    </Tag>
  );
};

/* Demo */
const CardDemo = () => {
  const sizes = ["sm", "md", "lg"];
  const labels = { sm: "Size=SM — padding 16px", md: "Size=MD — padding 24px", lg: "Size=LG — padding 32px" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "32px", background: "#F9FAFB", minHeight: "100vh" }}>
      <h2 style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#6B7280", margin: 0 }}>component.card — Size variants</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "480px" }}>
        {sizes.map((size) => (
          <Card
            key={size}
            size={size}
            title={labels[size]}
            description="Card description — body text secondary color."
            footer={<span style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#9CA3AF" }}>Footer slot</span>}
          >
            <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#374151", margin: "8px 0 0" }}>
              Content slot — children go here.
            </p>
          </Card>
        ))}
        <Card
          size="md"
          interactive
          title="Interactive card"
          description="hover / focus / active states enabled."
          aria-label="Interactive card example"
        >
          <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#374151", margin: "8px 0 0" }}>
            Click me — interactive variant.
          </p>
        </Card>
      </div>
    </div>
  );
};