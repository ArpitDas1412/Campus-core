// CampusLink — Layer 6 Recruiter & Company Portal Data Store

export const INITIAL_COMPANY = {
  id: 'COMP-001',
  name: 'TechNova Solutions',
  tagline: 'Technology & Digital Services',
  founded: 2014,
  size: '2,500+ Employees',
  hq: 'Bangalore, Karnataka, India',
  website: 'www.technova.example',
  email: 'campus.hiring@technova.example',
  phone: '+91 80 4920 1100',
  about: 'TechNova Solutions is a global enterprise software and digital cloud engineering firm powering critical business systems across Fortune 500 enterprises, fintech, and intelligent platforms. We partner with tier-1 universities to nurture top engineering talent.',
  logoText: 'TN',
  brandColor: '#2563EB',
  recruiter: {
    name: 'Ananya Mehta',
    role: 'Talent Acquisition Manager',
    email: 'recruiter@campuscore.demo',
    phone: '+91 98450 12890',
    avatar: 'AM'
  },
  preferences: {
    preferredDepartments: ['CSE', 'IT', 'ECE'],
    preferredGraduationYears: [2027],
    minCGPA: 7.5,
    maxBacklogs: 0,
    preferredSkills: ['Java', 'Python', 'React', 'SQL', 'AWS', 'Docker', 'Spring Boot'],
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Remote / Hybrid'],
    workModes: ['Hybrid', 'On-site', 'Remote']
  }
};

