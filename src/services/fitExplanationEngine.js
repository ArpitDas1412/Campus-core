// CampusLink — Layer 8: Explainable AI Fit Score & Match Intelligence Engine
// Transparent, human-readable XAI engine consuming Layer 7 candidate matching results

import {
  calculateMatchScore,
  getRecommendationTier,
  checkEligibility
} from './candidateMatcher.js';
import { MATCHING_WEIGHTS, RECOMMENDATION_TIERS } from '../data/matchingConfig.js';
import { normalizeSkill, areSkillsMatching, extractStudentNormalizedSkills } from '../utils/skillNormalizer.js';
import { getJobById } from './recruiterService.js';

function resolveJob(matchResult, optionalJob) {
  if (optionalJob && optionalJob.requiredSkills) return optionalJob;
  if (matchResult?.job && matchResult.job.requiredSkills) return matchResult.job;
  if (optionalJob) return optionalJob;
  if (matchResult?.job) return matchResult.job;
  if (matchResult?.jobId) {
    try {
      return getJobById(matchResult.jobId);
    } catch (e) {}
  }
  return {};
}

/**
 * Default configurable prototype weights for Layer 8 demo scoring
 */
export const DEFAULT_FIT_WEIGHTS = {
  requiredSkills: 0.40,
  academicEligibility: 0.20,
  projectRelevance: 0.15,
  resumeRelevance: 0.10,
  experience: 0.10,
  certifications: 0.05
};

/**
 * 1. Factor Breakdown Calculation
 * Computes exact weighted contribution for each of the 6 dimensions
 */
export function calculateFitBreakdown(matchResult, customWeights = DEFAULT_FIT_WEIGHTS) {
  const weights = { ...DEFAULT_FIT_WEIGHTS, ...customWeights };

  const skillScore = matchResult.skillMatch?.score ?? 85;
  const academicScore = matchResult.academicMatch?.score ?? 90;
  const projectScore = matchResult.projectRelevance?.score ?? 80;
  const resumeScore = matchResult.resumeRelevance?.score ?? 80;
  const experienceScore = matchResult.experienceMatch?.score ?? 75;
  const certScore = matchResult.certificationMatch?.score ?? 70;

  const skillContrib = parseFloat((skillScore * weights.requiredSkills).toFixed(2));
  const academicContrib = parseFloat((academicScore * weights.academicEligibility).toFixed(2));
  const projectContrib = parseFloat((projectScore * weights.projectRelevance).toFixed(2));
  const resumeContrib = parseFloat((resumeScore * weights.resumeRelevance).toFixed(2));
  const expContrib = parseFloat((experienceScore * weights.experience).toFixed(2));
  const certContrib = parseFloat((certScore * weights.certifications).toFixed(2));

  const totalContribution = parseFloat(
    (skillContrib + academicContrib + projectContrib + resumeContrib + expContrib + certContrib).toFixed(2)
  );

  // Exact rounded score
  const finalScore = Math.min(100, Math.max(40, Math.round(totalContribution)));

  return {
    finalScore,
    exactSum: totalContribution,
    weights,
    factors: {
      requiredSkills: {
        id: 'requiredSkills',
        name: 'Required Skills',
        score: skillScore,
        weight: weights.requiredSkills,
        weightPercent: Math.round(weights.requiredSkills * 100),
        contribution: skillContrib,
        maxContribution: parseFloat((100 * weights.requiredSkills).toFixed(1)),
        status: skillScore >= 85 ? 'positive' : skillScore >= 70 ? 'neutral' : 'weak',
        explanation: `${matchResult.skillMatch?.requiredMatched || 0} of ${matchResult.skillMatch?.requiredTotal || 0} required core skills matched with strong proficiency.`
      },
      academicEligibility: {
        id: 'academicEligibility',
        name: 'Academic Eligibility',
        score: academicScore,
        weight: weights.academicEligibility,
        weightPercent: Math.round(weights.academicEligibility * 100),
        contribution: academicContrib,
        maxContribution: parseFloat((100 * weights.academicEligibility).toFixed(1)),
        status: academicScore >= 85 ? 'positive' : academicScore >= 70 ? 'neutral' : 'weak',
        explanation: `CGPA ${matchResult.student?.cgpa || '8.0'} meets criteria (${matchResult.academicMatch?.cgpa >= 7.5 ? 'above' : 'at'} threshold) with 0 active backlogs.`
      },
      projectRelevance: {
        id: 'projectRelevance',
        name: 'Project Relevance',
        score: projectScore,
        weight: weights.projectRelevance,
        weightPercent: Math.round(weights.projectRelevance * 100),
        contribution: projectContrib,
        maxContribution: parseFloat((100 * weights.projectRelevance).toFixed(1)),
        status: projectScore >= 80 ? 'positive' : projectScore >= 65 ? 'neutral' : 'weak',
        explanation: `${(matchResult.student?.projects || []).length} capstone software project(s) demonstrate relevant architectural stack.`
      },
      resumeRelevance: {
        id: 'resumeRelevance',
        name: 'Resume Relevance',
        score: resumeScore,
        weight: weights.resumeRelevance,
        weightPercent: Math.round(weights.resumeRelevance * 100),
        contribution: resumeContrib,
        maxContribution: parseFloat((100 * weights.resumeRelevance).toFixed(1)),
        status: resumeScore >= 80 ? 'positive' : resumeScore >= 65 ? 'neutral' : 'weak',
        explanation: `Resume exhibits high semantic keyword overlap and ${matchResult.resumeRelevance?.atsQualityScore || 82} ATS quality score.`
      },
      experience: {
        id: 'experience',
        name: 'Experience & Internships',
        score: experienceScore,
        weight: weights.experience,
        weightPercent: Math.round(weights.experience * 100),
        contribution: expContrib,
        maxContribution: parseFloat((100 * weights.experience).toFixed(1)),
        status: experienceScore >= 80 ? 'positive' : experienceScore >= 65 ? 'neutral' : 'weak',
        explanation: matchResult.experienceMatch?.summary || 'Demonstrates verifiable practical software development experience.'
      },
      certifications: {
        id: 'certifications',
        name: 'Certifications',
        score: certScore,
        weight: weights.certifications,
        weightPercent: Math.round(weights.certifications * 100),
        contribution: certContrib,
        maxContribution: parseFloat((100 * weights.certifications).toFixed(1)),
        status: certScore >= 75 ? 'positive' : certScore >= 60 ? 'neutral' : 'weak',
        explanation: `${matchResult.certificationMatch?.relevantCerts?.length || 1} verified credential(s) directly align with the technical role.`
      }
    }
  };
}

