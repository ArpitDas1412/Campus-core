import React from 'react';
import { PieChart, CheckCircle2, AlertCircle, XCircle, ShieldAlert } from 'lucide-react';

export default function ShortlistDistributionChart({ metrics = {}, onFilterCategory }) {
  const total = metrics.totalAnalyzed || 1;

  const categories = [
    {
      id: 'Recommended',
      label: 'AI Recommended',
      count: metrics.recommendedCount ?? 86,
      color: '#10B981',
      bg: '#ECFDF5',
      border: '#A7F3D0',
      icon: CheckCircle2,
      desc: 'Top cohort meeting fit & skills'
    },
    {
      id: 'Needs Review',
      label: 'Needs Review',
      count: metrics.needsReviewCount ?? 28,
      color: '#F59E0B',
      bg: '#FFFBEB',
      border: '#FDE68A',
      icon: AlertCircle,
      desc: 'Edge-case scores or partial skills'
    },
    {
      id: 'Not Recommended',
      label: 'Not Recommended',
      count: metrics.notRecommendedCount ?? 74,
      color: '#64748B',
      bg: '#F8FAFC',
      border: '#E2E8F0',
      icon: XCircle,
      desc: 'Below target fit thresholds'
    },
    {
      id: 'Ineligible',
      label: 'Ineligible',
      count: metrics.ineligibleCount ?? 124,
      color: '#EF4444',
      bg: '#FEF2F2',
      border: '#FECACA',
      icon: ShieldAlert,
      desc: 'Fails hard academic gating'
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
            <PieChart size={16} />
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
              Shortlist Cohort Distribution
            </h3>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Breakdown of {metrics.totalAnalyzed ?? 312} analyzed candidates across recommendation tiers
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: '11px',
            color: '#64748B',
            backgroundColor: '#F1F5F9',
            padding: '3px 8px',
            borderRadius: '6px',
            fontWeight: 600
          }}
        >
          Executive Summary
        </span>
      </div>

      {/* Multi-segment stacked distribution bar */}
      <div
        style={{
          height: '14px',
          width: '100%',
          backgroundColor: '#F1F5F9',
          borderRadius: '9999px',
          overflow: 'hidden',
          display: 'flex',
          marginBottom: '20px',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)'
        }}
      >
        {categories.map((cat) => {
          const pct = Math.max(2, (cat.count / total) * 100);
          return (
            <div
              key={cat.id}
              title={`${cat.label}: ${cat.count} (${Math.round((cat.count / total) * 100)}%)`}
              style={{
                width: `${pct}%`,
                height: '100%',
                backgroundColor: cat.color,
                transition: 'width 0.4s ease'
              }}
            />
          );
        })}
      </div>

      {/* Category Cards / Pills */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const pct = Math.round((cat.count / total) * 100);
          return (
            <div
              key={cat.id}
              onClick={() => onFilterCategory && onFilterCategory(cat.id)}
              style={{
                backgroundColor: cat.bg,
                border: `1px solid ${cat.border}`,
                borderRadius: '12px',
                padding: '12px 14px',
                cursor: onFilterCategory ? 'pointer' : 'default',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (onFilterCategory) e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                if (onFilterCategory) e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon size={14} style={{ color: cat.color }} />
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#101B36' }}>
                    {cat.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: cat.color
                  }}
                >
                  {pct}%
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '2px' }}>
                <span style={{ fontSize: '20px', fontWeight: 900, color: '#101B36' }}>
                  {cat.count}
                </span>
                <span style={{ fontSize: '11.5px', color: '#64748B' }}>candidates</span>
              </div>

              <div style={{ fontSize: '11px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {cat.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
