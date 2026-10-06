/**
 * CAMPUSCORE — AI-POWERED SKILL-GAP ANALYSIS ENGINE
 * 
 * Modular analysis service that benchmarks a candidate's 360° telemetry
 * against target job requirements or custom pasted job descriptions.
 * 
 * Weighted Composite Model (Configurable):
 * - Technical Skills: 40%
 * - Academic Eligibility: 15%
 * - Verified Projects: 15%
 * - Certifications: 10%
 * - Relevant Experience: 10%
 * - Communication / Soft Skills: 10%
 * 
 * Note: Logic represents simulated algorithmic evaluation for the CampusCore prototype.
 */

// Proficiency numeric mapping
const LEVEL_VALUES = {
  None: 10,
  Novice: 30,
  Beginner: 45,
  Intermediate: 70,
  Advanced: 90,
  Expert: 98
};

// Normalize string for fuzzy matching (safely handles objects, strings, numbers)
const normalize = (str) => {
  if (typeof str === 'string') return str.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (str && typeof str.name === 'string') return str.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (str && typeof str.title === 'string') return str.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (str != null && typeof str.toString === 'function' && typeof str !== 'object') return String(str).toLowerCase().replace(/[^a-z0-9]/g, '');
  return '';
};

/**
 * Extracts candidate proficiency for a given target skill name
 */
export function getCandidateSkillLevel(student, skillName) {
  const normSkill = normalize(skillName);

  // Check categorized skills first
  if (student.categorizedSkills) {
    for (const category of Object.values(student.categorizedSkills)) {
      if (Array.isArray(category)) {
        const found = category.find(s => normalize(s.name) === normSkill || normSkill.includes(normalize(s.name)) || normalize(s.name).includes(normSkill));
        if (found) {
          return {
            level: found.level || 'Intermediate',
            proficiency: LEVEL_VALUES[found.level] || 70,
            hasSkill: true
          };
        }
      }
    }
  }

  // Check flat skills array
  if (student.skills && Array.isArray(student.skills)) {
    const foundFlat = student.skills.find(s => {
      const n = normalize(s);
      return n === normSkill || normSkill.includes(n) || n.includes(normSkill);
    });
    if (foundFlat) {
      return {
        level: 'Intermediate',
        proficiency: 75,
        hasSkill: true
      };
    }
  }

  // Check in projects technologies
  if (student.projects && Array.isArray(student.projects)) {
    const inProject = student.projects.some(p => {
      const tech = normalize(p.technologies || '');
      return tech.includes(normSkill);
    });
    if (inProject) {
      return {
        level: 'Beginner',
        proficiency: 55,
        hasSkill: true
      };
    }
  }

  // Check in certifications
  if (student.certifications && Array.isArray(student.certifications)) {
    const inCert = student.certifications.some(c => {
      const name = normalize(c.name || '');
      return name.includes(normSkill);
    });
    if (inCert) {
      return {
        level: 'Intermediate',
        proficiency: 70,
        hasSkill: true
      };
    }
  }

  // Default missing
  return {
    level: 'None',
    proficiency: 10,
    hasSkill: false
  };
}

/**
 * Performs full multi-factor skill-gap analysis
 */