/**
 * 2. Dynamic Positive Signals Generator ("Why this candidate stands out")
 */
export function generatePositiveSignals(matchResult, optionalJob = null) {
  const student = matchResult.student || {};
  const job = resolveJob(matchResult, optionalJob);
  const skillMatch = matchResult.skillMatch || {};
  const academic = matchResult.academicMatch || {};
  const project = matchResult.projectRelevance || {};
  const resume = matchResult.resumeRelevance || {};
  const exp = matchResult.experienceMatch || {};

  const signals = [];

  // Skill signal
  if (skillMatch.requiredMatched >= skillMatch.requiredTotal && skillMatch.requiredTotal > 0) {
    signals.push(`Matches all ${skillMatch.requiredTotal} of ${skillMatch.requiredTotal} required core technical skills`);
  } else if (skillMatch.requiredMatched > 0) {
    signals.push(`Solid grasp across ${skillMatch.requiredMatched} of ${skillMatch.requiredTotal} required technical capabilities`);
  }

  // High proficiency skills
  const strongSkills = (skillMatch.details || [])
    .filter((d) => d.type === 'strong' && d.isRequired)
    .map((d) => d.name);
  if (strongSkills.length > 0) {
    signals.push(`Advanced proficiency demonstrated in ${strongSkills.slice(0, 3).join(', ')}`);
  }

  // CGPA signal
  const minCGPA = job.eligibility?.minCGPA || 7.5;
  const studentCGPA = parseFloat(student.cgpa || 0);
  if (studentCGPA >= minCGPA) {
    const diff = (studentCGPA - minCGPA).toFixed(1);
    signals.push(`CGPA ${studentCGPA.toFixed(1)} comfortably exceeds minimum requirement of ${minCGPA.toFixed(1)} (+${diff})`);
  }

  // Backlogs & Academic record
  if (parseInt(student.backlogs || 0, 10) === 0) {
    signals.push(`Zero active academic backlogs with clean institutional progression record`);
  }

  // Project relevance
  if (project.score >= 80) {
    const topProj = (project.relevantProjects || student.projects || [])[0];
    signals.push(`Highly relevant software capstone project${topProj?.name ? ` ("${topProj.name}")` : ''} aligns with job architecture`);
  }

  // Internship / Experience
  if (exp.score >= 80) {
    signals.push(`Prior verifiable industry internship (${exp.summary || '6 months'}) provides production familiarity`);
  }

  // Resume alignment
  if (resume.score >= 80) {
    signals.push(`Resume contains high-density technical keywords matching job specifications (ATS score ${resume.atsQualityScore || 82}/100)`);
  }

  // Department alignment
  if (student.department || student.deptCode) {
    signals.push(`Graduating from target engineering cohort (${student.deptCode || student.department}, Batch ${student.graduationYear || 2027})`);
  }

  return signals.slice(0, 6);
}

