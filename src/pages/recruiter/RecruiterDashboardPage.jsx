import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Users,
  UserCheck,
  Award,
  Sparkles,
  ArrowUpRight,
  PlusCircle,
  Calendar,
  Clock,
  ArrowRight,
  Eye,
  Edit3,
  Copy,
  Archive,
  CheckCircle2,
  Filter,
  Search,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function RecruiterDashboardPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(recruiterService.getJobs());
  const [selectedPipelineStage, setSelectedPipelineStage] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  const stats = recruiterService.getDashboardStats();
  const funnel = recruiterService.getFunnelData();

  const handleDuplicate = (jobId) => {
    const newJob = recruiterService.duplicateJob(jobId);
    setJobs(recruiterService.getJobs());
    setActionSuccess(`Drive duplicated as "${newJob.title} (Copy)"`);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleArchive = (jobId) => {
    recruiterService.archiveJob(jobId);
    setJobs(recruiterService.getJobs());
    setActionSuccess('Drive status updated to Archived');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const kpiCards = [
    {
      title: 'Active Drives',
      value: stats.activeDrives,
      trend: '+1 this week',
      trendColor: '#16A34A',
      subtext: '4 ongoing placement campaigns',
      icon: Briefcase,
      color: '#3978F6',
      bg: '#EFF6FF',
      onClick: () => navigate('/recruiter/jobs')
    },
    {
      title: 'Applications',
      value: stats.applications.toLocaleString(),
      trend: '↑ 14.8%',
      trendColor: '#16A34A',
      subtext: 'vs last recruitment cycle',
      icon: Users,
      color: '#0E8EA8',
      bg: '#E0F7FA',
      onClick: () => navigate('/recruiter/candidates')
    },
    {
      title: 'Eligible Candidates',
      value: stats.eligibleCandidates.toLocaleString(),
      trend: '45.6% pass rate',
      trendColor: '#3978F6',
      subtext: 'met CGPA & criteria rules',
      icon: UserCheck,
      color: '#10B981',
      bg: '#ECFDF5',
      onClick: () => navigate('/recruiter/candidates?status=Eligible')
    },
    {
      title: 'AI Recommended',
      value: stats.aiRecommended,
      trend: 'Top 18.7%',
      trendColor: '#8B5CF6',
      subtext: 'high readiness & skill match',
      icon: Sparkles,
      color: '#8B5CF6',
      bg: '#F5F3FF',
      onClick: () => navigate('/recruiter/candidates?status=AI Recommended')
    },
    {
      title: 'Shortlisted',
      value: stats.shortlisted,
      trend: 'Stage 3 / 5',
      trendColor: '#D97706',
      subtext: 'queued for technical rounds',
      icon: UserCheck,
      color: '#F59E0B',
      bg: '#FEF3C7',
      onClick: () => navigate('/recruiter/shortlists')
    },
    {
      title: 'Offers Released',
      value: stats.offers,
      trend: '18 Accepted',
      trendColor: '#16A34A',
      subtext: '100% acceptance to date',
      icon: Award,
      color: '#10B981',
      bg: '#ECFDF5',
      onClick: () => navigate('/recruiter/offers')
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return { bg: '#ECFDF5', color: '#065F46', border: '#A7F3D0' };
      case 'Draft':
        return { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' };
      case 'Closed':
        return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
      case 'Archived':
        return { bg: '#FEE2E2', color: '#991B1B', border: '#FECACA' };
      default:
        return { bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' };
    }
  };

  return (
    <RecruiterLayout>
      {/* Toast Notification */}
      {actionSuccess && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            right: '32px',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: 600,
            zIndex: 99
          }}
        >
          <CheckCircle2 size={18} />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '28px'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              color: '#065F46',
              fontSize: '12px',
              fontWeight: 700,
              marginBottom: '10px'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 6px #10B981'
              }}
            />
            <span>● Recruitment Season Active</span>
          </div>

          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#101B36',
              margin: '0 0 8px',
              letterSpacing: '-0.02em'
            }}
          >
            Good morning, Ananya 👋
          </h1>
          <p
            style={{
              fontSize: '14.5px',
              color: '#64748B',
              margin: 0,
              maxWidth: '680px',
              lineHeight: 1.5
            }}
          >
            Manage your campus recruitment activities, discover qualified talent and track your
            hiring pipeline at TechNova Solutions.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/recruiter/candidates')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 20px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#101B36',
              border: '1px solid #E2E8F0',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.borderColor = '#CBD5E1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
          >
            <Users size={17} color="#3978F6" />
            <span>View Candidates</span>
          </button>

          <button
            onClick={() => navigate('/recruiter/jobs/create')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 22px',
              borderRadius: '10px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(57, 120, 246, 0.35)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3978F6')}
          >
            <PlusCircle size={18} />
            <span>+ Create Placement Drive</span>
          </button>
        </div>
      </div>

      {/* KPI 6-Card Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={kpi.onClick}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 20px -3px rgba(57, 120, 246, 0.1)';
                e.currentTarget.style.borderColor = '#BFDBFE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: kpi.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: kpi.color
                  }}
                >
                  <Icon size={20} />
                </div>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: kpi.trendColor,
                    backgroundColor: '#F8FAFC',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid #F1F5F9'
                  }}
                >
                  {kpi.trend}
                </span>
              </div>

              <div
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                {kpi.title}
              </div>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#101B36',
                  marginTop: '4px',
                  letterSpacing: '-0.02em'
                }}
              >
                {kpi.value}
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
                {kpi.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* RECRUITMENT PIPELINE FUNNEL */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px 28px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          marginBottom: '28px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                Recruitment Funnel Pipeline
              </h2>
              <span
                style={{
                  fontSize: '11.5px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontWeight: 700
                }}
              >
                Interactive
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
              Click any stage below to inspect filtered candidate pools or track conversion health.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Demo recruitment cycle</span>
            <button
              onClick={() => navigate('/recruiter/candidates')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: '#3978F6',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Explore All Candidates</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* 6 Stage Interactive Funnel Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            position: 'relative'
          }}
        >
          {funnel.map((stage, idx) => {
            const isLast = idx === funnel.length - 1;
            return (
              <div
                key={stage.stage}
                onClick={() => {
                  setSelectedPipelineStage(stage.stage);
                  navigate(`/recruiter/candidates?status=${encodeURIComponent(stage.stage)}`);
                }}
                style={{
                  padding: '16px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#3978F6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  Step {idx + 1}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    color: stage.color,
                    margin: '6px 0 2px'
                  }}
                >
                  {stage.count}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                  {stage.stage}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#94A3B8',
                    marginTop: '4px'
                  }}
                >
                  {stage.pct}% conversion
                </div>

                {/* Arrow to next */}
                {!isLast && (
                  <div
                    style={{
                      position: 'absolute',
                      right: '-10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#64748B',
                      fontSize: '10px'
                    }}
                  >
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* AI Matching Connection Callout for Layer 7 */}
        <div
          style={{
            marginTop: '18px',
            padding: '12px 18px',
            borderRadius: '10px',
            backgroundColor: '#F0F9FF',
            border: '1px solid #BAE6FD',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="#0284C7" />
            <span style={{ fontSize: '13px', color: '#0369A1', fontWeight: 500 }}>
              <strong>AI Candidate Matching Ready:</strong> Preliminary matching computed across 20+
              candidate profiles. Connects automatically to Layer 7 AI candidate ranking.
            </span>
          </div>
          <button
            onClick={() => navigate('/recruiter/candidates')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              backgroundColor: '#0284C7',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Run AI Candidate Matching →</span>
          </button>
        </div>
      </div>

      {/* ACTIVE PLACEMENT DRIVES TABLE */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          overflow: 'hidden',
          marginBottom: '28px'
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Active Placement Drives
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
              Manage active recruitment drives, candidate pools, and job schedules.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => navigate('/recruiter/jobs')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                border: '1px solid #E2E8F0',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <span>View All ({jobs.length})</span>
            </button>

            <button
              onClick={() => navigate('/recruiter/jobs/create')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <PlusCircle size={15} />
              <span>New Drive</span>
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th
                  style={{
                    padding: '12px 20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase'
                  }}
                >
                  Job Title / Company
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase'
                  }}
                >
                  Type & Mode
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase'
                  }}
                >
                  Location
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}
                >
                  Applications
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}
                >
                  Eligible
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}
                >
                  Shortlisted
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase'
                  }}
                >
                  Deadline
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase'
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: '12px 20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    textAlign: 'right'
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => {
                const badge = getStatusBadge(job.status);
                return (
                  <tr
                    key={job.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Title */}
                    <td style={{ padding: '16px 20px' }}>
                      <div
                        onClick={() => navigate(`/recruiter/jobs/${job.id}`)}
                        style={{
                          fontSize: '14.5px',
                          fontWeight: 700,
                          color: '#101B36',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#3978F6')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#101B36')}
                      >
                        {job.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                        {job.companyName} • {job.department}
                      </div>
                    </td>

                    {/* Type & Mode */}
                    <td style={{ padding: '16px 16px', fontSize: '13px', color: '#334155' }}>
                      <span style={{ fontWeight: 600 }}>{job.type}</span>
                      <div style={{ fontSize: '11.5px', color: '#64748B' }}>{job.workMode}</div>
                    </td>

                    {/* Location */}
                    <td style={{ padding: '16px 16px', fontSize: '13px', color: '#334155' }}>
                      {job.location}
                    </td>

                    {/* Applications */}
                    <td
                      style={{
                        padding: '16px 16px',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#101B36',
                        textAlign: 'center'
                      }}
                    >
                      {job.applicationsCount}
                    </td>

                    {/* Eligible */}
                    <td
                      style={{
                        padding: '16px 16px',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#0284C7',
                        textAlign: 'center'
                      }}
                    >
                      {job.eligibleCount}
                    </td>

                    {/* Shortlisted */}
                    <td
                      style={{
                        padding: '16px 16px',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#16A34A',
                        textAlign: 'center'
                      }}
                    >
                      {job.shortlistedCount}
                    </td>

                    {/* Deadline */}
                    <td style={{ padding: '16px 16px', fontSize: '13px', color: '#475569' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={13} color="#94A3B8" />
                        <span>{job.schedule.applicationDeadline}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '16px 16px' }}>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: '999px',
                          backgroundColor: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`
                        }}
                      >
                        {job.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <button
                          onClick={() => navigate(`/recruiter/jobs/${job.id}`)}
                          title="View Job Details"
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: '#FFFFFF',
                            color: '#334155',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => navigate(`/recruiter/jobs/${job.id}/candidates`)}
                          title="Candidate Management"
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #BFDBFE',
                            backgroundColor: '#EFF6FF',
                            color: '#2563EB',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Users size={13} />
                          <span>Candidates</span>
                        </button>

                        <button
                          onClick={() => handleDuplicate(job.id)}
                          title="Duplicate Drive"
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: '#FFFFFF',
                            color: '#64748B',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Copy size={13} />
                        </button>

                        {job.status !== 'Archived' && (
                          <button
                            onClick={() => handleArchive(job.id)}
                            title="Archive Drive"
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              border: '1px solid #E2E8F0',
                              backgroundColor: '#FFFFFF',
                              color: '#64748B',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Archive size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </RecruiterLayout>
  );
}
