/**
 * CAMPUSLINK — RESUME INTELLIGENCE & PROFILE EXTRACTION SERVICE
 * 
 * Modular analysis pipeline for unstructured PDF/DOC resumes.
 * Extracts structured candidate profiles, computes multi-dimensional ATS
 * readiness metrics, evaluates project depth, and assesses role relevance.
 * 
 * Note: Simulation engine for hackathon prototype validation.
 */

// Default demo resume data for Rahul Kumar
export const DEFAULT_DEMO_RESUME = {
  fileName: "Rahul_Kumar_Resume_v3.pdf",
  uploadDate: "Oct 04, 2026",
  fileSize: "1.4 MB",
  personal: {
    name: "Rahul Kumar",
    studentId: "CL-2027-0042",
    email: "rahul.kumar@demo.campuscore",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    linkedin: "linkedin.com/in/rahul-kumar-demo",
    github: "github.com/rahul-kumar-demo"
  },
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    university: "Demo Engineering University",
    graduationYear: 2027,
    cgpa: 8.7,
    keyCourses: "Data Structures, Database Management, Operating Systems, Computer Networks, Object-Oriented Design"
  },
  experience: [
    {
      id: "exp_1",
      role: "Software Development Intern",
      company: "Demo Technologies Pvt. Ltd.",
      period: "May 2026 – July 2026",
      location: "Bangalore, India (Hybrid)",
      responsibilities: [
        "Built RESTful microservices using Node.js and Express to streamline catalog processing.",
        "Engineered responsive UI modules in React with state management and reusable form components.",
        "Optimized complex PostgreSQL query joins, reducing API endpoint query latency.",
        "Collaborated with cross-functional product teams using Git and Agile Scrum sprints."
      ],
      extractedSkills: ["React", "Node.js", "REST APIs", "SQL", "Git"],
      metrics: {
        technicalRelevance: 88,
        roleRelevance: 91,
        achievementEvidence: 62
      },
      recommendation: "Convert responsibility-focused bullet points into achievement-focused statements with measurable impact metrics where possible."
    }
  ],
  skills: [
    { name: "Java", category: "Programming", confidence: 96, evidence: "Strong evidence in projects & academics", level: "Advanced" },
    { name: "React", category: "Web", confidence: 94, evidence: "Strong evidence in internship & multiple projects", level: "Advanced" },
    { name: "Python", category: "Programming", confidence: 92, evidence: "Strong evidence in AI projects & coursework", level: "Advanced" },
    { name: "SQL", category: "Database", confidence: 89, evidence: "Demonstrated in internship query optimization", level: "Intermediate" },
    { name: "Node.js", category: "Web", confidence: 88, evidence: "Demonstrated in CampusConnect capstone", level: "Intermediate" },
    { name: "JavaScript", category: "Programming", confidence: 91, evidence: "Extensive frontend and backend usage", level: "Advanced" },
    { name: "Data Structures", category: "Core", confidence: 90, evidence: "Core academic coursework & assessments", level: "Advanced" },
    { name: "AWS", category: "Cloud", confidence: 81, evidence: "Mentioned in industry certification", level: "Beginner" },
    { name: "Git", category: "Tools", confidence: 87, evidence: "Evidence across repositories & collaboration", level: "Intermediate" },
    { name: "MongoDB", category: "Database", confidence: 78, evidence: "Used in document storage capstone", level: "Beginner" },
    { name: "REST APIs", category: "Web", confidence: 93, evidence: "Core internship deliverable", level: "Advanced" },
    { name: "OOP", category: "Core", confidence: 92, evidence: "Java design patterns evidence", level: "Advanced" },
    { name: "HTML & CSS", category: "Web", confidence: 95, evidence: "Semantic styling & accessible interfaces", level: "Advanced" },
    { name: "Docker", category: "DevOps", confidence: 65, evidence: "Mentioned briefly in deployment notes", level: "Beginner" }
  ],
  projects: [
    {
      id: "proj_1",
      title: "CampusConnect",
      description: "Full-stack student collaboration platform with live group study rooms, peer resource sharing, and schedule synchronization.",
      technologies: "React • Node.js • MongoDB • Socket.io",
      impact: "Used by 300+ demo campus students",
      signals: {
        hasTechImplementation: true,
        hasOutcome: true,
        hasQuantifiedImpact: false
      },
      scores: {
        technicalDepth: 84,
        clarity: 78,
        impactEvidence: 61,
        completeness: 76
      },
      recommendation: "Add measurable outcomes to project descriptions. For example, mention processing speed, active users, load times, or system uptime where applicable."
    },
    {
      id: "proj_2",
      title: "AI Resume Analyzer",
      description: "AI-based prototype that parses unstructured resumes, identifies core competencies, and maps fit against target job descriptions.",
      technologies: "Python • NLP • Machine Learning • Flask",
      impact: "Hackathon prototype project",
      signals: {
        hasTechImplementation: true,
        hasOutcome: true,
        hasQuantifiedImpact: false
      },
      scores: {
        technicalDepth: 88,
        clarity: 82,
        impactEvidence: 58,
        completeness: 80
      },
      recommendation: "Highlight specific machine learning evaluation metrics (e.g. classification F1 score, precision, or parsing accuracy percentage)."
    },
    {
      id: "proj_3",
      title: "Smart Attendance System",
      description: "Automated attendance tracking application using facial landmark detection to automate classroom roll calls.",
      technologies: "Python • OpenCV • SQLite",
      impact: "Department demo prototype",
      signals: {
        hasTechImplementation: true,
        hasOutcome: false,
        hasQuantifiedImpact: false
      },
      scores: {
        technicalDepth: 74,
        clarity: 70,
        impactEvidence: 50,
        completeness: 68
      },
      recommendation: "Include recognition accuracy rate under diverse lighting conditions and average detection latency per student."
    }
  ],
  certifications: [
    {
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      year: 2026,
      status: "Detected",
      verificationStatus: "Verified"
    },
    {
      name: "Python for Data Science",
      issuer: "NPTEL / IIT Madras",
      year: 2026,
      status: "Detected",
      verificationStatus: "Verified"
    }
  ],
  scores: {
    overall: 82,
    statusText: "Good — Improvement Recommended",
    contentQuality: 86,
    skillsCoverage: 91,
    projectStrength: 82,
    experienceStrength: 74,
    formatting: 88,
    atsReadiness: 79
  },
  structureAnalysis: [
    { section: "Contact Information", status: "Present", icon: "✓", note: "Email, phone, LinkedIn, and GitHub detected" },
    { section: "Education", status: "Present", icon: "✓", note: "Degree, university, graduation year, and CGPA clear" },
    { section: "Technical Skills", status: "Present", icon: "✓", note: "Categorized with strong programming & web coverage" },
    { section: "Projects", status: "Present", icon: "✓", note: "3 projects listed with tech stack details" },
    { section: "Certifications", status: "Present", icon: "✓", note: "2 verified cloud & data credentials" },
    { section: "Work Experience", status: "Present", icon: "✓", note: "1 relevant internship recorded" },
    { section: "Achievements & Awards", status: "Needs Improvement", icon: "⚠", note: "No competitive programming or academic awards section" },
    { section: "Leadership & Extra-curricular", status: "Needs Improvement", icon: "⚠", note: "Student clubs or community leadership not detailed" },
    { section: "Research Publications", status: "Missing", icon: "❌", note: "No academic papers detected (optional for campus SDE)" }
  ],
  atsAnalysis: {
    score: 79,
    keywordCoverage: 84,
    formatting: 88,
    sectionStructure: 91,
    jobRelevance: 72,
    summary: "ATS compatibility is an estimate based on CampusCore standard parser heuristics. Good single-column hierarchy with clean standard headings."
  },
  roleKeywords: {
    "software-engineer": {
      detected: ["Java", "Python", "SQL", "REST API", "Git", "Data Structures", "OOP"],
      missing: ["Spring Boot", "Docker", "AWS (in-depth)", "System Design", "Microservices"],
      recommended: ["Spring Boot", "Docker", "CI/CD", "Unit Testing", "Kubernetes"]
    },
    "frontend-developer": {
      detected: ["React", "JavaScript", "HTML", "CSS", "REST APIs", "Git"],
      missing: ["TypeScript", "Next.js", "Redux", "Tailwind CSS"],
      recommended: ["TypeScript", "Next.js", "State Management", "Web Performance"]
    },
    "fullstack-developer": {
      detected: ["React", "Node.js", "SQL", "MongoDB", "JavaScript", "REST APIs"],
      missing: ["Docker", "AWS", "CI/CD", "TypeScript"],
      recommended: ["Docker", "Containerization", "Authentication (JWT)", "AWS Deployment"]
    }
  },
  recommendations: [
    {
      id: "rec_1",
      number: "01",
      title: "Add measurable impact to project & experience bullets",
      current: "Built a student management platform using React and Node.js.",
      suggested: "Built a student collaboration platform with React and Node.js, reducing manual study group coordination time by 40% across 300+ students.",
      actionText: "Do not fabricate achievements. Insert real metrics such as user counts, load times, or percentage gains if available."
    },
    {
      id: "rec_2",
      number: "02",
      title: "Strengthen project descriptions with architectural depth",
      current: "Engineered responsive UI modules and optimized database queries.",
      suggested: "Architected 12+ modular React components with custom hooks; indexed PostgreSQL foreign keys to reduce average API response time from 380ms to 95ms.",
      actionText: "Explain what you built, how you built it, and the engineering decisions behind your technology stack."
    },
    {
      id: "rec_3",
      number: "03",
      title: "Improve ATS keyword alignment for target role",
      current: "Limited mentions of modern enterprise backend tools like Spring Boot and Docker.",
      suggested: "If you have working familiarity with Spring Boot or Docker containerization, feature them in skills and project deployment notes.",
      actionText: "Only add skills or keywords that genuinely reflect your practical experience. Avoid keyword stuffing."
    },
    {
      id: "rec_4",
      number: "04",
      title: "Add missing sections (Achievements, Hackathons, Leadership)",
      current: "Resume omits an Achievements or Extracurricular Leadership section.",
      suggested: "Add a concise 2-3 line section highlighting hackathon participation, competitive programming ratings (LeetCode/CodeChef), or club leadership.",
      actionText: "Campus recruiters look for initiative and problem-solving passion outside of regular classroom coursework."
    }
  ],
  versionHistory: [
    {
      version: "v3",
      fileName: "Rahul_Kumar_Resume_v3.pdf",
      score: 82,
      uploadDate: "Oct 04, 2026",
      isCurrent: true,
      notes: "Added CampusConnect project outcomes, updated AWS certification and improved ATS formatting."
    },
    {
      version: "v2",
      fileName: "Rahul_Kumar_Resume_v2.pdf",
      score: 75,
      uploadDate: "Sep 18, 2026",
      isCurrent: false,
      notes: "Added summer internship experience at Demo Technologies."
    },
    {
      version: "v1",
      fileName: "Rahul_Kumar_Resume_v1.pdf",
      score: 68,
      uploadDate: "Aug 02, 2026",
      isCurrent: false,
      notes: "Initial draft uploaded for pre-placement baseline evaluation."
    }
  ],
  versionComparison: {
    from: "Version 1",
    to: "Version 3",
    scoreDelta: "+14 (68 → 82)",
    changes: [
      "+4 skills detected (React, Node.js, AWS, REST APIs)",
      "+1 verified project added (CampusConnect)",
      "+1 industry certification added (AWS Cloud Practitioner)",
      "Reorganized into clean single-column ATS-compliant hierarchy",
      "Quantified bullet points increased from 0% to 35%"
    ]
  }
};