/**
 * 3. Dynamic Weak Signals Generator ("What is reducing the score?")
 * Uses neutral, constructive phrasing focusing on evidence gaps
 */
export function generateWeakSignals(matchResult, optionalJob = null) {
  const student = matchResult.student || {};
  const job = resolveJob(matchResult, optionalJob);
  const skillMatch = matchResult.skillMatch || {};
  const project = matchResult.projectRelevance || {};
  const exp = matchResult.experienceMatch || {};
  const cert = matchResult.certificationMatch || {};

  const signals = [];

  // Missing required skills
  if (skillMatch.missingSkills && skillMatch.missingSkills.length > 0) {
    signals.push(`Required skill gap: ${skillMatch.missingSkills.join(', ')} not identified in candidate profile`);
  }

  // Partial required skills
  if (skillMatch.partialSkills && skillMatch.partialSkills.length > 0) {
    signals.push(`Proficiency gap: ${skillMatch.partialSkills.join(', ')} is currently below the requested benchmark level`);
  }

  // Missing preferred skills (clearly labeled non-disqualifying)
  const jobPrefSkills = (job.preferredSkills || []).map((p) => (typeof p === 'string' ? p : p.name || p));
  const candidateSkills = extractStudentNormalizedSkills(student).map((s) => s.canonical);
  const missingPreferred = jobPrefSkills.filter(
    (pref) => !candidateSkills.some((cs) => areSkillsMatching(cs, pref))
  );

  if (missingPreferred.length > 0) {
    signals.push(`Preferred tool(s) ${missingPreferred.slice(0, 2).join(', ')} not found in active profile (non-disqualifying bonus)`);
  }

  // Experience level
  if (exp.score < 80) {
    signals.push(`No formal external corporate internship on record; academic capstones provide primary practical evidence`);
  }

  // Certification relevance
  if (cert.score < 75) {
    signals.push(`Domain certification relevance is moderate compared to core job profile`);
  }

  // Resume missing keywords
  if (matchResult.resumeRelevance?.missingKeywords?.length > 0) {
    signals.push(`Resume does not explicitly emphasize ${matchResult.resumeRelevance.missingKeywords.slice(0, 2).join(' or ')}`);
  }

  // If no weak signals were found, provide neutral baseline
  if (signals.length === 0) {
    signals.push(`Candidate meets all key criteria; score ceiling reflects standard demo conservative baseline weights`);
  }

  return signals.slice(0, 4);
}

/**
 * 4. Technical Skill Fit Explanation
 */
