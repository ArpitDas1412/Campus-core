import React from 'react';
import { Lightbulb, ArrowUpRight, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export default function ImprovementRecommendations({ recommendations = [], candidateName = 'Candidate' }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        padding: '28px 32px',
        boxShadow: '0 4px 20px rgba(16, 27, 54, 0.05)',
        marginBottom: '28px'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
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
          <Lightbulb size={20} />
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#3978F6', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            ACTIONABLE DEVELOPMENT
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            How could {candidateName} improve their fit?
          </h2>
        </div>
      </div>

      <p style={{ fontSize: '13.5px', color: '#64748B', margin: '0 0 20px', lineHeight: 1.4 }}>
        Targeted recommendations derived directly from missing preferred skills and evidence gaps. Does not prescribe already mastered competencies:
      </p>

      {/* Recommendations Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {recommendations.map((rec, index) => (
          <div
            key={index}
            style={{
              padding: '16px 20px',
              backgroundColor: '#F8FAFD',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#3978F6';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.backgroundColor = '#F8FAFD';
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '13px',
                flexShrink: 0
              }}
            >
              {index + 1}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', lineHeight: 1.4 }}>
                {rec}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                Addresses active job preference gap • Potential +1 to +3 point fit enhancement
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
