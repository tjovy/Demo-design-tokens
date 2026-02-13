import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Shadows' };

export const Scale = () => (
  <div className="ds-page" style={{ background: '#F9FAFB' }}>
    <div className="ds-page-header">
      <h1 className="ds-page-title">Box Shadows<span className="ds-badge">5</span></h1>
      <p className="ds-page-subtitle">Elevation levels for layered interfaces.</p>
    </div>
    <div className="ds-shadow-grid">
      <div className="ds-shadow-item">
        <div className="ds-shadow-box" style={{ boxShadow: '0 0 0 0 transparent' }} />
        <div className="ds-shadow-label">0</div>
        <div className="ds-shadow-value">0 0 0 0 transparent</div>
      </div>
      <div className="ds-shadow-item">
        <div className="ds-shadow-box" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }} />
        <div className="ds-shadow-label">100</div>
        <div className="ds-shadow-value">0 1px 2px 0 rgba(0,0,0,0.05)</div>
      </div>
      <div className="ds-shadow-item">
        <div className="ds-shadow-box" style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
        <div className="ds-shadow-label">200</div>
        <div className="ds-shadow-value">0 4px 6px -1px rgba(0,0,0,0.1)</div>
      </div>
      <div className="ds-shadow-item">
        <div className="ds-shadow-box" style={{ boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
        <div className="ds-shadow-label">300</div>
        <div className="ds-shadow-value">0 10px 15px -3px rgba(0,0,0,0.1)</div>
      </div>
      <div className="ds-shadow-item">
        <div className="ds-shadow-box" style={{ boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
        <div className="ds-shadow-label">400</div>
        <div className="ds-shadow-value">0 20px 25px -5px rgba(0,0,0,0.1)</div>
      </div>
    </div>
  </div>
);
