import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  HelpCircle,
  Layers,
  FileText,
  User,
  Zap,
  Briefcase
} from 'lucide-react';
import RecommendationBadge from './RecommendationBadge.jsx';
import {
  AI_RECOMMENDATION_STATUS,
  RECRUITER_DECISION_STATUS,
  STATUS_STYLES
} from '../../data/shortlistingConfig.js';

export default function CandidateShortlistCard({
  item,
  isSelected,
  onToggleSelect,
  onOpenReasonPanel,
  onChangeDecision,
  onOpenOverrideModal,
  jobId,
  isOfficer = false
}) {
  const navigate = useNavigate();

  const fitScore = item.aiRecommendation?.score ?? 0;
  const recStatus = item.aiRecommendation?.status;
  const decStatus = item.recruiterDecision?.status;
  const decMeta = STATUS_STYLES[decStatus] || STATUS_STYLES[RECRUITER_DECISION_STATUS.PENDING];

  const factors = item.fitResult?.factors || {};
  const whyReasons = item.aiRecommendation?.reasons || [];
  const missingSkills = item.fitResult?.missingSkills || [];

  const fitPageUrl = isOfficer
    ? `/officer/ai-matching/${jobId}/${item.candidateId}`
    : `/recruiter/jobs/${jobId}/matching/${item.candidateId}`;

  const profileUrl = `/officer/students/${item.candidateId}`;
  const skillGapUrl = `/officer/students/${item.candidateId}/skill-gap`;
  const resumeUrl = `/officer/students/${item.candidateId}/resume`;

  const handleDecisionClick = (newStatus) => {
    const isOverriding =
      (recStatus === AI_RECOMMENDATION_STATUS.RECOMMENDED &&
        newStatus === RECRUITER_DECISION_STATUS.REJECTED) ||
      (recStatus !== AI_RECOMMENDATION_STATUS.RECOMMENDED &&
        newStatus === RECRUITER_DECISION_STATUS.SHORTLISTED);

    if (isOverriding) {
      onOpenOverrideModal(item, newStatus);
    } else {
      onChangeDecision(item.candidateId, newStatus);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: `1px solid ${isSelected ? '#3978F6' : '#E2E8F0'}`,
        padding: '20px',
        boxShadow: isSelected ? '0 8px 20px rgba(57, 120, 246, 0.12)' : '0 2px 8px rgba(16, 27, 54, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
      }}
    >
      {/* Top Bar: Checkbox + Avatar + Basic Details + Rank */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(item.candidateId)}
              style={{ cursor: 'pointer', accentColor: '#3978F6' }}
            />
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1D4ED8',
                fontSize: '14px',
                fontWeight: 800
              }}
            >
              {item.student?.avatar ||
                item.student?.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2) ||
                'ST'}
            </div>
            <div>
              <div
                onClick={() => onOpenReasonPanel(item)}
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#101B36',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#3978F6')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#101B36')}
              >
                {item.student?.name}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                {item.student?.id} • {item.student?.department || item.student?.deptCode} • CGPA {item.student?.cgpa}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: item.rank <= 3 ? '#2563EB' : '#64748B',
                backgroundColor: item.rank <= 3 ? '#EFF6FF' : '#F1F5F9',
                padding: '2px 8px',
                borderRadius: '6px'
              }}
            >
              Rank #{item.rank}
            </span>
          </div>
        </div>

        {/* Score & Recommendation Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '10px',
            backgroundColor: fitScore >= 90 ? '#EFF6FF' : fitScore >= 75 ? '#ECFDF5' : '#FFFBEB',
            border: `1px solid ${fitScore >= 90 ? '#BFDBFE' : fitScore >= 75 ? '#A7F3D0' : '#FDE68A'}`,
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 900,
                color: fitScore >= 90 ? '#1D4ED8' : fitScore >= 75 ? '#059669' : '#D97706'
              }}
            >
              {fitScore}%
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
              {item.aiRecommendation?.tier}
            </span>
          </div>

          <RecommendationBadge status={recStatus} size="sm" />
        </div>

        {/* 5-Factor Score Pill Mini-Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            fontSize: '11px',
            marginBottom: '16px'
          }}
        >
          <div style={{ backgroundColor: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <div style={{ color: '#64748B' }}>Skills</div>
            <strong style={{ color: '#101B36', fontSize: '12px' }}>{factors.requiredSkills?.score ?? 85}%</strong>
          </div>
          <div style={{ backgroundColor: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <div style={{ color: '#64748B' }}>Projects</div>
            <strong style={{ color: '#101B36', fontSize: '12px' }}>{factors.projectRelevance?.score ?? 80}%</strong>
          </div>
          <div style={{ backgroundColor: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <div style={{ color: '#64748B' }}>Resume</div>
            <strong style={{ color: '#101B36', fontSize: '12px' }}>{factors.resumeRelevance?.score ?? 80}%</strong>
          </div>
        </div>

        {/* Why Recommended / Positive Signals */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#059669', marginBottom: '6px' }}>
            WHY RECOMMENDED?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {whyReasons.slice(0, 3).map((reason, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px',
                  fontSize: '12px',
                  color: '#334155',
                  lineHeight: 1.3
                }}
              >
                <CheckCircle2 size={13} style={{ color: '#059669', marginTop: '2px', flexShrink: 0 }} />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Gaps */}
        {missingSkills.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#D97706', marginBottom: '6px' }}>
              MAIN GAPS / WEAK SIGNALS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {missingSkills.slice(0, 3).map((gap, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#FFFBEB',
                    border: '1px solid #FDE68A',
                    color: '#B45309',
                    fontSize: '11px',
                    fontWeight: 600
                  }}
                >
                  △ {gap.name || gap}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer & Actions */}
      <div>
        {/* Recruiter Current Decision Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: decMeta.bg,
            border: `1px solid ${decMeta.border}`,
            marginBottom: '12px',
            fontSize: '12px'
          }}
        >
          <span style={{ color: '#475569', fontWeight: 600 }}>Decision State:</span>
          <span style={{ color: decMeta.color, fontWeight: 800 }}>
            {decMeta.label} {item.recruiterDecision?.overridden ? '(Override)' : ''}
          </span>
        </div>

        {/* Action Buttons Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '8px' }}>
          <button
            onClick={() => handleDecisionClick(RECRUITER_DECISION_STATUS.SHORTLISTED)}
            style={{
              padding: '7px 4px',
              borderRadius: '6px',
              backgroundColor: decStatus === RECRUITER_DECISION_STATUS.SHORTLISTED ? '#059669' : '#ECFDF5',
              color: decStatus === RECRUITER_DECISION_STATUS.SHORTLISTED ? '#FFFFFF' : '#059669',
              border: '1px solid #A7F3D0',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Shortlist
          </button>
          <button
            onClick={() => handleDecisionClick(RECRUITER_DECISION_STATUS.NEEDS_REVIEW)}
            style={{
              padding: '7px 4px',
              borderRadius: '6px',
              backgroundColor: decStatus === RECRUITER_DECISION_STATUS.NEEDS_REVIEW ? '#D97706' : '#FFFBEB',
              color: decStatus === RECRUITER_DECISION_STATUS.NEEDS_REVIEW ? '#FFFFFF' : '#D97706',
              border: '1px solid #FDE68A',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Review
          </button>
          <button
            onClick={() => handleDecisionClick(RECRUITER_DECISION_STATUS.REJECTED)}
            style={{
              padding: '7px 4px',
              borderRadius: '6px',
              backgroundColor: decStatus === RECRUITER_DECISION_STATUS.REJECTED ? '#DC2626' : '#FEF2F2',
              color: decStatus === RECRUITER_DECISION_STATUS.REJECTED ? '#FFFFFF' : '#DC2626',
              border: '1px solid #FECACA',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Reject
          </button>
        </div>

        {/* Deep Dive Links */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
          <button
            onClick={() => onOpenReasonPanel(item)}
            style={{
              background: 'none',
              border: 'none',
              color: '#3978F6',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <HelpCircle size={13} />
            <span>Why Included?</span>
          </button>

          <button
            onClick={() => navigate(fitPageUrl)}
            style={{
              background: 'none',
              border: 'none',
              color: '#7C3AED',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Layers size={13} />
            <span>Fit Score (L8) →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
