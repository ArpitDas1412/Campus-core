import React from 'react';
import {
  Users,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Target,
  UserCheck
} from 'lucide-react';

export default function ShortlistStats({ metrics = {} }) {
  const cards = [
    {
      id: 'analyzed',
      label: 'Candidates Analyzed',
      value: metrics.totalAnalyzed ?? 312,
      subtext: 'Applicant pool evaluated',
      icon: Users,
      accentColor: '#3B82F6',
      bgColor: '#EFF6FF',
      borderColor: '#DBEAFE'
    },
    {
      id: 'recommended',
      label: 'AI Recommended',
      value: metrics.recommendedCount ?? 86,
      subtext: 'High fit & criteria matched',
      icon: Sparkles,
      accentColor: '#10B981',
      bgColor: '#ECFDF5',
      borderColor: '#A7F3D0',
      badge: 'Priority'
    },
    {
      id: 'strong',
      label: 'Strong Matches',
      value: metrics.strongMatchesCount ?? 42,
      subtext: 'Fit score ≥ 90%',
      icon: CheckCircle2,
      accentColor: '#7C3AED',
      bgColor: '#F5F3FF',
      borderColor: '#DDD6FE'
    },
    {
      id: 'needsReview',
      label: 'Needs Review',
      value: metrics.needsReviewCount ?? 28,
      subtext: 'Potential with skill gaps',
      icon: AlertCircle,
      accentColor: '#F59E0B',
      bgColor: '#FFFBEB',
      borderColor: '#FDE68A'
    },
    {
      id: 'eligible',
      label: 'Eligible Candidates',
      value: metrics.eligibleCount ?? 274,
      subtext: 'Passed hard academic gates',
      icon: ShieldCheck,
      accentColor: '#0E8EA8',
      bgColor: '#E0F7FA',
      borderColor: '#B2EBF2'
    },
    {
      id: 'target',
      label: 'Target Shortlist',
      value: metrics.targetShortlist ?? 125,
      subtext: `${metrics.shortlistedCount ?? 0} currently shortlisted`,
      icon: Target,
      accentColor: '#2563EB',
      bgColor: '#F8FAFC',
      borderColor: '#E2E8F0',
      isTarget: true
    }
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px'
        }}
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: `1px solid ${card.borderColor}`,
                padding: '18px 20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
            >
              {/* Header Icon + Label */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: card.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.accentColor
                  }}
                >
                  <Icon size={18} />
                </div>

                {card.badge && (
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: card.bgColor,
                      color: card.accentColor,
                      fontSize: '11px',
                      fontWeight: 800,
                      border: `1px solid ${card.borderColor}`
                    }}
                  >
                    {card.badge}
                  </span>
                )}
              </div>

              {/* Metric Value */}
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#101B36',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '4px'
                }}
              >
                {card.value}
              </div>

              {/* Title & Subtext */}
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '2px' }}>
                {card.label}
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                {card.subtext}
              </div>

              {/* Bottom decorative bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: card.accentColor,
                  opacity: 0.8
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
