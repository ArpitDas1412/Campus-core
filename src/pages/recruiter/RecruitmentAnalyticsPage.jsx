import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  UserCheck,
  Award,
  Sparkles,
  PieChart,
  Calendar,
  Shield,
  Layers
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function RecruitmentAnalyticsPage() {
  const analytics = recruiterService.getRecruitmentAnalytics();

  const metrics = [
    { title: 'Applications', value: '684', change: '↑ 14.8%', sub: 'Total pool received' },
    { title: 'Eligibility Rate', value: '45.6%', change: '312 students', sub: 'Passed criteria cutoff' },
    { title: 'AI Recommended', value: '128', change: 'Top 18.7%', sub: 'High skill alignment' },
    { title: 'Shortlist Rate', value: '27.5%', change: '86 candidates', sub: 'Advancing to rounds' },
    { title: 'Interview Conversion', value: '48.8%', change: '42 panels', sub: 'Technical evaluation' },
    { title: 'Offer Conversion', value: '42.8%', change: '18 offers', sub: 'Final selections' }
  ];

  return (
    <RecruiterLayout>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#101B36',
              margin: 0,
              letterSpacing: '-0.02em'
            }}
          >
            Recruitment Analytics & Insights
          </h1>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE'
            }}
          >
            Real-time Pipeline Telemetry
          </span>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
          Conversion velocity, department talent distribution, and skill demand telemetry for TechNova Solutions.
        </p>
      </div>

      {/* Mandatory Disclaimer Badge */}
      <div
        style={{
          padding: '12px 18px',
          borderRadius: '10px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          fontSize: '12.5px',
          color: '#64748B',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Shield size={16} color="#3978F6" />
        <span>
          <strong>Illustrative recruitment analytics:</strong> Metrics and distributions displayed are
          generated from sample campus placement data for demonstration purposes.
        </span>
      </div>

      {/* 6 High-Level Conversion Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        {metrics.map((m, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '18px 20px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>
              {m.title}
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#101B36', marginTop: '4px' }}>
              {m.value}
            </div>
            <div style={{ fontSize: '12px', color: '#16A34A', fontWeight: 700, marginTop: '2px' }}>
              {m.change}
            </div>
            <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '2px' }}>
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* 2 Column Charts Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '24px',
          marginBottom: '28px'
        }}
      >
        {/* Candidate Recruitment Funnel */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              End-to-End Candidate Funnel
            </h3>
            <span style={{ fontSize: '12px', color: '#64748B' }}>6 Stages</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {analytics.funnel.map((step) => {
              const maxVal = 684;
              const widthPct = Math.max(12, Math.round((step.count / maxVal) * 100));

              return (
                <div key={step.stage}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#101B36' }}>{step.stage}</span>
                    <span style={{ fontWeight: 800, color: step.color }}>
                      {step.count} ({step.pct}% yield)
                    </span>
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
                        width: `${widthPct}%`,
                        backgroundColor: step.color,
                        borderRadius: '999px',
                        transition: 'width 0.6s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Talent Concentration */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Department Talent Distribution
            </h3>
            <span style={{ fontSize: '12px', color: '#64748B' }}>5 Engineering Depts</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {analytics.deptDistribution.map((dept, i) => {
              const colors = ['#3978F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
              const c = colors[i % colors.length];

              return (
                <div key={dept.department}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: '#334155' }}>{dept.department}</span>
                    <span style={{ fontWeight: 700, color: '#101B36' }}>
                      {dept.count} candidates ({dept.percentage}%)
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
                        width: `${dept.percentage}%`,
                        backgroundColor: c,
                        borderRadius: '999px'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2 Column: Skill Demand & Weekly Trend */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        {/* Most Demanded Technical Skills */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '0 0 16px' }}>
            Skill Demand vs Applicant Supply
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analytics.skillDemand.map((sk) => (
              <div
                key={sk.skill}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                    {sk.skill}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor:
                        sk.importance === 'High'
                          ? '#FEF2F2'
                          : sk.importance === 'Medium'
                          ? '#FEF3C7'
                          : '#EFF6FF',
                      color:
                        sk.importance === 'High'
                          ? '#DC2626'
                          : sk.importance === 'Medium'
                          ? '#D97706'
                          : '#2563EB'
                    }}
                  >
                    {sk.importance} Demand
                  </span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#3978F6' }}>
                  {sk.applicants} applicants ({sk.pct}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Velocity Over Weeks */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Campus Application Velocity
            </h3>
            <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 700 }}>
              Current Season
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '180px', padding: '16px 0 0' }}>
            {analytics.applicationTrend.map((t) => {
              const heightPct = Math.round((t.count / 220) * 100);
              return (
                <div
                  key={t.period}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#3978F6', marginBottom: '4px' }}>
                    {t.count}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '44px',
                      height: `${heightPct}%`,
                      backgroundColor: '#3978F6',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s ease'
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#64748B', marginTop: '6px', fontWeight: 600 }}>
                    {t.period}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
