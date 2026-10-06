// CampusLink — Layer 9: AI-Powered Smart Shortlisting Configuration & Constants
// Configurable demo rule system for recruiter decision-support

export const DEFAULT_SHORTLISTING_CONFIG = {
  openings: 25,
  candidateToOpeningRatio: 5, // 5x => 125 target candidates
  minimumFitScore: 75,
  minimumRequiredSkillCoverage: 70, // 70%

  considerProjectRelevance: true,
  considerResumeRelevance: true,
  considerExperience: true,
  considerCertifications: true,

  requireEligibility: true
};

export const RATIO_OPTIONS = [
  { value: 3, label: '3× Openings' },
  { value: 4, label: '4× Openings' },
  { value: 5, label: '5× Openings (Recommended)' },
  { value: 6, label: '6× Openings' },
  { value: 'custom', label: 'Custom Target' }
];

export const AI_RECOMMENDATION_STATUS = {
  RECOMMENDED: 'Recommended',
  NEEDS_REVIEW: 'Needs Review',
  NOT_RECOMMENDED: 'Not Recommended',
  INELIGIBLE: 'Ineligible'
};

export const RECRUITER_DECISION_STATUS = {
  PENDING: 'Pending',
  SHORTLISTED: 'Shortlisted',
  NEEDS_REVIEW: 'Needs Review',
  REJECTED: 'Rejected',
  ON_HOLD: 'On Hold'
};

export const OVERRIDE_REASONS = [
  'Strong project portfolio',
  'Relevant external experience',
  'Exceptional technical assessment',
  'Exceptional open-source portfolio',
  'Additional candidate evidence',
  'Communication & interpersonal strength',
  'Academic excellence in specialized domain',
  'Other'
];

export const STATUS_STYLES = {
  // AI Recommendation Statuses
  [AI_RECOMMENDATION_STATUS.RECOMMENDED]: {
    bg: '#ECFDF5',
    color: '#059669',
    border: '#A7F3D0',
    icon: 'CheckCircle2',
    label: 'AI Recommended'
  },
  [AI_RECOMMENDATION_STATUS.NEEDS_REVIEW]: {
    bg: '#FFFBEB',
    color: '#D97706',
    border: '#FDE68A',
    icon: 'AlertCircle',
    label: 'Needs Review'
  },
  [AI_RECOMMENDATION_STATUS.NOT_RECOMMENDED]: {
    bg: '#F8FAFC',
    color: '#64748B',
    border: '#E2E8F0',
    icon: 'XCircle',
    label: 'Not Recommended'
  },
  [AI_RECOMMENDATION_STATUS.INELIGIBLE]: {
    bg: '#FEF2F2',
    color: '#DC2626',
    border: '#FECACA',
    icon: 'ShieldAlert',
    label: 'Ineligible'
  },

  // Recruiter Decision Statuses
  [RECRUITER_DECISION_STATUS.PENDING]: {
    bg: '#F1F5F9',
    color: '#475569',
    border: '#CBD5E1',
    label: 'Pending'
  },
  [RECRUITER_DECISION_STATUS.SHORTLISTED]: {
    bg: '#ECFDF5',
    color: '#059669',
    border: '#10B981',
    label: 'Shortlisted'
  },
  [RECRUITER_DECISION_STATUS.NEEDS_REVIEW]: {
    bg: '#FFFBEB',
    color: '#D97706',
    border: '#F59E0B',
    label: 'Marked for Review'
  },
  [RECRUITER_DECISION_STATUS.REJECTED]: {
    bg: '#FEF2F2',
    color: '#DC2626',
    border: '#EF4444',
    label: 'Rejected'
  },
  [RECRUITER_DECISION_STATUS.ON_HOLD]: {
    bg: '#F5F3FF',
    color: '#7C3AED',
    border: '#C4B5FD',
    label: 'On Hold'
  }
};

export const PROCESSING_STEPS = [
  'Loading placement drive parameters...',
  'Checking hard academic eligibility requirements...',
  'Reading Layer 7 AI candidate match scores...',
  'Reviewing Layer 8 explainable fit breakdowns...',
  'Applying configurable shortlisting criteria...',
  'Categorizing strong matching candidates...',
  'Flagging edge-case profiles for human review...',
  'Finalizing recommended shortlist pool...'
];

export default {
  DEFAULT_SHORTLISTING_CONFIG,
  RATIO_OPTIONS,
  AI_RECOMMENDATION_STATUS,
  RECRUITER_DECISION_STATUS,
  OVERRIDE_REASONS,
  STATUS_STYLES,
  PROCESSING_STEPS
};
