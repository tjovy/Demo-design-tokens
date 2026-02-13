import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Radius' };

export const Scale = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Border Radius<span className="ds-badge">7</span></h1>
      <p className="ds-page-subtitle">Corner rounding scale from sharp to fully round.</p>
    </div>
    <div className="ds-radius-grid">
      <div className="ds-radius-item">
        <div className="ds-radius-box" style={{ borderRadius: '0px' }} />
        <div className="ds-radius-label">0</div>
        <div className="ds-radius-value">0px</div>
      </div>
      <div className="ds-radius-item">
        <div className="ds-radius-box" style={{ borderRadius: '4px' }} />
        <div className="ds-radius-label">4</div>
        <div className="ds-radius-value">4px</div>
      </div>
      <div className="ds-radius-item">
        <div className="ds-radius-box" style={{ borderRadius: '8px' }} />
        <div className="ds-radius-label">8</div>
        <div className="ds-radius-value">8px</div>
      </div>
      <div className="ds-radius-item">
        <div className="ds-radius-box" style={{ borderRadius: '12px' }} />
        <div className="ds-radius-label">12</div>
        <div className="ds-radius-value">12px</div>
      </div>
      <div className="ds-radius-item">
        <div className="ds-radius-box" style={{ borderRadius: '16px' }} />
        <div className="ds-radius-label">16</div>
        <div className="ds-radius-value">16px</div>
      </div>
      <div className="ds-radius-item">
        <div className="ds-radius-box" style={{ borderRadius: '24px' }} />
        <div className="ds-radius-label">24</div>
        <div className="ds-radius-value">24px</div>
      </div>
      <div className="ds-radius-item">
        <div className="ds-radius-box" style={{ borderRadius: '9999px' }} />
        <div className="ds-radius-label">999</div>
        <div className="ds-radius-value">9999px</div>
      </div>
    </div>
  </div>
);
