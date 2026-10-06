import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Brain,
  AlertTriangle,
  Award,
  Layers,
  Users,
  Shield,
  ArrowRight,
  Code,
  GraduationCap
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';

export default function TalentInsightsPage() {
  const topInsights = [
    {
      title: 'Most Common Skill',
      value: 'Java & Spring',
      sub: '82% of applicants show proficiency',
      icon: Code,
      color: '#3978F6',
      bg: '#EFF6FF'
    },
    {
      title: 'Fastest-Growing Skill',
      value: 'Cloud & Docker',
      sub: '↑ 42% growth year-over-year',
      icon: TrendingUp,
      color: '#10B981',
      bg: '#ECFDF5'
    },
    {
      title: 'Most Common Gap',
      value: 'System Design',
      sub: 'Identified in 64% of cohort reviews',
      icon: AlertTriangle,
      color: '#D97706',
      bg: '#FEF3C7'
    },
    {
      title: 'Top Concentration',
      value: 'Computer Science',
      sub: '42% of qualified applicant volume',
      icon: GraduationCap,
      color: '#8B5CF6',
      bg: '#F5F3FF'
    }
  ];

  const commonGaps = [
    { gap: 'Low-Level System Design (LLD)', impact: 'High', studentsAffected: '142 students' },
    { gap: 'Production Docker Containerization', impact: 'High', studentsAffected: '98 students' },
    { gap: 'Cloud Orchestration (AWS / GCP)', impact: 'Medium', studentsAffected: '86 students' },
    { gap: 'Asynchronous Event Queues (Kafka)', impact: 'Medium', studentsAffected: '62 students' },
    { gap: 'API Security & OAuth2 Protocols', impact: 'Low', studentsAffected: '48 students' }
  ];

  const certificationTrends = [
    { name: 'AWS Certified Cloud Practitioner', holders: 64, trend: '+28%' },
    { name: 'Python for Data Science (IBM / Coursera)', holders: 52, trend: '+15%' },
    { name: 'Oracle Certified Java SE Developer', holders: 48, trend: '+8%' },
    { name: 'Google Cloud Associate Cloud Engineer', holders: 34, trend: '+36%' }
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
            Campus Talent Insights & Cohort Intelligence
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
            ✦ AI Predictive Signals
          </span>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
          Early-stage institutional capability mapping, verified competency distributions, and common skill gaps.
        </p>
      </div>

      {/* Mandatory Disclaimer Label */}
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
          <strong>Demo insights generated from sample campus data:</strong> This early-stage talent
          intelligence prepares data structures for Layer 7 Candidate Matching, Layer 13 Placement
          Analytics, and Layer 14 Student Intervention.
        </span>
      </div>

      {/* 4 Summary Insight Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        {topInsights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: item.bg,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}
              >
                <Icon size={20} />
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', marginTop: '2px' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                {item.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column: Identified Skill Gaps & Certification Trends */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Identified Skill Gaps across Applicant Pool */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <AlertTriangle size={18} color="#D97706" />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Frequent Curriculum & Skill Gaps
            </h3>
          </div>

          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px', lineHeight: 1.5 }}>
            Synthesized across Layer 4 Skill-Gap Analyzer outputs across all candidate applications.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {commonGaps.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                    {item.gap}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                    {item.studentsAffected}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: item.impact === 'High' ? '#FEF2F2' : '#FEF3C7',
                    color: item.impact === 'High' ? '#DC2626' : '#D97706'
                  }}
                >
                  {item.impact} Severity
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Certification Trends */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Award size={18} color="#3978F6" />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Verified Certification Trends
            </h3>
          </div>

          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px', lineHeight: 1.5 }}>
            Extracted and validated via Layer 5 Resume Intelligence credentials parser.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {certificationTrends.map((c, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                    {c.holders} verified candidate holders
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#16A34A',
                    backgroundColor: '#ECFDF5',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {c.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
