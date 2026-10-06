// CampusLink — Layer 13: Campus Intelligence & Executive Placement Analytics Service
// Synthesizes data across Layers 1–12 (Students, Readiness, Matching, Scheduling, Offers, Documents, Joining)

import { offerService } from './offerService';
import { documentService } from './documentService';
import { joiningService } from './joiningService';
import { createNotification } from './notificationEngine';

export const EXECUTIVE_KPIS = {
  placementRate: 78.4,
  placementRateYoY: '+6.2%',
  totalStudents: 1248,
  eligibleStudents: 980,
  studentsPlaced: 768,
  totalOffers: 842,
  offersPerPlacedStudent: 1.1,
  averageCTC: '₹9.4 LPA',
  highestCTC: '₹44.0 LPA',
  medianCTC: '₹8.2 LPA',
  activeRecruiters: 48,
  activeDrives: 14,
  joiningRate: 81.8,
  acceptedOffers: 724,
  joinedConfirmed: 592
};

export const PLACEMENT_FUNNEL = [
  {
    stage: 'Total Cohort',
    count: 1248,
    pctOfCohort: 100,
    dropCount: 268,
    dropReason: 'Academic eligibility criteria / Active backlogs',
    layer: 'L3: 360° Readiness'
  },
  {
    stage: 'Eligible Students',
    count: 980,
    pctOfCohort: 78.5,
    dropCount: 160,
    dropReason: 'Opted out for higher studies / Competitive exams',
    layer: 'L3: Eligibility'
  },
  {
    stage: 'Applied to Drives',
    count: 820,
    pctOfCohort: 65.7,
    dropCount: 210,
    dropReason: 'Failed minimum AI Fit Score threshold (<60%)',
    layer: 'L6: Job Drives'
  },
  {
    stage: 'AI Matched',
    count: 610,
    pctOfCohort: 48.9,
    dropCount: 298,
    dropReason: 'Recruiter cutoff gate / Quota limit',
    layer: 'L7/L8: Match Engine'
  },
  {
    stage: 'Shortlisted',
    count: 312,
    pctOfCohort: 25.0,
    dropCount: 128,
    dropReason: 'Technical assessment / Coding round elimination',
    layer: 'L9: Smart Shortlist'
  },
  {
    stage: 'Interviewed',
    count: 184,
    pctOfCohort: 14.7,
    dropCount: 142,
    dropReason: 'System Design / HR interview evaluation',
    layer: 'L10: Scheduler'
  },
  {
    stage: 'Final Selected',
    count: 42,
    pctOfCohort: 3.4,
    dropCount: 4,
    dropReason: 'Offer letters in compensation draft approval',
    layer: 'L10: Round Results'
  },
  {
    stage: 'Offers Extended',
    count: 38,
    pctOfCohort: 3.0,
    dropCount: 9,
    dropReason: '3 Declined (competing offers), 6 Pending response',
    layer: 'L12: Offers'
  },
  {
    stage: 'Offers Accepted',
    count: 29,
    pctOfCohort: 2.3,
    dropCount: 11,
    dropReason: 'Documentation verification in progress',
    layer: 'L12: Acceptance'
  },
  {
    stage: 'Joined / Day 1 Confirmed',
    count: 18,
    pctOfCohort: 1.4,
    dropCount: 0,
    dropReason: 'Onboarding finalized; reporting scheduled',
    layer: 'L12: Joining Tracker'
  }
];

export const DEPARTMENT_METRICS = [
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    totalStudents: 420,
    eligible: 380,
    placed: 342,
    placementRate: 90.0,
    offers: 412,
    averageCTC: '₹12.6 LPA',
    highestCTC: '₹44.0 LPA',
    topRecruiters: ['TechNova', 'Amazon', 'Deloitte', 'Microsoft'],
    topSkillGaps: ['System Design (34%)', 'Cloud Native (28%)'],
    status: 'High Performer'
  },
  {
    code: 'IT',
    name: 'Information Technology',
    totalStudents: 260,
    eligible: 220,
    placed: 186,
    placementRate: 84.5,
    offers: 204,
    averageCTC: '₹10.8 LPA',
    highestCTC: '₹32.0 LPA',
    topRecruiters: ['TechNova', 'Infosys', 'Accenture'],
    topSkillGaps: ['Distributed Systems (41%)', 'Docker/K8s (36%)'],
    status: 'Strong'
  },
  {
    code: 'ECE',
    name: 'Electronics & Communication',
    totalStudents: 280,
    eligible: 210,
    placed: 154,
    placementRate: 73.3,
    offers: 168,
    averageCTC: '₹8.4 LPA',
    highestCTC: '₹24.0 LPA',
    topRecruiters: ['Qualcomm', 'Deloitte', 'TCS Digital'],
    topSkillGaps: ['Data Structures (38%)', 'Embedded C++ (29%)'],
    status: 'Moderate'
  },
  {
    code: 'EEE',
    name: 'Electrical & Electronics',
    totalStudents: 160,
    eligible: 105,
    placed: 62,
    placementRate: 59.0,
    offers: 68,
    averageCTC: '₹6.8 LPA',
    highestCTC: '₹16.0 LPA',
    topRecruiters: ['Siemens', 'L&T Technology', 'Schneider'],
    topSkillGaps: ['DSA / Problem Solving (48%)', 'Full Stack (42%)'],
    status: 'Needs Attention'
  },
  {
    code: 'MECH',
    name: 'Mechanical Engineering',
    totalStudents: 128,
    eligible: 65,
    placed: 34,
    placementRate: 52.3,
    offers: 36,
    averageCTC: '₹6.2 LPA',
    highestCTC: '₹14.0 LPA',
    topRecruiters: ['Tata Motors', 'Mahindra', 'L&T'],
    topSkillGaps: ['CAD/Simulation (31%)', 'Software Basics (54%)'],
    status: 'Needs Attention'
  }
];

