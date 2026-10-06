// CampusLink — Layer 6 Recruiter Service & Pipeline Manager
import {
  INITIAL_COMPANY,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_INTERVIEWS,
  INITIAL_OFFERS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS
} from '../data/recruiterData.js';
import { getStoredStudents } from '../data/index.js';

const STORAGE_KEYS = {
  COMPANY: 'campuslink_recruiter_company_v1',
  JOBS: 'campuslink_recruiter_jobs_v1',
  APPLICATIONS: 'campuslink_recruiter_applications_v1',
  INTERVIEWS: 'campuslink_recruiter_interviews_v1',
  OFFERS: 'campuslink_recruiter_offers_v1',
  MESSAGES: 'campuslink_recruiter_messages_v1',
  NOTIFICATIONS: 'campuslink_recruiter_notifications_v1'
};

// 1. Company Profile
export function getCompany() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPANY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load company profile', e);
  }
  return INITIAL_COMPANY;
}
export const getCompanyProfile = getCompany;

export function updateCompany(updatedFields) {
  const current = getCompany();
  const merged = { ...current, ...updatedFields };
  try {
    localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(merged));
  } catch (e) {
    console.error('Failed to save company profile', e);
  }
  return merged;
}
export const updateCompanyProfile = updateCompany;

// 2. Jobs Management
export function getJobs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load jobs', e);
  }
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
  } catch (e) {}
  return INITIAL_JOBS;
}

export function getJobById(jobId) {
  const jobs = getJobs();
  return jobs.find((j) => j.id === jobId) || jobs[0];
}

