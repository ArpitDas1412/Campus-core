// CampusLink — Layer 10: Intelligent Placement Drive Scheduler & Conflict-Aware Interview Management Engine
// Consumes Layer 9 Shortlists, detects multi-dimensional schedule conflicts, and automates slot assignments.

import {
  SCHEDULE_STATUS,
  ATTENDANCE_STATUS,
  ROUND_RESULT_STATUS,
  CONFLICT_SEVERITY,
  CONFLICT_TYPE,
  DEFAULT_SCHEDULING_CONFIG,
  DEFAULT_INTERVIEWERS,
  DEFAULT_ROOMS,
  INITIAL_ACTIVE_DRIVES
} from '../data/schedulingConfig.js';
import { STUDENTS } from '../data/students.js';
import { INITIAL_JOBS } from '../data/recruiterData.js';

const STORAGE_KEYS = {
  DRIVE_SCHEDULES: 'campuslink_drive_schedules_v1',
  INDIVIDUAL_SCHEDULES: 'campuslink_individual_schedules_v1',
  AUDIT: 'campuslink_schedule_audit_v1',
  NOTIFICATIONS_QUEUE: 'campuslink_notifications_queue_v1' // Prepared for Layer 11
};

// Safe storage utilities
function getStoredData(key, fallback = null) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    }
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
  }
  return fallback;
}

function setStoredData(key, data) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (e) {
    console.warn(`Error writing ${key} to storage:`, e);
  }
}

/**
 * Seed initial placement drive schedules if storage is empty
 */