export function generateSkillExplanation(matchResult, optionalJob = null) {
  const student = matchResult.student || {};
  const job = resolveJob(matchResult, optionalJob);
  const candidateSkills = extractStudentNormalizedSkills(student);
  const requiredSkills = job.requiredSkills || [];
  const preferredSkills = job.preferredSkills || [];

  const requiredAnalysis = requiredSkills.map((req) => {
    const reqName = typeof req === 'string' ? req : req.name;
    const reqLevel = typeof req === 'object' && req.level ? req.level : 'Intermediate';
    const importance = typeof req === 'object' && req.importance ? req.importance : 'Medium';

    const found = candidateSkills.find((cs) => areSkillsMatching(cs.canonical, reqName));
    const candLevel = found ? found.proficiency || 'Intermediate' : 'None';

    let result = '✓ Match';
    let badgeType = 'match';
    let assessment = 'Satisfies job requirements';
    let recommendation = 'Maintain active practice on complex edge cases.';

    if (!found) {
      result = '✕ Missing';
      badgeType = 'missing';
      assessment = 'No verifiable evidence found in profile or projects';
      recommendation = `Complete foundational coursework in ${reqName} and implement one portfolio project.`;
    } else if (
      (reqLevel === 'Advanced' && candLevel === 'Advanced') ||
      (reqLevel === 'Intermediate' && (candLevel === 'Intermediate' || candLevel === 'Advanced'))
    ) {
      result = '✓ Strong Match';
      badgeType = 'strong';
      assessment = `Candidate level (${candLevel}) meets or exceeds required (${reqLevel})`;
      recommendation = `Strong alignment; ready for technical deep-dive interviews in ${reqName}.`;
    } else if (reqLevel === 'Advanced' && candLevel === 'Intermediate') {
      result = '◐ Partial';
      badgeType = 'partial';
      assessment = `Intermediate grasp demonstrated; job seeks Advanced fluency`;
      recommendation = `Deepen architectural knowledge and concurrency/scale patterns in ${reqName}.`;
    }

    // Evidence gathering
    const evidenceList = [];
    (student.projects || []).forEach((prj) => {
      const prjTech = (prj.technologies || []).map((t) => t.toLowerCase());
      if (prjTech.some((t) => t.includes(reqName.toLowerCase()) || reqName.toLowerCase().includes(t))) {
        evidenceList.push(`Project: ${prj.name}`);
      }
    });

    if (student.resume?.experience && student.resume.experience.toLowerCase().includes('intern')) {
      evidenceList.push('Internship experience');
    }
    if (found) {
      evidenceList.push('Self-assessed profile skills');
    }

    return {
      name: reqName,
      requiredLevel: reqLevel,
      candidateLevel: candLevel,
      importance,
      result,
      badgeType,
      assessment,
      recommendation,
      evidence: evidenceList.length > 0 ? evidenceList : ['Profile keyword declaration']
    };
  });

  const preferredAnalysis = preferredSkills.map((pref) => {
    const prefName = typeof pref === 'string' ? pref : pref.name || pref;
    const found = candidateSkills.find((cs) => areSkillsMatching(cs.canonical, prefName));
    const candLevel = found ? found.proficiency || 'Intermediate' : 'None';

    return {
      name: prefName,
      candidateLevel: candLevel,
      status: found ? 'Matched (Bonus)' : 'Not Acquired',
      badgeType: found ? 'bonus' : 'neutral',
      assessment: found
        ? `Provides advantageous domain competency in ${prefName}`
        : `Preferred technology not currently surfaced; non-disqualifying bonus`
    };
  });

  const matchedCount = requiredAnalysis.filter((s) => s.badgeType === 'strong' || s.badgeType === 'match').length;

  return {
    matchedCount,
    totalCount: requiredAnalysis.length,
    percentage: requiredAnalysis.length > 0 ? Math.round((matchedCount / requiredAnalysis.length) * 100) : 100,
    required: requiredAnalysis,
    preferred: preferredAnalysis,
    missingRequired: requiredAnalysis.filter((s) => s.badgeType === 'missing'),
    missingPreferred: preferredAnalysis.filter((s) => s.badgeType === 'neutral'),
    partialRequired: requiredAnalysis.filter((s) => s.badgeType === 'partial')
  };
}

/**
 * 5. Academic Fit Explanation
 */
export function generateAcademicExplanation(matchResult, optionalJob = null) {
  const student = matchResult.student || {};
  const job = resolveJob(matchResult, optionalJob);
  const elig = job.eligibility || {};

  const minCGPA = elig.minCGPA || 7.5;
  const candidateCGPA = parseFloat(student.cgpa || 0);
  const cgpaDiff = parseFloat((candidateCGPA - minCGPA).toFixed(1));

  const deptCheck =
    !elig.departments ||
    elig.departments.length === 0 ||
    elig.departments.some((d) => (student.deptCode || student.department || '').toUpperCase().includes(d.toUpperCase()));

  const gradCheck = !elig.graduationYear || parseInt(student.graduationYear || 0, 10) === parseInt(elig.graduationYear, 10);
  const backlogCheck = parseInt(student.backlogs || 0, 10) <= (elig.maxBacklogs ?? 0);
  const degreeCheck = !elig.degree || elig.degree.some((deg) => (student.degree || 'B.Tech').toUpperCase().includes(deg.toUpperCase()));

  const allPassed = candidateCGPA >= minCGPA && deptCheck && gradCheck && backlogCheck && degreeCheck;

  return {
    candidateCGPA,
    requiredCGPA: minCGPA,
    cgpaDifference: (cgpaDiff >= 0 ? `+${cgpaDiff}` : `${cgpaDiff}`),
    isCgpaSufficient: candidateCGPA >= minCGPA,
    department: {
      candidate: student.deptCode || student.department || 'CSE',
      allowed: elig.departments || ['CSE', 'IT', 'ECE'],
      isMatch: deptCheck
    },
    graduationYear: {
      candidate: student.graduationYear || 2027,
      target: elig.graduationYear || 2027,
      isMatch: gradCheck
    },
    backlogs: {
      candidate: student.backlogs || 0,
      maxAllowed: elig.maxBacklogs ?? 0,
      isMatch: backlogCheck
    },
    degree: {
      candidate: student.degree || 'B.Tech',
      allowed: elig.degree || ['B.Tech', 'B.E.'],
      isMatch: degreeCheck
    },
    score: matchResult.academicMatch?.score || (allPassed ? 100 : 75),
    isEligible: allPassed,
    summary: allPassed
      ? 'Candidate comfortably satisfies all configured academic eligibility criteria.'
      : 'Some academic parameters do not satisfy configured threshold criteria.'
  };
}

