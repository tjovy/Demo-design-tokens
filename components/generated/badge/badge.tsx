const Badge = ({ variant = "primary", children }) => (
  <span className={`badge badge--${variant}`}>{children}</span>
);

// Démo
const App = () => (
  <div style={{ display: "flex", gap: 8 }}>
    {["primary","success","warning","danger","neutral"].map(v => (
      <Badge key={v} variant={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</Badge>
    ))}
  </div>
);