export function analyzeSkillGap(student, role, customWeights = {}) {
  if (!student || !role) return null;

  const weights = {
    technicalSkills: 0.40,
    academicEligibility: 0.15,
    projects: 0.15,
    certifications: 0.10,
    experience: 0.10,
    communication: 0.10,
    ...customWeights
  };

  const allRoleSkills = [
    ...(role.requiredSkills || []).map(s => ({ ...s, isRequired: true })),
    ...(role.preferredSkills || []).map(s => ({
      name: typeof s === 'string' ? s : s.name,
      level: (typeof s === 'object' && s.level) ? s.level : 'Intermediate',
      importance: (typeof s === 'object' && s.importance) ? s.importance : 'Medium',
      minProficiency: (typeof s === 'object' && s.minProficiency) ? s.minProficiency : 65,
      isRequired: false,
      domain: (typeof s === 'object' && s.domain) ? s.domain : 'Preferred'
    }))
  ];

  const matchedSkills = [];
  const partialSkills = [];
  const missingSkills = [];
  const priorityGaps = [];
  const horizontalChartData = [];

  let technicalTotalScore = 0;
  let technicalMaxScore = 0;

  allRoleSkills.forEach(reqSkill => {
    const candidateData = getCandidateSkillLevel(student, reqSkill.name);
    const requiredLevel = reqSkill.level || 'Intermediate';
    const requiredScore = reqSkill.minProficiency || LEVEL_VALUES[requiredLevel] || 70;
    const currentScore = candidateData.proficiency;

    const importanceMultiplier = reqSkill.importance === 'High' ? 1.5 : reqSkill.importance === 'Medium' ? 1.0 : 0.7;
    const requirementWeight = reqSkill.isRequired ? 1.3 : 0.8;
    const factorWeight = importanceMultiplier * requirementWeight;

    technicalMaxScore += (100 * factorWeight);
    technicalTotalScore += (Math.min(100, (currentScore / requiredScore) * 100) * factorWeight);

    let status = 'Gap';
    let priority = 'Low';

    if (currentScore >= requiredScore) {
      status = 'Matched';
      priority = '—';
      matchedSkills.push({
        name: reqSkill.name,
        requiredLevel,
        currentLevel: candidateData.level,
        requiredScore,
        currentScore,
        status,
        priority,
        domain: reqSkill.domain || 'General',
        isRequired: reqSkill.isRequired
      });
    } else if (candidateData.hasSkill && currentScore >= 45) {
      status = 'Partial';
      priority = reqSkill.importance === 'High' ? 'High' : 'Medium';
      partialSkills.push({
        name: reqSkill.name,
        requiredLevel,
        currentLevel: candidateData.level,
        requiredScore,
        currentScore,
        status,
        priority,
        domain: reqSkill.domain || 'General',
        isRequired: reqSkill.isRequired
      });
    } else {
      status = 'Gap';
      priority = reqSkill.isRequired ? (reqSkill.importance === 'High' ? 'High' : 'Medium') : 'Low';
      missingSkills.push({
        name: reqSkill.name,
        requiredLevel,
        currentLevel: candidateData.level === 'None' ? 'None' : candidateData.level,
        requiredScore,
        currentScore,
        status,
        priority,
        domain: reqSkill.domain || 'General',
        isRequired: reqSkill.isRequired
      });
    }

    // Build horizontal comparison visualization item
    horizontalChartData.push({
      skill: reqSkill.name,
      current: currentScore,
      required: requiredScore,
      status
    });

    // Populate priority gaps
    if (status !== 'Matched') {
      let whyItMatters = '';
      if (reqSkill.name.toLowerCase().includes('data structure') || reqSkill.name.toLowerCase().includes('algorithm')) {
        whyItMatters = 'Essential for passing core online assessments and technical coding rounds.';
      } else if (reqSkill.name.toLowerCase().includes('aws') || reqSkill.name.toLowerCase().includes('cloud')) {
        whyItMatters = 'Frequently mandated for deployment and cloud infrastructure operations.';
      } else if (reqSkill.name.toLowerCase().includes('system design') || reqSkill.name.toLowerCase().includes('architecture')) {
        whyItMatters = 'Crucial for high-throughput architecture and backend scalability rounds.';
      } else if (reqSkill.name.toLowerCase().includes('docker') || reqSkill.name.toLowerCase().includes('kubernetes')) {
        whyItMatters = 'Key modern DevOps requirement for consistent microservices containerization.';
      } else if (reqSkill.name.toLowerCase().includes('sql') || reqSkill.name.toLowerCase().includes('dbms')) {
        whyItMatters = 'Required for designing normalized schemas and optimal query execution plans.';
      } else {
        whyItMatters = `Required competency for ${role.title} day-one job performance.`;
      }

      let priorityScore = 70;
      if (reqSkill.importance === 'High') priorityScore += 18;
      if (reqSkill.isRequired) priorityScore += 10;
      if (currentScore < 30) priorityScore += 7;

      priorityGaps.push({
        name: reqSkill.name,
        currentLevel: candidateData.level,
        targetLevel: requiredLevel,
        whyItMatters,
        priority: priority === '—' ? 'Medium' : priority,
        priorityScore: Math.min(98, priorityScore)
      });
    }
  });

  // Sort priority gaps by calculated priority score descending
  priorityGaps.sort((a, b) => b.priorityScore - a.priorityScore);

  // Technical pillar score
  const technicalRatio = technicalMaxScore > 0 ? (technicalTotalScore / technicalMaxScore) : 0.8;
  const technicalPillar = Math.round(technicalRatio * 100);

  // Academic pillar score (based on CGPA vs cutoff & backlogs)
  const candidateCgpa = student.cgpa || 8.0;
  const cutoffCgpa = role.academicCutoff?.cgpa || 7.0;
  let academicPillar = 85;
  if (candidateCgpa >= cutoffCgpa + 1.0) academicPillar = 98;
  else if (candidateCgpa >= cutoffCgpa) academicPillar = 88;
  else academicPillar = 60;
  if ((student.academic?.backlogs || 0) > 0) academicPillar -= 20;

  // Projects pillar
  const projectsCount = (student.projects || []).length;
  let projectsPillar = Math.min(95, 65 + (projectsCount * 10));

  // Certifications pillar
  const certsCount = (student.certifications || []).length;
  let certsPillar = Math.min(92, 60 + (certsCount * 11));

  // Experience pillar
  let experiencePillar = 75;
  if (student.resume?.extractedExperience && student.resume.extractedExperience.toLowerCase().includes('internship')) {
    experiencePillar = 88;
  }

  // Soft Skills / Communication
  let communicationPillar = student.readinessBreakdown?.communication || 80;

  // Weighted overall readiness
  const overallScore = Math.round(
    (technicalPillar * weights.technicalSkills) +
    (academicPillar * weights.academicEligibility) +
    (projectsPillar * weights.projects) +
    (certsPillar * weights.certifications) +
    (experiencePillar * weights.experience) +
    (communicationPillar * weights.communication)
  );

  // Categorize Readiness level
  let readinessLevel = 'Nearly Ready';
  if (overallScore >= 85) readinessLevel = 'Job Ready';
  else if (overallScore >= 70) readinessLevel = 'Nearly Ready';
  else if (overallScore >= 50) readinessLevel = 'Needs Improvement';
  else readinessLevel = 'Critical';

  // Projected potential if top gaps addressed
  const improvementPotential = Math.min(98, overallScore + Math.max(8, Math.round(priorityGaps.length * 3.5)));

  // Explainable AI Factors
  const positiveFactors = [];
  const gapFactors = [];

  matchedSkills.slice(0, 3).forEach(ms => {
    positiveFactors.push(`${ms.name} proficiency (${ms.currentLevel}) matches or exceeds role benchmark`);
  });
  if (candidateCgpa >= cutoffCgpa) {
    positiveFactors.push(`Strong academic eligibility (CGPA ${candidateCgpa} exceeds cutoff of ${cutoffCgpa})`);
  }
  if (projectsCount >= 2) {
    positiveFactors.push(`Demonstrated hands-on project portfolio (${projectsCount} verified capstone systems)`);
  }

  priorityGaps.slice(0, 3).forEach(pg => {
    gapFactors.push(`${pg.name} is currently ${pg.currentLevel}; target role specifies ${pg.targetLevel}`);
  });
  if (missingSkills.length > 2) {
    gapFactors.push(`${missingSkills.length} tooling prerequisites require bridge development`);
  }

  // Profile strength
  let profileStrength = 'Strong';
  if (overallScore < 65) profileStrength = 'Emerging';
  else if (overallScore < 75) profileStrength = 'Moderate';

  // AI Recommendations
  const recommendations = [
    {
      id: "rec_1",
      title: priorityGaps[0] ? `Prioritize ${priorityGaps[0].name} before the next technical recruitment cycle.` : "Reinforce core Data Structures & Algorithms.",
      focus: priorityGaps[0]?.name.includes('Data Structure') || priorityGaps[0]?.name.includes('Algorithm')
        ? ['Arrays & Strings', 'Linked Lists', 'Trees & BST', 'Graphs & BFS/DFS', 'Dynamic Programming Patterns']
        : priorityGaps[0]?.name.includes('AWS')
        ? ['EC2 Compute & Auto-scaling', 'S3 Storage & IAM Roles', 'VPC Networking & Subnets', 'CloudWatch Monitoring']
        : ['Core fundamentals', 'API endpoints', 'Design patterns', 'Unit testing'],
      estimatedEffort: "30–40 hours",
      timeframe: "Weeks 1–2"
    },
    {
      id: "rec_2",
      title: priorityGaps[1] ? `Complete a focused ${priorityGaps[1].name} development curriculum.` : "Build hands-on cloud deployment experience.",
      focus: priorityGaps[1]?.name.includes('System Design')
        ? ['Monolithic vs Microservices', 'Horizontal Scaling & Load Balancers', 'Caching (Redis) & CDNs', 'CAP Theorem & Database Sharding']
        : priorityGaps[1]?.name.includes('Docker')
        ? ['Dockerfile containerization', 'Multi-stage builds', 'Docker Compose multi-service', 'Container registries']
        : ['Prerequisite modules', 'Practical exercises', 'Integration testing'],
      estimatedEffort: "15–20 hours",
      timeframe: "Weeks 3–4"
    },
    {
      id: "rec_3",
      title: "Build and deploy one production-style end-to-end project.",
      focus: ['Production architectural patterns', 'Database indexing & migrations', 'Automated CI/CD deployment', 'Public live demo & clear documentation'],
      estimatedEffort: "20–30 hours",
      timeframe: "Weeks 5–6"
    }
  ];

  // 6-Week Personalized Learning Roadmap
  const roadmap = [
    {
      week: 1,
      title: priorityGaps[0]?.name || "Core DSA Foundations",
      focus: "Arrays, Strings, Two-Pointer technique & Binary Search",
      activities: ["Solve 15 LeetCode Medium problems", "Analyze Big-O time and space complexity", "Implement custom HashMaps"],
      hours: 20,
      completed: false
    },
    {
      week: 2,
      title: "Advanced Problem Solving",
      focus: "Trees, Graphs & Dynamic Programming",
      activities: ["Tree traversals & Lowest Common Ancestor", "Graph Dijkstra & Topological Sort", "1D/2D DP memoization patterns"],
      hours: 20,
      completed: false
    },
    {
      week: 3,
      title: priorityGaps[1]?.name || "Cloud & Infrastructure Basics",
      focus: "AWS Architecture & Containerization",
      activities: ["Provision EC2 & RDS PostgreSQL", "Configure S3 static storage with IAM policies", "Containerize service with Docker"],
      hours: 18,
      completed: false
    },
    {
      week: 4,
      title: priorityGaps[2]?.name || "System Design & Architecture",
      focus: "High-level design & Scalability components",
      activities: ["Design TinyURL / Rate Limiter", "Understand caching patterns with Redis", "Study asynchronous message queues"],
      hours: 18,
      completed: false
    },
    {
      week: 5,
      title: "Production Capstone Project",
      focus: "End-to-End Enterprise Service Build",
      activities: ["Implement JWT auth & rate-limited REST endpoints", "Add SQL indexes & connection pooling", "Deploy to cloud with CI/CD pipeline"],
      hours: 22,
      completed: false
    },
    {
      week: 6,
      title: "Mock Interviews & Assessment Polish",
      focus: "Technical Rigor & Behavioral Delivery",
      activities: ["2 timed DSA mock interviews (Pramp / Peer)", "System design architecture defense", "Resume walkthrough & STAR method storytelling"],
      hours: 14,
      completed: false
    }
  ];

  // Dynamic AI Insight text tailored to the candidate and role
  const aiInsightText = `${student.name} demonstrates a baseline readiness of ${overallScore}% for ${role.title}. Strongest capabilities center around ${(matchedSkills.slice(0, 2).map(s => s.name).join(' and ')) || 'foundational technologies'}. To reach a 90%+ Job Ready profile, focus on bridging gaps in ${(priorityGaps.slice(0, 2).map(p => p.name).join(' and ')) || 'advanced architecture'}.`;

  return {
    studentId: student.id,
    studentName: student.name,
    roleId: role.id,
    roleTitle: role.title,
    roleBracket: role.targetBracket,
    overallScore,
    readinessLevel,
    improvementPotential,
    profileStrength,
    matchedSkills,
    partialSkills,
    missingSkills,
    priorityGaps,
    horizontalChartData: horizontalChartData.slice(0, 10),
    recommendations,
    roadmap,
    positiveFactors,
    gapFactors,
    aiInsightText,
    scoresBreakdown: {
      technicalPillar,
      academicPillar,
      projectsPillar,
      certsPillar,
      experiencePillar,
      communicationPillar
    }
  };
}

