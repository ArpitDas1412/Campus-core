import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function MatchDistributionChart({ distribution = {}, totalEligible = 0 }) {
  const brackets = [
    { label: '90–100% (Strong)', count: distribution.strong || 0, color: '#059669', bgColor: '#ECFDF5' },
    { label: '80–89% (Good)', count: distribution.good || 0, color: '#2563EB', bgColor: '#EFF6FF' },
    { label: '70–79% (Potential)', count: distribution.potential || 0, color: '#0E8EA8', bgColor: '#EBF9FD' },
    { label: '60–69% (Partial)', count: distribution.partial || 0, color: '#D97706', bgColor: '#FFFBEB' },
    { label: '<60% (Low Match)', count: distribution.low || 0, color: '#64748B', bgColor: '#F8FAFC' }
  ];

  const maxCount = Math.max(1, ...brackets.map((b) => b.count));

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
            <BarChart3 size={18} style={{ color: '#3978F6' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Candidate Match Distribution
            </h3>
          </div>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
            {totalEligible} Eligible Profiles
          </span>
        </div>
        <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 16px' }}>
          Distribution curve across recommendation tiers based on current campus cohort
        </p>

        {/* Bars Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {brackets.map((b, i) => {
            const barWidth = `${Math.max(8, Math.round((b.count / maxCount) * 100))}%`;
            const pctOfEligible = totalEligible > 0 ? Math.round((b.count / totalEligible) * 100) : 0;

            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#334155', fontWeight: 600 }}>{b.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 800, color: b.color }}>{b.count}</span>
                    <span style={{ color: '#94A3B8', fontSize: '11px' }}>({pctOfEligible}%)</span>
                  </div>
                </div>

                <div
                  style={{
                    height: '10px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '999px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: barWidth,
                      backgroundColor: b.color,
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
        Based on current demo candidate dataset • Normal distribution
      </div>
    </div>
  );
}
