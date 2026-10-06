import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Briefcase,
  FileText,
  UserCheck,
  UserX,
  Eye,
  Layers
} from 'lucide-react';
import RecommendationBadge from './RecommendationBadge.jsx';
import {
  AI_RECOMMENDATION_STATUS,
  RECRUITER_DECISION_STATUS,
  STATUS_STYLES
} from '../../data/shortlistingConfig.js';

export default function CandidateShortlistTable({
  candidates = [],
  selectedIds = new Set(),
  onToggleSelect,
  onToggleSelectAll,
  onOpenReasonPanel,
  onChangeDecision,
  onOpenOverrideModal,
  selectedForCompare = [],
  onToggleCompare,
  jobId,
  isOfficer = false
}) {
  const navigate = useNavigate();

  const allSelected = candidates.length > 0 && selectedIds.size === candidates.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < candidates.length;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(16, 27, 54, 0.04)'
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1100px' }}>
          <thead>
            <tr
              style={{
                backgroundColor: '#F8FAFC',
                borderBottom: '1px solid #E2E8F0',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#475569',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              {/* Checkbox */}
              <th style={{ padding: '14px 16px', width: '40px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={onToggleSelectAll}
                  style={{ cursor: 'pointer', accentColor: '#3978F6' }}
                />
              </th>

              <th style={{ padding: '14px 12px', width: '50px' }}>Rank</th>
              <th style={{ padding: '14px 16px' }}>Candidate</th>
              <th style={{ padding: '14px 14px' }}>Fit Score</th>
              <th style={{ padding: '14px 14px' }}>AI Recommendation</th>
              <th style={{ padding: '14px 12px' }}>Skill Cov.</th>
              <th style={{ padding: '14px 12px' }}>CGPA</th>
              <th style={{ padding: '14px 12px' }}>Projects</th>
              <th style={{ padding: '14px 12px' }}>Experience</th>
              <th style={{ padding: '14px 14px' }}>Top Strength</th>
              <th style={{ padding: '14px 14px' }}>Main Gap</th>
              <th style={{ padding: '14px 16px', minWidth: '150px' }}>Recruiter Decision</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length === 0 ? (
              <tr>
                <td colSpan={13} style={{ padding: '48px 24px', textAlign: 'center', color: '#64748B' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                    No candidates found matching the current filters.
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    Try clearing search queries or adjusting minimum fit and skill coverage thresholds.
                  </div>
                </td>
              </tr>
            ) : (
              candidates.map((item) => {
                const isSelected = selectedIds.has(item.candidateId);
                const isCompared = selectedForCompare.some((c) => c.candidateId === item.candidateId);
                const fitScore = item.aiRecommendation?.score ?? 0;
                const recStatus = item.aiRecommendation?.status;
                const decStatus = item.recruiterDecision?.status;
                const decMeta = STATUS_STYLES[decStatus] || STATUS_STYLES[RECRUITER_DECISION_STATUS.PENDING];

                // Derive top strength and main gap
                const topStrength =
                  item.fitResult?.positiveSignals?.[0]?.title ||
                  item.student?.skills?.[0]?.name ||
                  'Strong Core Fundamentals';
                const mainGap =
                  item.fitResult?.missingSkills?.[0]?.name ||
                  item.fitResult?.weakSignals?.[0]?.title ||
                  'None identified';

                const fitPageUrl = isOfficer
                  ? `/officer/ai-matching/${jobId}/${item.candidateId}`
                  : `/recruiter/jobs/${jobId}/matching/${item.candidateId}`;

                return (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      backgroundColor: isSelected ? '#F0F9FF' : '#FFFFFF',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    {/* Checkbox */}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(item.candidateId)}
                        style={{ cursor: 'pointer', accentColor: '#3978F6' }}
                      />
                    </td>

                    {/* Rank */}
                    <td style={{ padding: '14px 12px' }}>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: 800,
                          color: item.rank <= 3 ? '#2563EB' : '#64748B'
                        }}
                      >
                        #{item.rank}
                      </span>
                    </td>

                    {/* Candidate Identity */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#EFF6FF',
                            border: '1px solid #BFDBFE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#1D4ED8',
                            fontSize: '13px',
                            fontWeight: 800,
                            flexShrink: 0
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
                              fontSize: '13.5px',
                              fontWeight: 800,
                              color: '#101B36',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#3978F6')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#101B36')}
                          >
                            <span>{item.student?.name}</span>
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                            {item.student?.id} • {item.student?.department || item.student?.deptCode}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Fit Score Badge */}
                    <td style={{ padding: '14px 14px' }}>
                      <div
                        onClick={() => navigate(fitPageUrl)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'baseline',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          backgroundColor: fitScore >= 90 ? '#EFF6FF' : fitScore >= 75 ? '#ECFDF5' : '#FFFBEB',
                          border: `1px solid ${fitScore >= 90 ? '#BFDBFE' : fitScore >= 75 ? '#A7F3D0' : '#FDE68A'}`,
                          cursor: 'pointer'
                        }}
                        title="Click to view Layer 8 Explainable Fit Breakdown"
                      >
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: 900,
                            color: fitScore >= 90 ? '#1D4ED8' : fitScore >= 75 ? '#059669' : '#D97706'
                          }}
                        >
                          {fitScore}%
                        </span>
                        <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#64748B' }}>
                          {item.aiRecommendation?.tier}
                        </span>
                      </div>
                    </td>

                    {/* AI Recommendation Badge */}
                    <td style={{ padding: '14px 14px' }}>
                      <RecommendationBadge status={recStatus} size="sm" />
                    </td>

                    {/* Skill Coverage */}
                    <td style={{ padding: '14px 12px' }}>
                      <span
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color:
                            item.criteria?.requiredSkillCoverage >= 85
                              ? '#059669'
                              : item.criteria?.requiredSkillCoverage >= 70
                              ? '#2563EB'
                              : '#D97706'
                        }}
                      >
                        {item.criteria?.requiredSkillCoverage}%
                      </span>
                    </td>

                    {/* CGPA */}
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                        {item.student?.cgpa}
                      </span>
                    </td>

                    {/* Projects Count */}
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ fontSize: '12.5px', color: '#475569' }}>
                        {item.student?.projects ? item.student.projects.length : 2}
                      </span>
                    </td>

                    {/* Experience */}
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ fontSize: '12px', color: '#475569', whiteSpace: 'nowrap' }}>
                        {item.student?.experience &&
                        (Array.isArray(item.student.experience)
                          ? item.student.experience.length > 0
                          : item.student.experience > 0)
                          ? '1 Internship'
                          : 'Capstone only'}
                      </span>
                    </td>

                    {/* Top Strength */}
                    <td style={{ padding: '14px 14px' }}>
                      <span
                        style={{
                          fontSize: '11.5px',
                          color: '#059669',
                          fontWeight: 600,
                          display: 'inline-block',
                          maxWidth: '130px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={topStrength}
                      >
                        ✓ {topStrength}
                      </span>
                    </td>

                    {/* Main Gap */}
                    <td style={{ padding: '14px 14px' }}>
                      <span
                        style={{
                          fontSize: '11.5px',
                          color: '#D97706',
                          fontWeight: 500,
                          display: 'inline-block',
                          maxWidth: '120px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={mainGap}
                      >
                        △ {mainGap}
                      </span>
                    </td>

                    {/* Recruiter Decision Dropdown / Selector */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ position: 'relative' }}>
                        <select
                          value={decStatus}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            // Check if this action is an override requiring explanation
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
                          }}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            backgroundColor: decMeta.bg,
                            color: decMeta.color,
                            border: `1px solid ${decMeta.border}`,
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            width: '100%'
                          }}
                        >
                          <option value={RECRUITER_DECISION_STATUS.PENDING}>Pending</option>
                          <option value={RECRUITER_DECISION_STATUS.SHORTLISTED}>Shortlisted</option>
                          <option value={RECRUITER_DECISION_STATUS.NEEDS_REVIEW}>Needs Review</option>
                          <option value={RECRUITER_DECISION_STATUS.ON_HOLD}>On Hold</option>
                          <option value={RECRUITER_DECISION_STATUS.REJECTED}>Rejected</option>
                        </select>

                        {item.recruiterDecision?.overridden && (
                          <div
                            style={{
                              fontSize: '10px',
                              color: '#7C3AED',
                              fontWeight: 700,
                              marginTop: '2px'
                            }}
                          >
                            ✦ Human Override
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        {/* Why Included? / Why Not Included? */}
                        <button
                          onClick={() => onOpenReasonPanel(item)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #CBD5E1',
                            color: '#334155',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            whiteSpace: 'nowrap'
                          }}
                          title="Open AI Recommendation & Evidence Dossier"
                        >
                          <HelpCircle size={13} style={{ color: '#2563EB' }} />
                          <span>
                            {recStatus === AI_RECOMMENDATION_STATUS.RECOMMENDED ? 'Why Included?' : 'Why Not?'}
                          </span>
                        </button>

                        {/* View Fit Score Button */}
                        <button
                          onClick={() => navigate(fitPageUrl)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#EFF6FF',
                            border: '1px solid #BFDBFE',
                            color: '#2563EB',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="View Layer 8 Explainable Fit Breakdown"
                        >
                          <Layers size={13} />
                          <span>Fit Score</span>
                        </button>

                        {/* Compare checkbox toggle */}
                        <button
                          onClick={() => onToggleCompare(item)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '6px',
                            backgroundColor: isCompared ? '#F5F3FF' : '#FFFFFF',
                            border: `1px solid ${isCompared ? '#7C3AED' : '#E2E8F0'}`,
                            color: isCompared ? '#7C3AED' : '#64748B',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                          title="Add candidate to side-by-side comparison"
                        >
                          {isCompared ? 'Comparing' : 'Compare'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
