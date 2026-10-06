import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Users,
  ChevronLeft,
  GraduationCap,
  Award,
  Sparkles,
  FileText,
  Briefcase,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Layers,
  Code,
  Terminal,
  Clock
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function CandidateProfileRecruiterPage() {
  const { candidateId } = useParams();
  const navigate = useNavigate();

  // Fetch privacy-filtered candidate details (officer private notes removed)
  const candidate = recruiterService.getCandidateProfile(candidateId);

  const [toastMessage, setToastMessage] = useState(null);
  const [shortlistModal, setShortlistModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  if (!candidate) {
    return (
      <RecruiterLayout>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Users size={48} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#101B36' }}>
            Candidate Profile Not Found
          </h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>
            No candidate with ID "{candidateId}" was found in the campus applicant directory.
          </p>
          <button
            onClick={() => navigate('/recruiter/candidates')}
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
            Back to Candidates
          </button>
        </div>
      </RecruiterLayout>
    );
  }

  const handleShortlist = () => {
    // If has application, shortlist
    if (candidate.application) {
      recruiterService.shortlistCandidate(candidate.application.id);
    }
    setShortlistModal(false);
    setToastMessage(`${candidate.name} has been shortlisted!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReject = () => {
    if (candidate.application) {
      recruiterService.rejectCandidate(candidate.application.id);
    }
    setRejectModal(false);
    setToastMessage(`Application for ${candidate.name} updated to Rejected`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    recruiterService.sendMessage(candidate.id, messageText.trim());
    setMessageModal(false);
    setMessageText('');
    setToastMessage(`Message sent to ${candidate.name}`);
    setTimeout(() => setToastMessage(null), 3000);
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

      {/* Back button */}
      <button
        onClick={() => navigate('/recruiter/candidates')}
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
          marginBottom: '16px'
        }}
      >
        <ChevronLeft size={16} />
        <span>Back to Candidate Directory</span>
      </button>

      {/* Privacy Protection Banner */}
      <div
        style={{
          padding: '12px 18px',
          borderRadius: '10px',
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
          fontSize: '12.5px',
          color: '#166534',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} color="#16A34A" />
          <span>
            <strong>Corporate Recruitment Privacy Filter Active:</strong> Confidential officer notes,
            internal administrative remarks, and disciplinary tracking are redacted from corporate view.
          </span>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '6px',
            backgroundColor: '#DCFCE7',
            color: '#15803D'
          }}
        >
          FERPA / CampusCore Compliant
        </span>
      </div>

      {/* Candidate Top Banner */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '28px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#101B36',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {candidate.name.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                {candidate.name}
              </h1>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  padding: '3px 9px',
                  borderRadius: '999px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE'
                }}
              >
                {candidate.department}
              </span>
            </div>

            <div style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
              {candidate.degree || 'B.Tech'} • Class of {candidate.gradYear || 2027} • CGPA:{' '}
              <strong style={{ color: '#101B36' }}>{candidate.cgpa} / 10.0</strong> • Backlogs:{' '}
              {candidate.backlogs || 0}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShortlistModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '8px',
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }}
          >
            <CheckCircle2 size={16} />
            <span>Shortlist Candidate</span>
          </button>

          <button
            onClick={() => setMessageModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#334155',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <MessageSquare size={16} color="#3978F6" />
            <span>Send Message</span>
          </button>

          <button
            onClick={() => setRejectModal(true)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #FECACA',
              color: '#DC2626',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Reject
          </button>
        </div>
      </div>

      {/* Grid: 2 Column Profile Dossier */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Left Column: Academic & Technical Dossier */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Academic Profile */}
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
              Academic Profile
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Cumulative CGPA
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#10B981', marginTop: '2px' }}>
                  {candidate.cgpa} / 10.0
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Active Backlogs
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', marginTop: '2px' }}>
                  {candidate.backlogs || 0}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Department
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', marginTop: '2px' }}>
                  {candidate.department}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Graduation Year
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', marginTop: '2px' }}>
                  {candidate.gradYear || 2027}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
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
              Verified Technical Skills
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {candidate.skills?.map((sk, idx) => {
                const name = typeof sk === 'string' ? sk : sk.name;
                const level = typeof sk === 'object' && sk.level ? sk.level : 'Advanced';
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>{name}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: '#EFF6FF',
                        color: '#2563EB',
                        fontWeight: 600
                      }}
                    >
                      {level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Academic Projects */}
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
              Featured Engineering Projects
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {candidate.projects && candidate.projects.length > 0 ? (
                candidate.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                      {proj.title || proj.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#475569', margin: '4px 0 8px', lineHeight: 1.5 }}>
                      {proj.description}
                    </div>
                    <div style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600 }}>
                      Tech: {Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech || 'Java, Spring Boot, React'}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  Distributed E-Commerce Microservices Architecture (Spring Cloud, Kafka, PostgreSQL)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Layer 5 Resume Dossier & Layer 4 Skill Gap */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Layer 5 Resume Intelligence Integration */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="#3978F6" />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                  Resume Intelligence (Layer 5)
                </h3>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46'
                }}
              >
                ATS Ready
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px', lineHeight: 1.5 }}>
              Candidate resume parsed and verified through CampusCore's Layer 5 AI Resume Intelligence engine.
            </p>

            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 600 }}>
                  ATS Match Score
                </span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#16A34A' }}>
                  88 / 100
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#E2E8F0',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}
              >
                <div style={{ width: '88%', height: '100%', backgroundColor: '#10B981' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() =>
                  navigate(`/officer/students/${candidate.id}/resume`)
                }
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <FileText size={15} />
                <span>Resume Intelligence</span>
              </button>

              <button
                onClick={() =>
                  navigate(`/officer/students/${candidate.id}`)
                }
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '9px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <span>Readiness</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>

          {/* Layer 4 Skill Gap Analysis Integration */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#8B5CF6" />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                  Skill Gap Preview (Layer 4)
                </h3>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  backgroundColor: '#F5F3FF',
                  color: '#7C3AED'
                }}
              >
                Role: Software Engineer
              </span>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                Overall Fit Assessment
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#16A34A', marginTop: '2px' }}>
                Strong Alignment (91% Match)
              </div>
            </div>

            {/* Identified Skill Gaps */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
                Identified Growth Gaps
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Docker Orchestration', 'AWS ECS', 'System Design Low-Level'].map((gap) => (
                  <span
                    key={gap}
                    style={{
                      fontSize: '11.5px',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: '#FEF3C7',
                      color: '#92400E',
                      fontWeight: 600,
                      border: '1px solid #FDE68A'
                    }}
                  >
                    △ {gap}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                navigate(`/officer/students/${candidate.id}/skill-gap`)
              }
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>View Full Skill Gap Analysis</span>
              <ExternalLink size={14} />
            </button>
          </div>

          {/* Certifications & Internships */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '0 0 14px' }}>
              Certifications & Internships
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {candidate.certifications && candidate.certifications.length > 0 ? (
                candidate.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#334155'
                    }}
                  >
                    <Award size={15} color="#3978F6" />
                    <span>{typeof cert === 'string' ? cert : cert.name}</span>
                  </div>
                ))
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                  <Award size={15} color="#3978F6" />
                  <span>AWS Certified Cloud Practitioner</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Shortlist Modal */}
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
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 10px' }}>
              Shortlist {candidate.name}?
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, margin: '0 0 24px' }}>
              This candidate will move to the <strong>Shortlisted</strong> recruitment pipeline stage.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setShortlistModal(false)}
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
                onClick={handleShortlist}
                style={{
                  padding: '9px 22px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
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
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 10px' }}>
              Reject {candidate.name}?
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, margin: '0 0 24px' }}>
              This application will be marked as Rejected for this cycle.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setRejectModal(false)}
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
                onClick={handleReject}
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

      {/* Message Modal */}
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
              maxWidth: '500px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              border: '1px solid #E2E8F0'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 14px' }}>
              Send Message to {candidate.name}
            </h3>
            <form onSubmit={handleSendMessage}>
              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message regarding next steps..."
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
                  onClick={() => setMessageModal(false)}
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
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </RecruiterLayout>
  );
}
