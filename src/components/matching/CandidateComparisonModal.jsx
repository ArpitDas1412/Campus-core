import React from 'react';
import { X, CheckCircle2, Award, Sparkles, Scale, ExternalLink } from 'lucide-react';

export default function CandidateComparisonModal({
  candidates = [],
  isOpen,
  onClose,
  onRemoveCandidate
}) {
  if (!isOpen || candidates.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 1150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(16, 27, 54, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'scaleUp 0.2s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                color: '#3978F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Scale size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                Candidate Talent Comparison
              </h2>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
                Comparing {candidates.length} candidate{candidates.length > 1 ? 's' : ''} across multi-factor signals (up to 3 candidates)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Comparison Table */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 14px', width: '22%', color: '#64748B', fontSize: '12px' }}>
                  Metrics & Factors
                </th>
                {candidates.map((cand) => {
                  const student = cand.student || {};
                  return (
                    <th key={cand.candidateId} style={{ padding: '12px 14px', textAlign: 'center', width: `${78 / candidates.length}%` }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            backgroundColor: student.avatarBg || '#101B36',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '14px'
                          }}
                        >
                          {student.avatar || student.name?.slice(0, 2).toUpperCase()}
                        </div>
                        <div style={{ fontWeight: 800, color: '#101B36', fontSize: '14px' }}>
                          {student.name}
                        </div>
                        <span style={{ fontSize: '11px', color: '#64748B' }}>
                          {student.deptCode || student.department} • {student.rollNo}
                        </span>
                        {onRemoveCandidate && (
                          <button
                            onClick={() => onRemoveCandidate(cand.candidateId)}
                            style={{
                              fontSize: '11px',
                              color: '#EF4444',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '2px 6px'
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* Row: Match Score */}
              <tr style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '14px', fontWeight: 700, color: '#101B36', fontSize: '13px' }}>
                  Preliminary Match Score
                </td>
                {candidates.map((cand) => (
                  <td key={cand.candidateId} style={{ padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: cand.recommendationTier?.color || '#059669' }}>
                      {cand.matchScore}%
                    </div>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '6px',
                        backgroundColor: cand.recommendationTier?.bgColor,
                        color: cand.recommendationTier?.color
                      }}
                    >
                      {cand.recommendationTier?.label}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Academic CGPA */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 14px', color: '#475569', fontSize: '13px' }}>
                  Academic CGPA
                </td>
                {candidates.map((cand) => (
                  <td key={cand.candidateId} style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700, color: '#101B36' }}>
                    {cand.student?.cgpa} / 10.0
                  </td>
                ))}
              </tr>

              {/* Row: Required Skills Coverage */}
              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#FAFCFF' }}>
                <td style={{ padding: '12px 14px', color: '#475569', fontSize: '13px' }}>
                  Required Skills Coverage
                </td>
                {candidates.map((cand) => (
                  <td key={cand.candidateId} style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700, color: '#059669' }}>
                    {cand.skillMatch?.requiredMatched} / {cand.skillMatch?.requiredTotal} skills ({cand.skillMatch?.score}%)
                  </td>
                ))}
              </tr>

              {/* Row: Preferred Skills Coverage */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 14px', color: '#475569', fontSize: '13px' }}>
                  Preferred Skills Coverage
                </td>
                {candidates.map((cand) => (
                  <td key={cand.candidateId} style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 600, color: '#2563EB' }}>
                    {cand.skillMatch?.preferredMatched} / {cand.skillMatch?.preferredTotal} covered
                  </td>
                ))}
              </tr>

              {/* Row: Project Relevance */}
              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#FAFCFF' }}>
                <td style={{ padding: '12px 14px', color: '#475569', fontSize: '13px' }}>
                  Project Relevance Score
                </td>
                {candidates.map((cand) => (
                  <td key={cand.candidateId} style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 600, color: '#0E8EA8' }}>
                    {cand.projectRelevance?.score}% ({cand.projectRelevance?.count || 0} projects)
                  </td>
                ))}
              </tr>

              {/* Row: Resume Relevance */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 14px', color: '#475569', fontSize: '13px' }}>
                  Resume Intelligence Score
                </td>
                {candidates.map((cand) => (
                  <td key={cand.candidateId} style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 600, color: '#8B5CF6' }}>
                    {cand.resumeRelevance?.score}% (ATS: {cand.resumeRelevance?.atsQualityScore}/100)
                  </td>
                ))}
              </tr>

              {/* Row: Experience */}
              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#FAFCFF' }}>
                <td style={{ padding: '12px 14px', color: '#475569', fontSize: '13px' }}>
                  Work / Internship Experience
                </td>
                {candidates.map((cand) => (
                  <td key={cand.candidateId} style={{ padding: '12px 14px', textAlign: 'center', fontSize: '12.5px', color: '#334155' }}>
                    {cand.experienceMatch?.summary}
                  </td>
                ))}
              </tr>

              {/* Row: Certifications */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 14px', color: '#475569', fontSize: '13px' }}>
                  Verified Certifications
                </td>
                {candidates.map((cand) => (
                  <td key={cand.candidateId} style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 600, color: '#101B36' }}>
                    {cand.certificationMatch?.totalCerts || 0} certified
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            fontSize: '12px',
            color: '#64748B',
            textAlign: 'center'
          }}
        >
          Factor-by-factor comparative evaluation. No single candidate is declared winner; review aligned vectors for corporate fit.
        </div>
      </div>
    </div>
  );
}