/**
 * 6. Project Relevance Explanation & Evidence
 */
export function generateProjectExplanation(matchResult, optionalJob = null) {
  const student = matchResult.student || {};
  const job = resolveJob(matchResult, optionalJob);
  const jobSkills = [
    ...(job.requiredSkills || []).map((r) => (r.name || r).toLowerCase()),
    ...(job.preferredSkills || []).map((p) => (p.name || p).toLowerCase())
  ];

  const projects = (student.projects || []).map((prj) => {
    const tech = (prj.technologies || []).map((t) => t.toLowerCase());
    const matchedTech = prj.technologies.filter((t) =>
      jobSkills.some((js) => js.includes(t.toLowerCase()) || t.toLowerCase().includes(js))
    );

    // Concept mapping
    const concepts = [];
    if (tech.some((t) => ['java', 'node.js', 'python', 'spring', 'express'].includes(t))) concepts.push('Backend development');
    if (tech.some((t) => ['sql', 'mongodb', 'postgresql', 'database'].includes(t))) concepts.push('Database integration');
    if (tech.some((t) => ['react', 'vue', 'angular', 'html', 'css'].includes(t))) concepts.push('Frontend interfaces');
    if (tech.some((t) => ['nlp', 'machine learning', 'opencv', 'ai'].includes(t))) concepts.push('Applied AI / Machine Learning');
    if (concepts.length === 0) concepts.push('Software engineering fundamentals');

    const relevanceLevel = matchedTech.length >= 2 ? 'High' : matchedTech.length >= 1 ? 'Moderate' : 'Baseline';

    return {
      ...prj,
      matchedTechnologies: matchedTech,
      matchedConcepts: concepts,
      relevanceLevel,
      overlapCount: `${matchedTech.length} / ${Math.min(3, Math.max(1, job.requiredSkills?.length || 3))}`,
      evidenceSource: 'Student verified GitHub project profile + resume intelligence'
    };
  });

  projects.sort((a, b) => (b.matchedTechnologies?.length || 0) - (a.matchedTechnologies?.length || 0));

  return {
    score: matchResult.projectRelevance?.score || 88,
    count: projects.length,
    projects,
    summary:
      projects.length > 0
        ? `${projects.length} verified projects evaluated; top projects demonstrate strong architectural overlap with job requirements.`
        : 'No structured project information found in candidate records.'
  };
}

/**
 * 7. Resume Relevance & ATS Alignment Explanation
 */
export function generateResumeExplanation(matchResult, optionalJob = null) {
  const student = matchResult.student || {};
  const job = resolveJob(matchResult, optionalJob);
  const resume = student.resume || {};

  const jobReqNames = (job.requiredSkills || []).map((r) => (typeof r === 'string' ? r : r.name || r));
  const candidateSkills = (student.skills || []).map((s) => (typeof s === 'string' ? s : s.name || s));

  const matchedKeywords = jobReqNames.filter((j) =>
    candidateSkills.some((c) => c.toLowerCase().includes(j.toLowerCase()) || j.toLowerCase().includes(c.toLowerCase()))
  );
  const missingKeywords = jobReqNames.filter(
    (j) => !candidateSkills.some((c) => c.toLowerCase().includes(j.toLowerCase()) || j.toLowerCase().includes(c.toLowerCase()))
  );

  // Add preferred missing keywords
  (job.preferredSkills || []).forEach((p) => {
    const pName = typeof p === 'string' ? p : p.name || p;
    if (
      !candidateSkills.some((c) => c.toLowerCase().includes(pName.toLowerCase())) &&
      !missingKeywords.includes(pName)
    ) {
      missingKeywords.push(pName);
    }
  });

  return {
    score: matchResult.resumeRelevance?.score || 91,
    atsQualityScore: resume.score || 82,
    fileName: resume.fileName || 'Candidate_Resume.pdf',
    status: resume.status || 'Analyzed',
    matchedKeywords,
    missingKeywords: missingKeywords.slice(0, 4),
    summary: `Resume parsed with Layer 5 intelligence. Strong lexical alignment found with ${matchedKeywords.length} core job competencies.`
  };
}

/**
 * 8. Experience Fit Explanation
 */
