import React from 'react';
import { Users, CheckCircle2, Award, Sparkles, AlertTriangle, Filter, Target } from 'lucide-react';

export default function MatchingSummaryKpis({
  summary,
  selectedTierFilter,
  onSelectTierFilter,
  onOpenIneligible
}) {
  const {
    totalAnalyzed = 0,
    eligibleCount = 0,
    ineligibleCount = 0,
    distribution = { strong: 0, good: 0, potential: 0, partial: 0, low: 0 }
  } = summary || {};

  const cards = [
    {
      id: 'all',
      title: 'Candidates Analyzed',
      count: totalAnalyzed,
      desc: 'Full campus cohort pool',
      icon: Users,
      color: '#3978F6',
      bgColor: '#EEF4FE',
      borderColor: '#DBEAFE',
      clickable: false
    },
    {
      id: 'eligible',
      title: 'Eligible Candidates',
      count: eligibleCount,
      desc: 'Passed hard requirements',
      icon: CheckCircle2,
      color: '#10B981',
      bgColor: '#ECFDF5',
      borderColor: '#A7F3D0',
      clickable: true
    },
    {
      id: 'Strong Match',
      title: 'Strong Matches',
      count: distribution.strong,
      desc: '90–100% composite score',
      icon: Award,
      color: '#059669',
      bgColor: '#F0FDF4',
      borderColor: '#86EFAC',
      clickable: true
    },
    {
      id: 'Good Match',
      title: 'Good Matches',
      count: distribution.good,
      desc: '80–89% composite score',
      icon: Sparkles,
      color: '#2563EB',
      bgColor: '#EFF6FF',
      borderColor: '#BFDBFE',
      clickable: true
    },
    {
      id: 'Potential Match',
      title: 'Potential Matches',
      count: distribution.potential,
      desc: '70–79% composite score',
      icon: Target,
      color: '#0E8EA8',
      bgColor: '#EBF9FD',
      borderColor: '#BAE6FD',
      clickable: true
    },
    {
      id: 'ineligible',
      title: 'Excluded by Eligibility',
      count: ineligibleCount,
      desc: 'Failed CGPA, backlog or branch',
      icon: AlertTriangle,
      color: '#DC2626',
      bgColor: '#FEF2F2',
      borderColor: '#FECACA',
      clickable: true,
      isIneligibleAction: true
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '14px',
        marginBottom: '28px'
      }}
    >
      {cards.map((c) => {
        const Icon = c.icon;
        const isSelected = selectedTierFilter === c.id;

        return (
          <div
            key={c.id}
            onClick={() => {
              if (c.isIneligibleAction) {
                if (onOpenIneligible) onOpenIneligible();
              } else if (c.clickable) {
                onSelectTierFilter(isSelected ? 'All' : c.id === 'eligible' ? 'All' : c.id);
              }
            }}
            style={{
              padding: '16px 18px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: isSelected ? `2px solid ${c.color}` : '1.5px solid #E2E8F0',
              boxShadow: isSelected
                ? `0 6px 16px -2px ${c.color}25`
                : '0 2px 6px rgba(16, 27, 54, 0.03)',
              cursor: c.clickable ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              if (c.clickable) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = c.color;
              }
            }}
            onMouseOut={(e) => {
              if (c.clickable && !isSelected) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                {c.title}
              </span>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: c.bgColor,
                  color: c.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon size={15} />
              </div>
            </div>

            <div style={{ fontSize: '26px', fontWeight: 800, color: c.color, lineHeight: 1.1 }}>
              {c.count}
            </div>

            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px' }}>
              {c.desc}
            </div>

            {isSelected && (
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: c.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                ● Active Filter
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
