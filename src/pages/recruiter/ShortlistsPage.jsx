import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck,
  Search,
  Filter,
  Users,
  Eye,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  XCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function ShortlistsPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('All'); // 'All', 'Recently Shortlisted', 'Interview Ready', 'Awaiting Review', 'Rejected'
  const [searchQuery, setSearchQuery] = useState('');
  const [applications, setApplications] = useState(() => recruiterService.getApplications());
  const [toastMessage, setToastMessage] = useState(null);

  const handleMoveStage = (appId, newStage) => {
    recruiterService.moveCandidateStage(appId, newStage);
    setApplications(recruiterService.getApplications());
    setToastMessage(`Candidate stage moved to ${newStage}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReject = (appId) => {
    recruiterService.rejectCandidate(appId);
    setApplications(recruiterService.getApplications());
    setToastMessage('Candidate moved to Rejected pool');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Section tabs
  const sections = [
    { key: 'All', label: 'All Shortlisted' },
    { key: 'Recently Shortlisted', label: 'Recently Shortlisted' },
    { key: 'Interview Ready', label: 'Interview Ready' },
    { key: 'Awaiting Review', label: 'Awaiting Review' },
    { key: 'Rejected', label: 'Rejected' }
  ];

  const shortlistedList = applications.filter((app) => {
    if (activeSection === 'Rejected') return app.status === 'Rejected';
    if (activeSection === 'Interview Ready') return app.status === 'Interview';
    if (activeSection === 'Recently Shortlisted') return app.status === 'Shortlisted';
    if (activeSection === 'Awaiting Review') return app.status === 'Eligible' || app.status === 'AI Recommended';
    return app.status === 'Shortlisted' || app.status === 'Interview' || app.status === 'Offer';
  });

  const filteredCandidates = (shortlistedList || []).filter((c) => {
    const q = searchQuery.toLowerCase();
    const name = c.studentName || c.candidateName || '';
    const job = c.jobTitle || '';
    const dept = c.department || '';
    return (
      !q ||
      name.toLowerCase().includes(q) ||
      job.toLowerCase().includes(q) ||
      dept.toLowerCase().includes(q)
    );
  });

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
            Candidate Shortlists
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
            Manage candidates moving through the evaluation funnel, schedule interview panels, and
            record stage decisions.
          </p>
        </div>

        <button
          onClick={() => navigate('/recruiter/candidates')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            borderRadius: '8px',
            backgroundColor: '#3978F6',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Users size={16} />
          <span>Browse All Candidates</span>
        </button>
      </div>

      {/* Layer 9 Smart Shortlisting Banner */}
      <div
        style={{
          backgroundColor: '#101B36',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: '0 4px 20px rgba(16, 27, 54, 0.25)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'rgba(57, 120, 246, 0.2)',
              color: '#36C5E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Sparkles size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ fontSize: '15px', fontWeight: 900 }}>AI-Powered Smart Shortlisting</span>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  backgroundColor: '#059669',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 800
                }}
              >
                LAYER 9
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
              Review AI-recommended cohorts for active drives, configure hiring ratios (5×), and record human-in-the-loop decisions.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/recruiter/jobs/JOB-2027-001/shortlisting')}
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
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(57, 120, 246, 0.4)'
          }}
        >
          <span>Launch Smart Shortlisting Workspace →</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
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
        {/* Section Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
          {sections.map((sec) => {
            const isSelected = activeSection === sec.key;
            return (
              <button
                key={sec.key}
                onClick={() => setActiveSection(sec.key)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: isSelected ? '1px solid #3978F6' : '1px solid transparent',
                  backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                  color: isSelected ? '#2563EB' : '#64748B',
                  fontSize: '13px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {sec.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
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
            placeholder="Search candidate, job..."
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

      {/* Shortlist Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          overflow: 'hidden'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Candidate
                </th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Applied Job
                </th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Department & CGPA
                </th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Skills
                </th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Status
                </th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Last Updated
                </th>
                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', textAlign: 'right' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                    No candidates found in this shortlist segment.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((c) => (
                  <tr
                    key={c.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Candidate */}
                    <td style={{ padding: '16px 20px' }}>
                      <div
                        onClick={() => navigate(`/recruiter/candidates/${c.studentId}`)}
                        style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', cursor: 'pointer' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#3978F6')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#101B36')}
                      >
                        {c.studentName}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B' }}>ID: {c.studentId}</div>
                    </td>

                    {/* Job */}
                    <td style={{ padding: '16px 16px', fontSize: '13px', color: '#334155' }}>
                      <div style={{ fontWeight: 600 }}>{c.jobTitle}</div>
                    </td>

                    {/* Dept & CGPA */}
                    <td style={{ padding: '16px 16px', fontSize: '13px', color: '#334155' }}>
                      <div>{c.department}</div>
                      <div style={{ fontSize: '12px', color: '#16A34A', fontWeight: 700 }}>
                        CGPA {c.cgpa}
                      </div>
                    </td>

                    {/* Skills */}
                    <td style={{ padding: '16px 16px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '240px' }}>
                        {c.skills?.slice(0, 3).map((sk) => {
                          const name = typeof sk === 'string' ? sk : sk.name;
                          return (
                            <span
                              key={name}
                              style={{
                                fontSize: '10.5px',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                backgroundColor: '#F1F5F9',
                                color: '#334155'
                              }}
                            >
                              {name}
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '16px 16px' }}>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '999px',
                          backgroundColor:
                            c.status === 'Shortlisted'
                              ? '#ECFDF5'
                              : c.status === 'Interview'
                              ? '#FEF3C7'
                              : c.status === 'Offer'
                              ? '#F0FDF4'
                              : '#F1F5F9',
                          color:
                            c.status === 'Shortlisted'
                              ? '#065F46'
                              : c.status === 'Interview'
                              ? '#92400E'
                              : c.status === 'Offer'
                              ? '#15803D'
                              : '#475569'
                        }}
                      >
                        {c.status}
                      </span>
                    </td>

                    {/* Last Updated */}
                    <td style={{ padding: '16px 16px', fontSize: '12px', color: '#64748B' }}>
                      {c.lastUpdated}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => navigate(`/recruiter/candidates/${c.studentId}`)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          View
                        </button>

                        {c.status === 'Shortlisted' && (
                          <button
                            onClick={() => handleMoveStage(c.id, 'Interview')}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              backgroundColor: '#EFF6FF',
                              border: '1px solid #BFDBFE',
                              color: '#2563EB',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            To Interview
                          </button>
                        )}

                        <button
                          onClick={() => navigate('/recruiter/messages')}
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            color: '#64748B',
                            cursor: 'pointer'
                          }}
                        >
                          <MessageSquare size={13} />
                        </button>

                        {c.status !== 'Rejected' && (
                          <button
                            onClick={() => handleReject(c.id)}
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              border: '1px solid #FECACA',
                              backgroundColor: '#FFFFFF',
                              color: '#DC2626',
                              cursor: 'pointer'
                            }}
                          >
                            <XCircle size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </RecruiterLayout>
  );
}