export const TOP_RECRUITERS_DATA = [
  {
    id: 'COMP-001',
    name: 'TechNova Solutions',
    tier: 'Product Super Dream',
    drivesConducted: 3,
    offersReleased: 28,
    offersAccepted: 24,
    acceptanceRate: 85.7,
    averageCTC: '₹9.8 LPA',
    keySkillsRequested: ['React', 'Node.js', 'PostgreSQL', 'DSA'],
    hiringVelocity: 'Fast (2.4 weeks cycle)'
  },
  {
    id: 'COMP-002',
    name: 'Amazon Web Services',
    tier: 'Tier 1 Tech',
    drivesConducted: 2,
    offersReleased: 14,
    offersAccepted: 13,
    acceptanceRate: 92.8,
    averageCTC: '₹28.4 LPA',
    keySkillsRequested: ['Java', 'Distributed Systems', 'Algorithms'],
    hiringVelocity: 'Moderate (3.5 weeks cycle)'
  },
  {
    id: 'COMP-003',
    name: 'Deloitte USI',
    tier: 'Consulting Dream',
    drivesConducted: 2,
    offersReleased: 36,
    offersAccepted: 31,
    acceptanceRate: 86.1,
    averageCTC: '₹8.6 LPA',
    keySkillsRequested: ['Python', 'SQL', 'Data Analytics', 'Communication'],
    hiringVelocity: 'Very Fast (1.5 weeks cycle)'
  },
  {
    id: 'COMP-004',
    name: 'Infosys Limited',
    tier: 'Mass Recruiter (Power)',
    drivesConducted: 4,
    offersReleased: 64,
    offersAccepted: 51,
    acceptanceRate: 79.6,
    averageCTC: '₹6.5 LPA',
    keySkillsRequested: ['Java', 'SQL', 'Web Technologies'],
    hiringVelocity: 'Batch Processed'
  }
];

export const AT_RISK_COHORTS = [
  {
    id: 'RISK-01',
    title: 'Low Readiness Students (<60%)',
    category: 'Readiness Deficit',
    count: 74,
    severity: 'High',
    description: 'Students whose aggregate readiness score falls below the baseline screening cutoff across active drives.',
    affectedDepts: ['EEE (28)', 'MECH (22)', 'ECE (16)', 'IT (8)'],
    recommendedAction: 'Schedule 2-week intensive Technical Bootcamp'
  },
  {
    id: 'RISK-02',
    title: 'Ghost Candidates (Zero Applications)',
    category: 'Engagement Risk',
    count: 42,
    severity: 'Medium',
    description: 'Eligible students who have not applied to any live recruitment drive despite meeting CGPA criteria.',
    affectedDepts: ['ECE (18)', 'CSE (12)', 'EEE (12)'],
    recommendedAction: 'Dispatch Layer 11 Counseling Reminder & Drive Alert'
  },
  {
    id: 'RISK-03',
    title: 'Repeated Interview Rejections (3+ Drops)',
    category: 'Interview Barrier',
    count: 31,
    severity: 'High',
    description: 'Students who consistently clear technical screening but get eliminated in final technical or HR interviews.',
    affectedDepts: ['CSE (14)', 'IT (9)', 'ECE (8)'],
    recommendedAction: 'Conduct 1-on-1 Mock Interview with Alumni Mentors'
  },
  {
    id: 'RISK-04',
    title: 'Offer Accepted with Missing Documentation',
    category: 'Onboarding Risk',
    count: 18,
    severity: 'Urgent',
    description: 'Candidates with formal employment offers who have pending marksheets or verification credentials past soft deadline.',
    affectedDepts: ['TechNova (5)', 'Deloitte (7)', 'Infosys (6)'],
    recommendedAction: 'Send Urgent Document Verification Nudge'
  }
];

