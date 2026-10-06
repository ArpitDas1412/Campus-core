import React from 'react';
import { Award, Zap, BookOpen, Code, Briefcase, Sparkles } from 'lucide-react';

export default function ShortlistMetrics({ metrics = {} }) {
  const qualityItems = [
    {
      label: 'Average Fit Score',
      value: `${metrics.avgFitScore ?? '87.4'}%`,
      sub: 'Top-tier cohort alignment',
      icon: Award,
      color: '#2563EB',
      bg: '#EFF6FF'
    },
    {
      label: 'Average Skill Coverage',
      value: `${metrics.avgSkillCoverage ?? 89}%`,
      sub: 'Core role requirements',
      icon: Zap,
      color: '#059669',
      bg: '#ECFDF5'
    },
    {
      label: 'Average Academic CGPA',
      value: metrics.avgCgpa ?? '8.42',
      sub: 'Exceeds 7.5 baseline',
      icon: BookOpen,
      color: '#7C3AED',
      bg: '#F5F3FF'
    },
    {
      label: 'Relevant Project Portfolio',
      value: `${metrics.relevantProjectCoveragePct ?? 91}%`,
      sub: 'Production-style tech stacks',
      icon: Code,
      color: '#0E8EA8',
      bg: '#E0F7FA'
    },
    {
      label: 'Internship Experience',
      value: `${metrics.internshipExperiencePct ?? 68}%`,
      sub: 'Prior industry exposure',
      icon: Briefcase,
      color: '#D97706',
      bg: '#FFFBEB'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '22px 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Sparkles size={16} />
          </div>
          <div>
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 800,
                color: '#101B36',
                margin: 0,
                letterSpacing: '-0.01em'
              }}
            >
              Recommended Shortlist Quality Overview
            </h3>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Aggregate profile standards computed across AI-recommended candidates
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: '11px',
            color: '#64748B',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            padding: '3px 8px',
            borderRadius: '6px',
            fontWeight: 600
          }}
        >
          Illustrative demo metrics
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px'
        }}
      >
        {qualityItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                padding: '14px',
                border: '1px solid #F1F5F9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: item.bg,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={14} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                  {item.label}
                </span>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#101B36',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginBottom: '2px'
                  }}
                >
                  {item.value}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>{item.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
