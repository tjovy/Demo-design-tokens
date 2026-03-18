const Card = ({ size = "md", children, className = "" }) => (
  <div className={`card card--${size} ${className}`}>{children}</div>
);

// Démo
const App = () => (
  <div style={{ display: "flex", gap: 16 }}>
    {["sm","md","lg"].map(s => (
      <Card key={s} size={s}>
        <strong>Card {s.toUpperCase()}</strong>
        <p>Contenu de la carte.</p>
      </Card>
    ))}
  </div>
);