/**
 * Analyzes resume content against a specific target role and optional job description
 */
export function analyzeResumeForJob(resumeData, roleTitle, jobDescription = "") {
  const normJD = (jobDescription || "").toLowerCase();
  
  let roleKeywords = ["Java", "SQL", "REST API", "Git", "Data Structures", "Spring Boot", "AWS", "Docker", "Python", "React"];
  if (roleTitle.toLowerCase().includes("frontend")) {
    roleKeywords = ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Next.js", "Redux", "Git", "REST API", "Tailwind CSS"];
  } else if (roleTitle.toLowerCase().includes("full stack") || roleTitle.toLowerCase().includes("fullstack")) {
    roleKeywords = ["React", "Node.js", "SQL", "MongoDB", "JavaScript", "REST API", "Docker", "AWS", "Git", "TypeScript"];
  } else if (roleTitle.toLowerCase().includes("data")) {
    roleKeywords = ["Python", "SQL", "Machine Learning", "Data Visualization", "Statistics", "Pandas", "Tableau", "Git"];
  }

  // Check matching
  const candidateSkills = (resumeData.skills || []).map(s => s.name.toLowerCase());
  const strongMatches = [];
  const partialMatches = [];
  const missing = [];

  roleKeywords.forEach(kw => {
    const lkw = kw.toLowerCase();
    const foundSkill = resumeData.skills?.find(s => s.name.toLowerCase() === lkw);
    if (foundSkill) {
      if (foundSkill.level === "Advanced" || foundSkill.confidence >= 85) {
        strongMatches.push(kw);
      } else {
        partialMatches.push(kw);
      }
    } else {
      missing.push(kw);
    }
  });

  const total = roleKeywords.length;
  const matchScore = Math.round(((strongMatches.length * 1.0) + (partialMatches.length * 0.5)) / total * 100);

  return {
    roleTitle,
    relevanceScore: Math.max(50, Math.min(94, matchScore)),
    strongMatches,
    partialMatches,
    missing,
    recommendation: missing.length > 0 
      ? `Your resume demonstrates strong technical fundamentals, but the target role places extra weight on ${missing.slice(0, 2).join(' and ')}.`
      : "Your resume closely aligns with the technical prerequisites for this role."
  };
}

