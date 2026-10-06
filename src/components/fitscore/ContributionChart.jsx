import React, { useState } from 'react';
import { BarChart3, HelpCircle, Sparkles, TrendingUp, Info } from 'lucide-react';
import { FACTOR_DEFINITIONS, formatContribution } from '../../utils/fitScoreUtils';

export default function ContributionChart({ factors, exactSum, overallScore }) {
  if (!factors) return null;

  const [hoveredFactor, setHoveredFactor] = useState(null);

  const factorList = [
    factors.requiredSkills,
    factors.academicEligibility,
    factors.projectRelevance,
    factors.resumeRelevance,
    factors.experience,
    factors.certifications
  ].filter(Boolean);

  // Maximum possible contribution across factors is 40 (for 40% weight on skills)
  const maxScale = 40;

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
      {/* Title & Explanatory Subtitle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#3978F6',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              VISUAL ATTRIBUTION
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#ECFDF5',
                color: '#059669'
              }}
            >
              Key Demo Feature
            </span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Weighted Contribution to Fit Score
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Horizontal bars illustrate the exact point impact contributed by each dimension toward the overall {overallScore}% match.
          </p>
        </div>

        {/* Legend */}
        <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#3978F6' }} />
            <span>Earned Points</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#E2E8F0' }} />
            <span>Maximum Weight Capacity</span>
          </div>
        </div>
      </div>

      {/* Stacked Segment Bar (Total Composition) */}
      <div
        style={{
          marginBottom: '24px',
          padding: '16px 20px',
          backgroundColor: '#F8FAFD',
          borderRadius: '16px',
          border: '1px solid #E2E8F0'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
          <span style={{ fontWeight: 700, color: '#101B36' }}>
            Cumulative Composite Score Distribution
          </span>
          <span style={{ fontWeight: 800, color: '#059669' }}>
            {exactSum ? `${exactSum} points` : `${overallScore} points`} (Out of 100)
          </span>
        </div>

        {/* Multi-segment stacked progress bar */}
        <div
          style={{
            height: '24px',
            backgroundColor: '#E2E8F0',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex'
          }}
        >
          {factorList.map((factor) => {
            const meta = FACTOR_DEFINITIONS[factor.id] || {};
            const pct = factor.contribution; // out of 100
            return (
              <div
                key={factor.id}
                title={`${factor.name}: +${formatContribution(factor.contribution)} pts`}
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  backgroundColor: meta.color || '#3978F6',
                  transition: 'width 0.8s ease',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onMouseOver={() => setHoveredFactor(factor.id)}
                onMouseOut={() => setHoveredFactor(null)}
              />
            );
          })}
        </div>

        {/* Stacked Bar Legend */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            marginTop: '12px',
            fontSize: '11.5px'
          }}
        >
          {factorList.map((factor) => {
            const meta = FACTOR_DEFINITIONS[factor.id] || {};
            const isHovered = hoveredFactor === factor.id;
            return (
              <div
                key={factor.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  opacity: hoveredFactor && !isHovered ? 0.45 : 1,
                  transition: 'opacity 0.2s ease',
                  fontWeight: isHovered ? 800 : 500
                }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    backgroundColor: meta.color || '#3978F6'
                  }}
                />
                <span style={{ color: '#334155' }}>{factor.name}</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>
                  +{formatContribution(factor.contribution)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Factor Horizontal Contribution Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {factorList.map((factor) => {
          const meta = FACTOR_DEFINITIONS[factor.id] || {};
          // Bar percentage normalized to max potential contribution
          const earnedPercent = (factor.contribution / factor.maxContribution) * 100;
          const barWidth = (factor.contribution / maxScale) * 100;
          const isHovered = hoveredFactor === factor.id;

          return (
            <div
              key={factor.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr 90px',
                gap: '16px',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: '10px',
                backgroundColor: isHovered ? '#F0F7FF' : 'transparent',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={() => setHoveredFactor(factor.id)}
              onMouseLeave={() => setHoveredFactor(null)}
            >
              {/* Factor Name & Weight */}
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#101B36' }}>
                  {factor.name}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  {factor.score}% score × {factor.weightPercent}% weight
                </div>
              </div>

              {/* Horizontal Bar Track */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '100%',
                    height: '18px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      width: `${barWidth}%`,
                      height: '100%',
                      backgroundColor: meta.color || '#3978F6',
                      borderRadius: '6px',
                      transition: 'width 0.8s ease',
                      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              </div>

              {/* Exact Point Contribution Value */}
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 900,
                    color: meta.color || '#101B36',
                    fontFamily: "'Outfit', monospace"
                  }}
                >
                  +{formatContribution(factor.contribution)}
                </span>
                <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '3px' }}>
                  pts
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
