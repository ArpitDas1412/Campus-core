// CampusLink — Layer 7: Skill Normalizer Utility
import { getCanonicalSkillName } from '../data/skillAliases.js';

export function normalizeSkill(skill) {
  if (!skill) return '';
  if (typeof skill === 'object' && skill.name) {
    return getCanonicalSkillName(skill.name);
  }
  return getCanonicalSkillName(String(skill));
}

export function areSkillsMatching(skillA, skillB) {
  const normA = normalizeSkill(skillA);
  const normB = normalizeSkill(skillB);
  if (!normA || !normB) return false;
  return normA === normB || normA.includes(normB) || normB.includes(normA);
}

// Extracts flat list of normalized skills from student object across skills array and technicalSkills categories
export function extractStudentNormalizedSkills(student) {
  if (!student) return [];
  const skillSet = new Map();

  // 1. Array of string skills
  if (Array.isArray(student.skills)) {
    student.skills.forEach((s) => {
      const canonical = normalizeSkill(s);
      if (canonical) {
        skillSet.set(canonical, {
          rawName: typeof s === 'string' ? s : s.name,
          proficiency: typeof s === 'object' && s.proficiency ? s.proficiency : 'Intermediate'
        });
      }
    });
  }

  // 2. Nested technicalSkills dictionary
  if (student.technicalSkills && typeof student.technicalSkills === 'object') {
    Object.values(student.technicalSkills).forEach((category) => {
      if (Array.isArray(category)) {
        category.forEach((item) => {
          const canonical = normalizeSkill(item.name || item);
          if (canonical) {
            const current = skillSet.get(canonical);
            const prof = item.proficiency || (current ? current.proficiency : 'Intermediate');
            skillSet.set(canonical, {
              rawName: item.name || item,
              proficiency: prof
            });
          }
        });
      }
    });
  }

  return Array.from(skillSet.entries()).map(([canonical, data]) => ({
    canonical,
    name: data.rawName,
    proficiency: data.proficiency
  }));
}
