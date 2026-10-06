// CampusLink — Layer 7: Proficiency Comparison Utility
import { PROFICIENCY_LEVELS } from '../data/matchingConfig.js';

export function getProficiencyWeight(level) {
  if (!level) return PROFICIENCY_LEVELS.Intermediate;
  const capitalized = String(level).charAt(0).toUpperCase() + String(level).slice(1).toLowerCase();
  return PROFICIENCY_LEVELS[capitalized] || PROFICIENCY_LEVELS.Intermediate;
}

export function compareSkillProficiency(candidateLevel, requiredLevel) {
  const candWeight = getProficiencyWeight(candidateLevel);
  const reqWeight = getProficiencyWeight(requiredLevel);

  if (candWeight >= reqWeight) {
    return {
      status: 'Strong Match',
      type: 'strong',
      score: 1.0,
      badgeText: '✓ Strong Match',
      color: '#059669'
    };
  } else if (candWeight === reqWeight - 1) {
    return {
      status: 'Partial Match',
      type: 'partial',
      score: 0.7,
      badgeText: '◐ Partial Match',
      color: '#D97706'
    };
  } else {
    return {
      status: 'Below Baseline',
      type: 'low',
      score: 0.4,
      badgeText: '▽ Developing',
      color: '#EF4444'
    };
  }
}
