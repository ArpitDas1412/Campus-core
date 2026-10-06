// CampusLink — Layer 7: AI Matching Engine Configuration
// Configurable demo weights and recommendation thresholds

export const MATCHING_WEIGHTS = {
  requiredSkills: 0.40,
  eligibilityAcademics: 0.20,
  projectRelevance: 0.15,
  resumeRelevance: 0.10,
  experience: 0.10,
  certifications: 0.05
};

export const RECOMMENDATION_TIERS = {
  STRONG: {
    label: 'Strong Match',
    minScore: 90,
    maxScore: 100,
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    description: 'High alignment with required technical skills, academic baseline, and relevant software projects.'
  },
  GOOD: {
    label: 'Good Match',
    minScore: 80,
    maxScore: 89,
    color: '#2563EB',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    description: 'Meets primary requirements with solid fundamentals and notable project or resume relevance.'
  },
  POTENTIAL: {
    label: 'Potential Match',
    minScore: 70,
    maxScore: 79,
    color: '#0E8EA8',
    bgColor: '#EBF9FD',
    borderColor: '#BAE6FD',
    description: 'Meets academic criteria and core technical skills; minor gaps in preferred tools or frameworks.'
  },
  PARTIAL: {
    label: 'Partial Match',
    minScore: 60,
    maxScore: 69,
    color: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    description: 'Satisfies eligibility baseline, but demonstrates moderate technical or project coverage gaps.'
  },
  LOW: {
    label: 'Low Match',
    minScore: 0,
    maxScore: 59,
    color: '#64748B',
    bgColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    description: 'Significant misalignment with current job technical stack or requirements.'
  }
};

export const PROFICIENCY_LEVELS = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4
};