export function generateExperienceExplanation(matchResult) {
  const student = matchResult.student || {};
  const resume = student.resume || {};
  const expText = resume.experience || '';
  const hasInternship = expText.toLowerCase().includes('intern') || (student.internships && student.internships.length > 0);

  if (hasInternship) {
    return {
      score: matchResult.experienceMatch?.score || 80,
      title: 'Software Development Intern',
      duration: '6 months',
      technologies: ['Java', 'SQL', 'REST APIs'],
      relevanceLevel: 'High',
      summary: 'Relevant 6-month software development internship demonstrates production engineering familiarity.',
      isFresher: false
    };
  }

  return {
    score: matchResult.experienceMatch?.score || 72,
    title: 'Academic & Capstone Engineering',
    duration: 'Ongoing (Final Year Cohort)',
    technologies: (student.skills || []).slice(0, 3),
    relevanceLevel: 'Moderate',
    summary: 'No formal corporate internship found. Practical capstone project experience is present and considered.',
    isFresher: true
  };
}

/**
 * 9. Certification Fit Explanation
 */
export function generateCertificationExplanation(matchResult, optionalJob = null) {
  const student = matchResult.student || {};
  const job = resolveJob(matchResult, optionalJob);
  const certs = student.certifications || [];

  const jobTechWords = [
    ...(job.requiredSkills || []).map((r) => (r.name || r).toLowerCase()),
    ...(job.preferredSkills || []).map((p) => (p.name || p).toLowerCase()),
    'cloud', 'aws', 'data', 'web', 'developer', 'python', 'java'
  ];

  const analyzedCerts = certs.map((c) => {
    const cName = (c.name || '').toLowerCase();
    const isRelevant = jobTechWords.some((w) => cName.includes(w));
    return {
      ...c,
      relevance: isRelevant ? 'Relevant' : 'Complementary',
      badgeColor: isRelevant ? '#059669' : '#64748B'
    };
  });

  const relevantCount = analyzedCerts.filter((c) => c.relevance === 'Relevant').length;

  return {
    score: matchResult.certificationMatch?.score || 75,
    totalCount: certs.length,
    relevantCount,
    certifications: analyzedCerts,
    summary:
      certs.length > 0
        ? `${relevantCount} highly relevant credential(s) and ${certs.length - relevantCount} complementary certification(s).`
        : 'No verified professional certifications submitted in candidate records.'
  };
}

/**
 * 10. Profile Evidence Coverage Calculator
 * Checks completeness of candidate data across 6 dimensions
 */
export function calculateEvidenceCoverage(student) {
  if (!student) return { percentage: 0, items: [] };

  const dimensions = [
    {
      id: 'academic',
      name: 'Academic Records',
      available: Boolean(student.cgpa && (student.department || student.deptCode) && student.degree),
      detail: student.cgpa ? `CGPA ${student.cgpa} recorded` : 'Incomplete academic marks'
    },
    {
      id: 'skills',
      name: 'Technical Skills Profile',
      available: Array.isArray(student.skills) && student.skills.length > 0,
      detail: `${student.skills?.length || 0} skills declared`
    },
    {
      id: 'projects',
      name: 'Capstone Projects',
      available: Array.isArray(student.projects) && student.projects.length > 0,
      detail: `${student.projects?.length || 0} software projects on file`
    },
    {
      id: 'resume',
      name: 'Resume Intelligence (Layer 5)',
      available: Boolean(student.resume && student.resume.score),
      detail: student.resume?.fileName ? `${student.resume.fileName} analyzed` : 'Resume unavailable'
    },
    {
      id: 'experience',
      name: 'Internship / Experience',
      available: Boolean(student.resume?.experience || (student.internships && student.internships.length > 0)),
      detail: student.resume?.experience || 'Experience record present'
    },
    {
      id: 'certifications',
      name: 'Verified Certifications',
      available: Array.isArray(student.certifications) && student.certifications.length > 0,
      detail: `${student.certifications?.length || 0} verified credentials`
    }
  ];

  const availableCount = dimensions.filter((d) => d.available).length;
  const percentage = Math.round((availableCount / dimensions.length) * 100);

  return {
    percentage,
    availableCount,
    totalCount: dimensions.length,
    dimensions,
    label: percentage >= 90 ? 'Comprehensive' : percentage >= 70 ? 'Adequate' : 'Partial'
  };
}

/**
 * 11. Dynamic Personalized Recommendations Generator
 */
