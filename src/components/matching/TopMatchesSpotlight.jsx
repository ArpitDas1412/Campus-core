import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Code2,
  FileText,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function TopMatchesSpotlight({
  topMatches = [],
  onOpenMatchDetails,
  selectedForCompare = [],
  onToggleCompare
}) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!topMatches || topMatches.length === 0) return null;

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              color: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Sparkles size={16} />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            Top AI Talent Matches
          </h2>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: '#ECFDF5',
              color: '#059669',
              padding: '2px 8px',
              borderRadius: '6px',
              border: '1px solid #A7F3D0'
            }}
          >
            Highest Alignment
          </span>
        </div>

        <span style={{ fontSize: '12.5px', color: '#64748B' }}>
          Surfaced by multi-factor semantic alignment
        </span>
      </div>

      {/* Grid of Top 3 Candidate Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}
      >
        {topMatches.map((cand, idx) => {
          const student = cand.student || {};
          const isComparing = selectedForCompare.some((c) => c.candidateId === cand.candidateId);

          return (
            <div
              key={cand.candidateId}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1.5px solid #E2E8F0',
                padding: '22px',
                boxShadow: '0 4px 16px rgba(16, 27, 54, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#3978F6';
                e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(57, 120, 246, 0.15)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(16, 27, 54, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Top Accent Strip */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  backgroundColor: idx === 0 ? '#10B981' : idx === 1 ? '#3978F6' : '#8B5CF6'
                }}
              />

              <div>
                {/* Header: Avatar, Name, Rank & Score */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        backgroundColor: student.avatarBg || '#101B36',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '15px'
                      }}
                    >
                      {student.avatar || student.name?.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#3978F6' }}>
                          RANK #{cand.rank || idx + 1}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '2px 0 0' }}>
                        {student.name}
                      </h3>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>
                        {student.degree} {student.deptCode || student.department} • CGPA {student.cgpa}
                      </div>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: '22px',
                        fontWeight: 800,
                        color: cand.recommendationTier?.color || '#059669',
                        lineHeight: 1
                      }}
                    >
                      {cand.matchScore}%
                    </div>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '6px',
                        backgroundColor: cand.recommendationTier?.bgColor || '#ECFDF5',
                        color: cand.recommendationTier?.color || '#059669',
                        display: 'inline-block',
                        marginTop: '4px'
                      }}
                    >
                      {cand.recommendationTier?.label || 'Strong Match'}
                    </span>
                  </div>
                </div>

                {/* Metrics 4-Box Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    marginBottom: '16px',
                    fontSize: '12px'
                  }}
                >
                  <div>
                    <span style={{ color: '#64748B' }}>Required Skills:</span>
                    <div style={{ fontWeight: 700, color: '#101B36' }}>
                      {cand.skillMatch?.requiredMatched} / {cand.skillMatch?.requiredTotal} covered
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Preferred Skills:</span>
                    <div style={{ fontWeight: 700, color: '#2563EB' }}>
                      {cand.skillMatch?.preferredMatched} / {cand.skillMatch?.preferredTotal} covered
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Project Relevance:</span>
                    <div style={{ fontWeight: 700, color: '#0E8EA8' }}>
                      {cand.projectRelevance?.score}% match
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Resume Relevance:</span>
                    <div style={{ fontWeight: 700, color: '#8B5CF6' }}>
                      {cand.resumeRelevance?.score}% align
                    </div>
                  </div>
                </div>

                {/* Preliminary Rationales List */}
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Why Surfaced:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {(cand.preliminaryReasons || []).slice(0, 3).map((r, ri) => (
                      <li key={ri} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#334155' }}>
                        <CheckCircle2 size={13} style={{ color: '#10B981', flexShrink: 0 }} />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div style={{ paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => {
                    const targetRoute = location.pathname.startsWith('/officer')
                      ? `/officer/ai-matching/${cand.jobId || 'JOB-2027-001'}/${cand.candidateId}`
                      : `/recruiter/jobs/${cand.jobId || 'JOB-2027-001'}/matching/${cand.candidateId}`;
                    navigate(targetRoute);
                  }}
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    borderRadius: '9px',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(57, 120, 246, 0.25)'
                  }}
                >
                  <span>View Detailed Fit Analysis →</span>
                </button>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <button
                    onClick={() => onOpenMatchDetails(cand)}
                    style={{
                      flex: 1,
                      padding: '7px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB',
                      border: '1px solid #BFDBFE',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Sparkles size={12} />
                    <span>Match Drawer</span>
                  </button>

                <button
                  onClick={() => navigate(`/officer/students/${student.id || student.legacyId}`)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    color: '#475569',
                    border: '1px solid #CBD5E1',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="View Student 360 Profile (Layer 3)"
                >
                  <ExternalLink size={13} />
                  <span>360° Profile</span>
                </button>

                  {onToggleCompare && (
                    <button
                      onClick={() => onToggleCompare(cand)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        backgroundColor: isComparing ? '#F5F3FF' : '#FFFFFF',
                        color: isComparing ? '#7C3AED' : '#64748B',
                        border: isComparing ? '1px solid #C4B5FD' : '1px solid #CBD5E1',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {isComparing ? '✓ Comparing' : '+ Compare'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
