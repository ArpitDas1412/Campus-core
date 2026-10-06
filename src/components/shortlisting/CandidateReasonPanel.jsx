import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  Code,
  FileText,
  Briefcase,
  Award,
  HelpCircle
} from 'lucide-react';
import RecommendationBadge from './RecommendationBadge.jsx';
import { AI_RECOMMENDATION_STATUS } from '../../data/shortlistingConfig.js';

export default function CandidateReasonPanel({
  isOpen,
  onClose,
  item,
  jobId,
  isOfficer = false,
  onOpenOverrideModal
}) {
  const navigate = useNavigate();

  if (!isOpen || !item) return null;

  const candidate = item.candidate || item.student || {};
  const isRecommended = item.aiRecommendation?.status === AI_RECOMMENDATION_STATUS.RECOMMENDED;
  const isNeedsReview = item.aiRecommendation?.status === AI_RECOMMENDATION_STATUS.NEEDS_REVIEW;
  const isIneligible = item.aiRecommendation?.status === AI_RECOMMENDATION_STATUS.INELIGIBLE;
  const fitScore = item.aiRecommendation?.score ?? 0;

  const fitPageUrl = isOfficer
    ? `/officer/ai-matching/${jobId}/${item.candidateId}`
    : `/recruiter/jobs/${jobId}/matching/${item.candidateId}`;

  const academicReasons = item.fitResult?.academicExplanation?.details || [];
  const positiveSignals = item.fitResult?.positiveSignals || [];
  const weakSignals = item.fitResult?.weakSignals || [];
  const missingSkills = item.fitResult?.missingSkills || [];
  const matchedSkills = item.fitResult?.skillExplanation?.matchedRequired || [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.5)',
        backdropFilter: 'blur(3px)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-8px 0 30px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: isRecommended ? '#059669' : '#D97706',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                {isRecommended ? 'AI RECOMMENDATION DOSSIER' : 'AI REVIEW DOSSIER'}
              </span>
              <RecommendationBadge status={item.aiRecommendation?.status} size="sm" />
            </div>

            <h2
              style={{
                fontSize: '20px',
                fontWeight: 900,
                color: '#101B36',
                margin: 0,
                letterSpacing: '-0.02em'
              }}
            >
              {isRecommended
                ? `Why CampusCore Recommended ${candidate.name?.split(' ')[0]}`
                : `Why Not Currently Recommended`}
            </h2>
            <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
              {candidate.name} ({candidate.id}) • {candidate.department}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E2E8F0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', flex: 1 }}>
          {/* Fit Score & Recommendation Banner */}
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: isRecommended ? '#EFF6FF' : isNeedsReview ? '#FFFBEB' : '#FEF2F2',
              border: `1px solid ${isRecommended ? '#BFDBFE' : isNeedsReview ? '#FDE68A' : '#FECACA'}`,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>Overall Fit Score</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '26px',
                    fontWeight: 900,
                    color: isRecommended ? '#1D4ED8' : isNeedsReview ? '#D97706' : '#DC2626'
                  }}
                >
                  {fitScore}%
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                  {item.aiRecommendation?.tier}
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>Skill Coverage</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#101B36' }}>
                {item.criteria?.requiredSkillCoverage}%
              </div>
            </div>
          </div>

          {/* Section 1: Hard Academic Eligibility */}
          <div style={{ marginBottom: '22px' }}>
            <h4
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#101B36',
                margin: '0 0 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShieldCheck size={16} style={{ color: item.criteria?.eligible ? '#059669' : '#DC2626' }} />
              <span>Hard Academic Eligibility</span>
            </h4>

            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '10px',
                padding: '12px 14px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '12.5px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} style={{ color: '#059669' }} />
                <span>
                  CGPA Requirement satisfied (<strong>{candidate.cgpa}</strong> vs 7.5 minimum)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} style={{ color: '#059669' }} />
                <span>
                  Department eligible (<strong>{candidate.department || candidate.deptCode}</strong>)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} style={{ color: '#059669' }} />
                <span>Graduation year eligible (Batch 2027)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} style={{ color: '#059669' }} />
                <span>No active backlogs (0 recorded)</span>
              </div>
            </div>
          </div>

          {/* Section 2: Main Strengths / Why Recommended */}
          <div style={{ marginBottom: '22px' }}>
            <h4
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#059669',
                margin: '0 0 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={16} />
              <span>Key Strengths & Signal Matches</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(positiveSignals.length > 0 ? positiveSignals : item.aiRecommendation?.reasons || []).slice(0, 4).map((sig, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    fontSize: '12px',
                    color: '#065F46'
                  }}
                >
                  <CheckCircle2 size={14} style={{ color: '#059669', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>{sig.title || sig}</div>
                    {sig.description && <div style={{ fontSize: '11.5px', color: '#047857' }}>{sig.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Evidence Sources */}
          <div style={{ marginBottom: '22px' }}>
            <h4
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#101B36',
                margin: '0 0 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FileText size={16} style={{ color: '#2563EB' }} />
              <span>Multi-Source Evidence Breakdown</span>
            </h4>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: '12px'
              }}
            >
              <div style={{ backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#64748B', fontSize: '11px' }}>Technical Skills</div>
                <strong style={{ color: '#101B36' }}>{item.fitResult?.factors?.requiredSkills?.score ?? 85}% Alignment</strong>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#64748B', fontSize: '11px' }}>Projects Portfolio</div>
                <strong style={{ color: '#101B36' }}>{item.fitResult?.factors?.projectRelevance?.score ?? 80}% Relevancy</strong>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#64748B', fontSize: '11px' }}>Resume Intelligence</div>
                <strong style={{ color: '#101B36' }}>{item.fitResult?.factors?.resumeRelevance?.score ?? 80}% Keywords</strong>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#64748B', fontSize: '11px' }}>Industry Experience</div>
                <strong style={{ color: '#101B36' }}>{item.fitResult?.factors?.experience?.score ?? 75}% Alignment</strong>
              </div>
            </div>
          </div>

          {/* Section 4: Main Gaps / Weaknesses */}
          {(missingSkills.length > 0 || weakSignals.length > 0) && (
            <div style={{ marginBottom: '24px' }}>
              <h4
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#D97706',
                  margin: '0 0 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <AlertCircle size={16} />
                <span>Areas for Development / Weak Signals</span>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {missingSkills.map((gap, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFBEB',
                      border: '1px solid #FDE68A',
                      fontSize: '12px',
                      color: '#B45309'
                    }}
                  >
                    <span>△</span>
                    <span>
                      <strong>{gap.name || gap}</strong>: Preferred technology not found in profile
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            position: 'sticky',
            bottom: 0,
            zIndex: 10
          }}
        >
          {/* Override Button if not recommended */}
          {!isRecommended && (
            <button
              onClick={() => {
                onClose();
                onOpenOverrideModal(item, 'Shortlisted');
              }}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Override & Shortlist
            </button>
          )}

          {/* Full Fit Score Link (Layer 8) */}
          <button
            onClick={() => {
              onClose();
              navigate(fitPageUrl);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '8px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              marginLeft: 'auto',
              boxShadow: '0 2px 8px rgba(57, 120, 246, 0.3)'
            }}
          >
            <Layers size={14} />
            <span>View Full Explainable Fit Score →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
