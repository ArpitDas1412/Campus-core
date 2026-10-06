import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Users,
  UserCheck,
  Award,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  Edit3,
  Copy,
  Archive,
  CheckCircle2,
  FileText,
  Building2,
  MapPin,
  DollarSign,
  AlertCircle,
  Target
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(recruiterService.getJobById(jobId));
  const [activeTab, setActiveTab] = useState('Overview');
  const [toastMessage, setToastMessage] = useState(null);

  if (!job) {
    return (
      <RecruiterLayout>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Briefcase size={48} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#101B36' }}>
            Drive Not Found
          </h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>
            The placement drive with ID "{jobId}" could not be located.
          </p>
          <button
            onClick={() => navigate('/recruiter/jobs')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Back to Jobs
          </button>
        </div>
      </RecruiterLayout>
    );
  }

  const handleDuplicate = () => {
    const copy = recruiterService.duplicateJob(job.id);
    setToastMessage(`Drive duplicated as "${copy.title}"`);
    setTimeout(() => {
      setToastMessage(null);
      navigate(`/recruiter/jobs/${copy.id}`);
    }, 1200);
  };

  const handleToggleStatus = (newStatus) => {
    const updated = recruiterService.updateJob(job.id, { status: newStatus });
    setJob(updated);
    setToastMessage(`Placement Drive status set to ${newStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs = [
    'Overview',
    'Requirements',
    'Candidates',
    'AI Matching',
    'Fit Score',
    'Smart Shortlisting',
    'Shortlisted',
    'Interviews',
    'Analytics'
  ];

  // Applications for this job
  const jobApplications = recruiterService.getApplications({ jobId: job.id });
  const eligibleApps = jobApplications.filter((a) => a.status === 'Eligible');
  const aiRecApps = jobApplications.filter((a) => a.status === 'AI Recommended');
  const shortlistedApps = jobApplications.filter((a) => a.status === 'Shortlisted');
  const interviewApps = jobApplications.filter((a) => a.status === 'Interview');
  const offerApps = jobApplications.filter((a) => a.status === 'Offer');

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

      {/* Breadcrumb Back */}
      <button
        onClick={() => navigate('/recruiter/jobs')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          color: '#64748B',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          padding: 0,
          marginBottom: '14px'
        }}
      >
        <ChevronLeft size={16} />
        <span>Back to Jobs & Drives</span>
      </button>

      {/* Drive Detail Header Banner */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '24px 28px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          marginBottom: '24px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '999px',
                  backgroundColor:
                    job.status === 'Active'
                      ? '#ECFDF5'
                      : job.status === 'Draft'
                      ? '#FEF3C7'
                      : '#F1F5F9',
                  color:
                    job.status === 'Active'
                      ? '#065F46'
                      : job.status === 'Draft'
                      ? '#92400E'
                      : '#475569',
                  border: `1px solid ${
                    job.status === 'Active'
                      ? '#A7F3D0'
                      : job.status === 'Draft'
                      ? '#FDE68A'
                      : '#CBD5E1'
                  }`
                }}
              >
                ● {job.status} Drive
              </span>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                ID: {job.id}
              </span>
            </div>

            <h1
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: '#101B36',
                margin: '0 0 6px',
                letterSpacing: '-0.02em'
              }}
            >
              {job.title}
            </h1>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
                fontSize: '13.5px',
                color: '#475569'
              }}
            >
              <span>{job.companyName}</span>
              <span>•</span>
              <span>{job.department}</span>
              <span>•</span>
              <span>{job.location} ({job.workMode})</span>
              <span>•</span>
              <span style={{ color: '#16A34A', fontWeight: 700 }}>{job.salary}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => navigate(`/recruiter/jobs/${job.id}/candidates`)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
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
              <Users size={16} />
              <span>View Candidates ({job.applicationsCount})</span>
            </button>

            <button
              onClick={() => navigate(`/recruiter/jobs/${job.id}/matching`)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: '#7C3AED',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(124, 58, 237, 0.3)'
              }}
            >
              <Sparkles size={16} />
              <span>Run AI Matching →</span>
            </button>

            <button
              onClick={() => navigate(`/recruiter/jobs/${job.id}/shortlisting`)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: '#059669',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(5, 150, 105, 0.3)'
              }}
            >
              <Target size={16} />
              <span>Smart Shortlisting (L9) →</span>
            </button>

            <button
              onClick={handleDuplicate}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#475569',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Copy size={15} />
              <span>Duplicate</span>
            </button>

            {job.status === 'Active' ? (
              <button
                onClick={() => handleToggleStatus('Closed')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #FECACA',
                  color: '#DC2626',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Close Drive
              </button>
            ) : (
              <button
                onClick={() => handleToggleStatus('Active')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #A7F3D0',
                  color: '#059669',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reopen Drive
              </button>
            )}
          </div>
        </div>

        {/* 6 Stage Counter Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid #F1F5F9'
          }}
        >
          <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Applications</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', marginTop: '2px' }}>{job.applicationsCount}</div>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Eligible</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0284C7', marginTop: '2px' }}>{job.eligibleCount}</div>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>AI Recommended</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#8B5CF6', marginTop: '2px' }}>58</div>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Shortlisted</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#16A34A', marginTop: '2px' }}>{job.shortlistedCount}</div>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Interviews</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>16</div>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Offers</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>7</div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '24px',
          overflowX: 'auto'
        }}
      >
        {tabs.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                if (tab === 'AI Matching') {
                  navigate(`/recruiter/jobs/${job.id}/matching`);
                } else if (tab === 'Fit Score') {
                  navigate(`/recruiter/jobs/${job.id}/matching/CL-2027-0042`);
                } else if (tab === 'Smart Shortlisting') {
                  navigate(`/recruiter/jobs/${job.id}/shortlisting`);
                } else {
                  setActiveTab(tab);
                }
              }}
              style={{
                padding: '10px 18px',
                border: 'none',
                background: 'none',
                borderBottom: isSelected ? '2px solid #3978F6' : '2px solid transparent',
                color: isSelected ? '#3978F6' : '#64748B',
                fontSize: '14px',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab 1: OVERVIEW */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {/* Left: Key Overview Details */}
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
              Job Summary & Parameters
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: '0 0 20px' }}>
              {job.description}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Openings
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginTop: '2px' }}>
                  {job.openings} positions
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Compensation
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#16A34A', marginTop: '2px' }}>
                  {job.salary}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Application Deadline
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', marginTop: '2px' }}>
                  {job.schedule.applicationDeadline}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Joining Window
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', marginTop: '2px' }}>
                  {job.schedule.joiningTimeline || 'July 2027'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hard Eligibility Rules */}
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
              Hard Eligibility Criteria
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '13px', color: '#64748B' }}>Minimum Cutoff CGPA</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                  ≥ {job.eligibility.minCGPA} / 10.0
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '13px', color: '#64748B' }}>Allowed Backlogs</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                  ≤ {job.eligibility.maxBacklogs} active
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '13px', color: '#64748B' }}>Eligible Departments</span>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#3978F6' }}>
                  {job.eligibility.departments.join(', ')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '13px', color: '#64748B' }}>Graduation Year</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                  Class of {job.eligibility.graduationYear}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <span style={{ fontSize: '13px', color: '#64748B' }}>Degree Requirement</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                  {job.eligibility.degree.join(' / ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: REQUIREMENTS */}
      {activeTab === 'Requirements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Required Skills */}
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
              Required Technical Competencies
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              {job.requiredSkills.map((sk) => (
                <div
                  key={sk.name}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>{sk.name}</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                      Level: {sk.level}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#DC2626' }}>
                      {sk.importance} Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Skills */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '0 0 8px' }}>
              Preferred / Bonus Skills
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px' }}>
              Candidates possessing these skills receive higher AI matching scores in Layer 7 without disqualifying peers.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {job.preferredSkills.map((sk) => (
                <span
                  key={sk}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: '1px solid #BFDBFE'
                  }}
                >
                  ★ {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Hiring Stages */}
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
              Selection Process Pipeline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {job.selectionProcess.map((stg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: '#3978F6',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>{stg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: CANDIDATES */}
      {activeTab === 'Candidates' && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                Applicant Pool for {job.title} ({jobApplications.length})
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
                Candidates applying from campus student databases (Layer 3 records).
              </p>
            </div>

            <button
              onClick={() => navigate(`/recruiter/jobs/${job.id}/candidates`)}
              style={{
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
              Open Full Candidate Manager →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {jobApplications.map((app) => (
              <div
                key={app.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#3978F6',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {app.studentName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div
                      onClick={() => navigate(`/recruiter/candidates/${app.studentId}`)}
                      style={{ fontSize: '14.5px', fontWeight: 700, color: '#101B36', cursor: 'pointer' }}
                    >
                      {app.studentName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>
                      {app.department} • CGPA {app.cgpa} • Match {app.preliminaryMatchScore}%
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB'
                    }}
                  >
                    {app.status}
                  </span>
                  <button
                    onClick={() => navigate(`/recruiter/candidates/${app.studentId}`)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: SHORTLIST */}
      {activeTab === 'Shortlist' && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '0 0 8px' }}>
            Shortlisted Candidates ({shortlistedApps.length})
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 20px' }}>
            Candidates advanced for technical assessments and panel interview scheduling.
          </p>
          {shortlistedApps.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#64748B' }}>
              No candidates shortlisted yet for this drive.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {shortlistedApps.map((app) => (
                <div
                  key={app.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>{app.studentName}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>
                      {app.department} • CGPA {app.cgpa} • Preliminary Match: {app.preliminaryMatchScore}%
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/recruiter/candidates/${app.studentId}`)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      backgroundColor: '#3978F6',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    View Dossier
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: INTERVIEWS */}
      {activeTab === 'Interviews' && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Interview Rounds
            </h3>
            <button
              onClick={() => navigate('/recruiter/interviews')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Open Interview Calendar →
            </button>
          </div>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Scheduled technical & HR evaluation rounds are managed under the interviews command center.
          </p>
        </div>
      )}

      {/* Tab 6: ANALYTICS */}
      {activeTab === 'Analytics' && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '0 0 6px' }}>
            Drive Conversion Health
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 20px' }}>
            Funnel velocity from campus applications to final offer acceptance.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Eligibility Pass Rate</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0284C7', marginTop: '4px' }}>
                {Math.round((job.eligibleCount / job.applicationsCount) * 100)}%
              </div>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Shortlist Ratio</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#16A34A', marginTop: '4px' }}>
                {Math.round((job.shortlistedCount / job.eligibleCount) * 100)}%
              </div>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Target Openings Filled</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>
                28% (7 / 25)
              </div>
            </div>
          </div>
        </div>
      )}
    </RecruiterLayout>
  );
}
