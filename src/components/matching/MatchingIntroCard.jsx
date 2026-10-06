import React from 'react';
import { Cpu, Info, CheckCircle2, Sliders, Shield } from 'lucide-react';
import { MATCHING_WEIGHTS } from '../../data/matchingConfig';

export default function MatchingIntroCard({ lastAnalyzed = 'Just now' }) {
  return (
    <div
      style={{
        backgroundColor: '#F8FAFD',
        borderRadius: '16px',
        border: '1.5px solid #DBEAFE',
        padding: '20px 24px',
        marginBottom: '24px',
        position: 'relative',
        background: 'linear-gradient(135deg, #F8FAFD 0%, #EFF6FF 100%)'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', maxWidth: '780px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#EEF4FF',
              color: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(57, 120, 246, 0.2)'
            }}
          >
            <Cpu size={22} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#3978F6', letterSpacing: '0.04em' }}>
                AI MATCHING ENGINE
              </span>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  border: '1px solid #FDE68A'
                }}
              >
                DEMO AI ENGINE
              </span>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.55, margin: 0 }}>
              CampusCore analyzes candidate eligibility, required & preferred technical skills, project relevance, resume signals, and verified certifications to synthesize a preliminary talent ranking.
            </p>

            {/* Weights Summary Strip */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
                marginTop: '12px',
                fontSize: '12px',
                color: '#64748B'
              }}
            >
              <span>Configured Signal Weights:</span>
              <span style={{ color: '#101B36', fontWeight: 600 }}>Skills ({MATCHING_WEIGHTS.requiredSkills * 100}%)</span>
              <span>•</span>
              <span style={{ color: '#101B36', fontWeight: 600 }}>Academics ({MATCHING_WEIGHTS.eligibilityAcademics * 100}%)</span>
              <span>•</span>
              <span style={{ color: '#101B36', fontWeight: 600 }}>Projects ({MATCHING_WEIGHTS.projectRelevance * 100}%)</span>
              <span>•</span>
              <span style={{ color: '#101B36', fontWeight: 600 }}>Resume ({MATCHING_WEIGHTS.resumeRelevance * 100}%)</span>
              <span>•</span>
              <span style={{ color: '#101B36', fontWeight: 600 }}>Experience & Certs (15%)</span>
            </div>
          </div>
        </div>

        {/* Right Info Box */}
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            fontSize: '12.5px',
            color: '#64748B',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            minWidth: '200px'
          }}
        >
          <div>
            Matching Mode: <strong style={{ color: '#101B36' }}>Campus Profile + Job Spec</strong>
          </div>
          <div>
            Last Analyzed: <strong style={{ color: '#059669' }}>{lastAnalyzed}</strong>
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
            Provider: <code style={{ color: '#4F46E5' }}>demoRuleBasedMatcher</code>
          </div>
        </div>
      </div>
    </div>
  );
}
