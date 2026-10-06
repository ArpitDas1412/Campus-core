import React from 'react';
import { ShieldCheck, HeartHandshake, AlertCircle } from 'lucide-react';

export default function ResponsibleAiNotice() {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '22px 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        marginBottom: '28px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px'
          }}
        >
          <ShieldCheck size={22} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h4
              style={{
                fontSize: '15px',
                fontWeight: 900,
                color: '#101B36',
                margin: 0,
                letterSpacing: '-0.01em'
              }}
            >
              Responsible AI & Human-in-the-Loop Governance
            </h4>
            <span
              style={{
                padding: '2px 8px',
                borderRadius: '9999px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                fontSize: '11px',
                fontWeight: 800
              }}
            >
              AI RECOMMENDS • HUMANS DECIDE
            </span>
          </div>

          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '0 0 12px' }}>
            CampusCore recommendations use job-relevant academic, skill, project, resume, experience,
            certification and eligibility signals. AI recommendations are decision-support signals, not
            automatic hiring decisions.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
              fontSize: '12px',
              color: '#059669',
              fontWeight: 600
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✓</span>
              <span>Explicitly Excludes Religion, Caste & Gender</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✓</span>
              <span>Excludes Family & Demographic Background</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✓</span>
              <span>Full Recruiter Override & Audit Trail Supported</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