export const EXECUTIVE_RECOMMENDATIONS = [
  {
    id: 'REC-01',
    type: 'Curriculum & Readiness',
    badge: 'AI Insight',
    badgeColor: 'blue',
    title: 'DSA Competency Gap in Circuit Branches',
    observation: '23% of eligible students in EEE and ECE demonstrate low DSA readiness (<55% fit on technical assessments).',
    recommendation: 'Conduct a targeted 14-day Data Structures & Algorithms acceleration bootcamp before the upcoming Winter drive cycle.',
    actionLabel: 'Trigger Bootcamp Announcement via Layer 11',
    actionType: 'notification',
    metricImpact: 'Projected +14% placement rate in circuit cohorts'
  },
  {
    id: 'REC-02',
    type: 'Compliance & Verification',
    badge: 'Placement Risk',
    badgeColor: 'amber',
    title: 'Onboarding Document Bottleneck Detected',
    observation: '18 candidates with accepted corporate offers have incomplete credential verification (12th marksheets & provisional degrees).',
    recommendation: 'Automate an urgent verification alert giving candidates a 48-hour upload window to prevent corporate offer revocations.',
    actionLabel: 'Dispatch Batch Document Nudge',
    actionType: 'document_nudge',
    metricImpact: 'Protects 18 confirmed campus offers valued at ₹1.68 Cr'
  },
  {
    id: 'REC-03',
    type: 'Market Demand',
    badge: 'Recruiter Demand',
    badgeColor: 'emerald',
    title: 'Surging Enterprise Cloud & SQL Demand',
    observation: 'Java, SQL, React, and Cloud Fundamentals represent 74% of all mandatory criteria in active corporate job specifications.',
    recommendation: 'Advise Department Curriculum Committees to prioritize hands-on relational database design and API integration in 7th-semester labs.',
    actionLabel: 'Export Skill-Alignment Brief',
    actionType: 'export_brief',
    metricImpact: 'Aligns 420+ pre-final students with corporate job descriptions'
  },
  {
    id: 'REC-04',
    type: 'Operational Logistics',
    badge: 'Interview Bottleneck',
    badgeColor: 'purple',
    title: 'Panel Congestion for Upcoming TechNova Drive',
    observation: '14 candidates have overlapping schedule requests across Parallel Panel 2 and Panel 3 for tomorrow\'s SDE evaluations.',
    recommendation: 'Deploy Layer 10 Conflict-Aware Slot Balancing to reallocate 4 interviews to the 02:30 PM open block.',
    actionLabel: 'Open Layer 10 Scheduler',
    actionType: 'navigate_scheduler',
    metricImpact: 'Eliminates 100% of panel collisions with zero candidate delays'
  }
];

// Helper methods for page consumption
export const intelligenceService = {
  getExecutiveKPIs() {
    // Enrich with dynamic offer data from Layer 12
    const offerStats = offerService.getOfferStats();
    const docStats = documentService.getDocumentStats();
    const joiningStats = joiningService.getJoiningStats();

    return {
      ...EXECUTIVE_KPIS,
      offersGenerated: offerStats.offersGenerated || 38,
      offersAccepted: offerStats.offersAccepted || 29,
      joiningConfirmed: joiningStats.confirmed || 18,
      docsVerified: docStats.verified || 24,
      docsPending: docStats.pendingVerification || 11
    };
  },

  getPlacementFunnel() {
    return PLACEMENT_FUNNEL;
  },

  getDepartmentMetrics(filterDept = 'ALL') {
    if (!filterDept || filterDept === 'ALL') {
      return DEPARTMENT_METRICS;
    }
    return DEPARTMENT_METRICS.filter(d => d.code === filterDept);
  },

  getTopRecruiters() {
    return TOP_RECRUITERS_DATA;
  },

  getAtRiskCohorts() {
    return AT_RISK_COHORTS;
  },

  getExecutiveRecommendations() {
    return EXECUTIVE_RECOMMENDATIONS;
  },

  triggerRecommendationAction(recId) {
    const rec = EXECUTIVE_RECOMMENDATIONS.find(r => r.id === recId);
    if (!rec) return false;

    // Connect seamlessly with Layer 11
    createNotification({
      type: 'ANNOUNCEMENT',
      title: `Executive Directive: ${rec.title}`,
      message: `${rec.recommendation} (Triggered from Campus Intelligence Executive Command).`,
      priority: 'HIGH',
      recipientRole: 'student',
      actionUrl: '/student/documents'
    });

    return true;
  }
};

export default intelligenceService;
