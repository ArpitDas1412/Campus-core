import React from 'react';
import { Loader2, CheckCircle2, Sparkles, Brain, Cpu, Database } from 'lucide-react';

export default function MatchingProgress({ currentStep = 7, totalSteps = 7 }) {
  const steps = [
    { label: 'Analyzing placement drive requirements...', detail: 'Job parameters, required & preferred competencies loaded' },
    { label: 'Checking hard academic eligibility rules...', detail: 'CGPA baselines, backlogs, department filters evaluated' },
    { label: 'Comparing candidate technical skills & proficiency...', detail: 'Normalized syntax, proficiency levels & semantic aliases matched' },
    { label: 'Evaluating student project relevance...', detail: 'Capstone tech stacks & architectural keywords scanned' },
    { label: 'Processing Layer 5 resume intelligence signals...', detail: 'ATS keywords, extracted competencies & experience weighed' },
    { label: 'Synthesizing multi-factor candidate match scores...', detail: 'Configured weights applied across 6 decision vectors' },
    { label: 'Ranking candidate talent pool & tiers...', detail: 'Top matches identified & preliminary rationales generated' }
  ];

  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #DBEAFE',
        padding: '36px 32px',
        boxShadow: '0 12px 32px -4px rgba(57, 120, 246, 0.12)',
        maxWidth: '720px',
        margin: '40px auto',
        textAlign: 'center'
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #101B36 0%, #3978F6 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 8px 16px -2px rgba(57, 120, 246, 0.4)'
        }}
      >
        <Brain size={28} className="animate-pulse" />
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', margin: '0 0 6px' }}>
        CampusCore AI Candidate Matching in Progress
      </h2>
      <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 24px' }}>
        Synthesizing student competencies against placement drive specifications...
      </p>

      {/* Progress Bar */}
      <div
        style={{
          height: '8px',
          backgroundColor: '#EFF6FF',
          borderRadius: '999px',
          overflow: 'hidden',
          marginBottom: '28px',
          border: '1px solid #BFDBFE'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            backgroundColor: '#3978F6',
            borderRadius: '999px',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Step Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        {steps.map((st, i) => {
          const isDone = i + 1 < currentStep;
          const isCurrent = i + 1 === currentStep;

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '10px',
                backgroundColor: isDone ? '#F0FDF4' : isCurrent ? '#EFF6FF' : '#F8FAFC',
                border: `1px solid ${isDone ? '#BBF7D0' : isCurrent ? '#BFDBFE' : '#E2E8F0'}`,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ flexShrink: 0 }}>
                {isDone ? (
                  <CheckCircle2 size={18} style={{ color: '#10B981' }} />
                ) : isCurrent ? (
                  <Loader2 size={18} className="animate-spin" style={{ color: '#3978F6' }} />
                ) : (
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: '1.5px dashed #CBD5E1'
                    }}
                  />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '13.5px',
                    fontWeight: isCurrent ? 700 : 600,
                    color: isDone ? '#065F46' : isCurrent ? '#1D4ED8' : '#64748B'
                  }}
                >
                  {st.label}
                </div>
                {(isDone || isCurrent) && (
                  <div style={{ fontSize: '11.5px', color: isDone ? '#047857' : '#3B82F6', marginTop: '2px' }}>
                    {st.detail}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