/**
 * Heuristic/NLP-style parser that extracts technical requirements from free-form job descriptions
 */
export function parseJobDescription(text) {
  if (!text || text.trim().length < 15) {
    return { error: 'Please enter a valid job description with at least 15 characters.' };
  }

  const normalizedText = text.toLowerCase();

  // Known skill dictionaries
  const knownSkills = [
    { name: 'Java', domain: 'Programming', aliases: ['java', 'core java', 'j2se'] },
    { name: 'Python', domain: 'Programming', aliases: ['python', 'py'] },
    { name: 'C++', domain: 'Programming', aliases: ['c++', 'cpp'] },
    { name: 'JavaScript', domain: 'Programming', aliases: ['javascript', 'js', 'es6'] },
    { name: 'TypeScript', domain: 'Programming', aliases: ['typescript', 'ts'] },
    { name: 'React', domain: 'Web', aliases: ['react', 'react.js', 'reactjs'] },
    { name: 'Node.js', domain: 'Backend', aliases: ['node', 'node.js', 'nodejs', 'express'] },
    { name: 'Spring Boot', domain: 'Backend', aliases: ['spring', 'spring boot', 'springboot'] },
    { name: 'SQL', domain: 'Database', aliases: ['sql', 'mysql', 'postgresql', 'postgres'] },
    { name: 'MongoDB', domain: 'Database', aliases: ['mongo', 'mongodb', 'nosql'] },
    { name: 'AWS', domain: 'Cloud', aliases: ['aws', 'amazon web services', 'ec2', 's3'] },
    { name: 'Docker', domain: 'DevOps', aliases: ['docker', 'container', 'containers'] },
    { name: 'Kubernetes', domain: 'DevOps', aliases: ['k8s', 'kubernetes'] },
    { name: 'Git', domain: 'Tools', aliases: ['git', 'github', 'gitlab'] },
    { name: 'REST APIs', domain: 'Development', aliases: ['rest', 'restful', 'rest api', 'apis'] },
    { name: 'Data Structures', domain: 'Core CS', aliases: ['data structures', 'dsa', 'algorithms', 'problem solving'] },
    { name: 'System Design', domain: 'Architecture', aliases: ['system design', 'distributed systems', 'scalability', 'microservices'] },
    { name: 'Machine Learning', domain: 'AI/ML', aliases: ['machine learning', 'ml', 'deep learning', 'nlp'] },
    { name: 'Linux', domain: 'Systems', aliases: ['linux', 'unix', 'bash'] },
    { name: 'CI/CD', domain: 'DevOps', aliases: ['ci/cd', 'jenkins', 'pipeline', 'github actions'] }
  ];

  const extractedRequired = [];
  const extractedPreferred = [];

  knownSkills.forEach(skill => {
    const hasMatch = skill.aliases.some(alias => normalizedText.includes(alias));
    if (hasMatch) {
      // Check if mentioned in preferred or bonus context
      const isPreferred = normalizedText.includes(`nice to have`) || normalizedText.includes(`plus`) || normalizedText.includes(`preferred`);
      if (isPreferred && Math.random() > 0.6) {
        extractedPreferred.push({
          name: skill.name,
          level: 'Intermediate',
          importance: 'Medium',
          domain: skill.domain
        });
      } else {
        extractedRequired.push({
          name: skill.name,
          level: 'Advanced',
          importance: 'High',
          domain: skill.domain,
          minProficiency: 75
        });
      }
    }
  });

  // Fallbacks if very brief
  if (extractedRequired.length === 0) {
    extractedRequired.push(
      { name: 'Data Structures', level: 'Advanced', importance: 'High', minProficiency: 80, domain: 'Core CS' },
      { name: 'Problem Solving', level: 'Intermediate', importance: 'High', minProficiency: 75, domain: 'Core' }
    );
  }

  // Detect experience
  let experienceRequirement = '0–2 years (Entry-Level / Campus Graduate)';
  if (normalizedText.includes('senior') || normalizedText.includes('5+ years') || normalizedText.includes('4+ years')) {
    experienceRequirement = '3–5+ years (Mid/Senior Role)';
  } else if (normalizedText.includes('intern') || normalizedText.includes('fresher') || normalizedText.includes('campus')) {
    experienceRequirement = 'Fresh Graduates / 2027 Batch';
  }

  // Detect degree
  let educationRequirement = 'B.Tech / B.E. / MCA in Computer Science or related engineering discipline';
  if (normalizedText.includes('master') || normalizedText.includes('m.tech')) {
    educationRequirement = 'B.Tech / M.Tech in CS / IT';
  }

  // Extract job title from first line or default
  const firstLine = text.trim().split('\n')[0].replace(/[#*_-]/g, '').trim();
  const inferredTitle = firstLine.length < 50 ? firstLine : 'Custom Job Role';

  return {
    id: `custom-${Date.now()}`,
    title: inferredTitle,
    targetBracket: 'Pasted Job Specification',
    category: 'Custom Role',
    description: text.slice(0, 180) + '...',
    requiredSkills: extractedRequired,
    preferredSkills: extractedPreferred,
    experienceRequirement,
    educationRequirement,
    academicCutoff: {
      cgpa: 7.0,
      maxBacklogs: 0,
      degree: ['B.Tech', 'MCA']
    }
  };
}
