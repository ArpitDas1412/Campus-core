import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Target,
  UserCheck,
  BookmarkCheck,
  ChevronRight,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export default function CandidateRankingTable({
  candidates = [],
  onOpenMatchDetails,
  selectedForCompare = [],
  onToggleCompare,
  onShortlistCandidate,
  shortlistedIds = new Set()
}) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!candidates || candidates.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px dashed #CBD5E1',
          padding: '48px 24px',
          textAlign: 'center',
          color: '#64748B'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            color: '#94A3B8'
          }}
        >
          <AlertCircle size={24} />
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#101B36', margin: '0 0 6px' }}>
          No Matching Candidates Found
        </h3>
        <p style={{ fontSize: '13.5px', maxWidth: '440px', margin: '0 auto' }}>
          No student profiles currently satisfy the active filter combination. Try broadening your score, department, or skill coverage criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(16, 27, 54, 0.04)',
        marginBottom: '32px'
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '920px' }}>
          <thead>
            <tr
              style={{
                backgroundColor: '#F8FAFC',
                borderBottom: '1.5px solid #E2E8F0',
                color: '#475569',
                fontSize: '11.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              <th style={{ padding: '14px 16px', width: '50px', textAlign: 'center' }}>
                Compare
              </th>
              <th style={{ padding: '14px 12px', width: '60px' }}>Rank</th>
              <th style={{ padding: '14px 16px' }}>Candidate</th>
              <th style={{ padding: '14px 14px' }}>Dept</th>
              <th style={{ padding: '14px 12px' }}>CGPA</th>
              <th style={{ padding: '14px 16px' }}>AI Match Score</th>
              <th style={{ padding: '14px 14px' }}>Required Skills</th>
              <th style={{ padding: '14px 14px' }}>Projects</th>
              <th style={{ padding: '14px 14px' }}>Resume</th>
              <th style={{ padding: '14px 14px' }}>Status</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((cand, idx) => {
              const student = cand.student || {};
              const isSelected = selectedForCompare.some((c) => c.candidateId === cand.candidateId);
              const isShortlisted = shortlistedIds.has(cand.candidateId);
              const tier = cand.recommendationTier || {};

              return (
                <tr
                  key={cand.candidateId}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: isSelected ? '#F5F3FF' : idx % 2 === 0 ? '#FFFFFF' : '#FAFCFF',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#F0F7FF';
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#FFFFFF' : '#FAFCFF';
                  }}
                >
                  {/* Compare Checkbox */}
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleCompare(cand)}
                      style={{ cursor: 'pointer', width: '15px', height: '15px' }}
                      title="Select for candidate comparison"
                    />
                  </td>

                  {/* Rank */}
                  <td style={{ padding: '12px 12px', fontWeight: 800, color: idx < 3 ? '#3978F6' : '#64748B' }}>
                    #{cand.rank || idx + 1}
                  </td>

                  {/* Candidate Name & Info */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          backgroundColor: student.avatarBg || '#101B36',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '12.5px',
                          flexShrink: 0
                        }}
                      >
                        {student.avatar || student.name?.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#101B36', fontSize: '13.5px' }}>
                          {student.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                          {student.rollNo} • {student.degree}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#334155', fontWeight: 600 }}>
                    {student.deptCode || student.department}
                  </td>

                  {/* CGPA */}
                  <td style={{ padding: '12px 12px', fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                    {student.cgpa}
                  </td>

                  {/* AI Match Score with Tier Badge */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 800,
                          color: tier.color || '#059669',
                          minWidth: '38px'
                        }}
                      >
                        {cand.matchScore}%
                      </span>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: '6px',
                          backgroundColor: tier.bgColor || '#ECFDF5',
                          color: tier.color || '#059669',
                          border: `1px solid ${tier.borderColor || '#A7F3D0'}`
                        }}
                      >
                        {tier.label}
                      </span>
                    </div>
                  </td>

                  {/* Required Skills */}
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                        {cand.skillMatch?.requiredMatched}/{cand.skillMatch?.requiredTotal}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>
                        ({Math.round(((cand.skillMatch?.requiredMatched || 0) / (cand.skillMatch?.requiredTotal || 1)) * 100)}%)
                      </span>
                    </div>
                  </td>

                  {/* Project Relevance */}
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#0E8EA8' }}>
                        {cand.projectRelevance?.score}%
                      </span>
                    </div>
                  </td>

                  {/* Resume Relevance */}
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#8B5CF6' }}>
                        {cand.resumeRelevance?.score}%
                      </span>
                    </div>
                  </td>

                  {/* Placement Status */}
                  <td style={{ padding: '12px 14px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor:
                          student.placementStatus === 'Placed'
                            ? '#ECFDF5'
                            : student.readinessStatus === 'Job Ready'
                            ? '#EFF6FF'
                            : '#F8FAFC',
                        color:
                          student.placementStatus === 'Placed'
                            ? '#059669'
                            : student.readinessStatus === 'Job Ready'
                            ? '#2563EB'
                            : '#64748B'
                      }}
                    >
                      {student.placementStatus === 'Placed' ? 'Placed' : student.readinessStatus || 'Eligible'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      {/* Detailed Fit Analysis (Layer 8) */}
                      <button
                        onClick={() => {
                          const targetRoute = location.pathname.startsWith('/officer')
                            ? `/officer/ai-matching/${cand.jobId || 'JOB-2027-001'}/${cand.candidateId}`
                            : `/recruiter/jobs/${cand.jobId || 'JOB-2027-001'}/matching/${cand.candidateId}`;
                          navigate(targetRoute);
                        }}
                        title="View Explainable AI Fit Analysis (Layer 8)"
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          backgroundColor: '#3978F6',
                          color: '#FFFFFF',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 1px 4px rgba(57, 120, 246, 0.25)'
                        }}
                      >
                        <span>Fit Analysis →</span>
                      </button>

                      {/* Match Details */}
                      <button
                        onClick={() => onOpenMatchDetails(cand)}
                        title="View Preliminary Match Breakdown"
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
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
                        <Sparkles size={12} />
                        <span>Drawer</span>
                      </button>

                      {/* Student Profile 360 (Layer 3) */}
                      <button
                        onClick={() => navigate(`/officer/students/${student.id || student.legacyId}`)}
                        title="Open Student 360 Profile (Layer 3)"
                        style={{
                          padding: '6px 8px',
                          borderRadius: '8px',
                          backgroundColor: '#FFFFFF',
                          color: '#475569',
                          border: '1px solid #CBD5E1',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        <ExternalLink size={13} />
                      </button>

                      {/* Shortlist Action */}
                      <button
                        onClick={() => onShortlistCandidate(cand)}
                        title={isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          backgroundColor: isShortlisted ? '#ECFDF5' : '#FFFFFF',
                          color: isShortlisted ? '#059669' : '#475569',
                          border: isShortlisted ? '1px solid #A7F3D0' : '1px solid #CBD5E1',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <BookmarkCheck size={13} />
                        <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
