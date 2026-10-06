import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Award,
  Code2,
  FileText,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import SkillCoverageMatrix from './SkillCoverageMatrix';
import { MATCHING_WEIGHTS } from '../../data/matchingConfig';

export default function MatchDetailDrawer({
  candidate,
  job,
  isOpen,
  onClose
}) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen || !candidate) return null;

  const student = candidate.student || {};
  const tier = candidate.recommendationTier || {};

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-8px 0 32px rgba(16, 27, 54, 0.15)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.25s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                  {student.name}
                </h2>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: tier.bgColor || '#ECFDF5',
                    color: tier.color || '#059669',
                    border: `1px solid ${tier.borderColor || '#A7F3D0'}`
                  }}
                >
                  {tier.label || 'Strong Match'}
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
                {student.degree} {student.deptCode || student.department} • Roll No: {student.rollNo}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body Content */}
        <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 1. Preliminary Match Score Card */}
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: '#F8FAFD',
              border: '1.5px solid #DBEAFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#3978F6', textTransform: 'uppercase' }}>
                Preliminary Match Score
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                <span style={{ fontSize: '36px', fontWeight: 800, color: tier.color || '#059669', lineHeight: 1 }}>
                  {candidate.matchScore}%
                </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                  {tier.label}
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: '6px 0 0' }}>
                {tier.description}
              </p>
            </div>

            {/* Distinction Box: Eligibility vs Matching */}
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                fontSize: '12px',
                minWidth: '170px'
              }}
            >
              <div style={{ marginBottom: '6px' }}>
                <span style={{ color: '#64748B' }}>Eligibility:</span>
                <div style={{ fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} />
                  <span>Eligible to Apply</span>
                </div>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Target Drive:</span>
                <div style={{ fontWeight: 700, color: '#101B36' }}>
                  {job?.title}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Factor Breakdown Bars */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginBottom: '14px' }}>
              Multi-Factor Signal Breakdown
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Factor 1: Required Skills */}
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: '#101B36' }}>
                    Required Technical Skills ({MATCHING_WEIGHTS.requiredSkills * 100}% weight)
                  </span>
                  <strong style={{ color: '#059669' }}>{candidate.skillMatch?.score}%</strong>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${candidate.skillMatch?.score || 0}%`, backgroundColor: '#059669' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  Matched {candidate.skillMatch?.requiredMatched} of {candidate.skillMatch?.requiredTotal} required competencies
                </div>
              </div>

              {/* Factor 2: Academic Baseline */}
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: '#101B36' }}>
                    Academic Baseline ({MATCHING_WEIGHTS.eligibilityAcademics * 100}% weight)
                  </span>
                  <strong style={{ color: '#2563EB' }}>{candidate.academicMatch?.score}%</strong>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${candidate.academicMatch?.score || 0}%`, backgroundColor: '#2563EB' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  CGPA {student.cgpa} (Baseline: {job?.eligibility?.minCGPA || 7.5}) • Backlogs: {student.backlogs || 0}
                </div>
              </div>

              {/* Factor 3: Projects */}
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: '#101B36' }}>
                    Project Relevance ({MATCHING_WEIGHTS.projectRelevance * 100}% weight)
                  </span>
                  <strong style={{ color: '#0E8EA8' }}>{candidate.projectRelevance?.score}%</strong>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${candidate.projectRelevance?.score || 0}%`, backgroundColor: '#0E8EA8' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  {candidate.projectRelevance?.count || 0} capstone software project(s) analyzed
                </div>
              </div>

              {/* Factor 4: Resume Relevance */}
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: '#101B36' }}>
                    Resume Intelligence ({MATCHING_WEIGHTS.resumeRelevance * 100}% weight)
                  </span>
                  <strong style={{ color: '#8B5CF6' }}>{candidate.resumeRelevance?.score}%</strong>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${candidate.resumeRelevance?.score || 0}%`, backgroundColor: '#8B5CF6' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  Layer 5 ATS Score: {candidate.resumeRelevance?.atsQualityScore}/100 • File: {candidate.resumeRelevance?.fileName}
                </div>
              </div>

              {/* Factor 5 & 6: Experience & Certifications */}
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: '#101B36' }}>
                    Experience & Certifications (15% weight)
                  </span>
                  <strong style={{ color: '#F59E0B' }}>
                    {Math.round(((candidate.experienceMatch?.score || 70) + (candidate.certificationMatch?.score || 70)) / 2)}%
                  </strong>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  {candidate.experienceMatch?.summary} • {candidate.certificationMatch?.totalCerts || 0} Verified Cert(s)
                </div>
              </div>
            </div>
          </div>

          {/* 3. Why This Candidate Was Surfaced */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginBottom: '10px' }}>
              Why This Candidate Was Surfaced
            </h3>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(candidate.preliminaryReasons || []).map((reason, ri) => (
                  <li key={ri} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#166534' }}>
                    <CheckCircle2 size={15} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. Horizontal Skill Coverage Matrix */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginBottom: '12px' }}>
              Job Skill Requirement vs Candidate Level
            </h3>
            <SkillCoverageMatrix skillMatch={candidate.skillMatch} />
          </div>

          {/* 5. Relevant Projects */}
          {candidate.projectRelevance?.relevantProjects?.length > 0 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginBottom: '12px' }}>
                Relevant Student Projects
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {candidate.projectRelevance.relevantProjects.slice(0, 2).map((prj, pi) => (
                  <div key={pi} style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>{prj.name}</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                        {prj.relevanceLevel} Relevance
                      </span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#475569', margin: '0 0 8px', lineHeight: 1.45 }}>
                      {prj.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(prj.technologies || []).map((t, ti) => (
                        <span key={ti} style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#475569' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Integration Cross-Links to Layers 3, 4, 5 */}
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFD',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Connected Platform Modules
            </span>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => {
                  onClose();
                  navigate(`/officer/students/${student.id || student.legacyId}`);
                }}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <ExternalLink size={13} />
                <span>Layer 3: 360° Readiness Profile</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate(`/skill-gap`);
                }}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <Layers size={13} />
                <span>Layer 4: AI Skill-Gap Analysis</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate(`/officer/resume-intelligence`);
                }}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <FileText size={13} />
                <span>Layer 5: Resume Intelligence</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer with Layer 8 Link */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            bottom: 0
          }}
        >
          <div style={{ fontSize: '12px', color: '#64748B' }}>
            Layer 7 Preliminary Match Score
          </div>

          <button
            onClick={() => {
              onClose();
              const targetRoute = location.pathname.startsWith('/officer')
                ? `/officer/ai-matching/${job.id}/${candidate.candidateId}`
                : `/recruiter/jobs/${job.id}/matching/${candidate.candidateId}`;
              navigate(targetRoute);
            }}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(57, 120, 246, 0.3)'
            }}
          >
            <span>View Detailed Fit Analysis →</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
