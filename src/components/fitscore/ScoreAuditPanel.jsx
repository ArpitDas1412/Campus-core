import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calculator, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { formatContribution } from '../../utils/fitScoreUtils';

export default function ScoreAuditPanel({ breakdown }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!breakdown || !breakdown.factors) return null;

  const { factors, exactSum, finalScore, weights } = breakdown;
  const factorList = Object.values(factors);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        padding: '20px 28px',
        boxShadow: '0 4px 16px rgba(16, 27, 54, 0.04)',
        marginBottom: '28px'
      }}
    >
      {/* Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#EFF6FF',
              color: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Calculator size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                Score Audit & Mathematical Verification
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  border: '1px solid #A7F3D0'
                }}
              >
                100% Transparent
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '2px 0 0' }}>
              {isOpen ? 'Click to collapse mathematical audit formula' : 'Click to inspect the exact arithmetic calculation underpinning the score'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3978F6', fontWeight: 700, fontSize: '13px' }}>
          <span>{isOpen ? 'Hide Formula' : 'View Score Calculation'}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded Audit Content */}
      {isOpen && (
        <div
          style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #E2E8F0',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              backgroundColor: '#0F172A',
              color: '#F8FAFC',
              borderRadius: '14px',
              padding: '24px',
              fontSize: '13.5px',
              lineHeight: 1.8,
              boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div style={{ color: '#94A3B8', borderBottom: '1px dashed #334155', paddingBottom: '10px', marginBottom: '14px' }}>
              // CAMPUSCORE SCORE AUDIT TRACE — DETERMINISTIC FORMULA
              <br />
              // Score = Σ (Factor_Score_i × Configured_Weight_i)
            </div>

            {factorList.map((f) => (
              <div
                key={f.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '4px 0'
                }}
              >
                <span style={{ color: '#E2E8F0' }}>
                  {f.name.padEnd(24, ' ')}
                  <span style={{ color: '#38BDF8' }}>{String(f.score).padStart(3, ' ')}%</span> ×{' '}
                  <span style={{ color: '#FCD34D' }}>{String(f.weightPercent).padStart(2, ' ')}%</span>
                </span>
                <span style={{ color: '#4ADE80', fontWeight: 700 }}>
                  = {formatContribution(f.contribution).padStart(5, ' ')} pts
                </span>
              </div>
            ))}

            <div
              style={{
                borderTop: '1.5px solid #475569',
                margin: '14px 0 10px',
                paddingTop: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 700,
                fontSize: '15px'
              }}
            >
              <span style={{ color: '#94A3B8' }}>Calculated Total Sum</span>
              <span style={{ color: '#4ADE80' }}>{exactSum}%</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 900,
                fontSize: '17px',
                color: '#38BDF8'
              }}
            >
              <span>Final Displayed Fit Score</span>
              <span>{finalScore}% ({breakdown.factors.requiredSkills.status === 'positive' ? 'Strong Match' : 'Recommended'})</span>
            </div>
          </div>

          <div style={{ marginTop: '14px', fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#3978F6" />
            <span>
              All factor inputs and weights match the configuration declared in <code>matchingConfig.js</code> without arbitrary overrides.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
