// Centralized demo data for students (Layer 3: Student Readiness & 360° Profile)
export const INITIAL_STUDENTS = [
  {
    id: 'CL-2027-0042',
    legacyId: 'std-101',
    name: 'Rahul Kumar',
    rollNo: '2023CS0104',
    department: 'Computer Science',
    departmentFullName: 'Computer Science & Engineering',
    deptCode: 'CSE',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 8.7,
    tenthPercentage: 92,
    twelfthPercentage: 89,
    backlogs: 0,
    attendance: 91,
    semesterGpa: [7.8, 8.1, 8.4, 8.7, 8.7],
    email: 'rahul.kumar@demo.campuscore',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    linkedin: 'linkedin.com/in/rahulkumar-demo',
    github: 'github.com/rahulkumar-demo',
    avatar: 'RK',
    avatarBg: '#3978F6',

    readinessScore: 87,
    readinessLevel: 'Job Ready',
    readinessStatus: 'Job Ready',
    placementStatus: 'Not Placed',
    applicationsCount: 8,
    skillsCount: 14,

    readinessBreakdown: {
      technicalSkills: 92,
      academicEligibility: 88,
      projects: 84,
      resumeQuality: 79,
      communication: 81,
      certifications: 72
    },

    skills: [
      'Java',
      'Data Structures',
      'SQL',
      'REST APIs',
      'Git',
      'React',
      'Python',
      'JavaScript',
      'Node.js',
      'MongoDB',
      'C++',
      'AWS',
      'Communication'
    ],

    technicalSkills: {
      programming: [
        { name: 'Java', proficiency: 'Advanced' },
        { name: 'Python', proficiency: 'Advanced' },
        { name: 'C++', proficiency: 'Intermediate' },
        { name: 'JavaScript', proficiency: 'Advanced' }
      ],
      web: [
        { name: 'React', proficiency: 'Advanced' },
        { name: 'REST APIs', proficiency: 'Intermediate' },
        { name: 'Node.js', proficiency: 'Intermediate' },
        { name: 'HTML', proficiency: 'Advanced' },
        { name: 'CSS', proficiency: 'Advanced' }
      ],
      database: [
        { name: 'SQL', proficiency: 'Advanced' },
        { name: 'MongoDB', proficiency: 'Intermediate' }
      ],
      core: [
        { name: 'Data Structures', proficiency: 'Advanced' },
        { name: 'Git', proficiency: 'Intermediate' },
        { name: 'OOP', proficiency: 'Advanced' },
        { name: 'DBMS', proficiency: 'Advanced' }
      ]
    },

    projects: [
      {
        id: 'prj-1',
        name: 'CampusConnect',
        description: 'Full-stack student collaboration platform with live group discussions and study group formation.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        impact: 'Used by 300+ demo users',
        github: 'https://github.com/demo/campusconnect',
        demoUrl: 'https://campusconnect.demo.app'
      },
      {
        id: 'prj-2',
        name: 'AI Resume Analyzer',
        description: 'AI-based resume analysis prototype using semantic text parsing and ATS scoring algorithms.',
        technologies: ['Python', 'NLP', 'Machine Learning'],
        impact: 'Evaluated 450+ sample resumes',
        github: 'https://github.com/demo/ai-resume-analyzer',
        demoUrl: 'https://resume-ai.demo.app'
      },
      {
        id: 'prj-3',
        name: 'Smart Attendance System',
        description: 'Automated student presence recognition with facial landmark detection and CSV logs.',
        technologies: ['Python', 'OpenCV'],
        impact: '98% facial recognition accuracy',
        github: 'https://github.com/demo/smart-attendance',
        demoUrl: 'https://attendance.demo.app'
      }
    ],

    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Cloud Practitioner',
        issuer: 'Amazon Web Services',
        year: 2026,
        status: 'Verified'
      },
      {
        id: 'cert-2',
        name: 'Python for Data Science',
        issuer: 'NPTEL',
        year: 2026,
        status: 'Verified'
      },
      {
        id: 'cert-3',
        name: 'Full Stack Web Development',
        issuer: 'Demo Learning Platform',
        year: 2025,
        status: 'Verified'
      }
    ],

    resume: {
      fileName: 'Rahul_Kumar_Resume.pdf',
      status: 'Analyzed',
      score: 82,
      skillsFound: 14,
      projectsFound: 3,
      certificationsFound: 3,
      experience: '1 Internship'
    },

    careerPreferences: {
      roles: ['Software Engineer', 'Full Stack Developer', 'Backend Developer'],
      industries: ['IT Services', 'FinTech', 'SaaS', 'E-commerce'],
      locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Pune'],
      expectedSalary: '₹6–10 LPA',
      workPreference: 'On-site / Hybrid'
    },

    placementHistory: [
      {
        id: 'hist-1',
        status: 'Applied',
        company: 'TCS',
        role: 'Software Engineer',
        date: 'Oct 02, 2026',
        type: 'applied'
      },
      {
        id: 'hist-2',
        status: 'Shortlisted',
        company: 'Infosys',
        role: 'Graduate Engineer',
        date: 'Sep 28, 2026',
        type: 'shortlisted'
      },
      {
        id: 'hist-3',
        status: 'Assessment Completed',
        company: 'Deloitte',
        role: 'Analyst',
        date: 'Sep 24, 2026',
        type: 'completed'
      },
      {
        id: 'hist-4',
        status: 'Application Submitted',
        company: 'Accenture',
        role: 'Associate Software Engineer',
        date: 'Sep 20, 2026',
        type: 'submitted'
      }
    ],

    eligibilitySnapshot: [
      { company: 'TCS', eligible: true, reason: 'Eligible for Digital Cadre' },
      { company: 'Infosys', eligible: true, reason: 'Meets 7.0 CGPA threshold' },
      { company: 'Deloitte', eligible: true, reason: 'Aptitude cleared' },
      { company: 'Google', eligible: false, reason: 'CGPA requirement: 9.0' },
      { company: 'Accenture', eligible: true, reason: 'Eligible for ASE role' }
    ],

    skillGaps: [
      { skill: 'React', status: 'Strong', level: '94%' },
      { skill: 'SQL', status: 'Strong', level: '92%' },
      { skill: 'Data Structures', status: 'Strong', level: '88%' },
      { skill: 'AWS', status: 'Needs Improvement', level: '58%' },
      { skill: 'System Design', status: 'Needs Improvement', level: '52%' }
    ],

    aiSummary:
      'Rahul demonstrates strong readiness for software development roles, with particularly strong Java, SQL and React capabilities. His primary development areas are cloud fundamentals and system design. Based on the current demo profile, he is suitable for entry-level software engineering opportunities.',

    officerNotes: [
      'Needs improvement in communication and cloud skills before applying to product companies.',
      'Recommended to enroll in the AWS Cloud Practitioner remedial workshop on campus.'
    ]
  },
  {
    id: 'CL-2027-0018',
    legacyId: 'std-102',
    name: 'Ananya Sharma',
    rollNo: '2023IT0018',
    department: 'Information Technology',
    departmentFullName: 'Information Technology',
    deptCode: 'IT',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 9.1,
    tenthPercentage: 96,
    twelfthPercentage: 94,
    backlogs: 0,
    attendance: 95,
    semesterGpa: [8.9, 9.0, 9.2, 9.1, 9.2],
    email: 'ananya.sharma@demo.campuscore',
    phone: '+91 98765 12345',
    location: 'Hyderabad, India',
    linkedin: 'linkedin.com/in/ananya-sharma-demo',
    github: 'github.com/ananya-sharma-demo',
    avatar: 'AS',
    avatarBg: '#0E8EA8',

    readinessScore: 94,
    readinessLevel: 'Job Ready',
    readinessStatus: 'Job Ready',
    placementStatus: 'Shortlisted',
    applicationsCount: 6,
    skillsCount: 16,

    readinessBreakdown: {
      technicalSkills: 96,
      academicEligibility: 95,
      projects: 92,
      resumeQuality: 91,
      communication: 90,
      certifications: 88
    },

    skills: ['Python', 'Machine Learning', 'SQL', 'FastAPI', 'PyTorch', 'Data Structures', 'Docker', 'AWS'],

    technicalSkills: {
      programming: [
        { name: 'Python', proficiency: 'Advanced' },
        { name: 'SQL', proficiency: 'Advanced' },
        { name: 'JavaScript', proficiency: 'Intermediate' }
      ],
      web: [
        { name: 'FastAPI', proficiency: 'Advanced' },
        { name: 'React', proficiency: 'Intermediate' }
      ],
      database: [
        { name: 'PostgreSQL', proficiency: 'Advanced' },
        { name: 'Redis', proficiency: 'Intermediate' }
      ],
      core: [
        { name: 'Machine Learning', proficiency: 'Advanced' },
        { name: 'Data Structures', proficiency: 'Advanced' },
        { name: 'Docker', proficiency: 'Intermediate' }
      ]
    },

    projects: [
      {
        id: 'prj-4',
        name: 'MediVision AI',
        description: 'Deep learning chest X-ray disease classification model deployed via FastAPI.',
        technologies: ['Python', 'PyTorch', 'FastAPI', 'Docker'],
        impact: '94.2% diagnostic validation accuracy',
        github: 'https://github.com/demo/medivision',
        demoUrl: 'https://medivision.demo.app'
      },
      {
        id: 'prj-5',
        name: 'FinPulse Dashboard',
        description: 'Real-time financial market sentiment analytics pipeline using Twitter & news embeddings.',
        technologies: ['Python', 'Streamlit', 'Transformers'],
        impact: 'Processed 50k+ market headlines',
        github: 'https://github.com/demo/finpulse',
        demoUrl: 'https://finpulse.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-4', name: 'AWS Certified Machine Learning - Specialty', issuer: 'AWS', year: 2026, status: 'Verified' },
      { id: 'cert-5', name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', year: 2025, status: 'Verified' }
    ],

    resume: {
      fileName: 'Ananya_Sharma_Resume.pdf',
      status: 'Analyzed',
      score: 94,
      skillsFound: 16,
      projectsFound: 4,
      certificationsFound: 3,
      experience: '2 Internships'
    },

    careerPreferences: {
      roles: ['Machine Learning Engineer', 'Data Scientist', 'AI Research Associate'],
      industries: ['AI & Cloud', 'FinTech', 'HealthTech'],
      locations: ['Bangalore', 'Hyderabad', 'Pune'],
      expectedSalary: '₹14–22 LPA',
      workPreference: 'Hybrid / Remote'
    },

    placementHistory: [
      { id: 'hist-5', status: 'Shortlisted', company: 'Microsoft', role: 'Software Engineer - AI', date: 'Oct 01, 2026', type: 'shortlisted' },
      { id: 'hist-6', status: 'Assessment Completed', company: 'Amazon', role: 'Applied Scientist Intern', date: 'Sep 27, 2026', type: 'completed' }
    ],

    eligibilitySnapshot: [
      { company: 'Google', eligible: true, reason: 'CGPA > 9.0 met' },
      { company: 'Microsoft', eligible: true, reason: 'Shortlisted for Round 2' },
      { company: 'Amazon', eligible: true, reason: 'OA Score: 98%' }
    ],

    skillGaps: [
      { skill: 'Python', status: 'Strong', level: '98%' },
      { skill: 'Machine Learning', status: 'Strong', level: '95%' },
      { skill: 'Distributed Systems', status: 'Needs Improvement', level: '62%' }
    ],

    aiSummary:
      'Ananya possesses exceptional computational and ML readiness. Highly recommended for premium Tier-1 AI/Data Science hiring tracks with top package potential.',

    officerNotes: [
      'Shortlisted for Microsoft AI Round 2. Scheduled mock system design interview.'
    ]
  },
  {
    id: 'CL-2027-0055',
    legacyId: 'std-103',
    name: 'Arjun Mehta',
    rollNo: '2023EC0055',
    department: 'Electronics & Communication',
    departmentFullName: 'Electronics & Communication Engineering',
    deptCode: 'ECE',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 7.8,
    tenthPercentage: 88,
    twelfthPercentage: 86,
    backlogs: 0,
    attendance: 87,
    semesterGpa: [7.4, 7.6, 7.9, 8.0, 7.8],
    email: 'arjun.mehta@demo.campuscore',
    phone: '+91 98765 67890',
    location: 'Chennai, India',
    linkedin: 'linkedin.com/in/arjun-mehta-demo',
    github: 'github.com/arjun-mehta-demo',
    avatar: 'AM',
    avatarBg: '#8B5CF6',

    readinessScore: 72,
    readinessLevel: 'Nearly Ready',
    readinessStatus: 'Nearly Ready',
    placementStatus: 'Not Placed',
    applicationsCount: 5,
    skillsCount: 11,

    readinessBreakdown: {
      technicalSkills: 74,
      academicEligibility: 78,
      projects: 72,
      resumeQuality: 70,
      communication: 68,
      certifications: 65
    },

    skills: ['C++', 'Embedded C', 'Python', 'VLSI', 'Verilog', 'MATLAB', 'Data Structures', 'Communication'],

    technicalSkills: {
      programming: [
        { name: 'C++', proficiency: 'Advanced' },
        { name: 'Embedded C', proficiency: 'Advanced' },
        { name: 'Python', proficiency: 'Intermediate' }
      ],
      web: [{ name: 'HTML/CSS', proficiency: 'Beginner' }],
      database: [{ name: 'SQL', proficiency: 'Intermediate' }],
      core: [
        { name: 'VLSI Design', proficiency: 'Advanced' },
        { name: 'Verilog HDL', proficiency: 'Intermediate' },
        { name: 'Microcontrollers', proficiency: 'Advanced' }
      ]
    },

    projects: [
      {
        id: 'prj-6',
        name: 'IoT Smart Energy Meter',
        description: 'ESP32 embedded metering node reporting power factor and load data over MQTT.',
        technologies: ['Embedded C', 'ESP32', 'MQTT', 'Python'],
        impact: 'Deployed across 4 college laboratories',
        github: 'https://github.com/demo/iot-meter',
        demoUrl: 'https://iot-meter.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-6', name: 'Embedded Systems with ARM Cortex', issuer: 'NPTEL', year: 2026, status: 'Verified' }
    ],

    resume: {
      fileName: 'Arjun_Mehta_Resume.pdf',
      status: 'Analyzed',
      score: 74,
      skillsFound: 11,
      projectsFound: 2,
      certificationsFound: 1,
      experience: 'Academic Projects'
    },

    careerPreferences: {
      roles: ['Embedded Software Engineer', 'Firmware Developer', 'VLSI Design Engineer'],
      industries: ['Semiconductors', 'Automotive', 'IoT'],
      locations: ['Chennai', 'Bangalore', 'Hyderabad'],
      expectedSalary: '₹6–9 LPA',
      workPreference: 'On-site'
    },

    placementHistory: [
      { id: 'hist-7', status: 'Applied', company: 'TCS', role: 'Digital Engineer', date: 'Oct 03, 2026', type: 'applied' }
    ],

    eligibilitySnapshot: [
      { company: 'TCS', eligible: true, reason: 'CGPA >= 7.0 met' },
      { company: 'Deloitte', eligible: true, reason: 'Eligible for tech consulting' },
      { company: 'Qualcomm', eligible: false, reason: 'Requires minimum 8.0 CGPA' }
    ],

    skillGaps: [
      { skill: 'Embedded C', status: 'Strong', level: '86%' },
      { skill: 'Data Structures', status: 'Needs Improvement', level: '58%' },
      { skill: 'Communication', status: 'Needs Improvement', level: '54%' }
    ],

    aiSummary:
      'Arjun possesses strong hardware-software embedded integration skills. Needs additional focus on generic DSA coding assessments to unlock broad software role eligibility.',

    officerNotes: [
      'Encouraged to join the coding problem-solving sprint for upcoming semiconductor campus drives.'
    ]
  },
  {
    id: 'CL-2027-0089',
    legacyId: 'std-104',
    name: 'Sneha Patel',
    rollNo: '2023CS0089',
    department: 'Computer Science',
    departmentFullName: 'Computer Science & Engineering',
    deptCode: 'CSE',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 8.4,
    tenthPercentage: 90,
    twelfthPercentage: 88,
    backlogs: 0,
    attendance: 93,
    semesterGpa: [8.0, 8.2, 8.4, 8.5, 8.4],
    email: 'sneha.patel@demo.campuscore',
    phone: '+91 98765 99887',
    location: 'Pune, India',
    linkedin: 'linkedin.com/in/sneha-patel-demo',
    github: 'github.com/sneha-patel-demo',
    avatar: 'SP',
    avatarBg: '#10B981',

    readinessScore: 89,
    readinessLevel: 'Job Ready',
    readinessStatus: 'Job Ready',
    placementStatus: 'Placed',
    applicationsCount: 4,
    skillsCount: 15,

    readinessBreakdown: {
      technicalSkills: 91,
      academicEligibility: 88,
      projects: 90,
      resumeQuality: 86,
      communication: 88,
      certifications: 82
    },

    skills: ['Java', 'React', 'Node.js', 'SQL', 'Data Structures', 'TypeScript', 'AWS', 'Communication'],

    technicalSkills: {
      programming: [
        { name: 'Java', proficiency: 'Advanced' },
        { name: 'JavaScript', proficiency: 'Advanced' },
        { name: 'TypeScript', proficiency: 'Advanced' }
      ],
      web: [
        { name: 'React', proficiency: 'Advanced' },
        { name: 'Node.js', proficiency: 'Advanced' },
        { name: 'TailwindCSS', proficiency: 'Advanced' }
      ],
      database: [{ name: 'PostgreSQL', proficiency: 'Advanced' }, { name: 'MongoDB', proficiency: 'Advanced' }],
      core: [{ name: 'Data Structures', proficiency: 'Advanced' }, { name: 'System Design', proficiency: 'Intermediate' }]
    },

    projects: [
      {
        id: 'prj-7',
        name: 'DevSync Workspace',
        description: 'Real-time collaborative code editor with video room pairing using WebRTC & Socket.io.',
        technologies: ['React', 'Node.js', 'Socket.io', 'WebRTC'],
        impact: 'Over 1,200 peer sessions hosted',
        github: 'https://github.com/demo/devsync',
        demoUrl: 'https://devsync.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-7', name: 'Meta Certified Front-End Developer', issuer: 'Meta Coursera', year: 2026, status: 'Verified' }
    ],

    resume: {
      fileName: 'Sneha_Patel_Resume.pdf',
      status: 'Analyzed',
      score: 88,
      skillsFound: 15,
      projectsFound: 3,
      certificationsFound: 2,
      experience: '1 Full-time Internship'
    },

    careerPreferences: {
      roles: ['Full Stack Developer', 'Frontend Engineer', 'Software Engineer'],
      industries: ['SaaS', 'E-commerce', 'FinTech'],
      locations: ['Pune', 'Bangalore', 'Mumbai'],
      expectedSalary: '₹8–12 LPA',
      workPreference: 'Hybrid'
    },

    placementHistory: [
      { id: 'hist-8', status: 'Offer Accepted', company: 'Deloitte USI', role: 'Technology Consultant', date: 'Sep 29, 2026', type: 'placed' }
    ],

    eligibilitySnapshot: [
      { company: 'Deloitte', eligible: true, reason: 'Offer Released & Accepted' }
    ],

    skillGaps: [
      { skill: 'React', status: 'Strong', level: '96%' },
      { skill: 'Node.js', status: 'Strong', level: '90%' },
      { skill: 'Kubernetes', status: 'Needs Improvement', level: '48%' }
    ],

    aiSummary:
      'Sneha successfully converted an offer with Deloitte USI at 11.2 LPA. Exhibits outstanding front-end architecture proficiency.',

    officerNotes: [
      'Offer verified and registered under institutional Dream category policy.'
    ]
  },
  {
    id: 'CL-2027-0112',
    legacyId: 'std-105',
    name: 'Karan Singh',
    rollNo: '2023ME0112',
    department: 'Mechanical',
    departmentFullName: 'Mechanical Engineering',
    deptCode: 'Mechanical',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 7.1,
    tenthPercentage: 82,
    twelfthPercentage: 79,
    backlogs: 0,
    attendance: 84,
    semesterGpa: [6.8, 7.0, 7.2, 7.3, 7.1],
    email: 'karan.singh@demo.campuscore',
    phone: '+91 98765 33445',
    location: 'Delhi NCR, India',
    linkedin: 'linkedin.com/in/karan-singh-demo',
    github: 'github.com/karan-singh-demo',
    avatar: 'KS',
    avatarBg: '#EC4899',

    readinessScore: 61,
    readinessLevel: 'Needs Improvement',
    readinessStatus: 'Needs Improvement',
    placementStatus: 'Not Placed',
    applicationsCount: 3,
    skillsCount: 8,

    readinessBreakdown: {
      technicalSkills: 63,
      academicEligibility: 70,
      projects: 58,
      resumeQuality: 62,
      communication: 55,
      certifications: 50
    },

    skills: ['AutoCAD', 'SolidWorks', 'Python', 'ANSYS', 'Communication'],

    technicalSkills: {
      programming: [{ name: 'Python', proficiency: 'Beginner' }],
      web: [],
      database: [{ name: 'Excel / SQL Basics', proficiency: 'Beginner' }],
      core: [
        { name: 'AutoCAD 3D', proficiency: 'Advanced' },
        { name: 'SolidWorks', proficiency: 'Intermediate' },
        { name: 'Thermodynamics', proficiency: 'Intermediate' }
      ]
    },

    projects: [
      {
        id: 'prj-8',
        name: 'Solar Powered EV Chassis Optimization',
        description: 'Finite element structural stress simulation on tubular mild steel chassis for solar racer vehicle.',
        technologies: ['SolidWorks', 'ANSYS Workbench'],
        impact: 'Achieved 14% mass reduction with 1.8x factor of safety',
        github: 'https://github.com/demo/ev-chassis',
        demoUrl: 'https://ev-chassis.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-8', name: 'Certified SOLIDWORKS Associate (CSWA)', issuer: 'Dassault Systèmes', year: 2025, status: 'Verified' }
    ],

    resume: {
      fileName: 'Karan_Singh_Resume.pdf',
      status: 'Analyzed',
      score: 64,
      skillsFound: 8,
      projectsFound: 2,
      certificationsFound: 1,
      experience: 'Shop Floor Training'
    },

    careerPreferences: {
      roles: ['Design Engineer', 'Graduate Trainee Engineer', 'CAD Specialist'],
      industries: ['Automotive', 'Renewable Energy', 'Manufacturing'],
      locations: ['Delhi NCR', 'Pune', 'Chennai'],
      expectedSalary: '₹4.5–7 LPA',
      workPreference: 'On-site'
    },

    placementHistory: [
      { id: 'hist-9', status: 'Applied', company: 'Tata Motors', role: 'Graduate Engineer Trainee', date: 'Oct 04, 2026', type: 'applied' }
    ],

    eligibilitySnapshot: [
      { company: 'Tata Motors', eligible: true, reason: 'CGPA >= 6.5 met' },
      { company: 'L&T Technology', eligible: true, reason: 'Eligible for core test' },
      { company: 'Maruti Suzuki', eligible: false, reason: 'Minimum 7.5 CGPA required' }
    ],

    skillGaps: [
      { skill: 'SolidWorks', status: 'Strong', level: '82%' },
      { skill: 'Python', status: 'Needs Improvement', level: '42%' },
      { skill: 'Communication', status: 'Needs Improvement', level: '46%' }
    ],

    aiSummary:
      'Karan is a core design engineer with strong CAD skills. Needs urgent reinforcement in professional aptitude and interview communication to maximize campus offers.',

    officerNotes: [
      'Assigned to placement cell English communication and soft-skill remedial batch.'
    ]
  },
  {
    id: 'CL-2027-0204',
    legacyId: 'std-106',
    name: 'Aman Verma',
    rollNo: '2023CE0204',
    department: 'Civil',
    departmentFullName: 'Civil Engineering',
    deptCode: 'Civil',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 6.2,
    tenthPercentage: 78,
    twelfthPercentage: 75,
    backlogs: 0,
    attendance: 80,
    semesterGpa: [6.0, 6.1, 6.3, 6.4, 6.2],
    email: 'aman.verma@demo.campuscore',
    phone: '+91 98765 22110',
    location: 'Lucknow, India',
    linkedin: 'linkedin.com/in/aman-verma-demo',
    github: 'github.com/aman-verma-demo',
    avatar: 'AV',
    avatarBg: '#EF4444',

    readinessScore: 48,
    readinessLevel: 'Critical',
    readinessStatus: 'Critical',
    placementStatus: 'Not Placed',
    applicationsCount: 2,
    skillsCount: 6,

    readinessBreakdown: {
      technicalSkills: 46,
      academicEligibility: 54,
      projects: 48,
      resumeQuality: 50,
      communication: 42,
      certifications: 40
    },

    skills: ['STAAD Pro', 'AutoCAD', 'Surveying', 'Communication'],

    technicalSkills: {
      programming: [],
      web: [],
      database: [],
      core: [
        { name: 'STAAD Pro', proficiency: 'Intermediate' },
        { name: 'AutoCAD Civil', proficiency: 'Intermediate' },
        { name: 'Surveying', proficiency: 'Intermediate' }
      ]
    },

    projects: [
      {
        id: 'prj-9',
        name: 'G+4 Residential Structural Design',
        description: 'Structural frame analysis and RCC slab dimensioning conforming to IS 456-2000 codes.',
        technologies: ['STAAD Pro', 'AutoCAD'],
        impact: 'Academic design portfolio verified',
        github: 'https://github.com/demo/civil-design',
        demoUrl: 'https://civil-design.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-9', name: 'AutoCAD Certified User', issuer: 'Autodesk', year: 2025, status: 'Verified' }
    ],

    resume: {
      fileName: 'Aman_Verma_Resume.pdf',
      status: 'Analyzed',
      score: 52,
      skillsFound: 6,
      projectsFound: 1,
      certificationsFound: 1,
      experience: 'Site Survey Intern'
    },

    careerPreferences: {
      roles: ['Site Engineer', 'Junior Quantity Surveyor', 'CAD Draftsman'],
      industries: ['Infrastructure', 'Real Estate', 'Consulting'],
      locations: ['Lucknow', 'Delhi NCR', 'Kanpur'],
      expectedSalary: '₹3.5–5 LPA',
      workPreference: 'On-site'
    },

    placementHistory: [
      { id: 'hist-10', status: 'Applied', company: 'Larsen & Toubro', role: 'Graduate Engineer Trainee - Civil', date: 'Oct 02, 2026', type: 'applied' }
    ],

    eligibilitySnapshot: [
      { company: 'L&T', eligible: true, reason: 'Eligible for civil cohort' },
      { company: 'Shapoorji Pallonji', eligible: true, reason: 'Requires assessment clearance' },
      { company: 'TCS', eligible: false, reason: 'Requires minimum 6.5 CGPA' }
    ],

    skillGaps: [
      { skill: 'Aptitude Tests', status: 'Critical', level: '38%' },
      { skill: 'Communication', status: 'Critical', level: '42%' },
      { skill: 'AutoCAD', status: 'Strong', level: '74%' }
    ],

    aiSummary:
      'CRITICAL INTERVENTION REQUIRED: Aman is at risk of missing early hiring deadlines due to aptitude scoring deficits. Recommend 1-on-1 counselor intervention and foundational mock tests.',

    officerNotes: [
      'Flagged as At-Risk in Layer 2 dashboard. Scheduled parent/student advisory call.'
    ]
  },
  {
    id: 'CL-2027-0091',
    legacyId: 'std-107',
    name: 'Tanvi Joshi',
    rollNo: '2023CS0198',
    department: 'Computer Science',
    departmentFullName: 'Computer Science & Engineering',
    deptCode: 'CSE',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 9.3,
    tenthPercentage: 95,
    twelfthPercentage: 92,
    backlogs: 0,
    attendance: 94,
    semesterGpa: [9.0, 9.2, 9.4, 9.5, 9.3],
    email: 'tanvi.joshi@demo.campuscore',
    phone: '+91 98765 88776',
    location: 'Mumbai, India',
    linkedin: 'linkedin.com/in/tanvi-joshi-demo',
    github: 'github.com/tanvi-joshi-demo',
    avatar: 'TJ',
    avatarBg: '#059669',

    readinessScore: 95,
    readinessLevel: 'Job Ready',
    readinessStatus: 'Job Ready',
    placementStatus: 'Offer Accepted',
    applicationsCount: 4,
    skillsCount: 18,

    readinessBreakdown: {
      technicalSkills: 97,
      academicEligibility: 95,
      projects: 96,
      resumeQuality: 92,
      communication: 94,
      certifications: 90
    },

    skills: ['Java', 'Golang', 'Kubernetes', 'Redis', 'TypeScript', 'React', 'AWS', 'Data Structures', 'Communication'],

    technicalSkills: {
      programming: [
        { name: 'Java', proficiency: 'Advanced' },
        { name: 'Golang', proficiency: 'Advanced' },
        { name: 'TypeScript', proficiency: 'Advanced' }
      ],
      web: [{ name: 'React', proficiency: 'Advanced' }, { name: 'Next.js', proficiency: 'Advanced' }],
      database: [{ name: 'PostgreSQL', proficiency: 'Advanced' }, { name: 'Redis', proficiency: 'Advanced' }],
      core: [{ name: 'Kubernetes', proficiency: 'Advanced' }, { name: 'Distributed Systems', proficiency: 'Advanced' }]
    },

    projects: [
      {
        id: 'prj-10',
        name: 'KubeMesh Orchestrator',
        description: 'Lightweight sidecar service discovery proxy built in Go with Prometheus telemetry.',
        technologies: ['Golang', 'Kubernetes', 'Prometheus', 'Docker'],
        impact: 'Featured on GitHub trending with 280+ stars',
        github: 'https://github.com/demo/kubemesh',
        demoUrl: 'https://kubemesh.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-10', name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Linux Foundation', year: 2026, status: 'Verified' }
    ],

    resume: {
      fileName: 'Tanvi_Joshi_Resume.pdf',
      status: 'Analyzed',
      score: 96,
      skillsFound: 18,
      projectsFound: 4,
      certificationsFound: 3,
      experience: 'AWS Summer SDE Intern'
    },

    careerPreferences: {
      roles: ['Cloud Systems Engineer', 'Backend SDE', 'Distributed Systems Architect'],
      industries: ['Cloud Infrastructure', 'Big Tech', 'FinTech'],
      locations: ['Bangalore', 'Mumbai', 'Seattle'],
      expectedSalary: '₹28–45 LPA',
      workPreference: 'Hybrid'
    },

    placementHistory: [
      { id: 'hist-11', status: 'Offer Accepted', company: 'Amazon', role: 'Software Development Engineer - I', date: 'Sep 25, 2026', type: 'placed' }
    ],

    eligibilitySnapshot: [
      { company: 'Amazon', eligible: true, reason: 'PPO Released & Formally Accepted (28.5 LPA)' }
    ],

    skillGaps: [
      { skill: 'Golang', status: 'Strong', level: '96%' },
      { skill: 'Kubernetes', status: 'Strong', level: '94%' },
      { skill: 'DSA', status: 'Strong', level: '95%' }
    ],

    aiSummary:
      'Top percentile achiever. Finalized super-dream offer at Amazon with 28.5 LPA package.',

    officerNotes: ['PPO documented and institutional compliance fulfilled.']
  },
  {
    id: 'CL-2028-0033',
    legacyId: 'std-108',
    name: 'Rohan Deshmukh',
    rollNo: '2024CS0033',
    department: 'Computer Science',
    departmentFullName: 'Computer Science & Engineering',
    deptCode: 'CSE',
    graduationYear: 2028,
    yearOfStudy: 'Third Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 8.6,
    tenthPercentage: 91,
    twelfthPercentage: 88,
    backlogs: 0,
    attendance: 90,
    semesterGpa: [8.2, 8.4, 8.7, 8.6],
    email: 'rohan.d@demo.campuscore',
    phone: '+91 98765 77665',
    location: 'Bangalore, India',
    linkedin: 'linkedin.com/in/rohan-deshmukh-demo',
    github: 'github.com/rohan-d-demo',
    avatar: 'RD',
    avatarBg: '#3978F6',

    readinessScore: 82,
    readinessLevel: 'Nearly Ready',
    readinessStatus: 'Nearly Ready',
    placementStatus: 'Not Placed',
    applicationsCount: 4,
    skillsCount: 12,

    readinessBreakdown: {
      technicalSkills: 86,
      academicEligibility: 84,
      projects: 80,
      resumeQuality: 78,
      communication: 80,
      certifications: 70
    },

    skills: ['C++', 'Data Structures', 'Python', 'React', 'SQL', 'Algorithms'],

    technicalSkills: {
      programming: [{ name: 'C++', proficiency: 'Advanced' }, { name: 'Python', proficiency: 'Intermediate' }],
      web: [{ name: 'React', proficiency: 'Intermediate' }],
      database: [{ name: 'SQL', proficiency: 'Intermediate' }],
      core: [{ name: 'Data Structures', proficiency: 'Advanced' }, { name: 'Algorithms', proficiency: 'Advanced' }]
    },

    projects: [
      {
        id: 'prj-11',
        name: 'Graph Visualizer Pro',
        description: 'Interactive visualization for Dijkstra, A*, and Bellman-Ford shortest path algorithms.',
        technologies: ['React', 'TypeScript', 'Canvas API'],
        impact: 'Used in university CS curriculum',
        github: 'https://github.com/demo/graph-visualizer',
        demoUrl: 'https://graph-vis.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-11', name: 'Algorithmic Toolbox', issuer: 'UC San Diego Coursera', year: 2025, status: 'Verified' }
    ],

    resume: {
      fileName: 'Rohan_Deshmukh_Resume.pdf',
      status: 'Analyzed',
      score: 79,
      skillsFound: 12,
      projectsFound: 2,
      certificationsFound: 1,
      experience: 'Competitive Programming Lead'
    },

    careerPreferences: {
      roles: ['Software Engineer Intern', 'Backend Developer'],
      industries: ['Product Software', 'FinTech'],
      locations: ['Bangalore', 'Hyderabad'],
      expectedSalary: '₹8–15 LPA',
      workPreference: 'Hybrid'
    },

    placementHistory: [
      { id: 'hist-12', status: 'Applied', company: 'Amazon', role: 'SDE Summer Intern', date: 'Oct 04, 2026', type: 'applied' }
    ],

    eligibilitySnapshot: [
      { company: 'Amazon', eligible: true, reason: 'Eligible for 2028 Summer Internship track' },
      { company: 'TCS', eligible: true, reason: 'Pre-placement test eligible' }
    ],

    skillGaps: [
      { skill: 'C++', status: 'Strong', level: '90%' },
      { skill: 'System Design', status: 'Needs Improvement', level: '45%' }
    ],

    aiSummary:
      'High competitive programming potential (LeetCode 1900+). Strong candidate for early internship placement in upcoming tech drives.',

    officerNotes: ['Pre-cleared for elite product internship drives.']
  },
  {
    id: 'CL-2028-0074',
    legacyId: 'std-109',
    name: 'Divya Nair',
    rollNo: '2024EE0074',
    department: 'Electrical',
    departmentFullName: 'Electrical & Electronics Engineering',
    deptCode: 'EEE',
    graduationYear: 2028,
    yearOfStudy: 'Third Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 7.9,
    tenthPercentage: 89,
    twelfthPercentage: 87,
    backlogs: 0,
    attendance: 89,
    semesterGpa: [7.5, 7.8, 8.0, 7.9],
    email: 'divya.nair@demo.campuscore',
    phone: '+91 98765 66554',
    location: 'Kochi, India',
    linkedin: 'linkedin.com/in/divya-nair-demo',
    github: 'github.com/divya-nair-demo',
    avatar: 'DN',
    avatarBg: '#F59E0B',

    readinessScore: 75,
    readinessLevel: 'Nearly Ready',
    readinessStatus: 'Nearly Ready',
    placementStatus: 'Not Placed',
    applicationsCount: 3,
    skillsCount: 10,

    readinessBreakdown: {
      technicalSkills: 76,
      academicEligibility: 80,
      projects: 74,
      resumeQuality: 72,
      communication: 75,
      certifications: 68
    },

    skills: ['C++', 'Python', 'MATLAB', 'Power Systems', 'PLC', 'SQL', 'Communication'],

    technicalSkills: {
      programming: [{ name: 'C++', proficiency: 'Intermediate' }, { name: 'Python', proficiency: 'Intermediate' }],
      web: [],
      database: [{ name: 'SQL Basics', proficiency: 'Beginner' }],
      core: [{ name: 'Power Systems', proficiency: 'Advanced' }, { name: 'MATLAB Simulink', proficiency: 'Advanced' }]
    },

    projects: [
      {
        id: 'prj-12',
        name: 'Microgrid Battery Inverter Simulation',
        description: 'Bidirectional DC-AC inverter simulation for rooftop PV installations with grid sync.',
        technologies: ['MATLAB', 'Simulink', 'C++'],
        impact: 'IEEE student conference paper presented',
        github: 'https://github.com/demo/microgrid-inverter',
        demoUrl: 'https://microgrid.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-12', name: 'Renewable Energy Integration', issuer: 'NPTEL', year: 2025, status: 'Verified' }
    ],

    resume: {
      fileName: 'Divya_Nair_Resume.pdf',
      status: 'Analyzed',
      score: 76,
      skillsFound: 10,
      projectsFound: 2,
      certificationsFound: 1,
      experience: 'State Electricity Board Intern'
    },

    careerPreferences: {
      roles: ['Power Systems Engineer', 'Smart Grid Analyst', 'Control Systems Engineer'],
      industries: ['Energy & Utilities', 'EV Infrastructure', 'Automation'],
      locations: ['Bangalore', 'Kochi', 'Chennai'],
      expectedSalary: '₹6–9 LPA',
      workPreference: 'On-site / Hybrid'
    },

    placementHistory: [
      { id: 'hist-13', status: 'Applied', company: 'Schneider Electric', role: 'Energy Trainee', date: 'Oct 03, 2026', type: 'applied' }
    ],

    eligibilitySnapshot: [
      { company: 'Schneider Electric', eligible: true, reason: 'Eligible for core electrical track' },
      { company: 'ABB India', eligible: true, reason: 'Eligible' }
    ],

    skillGaps: [
      { skill: 'MATLAB', status: 'Strong', level: '88%' },
      { skill: 'SQL', status: 'Needs Improvement', level: '50%' }
    ],

    aiSummary:
      'Solid electrical domain foundations with IEEE conference recognition. Good fit for core clean energy and power automation drives.',

    officerNotes: ['Encourage application to European smart energy multinationals.']
  },
  {
    id: 'CL-2027-0138',
    legacyId: 'std-110',
    name: 'Pooja Iyer',
    rollNo: '2023EC0138',
    department: 'Electronics & Communication',
    departmentFullName: 'Electronics & Communication Engineering',
    deptCode: 'ECE',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 8.2,
    tenthPercentage: 91,
    twelfthPercentage: 89,
    backlogs: 0,
    attendance: 92,
    semesterGpa: [7.8, 8.0, 8.2, 8.4, 8.2],
    email: 'pooja.iyer@demo.campuscore',
    phone: '+91 98765 55443',
    location: 'Bangalore, India',
    linkedin: 'linkedin.com/in/pooja-iyer-demo',
    github: 'github.com/pooja-iyer-demo',
    avatar: 'PI',
    avatarBg: '#8B5CF6',

    readinessScore: 84,
    readinessLevel: 'Nearly Ready',
    readinessStatus: 'Nearly Ready',
    placementStatus: 'Shortlisted',
    applicationsCount: 5,
    skillsCount: 13,

    readinessBreakdown: {
      technicalSkills: 86,
      academicEligibility: 85,
      projects: 84,
      resumeQuality: 82,
      communication: 85,
      certifications: 78
    },

    skills: ['C++', 'Python', 'Embedded C', 'VLSI', 'Data Structures', 'Linux', 'Communication'],

    technicalSkills: {
      programming: [{ name: 'C++', proficiency: 'Advanced' }, { name: 'Python', proficiency: 'Advanced' }],
      web: [],
      database: [{ name: 'SQL', proficiency: 'Intermediate' }],
      core: [{ name: 'VLSI Design', proficiency: 'Advanced' }, { name: 'Linux Kernel Modules', proficiency: 'Intermediate' }]
    },

    projects: [
      {
        id: 'prj-13',
        name: 'FPGA Cryptographic Accelerator',
        description: 'Hardware pipeline for AES-128 cryptographic operations on Xilinx Artix-7.',
        technologies: ['Verilog', 'Xilinx Vivado', 'C++'],
        impact: '4x throughput speedup over CPU software implementation',
        github: 'https://github.com/demo/fpga-crypto',
        demoUrl: 'https://fpga-crypto.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-13', name: 'Digital VLSI SoC Design', issuer: 'NPTEL', year: 2025, status: 'Verified' }
    ],

    resume: {
      fileName: 'Pooja_Iyer_Resume.pdf',
      status: 'Analyzed',
      score: 84,
      skillsFound: 13,
      projectsFound: 3,
      certificationsFound: 2,
      experience: 'Semiconductor Lab Trainee'
    },

    careerPreferences: {
      roles: ['Silicon Design Engineer', 'RTL Design Engineer', 'Embedded Software Engineer'],
      industries: ['Semiconductors', 'Hardware Tech', 'Automotive'],
      locations: ['Bangalore', 'Hyderabad', 'Noida'],
      expectedSalary: '₹10–18 LPA',
      workPreference: 'On-site'
    },

    placementHistory: [
      { id: 'hist-14', status: 'Shortlisted', company: 'Texas Instruments', role: 'Analog & Digital Intern', date: 'Sep 30, 2026', type: 'shortlisted' }
    ],

    eligibilitySnapshot: [
      { company: 'Texas Instruments', eligible: true, reason: 'Shortlisted for technical interviews' },
      { company: 'Intel', eligible: true, reason: 'Eligible for campus screening' }
    ],

    skillGaps: [
      { skill: 'Verilog', status: 'Strong', level: '88%' },
      { skill: 'SystemVerilog / UVM', status: 'Needs Improvement', level: '56%' }
    ],

    aiSummary:
      'High domain proficiency in silicon RTL and hardware acceleration. Well positioned for Tier-1 semiconductor roles.',

    officerNotes: ['TI interview scheduled for next week. Coordinated with dept lab for FPGA access.']
  },
  {
    id: 'CL-2029-0021',
    legacyId: 'std-111',
    name: 'Siddharth Varma',
    rollNo: '2025CS0021',
    department: 'Computer Science',
    departmentFullName: 'Computer Science & Engineering',
    deptCode: 'CSE',
    graduationYear: 2029,
    yearOfStudy: 'Second Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 8.8,
    tenthPercentage: 94,
    twelfthPercentage: 91,
    backlogs: 0,
    attendance: 92,
    semesterGpa: [8.6, 9.0],
    email: 'siddharth.v@demo.campuscore',
    phone: '+91 98765 44332',
    location: 'Hyderabad, India',
    linkedin: 'linkedin.com/in/siddharth-varma-demo',
    github: 'github.com/siddharth-v-demo',
    avatar: 'SV',
    avatarBg: '#3978F6',

    readinessScore: 78,
    readinessLevel: 'Nearly Ready',
    readinessStatus: 'Nearly Ready',
    placementStatus: 'Not Placed',
    applicationsCount: 1,
    skillsCount: 10,

    readinessBreakdown: {
      technicalSkills: 82,
      academicEligibility: 85,
      projects: 75,
      resumeQuality: 74,
      communication: 78,
      certifications: 66
    },

    skills: ['Python', 'Java', 'React', 'Data Structures', 'SQL', 'Git'],

    technicalSkills: {
      programming: [{ name: 'Python', proficiency: 'Advanced' }, { name: 'Java', proficiency: 'Intermediate' }],
      web: [{ name: 'React', proficiency: 'Intermediate' }],
      database: [{ name: 'SQLite / PostgreSQL', proficiency: 'Intermediate' }],
      core: [{ name: 'Data Structures', proficiency: 'Advanced' }]
    },

    projects: [
      {
        id: 'prj-14',
        name: 'AlgoSprint Leaderboard',
        description: 'Real-time student batch problem-solving leaderboard syncing Codeforces submissions.',
        technologies: ['React', 'FastAPI', 'PostgreSQL'],
        impact: 'Tracks 120 college competitive coders daily',
        github: 'https://github.com/demo/algosprint',
        demoUrl: 'https://algosprint.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-14', name: 'Python Specialization', issuer: 'University of Michigan', year: 2025, status: 'Verified' }
    ],

    resume: {
      fileName: 'Siddharth_Varma_Resume.pdf',
      status: 'Analyzed',
      score: 78,
      skillsFound: 10,
      projectsFound: 2,
      certificationsFound: 1,
      experience: 'Open Source Contributor'
    },

    careerPreferences: {
      roles: ['Software Engineer Intern', 'Backend Developer'],
      industries: ['FinTech', 'SaaS'],
      locations: ['Hyderabad', 'Bangalore'],
      expectedSalary: '₹8–14 LPA',
      workPreference: 'Hybrid'
    },

    placementHistory: [
      { id: 'hist-15', status: 'Applied', company: 'Google', role: 'STEP Intern 2027', date: 'Oct 01, 2026', type: 'applied' }
    ],

    eligibilitySnapshot: [
      { company: 'Google', eligible: true, reason: 'Eligible for STEP sophomore internship' }
    ],

    skillGaps: [
      { skill: 'Data Structures', status: 'Strong', level: '86%' },
      { skill: 'System Design', status: 'Needs Improvement', level: '40%' }
    ],

    aiSummary:
      'High-potential sophomore student with impressive early DSA mastery. Strong contender for 2027 summer early-career programs.',

    officerNotes: ['Nominated for university Google STEP cohort coaching.']
  },
  {
    id: 'CL-2027-0164',
    legacyId: 'std-112',
    name: 'Meera Nambiar',
    rollNo: '2023IT0164',
    department: 'Information Technology',
    departmentFullName: 'Information Technology',
    deptCode: 'IT',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 8.5,
    tenthPercentage: 92,
    twelfthPercentage: 90,
    backlogs: 0,
    attendance: 94,
    semesterGpa: [8.1, 8.3, 8.6, 8.7, 8.5],
    email: 'meera.nambiar@demo.campuscore',
    phone: '+91 98765 11223',
    location: 'Bangalore, India',
    linkedin: 'linkedin.com/in/meera-nambiar-demo',
    github: 'github.com/meera-n-demo',
    avatar: 'MN',
    avatarBg: '#0E8EA8',

    readinessScore: 88,
    readinessLevel: 'Job Ready',
    readinessStatus: 'Job Ready',
    placementStatus: 'Shortlisted',
    applicationsCount: 7,
    skillsCount: 14,

    readinessBreakdown: {
      technicalSkills: 90,
      academicEligibility: 88,
      projects: 86,
      resumeQuality: 88,
      communication: 90,
      certifications: 80
    },

    skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'SQL', 'Data Structures', 'Communication'],

    technicalSkills: {
      programming: [{ name: 'JavaScript', proficiency: 'Advanced' }, { name: 'Python', proficiency: 'Intermediate' }],
      web: [{ name: 'React', proficiency: 'Advanced' }, { name: 'Node.js', proficiency: 'Advanced' }],
      database: [{ name: 'MongoDB', proficiency: 'Advanced' }, { name: 'PostgreSQL', proficiency: 'Intermediate' }],
      core: [{ name: 'AWS Cloud Services', proficiency: 'Advanced' }, { name: 'Data Structures', proficiency: 'Advanced' }]
    },

    projects: [
      {
        id: 'prj-15',
        name: 'Serverless Event Streamer',
        description: 'Event-driven real-time alert architecture built using AWS Lambda, DynamoDB, and API Gateway.',
        technologies: ['AWS Lambda', 'Node.js', 'DynamoDB'],
        impact: 'Processes 10k messages/min during stress benchmarks',
        github: 'https://github.com/demo/serverless-streamer',
        demoUrl: 'https://streamer.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-15', name: 'AWS Certified Developer - Associate', issuer: 'Amazon Web Services', year: 2026, status: 'Verified' }
    ],

    resume: {
      fileName: 'Meera_Nambiar_Resume.pdf',
      status: 'Analyzed',
      score: 86,
      skillsFound: 14,
      projectsFound: 3,
      certificationsFound: 2,
      experience: 'Cloud Consultant Intern'
    },

    careerPreferences: {
      roles: ['Cloud Engineer', 'Backend SDE', 'Full Stack Developer'],
      industries: ['SaaS', 'Cloud Infrastructure', 'FinTech'],
      locations: ['Bangalore', 'Pune', 'Hyderabad'],
      expectedSalary: '₹9–15 LPA',
      workPreference: 'Hybrid'
    },

    placementHistory: [
      { id: 'hist-16', status: 'Shortlisted', company: 'Accenture', role: 'Advanced Application Analyst', date: 'Sep 29, 2026', type: 'shortlisted' }
    ],

    eligibilitySnapshot: [
      { company: 'Accenture', eligible: true, reason: 'Shortlisted for technical interviews' },
      { company: 'TCS', eligible: true, reason: 'Eligible for Prime cadre' }
    ],

    skillGaps: [
      { skill: 'AWS', status: 'Strong', level: '92%' },
      { skill: 'React', status: 'Strong', level: '90%' },
      { skill: 'Java', status: 'Needs Improvement', level: '52%' }
    ],

    aiSummary:
      'Certified AWS associate with strong asynchronous microservice foundations. Well rounded and client-facing ready.',

    officerNotes: ['Excellent communication score in mock GD. Recommended for client-facing consultancy drives.']
  },
  {
    id: 'CL-2027-0177',
    legacyId: 'std-113',
    name: 'Harish Ranganathan',
    rollNo: '2023ME0177',
    department: 'Mechanical',
    departmentFullName: 'Mechanical Engineering',
    deptCode: 'Mechanical',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 6.9,
    tenthPercentage: 80,
    twelfthPercentage: 78,
    backlogs: 0,
    attendance: 83,
    semesterGpa: [6.6, 6.8, 7.0, 7.1, 6.9],
    email: 'harish.r@demo.campuscore',
    phone: '+91 98765 99001',
    location: 'Coimbatore, India',
    linkedin: 'linkedin.com/in/harish-r-demo',
    github: 'github.com/harish-r-demo',
    avatar: 'HR',
    avatarBg: '#EC4899',

    readinessScore: 58,
    readinessLevel: 'Needs Improvement',
    readinessStatus: 'Needs Improvement',
    placementStatus: 'Not Placed',
    applicationsCount: 3,
    skillsCount: 7,

    readinessBreakdown: {
      technicalSkills: 60,
      academicEligibility: 66,
      projects: 56,
      resumeQuality: 60,
      communication: 52,
      certifications: 48
    },

    skills: ['AutoCAD', 'SolidWorks', 'Thermodynamics', 'Communication'],

    technicalSkills: {
      programming: [],
      web: [],
      database: [],
      core: [{ name: 'AutoCAD', proficiency: 'Advanced' }, { name: 'Manufacturing Processes', proficiency: 'Intermediate' }]
    },

    projects: [
      {
        id: 'prj-16',
        name: 'Automated Hydraulic Braking Rig',
        description: 'Fabrication of miniature pneumatic/hydraulic test rig for dual-circuit passenger cars.',
        technologies: ['SolidWorks', 'Hydraulic Actuators'],
        impact: 'Built working lab demonstrator rig',
        github: 'https://github.com/demo/brake-rig',
        demoUrl: 'https://brake-rig.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-16', name: 'Industrial Hydraulics & Pneumatics', issuer: 'Festo Didactic', year: 2025, status: 'Verified' }
    ],

    resume: {
      fileName: 'Harish_R_Resume.pdf',
      status: 'Analyzed',
      score: 60,
      skillsFound: 7,
      projectsFound: 1,
      certificationsFound: 1,
      experience: 'Plant Maintenance Trainee'
    },

    careerPreferences: {
      roles: ['Operations Engineer', 'Plant Quality Engineer'],
      industries: ['Manufacturing', 'Automotive'],
      locations: ['Chennai', 'Coimbatore', 'Bangalore'],
      expectedSalary: '₹4–6 LPA',
      workPreference: 'On-site'
    },

    placementHistory: [
      { id: 'hist-17', status: 'Applied', company: 'Ashok Leyland', role: 'GET Manufacturing', date: 'Oct 01, 2026', type: 'applied' }
    ],

    eligibilitySnapshot: [
      { company: 'Ashok Leyland', eligible: true, reason: 'Eligible for manufacturing slot' },
      { company: 'TCS', eligible: false, reason: 'Requires minimum 7.0 CGPA' }
    ],

    skillGaps: [
      { skill: 'Aptitude Reasoning', status: 'Needs Improvement', level: '48%' },
      { skill: 'Communication', status: 'Needs Improvement', level: '50%' }
    ],

    aiSummary:
      'Core manufacturing practical background. Needs remedial support in quantitative aptitude to clear Tier-2 corporate assessments.',

    officerNotes: ['Advised to attend Tuesday & Thursday aptitude practice modules.']
  },
  {
    id: 'CL-2027-0188',
    legacyId: 'std-114',
    name: 'Swati Kulkarni',
    rollNo: '2023CS0188',
    department: 'Computer Science',
    departmentFullName: 'Computer Science & Engineering',
    deptCode: 'CSE',
    graduationYear: 2027,
    yearOfStudy: 'Final Year',
    degree: 'B.Tech',
    university: 'Demo Engineering University',
    cgpa: 8.9,
    tenthPercentage: 93,
    twelfthPercentage: 91,
    backlogs: 0,
    attendance: 96,
    semesterGpa: [8.5, 8.8, 9.0, 9.1, 8.9],
    email: 'swati.k@demo.campuscore',
    phone: '+91 98765 88990',
    location: 'Pune, India',
    linkedin: 'linkedin.com/in/swati-kulkarni-demo',
    github: 'github.com/swati-k-demo',
    avatar: 'SK',
    avatarBg: '#3978F6',

    readinessScore: 91,
    readinessLevel: 'Job Ready',
    readinessStatus: 'Job Ready',
    placementStatus: 'Shortlisted',
    applicationsCount: 6,
    skillsCount: 15,

    readinessBreakdown: {
      technicalSkills: 93,
      academicEligibility: 90,
      projects: 91,
      resumeQuality: 89,
      communication: 92,
      certifications: 84
    },

    skills: ['Java', 'Spring Boot', 'React', 'SQL', 'Data Structures', 'Docker', 'AWS', 'Communication'],

    technicalSkills: {
      programming: [{ name: 'Java', proficiency: 'Advanced' }, { name: 'Python', proficiency: 'Intermediate' }],
      web: [{ name: 'React', proficiency: 'Advanced' }, { name: 'Spring Boot', proficiency: 'Advanced' }],
      database: [{ name: 'SQL', proficiency: 'Advanced' }, { name: 'MongoDB', proficiency: 'Intermediate' }],
      core: [{ name: 'Data Structures', proficiency: 'Advanced' }, { name: 'Docker', proficiency: 'Intermediate' }]
    },

    projects: [
      {
        id: 'prj-17',
        name: 'Enterprise Inventory Microservices',
        description: 'Resilient event-sourced order fulfillment engine built with Spring Cloud and Kafka.',
        technologies: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL'],
        impact: 'Sub-40ms P99 order placement latency',
        github: 'https://github.com/demo/inventory-microservices',
        demoUrl: 'https://inventory.demo.app'
      }
    ],

    certifications: [
      { id: 'cert-17', name: 'Oracle Certified Professional: Java SE 17', issuer: 'Oracle', year: 2025, status: 'Verified' }
    ],

    resume: {
      fileName: 'Swati_Kulkarni_Resume.pdf',
      status: 'Analyzed',
      score: 90,
      skillsFound: 15,
      projectsFound: 3,
      certificationsFound: 2,
      experience: 'FinTech Backend Intern'
    },

    careerPreferences: {
      roles: ['Software Engineer', 'Backend Java Developer', 'Cloud Engineer'],
      industries: ['Banking & FinTech', 'Enterprise SaaS'],
      locations: ['Pune', 'Mumbai', 'Bangalore'],
      expectedSalary: '₹10–18 LPA',
      workPreference: 'Hybrid'
    },

    placementHistory: [
      { id: 'hist-18', status: 'Shortlisted', company: 'Barclays Global', role: 'Graduate Analyst', date: 'Oct 02, 2026', type: 'shortlisted' }
    ],

    eligibilitySnapshot: [
      { company: 'Barclays', eligible: true, reason: 'Shortlisted for Technical Assessment' },
      { company: 'TCS', eligible: true, reason: 'Eligible for Prime Cadre' }
    ],

    skillGaps: [
      { skill: 'Java', status: 'Strong', level: '96%' },
      { skill: 'Spring Boot', status: 'Strong', level: '92%' },
      { skill: 'System Design', status: 'Strong', level: '84%' }
    ],

    aiSummary:
      'Premier Java and microservices specialist with recognized industry certification. Highly favored for banking & enterprise backend recruitment.',

    officerNotes: ['Strong performance in mock interview. Recommended for high-tier FinTech roles.']
  }
];

export const STUDENTS = INITIAL_STUDENTS;
