import React from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles, Scale, ExternalLink } from 'lucide-react';
import RecommendationBadge from './RecommendationBadge.jsx';

export default function ShortlistComparison({
  isOpen,
  onClose,
  selectedCandidates = [],
  onRemoveCandidate,
  job
}) {
  if (!isOpen || selectedCandidates.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Scale size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#101B36', margin: 0 }}>
                Candidate Fit & Shortlist Benchmark
              </h3>
              <span style={{ fontSize: '12.5px', color: '#64748B' }}>
                Side-by-side factor attribution across {selectedCandidates.length} candidate(s) for {job?.title || 'this role'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Comparison Content Table */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `180px repeat(${selectedCandidates.length}, 1fr)`,
              gap: '16px'
            }}
          >
            {/* Header Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontWeight: 700, color: '#475569', fontSize: '13px' }}>
              <div style={{ height: '70px', display: 'flex', alignItems: 'center' }}>Candidate</div>
              <div>AI Fit Score</div>
              <div>AI Recommendation</div>
              <div>Required Skills</div>
              <div>Academic Eligibility</div>
              <div>Projects Relevance</div>
              <div>Resume Relevance</div>
              <div>Experience Fit</div>
              <div>CGPA</div>
              <div style={{ minHeight: '60px' }}>Key Strengths</div>
              <div style={{ minHeight: '60px' }}>Identified Gaps</div>
            </div>

            {/* Candidate Columns */}
            {selectedCandidates.map((item) => {
              const candidate = item.candidate || item.student || {};
              const fitScore = item.aiRecommendation?.score;
              const factors = item.fitResult?.factors || {};

              return (
                <div
                  key={item.candidateId}
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    fontSize: '13px',
                    position: 'relative'
                  }}
                >
                  {/* Remove pill */}
                  <button
                    onClick={() => onRemoveCandidate(item.candidateId)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: '2px'
                    }}
                    title="Remove from comparison"
                  >
                    <X size={14} />
                  </button>

                  {/* Candidate Bio Header */}
                  <div style={{ height: '70px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#101B36' }}>
                      {candidate.name}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                      {candidate.id} • {candidate.department}
                    </div>
                    <div style={{ fontSize: '11px', color: '#059669', fontWeight: 700, marginTop: '2px' }}>
                      Rank #{item.rank}
                    </div>
                  </div>

                  {/* Fit Score */}
                  <div>
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: 900,
                        color: fitScore >= 90 ? '#1D4ED8' : '#059669'
                      }}
                    >
                      {fitScore}%
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#64748B', marginLeft: '4px' }}>
                      ({item.aiRecommendation?.tier})
                    </span>
                  </div>

                  {/* Recommendation Badge */}
                  <div>
                    <RecommendationBadge status={item.aiRecommendation?.status} size="sm" />
                  </div>

                  {/* Factors */}
                  <div>
                    <strong style={{ color: '#101B36' }}>{factors.requiredSkills?.score ?? 85}%</strong>
                  </div>
                  <div>
                    <strong style={{ color: '#101B36' }}>{factors.academicEligibility?.score ?? 100}%</strong>
                  </div>
                  <div>
                    <strong style={{ color: '#101B36' }}>{factors.projectRelevance?.score ?? 80}%</strong>
                  </div>
                  <div>
                    <strong style={{ color: '#101B36' }}>{factors.resumeRelevance?.score ?? 80}%</strong>
                  </div>
                  <div>
                    <strong style={{ color: '#101B36' }}>{factors.experience?.score ?? 75}%</strong>
                  </div>

                  {/* CGPA */}
                  <div>
                    <strong style={{ color: '#101B36' }}>{candidate.cgpa}</strong>
                  </div>

                  {/* Strengths */}
                  <div style={{ minHeight: '60px', fontSize: '11.5px', color: '#059669', lineHeight: 1.3 }}>
                    ✓ {item.fitResult?.positiveSignals?.[0]?.title || 'Strong core engineering fundamentals'}
                  </div>

                  {/* Gaps */}
                  <div style={{ minHeight: '60px', fontSize: '11.5px', color: '#D97706', lineHeight: 1.3 }}>
                    △ {item.fitResult?.missingSkills?.[0]?.name || 'Limited auxiliary cloud experience'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#64748B'
          }}
        >
          <span>
            Rankings reflect <strong>highest configured job-fit score</strong> according to defined placement criteria.
          </span>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#101B36',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Close Benchmark
          </button>
        </div>
      </div>
    </div>
  );
}
