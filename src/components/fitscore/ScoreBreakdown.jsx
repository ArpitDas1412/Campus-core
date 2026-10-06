import React from 'react';
import {
  Code2,
  GraduationCap,
  FolderGit2,
  FileText,
  Briefcase,
  Award,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { FACTOR_DEFINITIONS, formatContribution } from '../../utils/fitScoreUtils';

export default function ScoreBreakdown({ factors, overallScore, exactSum }) {
  if (!factors) return null;

  const factorIcons = {
    requiredSkills: Code2,
    academicEligibility: GraduationCap,
    projectRelevance: FolderGit2,
    resumeRelevance: FileText,
    experience: Briefcase,
    certifications: Award
  };

  const factorList = Object.values(factors);

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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #F1F5F9'
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
              FACTOR ATTRIBUTION
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB'
              }}
            >
              Demo Scoring Configuration
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Why {overallScore}%? Multi-Factor Score Breakdown
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Every point in the final fit score is attributed to verified profile evidence multiplied by its configurable decision weight.
          </p>
        </div>

        {/* Total Score Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            padding: '10px 18px',
            backgroundColor: '#F8FAFD',
            borderRadius: '12px',
            border: '1.5px solid #DBEAFE'
          }}
        >
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#64748B' }}>
            Calculated Sum:
          </span>
          <span style={{ fontSize: '20px', fontWeight: 900, color: '#059669' }}>
            {exactSum ? `${exactSum}%` : `${overallScore}%`}
          </span>
        </div>
      </div>

      {/* Factors Table / Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {factorList.map((factor) => {
          const meta = FACTOR_DEFINITIONS[factor.id] || {};
          const Icon = factorIcons[factor.id] || Code2;
          const statusColor =
            factor.status === 'positive'
              ? '#059669'
              : factor.status === 'neutral'
              ? '#2563EB'
              : '#D97706';
          const statusBg =
            factor.status === 'positive'
              ? '#ECFDF5'
              : factor.status === 'neutral'
              ? '#EFF6FF'
              : '#FFFBEB';

          return (
            <div
              key={factor.id}
              style={{
                padding: '16px 20px',
                borderRadius: '14px',
                backgroundColor: '#F8FAFD',
                border: '1px solid #E2E8F0',
                display: 'grid',
                gridTemplateColumns: 'minmax(200px, 1.2fr) minmax(180px, 2fr) minmax(140px, 1fr) minmax(100px, 0.8fr)',
                gap: '20px',
                alignItems: 'center',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = meta.color || '#3978F6';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.backgroundColor = '#F8FAFD';
              }}
            >
              {/* Col 1: Factor Name & Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: meta.bgColor || '#EFF6FF',
                    color: meta.color || '#3978F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#101B36' }}>
                    {factor.name}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                    Weight: <strong>{factor.weightPercent}%</strong> of total fit
                  </div>
                </div>
              </div>

              {/* Col 2: Score & Visual Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12.5px' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>Pillar Score</span>
                  <span style={{ fontWeight: 800, color: '#101B36' }}>{factor.score}%</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#E2E8F0',
                    borderRadius: '999px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: `${factor.score}%`,
                      height: '100%',
                      backgroundColor: meta.color || '#3978F6',
                      borderRadius: '999px',
                      transition: 'width 0.8s ease'
                    }}
                  />
                </div>
              </div>

              {/* Col 3: Short Explanation */}
              <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                {factor.explanation}
              </div>

              {/* Col 4: Contribution Points */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                  Contribution
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '3px' }}>
                  <span style={{ fontSize: '19px', fontWeight: 900, color: '#101B36' }}>
                    +{formatContribution(factor.contribution)}
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>
                    / {factor.maxContribution}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
