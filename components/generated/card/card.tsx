const Card = ({ size = 'md', children, className = '', ...props }) => (
  <div className={`card card--${size} ${className}`} {...props}>
    {children}
  </div>
);

// Demo
const CardDemo = () => (
  <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
    {['sm','md','lg'].map(s => (
      <Card key={s} size={s}><p style={{margin:0}}>Card {s.toUpperCase()}</p></Card>
    ))}
  </div>
);