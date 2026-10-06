// CampusLink — Layer 8: Explainable AI Fit Score Utilities
import { RECOMMENDATION_TIERS } from '../data/matchingConfig';

/**
 * Returns color, background and border styling for a given score (0-100)
 */
export function getScoreVisualMeta(score) {
  const num = Math.round(Number(score) || 0);
  if (num >= 90) {
    return {
      tier: 'Strong Match',
      color: '#059669',
      bgColor: '#ECFDF5',
      borderColor: '#A7F3D0',
      gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
      badgeBg: 'rgba(5, 150, 105, 0.12)',
      badgeText: '#065F46',
      iconColor: '#10B981'
    };
  }
  if (num >= 80) {
    return {
      tier: 'Good Match',
      color: '#2563EB',
      bgColor: '#EFF6FF',
      borderColor: '#BFDBFE',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
      badgeBg: 'rgba(37, 99, 235, 0.12)',
      badgeText: '#1E40AF',
      iconColor: '#3B82F6'
    };
  }
  if (num >= 70) {
    return {
      tier: 'Potential Match',
      color: '#0E8EA8',
      bgColor: '#EBF9FD',
      borderColor: '#BAE6FD',
      gradient: 'linear-gradient(135deg, #0E8EA8 0%, #06B6D4 100%)',
      badgeBg: 'rgba(14, 142, 168, 0.12)',
      badgeText: '#155E75',
      iconColor: '#06B6D4'
    };
  }
  if (num >= 60) {
    return {
      tier: 'Partial Match',
      color: '#D97706',
      bgColor: '#FFFBEB',
      borderColor: '#FDE68A',
      gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
      badgeBg: 'rgba(217, 119, 6, 0.12)',
      badgeText: '#92400E',
      iconColor: '#F59E0B'
    };
  }
  return {
    tier: 'Low Match',
    color: '#64748B',
    bgColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    gradient: 'linear-gradient(135deg, #64748B 0%, #94A3B8 100%)',
    badgeBg: 'rgba(100, 116, 139, 0.12)',
    badgeText: '#334155',
    iconColor: '#94A3B8'
  };
}

/**
 * Format score percentage with 1 decimal or integer
 */
export function formatScore(score, decimals = 0) {
  if (score === null || score === undefined) return '0%';
  const num = Number(score);
  return decimals === 0 ? `${Math.round(num)}%` : `${num.toFixed(decimals)}%`;
}

/**
 * Format contribution points
 */
export function formatContribution(contrib) {
  if (contrib === null || contrib === undefined) return '0.0';
  return Number(contrib).toFixed(1);
}

/**
 * Factor metadata for labels, weights, icons and descriptions
 */
export const FACTOR_DEFINITIONS = {
  requiredSkills: {
    id: 'requiredSkills',
    label: 'Required Skills',
    defaultWeight: 0.40,
    weightPct: '40%',
    color: '#3978F6',
    bgColor: '#EFF6FF',
    description: 'Evaluates required and preferred technical skill proficiency against job requirements.'
  },
  academicEligibility: {
    id: 'academicEligibility',
    label: 'Academic Eligibility',
    defaultWeight: 0.20,
    weightPct: '20%',
    color: '#10B981',
    bgColor: '#ECFDF5',
    description: 'Checks minimum CGPA baseline, backlogs, department suitability, and target graduation batch.'
  },
  projectRelevance: {
    id: 'projectRelevance',
    label: 'Project Relevance',
    defaultWeight: 0.15,
    weightPct: '15%',
    color: '#0E8EA8',
    bgColor: '#EBF9FD',
    description: 'Assesses relevance of candidate capstone and personal software development projects.'
  },
  resumeRelevance: {
    id: 'resumeRelevance',
    label: 'Resume Relevance',
    defaultWeight: 0.10,
    weightPct: '10%',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    description: 'Scans resume content for semantic keyword density and ATS structure quality.'
  },
  experience: {
    id: 'experience',
    label: 'Experience & Internships',
    defaultWeight: 0.10,
    weightPct: '10%',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    description: 'Identifies verifiable industry internships and production-grade project experience.'
  },
  certifications: {
    id: 'certifications',
    label: 'Certifications',
    defaultWeight: 0.05,
    weightPct: '5%',
    color: '#EC4899',
    bgColor: '#FDF2F8',
    description: 'Measures alignment of verified industry certifications with the target engineering role.'
  }
};