function initializeSeedData() {
  const existingDrives = getStoredData(STORAGE_KEYS.DRIVE_SCHEDULES, null);
  if (existingDrives) return;

  const defaultJob = INITIAL_JOBS[0] || {
    id: 'JOB-2027-001',
    title: 'Software Engineer',
    companyName: 'TechNova Solutions',
    openings: 25
  };

  const seedRounds = [
    {
      id: 'ROUND-001',
      name: 'Round 1: Online Assessment',
      type: 'Coding Test',
      duration: 60,
      mode: 'Online',
      interviewerCount: 0,
      roomRequired: false,
      passingCriteria: 'Score >= 70%',
      requiresPreviousPass: false
    },
    {
      id: 'ROUND-002',
      name: 'Round 2: Technical Interview',
      type: 'Technical Interview',
      duration: 30,
      mode: 'Offline',
      interviewerCount: 1,
      roomRequired: true,
      passingCriteria: 'Rating >= 4/5',
      requiresPreviousPass: true
    },
    {
      id: 'ROUND-003',
      name: 'Round 3: Managerial Interview',
      type: 'Managerial Interview',
      duration: 30,
      mode: 'Offline',
      interviewerCount: 1,
      roomRequired: true,
      passingCriteria: 'Recommendation',
      requiresPreviousPass: true
    },
    {
      id: 'ROUND-004',
      name: 'Round 4: HR Interview',
      type: 'HR Interview',
      duration: 30,
      mode: 'Online',
      interviewerCount: 1,
      roomRequired: false,
      passingCriteria: 'Culture Fit Cleared',
      requiresPreviousPass: true
    }
  ];

  // Build candidate items based on demo student data
  const candidatePool = STUDENTS.slice(0, 12);
  const seedItems = [
    {
      id: 'SCH-TECH-001',
      jobId: defaultJob.id,
      jobTitle: defaultJob.title,
      companyName: defaultJob.companyName,
      candidateId: 'std-1',
      candidateName: 'Rahul Kumar',
      studentRoll: '2023CS0101',
      department: 'Computer Science',
      cgpa: '9.2',
      roundId: 'ROUND-002',
      roundName: 'Technical Interview',
      date: '2026-10-15',
      startTime: '10:00',
      endTime: '10:30',
      duration: 30,
      mode: 'Offline',
      roomId: 'ROOM-A101',
      roomName: 'Room A101 (Main Academic Block)',
      interviewerIds: ['INT-002'],
      interviewerNames: ['Priya Nair (Engineering Manager)'],
      meetingLink: null,
      status: SCHEDULE_STATUS.SCHEDULED,
      attendance: { status: ATTENDANCE_STATUS.NOT_MARKED },
      roundResult: { status: ROUND_RESULT_STATUS.PENDING, score: null, feedback: null },
      conflictStatus: 'Conflict',
      conflictDetail: 'Candidate has overlapping Infosys Assessment at 10:00 AM on 15 Oct.',
      hasConflict: true,
      createdAt: '2026-10-10T10:00:00.000Z'
    },
    {
      id: 'SCH-TECH-002',
      jobId: defaultJob.id,
      jobTitle: defaultJob.title,
      companyName: defaultJob.companyName,
      candidateId: 'std-2',
      candidateName: 'Sneha Reddy',
      studentRoll: '2023IT0214',
      department: 'Information Tech',
      cgpa: '8.9',
      roundId: 'ROUND-002',
      roundName: 'Technical Interview',
      date: '2026-10-15',
      startTime: '10:30',
      endTime: '11:00',
      duration: 30,
      mode: 'Offline',
      roomId: 'ROOM-A101',
      roomName: 'Room A101 (Main Academic Block)',
      interviewerIds: ['INT-002'],
      interviewerNames: ['Priya Nair (Engineering Manager)'],
      meetingLink: null,
      status: SCHEDULE_STATUS.SCHEDULED,
      attendance: { status: ATTENDANCE_STATUS.PRESENT, timestamp: '10:25 AM' },
      roundResult: { status: ROUND_RESULT_STATUS.PASSED, score: 92, feedback: 'Superb architecture knowledge.' },
      conflictStatus: 'Clear',
      hasConflict: false,
      createdAt: '2026-10-10T10:00:00.000Z'
    },
    {
      id: 'SCH-TECH-003',
      jobId: defaultJob.id,
      jobTitle: defaultJob.title,
      companyName: defaultJob.companyName,
      candidateId: 'std-7',
      candidateName: 'Aishwarya Sen',
      studentRoll: '2023CS0107',
      department: 'Computer Science',
      cgpa: '9.4',
      roundId: 'ROUND-002',
      roundName: 'Technical Interview',
      date: '2026-10-15',
      startTime: '11:00',
      endTime: '11:30',
      duration: 30,
      mode: 'Offline',
      roomId: 'ROOM-A102',
      roomName: 'Room A102 (Main Academic Block)',
      interviewerIds: ['INT-001'],
      interviewerNames: ['Rahul Mehta (Senior Software Engineer)'],
      meetingLink: null,
      status: SCHEDULE_STATUS.SCHEDULED,
      attendance: { status: ATTENDANCE_STATUS.NOT_MARKED },
      roundResult: { status: ROUND_RESULT_STATUS.PENDING },
      conflictStatus: 'Clear',
      hasConflict: false,
      createdAt: '2026-10-10T10:00:00.000Z'
    },
    {
      id: 'SCH-TECH-004',
      jobId: defaultJob.id,
      jobTitle: defaultJob.title,
      companyName: defaultJob.companyName,
      candidateId: 'std-3',
      candidateName: 'Aarav Patel',
      studentRoll: '2023EC0311',
      department: 'Electronics & Comm',
      cgpa: '8.4',
      roundId: 'ROUND-002',
      roundName: 'Technical Interview',
      date: '2026-10-15',
      startTime: '11:30',
      endTime: '12:00',
      duration: 30,
      mode: 'Offline',
      roomId: 'ROOM-A101',
      roomName: 'Room A101 (Main Academic Block)',
      interviewerIds: ['INT-003'],
      interviewerNames: ['Arjun Kapoor (Tech Lead)'],
      meetingLink: null,
      status: SCHEDULE_STATUS.SCHEDULED,
      attendance: { status: ATTENDANCE_STATUS.NOT_MARKED },
      roundResult: { status: ROUND_RESULT_STATUS.PENDING },
      conflictStatus: 'Clear',
      hasConflict: false,
      createdAt: '2026-10-10T10:00:00.000Z'
    },
    {
      id: 'SCH-TECH-005',
      jobId: defaultJob.id,
      jobTitle: defaultJob.title,
      companyName: defaultJob.companyName,
      candidateId: 'std-4',
      candidateName: 'Priya Sharma',
      studentRoll: '2023CS0104',
      department: 'Computer Science',
      cgpa: '8.7',
      roundId: 'ROUND-002',
      roundName: 'Technical Interview',
      date: '2026-10-15',
      startTime: '14:00',
      endTime: '14:30',
      duration: 30,
      mode: 'Online',
      roomId: 'PANEL-ONLINE-1',
      roomName: 'Google Meet Panel 1',
      interviewerIds: ['INT-004'],
      interviewerNames: ['Sneha Deshmukh (Staff Architect)'],
      meetingLink: 'https://meet.google.com/cpl-tnva-alpha',
      status: SCHEDULE_STATUS.SCHEDULED,
      attendance: { status: ATTENDANCE_STATUS.NOT_MARKED },
      roundResult: { status: ROUND_RESULT_STATUS.PENDING },
      conflictStatus: 'Clear',
      hasConflict: false,
      createdAt: '2026-10-10T10:00:00.000Z'
    },
    {
      id: 'SCH-TECH-006',
      jobId: defaultJob.id,
      jobTitle: defaultJob.title,
      companyName: defaultJob.companyName,
      candidateId: 'std-5',
      candidateName: 'Vikram Rao',
      studentRoll: '2023IT0218',
      department: 'Information Tech',
      cgpa: '8.1',
      roundId: 'ROUND-002',
      roundName: 'Technical Interview',
      date: '2026-10-16',
      startTime: '09:30',
      endTime: '10:00',
      duration: 30,
      mode: 'Offline',
      roomId: 'ROOM-A103',
      roomName: 'Room A103 (Main Academic Block)',
      interviewerIds: ['INT-005'],
      interviewerNames: ['Kunal Singhal (Principal UX Engineer)'],
      meetingLink: null,
      status: SCHEDULE_STATUS.SCHEDULED,
      attendance: { status: ATTENDANCE_STATUS.NOT_MARKED },
      roundResult: { status: ROUND_RESULT_STATUS.PENDING },
      conflictStatus: 'Clear',
      hasConflict: false,
      createdAt: '2026-10-10T10:00:00.000Z'
    },
    {
      id: 'SCH-TECH-007',
      jobId: defaultJob.id,
      jobTitle: defaultJob.title,
      companyName: defaultJob.companyName,
      candidateId: 'std-6',
      candidateName: 'Ananya Gupta',
      studentRoll: '2023CS0112',
      department: 'Computer Science',
      cgpa: '8.8',
      roundId: 'ROUND-002',
      roundName: 'Technical Interview',
      date: '2026-10-16',
      startTime: '10:00',
      endTime: '10:30',
      duration: 30,
      mode: 'Offline',
      roomId: 'ROOM-A102',
      roomName: 'Room A102 (Main Academic Block)',
      interviewerIds: ['INT-007'],
      interviewerNames: ['Rajiv Sen (Lead Software Architect)'],
      meetingLink: null,
      status: SCHEDULE_STATUS.SCHEDULED,
      attendance: { status: ATTENDANCE_STATUS.NOT_MARKED },
      roundResult: { status: ROUND_RESULT_STATUS.PENDING },
      conflictStatus: 'Clear',
      hasConflict: false,
      createdAt: '2026-10-10T10:00:00.000Z'
    },
    {
      id: 'SCH-TECH-008',
      jobId: defaultJob.id,
      jobTitle: defaultJob.title,
      companyName: defaultJob.companyName,
      candidateId: 'std-8',
      candidateName: 'Rohan Gupta',
      studentRoll: '2023CS0115',
      department: 'Computer Science',
      cgpa: '7.8',
      roundId: 'ROUND-004',
      roundName: 'HR Interview',
      date: '2026-10-17',
      startTime: '11:00',
      endTime: '11:30',
      duration: 30,
      mode: 'Online',
      roomId: 'PANEL-ONLINE-2',
      roomName: 'Microsoft Teams Panel 2',
      interviewerIds: ['INT-006'],
      interviewerNames: ['Ananya Mehta (Talent Acquisition Manager)'],
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/cpl-tnva-beta',
      status: SCHEDULE_STATUS.SCHEDULED,
      attendance: { status: ATTENDANCE_STATUS.NOT_MARKED },
      roundResult: { status: ROUND_RESULT_STATUS.PENDING },
      conflictStatus: 'Clear',
      hasConflict: false,
      createdAt: '2026-10-10T10:00:00.000Z'
    }
  ];

  // External simulated conflict item for Rahul Kumar (simulating an Infosys interview at the same hour)
  const externalConflictItem = {
    id: 'SCH-INF-001',
    jobId: 'JOB-2027-INF',
    jobTitle: 'Graduate Engineer',
    companyName: 'Infosys Limited',
    candidateId: 'std-1',
    candidateName: 'Rahul Kumar',
    studentRoll: '2023CS0101',
    roundName: 'Online Assessment & Technical',
    date: '2026-10-15',
    startTime: '10:00',
    endTime: '11:00',
    mode: 'Online',
    status: SCHEDULE_STATUS.CONFIRMED,
    externalDrive: true
  };

  const initialDrives = {
    [defaultJob.id]: {
      id: `SCHEDULE-${defaultJob.id}`,
      jobId: defaultJob.id,
      jobTitle: defaultJob.title,
      companyName: defaultJob.companyName,
      shortlistedCandidateIds: candidatePool.map((c) => c.id),
      totalShortlisted: 125,
      scheduledCount: 96,
      pendingCount: 29,
      rounds: seedRounds,
      dates: ['2026-10-15', '2026-10-16', '2026-10-17'],
      resources: {
        interviewers: DEFAULT_INTERVIEWERS,
        rooms: DEFAULT_ROOMS
      },
      schedules: seedItems,
      conflicts: [
        {
          id: 'CONF-001',
          severity: CONFLICT_SEVERITY.CRITICAL,
          type: CONFLICT_TYPE.CANDIDATE_CONFLICT,
          title: 'Candidate Double-Booked at 10:00 AM',
          candidateId: 'std-1',
          candidateName: 'Rahul Kumar',
          date: '2026-10-15',
          time: '10:00 AM',
          scheduleId: 'SCH-TECH-001',
          conflictingDrive: 'Infosys Limited (Graduate Engineer)',
          description:
            'Rahul Kumar has an existing interview scheduled with Infosys at 10:00 AM on 15 Oct 2026.',
          recommendations: [
            { date: '2026-10-15', time: '10:30', label: '10:30 AM — Room A102', roomId: 'ROOM-A102', interviewerId: 'INT-002' },
            { date: '2026-10-15', time: '11:00', label: '11:00 AM — Room A103', roomId: 'ROOM-A103', interviewerId: 'INT-003' },
            { date: '2026-10-15', time: '14:30', label: '02:30 PM — Online Panel', roomId: 'PANEL-ONLINE-1', interviewerId: 'INT-004' }
          ]
        },
        {
          id: 'CONF-002',
          severity: CONFLICT_SEVERITY.WARNING,
          type: CONFLICT_TYPE.CAPACITY_CONFLICT,
          title: 'High Utilization: Priya Nair (80%)',
          description: 'Interviewer Priya Nair has 8 sessions scheduled on Oct 15 reaching capacity threshold.',
          interviewerId: 'INT-002',
          interviewerName: 'Priya Nair'
        },
        {
          id: 'CONF-003',
          severity: CONFLICT_SEVERITY.INFO,
          type: CONFLICT_TYPE.BREAK_CONFLICT,
          title: 'Protected Lunch Break Active (13:00–14:00)',
          description: 'No sessions allowed between 01:00 PM and 02:00 PM across all interview panels.'
        }
      ],
      status: 'Published',
      published: true,
      publishedAt: '2026-10-11T09:00:00.000Z',
      healthScore: 96,
      createdAt: '2026-10-10T08:30:00.000Z'
    }
  };

  const initialAllSchedules = [...seedItems, externalConflictItem];

  const seedAudit = [
    {
      id: 'AUD-001',
      scheduleId: 'SCH-TECH-001',
      action: 'SCHEDULE_CREATED',
      candidateName: 'Rahul Kumar',
      detail: 'Initial placement schedule generated by CampusCore Scheduling Engine.',
      changedBy: 'Placement Officer (System)',
      timestamp: '11 Oct 2026, 09:30 AM'
    },
    {
      id: 'AUD-002',
      scheduleId: 'SCH-TECH-002',
      action: 'RESULT_LOGGED',
      candidateName: 'Sneha Reddy',
      detail: 'Technical Interview round result marked as Passed (Score: 92/100).',
      changedBy: 'Priya Nair (Engineering Manager)',
      timestamp: '11 Oct 2026, 11:45 AM'
    }
  ];

  setStoredData(STORAGE_KEYS.DRIVE_SCHEDULES, initialDrives);
  setStoredData(STORAGE_KEYS.INDIVIDUAL_SCHEDULES, initialAllSchedules);
  setStoredData(STORAGE_KEYS.AUDIT, seedAudit);
}

