import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  FileText,
  UserCheck,
  Calendar,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  SlidersHorizontal,
  X,
  Eye,
  Award
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function CandidatesPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Load applications (joined with Layer 3 students)
  const [applications, setApplications] = useState(() => {
    return recruiterService.getApplications(jobId ? { jobId } : {});
  });

  const jobs = recruiterService.getJobs();
  const currentJob = jobId ? recruiterService.getJobById(jobId) : null;

  // Search & Filter State
  const initialSearch = searchParams.get('search') || '';
  const initialStatus = searchParams.get('status') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [minCGPA, setMinCGPA] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [sortBy, setSortBy] = useState('match'); // 'match', 'cgpa', 'readiness', 'name'

  // Modals & Action State
  const [shortlistModal, setShortlistModal] = useState(null); // { appId, studentName }
  const [rejectModal, setRejectModal] = useState(null); // { appId, studentName }
  const [messageModal, setMessageModal] = useState(null); // { studentId, studentName }
  const [messageText, setMessageText] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [aiMatchingActive, setAiMatchingActive] = useState(false);

  // Available skills across applications
  const allSkills = useMemo(() => {
    const set = new Set();
    applications.forEach((a) => {
      a.skills?.forEach((s) => set.add(typeof s === 'string' ? s : s.name));
    });
    return Array.from(set);
  }, [applications]);

  // Filtered and Sorted Candidates
  const filteredCandidates = useMemo(() => {
    return applications
      .filter((app) => {
        // Search filter
        const q = searchQuery.toLowerCase();
        const candidateName = app.studentName || app.candidateName || '';
        const candidateDept = app.department || '';
        const matchesSearch =
          !q ||
          candidateName.toLowerCase().includes(q) ||
          candidateDept.toLowerCase().includes(q) ||
          app.skills?.some((s) => (typeof s === 'string' ? s : s.name).toLowerCase().includes(q));

        // Dept filter
        const matchesDept = selectedDept === 'All' || app.department === selectedDept;

        // Status filter
        const matchesStatus =
          selectedStatus === 'All' ||
          (app.status || '').toLowerCase() === selectedStatus.toLowerCase();

        // CGPA filter
        const matchesCGPA = (app.cgpa || 0) >= minCGPA;

        // Skill filter
        const matchesSkill =
          selectedSkill === 'All' ||
          app.skills?.some((s) => (typeof s === 'string' ? s : s.name) === selectedSkill);

        return matchesSearch && matchesDept && matchesStatus && matchesCGPA && matchesSkill;
      })
      .sort((a, b) => {
        if (sortBy === 'match') return (b.preliminaryMatchScore || 0) - (a.preliminaryMatchScore || 0);
        if (sortBy === 'cgpa') return (b.cgpa || 0) - (a.cgpa || 0);
        if (sortBy === 'readiness') return (b.readinessScore || 0) - (a.readinessScore || 0);
        if (sortBy === 'name') return (a.studentName || a.candidateName || '').localeCompare(b.studentName || b.candidateName || '');
        return 0;
      });
  }, [applications, searchQuery, selectedDept, selectedStatus, minCGPA, selectedSkill, sortBy]);

  // Handlers
  const handleConfirmShortlist = () => {
    if (!shortlistModal) return;
    recruiterService.shortlistCandidate(shortlistModal.appId);
    setApplications(recruiterService.getApplications(jobId ? { jobId } : {}));
    setToastMessage(`Shortlisted ${shortlistModal.studentName} for further rounds!`);
    setShortlistModal(null);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmReject = () => {
    if (!rejectModal) return;
    recruiterService.rejectCandidate(rejectModal.appId);
    setApplications(recruiterService.getApplications(jobId ? { jobId } : {}));
    setToastMessage(`Application for ${rejectModal.studentName} updated to Rejected`);
    setRejectModal(null);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageModal || !messageText.trim()) return;
    recruiterService.sendMessage(messageModal.studentId, messageText.trim());
    setToastMessage(`Message sent to ${messageModal.studentName}`);
    setMessageModal(null);
    setMessageText('');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const triggerAIMatching = () => {
    navigate(`/recruiter/jobs/${jobId || 'JOB-2027-001'}/matching`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'AI Recommended':
        return { bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE' };
      case 'Shortlisted':
        return { bg: '#ECFDF5', color: '#065F46', border: '#A7F3D0' };
      case 'Eligible':
        return { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' };
      case 'Interview':
        return { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' };
      case 'Offer':
        return { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' };
      case 'Rejected':
        return { bg: '#FEF2F2', color: '#991B1B', border: '#FECACA' };
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
          marginBottom: '20px'
        }}
      >
        <div>
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
              Candidate Management {currentJob ? `— ${currentJob.title}` : ''}
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
              Layer 3 Student Data Active
            </span>
          </div>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Browse candidate profiles, review qualifications, evaluate preliminary fit, and advance shortlists.
          </p>
        </div>

        {/* Primary Layer 7 Action: Run AI Candidate Matching */}
        <button
          onClick={triggerAIMatching}
          disabled={aiMatchingActive}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '11px 22px',
            borderRadius: '10px',
            backgroundColor: '#3978F6',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(57, 120, 246, 0.35)',
            transition: 'background-color 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3978F6')}
        >
          <Sparkles size={17} />
          <span>{aiMatchingActive ? 'Running AI Engine...' : 'Run AI Candidate Matching →'}</span>
        </button>
      </div>

      {/* Funnel Metrics Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          marginBottom: '24px'
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Applications</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', marginTop: '2px' }}>{applications.length * 28 + 4}</div>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Eligible</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0284C7', marginTop: '2px' }}>{applications.length * 12 + 6}</div>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>AI Recommended</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#8B5CF6', marginTop: '2px' }}>58</div>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Shortlisted</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#16A34A', marginTop: '2px' }}>34</div>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Interviews</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>16</div>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Offers</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>7</div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '20px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          marginBottom: '24px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            alignItems: 'center'
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
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
              placeholder="Search by name, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="All">All Departments</option>
              <option value="Computer Science & Engineering">CSE</option>
              <option value="Information Technology">IT</option>
              <option value="Electronics & Communication">ECE</option>
              <option value="Electrical & Electronics">EEE</option>
            </select>
          </div>

          {/* Application Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="All">All Pipeline Stages</option>
              <option value="Eligible">Eligible</option>
              <option value="AI Recommended">AI Recommended</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Min CGPA */}
          <div>
            <select
              value={minCGPA}
              onChange={(e) => setMinCGPA(parseFloat(e.target.value))}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value={0}>Any CGPA</option>
              <option value={7.5}>Min 7.5 CGPA</option>
              <option value={8.0}>Min 8.0 CGPA</option>
              <option value={8.5}>Min 8.5 CGPA</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #3978F6',
                backgroundColor: '#EFF6FF',
                color: '#1E40AF',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <option value="match">Sort: Match Score (High to Low)</option>
              <option value="cgpa">Sort: CGPA (High to Low)</option>
              <option value="readiness">Sort: Readiness (High to Low)</option>
              <option value="name">Sort: Candidate Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      {filteredCandidates.length === 0 ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '48px 24px',
            textAlign: 'center'
          }}
        >
          <Users size={40} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#101B36', margin: '0 0 6px' }}>
            No matching candidates found
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
            Adjust your filters or search terms to broaden the candidate talent search.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredCandidates.map((candidate) => {
            const badge = getStatusBadge(candidate.status);
            return (
              <div
                key={candidate.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  position: 'relative'
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
                  {/* Top Bar: Preliminary Match Score & Status */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '14px'
                    }}
                  >
                    <div
                      title="Preliminary Match is temporary demo data. Layer 7 will compute official AI ranking."
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        color: '#1E40AF',
                        fontSize: '12px',
                        fontWeight: 700
                      }}
                    >
                      <Sparkles size={13} color="#2563EB" />
                      <span>Preliminary Match: {candidate.preliminaryMatchScore}%</span>
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '999px',
                        backgroundColor: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`
                      }}
                    >
                      {candidate.status}
                    </span>
                  </div>

                  {/* Candidate Name & Academic info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: '#101B36',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {(candidate.studentName || candidate.candidateName || 'CD').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3
                        onClick={() => navigate(`/recruiter/candidates/${candidate.studentId || candidate.candidateId}`)}
                        style={{
                          fontSize: '16.5px',
                          fontWeight: 800,
                          color: '#101B36',
                          margin: 0,
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#3978F6')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#101B36')}
                      >
                        {candidate.studentName || candidate.candidateName || 'Candidate'}
                      </h3>
                      <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
                        {candidate.department || 'Engineering'} • CGPA {candidate.cgpa || '8.0'}
                      </div>
                    </div>
                  </div>

                  {/* Placement Readiness Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      marginBottom: '14px',
                      fontSize: '12px'
                    }}
                  >
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Placement Readiness</span>
                    <span style={{ color: '#16A34A', fontWeight: 800 }}>
                      {candidate.readinessScore || 88}%
                    </span>
                  </div>

                  {/* Technical Skills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {candidate.skills?.slice(0, 5).map((sk) => {
                      const name = typeof sk === 'string' ? sk : sk.name;
                      return (
                        <span
                          key={name}
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#F1F5F9',
                            color: '#334155',
                            border: '1px solid #E2E8F0'
                          }}
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div
                  style={{
                    borderTop: '1px solid #F1F5F9',
                    paddingTop: '14px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => navigate(`/recruiter/candidates/${candidate.studentId}`)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
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
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/officer/students/${candidate.studentId}/resume`)
                      }
                      title="View AI Resume Intelligence (Layer 5)"
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        color: '#2563EB',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <FileText size={13} />
                      <span>Resume</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {candidate.status !== 'Shortlisted' && (
                      <button
                        onClick={() =>
                          setShortlistModal({
                            appId: candidate.id,
                            studentName: candidate.studentName
                          })
                        }
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          backgroundColor: '#10B981',
                          color: '#FFFFFF',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Shortlist
                      </button>
                    )}

                    {candidate.status !== 'Rejected' && (
                      <button
                        onClick={() =>
                          setRejectModal({
                            appId: candidate.id,
                            studentName: candidate.studentName
                          })
                        }
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #FECACA',
                          color: '#DC2626',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Reject
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setMessageModal({
                          studentId: candidate.studentId,
                          studentName: candidate.studentName
                        })
                      }
                      title="Send Message"
                      style={{
                        padding: '6px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        color: '#64748B',
                        cursor: 'pointer'
                      }}
                    >
                      <MessageSquare size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SHORTLIST CONFIRMATION MODAL */}
      {shortlistModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(3px)',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '460px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              border: '1px solid #E2E8F0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <UserCheck size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                Shortlist {shortlistModal.studentName}?
              </h3>
            </div>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, margin: '0 0 24px' }}>
              This candidate will move into the <strong>Shortlisted</strong> recruitment pipeline stage
              and will be flagged as ready for technical and manager interviews.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setShortlistModal(null)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmShortlist}
                style={{
                  padding: '9px 22px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                }}
              >
                Confirm Shortlist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT CONFIRMATION MODAL */}
      {rejectModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(3px)',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '460px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              border: '1px solid #E2E8F0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#FEF2F2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <XCircle size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                Reject Application?
              </h3>
            </div>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, margin: '0 0 24px' }}>
              Are you sure you want to reject {rejectModal.studentName}'s application? The candidate will
              be archived under the rejected pool for this recruitment cycle.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setRejectModal(null)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                style={{
                  padding: '9px 22px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK MESSAGE MODAL */}
      {messageModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(3px)',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '520px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              border: '1px solid #E2E8F0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                Message {messageModal.studentName}
              </h3>
              <button
                onClick={() => setMessageModal(null)}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendMessage}>
              <textarea
                rows={4}
                placeholder={`Type your communication to ${messageModal.studentName} regarding interview schedules or drive updates...`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13.5px',
                  marginBottom: '16px'
                }}
                required
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setMessageModal(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#475569',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </RecruiterLayout>
  );
}
