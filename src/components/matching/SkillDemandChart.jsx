import React from 'react';
import { Target, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SkillDemandChart({ skillDemandVsSupply = [] }) {
  if (!skillDemandVsSupply || skillDemandVsSupply.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #E2E8F0',
        padding: '20px 22px',
        boxShadow: '0 2px 10px rgba(16, 27, 54, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} style={{ color: '#0E8EA8' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Job Skill Demand vs Candidate Coverage
            </h3>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: '#EBF9FD',
              color: '#0E8EA8'
            }}
          >
            Curriculum Alignment
          </span>
        </div>
        <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 16px' }}>
          Comparing corporate job technical requisitions against aggregate student talent availability
        </p>

        {/* Skill Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {skillDemandVsSupply.slice(0, 6).map((item, idx) => {
            const barColor = item.isRequired ? '#3978F6' : '#8B5CF6';

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 700, color: '#101B36' }}>{item.skill}</span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        backgroundColor: item.isRequired ? '#EFF6FF' : '#F5F3FF',
                        color: item.isRequired ? '#2563EB' : '#7C3AED'
                      }}
                    >
                      {item.demandLevel}
                    </span>
                  </div>

                  <span style={{ fontWeight: 700, color: barColor }}>
                    {item.candidateCoverage} ({item.candidateCount} students)
                  </span>
                </div>

                <div
                  style={{
                    height: '8px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '999px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${item.coveragePercentage}%`,
                      backgroundColor: barColor,
                      borderRadius: '999px',
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F1F5F9', fontSize: '11px', color: '#94A3B8' }}>
        Feeds institutional training intelligence & Layer 13 curriculum placement analytics
      </div>
    </div>
  );
}