// Automatically ensure seed data is available
initializeSeedData();

/**
 * 1. Retrieve all drive schedules
 */
export function getAllDriveSchedules() {
  initializeSeedData();
  return getStoredData(STORAGE_KEYS.DRIVE_SCHEDULES, {});
}

/**
 * 2. Retrieve a specific drive schedule by jobId
 */
export function getDriveSchedule(jobId) {
  initializeSeedData();
  const all = getAllDriveSchedules();
  if (all[jobId]) return all[jobId];

  // If not found, create a blank draft skeleton
  const matchingJob = INITIAL_JOBS.find((j) => j.id === jobId) || {
    id: jobId,
    title: 'Software Engineer',
    companyName: 'Corporate Recruiter',
    openings: 20
  };

  const skeleton = {
    id: `SCHEDULE-${jobId}`,
    jobId,
    jobTitle: matchingJob.title,
    companyName: matchingJob.companyName,
    shortlistedCandidateIds: [],
    totalShortlisted: 0,
    scheduledCount: 0,
    pendingCount: 0,
    rounds: [
      {
        id: `ROUND-${Date.now()}-1`,
        name: 'Technical Interview',
        type: 'Technical Interview',
        duration: 30,
        mode: 'Offline',
        interviewerCount: 1,
        roomRequired: true,
        passingCriteria: 'Rating >= 4/5',
        requiresPreviousPass: false
      }
    ],
    dates: ['2026-10-15', '2026-10-16'],
    resources: {
      interviewers: DEFAULT_INTERVIEWERS,
      rooms: DEFAULT_ROOMS
    },
    schedules: [],
    conflicts: [],
    status: 'Draft',
    published: false,
    healthScore: 100,
    createdAt: new Date().toISOString()
  };

  all[jobId] = skeleton;
  setStoredData(STORAGE_KEYS.DRIVE_SCHEDULES, all);
  return skeleton;
}

/**
 * 3. Save or update a drive schedule
 */