export const INITIAL_JOBS = [
  {
    id: 'JOB-2027-001',
    title: 'Software Engineer',
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    type: 'Full-time',
    department: 'Engineering',
    location: 'Bangalore',
    workMode: 'Hybrid',
    salary: '₹8–10 LPA',
    openings: 25,
    applicationsCount: 248,
    eligibleCount: 126,
    aiRecommendedCount: 58,
    shortlistedCount: 34,
    interviewsCount: 16,
    offersCount: 7,
    deadline: '18 Oct 2026',
    status: 'Active',
    description: 'TechNova Solutions is seeking forward-thinking Software Engineering Graduates to build resilient microservices, distributed cloud backends, and responsive enterprise interfaces. As a software engineer in our core engineering cohort, you will design scalable REST APIs, optimize database queries, and contribute to cutting-edge cloud architectures.',
    responsibilities: [
      'Design, construct, and maintain efficient, reusable, and dependable Java/Node.js microservices.',
      'Collaborate with cross-functional product and cloud infrastructure teams.',
      'Participate actively in code reviews, automated CI/CD pipelines, and unit test suites.',
      'Optimize SQL queries and relational database schemas for high-throughput transactional systems.'
    ],
    qualifications: [
      'B.Tech / B.E. in Computer Science, Information Technology, or Electronics & Communication graduating in 2027.',
      'Cumulative CGPA of 7.5 and above with no active academic backlogs.',
      'Strong foundational grasp of Object-Oriented Programming, Data Structures, and Algorithms.'
    ],
    technicalRequirements: [
      'Demonstrated proficiency in Java, Python, or Modern JavaScript.',
      'Hands-on project experience with REST APIs and SQL / Relational Databases.',
      'Familiarity with version control using Git and GitHub collaborative workflows.'
    ],
    preferredQualifications: [
      'Prior internship or verifiable open-source contribution experience.',
      'Exposure to AWS Cloud Practitioner or equivalent cloud infrastructure.',
      'Experience with modern frontend stacks such as React.js.'
    ],
    benefits: [
      'Competitive compensation (₹8–10 LPA) + ₹1.5L Joining Bonus',
      'Comprehensive Health & Wellness Insurance (₹10L coverage for family)',
      'Annual Learning & Certification Sponsorship Budget (₹50,000/yr)',
      'Flexible Hybrid Work Model (2 days remote per week)',
      'Structured 6-month Engineering Mentorship & Fast-track Career Ladder'
    ],
    requiredSkills: [
      { name: 'Java', level: 'Advanced', importance: 'High' },
      { name: 'Data Structures', level: 'Advanced', importance: 'High' },
      { name: 'SQL', level: 'Intermediate', importance: 'High' },
      { name: 'Git', level: 'Intermediate', importance: 'Medium' },
      { name: 'REST APIs', level: 'Intermediate', importance: 'High' }
    ],
    preferredSkills: ['AWS', 'Docker', 'React', 'Spring Boot', 'Kubernetes', 'Python'],
    eligibility: {
      minCGPA: 7.5,
      maxBacklogs: 0,
      departments: ['CSE', 'IT', 'ECE'],
      graduationYear: 2027,
      degree: ['B.Tech', 'B.E.'],
      requiredCertifications: false,
      requiredInternship: false,
      allowEquivalent: true
    },
    selectionProcess: [
      { step: 1, name: 'Resume Screening', type: 'Assessment', duration: '1–2 Days', description: 'Automated ATS parsing, competency alignment, and eligibility verification.' },
      { step: 2, name: 'Online Assessment', type: 'Assessment', duration: '90 Mins', description: 'Coding assessment covering Data Structures, SQL, and core CS fundamentals.' },
      { step: 3, name: 'Technical Interview', type: 'Technical Interview', duration: '45 Mins', description: 'System design fundamentals, project architecture review, and live coding.' },
      { step: 4, name: 'HR Interview', type: 'HR Interview', duration: '30 Mins', description: 'Cultural fit, team collaboration, career aspirations, and compensation briefing.' },
      { step: 5, name: 'Final Selection', type: 'Other', duration: '1 Day', description: 'Final offer release, institutional compliance sign-off, and onboarding briefing.' }
    ],
    schedule: {
      applicationStart: '01 Oct 2026',
      applicationDeadline: '18 Oct 2026',
      assessmentDate: '21 Oct 2026',
      interviewStart: '24 Oct 2026',
      interviewEnd: '28 Oct 2026',
      joiningTimeline: 'July 2027',
      mode: 'Hybrid',
      location: 'TechNova Campus, Outer Ring Rd, Bangalore'
    },
    createdAt: '2026-10-01'
  },
  {
    id: 'JOB-2027-002',
    title: 'Data Analyst',
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    type: 'Full-time',
    department: 'Analytics',
    location: 'Hyderabad',
    workMode: 'On-site',
    salary: '₹7–9 LPA',
    openings: 15,
    applicationsCount: 142,
    eligibleCount: 78,
    aiRecommendedCount: 36,
    shortlistedCount: 21,
    interviewsCount: 10,
    offersCount: 4,
    deadline: '22 Oct 2026',
    status: 'Active',
    description: 'Transform complex enterprise data into strategic business intelligence. You will analyze student engagement metrics, operational telemetry, and predictive customer churn patterns using advanced SQL, Python analytics libraries, and executive BI dashboards.',
    responsibilities: [
      'Build automated reporting pipelines and executive dashboards in PowerBI / Tableau.',
      'Perform exploratory data analysis and root cause investigations using SQL and Python.',
      'Collaborate with business leadership to define KPIs and measurement frameworks.'
    ],
    qualifications: [
      'B.Tech / B.E. across all engineering disciplines with strong analytical aptitude.',
      'Minimum CGPA 7.0 with 0 active backlogs.'
    ],
    technicalRequirements: [
      'Advanced SQL query writing (joins, window functions, CTEs).',
      'Python data analysis experience (pandas, numpy, matplotlib).',
      'Business intelligence dashboarding (PowerBI or Tableau).'
    ],
    preferredQualifications: ['Statistical modeling, Machine Learning fundamentals, BigQuery.'],
    benefits: ['Competitive salary', 'Health insurance', 'Annual bonus', 'Learning allowance'],
    requiredSkills: [
      { name: 'Python', level: 'Intermediate', importance: 'High' },
      { name: 'SQL', level: 'Advanced', importance: 'High' },
      { name: 'Data Analysis', level: 'Advanced', importance: 'High' },
      { name: 'PowerBI', level: 'Intermediate', importance: 'Medium' }
    ],
    preferredSkills: ['Pandas', 'Machine Learning', 'Statistics', 'Cloud DW'],
    eligibility: {
      minCGPA: 7.0,
      maxBacklogs: 0,
      departments: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical'],
      graduationYear: 2027,
      degree: ['B.Tech', 'B.E.'],
      requiredCertifications: false,
      requiredInternship: false,
      allowEquivalent: true
    },
    selectionProcess: [
      { step: 1, name: 'Resume Screening', type: 'Assessment', duration: '1 Day', description: 'Screening for SQL & Python coursework.' },
      { step: 2, name: 'Analytics Aptitude Test', type: 'Assessment', duration: '60 Mins', description: 'Data interpretation and SQL logic.' },
      { step: 3, name: 'Technical Evaluation', type: 'Technical Interview', duration: '45 Mins', description: 'Case study analysis and data visualization.' },
      { step: 4, name: 'HR Discussion', type: 'HR Interview', duration: '30 Mins', description: 'Role alignment.' }
    ],
    schedule: {
      applicationStart: '05 Oct 2026',
      applicationDeadline: '22 Oct 2026',
      assessmentDate: '25 Oct 2026',
      interviewStart: '28 Oct 2026',
      interviewEnd: '31 Oct 2026',
      joiningTimeline: 'August 2027',
      mode: 'On-site',
      location: 'HITEC City, Hyderabad'
    },
    createdAt: '2026-10-03'
  },
  {
    id: 'JOB-2027-003',
    title: 'Frontend Developer',
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    type: 'Full-time',
    department: 'Product',
    location: 'Remote / Hybrid',
    workMode: 'Hybrid',
    salary: '₹8–11 LPA',
    openings: 12,
    applicationsCount: 96,
    eligibleCount: 52,
    aiRecommendedCount: 24,
    shortlistedCount: 18,
    interviewsCount: 8,
    offersCount: 4,
    deadline: '26 Oct 2026',
    status: 'Active',
    description: 'Create lightning-fast, pixel-perfect user experiences for our next-generation SaaS cloud platforms using React, TypeScript, and modern design systems.',
    responsibilities: [
      'Develop modern, responsive web components and interactive data dashboards.',
      'Collaborate closely with UI/UX designers to translate Figma mockups into production code.',
      'Optimize web performance, Core Web Vitals, and cross-browser accessibility.'
    ],
    qualifications: ['B.Tech / B.E. in CSE, IT, ECE with CGPA ≥ 7.2.'],
    technicalRequirements: ['Modern React.js (Hooks, Context, State Management)', 'JavaScript ES6+, HTML5, CSS3', 'REST API integration'],
    preferredQualifications: ['TypeScript, Next.js, Tailwind CSS, Responsive Web Design.'],
    benefits: ['Flexible remote work policy', 'Home office stipend', 'Health benefits', 'Certification sponsorships'],
    requiredSkills: [
      { name: 'React', level: 'Advanced', importance: 'High' },
      { name: 'JavaScript', level: 'Advanced', importance: 'High' },
      { name: 'HTML/CSS', level: 'Advanced', importance: 'High' },
      { name: 'REST APIs', level: 'Intermediate', importance: 'High' }
    ],
    preferredSkills: ['TypeScript', 'Next.js', 'Tailwind', 'GraphQL'],
    eligibility: {
      minCGPA: 7.2,
      maxBacklogs: 0,
      departments: ['CSE', 'IT', 'ECE'],
      graduationYear: 2027,
      degree: ['B.Tech', 'B.E.'],
      requiredCertifications: false,
      requiredInternship: false,
      allowEquivalent: true
    },
    selectionProcess: [
      { step: 1, name: 'Portfolio & Resume Review', type: 'Assessment', duration: '1 Day', description: 'Review GitHub and live project links.' },
      { step: 2, name: 'UI Machine Coding Round', type: 'Assessment', duration: '90 Mins', description: 'Build interactive React component from design.' },
      { step: 3, name: 'Frontend Technical Interview', type: 'Technical Interview', duration: '45 Mins', description: 'Deep dive into DOM, state, and web performance.' },
      { step: 4, name: 'HR & Cultural Alignment', type: 'HR Interview', duration: '30 Mins', description: 'Final round.' }
    ],
    schedule: {
      applicationStart: '08 Oct 2026',
      applicationDeadline: '26 Oct 2026',
      assessmentDate: '29 Oct 2026',
      interviewStart: '02 Nov 2026',
      interviewEnd: '06 Nov 2026',
      joiningTimeline: 'July 2027',
      mode: 'Hybrid',
      location: 'Bangalore & Remote'
    },
    createdAt: '2026-10-04'
  },
  {
    id: 'JOB-2027-004',
    title: 'Cloud Support Engineer',
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    type: 'Full-time',
    department: 'Cloud Operations',
    location: 'Pune',
    workMode: 'On-site',
    salary: '₹6.5–8.5 LPA',
    openings: 20,
    applicationsCount: 198,
    eligibleCount: 56,
    aiRecommendedCount: 10,
    shortlistedCount: 13,
    interviewsCount: 8,
    offersCount: 3,
    deadline: '30 Oct 2026',
    status: 'Draft',
    description: 'Ensure 99.99% uptime and reliability for enterprise cloud deployments across AWS and Azure infrastructures. Troubleshoot network anomalies, automate operational scripts, and assist client DevOps teams.',
    responsibilities: [
      'Monitor multi-region cloud infrastructure and respond to observability alerts.',
      'Script operational automations in Bash and Python.',
      'Collaborate with cloud engineers to diagnose service disruptions and deployment rollbacks.'
    ],
    qualifications: ['B.Tech / B.E. in CSE, IT, ECE, EEE with CGPA ≥ 6.8.'],
    technicalRequirements: ['Linux fundamentals and CLI commands', 'Networking protocols (TCP/IP, DNS, HTTP/S)', 'Basic cloud service awareness'],
    preferredQualifications: ['AWS Cloud Practitioner, Azure Fundamentals, Docker containers.'],
    benefits: ['Night shift differential allowances', 'Comprehensive medical cover', 'Annual bonus'],
    requiredSkills: [
      { name: 'Linux', level: 'Intermediate', importance: 'High' },
      { name: 'Networking', level: 'Intermediate', importance: 'High' },
      { name: 'Cloud Fundamentals', level: 'Intermediate', importance: 'High' }
    ],
    preferredSkills: ['AWS', 'Azure', 'Bash', 'Docker'],
    eligibility: {
      minCGPA: 6.8,
      maxBacklogs: 1,
      departments: ['CSE', 'IT', 'ECE', 'EEE'],
      graduationYear: 2027,
      degree: ['B.Tech', 'B.E.'],
      requiredCertifications: false,
      requiredInternship: false,
      allowEquivalent: true
    },
    selectionProcess: [
      { step: 1, name: 'Resume Verification', type: 'Assessment', duration: '1 Day', description: 'Academic criteria validation.' },
      { step: 2, name: 'Technical & Linux Test', type: 'Assessment', duration: '60 Mins', description: 'Linux command line and network routing concepts.' },
      { step: 3, name: 'Technical Discussion', type: 'Technical Interview', duration: '40 Mins', description: 'Troubleshooting scenarios.' },
      { step: 4, name: 'HR Interview', type: 'HR Interview', duration: '20 Mins', description: 'Shift flexibility and joining terms.' }
    ],
    schedule: {
      applicationStart: '12 Oct 2026',
      applicationDeadline: '30 Oct 2026',
      assessmentDate: '03 Nov 2026',
      interviewStart: '07 Nov 2026',
      interviewEnd: '10 Nov 2026',
      joiningTimeline: 'July 2027',
      mode: 'On-site',
      location: 'Magarpatta Cybercity, Pune'
    },
    createdAt: '2026-10-04'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'APP-001',
    jobId: 'JOB-2027-001',
    studentId: 'std-1',
    candidateName: 'Rahul Kumar',
    department: 'Computer Science & Engineering',
    cgpa: 8.7,
    skills: ['Java', 'Python', 'React', 'SQL', 'Node.js', 'REST APIs', 'Git'],
    readinessScore: 91,
    preliminaryMatchScore: 91,
    status: 'Eligible',
    stage: 'Shortlisted', // 'Applications', 'Eligible', 'AI Recommended', 'Shortlisted', 'Interview', 'Offers', 'Rejected'
    appliedAt: '02 Oct 2026',
    lastUpdated: '04 Oct 2026',
    notes: 'Strong backend foundation; completed CampusConnect full-stack platform; AWS cert verified.'
  },
  {
    id: 'APP-002',
    jobId: 'JOB-2027-001',
    studentId: 'std-2',
    candidateName: 'Sneha Reddy',
    department: 'Information Technology',
    cgpa: 9.1,
    skills: ['Java', 'Spring Boot', 'SQL', 'Docker', 'AWS', 'Microservices'],
    readinessScore: 94,
    preliminaryMatchScore: 94,
    status: 'Eligible',
    stage: 'Interview',
    appliedAt: '01 Oct 2026',
    lastUpdated: '03 Oct 2026',
    notes: 'Exceptional competitive programmer, solved 450+ problems, prior Google Summer of Code contributor.'
  },
  {
    id: 'APP-003',
    jobId: 'JOB-2027-001',
    studentId: 'std-3',
    candidateName: 'Vikramaditya Rao',
    department: 'Electronics & Communication',
    cgpa: 8.4,
    skills: ['C++', 'Python', 'Data Structures', 'Linux', 'SQL'],
    readinessScore: 82,
    preliminaryMatchScore: 82,
    status: 'Eligible',
    stage: 'AI Recommended',
    appliedAt: '02 Oct 2026',
    lastUpdated: '03 Oct 2026',
    notes: 'Solid core algorithms and system programming background; exploring backend web architectures.'
  },
  {
    id: 'APP-004',
    jobId: 'JOB-2027-001',
    studentId: 'std-4',
    candidateName: 'Priya Nair',
    department: 'Computer Science & Engineering',
    cgpa: 8.9,
    skills: ['Java', 'React', 'SQL', 'REST APIs', 'Python'],
    readinessScore: 89,
    preliminaryMatchScore: 89,
    status: 'Eligible',
    stage: 'Shortlisted',
    appliedAt: '03 Oct 2026',
    lastUpdated: '04 Oct 2026',
    notes: 'Top 5% in CSE cohort; built smart health surveillance portal; high clarity and communication.'
  },
  {
    id: 'APP-005',
    jobId: 'JOB-2027-001',
    studentId: 'std-5',
    candidateName: 'Anand Verma',
    department: 'Computer Science & Engineering',
    cgpa: 7.4,
    skills: ['Java', 'SQL', 'C++'],
    readinessScore: 71,
    preliminaryMatchScore: 68,
    status: 'Ineligible',
    stage: 'Applications',
    appliedAt: '03 Oct 2026',
    lastUpdated: '03 Oct 2026',
    ineligibilityReason: 'CGPA (7.4) below minimum threshold of 7.5.'
  },
  {
    id: 'APP-006',
    jobId: 'JOB-2027-001',
    studentId: 'std-6',
    candidateName: 'Deepak Joshi',
    department: 'Information Technology',
    cgpa: 8.2,
    skills: ['Java', 'Spring Boot', 'SQL', 'Docker'],
    readinessScore: 84,
    preliminaryMatchScore: 86,
    status: 'Eligible',
    stage: 'AI Recommended',
    appliedAt: '02 Oct 2026',
    lastUpdated: '03 Oct 2026'
  },
  {
    id: 'APP-007',
    jobId: 'JOB-2027-001',
    studentId: 'std-7',
    candidateName: 'Aishwarya Sen',
    department: 'Computer Science & Engineering',
    cgpa: 8.8,
    skills: ['Java', 'Python', 'Data Structures', 'SQL', 'AWS'],
    readinessScore: 90,
    preliminaryMatchScore: 92,
    status: 'Eligible',
    stage: 'Interview',
    appliedAt: '01 Oct 2026',
    lastUpdated: '04 Oct 2026'
  },
  {
    id: 'APP-008',
    jobId: 'JOB-2027-003',
    studentId: 'std-8',
    candidateName: 'Rohan Gupta',
    department: 'Computer Science & Engineering',
    cgpa: 9.0,
    skills: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'HTML/CSS', 'Tailwind'],
    readinessScore: 95,
    preliminaryMatchScore: 96,
    status: 'Eligible',
    stage: 'Offers',
    appliedAt: '01 Oct 2026',
    lastUpdated: '04 Oct 2026',
    notes: 'Outstanding frontend engineer; built 3 production client portals; offer released at 10.5 LPA.'
  },
  {
    id: 'APP-009',
    jobId: 'JOB-2027-002',
    studentId: 'std-9',
    candidateName: 'Divya Krishnan',
    department: 'Information Technology',
    cgpa: 8.6,
    skills: ['Python', 'SQL', 'PowerBI', 'Pandas', 'Statistics'],
    readinessScore: 88,
    preliminaryMatchScore: 89,
    status: 'Eligible',
    stage: 'Offers',
    appliedAt: '02 Oct 2026',
    lastUpdated: '04 Oct 2026'
  },
  {
    id: 'APP-010',
    jobId: 'JOB-2027-001',
    studentId: 'std-10',
    candidateName: 'Karthik Raja',
    department: 'Mechanical Engineering',
    cgpa: 7.8,
    skills: ['Python', 'CAD', 'C++'],
    readinessScore: 64,
    preliminaryMatchScore: 48,
    status: 'Ineligible',
    stage: 'Rejected',
    appliedAt: '03 Oct 2026',
    lastUpdated: '04 Oct 2026',
    ineligibilityReason: 'Department (Mechanical) not in allowed list [CSE, IT, ECE].'
  }
];

