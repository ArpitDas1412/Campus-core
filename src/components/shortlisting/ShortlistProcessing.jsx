import React from 'react';
import { Sparkles, CheckCircle2, RotateCcw, Layers } from 'lucide-react';
import { PROCESSING_STEPS } from '../../data/shortlistingConfig.js';

export default function ShortlistProcessing({ currentStep = 1, totalSteps = 8 }) {
  const currentStepText = PROCESSING_STEPS[currentStep - 1] || 'Finalizing recommendation model...';
  const progressPct = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '520px',
          width: '100%',
          padding: '36px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid #E2E8F0',
          textAlign: 'center'
        }}
      >
        {/* Animated Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: '#EFF6FF',
            border: '2px solid #BFDBFE',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2563EB',
            position: 'relative'
          }}
        >
          <Sparkles size={32} />
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '20px',
              border: '2px dashed #93C5FD',
              animation: 'spin 8s linear infinite'
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#F5F3FF',
            border: '1px solid #DDD6FE',
            color: '#7C3AED',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            marginBottom: '10px'
          }}
        >
          <Layers size={12} />
          <span>CAMPUSCORE AI RECOMMENDATION ENGINE</span>
        </div>

        <h3
          style={{
            fontSize: '22px',
            fontWeight: 900,
            color: '#101B36',
            margin: '0 0 8px',
            letterSpacing: '-0.02em'
          }}
        >
          Generating Smart Shortlist
        </h3>

        <p style={{ fontSize: '13.5px', color: '#64748B', margin: '0 0 24px' }}>
          Correlating Layer 7 talent match scores and Layer 8 explainable fit breakdowns against configured criteria.
        </p>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#F1F5F9',
            borderRadius: '9999px',
            overflow: 'hidden',
            marginBottom: '16px'
          }}
        >
          <div
            style={{
              width: `${progressPct}%`,
              height: '100%',
              backgroundColor: '#3978F6',
              borderRadius: '9999px',
              transition: 'width 0.25s ease'
            }}
          />
        </div>

        {/* Current Active Step */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#2563EB',
            fontWeight: 700,
            minHeight: '24px',
            marginBottom: '20px'
          }}
        >
          <RotateCcw size={14} className="animate-spin" />
          <span>{currentStepText}</span>
        </div>

        {/* Step checklist summary */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            padding: '14px',
            border: '1px solid #E2E8F0',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            fontSize: '11.5px'
          }}
        >
          {PROCESSING_STEPS.slice(0, 6).map((step, idx) => {
            const isCompleted = idx + 1 < currentStep;
            const isCurrent = idx + 1 === currentStep;
            return (
              <div
                key={step}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: isCompleted ? '#059669' : isCurrent ? '#2563EB' : '#94A3B8',
                  fontWeight: isCompleted || isCurrent ? 700 : 500
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={13} style={{ color: '#059669', flexShrink: 0 }} />
                ) : (
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: isCurrent ? '#BFDBFE' : '#E2E8F0',
                      border: isCurrent ? '2px solid #2563EB' : 'none',
                      flexShrink: 0
                    }}
                  />
                )}
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {step.replace('...', '')}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '16px', fontSize: '11px', color: '#94A3B8' }}>
          Demo Rule-Based Intelligence • Decision Support Only
        </div>
      </div>
    </div>
  );
}
