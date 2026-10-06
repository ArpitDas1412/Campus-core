// CampusLink — Layer 7: AI-Powered Candidate Matching Engine
// Transparent, modular rule-based matching engine with configurable weights

import { MATCHING_WEIGHTS, RECOMMENDATION_TIERS } from '../data/matchingConfig.js';
import { normalizeSkill, extractStudentNormalizedSkills, areSkillsMatching } from '../utils/skillNormalizer.js';
import { compareSkillProficiency } from '../utils/proficiencyUtils.js';

/**
 * 1. Hard Eligibility Filter
 * Evaluates absolute criteria: Min CGPA, Departments, Graduation Year, Max Backlogs, Degree
 */
export function checkEligibility(student, job) {
  const reasons = [];
  const elig = job?.eligibility || {};

  // CGPA check
  const minCGPA = elig.minCGPA ?? 7.0;
  const studentCGPA = parseFloat(student.cgpa || 0);
  if (studentCGPA < minCGPA) {
    reasons.push(`CGPA ${studentCGPA.toFixed(1)} is below required minimum of ${minCGPA.toFixed(1)}`);
  }

  // Active Backlogs check
  const maxBacklogs = elig.maxBacklogs ?? 0;
  const studentBacklogs = parseInt(student.backlogs || 0, 10);
  if (studentBacklogs > maxBacklogs) {
    reasons.push(`${studentBacklogs} active backlog${studentBacklogs > 1 ? 's' : ''} (maximum permitted: ${maxBacklogs})`);
  }

  // Department check
  if (Array.isArray(elig.departments) && elig.departments.length > 0) {
    const studentDept = (student.deptCode || student.department || '').toUpperCase();
    const isDeptAllowed = elig.departments.some((d) => {
      const allowed = d.toUpperCase();
      return (
        studentDept.includes(allowed) ||
        allowed.includes(studentDept) ||
        (student.departmentFullName && student.departmentFullName.toUpperCase().includes(allowed))
      );
    });
    if (!isDeptAllowed) {
      reasons.push(
        `Department "${student.department || student.deptCode}" is not included in eligible branches: [${elig.departments.join(', ')}]`
      );
    }
  }

  // Graduation Year check
  if (elig.graduationYear) {
    const gradYear = parseInt(student.graduationYear || 0, 10);
    if (gradYear !== parseInt(elig.graduationYear, 10)) {
      reasons.push(`Graduation year (${gradYear}) does not match target batch (${elig.graduationYear})`);
    }
  }

  // Degree check
  if (Array.isArray(elig.degree) && elig.degree.length > 0) {
    const studentDegree = (student.degree || 'B.Tech').toUpperCase();
    const isDegreeAllowed = elig.degree.some((deg) => studentDegree.includes(deg.toUpperCase()));
    if (!isDegreeAllowed) {
      reasons.push(`Degree "${student.degree}" not in eligible degree list: [${elig.degree.join(', ')}]`);
    }
  }

  return {
    eligible: reasons.length === 0,
    reasons
  };
}

/**
 * 2. Required & Preferred Skill Matching
 */
export function calculateSkillMatch(student, job) {
  const candidateSkills = extractStudentNormalizedSkills(student);
  const requiredSkills = job.requiredSkills || [];
  const preferredSkills = job.preferredSkills || [];

  const matchedSkills = [];
  const partialSkills = [];
  const missingSkills = [];
  const details = [];

  let requiredScoreSum = 0;
  let totalRequiredWeight = 0;

  // Evaluate required skills
  requiredSkills.forEach((req) => {
    const reqName = typeof req === 'string' ? req : req.name;
    const reqLevel = typeof req === 'object' && req.level ? req.level : 'Intermediate';
    const importance = typeof req === 'object' && req.importance ? req.importance : 'Medium';
    const weightMultiplier = importance === 'High' ? 1.25 : importance === 'Critical' ? 1.5 : 1.0;

    totalRequiredWeight += weightMultiplier;

    // Find candidate's matching skill
    const found = candidateSkills.find((cs) => areSkillsMatching(cs.canonical, reqName));

    if (found) {
      const comp = compareSkillProficiency(found.proficiency, reqLevel);
      const earned = comp.score * weightMultiplier;
      requiredScoreSum += earned;

      if (comp.type === 'strong') {
        matchedSkills.push(reqName);
      } else {
        partialSkills.push(reqName);
      }

      details.push({
        name: reqName,
        requiredLevel: reqLevel,
        candidateLevel: found.proficiency || 'Intermediate',
        status: comp.status,
        type: comp.type,
        color: comp.color,
        isRequired: true
      });
    } else {
      missingSkills.push(reqName);
      details.push({
        name: reqName,
        requiredLevel: reqLevel,
        candidateLevel: 'None',
        status: 'Missing',
        type: 'missing',
        color: '#EF4444',
        isRequired: true
      });
    }
  });

  const baseRequiredPct = totalRequiredWeight > 0 ? (requiredScoreSum / totalRequiredWeight) * 100 : 85;

  // Preferred skills bonus
  let preferredMatchedCount = 0;
  const preferredDetails = [];

  preferredSkills.forEach((pref) => {
    const prefName = typeof pref === 'string' ? pref : pref.name || pref;
    const found = candidateSkills.find((cs) => areSkillsMatching(cs.canonical, prefName));
    if (found) {
      preferredMatchedCount++;
      preferredDetails.push({
        name: prefName,
        candidateLevel: found.proficiency || 'Intermediate',
        status: 'Matched',
        type: 'preferred_match',
        color: '#2563EB'
      });
    } else {
      preferredDetails.push({
        name: prefName,
        candidateLevel: 'None',
        status: 'Not Acquired',
        type: 'preferred_missing',
        color: '#94A3B8'
      });
    }
  });

  const preferredBonus =
    preferredSkills.length > 0 ? (preferredMatchedCount / preferredSkills.length) * 10 : 5;

  const totalSkillScore = Math.min(100, Math.round(baseRequiredPct * 0.9 + preferredBonus));

  return {
    score: totalSkillScore,
    requiredMatched: matchedSkills.length + partialSkills.length,
    requiredTotal: requiredSkills.length,
    preferredMatched: preferredMatchedCount,
    preferredTotal: preferredSkills.length,
    matchedSkills,
    partialSkills,
    missingSkills,
    details: [...details, ...preferredDetails]
  };
}

