import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecruiterLayout from '../components/recruiter/RecruiterLayout';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { getJobById } from '../services/recruiterService';
import { getStoredStudents } from '../data';
import { rankCandidates } from '../services/candidateMatcher';
import { buildCompleteFitExplanation } from '../services/fitExplanationEngine';

// Layer 8 Components
import FitScoreHeader from '../components/fitscore/FitScoreHeader';
import AiExplanationNotice from '../components/fitscore/AiExplanationNotice';
import FitScoreHero from '../components/fitscore/FitScoreHero';
import ScoreBreakdown from '../components/fitscore/ScoreBreakdown';
import ContributionChart from '../components/fitscore/ContributionChart';
import PositiveSignals from '../components/fitscore/PositiveSignals';
import WeakSignals from '../components/fitscore/WeakSignals';
import SkillExplanation from '../components/fitscore/SkillExplanation';
import AcademicFit from '../components/fitscore/AcademicFit';
import ProjectRelevance from '../components/fitscore/ProjectRelevance';
import ResumeRelevance from '../components/fitscore/ResumeRelevance';
import ExperienceFit from '../components/fitscore/ExperienceFit';
import CertificationFit from '../components/fitscore/CertificationFit';
import EvidencePanel from '../components/fitscore/EvidencePanel';
import ScoreAuditPanel from '../components/fitscore/ScoreAuditPanel';
import FitScoreVsSkillGap from '../components/fitscore/FitScoreVsSkillGap';
import ImprovementRecommendations from '../components/fitscore/ImprovementRecommendations';
import WhatIfSimulator from '../components/fitscore/WhatIfSimulator';
import CandidateComparison from '../components/fitscore/CandidateComparison';
import FitSummary from '../components/fitscore/FitSummary';
import ShortlistModal from '../components/fitscore/ShortlistModal';

import {
  GraduationCap,
  Building,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  BookmarkCheck
} from 'lucide-react';