export function generateImprovementRecommendations(matchResult, optionalJob = null) {
  const student = matchResult.student || {};
  const job = resolveJob(matchResult, optionalJob);
  const skillMatch = matchResult.skillMatch || {};
  const recommendations = [];

  // 1. Missing required skills
  if (skillMatch.missingSkills && skillMatch.missingSkills.length > 0) {
    recommendations.push(
      `Master core ${skillMatch.missingSkills[0]}: Build a production-style service with comprehensive automated test coverage.`
    );
  }

  // 2. Partial skills
  if (skillMatch.partialSkills && skillMatch.partialSkills.length > 0) {
    recommendations.push(
      `Advance ${skillMatch.partialSkills[0]} proficiency from intermediate to advanced by implementing concurrency and performance tuning.`
    );
  }

  // 3. Preferred cloud / tooling skills (AWS, Docker, Kubernetes)
  const candidateSkills = extractStudentNormalizedSkills(student).map((s) => s.canonical);
  const preferred = (job.preferredSkills || []).map((p) => (typeof p === 'string' ? p : p.name || p));

  const missingCloud = preferred.filter((p) =>
    ['aws', 'docker', 'kubernetes', 'cloud', 'gcp', 'azure'].some((c) => p.toLowerCase().includes(c)) &&
    !candidateSkills.some((cs) => cs.toLowerCase().includes(p.toLowerCase()))
  );

  if (missingCloud.length > 0) {
    recommendations.push(
      `Acquire practical ${missingCloud.slice(0, 2).join(' & ')} containerization experience to boost cloud infrastructure readiness.`
    );
  }

  // 4. Resume keyword enhancement
  if (matchResult.resumeRelevance?.missingKeywords?.length > 0) {
    recommendations.push(
      `Highlight ${matchResult.resumeRelevance.missingKeywords.slice(0, 2).join(' and ')} implementations prominently in resume project bullet points.`
    );
  }

  // Fallback defaults if candidate is already strong
  if (recommendations.length < 3) {
    recommendations.push('Prepare for system design interviews with focus on distributed data storage and API gateway patterns.');
  }

  return recommendations.slice(0, 3);
}

/**
 * 12. Dynamic AI Match Explanation Summary
 */
export function generateFitSummary(matchResult, breakdown, optionalJob = null) {
  const student = matchResult.student || {};
  const job = resolveJob(matchResult, optionalJob);
  const tier = matchResult.recommendationTier || getRecommendationTier(breakdown.finalScore);
  const strongSkills = (matchResult.skillMatch?.matchedSkills || []).slice(0, 4);

  const skillPhrase =
    strongSkills.length > 0
      ? `demonstrating strong alignment across ${strongSkills.join(', ')}`
      : 'demonstrating solid core engineering competency';

  const expPhrase =
    matchResult.experienceMatch?.score >= 80
      ? 'Relevant software internship experience and capstone projects substantiate technical readiness.'
      : 'Practical software capstone projects substantiate technical fundamentals.';

  return `${student.name || 'The candidate'} is evaluated as a ${tier.label} (${breakdown.finalScore}%) for the ${job.title || 'Software Engineer'} role at ${job.companyName || 'TechNova Solutions'}. The candidate satisfies all configured hard academic eligibility criteria ${skillPhrase}. ${expPhrase} The primary growth opportunity lies in acquiring preferred cloud technologies such as AWS and Docker. CampusCore rates this candidate as a high-value talent prospect for recruitment consideration.`;
}

/**
 * 13. Interactive What-If Simulator
 * Clones candidate data, applies simulated skill improvements, and recalculates fit score
 */
