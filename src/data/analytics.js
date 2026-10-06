// Centralized analytics, KPI metrics, charts and insights
export const KPI_METRICS = {
  totalStudents: {
    value: '1,248',
    numericValue: 1248,
    subtitle: '+8.4% from last year',
    trend: '+8.4%',
    trendType: 'positive',
    label: 'Total Students'
  },
  placementRate: {
    value: '78.6%',
    numericValue: 78.6,
    subtitle: '+6.2% this season',
    trend: '+6.2%',
    trendType: 'positive',
    label: 'Placement Rate'
  },
  activeRecruiters: {
    value: '42',
    numericValue: 42,
    subtitle: '8 new this month',
    trend: '8 new',
    trendType: 'positive',
    label: 'Active Recruiters'
  },
  activeDrives: {
    value: '12',
    numericValue: 12,
    subtitle: '4 happening this week',
    trend: '4 this week',
    trendType: 'neutral',
    label: 'Active Drives'
  },
  offersReceived: {
    value: '386',
    numericValue: 386,
    subtitle: '+24 this week',
    trend: '+24',
    trendType: 'positive',
    label: 'Offers Received'
  },
  studentsAtRisk: {
    value: '74',
    numericValue: 74,
    subtitle: 'Requires attention',
    trend: 'Alert',
    trendType: 'alert',
    label: 'Students At Risk'
  }
};

export const PROGRESS_DATA = {
  '2026–27': [
    { month: 'July', rate: 12.0, target: 15.0, offers: 48 },
    { month: 'August', rate: 18.0, target: 22.0, offers: 85 },
    { month: 'September', rate: 27.0, target: 30.0, offers: 140 },
    { month: 'October', rate: 39.0, target: 40.0, offers: 198 },
    { month: 'November', rate: 51.0, target: 50.0, offers: 254 },
    { month: 'December', rate: 64.0, target: 60.0, offers: 312 },
    { month: 'January', rate: 72.0, target: 70.0, offers: 350 },
    { month: 'February', rate: 78.6, target: 75.0, offers: 386 }
  ],
  '2025–26': [
    { month: 'July', rate: 10.5, target: 14.0, offers: 42 },
    { month: 'August', rate: 15.2, target: 20.0, offers: 74 },
    { month: 'September', rate: 23.4, target: 28.0, offers: 118 },
    { month: 'October', rate: 34.0, target: 38.0, offers: 172 },
    { month: 'November', rate: 46.5, target: 48.0, offers: 230 },
    { month: 'December', rate: 58.0, target: 58.0, offers: 282 },
    { month: 'January', rate: 66.8, target: 68.0, offers: 326 },
    { month: 'February', rate: 72.4, target: 74.0, offers: 355 }
  ],
  '2024–25': [
    { month: 'July', rate: 8.0, target: 12.0, offers: 35 },
    { month: 'August', rate: 13.5, target: 18.0, offers: 64 },
    { month: 'September', rate: 20.0, target: 25.0, offers: 98 },
    { month: 'October', rate: 30.2, target: 35.0, offers: 150 },
    { month: 'November', rate: 42.0, target: 45.0, offers: 204 },
    { month: 'December', rate: 53.4, target: 55.0, offers: 258 },
    { month: 'January', rate: 61.0, target: 64.0, offers: 295 },
    { month: 'February', rate: 68.5, target: 70.0, offers: 332 }
  ]
};

export const DEPARTMENT_DATA = [
  { name: 'Computer Science', code: 'CSE', rate: 91, total: 340, placed: 310, avgCtc: '14.2 LPA', color: '#3978F6' },
  { name: 'Information Technology', code: 'IT', rate: 87, total: 220, placed: 191, avgCtc: '12.6 LPA', color: '#0E8EA8' },
  { name: 'ECE', code: 'ECE', rate: 79, total: 240, placed: 190, avgCtc: '9.8 LPA', color: '#8B5CF6' },
  { name: 'EEE', code: 'EEE', rate: 71, total: 160, placed: 114, avgCtc: '8.4 LPA', color: '#F59E0B' },
  { name: 'Mechanical', code: 'Mechanical', rate: 63, total: 180, placed: 113, avgCtc: '7.6 LPA', color: '#EC4899' },
  { name: 'Civil', code: 'Civil', rate: 56, total: 108, placed: 60, avgCtc: '6.8 LPA', color: '#64748B' }
];

export const STUDENT_READINESS_DATA = [
  { status: 'Job Ready', count: 624, percentage: 50.0, color: '#10B981', lightColor: '#ECFDF5', description: 'Met technical and soft-skill threshold (>80% score)' },
  { status: 'Nearly Ready', count: 382, percentage: 30.6, color: '#3978F6', lightColor: '#EEF4FF', description: 'Minor gaps in coding or interview mock practice' },
  { status: 'Needs Improvement', count: 168, percentage: 13.5, color: '#F59E0B', lightColor: '#FFFBEB', description: 'Core technical or aptitude remediation required' },
  { status: 'Critical', count: 74, percentage: 5.9, color: '#EF4444', lightColor: '#FEF2F2', description: 'Requires direct placement officer intervention' }
];