export function createJob(jobData) {
  const jobs = getJobs();
  const newJob = {
    ...jobData,
    id: `JOB-2027-${String(jobs.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString().split('T')[0],
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    applicationsCount: 0,
    eligibleCount: 0,
    aiRecommendedCount: 0,
    shortlistedCount: 0,
    interviewsCount: 0,
    offersCount: 0,
    status: jobData.status || 'Active'
  };
  const updated = [newJob, ...jobs];
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save new job', e);
  }
  return newJob;
}

export function updateJob(jobId, updates) {
  const jobs = getJobs();
  const updated = jobs.map((j) => (j.id === jobId ? { ...j, ...updates } : j));
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update job', e);
  }
  return updated.find((j) => j.id === jobId);
}

export function duplicateJob(jobId) {
  const jobs = getJobs();
  const source = jobs.find((j) => j.id === jobId);
  if (!source) return null;

  const copy = {
    ...source,
    id: `JOB-2027-${String(jobs.length + 1).padStart(3, '0')}`,
    title: `${source.title} (Copy)`,
    status: 'Draft',
    applicationsCount: 0,
    eligibleCount: 0,
    aiRecommendedCount: 0,
    shortlistedCount: 0,
    interviewsCount: 0,
    offersCount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [copy, ...jobs];
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updated));
  } catch (e) {}
  return copy;
}

export function archiveJob(jobId) {
  return updateJob(jobId, { status: 'Archived' });
}

// 3. Applications & Candidates (Cross-referenced with Layer 3 students)
export function getApplications(filter = null) {
  let apps = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (raw) apps = JSON.parse(raw);
    else {
      apps = INITIAL_APPLICATIONS;
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    }
  } catch (e) {
    apps = INITIAL_APPLICATIONS;
  }

  // Cross-reference with Layer 3 stored students to ensure single source of truth
  const liveStudents = getStoredStudents() || [];
  const enriched = apps.map((app) => {
    const student = liveStudents.find((s) => s.id === app.studentId || s.id === app.candidateId);
    const resolvedName = student?.name || app.studentName || app.candidateName || 'Candidate';
    const resolvedId = student?.id || app.studentId || app.candidateId || 'std-1';

    return {
      ...app,
      id: app.id || `APP-${resolvedId}`,
      studentId: resolvedId,
      candidateId: resolvedId,
      studentName: resolvedName,
      candidateName: resolvedName,
      department: student?.department || app.department || 'Computer Science & Engineering',
      cgpa: student?.cgpa !== undefined ? student.cgpa : (app.cgpa !== undefined ? app.cgpa : 8.5),
      skills: (student?.skills?.map((sk) => (typeof sk === 'string' ? sk : sk.name)) || app.skills || []),
      readinessScore: student?.readinessScore || app.readinessScore || 85,
      preliminaryMatchScore: app.preliminaryMatchScore || 85,
      status: app.status || 'Eligible',
      jobTitle: app.jobTitle || 'Software Engineer',
      studentData: {
        ...(student || {}),
        // STRICT PRIVACY RULE: Strip officer private notes and sensitive internal administrative data
        officerNotes: undefined,
        privateNotes: undefined,
        internalComments: undefined,
        disciplinaryRecords: undefined
      }
    };
  });

  const targetJobId = typeof filter === 'string' ? filter : filter?.jobId;
  if (targetJobId) {
    return enriched.filter((a) => a.jobId === targetJobId);
  }
  return enriched;
}

// 4. Candidate Profile with Privacy Filter (No officer private notes)
export function getCandidateProfile(studentId) {
  const liveStudents = getStoredStudents() || [];
  const student = liveStudents.find((s) => s.id === studentId);
  if (!student) {
    // Check fallback in applications
    const apps = getApplications();
    const match = apps.find((a) => a.studentId === studentId);
    if (!match) return null;
    return {
      id: match.studentId,
      name: match.studentName,
      department: match.department,
      cgpa: match.cgpa,
      skills: match.skills,
      gradYear: 2027,
      backlogs: 0,
      application: match
    };
  }

  // Create clean recruiter-safe profile
  const apps = getApplications();
  const candidateApp = apps.find((a) => a.studentId === studentId);

  return {
    id: student.id,
    name: student.name,
    department: student.department,
    cgpa: student.cgpa,
    skills: student.skills,
    projects: student.projects || [],
    certifications: student.certifications || [],
    internships: student.internships || [],
    readinessScore: student.readinessScore || 88,
    placementStatus: student.placementStatus || 'In Progress',
    gradYear: student.gradYear || 2027,
    backlogs: student.backlogs || 0,
    degree: student.degree || 'B.Tech',
    application: candidateApp,
    // Strictly redacted:
    officerNotes: undefined,
    privateNotes: undefined,
    internalComments: undefined
  };
}

export function shortlistCandidate(appId) {
  return moveCandidateStage(appId, 'Shortlisted');
}

export function rejectCandidate(appId) {
  return moveCandidateStage(appId, 'Rejected');
}

export function moveCandidateStage(appId, newStage) {
  const apps = getApplications();
  const updated = apps.map((a) =>
    a.id === appId
      ? { ...a, status: newStage, lastUpdated: new Date().toISOString().split('T')[0] }
      : a
  );
  try {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update application stage', e);
  }
  return updated.find((a) => a.id === appId);
}

// 5. Dashboard Stats & Funnel
export function getDashboardStats() {
  return {
    activeDrives: 4,
    applications: 684,
    eligibleCandidates: 312,
    aiRecommended: 128,
    shortlisted: 86,
    offers: 18
  };
}

export function getFunnelData() {
  return [
    { stage: 'Applications', count: 684, pct: 100, color: '#3978F6' },
    { stage: 'Eligible', count: 312, pct: 45.6, color: '#0E8EA8' },
    { stage: 'AI Recommended', count: 128, pct: 18.7, color: '#8B5CF6' },
    { stage: 'Shortlisted', count: 86, pct: 12.5, color: '#F59E0B' },
    { stage: 'Interview', count: 42, pct: 6.1, color: '#36C5E8' },
    { stage: 'Offers', count: 18, pct: 2.6, color: '#10B981' }
  ];
}

// 6. Interviews
export function getInterviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INTERVIEWS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(INITIAL_INTERVIEWS));
  } catch (e) {}
  return INITIAL_INTERVIEWS;
}

export function rescheduleInterview(id, newDate, newTime) {
  const current = getInterviews();
  const updated = current.map((iv) =>
    iv.id === id ? { ...iv, date: newDate, time: newTime, status: 'Scheduled' } : iv
  );
  try {
    localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(updated));
  } catch (e) {}
  return updated.find((iv) => iv.id === id);
}

export function cancelInterview(id) {
  const current = getInterviews();
  const updated = current.map((iv) => (iv.id === id ? { ...iv, status: 'Cancelled' } : iv));
  try {
    localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(updated));
  } catch (e) {}
  return updated.find((iv) => iv.id === id);
}

// 7. Offers
export function getOffers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(INITIAL_OFFERS));
  } catch (e) {}
  return INITIAL_OFFERS;
}

// 8. Messages
export function getMessages() {
  let list = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (raw) list = JSON.parse(raw);
    else {
      list = INITIAL_MESSAGES;
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(INITIAL_MESSAGES));
    }
  } catch (e) {
    list = INITIAL_MESSAGES;
  }

  return (list || []).map((c) => {
    const name = c.studentName || c.candidateName || 'Candidate';
    const id = c.studentId || c.candidateId || 'std-1';
    return {
      ...c,
      studentId: id,
      candidateId: id,
      studentName: name,
      candidateName: name,
      candidateAvatar: c.candidateAvatar || name.slice(0, 2).toUpperCase(),
      jobTitle: c.jobTitle || 'Software Engineer',
      messages: c.messages || []
    };
  });
}

export function sendMessage(studentId, text) {
  const threads = getMessages();
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} PM`;

  const updated = threads.map((t) => {
    if (t.studentId === studentId) {
      return {
        ...t,
        messages: [
          ...t.messages,
          {
            id: `msg-${Date.now()}`,
            sender: 'Ananya Mehta',
            text: text,
            time: timeStr
          }
        ]
      };
    }
    return t;
  });

  try {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

// 9. Notifications
export function getNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  } catch (e) {}
  return INITIAL_NOTIFICATIONS;
}

export function markNotificationRead(id) {
  const notifs = getNotifications();
  const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

export function markAllNotificationsRead() {
  const notifs = getNotifications();
  const updated = notifs.map((n) => ({ ...n, read: true }));
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

// 10. Recruitment Analytics
export function getRecruitmentAnalytics() {
  return {
    funnel: [
      { stage: 'Applications', count: 684, pct: 100, color: '#3978F6' },
      { stage: 'Eligible', count: 312, pct: 45.6, color: '#0E8EA8' },
      { stage: 'AI Recommended', count: 128, pct: 18.7, color: '#8B5CF6' },
      { stage: 'Shortlisted', count: 86, pct: 12.5, color: '#F59E0B' },
      { stage: 'Interview', count: 42, pct: 6.1, color: '#36C5E8' },
      { stage: 'Offers', count: 18, pct: 2.6, color: '#10B981' }
    ],
    deptDistribution: [
      { department: 'Computer Science & Engineering', count: 288, percentage: 42 },
      { department: 'Information Technology', count: 178, percentage: 26 },
      { department: 'Electronics & Communication', count: 123, percentage: 18 },
      { department: 'Electrical & Electronics', count: 55, percentage: 8 },
      { department: 'Mechanical & Civil', count: 40, percentage: 6 }
    ],
    skillDemand: [
      { skill: 'Java', applicants: 574, pct: 84, importance: 'High' },
      { skill: 'Python', applicants: 526, pct: 77, importance: 'High' },
      { skill: 'SQL & Database', applicants: 498, pct: 73, importance: 'High' },
      { skill: 'React.js', applicants: 382, pct: 56, importance: 'Medium' },
      { skill: 'AWS Cloud', applicants: 287, pct: 42, importance: 'Medium' },
      { skill: 'Data Structures', applicants: 595, pct: 87, importance: 'High' }
    ],
    applicationTrend: [
      { period: 'Week 1', count: 84 },
      { period: 'Week 2', count: 142 },
      { period: 'Week 3', count: 218 },
      { period: 'Week 4', count: 196 },
      { period: 'Week 5', count: 164 },
      { period: 'Week 6', count: 110 }
    ]
  };
}

// Default export wrapping all methods
const recruiterService = {
  getCompany,
  getCompanyProfile,
  updateCompany,
  updateCompanyProfile,
  getJobs,
  getJobById,
  createJob,
  updateJob,
  duplicateJob,
  archiveJob,
  getApplications,
  getCandidateProfile,
  shortlistCandidate,
  rejectCandidate,
  moveCandidateStage,
  getDashboardStats,
  getFunnelData,
  getInterviews,
  rescheduleInterview,
  cancelInterview,
  getOffers,
  getMessages,
  sendMessage,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getRecruitmentAnalytics
};

export default recruiterService;
