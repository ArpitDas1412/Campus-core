import React, { useState } from 'react';
import { Info, Sparkles, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export default function AiExplanationNotice() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #DBEAFE',
        padding: '18px 24px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #F8FAFD 0%, #FFFFFF 100%)',
        boxShadow: '0 2px 12px rgba(57, 120, 246, 0.05)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#EFF6FF',
              color: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Sparkles size={18} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#101B36',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                HOW CAMPUSCORE CALCULATES FIT
              </span>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE'
                }}
              >
                DEMO EXPLAINABLE AI
              </span>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  border: '1px solid #A7F3D0'
                }}
              >
                CONFIGURABLE RULE ENGINE
              </span>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', margin: '4px 0 0', lineHeight: 1.4 }}>
              CampusCore combines job requirements, eligibility, skills, projects, resume signals, experience and certifications to generate a configurable preliminary fit score. <strong>The score is a decision-support signal, not a guarantee of hiring success.</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#3978F6',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          <span>{isExpanded ? 'Hide Framework Details' : 'Methodology Details'}</span>
          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      {isExpanded && (
        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #E2E8F0',
            fontSize: '13px',
            color: '#334155',
            lineHeight: 1.6
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 700, color: '#101B36', marginBottom: '4px' }}>Deterministic Weight Allocation</div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
                Weights are assigned across 6 core pillars: Skills (40%), Academics (20%), Projects (15%), Resume (10%), Experience (10%), and Certifications (5%).
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 700, color: '#101B36', marginBottom: '4px' }}>Transparent Evidence Trail</div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
                Every score component links directly to student records, verified GitHub repositories, and parsed resume sections—eliminating opaque black-box scoring.
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 700, color: '#101B36', marginBottom: '4px' }}>Ethical & Responsible Matching</div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
                Protected personal attributes (gender, caste, religion, demographic background) are categorically excluded from candidate matching and ranking models.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