export const RECRUITER_PIPELINE = [
  { stage: 'Companies Registered', count: 85, dropoff: '100%', color: '#101B36', icon: 'Building' },
  { stage: 'Active Recruiters', count: 42, dropoff: '49.4% converted', color: '#3978F6', icon: 'Users' },
  { stage: 'Active Drives', count: 28, dropoff: '66.7% scheduled', color: '#0E8EA8', icon: 'Calendar' },
  { stage: 'Shortlisted Students', count: 612, dropoff: '49.0% cohort pool', color: '#8B5CF6', icon: 'CheckCircle' },
  { stage: 'Offers Extended', count: 386, dropoff: '63.1% conversion', color: '#10B981', icon: 'Award' }
];

export const AI_INSIGHTS = [
  {
    id: 'ai-1',
    number: 'INSIGHT 01',
    text: 'Java & SQL proficiency is currently the largest skill gap among eligible students.',
    actionLabel: 'View Skill Gaps',
    targetModule: 'skill-gaps',
    impact: 'High Impact',
    badge: 'Curriculum & Readiness',
    details: 'Analysis of 186 candidate assessments reveals a 42% shortfall in complex query optimization and Java concurrency patterns required by upcoming enterprise drives.'
  },
  {
    id: 'ai-2',
    number: 'INSIGHT 02',
    text: '74 students may require intervention before the next recruitment cycle.',
    actionLabel: 'View At-Risk Students',
    targetModule: 'at-risk',
    impact: 'Urgent',
    badge: 'Student Welfare',
    details: 'These 74 students in Mech, Civil, and EEE have readiness scores below 50% or unverified mock interviews. Early intervention cohorts could recover ~55 offers.'
  },
  {
    id: 'ai-3',
    number: 'INSIGHT 03',
    text: 'Demand for full-stack development roles has increased this season.',
    actionLabel: 'View Market Trends',
    targetModule: 'market-trends',
    impact: 'Strategic',
    badge: 'Recruiter Demand',
    details: 'Job descriptions in active drives demand React/Node/Cloud full-stack profiles at a 3.4x higher rate than single-framework specializations, offering an average 28% CTC premium.'
  }
];

export const RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'offer',
    badgeColor: '#10B981',
    dotColor: '#10B981',
    text: 'Rahul Kumar received an offer from TCS',
    time: '2 minutes ago',
    tag: 'Offer Released',
    details: 'Software Engineer • 9.0 LPA'
  },
  {
    id: 'act-2',
    type: 'drive',
    badgeColor: '#3978F6',
    dotColor: '#3978F6',
    text: 'Infosys recruitment drive was created',
    time: '18 minutes ago',
    tag: 'Drive Scheduled',
    details: 'Graduate Engineer • Oct 11 Slot'
  },
  {
    id: 'act-3',
    type: 'assessment',
    badgeColor: '#8B5CF6',
    dotColor: '#8B5CF6',
    text: '32 students completed their readiness assessment',
    time: '42 minutes ago',
    tag: 'Readiness AI',
    details: 'Batch CSE-A • Avg Score: 88.4%'
  },
  {
    id: 'act-4',
    type: 'alert',
    badgeColor: '#F59E0B',
    dotColor: '#F59E0B',
    text: '8 students were flagged as requiring skill development',
    time: '1 hour ago',
    tag: 'Early Warning',
    details: 'Mechanical Dept • Remedial session recommended'
  },
  {
    id: 'act-5',
    type: 'shortlist',
    badgeColor: '#10B981',
    dotColor: '#10B981',
    text: 'Deloitte shortlisted 24 candidates',
    time: '2 hours ago',
    tag: 'Shortlist',
    details: 'Tech Analyst • Round 2 Interviews'
  }
];

export const NOTIFICATIONS_DATA = [
  {
    id: 'notif-1',
    title: 'New recruiter registered',
    subtitle: 'Amazon India talent partner requested campus hiring access',
    time: '5m ago',
    read: false,
    category: 'recruiter'
  },
  {
    id: 'notif-2',
    title: 'Infosys created a recruitment drive',
    subtitle: 'Slot requested for Oct 11, 2026 (142 eligible students)',
    time: '20m ago',
    read: false,
    category: 'drive'
  },
  {
    id: 'notif-3',
    title: '24 students were shortlisted',
    subtitle: 'Deloitte published shortlist for Technical Analyst profile',
    time: '2h ago',
    read: false,
    category: 'shortlist'
  },
  {
    id: 'notif-4',
    title: '8 students require attention',
    subtitle: 'Readiness score fell below eligibility cutoff in recent assessment',
    time: '3h ago',
    read: false,
    category: 'risk'
  }
];
