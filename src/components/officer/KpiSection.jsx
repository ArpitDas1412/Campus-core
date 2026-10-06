import React from 'react';
import {
  Users,
  TrendingUp,
  Building2,
  Calendar,
  Award,
  AlertTriangle,
  Info,
  ArrowUpRight
} from 'lucide-react';
import { KPI_METRICS } from '../../data/analytics';

export default function KpiSection({ onCardClick }) {
  const cards = [
    {
      id: 'totalStudents',
      title: 'Total Students',
      value: KPI_METRICS.totalStudents.value,
      subtitle: KPI_METRICS.totalStudents.subtitle,
      icon: Users,
      iconBg: '#EEF4FF',
      iconColor: '#3978F6',
      trend: '+8.4%',
      trendLabel: 'vs last year',
      isProgress: false
    },
    {
      id: 'placementRate',
      title: 'Placement Rate',
      value: KPI_METRICS.placementRate.value,
      subtitle: KPI_METRICS.placementRate.subtitle,
      icon: TrendingUp,
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
      trend: '+6.2%',
      trendLabel: 'this season',
      isProgress: true,
      progressValue: 78.6
    },
    {
      id: 'activeRecruiters',
      title: 'Active Recruiters',
      value: KPI_METRICS.activeRecruiters.value,
      subtitle: KPI_METRICS.activeRecruiters.subtitle,
      icon: Building2,
      iconBg: '#F3E8FF',
      iconColor: '#8B5CF6',
      trend: '8 new',
      trendLabel: 'this month',
      isProgress: false
    },
    {
      id: 'activeDrives',
      title: 'Active Drives',
      value: KPI_METRICS.activeDrives.value,
      subtitle: KPI_METRICS.activeDrives.subtitle,
      icon: Calendar,
      iconBg: '#EBF9FD',
      iconColor: '#0E8EA8',
      trend: '4 live',
      trendLabel: 'this week',
      isProgress: false
    },
    {
      id: 'offersReceived',
      title: 'Offers Received',
      value: KPI_METRICS.offersReceived.value,
      subtitle: KPI_METRICS.offersReceived.subtitle,
      icon: Award,
      iconBg: '#ECFDF5',
      iconColor: '#059669',
      trend: '+24',
      trendLabel: 'this week',
      isProgress: false
    },
    {
      id: 'studentsAtRisk',
      title: 'Students At Risk',
      value: KPI_METRICS.studentsAtRisk.value,
      subtitle: KPI_METRICS.studentsAtRisk.subtitle,
      icon: AlertTriangle,
      iconBg: '#FEF2F2',
      iconColor: '#EF4444',
      trend: 'Attention',
      trendLabel: 'requires action',
      isAlert: true,
      isProgress: false
    }
  ];

  return (
    <section>
      {/* 6 Grid Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '12px'
        }}
      >
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => onCardClick && onCardClick(card.id)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '20px 18px',
                border: card.isAlert ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
                boxShadow: card.isAlert
                  ? '0 6px 18px -4px rgba(239, 68, 68, 0.12)'
                  : '0 4px 16px -2px rgba(16, 27, 54, 0.04)',
                position: 'relative',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: card.isAlert
                  ? 'linear-gradient(180deg, #FFFFFF 0%, #FFF5F5 100%)'
                  : '#FFFFFF'
              }}
              className="kpi-stat-card"
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = card.isAlert
                  ? '0 12px 24px -4px rgba(239, 68, 68, 0.18)'
                  : '0 12px 24px -4px rgba(16, 27, 54, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = card.isAlert
                  ? '0 6px 18px -4px rgba(239, 68, 68, 0.12)'
                  : '0 4px 16px -2px rgba(16, 27, 54, 0.04)';
              }}
            >
              {/* Header: Title + Icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: card.isAlert ? '#991B1B' : '#64748B',
                    letterSpacing: '0.01em'
                  }}
                >
                  {card.title}
                </span>

                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: card.iconBg,
                    color: card.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={18} />
                </div>
              </div>

              {/* Metric Number */}
              <div>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    color: card.isAlert ? '#B91C1C' : '#101B36',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginBottom: '8px'
                  }}
                >
                  {card.value}
                </div>

                {/* Progress Indicator for Placement Rate */}
                {card.isProgress && (
                  <div style={{ marginBottom: '8px' }}>
                    <div
                      style={{
                        height: '6px',
                        backgroundColor: '#E2E8F0',
                        borderRadius: '99px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${card.progressValue}%`,
                          height: '100%',
                          backgroundColor: '#10B981',
                          borderRadius: '99px',
                          transition: 'width 0.8s ease'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Subtitle & Trend Pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span
                    style={{
                      color: card.isAlert ? '#B91C1C' : '#64748B',
                      fontWeight: card.isAlert ? 600 : 400
                    }}
                  >
                    {card.subtitle}
                  </span>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '6px',
                      backgroundColor: card.isAlert
                        ? '#FEE2E2'
                        : card.isProgress
                        ? '#ECFDF5'
                        : '#EEF4FF',
                      color: card.isAlert
                        ? '#DC2626'
                        : card.isProgress
                        ? '#059669'
                        : '#2563EB'
                    }}
                  >
                    {card.trend}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo Data Disclaimer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11.5px',
          color: '#94A3B8',
          padding: '2px 4px'
        }}
      >
        <Info size={13} />
        <span>
          DEMO DATA for the prototype. Simulated placement metrics for institutional presentation.
        </span>
      </div>
    </section>
  );
}
