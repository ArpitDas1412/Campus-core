import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  PlusCircle,
  Search,
  Filter,
  Users,
  Eye,
  Edit3,
  Copy,
  Archive,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  MapPin
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function JobsListPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(recruiterService.getJobs());
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const handleDuplicate = (jobId) => {
    const copy = recruiterService.duplicateJob(jobId);
    setJobs(recruiterService.getJobs());
    setToastMessage(`Duplicated drive "${copy.title}"`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleArchive = (jobId) => {
    recruiterService.archiveJob(jobId);
    setJobs(recruiterService.getJobs());
    setToastMessage('Drive moved to Archived');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesTab = activeTab === 'All' || job.status === activeTab;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
      {/* Toast */}
      {toastMessage && (
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
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#101B36',
              margin: '0 0 4px',
              letterSpacing: '-0.02em'
            }}
          >
            Placement Jobs & Recruitment Drives
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
            Manage campus recruitment campaigns, track applicant counts, and coordinate hiring stages.
          </p>
        </div>

        <button
          onClick={() => navigate('/recruiter/jobs/create')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: '#3978F6',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(57, 120, 246, 0.3)'
          }}
        >
          <PlusCircle size={17} />
          <span>+ Create Placement Drive</span>
        </button>
      </div>

      {/* Search & Tabs Filter Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}
      >
        {/* Status Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['All', 'Active', 'Draft', 'Closed', 'Archived'].map((tab) => {
            const count =
              tab === 'All' ? jobs.length : jobs.filter((j) => j.status === tab).length;
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: isSelected ? '1px solid #3978F6' : '1px solid transparent',
                  backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                  color: isSelected ? '#2563EB' : '#64748B',
                  fontSize: '13px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{tab}</span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: '999px',
                    backgroundColor: isSelected ? '#BFDBFE' : '#F1F5F9',
                    color: isSelected ? '#1E40AF' : '#64748B',
                    fontWeight: 700
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '300px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94A3B8'
            }}
          />
          <input
            type="text"
            placeholder="Search drives by title, dept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Drives Grid / Cards */}
      {filteredJobs.length === 0 ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '48px 24px',
            textAlign: 'center'
          }}
        >
          <Briefcase size={40} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#101B36', margin: '0 0 6px' }}>
            No placement drives found
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '0 0 18px' }}>
            Try clearing your search query or create your first recruitment drive.
          </p>
          <button
            onClick={() => navigate('/recruiter/jobs/create')}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            + Create Placement Drive
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredJobs.map((job) => {
            const badge = getStatusBadge(job.status);
            return (
              <div
                key={job.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#BFDBFE';
                  e.currentTarget.style.boxShadow = '0 10px 24px -4px rgba(57, 120, 246, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                }}
              >
                <div>
                  {/* Top Bar: Department & Status */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#3978F6',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {job.department}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`
                      }}
                    >
                      {job.status}
                    </span>
                  </div>

                  {/* Title & Meta */}
                  <h3
                    onClick={() => navigate(`/recruiter/jobs/${job.id}`)}
                    style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#101B36',
                      margin: '0 0 6px',
                      cursor: 'pointer'
                    }}
                  >
                    {job.title}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '12.5px',
                      color: '#64748B',
                      marginBottom: '16px'
                    }}
                  >
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span style={{ color: '#16A34A', fontWeight: 700 }}>{job.salary}</span>
                  </div>

                  {/* 3 Metrics counters */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      textAlign: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                        Applications
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', marginTop: '2px' }}>
                        {job.applicationsCount}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                        Eligible
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0284C7', marginTop: '2px' }}>
                        {job.eligibleCount}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                        Shortlisted
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#16A34A', marginTop: '2px' }}>
                        {job.shortlistedCount}
                      </div>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {job.requiredSkills.slice(0, 3).map((sk) => (
                      <span
                        key={sk.name}
                        style={{
                          fontSize: '11.5px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#EFF6FF',
                          color: '#2563EB',
                          fontWeight: 600
                        }}
                      >
                        {sk.name}
                      </span>
                    ))}
                    {job.requiredSkills.length > 3 && (
                      <span style={{ fontSize: '11.5px', color: '#94A3B8', padding: '3px 4px' }}>
                        +{job.requiredSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div
                  style={{
                    borderTop: '1px solid #F1F5F9',
                    paddingTop: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#94A3B8' }}>
                    <Calendar size={13} />
                    <span>Closes {job.schedule.applicationDeadline}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => navigate(`/recruiter/jobs/${job.id}/candidates`)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#EFF6FF',
                        color: '#2563EB',
                        border: '1px solid #BFDBFE',
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
                      onClick={() => navigate(`/recruiter/jobs/${job.id}`)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        color: '#334155',
                        border: '1px solid #CBD5E1',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => handleDuplicate(job.id)}
                      title="Duplicate Drive"
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: '#64748B',
                        cursor: 'pointer'
                      }}
                    >
                      <Copy size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </RecruiterLayout>
  );
}