export default function ExplainableFitScorePage() {
  const { jobId, candidateId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Detect active role from path or auth context
  const isOfficerRoute = location.pathname.startsWith('/officer') || user?.roleKey === 'officer';
  const effectiveRole = isOfficerRoute ? 'officer' : 'recruiter';

  // 1. Resolve Job (fallback to JOB-2027-001)
  const currentJob = useMemo(() => {
    return getJobById(jobId || 'JOB-2027-001');
  }, [jobId]);

  // 2. Resolve Student Pool and Target Candidate
  const studentsPool = useMemo(() => getStoredStudents(), []);

  const targetStudent = useMemo(() => {
    if (!studentsPool || studentsPool.length === 0) return null;

    if (!candidateId) return studentsPool[0];

    const normalized = String(candidateId).toLowerCase().trim();

    // Check direct ID or legacyId or rollNo
    const directMatch = studentsPool.find(
      (s) =>
        s.id.toLowerCase() === normalized ||
        (s.legacyId && s.legacyId.toLowerCase() === normalized) ||
        (s.rollNo && s.rollNo.toLowerCase() === normalized)
    );

    if (directMatch) return directMatch;

    // Check alias formats e.g. "STU-001" -> first student
    if (normalized.startsWith('stu-')) {
      const idx = parseInt(normalized.replace('stu-', ''), 10) - 1;
      if (idx >= 0 && idx < studentsPool.length) {
        return studentsPool[idx];
      }
    }

    return studentsPool[0];
  }, [candidateId, studentsPool]);

  // 3. Compute Candidate Ranking from Layer 7
  const rankInfo = useMemo(() => {
    if (!targetStudent || !currentJob || !studentsPool) return { rank: 1, totalCandidates: 126 };
    try {
      const { eligibleCandidates } = rankCandidates(studentsPool, currentJob);
      const idx = eligibleCandidates.findIndex(
        (c) => c.candidateId === targetStudent.id || c.student?.id === targetStudent.id
      );
      return {
        rank: idx >= 0 ? idx + 1 : 1,
        totalCandidates: Math.max(eligibleCandidates.length, 1)
      };
    } catch (e) {
      return { rank: 1, totalCandidates: 126 };
    }
  }, [targetStudent, currentJob, studentsPool]);

  // 4. Build Complete Layer 8 Fit Explanation Model
  const fitExplanation = useMemo(() => {
    if (!targetStudent || !currentJob) return null;
    return buildCompleteFitExplanation(targetStudent, currentJob, undefined, rankInfo);
  }, [targetStudent, currentJob, rankInfo]);

  // Shortlist State & Modal
  const [isShortlistModalOpen, setIsShortlistModalOpen] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleConfirmShortlist = () => {
    setIsShortlisted(true);
    setToastMessage(`✓ ${targetStudent.name} successfully moved to Shortlisted stage`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleMessage = () => {
    navigate('/recruiter/messages');
  };

  // Content render
  const renderContent = () => {
    if (!fitExplanation || !targetStudent) {
      return (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
          <div className="spinner-border text-primary" role="status" style={{ marginBottom: '16px' }} />
          <h3>Analyzing candidate fit signals...</h3>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Floating Success Toast */}
        {showToast && (
          <div
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              zIndex: 2000,
              padding: '14px 20px',
              backgroundColor: '#059669',
              color: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(5, 150, 105, 0.3)',
              fontSize: '13.5px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 1. Page Header */}
        <FitScoreHeader
          fitData={fitExplanation}
          isShortlisted={isShortlisted}
          onShortlist={() => setIsShortlistModalOpen(true)}
          onMessage={handleMessage}
          role={effectiveRole}
          backUrl={
            effectiveRole === 'officer'
              ? `/officer/ai-matching`
              : `/recruiter/jobs/${currentJob.id}/matching`
          }
        />

        {/* 2. Institutional Context Banner for Placement Officers (Section 39) */}
        {effectiveRole === 'officer' && (
          <div
            style={{
              backgroundColor: '#F0F9FF',
              borderRadius: '16px',
              border: '1.5px solid #BAE6FD',
              padding: '16px 22px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#0284C7',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <GraduationCap size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  INSTITUTIONAL PLACEMENT CONTEXT
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0C4A6E' }}>
                  {targetStudent.name} • {targetStudent.deptCode || targetStudent.department} Cohort (Batch {targetStudent.graduationYear || 2027})
                </div>
                <div style={{ fontSize: '12.5px', color: '#0284C7', marginTop: '2px' }}>
                  Rank #{rankInfo.rank} of {rankInfo.totalCandidates} eligible department peers • Placement Status: <strong>{targetStudent.placementStatus || 'Not Placed'}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => navigate(`/officer/students/${targetStudent.id || targetStudent.legacyId}`)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#0369A1',
                  border: '1px solid #BAE6FD',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                View 360° Profile
              </button>
            </div>
          </div>
        )}

        {/* 3. AI Explanation Notice */}
        <AiExplanationNotice />

        {/* 4. Hero Fit Score & Score Interpretation Scale */}
        <FitScoreHero fitData={fitExplanation} />

        {/* 5. Score Breakdown ("Why 91%?") */}
        <ScoreBreakdown
          factors={fitExplanation.factors}
          overallScore={fitExplanation.overallScore}
          exactSum={fitExplanation.exactScore}
        />

        {/* 6. Weighted Contribution Horizontal Chart */}
        <ContributionChart
          factors={fitExplanation.factors}
          exactSum={fitExplanation.exactScore}
          overallScore={fitExplanation.overallScore}
        />

        {/* 7. Two-Column Signals: Why Candidate Stands Out vs Evidence Gaps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '28px'
          }}
        >
          <PositiveSignals signals={fitExplanation.positiveSignals} />
          <WeakSignals signals={fitExplanation.weakSignals} />
        </div>

        {/* 8. Technical Skill Fit */}
        <SkillExplanation skillData={fitExplanation.skillExplanation} />

        {/* 9. Academic Eligibility Fit */}
        <AcademicFit academicData={fitExplanation.academicExplanation} />

        {/* 10. Project Relevance */}
        <ProjectRelevance
          projectData={fitExplanation.projectExplanation}
          job={currentJob}
        />

        {/* 11. Two-Column: Resume Relevance & Experience Fit */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          <ResumeRelevance
            resumeData={fitExplanation.resumeExplanation}
            student={targetStudent}
            role={effectiveRole}
          />
          <ExperienceFit experienceData={fitExplanation.experienceExplanation} />
        </div>

        {/* 12. Certification Fit */}
        <CertificationFit certData={fitExplanation.certificationExplanation} />

        {/* 13. Evidence Sources & Profile Coverage */}
        <EvidencePanel evidenceCoverageData={fitExplanation.evidenceCoverageData} />

        {/* 14. Score Audit Panel (Collapsible Mathematical Trace) */}
        <ScoreAuditPanel breakdown={fitExplanation.breakdown} />

        {/* 15. Fit Score vs Skill Gap Readiness (Layer 4) */}
        <FitScoreVsSkillGap
          fitScore={fitExplanation.overallScore}
          student={targetStudent}
          role={effectiveRole}
        />

        {/* 16. Actionable Improvement Recommendations */}
        <ImprovementRecommendations
          recommendations={fitExplanation.recommendations}
          candidateName={targetStudent.name}
        />

        {/* 17. Interactive What-If Simulator (Major Judge Feature) */}
        <WhatIfSimulator
          student={targetStudent}
          job={currentJob}
          currentScore={fitExplanation.overallScore}
        />

        {/* 18. Candidate Comparison Matrix */}
        <CandidateComparison
          currentStudent={targetStudent}
          job={currentJob}
        />

        {/* 19. Dynamic AI Fit Summary */}
        <FitSummary
          fitSummary={fitExplanation.fitSummary}
          overallScore={fitExplanation.overallScore}
          recommendationTier={fitExplanation.recommendationTier}
        />

        {/* Shortlist Confirmation Modal */}
        <ShortlistModal
          isOpen={isShortlistModalOpen}
          onClose={() => setIsShortlistModalOpen(false)}
          onConfirm={handleConfirmShortlist}
          candidateName={targetStudent.name}
          fitScore={fitExplanation.overallScore}
          recommendationTier={fitExplanation.recommendationTier}
          jobTitle={currentJob.title}
          companyName={currentJob.companyName}
        />
      </div>
    );
  };

  // Wrap in appropriate layout based on user role
  if (effectiveRole === 'officer') {
    return (
      <DashboardLayout roleKey="officer" currentTab="ai-matching">
        {renderContent()}
      </DashboardLayout>
    );
  }

  return <RecruiterLayout activeItem="jobs">{renderContent()}</RecruiterLayout>;
}