/**
 * 3. Academic & Eligibility Scoring
 */
export function calculateAcademicMatch(student, job) {
  const minCGPA = job.eligibility?.minCGPA || 7.5;
  const studentCGPA = parseFloat(student.cgpa || 7.0);

  // Scale: at minCGPA = 75%, at 9.5+ = 100%
  let score = 75 + Math.min(25, ((studentCGPA - minCGPA) / (10 - minCGPA)) * 25);
  if (student.backlogs === 0) score += 5;
  if ((student.attendance || 85) >= 90) score += 3;

  return {
    score: Math.min(100, Math.max(50, Math.round(score))),
    cgpa: studentCGPA,
    backlogs: student.backlogs || 0
  };
}

/**
 * 4. Project Relevance Analysis
 */
export function calculateProjectRelevance(student, job) {
  const projects = student.projects || [];
  if (projects.length === 0) {
    return { score: 55, relevantProjects: [], count: 0 };
  }

  const jobReqNames = (job.requiredSkills || []).map((r) => normalizeSkill(r.name || r));
  const jobPrefNames = (job.preferredSkills || []).map((p) => normalizeSkill(p.name || p));
  const jobKeywords = [...jobReqNames, ...jobPrefNames, 'api', 'cloud', 'system', 'app', 'ai', 'data'];

  const scoredProjects = projects.map((prj) => {
    let matches = 0;
    const prjTech = (prj.technologies || []).map((t) => normalizeSkill(t));
    const prjDesc = (prj.description || '').toLowerCase();

    prjTech.forEach((tech) => {
      if (jobKeywords.includes(tech)) matches += 2;
    });

    jobKeywords.forEach((kw) => {
      if (prjDesc.includes(kw)) matches += 1;
    });

    const relevanceLevel = matches >= 4 ? 'High' : matches >= 2 ? 'Medium' : 'Baseline';
    return {
      ...prj,
      matches,
      relevanceLevel
    };
  });

  scoredProjects.sort((a, b) => b.matches - a.matches);

  const bestMatches = scoredProjects.slice(0, 2).reduce((sum, p) => sum + p.matches, 0);
  const calculatedScore = Math.min(100, Math.max(60, 65 + bestMatches * 6));

  return {
    score: calculatedScore,
    relevantProjects: scoredProjects,
    count: projects.length
  };
}

/**
 * 5. Resume Relevance Signals (Connecting Layer 5)
 */
export function calculateResumeRelevance(student, job) {
  const resume = student.resume || {};
  let baseScore = resume.score ? resume.score : 80;

  const jobSkills = (job.requiredSkills || []).map((r) => (r.name || r).toLowerCase());
  const studentSkills = (student.skills || []).map((s) => (s.name || s).toLowerCase());

  const matchedKeywords = jobSkills.filter((js) =>
    studentSkills.some((ss) => ss.includes(js) || js.includes(ss))
  );
  const missingKeywords = jobSkills.filter(
    (js) => !studentSkills.some((ss) => ss.includes(js) || js.includes(ss))
  );

  const keywordRatio = jobSkills.length > 0 ? matchedKeywords.length / jobSkills.length : 0.8;
  const finalResumeScore = Math.min(100, Math.round(baseScore * 0.5 + keywordRatio * 50));

  return {
    score: finalResumeScore,
    matchedKeywords,
    missingKeywords,
    atsQualityScore: resume.score || 82,
    fileName: resume.fileName || 'Resume_Profile.pdf'
  };
}

