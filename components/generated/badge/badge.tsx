const Badge = ({ variant = 'primary', children }) => (
  <span className={`badge badge--${variant}`}>{children}</span>
);

// Demo
const BadgeDemo = () => (
  <div style={{display:'flex',gap:8}}>
    {['primary','success','warning','danger','neutral'].map(v => (
      <Badge key={v} variant={v}>{v}</Badge>
    ))}
  </div>
);