import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Opacity' };

export const Scale = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Opacity<span className="ds-badge">15</span></h1>
      <p className="ds-page-subtitle">Transparency levels. Checkerboard shows the transparency effect.</p>
    </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">0</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0 }} />
        </div>
        <div className="ds-opacity-value">0</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">5</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.05 }} />
        </div>
        <div className="ds-opacity-value">0.05</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">10</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.1 }} />
        </div>
        <div className="ds-opacity-value">0.1</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">20</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.2 }} />
        </div>
        <div className="ds-opacity-value">0.2</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">25</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.25 }} />
        </div>
        <div className="ds-opacity-value">0.25</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">30</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.3 }} />
        </div>
        <div className="ds-opacity-value">0.3</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">40</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.4 }} />
        </div>
        <div className="ds-opacity-value">0.4</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">50</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.5 }} />
        </div>
        <div className="ds-opacity-value">0.5</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">60</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.6 }} />
        </div>
        <div className="ds-opacity-value">0.6</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">70</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.7 }} />
        </div>
        <div className="ds-opacity-value">0.7</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">75</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.75 }} />
        </div>
        <div className="ds-opacity-value">0.75</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">80</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.8 }} />
        </div>
        <div className="ds-opacity-value">0.8</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">90</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.9 }} />
        </div>
        <div className="ds-opacity-value">0.9</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">95</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 0.95 }} />
        </div>
        <div className="ds-opacity-value">0.95</div>
      </div>
      <div className="ds-opacity-row">
        <div className="ds-opacity-label">100</div>
        <div className="ds-opacity-preview">
          <div className="ds-opacity-checker" />
          <div className="ds-opacity-fill" style={{ opacity: 1 }} />
        </div>
        <div className="ds-opacity-value">1</div>
      </div>
  </div>
);