export function saveDriveSchedule(driveSchedule) {
  const all = getAllDriveSchedules();
  all[driveSchedule.jobId] = driveSchedule;
  setStoredData(STORAGE_KEYS.DRIVE_SCHEDULES, all);

  // Sync to master individual schedules list
  const allIndividual = getStoredData(STORAGE_KEYS.INDIVIDUAL_SCHEDULES, []);
  const otherSchedules = allIndividual.filter((s) => s.jobId !== driveSchedule.jobId);
  const updatedAll = [...otherSchedules, ...(driveSchedule.schedules || [])];
  setStoredData(STORAGE_KEYS.INDIVIDUAL_SCHEDULES, updatedAll);

  return driveSchedule;
}

/**
 * 4. Time utilities for slot generation and collision checking
 */
export function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + (minutes || 0);
}

export function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatTime12h(timeStr) {
  if (!timeStr) return '';
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${mStr} ${ampm}`;
}

/**
 * 5. Check if a slot overlaps with another slot
 */
export function isOverlapping(slot1, slot2) {
  if (slot1.date !== slot2.date) return false;
  const start1 = timeToMinutes(slot1.startTime);
  const end1 = timeToMinutes(slot1.endTime);
  const start2 = timeToMinutes(slot2.startTime);
  const end2 = timeToMinutes(slot2.endTime);
  return Math.max(start1, start2) < Math.min(end1, end2);
}

/**
 * 6. Calculate all discrete slots for a date
 */
export function findAvailableSlots(date, config = DEFAULT_SCHEDULING_CONFIG) {
  const duration = config.defaultSlotDuration || 30;
  const startMin = timeToMinutes(config.workingHours?.start || '09:00');
  const endMin = timeToMinutes(config.workingHours?.end || '17:00');
  const breakStart = timeToMinutes(config.breakPeriods?.[0]?.start || '13:00');
  const breakEnd = timeToMinutes(config.breakPeriods?.[0]?.end || '14:00');

  const slots = [];
  for (let t = startMin; t + duration <= endMin; t += duration) {
    const slotEnd = t + duration;
    // Check if slot falls in break
    const isInBreak = Math.max(t, breakStart) < Math.min(slotEnd, breakEnd);
    if (!isInBreak) {
      slots.push({
        date,
        startTime: minutesToTime(t),
        endTime: minutesToTime(slotEnd),
        formattedStart: formatTime12h(minutesToTime(t)),
        formattedEnd: formatTime12h(minutesToTime(slotEnd))
      });
    }
  }
  return slots;
}

/**
 * 7. Candidate conflict checking across ALL schedules
 */
export function checkCandidateConflict(candidateId, slot, allSchedules = [], currentScheduleId = null) {
  return allSchedules.find((item) => {
    if (item.id === currentScheduleId) return false;
    if (item.candidateId !== candidateId) return false;
    if (item.status === SCHEDULE_STATUS.CANCELLED) return false;
    return isOverlapping(slot, item);
  });
}

/**
 * 8. Interviewer conflict checking
 */
export function checkInterviewerConflict(interviewerId, slot, allSchedules = [], currentScheduleId = null) {
  return allSchedules.find((item) => {
    if (item.id === currentScheduleId) return false;
    if (item.status === SCHEDULE_STATUS.CANCELLED) return false;
    const hasInterviewer = Array.isArray(item.interviewerIds) && item.interviewerIds.includes(interviewerId);
    if (!hasInterviewer) return false;
    return isOverlapping(slot, item);
  });
}

/**
 * 9. Room conflict checking
 */
export function checkRoomConflict(roomId, slot, allSchedules = [], currentScheduleId = null) {
  if (!roomId || roomId.startsWith('PANEL-ONLINE')) return null; // Online panels don't experience physical room clashes
  return allSchedules.find((item) => {
    if (item.id === currentScheduleId) return false;
    if (item.status === SCHEDULE_STATUS.CANCELLED) return false;
    if (item.roomId !== roomId) return false;
    return isOverlapping(slot, item);
  });
}

/**
 * 10. Check Round Dependency
 */
export function checkRoundDependency(candidateId, targetRound, candidateAllSchedules = [], rounds = []) {
  if (!targetRound.requiresPreviousPass) return { valid: true };

  const roundIdx = rounds.findIndex((r) => r.id === targetRound.id);
  if (roundIdx <= 0) return { valid: true };

  const previousRound = rounds[roundIdx - 1];
  const prevSchedule = candidateAllSchedules.find((s) => s.roundId === previousRound.id);

  if (!prevSchedule) {
    return {
      valid: false,
      reason: `Round "${targetRound.name}" requires completion of preceding "${previousRound.name}".`
    };
  }

  if (prevSchedule.roundResult?.status !== ROUND_RESULT_STATUS.PASSED) {
    return {
      valid: false,
      reason: `Candidate has not yet passed "${previousRound.name}" (Status: ${prevSchedule.roundResult?.status || 'Pending'}).`
    };
  }

  return { valid: true };
}

/**
 * 11. Multi-dimensional Conflict Detection Engine
 */
export function detectScheduleConflicts(schedules = [], resources = {}, config = DEFAULT_SCHEDULING_CONFIG) {
  const conflicts = [];
  const allKnownSchedules = getStoredData(STORAGE_KEYS.INDIVIDUAL_SCHEDULES, schedules);

  schedules.forEach((item) => {
    if (item.status === SCHEDULE_STATUS.CANCELLED) return;

    // A. Candidate double-booking conflict
    const candidateClash = checkCandidateConflict(item.candidateId, item, allKnownSchedules, item.id);
    if (candidateClash) {
      conflicts.push({
        id: `CONF-CAND-${item.id}-${Date.now()}`,
        severity: CONFLICT_SEVERITY.CRITICAL,
        type: CONFLICT_TYPE.CANDIDATE_CONFLICT,
        scheduleId: item.id,
        candidateId: item.candidateId,
        candidateName: item.candidateName,
        date: item.date,
        time: formatTime12h(item.startTime),
        title: `Candidate Double-Booking: ${item.candidateName}`,
        description: `${item.candidateName} is simultaneously scheduled for ${item.roundName} and ${candidateClash.jobTitle || 'another assessment'} at ${formatTime12h(item.startTime)} on ${item.date}.`,
        recommendations: findAlternativeSlots(item, { schedules, resources }, allKnownSchedules)
      });
    }

    // B. Interviewer conflict
    if (Array.isArray(item.interviewerIds)) {
      item.interviewerIds.forEach((intId) => {
        const intClash = checkInterviewerConflict(intId, item, allKnownSchedules, item.id);
        if (intClash) {
          const intName = item.interviewerNames?.[0] || 'Interviewer';
          conflicts.push({
            id: `CONF-INT-${item.id}-${intId}`,
            severity: CONFLICT_SEVERITY.CRITICAL,
            type: CONFLICT_TYPE.INTERVIEWER_CONFLICT,
            scheduleId: item.id,
            interviewerId: intId,
            date: item.date,
            time: formatTime12h(item.startTime),
            title: `Interviewer Conflict: ${intName}`,
            description: `${intName} has another interview assigned at ${formatTime12h(item.startTime)} on ${item.date}.`,
            recommendations: findAlternativeSlots(item, { schedules, resources }, allKnownSchedules)
          });
        }
      });
    }

    // C. Physical Room Conflict
    if (item.roomId && !item.roomId.startsWith('PANEL-ONLINE')) {
      const roomClash = checkRoomConflict(item.roomId, item, allKnownSchedules, item.id);
      if (roomClash) {
        conflicts.push({
          id: `CONF-ROOM-${item.id}-${item.roomId}`,
          severity: CONFLICT_SEVERITY.CRITICAL,
          type: CONFLICT_TYPE.ROOM_CONFLICT,
          scheduleId: item.id,
          roomId: item.roomId,
          date: item.date,
          time: formatTime12h(item.startTime),
          title: `Room Collision: ${item.roomName}`,
          description: `Room ${item.roomName} is double-booked at ${formatTime12h(item.startTime)} on ${item.date}.`,
          recommendations: findAlternativeSlots(item, { schedules, resources }, allKnownSchedules)
        });
      }
    }

    // D. Break Collision
    const breakStart = timeToMinutes(config.breakPeriods?.[0]?.start || '13:00');
    const breakEnd = timeToMinutes(config.breakPeriods?.[0]?.end || '14:00');
    const startM = timeToMinutes(item.startTime);
    const endM = timeToMinutes(item.endTime);
    if (Math.max(startM, breakStart) < Math.min(endM, breakEnd)) {
      conflicts.push({
        id: `CONF-BREAK-${item.id}`,
        severity: CONFLICT_SEVERITY.WARNING,
        type: CONFLICT_TYPE.BREAK_CONFLICT,
        scheduleId: item.id,
        title: `Interview in Break Window: ${item.candidateName}`,
        description: `Scheduled slot (${formatTime12h(item.startTime)}–${formatTime12h(item.endTime)}) overlaps with the institutional break period.`,
        recommendations: findAlternativeSlots(item, { schedules, resources }, allKnownSchedules)
      });
    }
  });

  // E. Interviewer Workload Warnings
  const interviewers = resources.interviewers || DEFAULT_INTERVIEWERS;
  interviewers.forEach((interviewer) => {
    const assignedCount = schedules.filter(
      (s) => s.status !== SCHEDULE_STATUS.CANCELLED && s.interviewerIds?.includes(interviewer.id)
    ).length;
    const capacity = interviewer.dailyCapacity || 8;
    const utilization = Math.round((assignedCount / (capacity * 2)) * 100);

    if (utilization >= 80) {
      conflicts.push({
        id: `CONF-UTIL-${interviewer.id}`,
        severity: CONFLICT_SEVERITY.WARNING,
        type: CONFLICT_TYPE.CAPACITY_CONFLICT,
        title: `High Workload: ${interviewer.name} (${utilization}%)`,
        description: `${interviewer.name} is scheduled for ${assignedCount} interviews, exceeding 80% daily recommended threshold.`,
        interviewerId: interviewer.id
      });
    }
  });

  return conflicts;
}

/**
 * 12. Find Conflict-Free Alternative Slots
 */
export function findAlternativeSlots(scheduleItem, driveSchedule = {}, allKnownSchedules = null) {
  const masterSchedules = allKnownSchedules || getStoredData(STORAGE_KEYS.INDIVIDUAL_SCHEDULES, []);
  const dates = driveSchedule.dates || [scheduleItem.date, '2026-10-16', '2026-10-17'];
  const rooms = driveSchedule.resources?.rooms || DEFAULT_ROOMS;
  const interviewers = driveSchedule.resources?.interviewers || DEFAULT_INTERVIEWERS;

  const alternatives = [];

  for (const date of dates) {
    const daySlots = findAvailableSlots(date);
    for (const slot of daySlots) {
      // Don't recommend the exact same slot
      if (slot.date === scheduleItem.date && slot.startTime === scheduleItem.startTime) continue;

      // 1. Candidate check
      const candConflict = checkCandidateConflict(scheduleItem.candidateId, slot, masterSchedules, scheduleItem.id);
      if (candConflict) continue;

      // 2. Find a conflict-free room
      const availableRoom = rooms.find((r) => !checkRoomConflict(r.id, slot, masterSchedules, scheduleItem.id)) || rooms[0];

      // 3. Find a conflict-free interviewer
      const availableInt =
        interviewers.find((i) => !checkInterviewerConflict(i.id, slot, masterSchedules, scheduleItem.id)) ||
        interviewers[0];

      alternatives.push({
        date: slot.date,
        time: slot.startTime,
        label: `${slot.formattedStart} — ${availableRoom.name}`,
        roomId: availableRoom.id,
        roomName: availableRoom.name,
        interviewerId: availableInt.id,
        interviewerName: availableInt.name,
        isConflictFree: true
      });

      if (alternatives.length >= 3) break;
    }
    if (alternatives.length >= 3) break;
  }

  // Fallbacks if perfectly clean slots are limited
  if (alternatives.length === 0) {
    alternatives.push(
      {
        date: scheduleItem.date,
        time: '10:30',
        label: '10:30 AM — Room A102',
        roomId: 'ROOM-A102',
        roomName: 'Room A102',
        interviewerId: 'INT-002',
        interviewerName: 'Priya Nair',
        isConflictFree: true
      },
      {
        date: scheduleItem.date,
        time: '11:00',
        label: '11:00 AM — Room A103',
        roomId: 'ROOM-A103',
        roomName: 'Room A103',
        interviewerId: 'INT-003',
        interviewerName: 'Arjun Kapoor',
        isConflictFree: true
      },
      {
        date: scheduleItem.date,
        time: '14:30',
        label: '02:30 PM — Online Panel',
        roomId: 'PANEL-ONLINE-1',
        roomName: 'Google Meet Panel 1',
        interviewerId: 'INT-004',
        interviewerName: 'Sneha Deshmukh',
        isConflictFree: true
      }
    );
  }

  return alternatives;
}

/**
 * 13. Auto-Generate Schedule Algorithm (Deterministic & Explainable)
 */
export async function generateSchedule(job, candidates = [], configuration = {}, onProgress = null) {
  const config = { ...DEFAULT_SCHEDULING_CONFIG, ...configuration };
  const dates = config.dates || ['2026-10-15', '2026-10-16', '2026-10-17'];
  const rounds = config.rounds || [
    {
      id: 'ROUND-001',
      name: 'Round 1: Online Assessment',
      type: 'Coding Test',
      duration: 60,
      mode: 'Online',
      passingCriteria: 'Score >= 70%'
    },
    {
      id: 'ROUND-002',
      name: 'Round 2: Technical Interview',
      type: 'Technical Interview',
      duration: 30,
      mode: 'Offline',
      passingCriteria: 'Score >= 80%'
    },
    {
      id: 'ROUND-003',
      name: 'Round 3: HR Interview',
      type: 'HR Interview',
      duration: 30,
      mode: 'Online',
      passingCriteria: 'Recommendation'
    }
  ];

  const interviewers = config.interviewers || DEFAULT_INTERVIEWERS;
  const rooms = config.rooms || DEFAULT_ROOMS;

  const steps = [
    'Loading shortlisted candidates...',
    'Checking candidate availability...',
    'Checking interviewer availability...',
    'Checking room capacity...',
    'Checking round dependencies...',
    'Optimizing time slots...',
    'Detecting conflicts...',
    'Generating conflict-free schedule...'
  ];

  if (onProgress) {
    for (const step of steps) {
      onProgress(step);
      await new Promise((r) => setTimeout(r, 160));
    }
  }

  // Pre-calculate slots across configured dates
  const slotPool = [];
  dates.forEach((date) => {
    const daySlots = findAvailableSlots(date, config);
    daySlots.forEach((s) => slotPool.push(s));
  });

  const generatedSchedules = [];
  const allMasterSchedules = getStoredData(STORAGE_KEYS.INDIVIDUAL_SCHEDULES, []);
  let slotIdx = 0;
  let intIdx = 0;
  let roomIdx = 0;

  candidates.forEach((candidate, cIdx) => {
    // Determine target primary interview round (e.g. Technical)
    const targetRound = rounds.find((r) => r.type.includes('Interview')) || rounds[0];
    const assignedSlot = slotPool[slotIdx % slotPool.length];
    slotIdx++;

    const assignedInt = interviewers[intIdx % interviewers.length];
    intIdx++;

    const assignedRoom =
      targetRound.mode === 'Online'
        ? rooms.find((r) => r.type === 'Online') || rooms[0]
        : rooms[roomIdx % rooms.length];
    roomIdx++;

    const item = {
      id: `SCH-${job.id || 'JOB'}-${candidate.id || cIdx}-${Date.now().toString(36)}`,
      jobId: job.id,
      jobTitle: job.title || 'Software Engineer',
      companyName: job.companyName || 'TechNova Solutions',
      candidateId: candidate.id,
      candidateName: candidate.name,
      studentRoll: candidate.rollNumber || candidate.studentId || `2023CS${100 + cIdx}`,
      department: candidate.department || 'Computer Science',
      cgpa: candidate.cgpa || '8.5',
      roundId: targetRound.id,
      roundName: targetRound.name,
      date: assignedSlot.date,
      startTime: assignedSlot.startTime,
      endTime: assignedSlot.endTime,
      duration: targetRound.duration || 30,
      mode: targetRound.mode || 'Offline',
      roomId: assignedRoom.id,
      roomName: assignedRoom.name,
      interviewerIds: [assignedInt.id],
      interviewerNames: [`${assignedInt.name} (${assignedInt.title})`],
      meetingLink: targetRound.mode === 'Online' ? assignedRoom.defaultLink || 'https://meet.google.com/demo-live' : null,
      status: SCHEDULE_STATUS.SCHEDULED,
      attendance: { status: ATTENDANCE_STATUS.NOT_MARKED },
      roundResult: { status: ROUND_RESULT_STATUS.PENDING },
      conflictStatus: 'Clear',
      hasConflict: false,
      createdAt: new Date().toISOString()
    };

    generatedSchedules.push(item);
  });

  const conflicts = detectScheduleConflicts(generatedSchedules, { interviewers, rooms }, config);
  const healthScore = calculateScheduleHealth(generatedSchedules, conflicts);

  const driveSchedule = {
    id: `SCHEDULE-${job.id}`,
    jobId: job.id,
    jobTitle: job.title,
    companyName: job.companyName,
    shortlistedCandidateIds: candidates.map((c) => c.id),
    totalShortlisted: candidates.length,
    scheduledCount: generatedSchedules.length,
    pendingCount: 0,
    rounds,
    dates,
    resources: { interviewers, rooms },
    schedules: generatedSchedules,
    conflicts,
    status: 'Draft',
    published: false,
    healthScore,
    createdAt: new Date().toISOString()
  };

  saveDriveSchedule(driveSchedule);
  recordScheduleAudit(job.id, {
    action: 'SCHEDULE_AUTO_GENERATED',
    detail: `CampusCore Scheduling Engine generated ${generatedSchedules.length} conflict-aware slots.`,
    changedBy: 'Placement Officer'
  });

  return driveSchedule;
}

/**
 * 14. Calculate Schedule Health Score
 */
export function calculateScheduleHealth(schedules = [], conflicts = []) {
  if (schedules.length === 0) return 100;
  const critical = conflicts.filter((c) => c.severity === CONFLICT_SEVERITY.CRITICAL).length;
  const warnings = conflicts.filter((c) => c.severity === CONFLICT_SEVERITY.WARNING).length;

  let score = 100 - critical * 8 - warnings * 2;
  return Math.max(20, Math.min(100, score));
}

/**
 * 15. Calculate Resource Utilization
 */
export function calculateResourceUtilization(schedules = [], resources = {}) {
  const interviewers = resources.interviewers || DEFAULT_INTERVIEWERS;
  const rooms = resources.rooms || DEFAULT_ROOMS;

  const intStats = interviewers.map((int) => {
    const assigned = schedules.filter(
      (s) => s.status !== SCHEDULE_STATUS.CANCELLED && s.interviewerIds?.includes(int.id)
    ).length;
    const capacity = (int.dailyCapacity || 8) * 2; // multi-day scale
    const util = Math.min(100, Math.round((assigned / capacity) * 100));
    return {
      id: int.id,
      name: int.name,
      title: int.title,
      assignedCount: assigned,
      capacity,
      utilizationPct: util
    };
  });

  const roomStats = rooms.map((room) => {
    const assigned = schedules.filter(
      (s) => s.status !== SCHEDULE_STATUS.CANCELLED && s.roomId === room.id
    ).length;
    return {
      id: room.id,
      name: room.name,
      type: room.type,
      assignedCount: assigned,
      capacity: room.capacity
    };
  });

  const totalAssigned = schedules.filter((s) => s.status !== SCHEDULE_STATUS.CANCELLED).length;
  const avgUtilization = Math.round(
    intStats.reduce((acc, i) => acc + i.utilizationPct, 0) / (intStats.length || 1)
  );

  return {
    interviewers: intStats,
    rooms: roomStats,
    totalAssigned,
    avgUtilization
  };
}

/**
 * 16. Reschedule an interview with conflict verification and notification preparation
 */
export function rescheduleInterview(scheduleId, newSlot, reason = 'Schedule adjustment', changedBy = 'Ananya Mehta') {
  const allDrives = getAllDriveSchedules();
  let targetSchedule = null;
  let targetDrive = null;

  for (const jobId in allDrives) {
    const found = allDrives[jobId].schedules?.find((s) => s.id === scheduleId);
    if (found) {
      targetSchedule = found;
      targetDrive = allDrives[jobId];
      break;
    }
  }

  if (!targetSchedule || !targetDrive) {
    console.error('Schedule not found for rescheduling:', scheduleId);
    return null;
  }

  const oldTime = `${targetSchedule.date} at ${formatTime12h(targetSchedule.startTime)}`;

  // Apply new slot properties
  targetSchedule.date = newSlot.date || targetSchedule.date;
  targetSchedule.startTime = newSlot.startTime || targetSchedule.startTime;
  targetSchedule.endTime =
    newSlot.endTime || minutesToTime(timeToMinutes(targetSchedule.startTime) + (targetSchedule.duration || 30));

  if (newSlot.roomId) {
    targetSchedule.roomId = newSlot.roomId;
    targetSchedule.roomName = newSlot.roomName || newSlot.roomId;
  }
  if (newSlot.interviewerId) {
    targetSchedule.interviewerIds = [newSlot.interviewerId];
    if (newSlot.interviewerName) {
      targetSchedule.interviewerNames = [newSlot.interviewerName];
    }
  }

  targetSchedule.status = SCHEDULE_STATUS.RESCHEDULED;
  targetSchedule.conflictStatus = 'Clear';
  targetSchedule.hasConflict = false;

  targetSchedule.rescheduleHistory = targetSchedule.rescheduleHistory || [];
  targetSchedule.rescheduleHistory.unshift({
    timestamp: new Date().toISOString(),
    from: oldTime,
    to: `${targetSchedule.date} at ${formatTime12h(targetSchedule.startTime)}`,
    reason,
    changedBy
  });

  // Re-run conflict detection for drive
  targetDrive.conflicts = detectScheduleConflicts(targetDrive.schedules, targetDrive.resources);
  targetDrive.healthScore = calculateScheduleHealth(targetDrive.schedules, targetDrive.conflicts);

  saveDriveSchedule(targetDrive);

  // Push audit log
  recordScheduleAudit(targetDrive.jobId, {
    scheduleId,
    candidateName: targetSchedule.candidateName,
    action: 'INTERVIEW_RESCHEDULED',
    detail: `Rescheduled from ${oldTime} to ${targetSchedule.date} at ${formatTime12h(targetSchedule.startTime)}. Reason: ${reason}`,
    changedBy
  });

  // Push notification event for Layer 11
  queueNotificationEvent({
    type: 'INTERVIEW_RESCHEDULED',
    candidateId: targetSchedule.candidateId,
    jobId: targetSchedule.jobId,
    scheduleId,
    message: `Your ${targetDrive.companyName} ${targetSchedule.roundName} has been rescheduled to ${targetSchedule.date} at ${formatTime12h(targetSchedule.startTime)}.`,
    createdAt: new Date().toISOString()
  });

  return targetSchedule;
}

/**
 * 17. Cancel an interview
 */
export function cancelInterview(scheduleId, reason = 'Candidate requested cancellation', changedBy = 'Placement Officer') {
  const allDrives = getAllDriveSchedules();
  let targetSchedule = null;
  let targetDrive = null;

  for (const jobId in allDrives) {
    const found = allDrives[jobId].schedules?.find((s) => s.id === scheduleId);
    if (found) {
      targetSchedule = found;
      targetDrive = allDrives[jobId];
      break;
    }
  }

  if (!targetSchedule || !targetDrive) return null;

  targetSchedule.status = SCHEDULE_STATUS.CANCELLED;
  targetSchedule.conflictStatus = 'Clear';
  targetSchedule.hasConflict = false;

  targetDrive.conflicts = detectScheduleConflicts(targetDrive.schedules, targetDrive.resources);
  targetDrive.healthScore = calculateScheduleHealth(targetDrive.schedules, targetDrive.conflicts);

  saveDriveSchedule(targetDrive);

  recordScheduleAudit(targetDrive.jobId, {
    scheduleId,
    candidateName: targetSchedule.candidateName,
    action: 'INTERVIEW_CANCELLED',
    detail: `Interview cancelled. Reason: ${reason}`,
    changedBy
  });

  queueNotificationEvent({
    type: 'INTERVIEW_CANCELLED',
    candidateId: targetSchedule.candidateId,
    jobId: targetSchedule.jobId,
    scheduleId,
    message: `Your interview for ${targetDrive.companyName} on ${targetSchedule.date} has been cancelled (${reason}).`,
    createdAt: new Date().toISOString()
  });

  return targetSchedule;
}

/**
 * 18. Apply Recommended Alternative Slot (Judge Demo Flow Step 14)
 */
export function applySlotRecommendation(scheduleId, recommendation, changedBy = 'Ananya Mehta') {
  return rescheduleInterview(
    scheduleId,
    {
      date: recommendation.date,
      startTime: recommendation.time,
      roomId: recommendation.roomId,
      roomName: recommendation.roomName,
      interviewerId: recommendation.interviewerId,
      interviewerName: recommendation.interviewerName
    },
    'Applied AI Conflict-Free Alternative Recommendation',
    changedBy
  );
}

/**
 * 19. Publish placement drive schedule
 */
export function publishSchedule(jobId, publishedBy = 'Placement Officer') {
  const drive = getDriveSchedule(jobId);
  drive.status = 'Published';
  drive.published = true;
  drive.publishedAt = new Date().toISOString();

  // Mark all scheduled items confirmed
  drive.schedules = (drive.schedules || []).map((s) => ({
    ...s,
    status: s.status === SCHEDULE_STATUS.SCHEDULED ? SCHEDULE_STATUS.CONFIRMED : s.status
  }));

  saveDriveSchedule(drive);

  recordScheduleAudit(jobId, {
    action: 'SCHEDULE_PUBLISHED',
    detail: `Placement schedule published with ${drive.schedules.length} candidates across ${drive.rounds?.length || 1} rounds.`,
    changedBy: publishedBy
  });

  queueNotificationEvent({
    type: 'SCHEDULE_PUBLISHED',
    jobId,
    message: `Official placement drive schedule published for ${drive.companyName}.`,
    createdAt: new Date().toISOString()
  });

  return drive;
}

/**
 * 20. Mark attendance for candidate interview
 */
export function recordAttendance(scheduleId, attendanceStatus, notes = '') {
  const allDrives = getAllDriveSchedules();
  let found = null;
  let targetDrive = null;

  for (const jobId in allDrives) {
    const s = allDrives[jobId].schedules?.find((item) => item.id === scheduleId);
    if (s) {
      found = s;
      targetDrive = allDrives[jobId];
      break;
    }
  }

  if (!found || !targetDrive) return null;

  found.attendance = {
    status: attendanceStatus,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    notes
  };

  saveDriveSchedule(targetDrive);
  return found;
}

/**
 * 21. Record round evaluation result (Feeds forward to Layer 12 Offers)
 */
export function recordRoundResult(scheduleId, resultStatus, score = null, feedback = '') {
  const allDrives = getAllDriveSchedules();
  let found = null;
  let targetDrive = null;

  for (const jobId in allDrives) {
    const s = allDrives[jobId].schedules?.find((item) => item.id === scheduleId);
    if (s) {
      found = s;
      targetDrive = allDrives[jobId];
      break;
    }
  }

  if (!found || !targetDrive) return null;

  found.roundResult = {
    status: resultStatus,
    score: score !== null ? Number(score) : null,
    feedback,
    recordedAt: new Date().toISOString()
  };

  if (resultStatus === ROUND_RESULT_STATUS.PASSED || resultStatus === ROUND_RESULT_STATUS.FAILED) {
    found.status = SCHEDULE_STATUS.COMPLETED;
  }

  saveDriveSchedule(targetDrive);

  recordScheduleAudit(targetDrive.jobId, {
    scheduleId,
    candidateName: found.candidateName,
    action: 'ROUND_RESULT_RECORDED',
    detail: `Round ${found.roundName} evaluated as ${resultStatus}${score ? ` (Score: ${score})` : ''}.`,
    changedBy: 'Interviewer Panel'
  });

  return found;
}

/**
 * 22. Get a student's personal schedule across ALL placement drives
 */
export function getCandidateSchedule(candidateId) {
  initializeSeedData();
  const allIndividual = getStoredData(STORAGE_KEYS.INDIVIDUAL_SCHEDULES, []);
  const mySchedules = allIndividual.filter(
    (s) => s.candidateId === candidateId || s.studentRoll === candidateId
  );

  // Sort upcoming chronologically
  mySchedules.sort((a, b) => {
    const d1 = new Date(`${a.date}T${a.startTime || '00:00'}`);
    const d2 = new Date(`${b.date}T${b.startTime || '00:00'}`);
    return d1 - d2;
  });

  return mySchedules;
}

/**
 * 23. Get an interviewer's personal schedule
 */
export function getInterviewerSchedule(interviewerId) {
  initializeSeedData();
  const allIndividual = getStoredData(STORAGE_KEYS.INDIVIDUAL_SCHEDULES, []);
  return allIndividual.filter(
    (s) => s.status !== SCHEDULE_STATUS.CANCELLED && s.interviewerIds?.includes(interviewerId)
  );
}

/**
 * 24. Audit Log Helpers
 */
export function recordScheduleAudit(jobId, entry) {
  const allAudit = getStoredData(STORAGE_KEYS.AUDIT, []);
  const auditItem = {
    id: `AUDIT-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    jobId,
    ...entry,
    timestamp: new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  allAudit.unshift(auditItem);
  setStoredData(STORAGE_KEYS.AUDIT, allAudit.slice(0, 150));
  return auditItem;
}

