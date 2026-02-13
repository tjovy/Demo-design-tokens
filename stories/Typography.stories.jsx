import React from 'react';
import './ds-styles.css';

export default { title: 'Design System/Typography' };

export const Headings = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Headings<span className="ds-badge">4</span></h1>
      <p className="ds-page-subtitle">Title hierarchy for page structure.</p>
    </div>
      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">heading.h1</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '36px', fontWeight: 700 }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>font-size-4xl</span></div>
          <div className="ds-type-meta-item">weight <span>font-weight-bold</span></div>
          <div className="ds-type-meta-item">line-height <span>font-lineHeight-tight</span></div>
        </div>
      </div>
      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">heading.h2</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '30px', fontWeight: 700 }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>font-size-3xl</span></div>
          <div className="ds-type-meta-item">weight <span>font-weight-bold</span></div>
          <div className="ds-type-meta-item">line-height <span>font-lineHeight-tight</span></div>
        </div>
      </div>
      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">heading.h3</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '24px', fontWeight: 700 }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>font-size-2xl</span></div>
          <div className="ds-type-meta-item">weight <span>font-weight-semibold</span></div>
          <div className="ds-type-meta-item">line-height <span>font-lineHeight-tight</span></div>
        </div>
      </div>
      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">heading.h4</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '20px', fontWeight: 700 }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>font-size-xl</span></div>
          <div className="ds-type-meta-item">weight <span>font-weight-semibold</span></div>
          <div className="ds-type-meta-item">line-height <span>font-lineHeight-normal</span></div>
        </div>
      </div>
  </div>
);

export const Body = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Body<span className="ds-badge">3</span></h1>
      <p className="ds-page-subtitle">Paragraph and content text styles.</p>
    </div>
      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">body.lg</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '18px', fontWeight: 400 }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>font-size-lg</span></div>
          <div className="ds-type-meta-item">weight <span>font-weight-regular</span></div>
          <div className="ds-type-meta-item">line-height <span>font-lineHeight-relaxed</span></div>
        </div>
      </div>
      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">body.md</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '16px', fontWeight: 400 }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>font-size-md</span></div>
          <div className="ds-type-meta-item">weight <span>font-weight-regular</span></div>
          <div className="ds-type-meta-item">line-height <span>font-lineHeight-normal</span></div>
        </div>
      </div>
      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">body.sm</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '14px', fontWeight: 400 }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>font-size-sm</span></div>
          <div className="ds-type-meta-item">weight <span>font-weight-regular</span></div>
          <div className="ds-type-meta-item">line-height <span>font-lineHeight-normal</span></div>
        </div>
      </div>
  </div>
);

export const Labels = () => (
  <div className="ds-page">
    <div className="ds-page-header">
      <h1 className="ds-page-title">Labels<span className="ds-badge">3</span></h1>
      <p className="ds-page-subtitle">Form labels, captions and small UI text.</p>
    </div>
      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">label.lg</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '16px', fontWeight: 500 }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>font-size-md</span></div>
          <div className="ds-type-meta-item">weight <span>font-weight-medium</span></div>
          <div className="ds-type-meta-item">line-height <span>font-lineHeight-normal</span></div>
        </div>
      </div>
      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">label.md</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '14px', fontWeight: 500 }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>font-size-sm</span></div>
          <div className="ds-type-meta-item">weight <span>font-weight-medium</span></div>
          <div className="ds-type-meta-item">line-height <span>font-lineHeight-normal</span></div>
        </div>
      </div>
      <div className="ds-type-item">
        <div className="ds-type-header">
          <span className="ds-type-tag">label.sm</span>
        </div>
        <p className="ds-type-sample" style={{ fontSize: '12px', fontWeight: 500 }}>
          The quick brown fox jumps over the lazy dog
        </p>
        <div className="ds-type-meta">
          <div className="ds-type-meta-item">size <span>font-size-xs</span></div>
          <div className="ds-type-meta-item">weight <span>font-weight-medium</span></div>
          <div className="ds-type-meta-item">line-height <span>font-lineHeight-normal</span></div>
        </div>
      </div>
  </div>
);