/**
 * 6. Experience & Internship Signals
 */
export function calculateExperienceMatch(student, job) {
  const certs = student.certifications || [];
  const resumeExp = student.resume?.experience || '';

  const hasInternship =
    resumeExp.toLowerCase().includes('intern') ||
    (student.internships && student.internships.length > 0);

  if (hasInternship) {
    return {
      score: 90,
      summary: resumeExp || '1 Industry Internship (6 months)',
      level: 'Strong'
    };
  }

  // Academic / Capstone project fallback
  return {
    score: 72,
    summary: 'Academic & Capstone Project Experience',
    level: 'Moderate'
  };
}

/**
 * 7. Certification Relevance Signals
 */
export function calculateCertificationMatch(student, job) {
  const certs = student.certifications || [];
  if (certs.length === 0) {
    return { score: 65, relevantCerts: [], count: 0 };
  }

  const jobSkills = [
    ...(job.requiredSkills || []).map((r) => (r.name || r).toLowerCase()),
    ...(job.preferredSkills || []).map((p) => (p.name || p).toLowerCase())
  ];

  const relevant = certs.filter((cert) => {
    const certName = (cert.name || '').toLowerCase();
    return jobSkills.some((s) => certName.includes(s) || s.includes(certName)) || certName.includes('cloud') || certName.includes('data');
  });

  const score = Math.min(100, 70 + relevant.length * 12);
  return {
    score,
    relevantCerts: relevant,
    totalCerts: certs.length
  };
}

/**
 * 8. Composite Preliminary Match Score Calculation
 */
export function calculateMatchScore(student, job) {
  const eligibility = checkEligibility(student, job);
  const skillMatch = calculateSkillMatch(student, job);
  const academicMatch = calculateAcademicMatch(student, job);
  const projectRelevance = calculateProjectRelevance(student, job);
  const resumeRelevance = calculateResumeRelevance(student, job);
  const experienceMatch = calculateExperienceMatch(student, job);
  const certificationMatch = calculateCertificationMatch(student, job);

  // Weighted formula based on MATCHING_WEIGHTS
  const compositeScore = Math.round(
    skillMatch.score * MATCHING_WEIGHTS.requiredSkills +
    academicMatch.score * MATCHING_WEIGHTS.eligibilityAcademics +
    projectRelevance.score * MATCHING_WEIGHTS.projectRelevance +
    resumeRelevance.score * MATCHING_WEIGHTS.resumeRelevance +
    experienceMatch.score * MATCHING_WEIGHTS.experience +
    certificationMatch.score * MATCHING_WEIGHTS.certifications
  );

  const finalScore = Math.min(99, Math.max(45, compositeScore));
  const recommendationTier = getRecommendationTier(finalScore);

  // Generate concise preliminary match reasons
  const preliminaryReasons = [];
  if (skillMatch.requiredMatched >= skillMatch.requiredTotal) {
    preliminaryReasons.push('Strong coverage across all required technical skills');
  } else if (skillMatch.requiredMatched > 0) {
    preliminaryReasons.push(`Covers ${skillMatch.requiredMatched} of ${skillMatch.requiredTotal} required core skills`);
  }

  if (eligibility.eligible) {
    preliminaryReasons.push(`Satisfies academic eligibility baseline with ${student.cgpa} CGPA`);
  }

  if (projectRelevance.score >= 80) {
    preliminaryReasons.push('Demonstrates relevant software development capstone projects');
  }

  if (resumeRelevance.score >= 85) {
    preliminaryReasons.push('Resume exhibits close alignment with job keywords & ATS criteria');
  }

  if (experienceMatch.score >= 85) {
    preliminaryReasons.push('Prior verifiable internship experience detected');
  }

  return {
    candidateId: student.id,
    jobId: job.id,
    student,
    eligible: eligibility.eligible,
    eligibilityReasons: eligibility.reasons,
    matchScore: finalScore,
    recommendationTier,
    skillMatch,
    academicMatch,
    projectRelevance,
    resumeRelevance,
    experienceMatch,
    certificationMatch,
    preliminaryReasons,
    generatedAt: new Date().toISOString()
  };
}

/**
 * 9. Recommendation Tier Mapper
 */
export function getRecommendationTier(score) {
  if (score >= RECOMMENDATION_TIERS.STRONG.minScore) return RECOMMENDATION_TIERS.STRONG;
  if (score >= RECOMMENDATION_TIERS.GOOD.minScore) return RECOMMENDATION_TIERS.GOOD;
  if (score >= RECOMMENDATION_TIERS.POTENTIAL.minScore) return RECOMMENDATION_TIERS.POTENTIAL;
  if (score >= RECOMMENDATION_TIERS.PARTIAL.minScore) return RECOMMENDATION_TIERS.PARTIAL;
  return RECOMMENDATION_TIERS.LOW;
}