/**
 * Syncs extracted resume profile into CampusCore student model in localStorage
 */
export function syncExtractedProfile(currentStudent, extractedResume, resolutionOptions = {}) {
  if (!currentStudent || !extractedResume) return currentStudent;

  const resolution = resolutionOptions.cgpaResolution || 'useResume'; // 'keepExisting' or 'useResume'

  // Extract skills from resume
  const resumeSkills = (extractedResume.skills || []).map(s => s.name);
  const mergedSkills = Array.from(new Set([...(currentStudent.skills || []), ...resumeSkills]));

  // Merge projects
  const resumeProjects = (extractedResume.projects || []).map(p => ({
    title: p.title,
    description: p.description,
    technologies: p.technologies,
    impact: p.impact
  }));

  // Merge certifications
  const resumeCerts = (extractedResume.certifications || []).map(c => ({
    name: c.name,
    issuer: c.issuer,
    year: c.year,
    verificationStatus: c.verificationStatus || 'Verified'
  }));

  const updatedStudent = {
    ...currentStudent,
    skills: mergedSkills,
    projects: resumeProjects.length > 0 ? resumeProjects : currentStudent.projects,
    certifications: resumeCerts.length > 0 ? resumeCerts : currentStudent.certifications,
    cgpa: resolution === 'useResume' && extractedResume.education?.cgpa ? extractedResume.education.cgpa : currentStudent.cgpa,
    resume: {
      ...(currentStudent.resume || {}),
      fileName: extractedResume.fileName || currentStudent.resume?.fileName,
      score: extractedResume.scores?.overall || 82,
      status: "Analyzed",
      extractedSkillsCount: mergedSkills.length,
      extractedProjectsCount: resumeProjects.length,
      extractedCertsCount: resumeCerts.length,
      extractedExperience: extractedResume.experience?.[0]?.role || "1 Internship"
    }
  };

  return updatedStudent;
}
