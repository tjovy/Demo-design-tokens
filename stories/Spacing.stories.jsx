import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Spacing' };

export const Scale = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Spacing<span className="ds-badge">13</span></h1>
      <p className="ds-page-subtitle">Base unit: 4px. Progressive scale for consistent layouts.</p>
    </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">0</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '1%' }} /></div>
        <div className="ds-spacing-value">0px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">1</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '4.166666666666666%' }} /></div>
        <div className="ds-spacing-value">4px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">2</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '8.333333333333332%' }} /></div>
        <div className="ds-spacing-value">8px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">3</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '12.5%' }} /></div>
        <div className="ds-spacing-value">12px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">4</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '16.666666666666664%' }} /></div>
        <div className="ds-spacing-value">16px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">5</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '20.833333333333336%' }} /></div>
        <div className="ds-spacing-value">20px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">6</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '25%' }} /></div>
        <div className="ds-spacing-value">24px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">8</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '33.33333333333333%' }} /></div>
        <div className="ds-spacing-value">32px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">10</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '41.66666666666667%' }} /></div>
        <div className="ds-spacing-value">40px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">12</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '50%' }} /></div>
        <div className="ds-spacing-value">48px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">16</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '66.66666666666666%' }} /></div>
        <div className="ds-spacing-value">64px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">20</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '83.33333333333334%' }} /></div>
        <div className="ds-spacing-value">80px</div>
      </div>
      <div className="ds-spacing-row">
        <div className="ds-spacing-label">24</div>
        <div className="ds-spacing-bar-container"><div className="ds-spacing-bar" style={{ width: '100%' }} /></div>
        <div className="ds-spacing-value">96px</div>
      </div>
  </div>
);