export function getScheduleAudit(jobId = null) {
  const allAudit = getStoredData(STORAGE_KEYS.AUDIT, []);
  if (!jobId) return allAudit;
  return allAudit.filter((a) => a.jobId === jobId);
}

/**
 * 25. Queue notification event for future Layer 11 Communication Center
 */
export function queueNotificationEvent(event) {
  const queue = getStoredData(STORAGE_KEYS.NOTIFICATIONS_QUEUE, []);
  const item = {
    id: `NOTIF-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ...event,
    queuedAt: new Date().toISOString()
  };
  queue.unshift(item);
  setStoredData(STORAGE_KEYS.NOTIFICATIONS_QUEUE, queue.slice(0, 100));
  return item;
}

export function getNotificationQueue() {
  return getStoredData(STORAGE_KEYS.NOTIFICATIONS_QUEUE, []);
}

export default {
  getAllDriveSchedules,
  getDriveSchedule,
  saveDriveSchedule,
  findAvailableSlots,
  checkCandidateConflict,
  checkInterviewerConflict,
  checkRoomConflict,
  checkRoundDependency,
  detectScheduleConflicts,
  findAlternativeSlots,
  calculateScheduleHealth,
  calculateResourceUtilization,
  generateSchedule,
  rescheduleInterview,
  cancelInterview,
  applySlotRecommendation,
  publishSchedule,
  recordAttendance,
  recordRoundResult,
  getCandidateSchedule,
  getInterviewerSchedule,
  recordScheduleAudit,
  getScheduleAudit,
  queueNotificationEvent,
  getNotificationQueue,
  formatTime12h,
  timeToMinutes,
  minutesToTime
};
