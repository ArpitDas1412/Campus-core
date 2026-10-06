/**
 * CAMPUSLINK — JOB ROLES DATASET
 * Predefined benchmark requirements for enterprise campus recruitment roles.
 * Note: These requirements represent demo criteria for prototype validation.
 */

export const JOB_ROLES = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Software Development",
    targetBracket: "Product & SaaS Companies",
    averageSalary: "₹8–16 LPA",
    description: "Core software engineering role focusing on algorithmic problem solving, object-oriented design, backend APIs, and reliable data persistence.",
    requiredSkills: [
      { name: "Java", level: "Advanced", importance: "High", minProficiency: 80, domain: "Programming" },
      { name: "Data Structures", level: "Advanced", importance: "High", minProficiency: 85, domain: "Core CS" },
      { name: "Algorithms", level: "Advanced", importance: "High", minProficiency: 85, domain: "Core CS" },
      { name: "OOP", level: "Advanced", importance: "High", minProficiency: 80, domain: "Core CS" },
      { name: "SQL", level: "Intermediate", importance: "High", minProficiency: 70, domain: "Database" },
      { name: "DBMS", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "Core CS" },
      { name: "Operating Systems", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Core CS" },
      { name: "REST APIs", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "Development" },
      { name: "Git", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Tools" }
    ],
    preferredSkills: [
      { name: "AWS", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Cloud" },
      { name: "Docker", level: "Intermediate", importance: "Medium", minProficiency: 60, domain: "DevOps" },
      { name: "System Design", level: "Intermediate", importance: "High", minProficiency: 70, domain: "Architecture" },
      { name: "Python", level: "Intermediate", importance: "Low", minProficiency: 60, domain: "Programming" }
    ],
    academicCutoff: {
      cgpa: 7.5,
      maxBacklogs: 0,
      degree: ["B.Tech", "M.Tech", "MCA"]
    },
    topInterviewTopics: [
      "Dynamic Programming & Graphs",
      "Object-Oriented System Design",
      "Database Indexing & Normalization",
      "Concurrency & Thread Safety"
    ]
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Web & UI",
    targetBracket: "Product Tech & Modern Agencies",
    averageSalary: "₹7–14 LPA",
    description: "Builds high-performance, responsive web interfaces, interactive components, client-side state architecture, and accessible user experiences.",
    requiredSkills: [
      { name: "React", level: "Advanced", importance: "High", minProficiency: 85, domain: "Web" },
      { name: "JavaScript", level: "Advanced", importance: "High", minProficiency: 85, domain: "Programming" },
      { name: "HTML", level: "Advanced", importance: "High", minProficiency: 85, domain: "Web" },
      { name: "CSS", level: "Advanced", importance: "High", minProficiency: 80, domain: "Web" },
      { name: "Git", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "Tools" },
      { name: "REST APIs", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Development" }
    ],
    preferredSkills: [
      { name: "TypeScript", level: "Intermediate", importance: "High", minProficiency: 70, domain: "Programming" },
      { name: "Next.js", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Web" },
      { name: "Tailwind CSS", level: "Intermediate", importance: "Low", minProficiency: 65, domain: "Web" },
      { name: "Redux", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "Web" }
    ],
    academicCutoff: {
      cgpa: 7.0,
      maxBacklogs: 1,
      degree: ["B.Tech", "BCA", "MCA"]
    },
    topInterviewTopics: [
      "React Fiber & Virtual DOM Reconciliation",
      "State Management & Custom Hooks",
      "Web Performance (LCP, FID, CLS)",
      "Cross-browser CSS Layouts & Grid"
    ]
  },
  {
    id: "fullstack-developer",
    title: "Full Stack Developer",
    category: "Software Development",
    targetBracket: "Startups & High-Growth Tech",
    averageSalary: "₹8–16 LPA",
    description: "End-to-end web applications engineering, spanning React user interfaces, Express/Node or Spring APIs, and relational/document database schemas.",
    requiredSkills: [
      { name: "React", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Web" },
      { name: "Node.js", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Backend" },
      { name: "JavaScript", level: "Advanced", importance: "High", minProficiency: 80, domain: "Programming" },
      { name: "SQL", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Database" },
      { name: "REST APIs", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Development" },
      { name: "Data Structures", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "Core CS" },
      { name: "Git", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "Tools" }
    ],
    preferredSkills: [
      { name: "MongoDB", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Database" },
      { name: "Docker", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "DevOps" },
      { name: "AWS", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Cloud" },
      { name: "TypeScript", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Programming" }
    ],
    academicCutoff: {
      cgpa: 7.2,
      maxBacklogs: 0,
      degree: ["B.Tech", "MCA"]
    },
    topInterviewTopics: [
      "Full-stack authentication (JWT, OAuth)",
      "Database schema design & migrations",
      "API rate limiting & security",
      "Microservices communication"
    ]
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Backend Systems",
    targetBracket: "FinTech & Enterprise Platforms",
    averageSalary: "₹8–17 LPA",
    description: "Server-side services, database optimization, distributed architecture, security pipelines, and high-throughput transactional endpoints.",
    requiredSkills: [
      { name: "Java", level: "Advanced", importance: "High", minProficiency: 85, domain: "Programming" },
      { name: "SQL", level: "Advanced", importance: "High", minProficiency: 80, domain: "Database" },
      { name: "DBMS", level: "Advanced", importance: "High", minProficiency: 80, domain: "Core CS" },
      { name: "REST APIs", level: "Advanced", importance: "High", minProficiency: 80, domain: "Development" },
      { name: "OOP", level: "Advanced", importance: "High", minProficiency: 80, domain: "Core CS" },
      { name: "Data Structures", level: "Advanced", importance: "High", minProficiency: 80, domain: "Core CS" }
    ],
    preferredSkills: [
      { name: "Spring Boot", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Backend" },
      { name: "System Design", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Architecture" },
      { name: "Redis", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Database" },
      { name: "Docker", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "DevOps" }
    ],
    academicCutoff: {
      cgpa: 7.5,
      maxBacklogs: 0,
      degree: ["B.Tech", "M.Tech"]
    },
    topInterviewTopics: [
      "ACID transactions & Isolation levels",
      "Caching strategies & Cache invalidation",
      "Low-level & High-level system design",
      "Message queues (Kafka, RabbitMQ)"
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data & BI",
    targetBracket: "Consulting & Analytics Services",
    averageSalary: "₹6–12 LPA",
    description: "Transforms structured business data into quantitative metrics, SQL reporting queries, statistical summaries, and executive visualization dashboards.",
    requiredSkills: [
      { name: "SQL", level: "Advanced", importance: "High", minProficiency: 85, domain: "Database" },
      { name: "Python", level: "Intermediate", importance: "High", minProficiency: 70, domain: "Programming" },
      { name: "Communication", level: "Advanced", importance: "High", minProficiency: 80, domain: "Soft Skills" },
      { name: "Excel", level: "Advanced", importance: "High", minProficiency: 80, domain: "Analytics" },
      { name: "Data Visualization", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Analytics" }
    ],
    preferredSkills: [
      { name: "Tableau", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "BI Tools" },
      { name: "Power BI", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "BI Tools" },
      { name: "Statistical Math", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "Math" }
    ],
    academicCutoff: {
      cgpa: 6.8,
      maxBacklogs: 1,
      degree: ["B.Tech", "B.Sc", "BCA", "MCA"]
    },
    topInterviewTopics: [
      "Complex SQL Joins, Window functions, CTEs",
      "Exploratory Data Analysis (EDA) in Pandas",
      "A/B Testing & Hypothesis Verification",
      "Business Dashboard Storytelling"
    ]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data & Analytics",
    targetBracket: "Research Labs & Predictive Tech",
    averageSalary: "₹10–20 LPA",
    description: "Develops statistical formulations, predictive regressions, feature engineering pipelines, and unsupervised clustering over high-dimensional datasets.",
    requiredSkills: [
      { name: "Python", level: "Advanced", importance: "High", minProficiency: 85, domain: "Programming" },
      { name: "SQL", level: "Advanced", importance: "High", minProficiency: 80, domain: "Database" },
      { name: "Machine Learning", level: "Advanced", importance: "High", minProficiency: 80, domain: "AI/ML" },
      { name: "Statistics", level: "Advanced", importance: "High", minProficiency: 80, domain: "Math" },
      { name: "Data Structures", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "Core CS" }
    ],
    preferredSkills: [
      { name: "Scikit-Learn", level: "Advanced", importance: "High", minProficiency: 80, domain: "AI/ML" },
      { name: "Deep Learning", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "AI/ML" },
      { name: "Big Data", level: "Intermediate", importance: "Low", minProficiency: 60, domain: "Data" }
    ],
    academicCutoff: {
      cgpa: 8.0,
      maxBacklogs: 0,
      degree: ["B.Tech", "M.Tech", "M.Sc"]
    },
    topInterviewTopics: [
      "Bias-Variance tradeoff & Regularization",
      "Gradient Boosting & Ensemble Trees",
      "Feature selection & Multicollinearity",
      "Metric selection (ROC-AUC, F1, PR-curve)"
    ]
  },
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "AI & ML",
    targetBracket: "AI Labs & Autonomous Systems",
    averageSalary: "₹11–22 LPA",
    description: "Productionizes machine learning models, builds distributed training pipelines, handles GPU orchestration, and writes inference serving endpoints.",
    requiredSkills: [
      { name: "Python", level: "Advanced", importance: "High", minProficiency: 85, domain: "Programming" },
      { name: "Machine Learning", level: "Advanced", importance: "High", minProficiency: 85, domain: "AI/ML" },
      { name: "Data Structures", level: "Advanced", importance: "High", minProficiency: 80, domain: "Core CS" },
      { name: "Linear Algebra", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Math" },
      { name: "Algorithms", level: "Advanced", importance: "High", minProficiency: 80, domain: "Core CS" }
    ],
    preferredSkills: [
      { name: "PyTorch", level: "Intermediate", importance: "High", minProficiency: 75, domain: "AI/ML" },
      { name: "TensorFlow", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "AI/ML" },
      { name: "Docker", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "DevOps" },
      { name: "MLOps", level: "Intermediate", importance: "High", minProficiency: 70, domain: "DevOps" }
    ],
    academicCutoff: {
      cgpa: 8.2,
      maxBacklogs: 0,
      degree: ["B.Tech", "M.Tech"]
    },
    topInterviewTopics: [
      "Loss functions & Optimization (Adam, SGD)",
      "Model quantization & TensorRT inference",
      "Vector embeddings & Retrieval Augmented Generation",
      "Data drift detection & Monitoring"
    ]
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    category: "Infrastructure",
    targetBracket: "Cloud Providers & Enterprise Systems",
    averageSalary: "₹8–16 LPA",
    description: "Designs scalable virtual networks, cloud provisioning, identity and access management, and distributed storage infrastructure on AWS, Azure or GCP.",
    requiredSkills: [
      { name: "AWS", level: "Advanced", importance: "High", minProficiency: 80, domain: "Cloud" },
      { name: "Linux", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Systems" },
      { name: "Networking", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Systems" },
      { name: "Python", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "Programming" },
      { name: "Git", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Tools" }
    ],
    preferredSkills: [
      { name: "Docker", level: "Intermediate", importance: "High", minProficiency: 70, domain: "DevOps" },
      { name: "Kubernetes", level: "Intermediate", importance: "High", minProficiency: 70, domain: "DevOps" },
      { name: "Terraform", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "IaC" },
      { name: "CI/CD", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "DevOps" }
    ],
    academicCutoff: {
      cgpa: 7.0,
      maxBacklogs: 0,
      degree: ["B.Tech", "MCA"]
    },
    topInterviewTopics: [
      "VPC Peering, Subnets, Routing tables & NAT",
      "IAM Roles, Least Privilege & Security Groups",
      "High Availability & Multi-Region failover",
      "S3 Lifecycle policies & Block Storage"
    ]
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    category: "Infrastructure",
    targetBracket: "SaaS & Cloud Native Companies",
    averageSalary: "₹8–17 LPA",
    description: "Automates continuous integration and deployment pipelines, container orchestration, cluster monitoring, and infrastructure-as-code.",
    requiredSkills: [
      { name: "Docker", level: "Advanced", importance: "High", minProficiency: 80, domain: "DevOps" },
      { name: "Kubernetes", level: "Intermediate", importance: "High", minProficiency: 75, domain: "DevOps" },
      { name: "Linux", level: "Advanced", importance: "High", minProficiency: 80, domain: "Systems" },
      { name: "CI/CD", level: "Advanced", importance: "High", minProficiency: 80, domain: "DevOps" },
      { name: "Git", level: "Advanced", importance: "High", minProficiency: 80, domain: "Tools" }
    ],
    preferredSkills: [
      { name: "AWS", level: "Intermediate", importance: "High", minProficiency: 70, domain: "Cloud" },
      { name: "Terraform", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "IaC" },
      { name: "Prometheus", level: "Intermediate", importance: "Medium", minProficiency: 60, domain: "Monitoring" },
      { name: "Python", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Scripting" }
    ],
    academicCutoff: {
      cgpa: 7.0,
      maxBacklogs: 0,
      degree: ["B.Tech", "MCA"]
    },
    topInterviewTopics: [
      "K8s Pod scheduling, Services & Ingress",
      "Zero-downtime Blue/Green and Canary releases",
      "Infrastructure drift management via Terraform",
      "Log aggregation (ELK, Grafana Loki)"
    ]
  },
  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    category: "Design",
    targetBracket: "Digital Products & Design Studios",
    averageSalary: "₹6–14 LPA",
    description: "User research, interaction flows, high-fidelity Figma prototypes, design systems, usability testing, and accessibility guidelines.",
    requiredSkills: [
      { name: "Figma", level: "Advanced", importance: "High", minProficiency: 85, domain: "Design" },
      { name: "UI Design", level: "Advanced", importance: "High", minProficiency: 85, domain: "Design" },
      { name: "User Research", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Design" },
      { name: "Prototyping", level: "Advanced", importance: "High", minProficiency: 80, domain: "Design" },
      { name: "Communication", level: "Advanced", importance: "High", minProficiency: 85, domain: "Soft Skills" }
    ],
    preferredSkills: [
      { name: "HTML", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Web" },
      { name: "CSS", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Web" },
      { name: "Design Systems", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Design" }
    ],
    academicCutoff: {
      cgpa: 6.5,
      maxBacklogs: 2,
      degree: ["B.Tech", "B.Des", "BCA", "Any Degree"]
    },
    topInterviewTopics: [
      "Information Architecture & User Journey mapping",
      "Typography, Color Contrast & WCAG A11y",
      "Design tokens & Component library scaling",
      "Usability heuristics & Usability testing"
    ]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Security",
    targetBracket: "Enterprise Security & Banking",
    averageSalary: "₹7–15 LPA",
    description: "Vulnerability analysis, threat modeling, security incident response, authentication audits, network traffic packet inspection, and penetration testing.",
    requiredSkills: [
      { name: "Networking", level: "Advanced", importance: "High", minProficiency: 80, domain: "Systems" },
      { name: "Linux", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Systems" },
      { name: "Operating Systems", level: "Intermediate", importance: "High", minProficiency: 75, domain: "Systems" },
      { name: "Security Fundamentals", level: "Advanced", importance: "High", minProficiency: 80, domain: "Security" },
      { name: "Python", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Scripting" }
    ],
    preferredSkills: [
      { name: "Wireshark", level: "Intermediate", importance: "Medium", minProficiency: 70, domain: "Security" },
      { name: "Penetration Testing", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Security" },
      { name: "Cloud Security", level: "Intermediate", importance: "Medium", minProficiency: 65, domain: "Cloud" }
    ],
    academicCutoff: {
      cgpa: 7.2,
      maxBacklogs: 0,
      degree: ["B.Tech", "MCA"]
    },
    topInterviewTopics: [
      "OWASP Top 10 vulnerabilities & mitigations",
      "Public Key Cryptography, TLS/SSL handshake",
      "TCP/IP handshakes, SYN floods & DDoS prevention",
      "Zero Trust Architecture & SIEM logging"
    ]
  }
];

export const getJobRoleById = (id) => {
  return JOB_ROLES.find(r => r.id === id) || JOB_ROLES[0];
};
