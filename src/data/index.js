// Unified data service and state management with localStorage persistence
import { INITIAL_STUDENTS } from './students.js';
import { INITIAL_RECRUITERS } from './recruiters.js';
import { INITIAL_DRIVES } from './drives.js';
import { INITIAL_OFFERS } from './offers.js';
import {
  KPI_METRICS,
  PROGRESS_DATA,
  DEPARTMENT_DATA,
  STUDENT_READINESS_DATA,
  RECRUITER_PIPELINE,
  AI_INSIGHTS,
  RECENT_ACTIVITIES,
  NOTIFICATIONS_DATA
} from './analytics.js';

const STORAGE_KEYS = {
  STUDENTS: 'campuslink_students_v1',
  RECRUITERS: 'campuslink_recruiters_v1',
  DRIVES: 'campuslink_drives_v1',
  OFFERS: 'campuslink_offers_v1',
  NOTIFICATIONS: 'campuslink_notifications_v1',
  REPORTS: 'campuslink_reports_v1'
};

// Safe localStorage getters with fallback
export function getStoredStudents() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Ensure new 360 properties exist; if not, merge with INITIAL_STUDENTS
        if (parsed.length > 0 && parsed[0].readinessBreakdown) {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.error('Failed to load students from storage', e);
  }
  return INITIAL_STUDENTS;
}

export function saveStoredStudents(students) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    }
  } catch (e) {
    console.error('Failed to save students to storage', e);
  }
}

export function getStudentById(studentId) {
  const students = getStoredStudents();
  if (!studentId) return null;
  const normalized = studentId.toLowerCase().trim();
  return (
    students.find(
      (s) =>
        s.id.toLowerCase() === normalized ||
        (s.legacyId && s.legacyId.toLowerCase() === normalized) ||
        s.rollNo.toLowerCase() === normalized
    ) || null
  );
}

export function updateStudentInStorage(updatedStudent) {
  const students = getStoredStudents();
  const index = students.findIndex(
    (s) =>
      s.id === updatedStudent.id ||
      (s.legacyId && s.legacyId === updatedStudent.id)
  );

  let updatedList;
  if (index >= 0) {
    updatedList = [...students];
    updatedList[index] = { ...updatedList[index], ...updatedStudent };
  } else {
    updatedList = [updatedStudent, ...students];
  }

  saveStoredStudents(updatedList);
  return updatedList;
}

export function addStudentNoteToStorage(studentId, noteText) {
  const students = getStoredStudents();
  const student = students.find((s) => s.id === studentId || s.legacyId === studentId);
  if (!student) return students;

  const currentNotes = student.officerNotes || [];
  const updatedStudent = {
    ...student,
    officerNotes: [noteText, ...currentNotes]
  };

  return updateStudentInStorage(updatedStudent);
}

export function getStoredRecruiters() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(STORAGE_KEYS.RECRUITERS);
      if (raw) return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load recruiters from storage', e);
  }
  return INITIAL_RECRUITERS;
}

export function saveStoredRecruiters(recruiters) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEYS.RECRUITERS, JSON.stringify(recruiters));
    }
  } catch (e) {
    console.error('Failed to save recruiters to storage', e);
  }
}

export function getStoredDrives() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(STORAGE_KEYS.DRIVES);
      if (raw) return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load drives from storage', e);
  }
  return INITIAL_DRIVES;
}

export function saveStoredDrives(drives) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));
    }
  } catch (e) {
    console.error('Failed to save drives to storage', e);
  }
}

export function getStoredNotifications() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (raw) return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load notifications from storage', e);
  }
  return NOTIFICATIONS_DATA;
}

export function saveStoredNotifications(notifs) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    }
  } catch (e) {
    console.error('Failed to save notifications to storage', e);
  }
}

// Global search utility across Students, Recruiters, Drives, and Offers
export function searchPlacementData(query) {
  if (!query || !query.trim()) return { students: [], recruiters: [], drives: [] };
  const q = query.trim().toLowerCase();

  const students = getStoredStudents().filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      s.skills.some((skill) => skill.toLowerCase().includes(q)) ||
      (s.offerCompany && s.offerCompany.toLowerCase().includes(q))
  );

  const recruiters = getStoredRecruiters().filter(
    (r) =>
      r.company.toLowerCase().includes(q) ||
      r.recruiterName.toLowerCase().includes(q) ||
      r.industry.toLowerCase().includes(q) ||
      r.hiringRoles.some((role) => role.toLowerCase().includes(q))
  );

  const drives = getStoredDrives().filter(
    (d) =>
      d.company.toLowerCase().includes(q) ||
      d.role.toLowerCase().includes(q) ||
      d.status.toLowerCase().includes(q)
  );

  return { students, recruiters, drives };
}

export {
  INITIAL_STUDENTS,
  INITIAL_RECRUITERS,
  INITIAL_DRIVES,
  INITIAL_OFFERS,
  KPI_METRICS,
  PROGRESS_DATA,
  DEPARTMENT_DATA,
  STUDENT_READINESS_DATA,
  RECRUITER_PIPELINE,
  AI_INSIGHTS,
  RECENT_ACTIVITIES,
  NOTIFICATIONS_DATA
};
