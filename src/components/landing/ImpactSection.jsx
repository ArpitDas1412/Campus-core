import React from 'react';
import { Users, Building, Briefcase, Target, Info, Sparkles, TrendingUp } from 'lucide-react';

export default function ImpactSection() {
  const stats = [
    {
      id: 'students',
      value: '1,200+',
      label: 'Students Enrolled',
      sublabel: 'Across engineering & business cohorts',
      growth: '+28% YoY',
      icon: Users,
      color: '#3978F6',
      bg: '#EEF4FF'
    },
    {
      id: 'recruiters',
      value: '85+',
      label: 'Corporate Recruiters',
      sublabel: 'Fortune 500 & high-growth unicorns',
      growth: '35 Tier-1 Brands',
      icon: Building,
      color: '#0E8EA8',
      bg: '#EBF9FD'
    },
    {
      id: 'offers',
      value: '320+',
      label: 'Placement Offers',
      sublabel: 'Verified CTCs up to 34.5 LPA',
      growth: '100% Verified',
      icon: Briefcase,
      color: '#10B981',
      bg: '#ECFDF5'
    },
    {
      id: 'readiness',
      value: '92%',
      label: 'Placement Readiness',
      sublabel: 'Average benchmark score across cohort',
      growth: 'AI-Certified',
      icon: Target,
      color: '#8B5CF6',
      bg: '#F5F3FF'
    }
  ];

  return (
    <section
      id="impact"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: '#F1F5F9',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}
          >
            <TrendingUp size={14} style={{ color: '#3978F6' }} />
            <span>Platform Benchmark & Scale</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 3.2vw, 38px)',
              fontWeight: 800,
              color: '#101B36',
              marginBottom: '14px',
              letterSpacing: '-0.02em'
            }}
          >
            Proven Institutional Impact
          </h2>

          <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.6 }}>
            Consolidating multi-department placement pipelines into unified intelligent operations.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                style={{
                  padding: '28px 24px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.05)',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px -4px rgba(16, 27, 54, 0.1)';
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(16, 27, 54, 0.05)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                {/* Top Row: Icon & Growth Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: stat.bg,
                      color: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: '6px',
                      backgroundColor: stat.bg,
                      color: stat.color
                    }}
                  >
                    {stat.growth}
                  </span>
                </div>

                {/* Big Metric Value */}
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 800,
                    color: '#101B36',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    marginBottom: '6px'
                  }}
                >
                  {stat.value}
                </div>

                {/* Label & Sublabel */}
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginBottom: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.4 }}>
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Notice identifying as DEMO DATA (Explicit Requirement) */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '12px 18px',
            backgroundColor: '#F8FAFD',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            textAlign: 'center'
          }}
        >
          <Info size={16} style={{ color: '#3978F6', flexShrink: 0 }} />
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
            <strong style={{ color: '#101B36' }}>Demo Data Notice:</strong> The indicators above represent illustrative demo figures for platform simulation and hackathon demonstration, not live production statistics.
          </p>
        </div>
      </div>
    </section>
  );
}