/**
 * Download Fit Analysis Report as a formatted text / JSON / CSV summary
 */
export function exportFitReport(fitExplanation) {
  if (!fitExplanation) return;
  const candidate = fitExplanation.student || {};
  const job = fitExplanation.job || {};

  const lines = [
    `================================================================`,
    `CAMPUSCORE EXPLAINABLE AI FIT SCORE REPORT`,
    `Generated on: ${new Date().toLocaleString()}`,
    `================================================================`,
    ``,
    `JOB DETAILS:`,
    `Title: ${job.title || 'Software Engineer'}`,
    `Company: ${job.companyName || 'TechNova Solutions'}`,
    `Target Batch: ${job.eligibility?.graduationYear || 2027}`,
    `Min CGPA: ${job.eligibility?.minCGPA || 7.5}`,
    ``,
    `CANDIDATE DETAILS:`,
    `Name: ${candidate.name || 'Student'}`,
    `ID: ${candidate.id || fitExplanation.candidateId}`,
    `Degree & Dept: ${candidate.degree || 'B.Tech'} ${candidate.deptCode || candidate.department || 'CSE'}`,
    `CGPA: ${candidate.cgpa}`,
    ``,
    `OVERALL FIT EVALUATION:`,
    `Calculated Fit Score: ${fitExplanation.overallScore}%`,
    `Recommendation Tier: ${fitExplanation.recommendationTier}`,
    `Profile Evidence Coverage: ${fitExplanation.evidenceCoverage}%`,
    ``,
    `WEIGHTED FACTOR BREAKDOWN (Demo Scoring Configuration):`,
    `----------------------------------------------------------------`,
    `Factor                  Score     Weight     Contribution`,
    `----------------------------------------------------------------`,
    `Required Skills          ${String(fitExplanation.factors.requiredSkills.score).padStart(3)}%      40%         ${formatContribution(fitExplanation.factors.requiredSkills.contribution).padStart(5)}`,
    `Academic Eligibility    ${String(fitExplanation.factors.academicEligibility.score).padStart(3)}%      20%         ${formatContribution(fitExplanation.factors.academicEligibility.contribution).padStart(5)}`,
    `Project Relevance        ${String(fitExplanation.factors.projectRelevance.score).padStart(3)}%      15%         ${formatContribution(fitExplanation.factors.projectRelevance.contribution).padStart(5)}`,
    `Resume Relevance         ${String(fitExplanation.factors.resumeRelevance.score).padStart(3)}%      10%         ${formatContribution(fitExplanation.factors.resumeRelevance.contribution).padStart(5)}`,
    `Experience               ${String(fitExplanation.factors.experience.score).padStart(3)}%      10%         ${formatContribution(fitExplanation.factors.experience.contribution).padStart(5)}`,
    `Certifications           ${String(fitExplanation.factors.certifications.score).padStart(3)}%       5%         ${formatContribution(fitExplanation.factors.certifications.contribution).padStart(5)}`,
    `----------------------------------------------------------------`,
    `Final Calculated Fit:    ${fitExplanation.overallScore}%`,
    ``,
    `POSITIVE SIGNALS (Why candidate stands out):`,
    ...(fitExplanation.positiveSignals || []).map((s) => `  ✓ ${s}`),
    ``,
    `WEAK SIGNALS / GAPS TO ADDRESS:`,
    ...(fitExplanation.weakSignals || []).map((w) => `  △ ${w}`),
    ``,
    `PERSONALIZED RECOMMENDATIONS:`,
    ...(fitExplanation.recommendations || []).map((r, i) => `  ${i + 1}. ${r}`),
    ``,
    `RESPONSIBLE AI STATEMENT:`,
    `CampusCore uses job-relevant academic, skill, experience, project and resume signals for this demo analysis. The fit score is intended to support recruiter decision-making and should not be treated as an automatic hiring decision. Sensitive personal attributes are strictly excluded.`,
    `================================================================`
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `CampusCore_Fit_Analysis_${(candidate.name || 'Candidate').replace(/\s+/g, '_')}_${job.title?.replace(/\s+/g, '_')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