export const INITIAL_INTERVIEWS = [
  {
    id: 'INT-001',
    candidateId: 'std-1',
    candidateName: 'Rahul Kumar',
    jobId: 'JOB-2027-001',
    jobTitle: 'Software Engineer',
    stage: 'Technical Interview',
    date: '18 Oct 2026',
    time: '10:30 AM',
    duration: '45 mins',
    mode: 'Online (Google Meet)',
    meetingLink: 'https://meet.google.com/demo-tns-rahul',
    interviewerName: 'Rajiv Sen',
    interviewerRole: 'Lead Software Architect',
    status: 'Upcoming' // 'Upcoming', 'Completed', 'Rescheduled', 'Cancelled'
  },
  {
    id: 'INT-002',
    candidateId: 'std-2',
    candidateName: 'Sneha Reddy',
    jobId: 'JOB-2027-001',
    jobTitle: 'Software Engineer',
    stage: 'HR & Cultural Alignment',
    date: '19 Oct 2026',
    time: '02:00 PM',
    duration: '30 mins',
    mode: 'Online (Google Meet)',
    meetingLink: 'https://meet.google.com/demo-tns-sneha',
    interviewerName: 'Ananya Mehta',
    interviewerRole: 'Talent Acquisition Manager',
    status: 'Upcoming'
  },
  {
    id: 'INT-003',
    candidateId: 'std-7',
    candidateName: 'Aishwarya Sen',
    jobId: 'JOB-2027-001',
    jobTitle: 'Software Engineer',
    stage: 'Technical Interview',
    date: '20 Oct 2026',
    time: '11:15 AM',
    duration: '45 mins',
    mode: 'Online (Google Meet)',
    meetingLink: 'https://meet.google.com/demo-tns-aishwarya',
    interviewerName: 'Rajiv Sen',
    interviewerRole: 'Lead Software Architect',
    status: 'Upcoming'
  },
  {
    id: 'INT-004',
    candidateId: 'std-8',
    candidateName: 'Rohan Gupta',
    jobId: 'JOB-2027-003',
    jobTitle: 'Frontend Developer',
    stage: 'Final Evaluation',
    date: '02 Oct 2026',
    time: '11:00 AM',
    duration: '45 mins',
    mode: 'Online',
    interviewerName: 'Kunal Singhal',
    interviewerRole: 'Principal UX Engineer',
    status: 'Completed'
  }
];