/**
 * 10. Candidate Ranker
 */
export function rankCandidates(students, job) {
  const evaluated = (students || []).map((student) => calculateMatchScore(student, job));

  // Separate eligible from ineligible
  const eligibleCandidates = evaluated
    .filter((c) => c.eligible)
    .sort((a, b) => b.matchScore - a.matchScore)
    .map((cand, idx) => ({
      ...cand,
      rank: idx + 1
    }));

  const ineligibleCandidates = evaluated
    .filter((c) => !c.eligible)
    .sort((a, b) => parseFloat(b.student.cgpa || 0) - parseFloat(a.student.cgpa || 0));

  return {
    eligibleCandidates,
    ineligibleCandidates
  };
}

/**
 * 11. Complete AI Matching Execution Pipeline
 */
export function runCandidateMatching(students, job) {
  const { eligibleCandidates, ineligibleCandidates } = rankCandidates(students, job);
  const totalAnalyzed = (students || []).length;

  // Compute distribution brackets
  const distribution = {
    strong: eligibleCandidates.filter((c) => c.matchScore >= 90).length,
    good: eligibleCandidates.filter((c) => c.matchScore >= 80 && c.matchScore < 90).length,
    potential: eligibleCandidates.filter((c) => c.matchScore >= 70 && c.matchScore < 80).length,
    partial: eligibleCandidates.filter((c) => c.matchScore >= 60 && c.matchScore < 70).length,
    low: eligibleCandidates.filter((c) => c.matchScore < 60).length
  };

  // Skill demand vs supply coverage calculation
  const allReqSkills = job.requiredSkills || [];
  const allPrefSkills = job.preferredSkills || [];
  const allSkillsToTrack = [
    ...allReqSkills.map((s) => ({ name: s.name || s, isRequired: true })),
    ...allPrefSkills.map((s) => ({ name: s.name || s, isRequired: false }))
  ];

  const skillDemandVsSupply = allSkillsToTrack.map((item) => {
    const matchingCount = (students || []).filter((stu) => {
      const skills = extractStudentNormalizedSkills(stu);
      return skills.some((s) => areSkillsMatching(s.canonical, item.name));
    }).length;

    const coveragePct = totalAnalyzed > 0 ? Math.round((matchingCount / totalAnalyzed) * 100) : 0;
    return {
      skill: item.name,
      isRequired: item.isRequired,
      demandLevel: item.isRequired ? 'Required (100%)' : 'Preferred',
      candidateCoverage: `${coveragePct}%`,
      coveragePercentage: coveragePct,
      candidateCount: matchingCount
    };
  });

  // Dynamic realistic demo insight
  const topCoveredSkill = [...skillDemandVsSupply].sort((a, b) => b.coveragePercentage - a.coveragePercentage)[0];
  const lowestCoveredSkill = [...skillDemandVsSupply].sort((a, b) => a.coveragePercentage - b.coveragePercentage)[0];

  const aiInsight = {
    title: 'AI MATCHING TALENT INSIGHT',
    badge: 'Demo-Generated Insight',
    text: `Strongest campus competency is observed in ${topCoveredSkill ? topCoveredSkill.skill : 'core programming'} (${topCoveredSkill ? topCoveredSkill.candidateCoverage : '75%'} student pool coverage). Conversely, ${lowestCoveredSkill ? lowestCoveredSkill.skill : 'cloud infrastructure'} represents a narrower talent supply (${lowestCoveredSkill ? lowestCoveredSkill.candidateCoverage : '30%'}). Consider reviewing candidates with high core engineering marks even if auxiliary cloud preferences are partially developed.`,
    matchingProvider: 'demoRuleBasedMatcher (Embeddings/LLM Compatible)'
  };

  return {
    job,
    totalAnalyzed,
    eligibleCount: eligibleCandidates.length,
    ineligibleCount: ineligibleCandidates.length,
    distribution,
    eligibleCandidates,
    ineligibleCandidates,
    topMatches: eligibleCandidates.slice(0, 3),
    skillDemandVsSupply,
    aiInsight,
    matchingProvider: 'demoRuleBasedMatcher',
    generatedAt: new Date().toISOString()
  };
}

export default {
  checkEligibility,
  calculateSkillMatch,
  calculateAcademicMatch,
  calculateProjectRelevance,
  calculateResumeRelevance,
  calculateExperienceMatch,
  calculateCertificationMatch,
  calculateMatchScore,
  getRecommendationTier,
  rankCandidates,
  runCandidateMatching
};
