import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { getScoreVisualMeta } from '../../utils/fitScoreUtils';

export default function FitSummary({ fitSummary, overallScore, recommendationTier }) {
  const visualMeta = getScoreVisualMeta(overallScore);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #DBEAFE',
        padding: '28px 32px',
        boxShadow: '0 8px 24px rgba(57, 120, 246, 0.06)',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Banner Accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: visualMeta.gradient
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: '#EFF6FF',
              color: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#3978F6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              EXPLAINABLE AI SYNTHESIS
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              CampusCore Assessment Summary
            </h2>
          </div>
        </div>

        {/* Overall Evaluation Badge */}
        <div
          style={{
            padding: '6px 14px',
            borderRadius: '10px',
            backgroundColor: visualMeta.bgColor,
            color: visualMeta.color,
            border: `1.5px solid ${visualMeta.borderColor}`,
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>{recommendationTier}</span>
          <span>—</span>
          <span>{overallScore}%</span>
        </div>
      </div>

      {/* Dynamic Summary Text */}
      <p
        style={{
          fontSize: '14.5px',
          color: '#334155',
          lineHeight: 1.7,
          margin: '0 0 16px',
          fontFamily: "'Inter', system-ui, sans-serif"
        }}
      >
        {fitSummary}
      </p>

      {/* Responsible AI Disclaimer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          paddingTop: '14px',
          borderTop: '1px solid #F1F5F9',
          fontSize: '12px',
          color: '#64748B'
        }}
      >
        <ShieldCheck size={14} color="#64748B" />
        <span>
          CampusCore AI provides explainable decision-support signals based on available job-relevant data. Recruiters remain responsible for final hiring decisions.
        </span>
      </div>
    </div>
  );
}