export const INITIAL_OFFERS = [
  {
    id: 'OFF-001',
    candidateId: 'std-8',
    candidateName: 'Rohan Gupta',
    department: 'Computer Science & Engineering',
    cgpa: 9.0,
    jobId: 'JOB-2027-003',
    jobTitle: 'Frontend Developer',
    salary: '₹10.5 LPA',
    offerDate: '02 Oct 2026',
    joiningDate: '15 Jul 2027',
    status: 'Accepted' // 'Draft', 'Sent', 'Accepted', 'Declined', 'Joining Pending', 'Joined'
  },
  {
    id: 'OFF-002',
    candidateId: 'std-9',
    candidateName: 'Divya Krishnan',
    department: 'Information Technology',
    cgpa: 8.6,
    jobId: 'JOB-2027-002',
    jobTitle: 'Data Analyst',
    salary: '₹8.5 LPA',
    offerDate: '03 Oct 2026',
    joiningDate: '01 Aug 2027',
    status: 'Sent'
  },
  {
    id: 'OFF-003',
    candidateId: 'std-11',
    candidateName: 'Arjun Das',
    department: 'Electronics & Communication',
    cgpa: 8.1,
    jobId: 'JOB-2027-004',
    jobTitle: 'Cloud Support Engineer',
    salary: '₹7.8 LPA',
    offerDate: '28 Sep 2026',
    joiningDate: '15 Jul 2027',
    status: 'Joining Pending'
  },
  {
    id: 'OFF-004',
    candidateId: 'std-12',
    candidateName: 'Meera Shah',
    department: 'Computer Science & Engineering',
    cgpa: 8.7,
    jobId: 'JOB-2027-001',
    jobTitle: 'Software Engineer',
    salary: '₹9.2 LPA',
    offerDate: '29 Sep 2026',
    joiningDate: '01 Jul 2027',
    status: 'Accepted'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'CONV-001',
    candidateId: 'std-1',
    candidateName: 'Rahul Kumar',
    candidateAvatar: 'RK',
    jobTitle: 'Software Engineer',
    unreadCount: 0,
    lastActivity: '10:45 AM',
    messages: [
      {
        id: 'MSG-001',
        sender: 'recruiter',
        senderName: 'Ananya Mehta',
        text: 'Hello Rahul! Congratulations on being shortlisted for the Software Engineer role at TechNova Solutions.',
        timestamp: '10:30 AM'
      },
      {
        id: 'MSG-002',
        sender: 'candidate',
        senderName: 'Rahul Kumar',
        text: 'Thank you Ananya! I am excited for the opportunity. Could you please share the format and schedule for the technical round?',
        timestamp: '10:35 AM'
      },
      {
        id: 'MSG-003',
        sender: 'recruiter',
        senderName: 'Ananya Mehta',
        text: 'Your technical interview is scheduled for 18 October at 10:30 AM via Google Meet. It will cover Data Structures, Java, and your CampusConnect project.',
        timestamp: '10:40 AM'
      },
      {
        id: 'MSG-004',
        sender: 'candidate',
        senderName: 'Rahul Kumar',
        text: 'Understood! I have my project architecture and demo environment ready. Looking forward to speaking with the engineering team.',
        timestamp: '10:45 AM'
      }
    ]
  },
  {
    id: 'CONV-002',
    candidateId: 'std-2',
    candidateName: 'Sneha Reddy',
    candidateAvatar: 'SR',
    jobTitle: 'Software Engineer',
    unreadCount: 1,
    lastActivity: 'Yesterday',
    messages: [
      {
        id: 'MSG-101',
        sender: 'recruiter',
        senderName: 'Ananya Mehta',
        text: 'Hi Sneha, the engineering team gave fantastic feedback on your coding round. We would like to schedule your HR briefing.',
        timestamp: 'Yesterday 3:15 PM'
      },
      {
        id: 'MSG-102',
        sender: 'candidate',
        senderName: 'Sneha Reddy',
        text: 'Thank you Ananya! I am available on 19 October anytime afternoon.',
        timestamp: 'Yesterday 4:20 PM'
      }
    ]
  },
  {
    id: 'CONV-003',
    candidateId: 'std-8',
    candidateName: 'Rohan Gupta',
    candidateAvatar: 'RG',
    jobTitle: 'Frontend Developer',
    unreadCount: 0,
    lastActivity: 'Oct 02',
    messages: [
      {
        id: 'MSG-201',
        sender: 'recruiter',
        senderName: 'Ananya Mehta',
        text: 'Dear Rohan, we are delighted to extend a formal offer for the Frontend Developer position at TechNova Solutions!',
        timestamp: 'Oct 02 11:30 AM'
      },
      {
        id: 'MSG-202',
        sender: 'candidate',
        senderName: 'Rohan Gupta',
        text: 'Thank you so much! I have reviewed the offer document and accepted it on the CampusCore portal.',
        timestamp: 'Oct 02 02:45 PM'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-001',
    title: '12 new applications received',
    description: 'Candidates applied for the Software Engineer placement drive across CSE and IT.',
    time: '15 mins ago',
    type: 'application',
    read: false
  },
  {
    id: 'NOTIF-002',
    title: '8 candidates became eligible',
    description: 'System automatically verified academic criteria (CGPA ≥ 7.5, 0 backlogs).',
    time: '1 hour ago',
    type: 'eligibility',
    read: false
  },
  {
    id: 'NOTIF-003',
    title: 'AI candidate matching matrix ready',
    description: 'Preliminary semantic scoring calculated for 126 eligible applicants.',
    time: '3 hours ago',
    type: 'ai',
    read: false
  },
  {
    id: 'NOTIF-004',
    title: '3 candidates moved to interview stage',
    description: 'Rahul Kumar, Sneha Reddy, and Aishwarya Sen confirmed for technical rounds.',
    time: 'Yesterday',
    type: 'interview',
    read: true
  },
  {
    id: 'NOTIF-005',
    title: 'Interview scheduled with Rahul Kumar',
    description: 'Technical Interview confirmed for 18 Oct 2026 at 10:30 AM via Google Meet.',
    time: 'Yesterday',
    type: 'interview',
    read: true
  },
  {
    id: 'NOTIF-006',
    title: 'Drive deadline approaching',
    description: 'Cloud Support Engineer (Draft) scheduled to begin in 6 days.',
    time: '2 days ago',
    type: 'system',
    read: true
  }
];
