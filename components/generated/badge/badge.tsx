const Badge = ({ variant = "primary", children = "Badge" }) => {
  const variantClass = `badge--${variant}`;
  return (
    <span className={`badge ${variantClass}`} role="status">
      {children}
    </span>
  );
};

const BadgeDemo = () => {
  const variants = ["primary", "success", "warning", "danger", "neutral"];
  const labels = {
    primary: "Primary",
    success: "Success",
    warning: "Warning",
    danger: "Danger",
    neutral: "Neutral",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "32px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
        {variants.map((v) => (
          <Badge key={v} variant={v}>{labels[v]}</Badge>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
        {variants.map((v) => (
          <Badge key={v} variant={v}>● {labels[v]}</Badge>
        ))}
      </div>
    </div>
  );
};