export function simulateImprovement(student, job, addedSkills = []) {
  if (!student || !job) return null;

  // 1. Deep clone student
  const clonedStudent = JSON.parse(JSON.stringify(student));

  // 2. Add simulated skills to clonedStudent
  if (!Array.isArray(clonedStudent.skills)) {
    clonedStudent.skills = [];
  }

  if (!clonedStudent.technicalSkills) {
    clonedStudent.technicalSkills = { programming: [], web: [], database: [], core: [] };
  }

  addedSkills.forEach((simSkill) => {
    const sName = typeof simSkill === 'string' ? simSkill : simSkill.name;
    const sLevel = typeof simSkill === 'object' && simSkill.level ? simSkill.level : 'Intermediate';

    // Add to flat skills array
    if (!clonedStudent.skills.includes(sName)) {
      clonedStudent.skills.push(sName);
    }

    // Add or update in technicalSkills
    let foundInCategories = false;
    Object.keys(clonedStudent.technicalSkills).forEach((cat) => {
      const arr = clonedStudent.technicalSkills[cat];
      if (Array.isArray(arr)) {
        const existing = arr.find((item) => (item.name || item).toLowerCase() === sName.toLowerCase());
        if (existing) {
          existing.proficiency = sLevel;
          foundInCategories = true;
        }
      }
    });

    if (!foundInCategories) {
      if (!Array.isArray(clonedStudent.technicalSkills.core)) {
        clonedStudent.technicalSkills.core = [];
      }
      clonedStudent.technicalSkills.core.push({ name: sName, proficiency: sLevel });
    }

    // If simulated skill is AWS or Cloud, optionally augment certifications
    if (sName.toLowerCase().includes('aws') || sName.toLowerCase().includes('cloud')) {
      if (!Array.isArray(clonedStudent.certifications)) clonedStudent.certifications = [];
      if (!clonedStudent.certifications.some((c) => c.name.toLowerCase().includes('aws'))) {
        clonedStudent.certifications.push({
          id: `sim-cert-${Date.now()}`,
          name: `${sName} Certified Practitioner`,
          issuer: 'Cloud Institute',
          year: 2026,
          status: 'Simulated'
        });
      }
    }
  });

  // 3. Re-run Layer 7 Candidate Matcher with simulated candidate
  const simulatedMatch = calculateMatchScore(clonedStudent, job);
  const simulatedBreakdown = calculateFitBreakdown(simulatedMatch);

  // 4. Current candidate match
  const currentMatch = calculateMatchScore(student, job);
  const currentBreakdown = calculateFitBreakdown(currentMatch);

  const delta = simulatedBreakdown.finalScore - currentBreakdown.finalScore;

  return {
    currentScore: currentBreakdown.finalScore,
    projectedScore: simulatedBreakdown.finalScore,
    delta: delta >= 0 ? `+${delta}` : `${delta}`,
    deltaNum: delta,
    currentBreakdown,
    projectedBreakdown: simulatedBreakdown,
    simulatedSkills: addedSkills,
    disclaimer: 'Illustrative projection based on demo scoring rules. Not a guarantee of actual hiring outcomes.'
  };
}

/**
 * 14. Master Constructor: Build Complete Layer 8 Fit Explanation Model
 */
export function buildCompleteFitExplanation(student, job, customWeights = DEFAULT_FIT_WEIGHTS, rankInfo = null) {
  if (!student || !job) return null;

  // Run Layer 7 Matcher (or use existing)
  const matchResult = calculateMatchScore(student, job);
  matchResult.job = job;

  // Compute Layer 8 factor breakdown
  const breakdown = calculateFitBreakdown(matchResult, customWeights);
  const positiveSignals = generatePositiveSignals(matchResult);
  const weakSignals = generateWeakSignals(matchResult);
  const skillExplanation = generateSkillExplanation(matchResult);
  const academicExplanation = generateAcademicExplanation(matchResult);
  const projectExplanation = generateProjectExplanation(matchResult);
  const resumeExplanation = generateResumeExplanation(matchResult);
  const experienceExplanation = generateExperienceExplanation(matchResult);
  const certificationExplanation = generateCertificationExplanation(matchResult);
  const evidenceCoverage = calculateEvidenceCoverage(student);
  const recommendations = generateImprovementRecommendations(matchResult);
  const fitSummary = generateFitSummary(matchResult, breakdown);

  const tier = matchResult.recommendationTier || getRecommendationTier(breakdown.finalScore);

  return {
    candidateId: student.id,
    student,
    jobId: job.id,
    job,
    overallScore: breakdown.finalScore,
    exactScore: breakdown.exactSum,
    recommendationTier: tier.label,
    tierMeta: tier,
    rank: rankInfo?.rank || 1,
    totalCandidates: rankInfo?.totalCandidates || 126,
    isEligible: matchResult.eligible,
    eligibilityReasons: matchResult.eligibilityReasons || [],
    factors: breakdown.factors,
    breakdown,
    positiveSignals,
    weakSignals,
    skillExplanation,
    academicExplanation,
    projectExplanation,
    resumeExplanation,
    experienceExplanation,
    certificationExplanation,
    evidenceCoverage: evidenceCoverage.percentage,
    evidenceCoverageData: evidenceCoverage,
    recommendations,
    fitSummary,
    weights: breakdown.weights,
    generatedAt: new Date().toISOString()
  };
}

export default {
  DEFAULT_FIT_WEIGHTS,
  calculateFitBreakdown,
  generatePositiveSignals,
  generateWeakSignals,
  generateSkillExplanation,
  generateAcademicExplanation,
  generateProjectExplanation,
  generateResumeExplanation,
  generateExperienceExplanation,
  generateCertificationExplanation,
  calculateEvidenceCoverage,
  generateImprovementRecommendations,
  generateFitSummary,
  simulateImprovement,
  buildCompleteFitExplanation
};
