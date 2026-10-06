// CampusLink — Layer 10: Intelligent Placement Drive Scheduler & Conflict-Aware Interview Management
// Configuration, constants, default resources, and seed schedules

export const SCHEDULE_STATUS = {
  PENDING: 'Pending',
  SCHEDULED: 'Scheduled',
  CONFIRMED: 'Confirmed',
  RESCHEDULE_REQUESTED: 'Reschedule Requested',
  RESCHEDULED: 'Rescheduled',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  NO_SHOW: 'No Show'
};

export const ATTENDANCE_STATUS = {
  NOT_MARKED: 'Not Marked',
  PRESENT: 'Present',
  ABSENT: 'Absent',
  LATE: 'Late'
};

export const ROUND_RESULT_STATUS = {
  PENDING: 'Pending',
  PASSED: 'Passed',
  FAILED: 'Failed',
  HOLD: 'Hold',
  NO_SHOW: 'No Show'
};

export const CONFLICT_SEVERITY = {
  CRITICAL: 'Critical',
  WARNING: 'Warning',
  INFO: 'Info'
};

export const CONFLICT_TYPE = {
  CANDIDATE_CONFLICT: 'Candidate Conflict',
  INTERVIEWER_CONFLICT: 'Interviewer Conflict',
  ROOM_CONFLICT: 'Room Conflict',
  CAPACITY_CONFLICT: 'Slot Capacity Conflict',
  ROUND_DEPENDENCY_CONFLICT: 'Round Dependency Conflict',
  BREAK_CONFLICT: 'Break Conflict'
};

export const ROUND_TYPES = [
  'Online Assessment',
  'Aptitude Test',
  'Coding Test',
  'Technical Interview',
  'Managerial Interview',
  'HR Interview',
  'Group Discussion',
  'Presentation',
  'Custom Round'
];

export const DEFAULT_SCHEDULING_CONFIG = {
  defaultSlotDuration: 30, // minutes
  breakPeriods: [
    {
      start: '13:00',
      end: '14:00',
      name: 'Lunch Break'
    }
  ],
  workingHours: {
    start: '09:00',
    end: '17:00'
  },
  allowMultiDayScheduling: true,
  preventCandidateConflicts: true,
  preventInterviewerConflicts: true,
  preventRoomConflicts: true,
  enforceRoundDependencies: true,
  maxInterviewerUtilization: 85
};

export const DEFAULT_INTERVIEWERS = [
  {
    id: 'INT-001',
    name: 'Rahul Mehta',
    title: 'Senior Software Engineer',
    company: 'TechNova Solutions',
    email: 'rahul.mehta@technova.demo',
    avatar: 'RM',
    dailyCapacity: 10,
    availability: {
      '2026-10-15': ['09:00-13:00', '14:00-17:00'],
      '2026-10-16': ['09:00-13:00', '14:00-17:00'],
      '2026-10-17': ['10:00-13:00', '14:00-16:00']
    }
  },
  {
    id: 'INT-002',
    name: 'Priya Nair',
    title: 'Engineering Manager',
    company: 'TechNova Solutions',
    email: 'priya.nair@technova.demo',
    avatar: 'PN',
    dailyCapacity: 8,
    availability: {
      '2026-10-15': ['09:00-13:00', '14:00-17:00'],
      '2026-10-16': ['09:00-12:00', '14:00-17:00'],
      '2026-10-17': ['09:00-13:00']
    }
  },
  {
    id: 'INT-003',
    name: 'Arjun Kapoor',
    title: 'Tech Lead',
    company: 'TechNova Solutions',
    email: 'arjun.kapoor@technova.demo',
    avatar: 'AK',
    dailyCapacity: 10,
    availability: {
      '2026-10-15': ['09:00-13:00', '14:00-17:00'],
      '2026-10-16': ['09:00-13:00', '14:00-17:00'],
      '2026-10-17': ['09:00-13:00', '14:00-17:00']
    }
  },
  {
    id: 'INT-004',
    name: 'Sneha Deshmukh',
    title: 'Staff Architect',
    company: 'TechNova Solutions',
    email: 'sneha.d@technova.demo',
    avatar: 'SD',
    dailyCapacity: 8,
    availability: {
      '2026-10-15': ['09:00-13:00', '14:00-16:00'],
      '2026-10-16': ['10:00-13:00', '14:00-17:00'],
      '2026-10-17': ['09:00-13:00', '14:00-17:00']
    }
  },
  {
    id: 'INT-005',
    name: 'Kunal Singhal',
    title: 'Principal UX Engineer',
    company: 'TechNova Solutions',
    email: 'kunal.s@technova.demo',
    avatar: 'KS',
    dailyCapacity: 8,
    availability: {
      '2026-10-15': ['09:00-13:00', '14:00-17:00'],
      '2026-10-16': ['09:00-13:00', '14:00-17:00'],
      '2026-10-17': ['09:00-13:00']
    }
  },
  {
    id: 'INT-006',
    name: 'Ananya Mehta',
    title: 'Talent Acquisition Manager',
    company: 'TechNova Solutions',
    email: 'ananya.mehta@technova.demo',
    avatar: 'AM',
    dailyCapacity: 12,
    availability: {
      '2026-10-15': ['09:00-13:00', '14:00-17:00'],
      '2026-10-16': ['09:00-13:00', '14:00-17:00'],
      '2026-10-17': ['09:00-13:00', '14:00-17:00']
    }
  },
  {
    id: 'INT-007',
    name: 'Rajiv Sen',
    title: 'Lead Software Architect',
    company: 'TechNova Solutions',
    email: 'rajiv.sen@technova.demo',
    avatar: 'RS',
    dailyCapacity: 8,
    availability: {
      '2026-10-15': ['09:00-13:00', '14:00-17:00'],
      '2026-10-16': ['09:00-13:00', '14:00-17:00'],
      '2026-10-17': ['10:00-13:00', '14:00-17:00']
    }
  },
  {
    id: 'INT-008',
    name: 'Vikram Malhotra',
    title: 'VP of Engineering',
    company: 'TechNova Solutions',
    email: 'vikram.m@technova.demo',
    avatar: 'VM',
    dailyCapacity: 6,
    availability: {
      '2026-10-15': ['14:00-17:00'],
      '2026-10-16': ['10:00-13:00', '14:00-16:00'],
      '2026-10-17': ['09:00-12:00']
    }
  }
];

export const DEFAULT_ROOMS = [
  {
    id: 'ROOM-A101',
    name: 'Room A101',
    block: 'Main Academic Block',
    floor: '1st Floor',
    type: 'Offline',
    capacity: 20,
    equipment: ['Projector', 'Whiteboard', 'LAN', 'Power Backup'],
    status: 'Available'
  },
  {
    id: 'ROOM-A102',
    name: 'Room A102',
    block: 'Main Academic Block',
    floor: '1st Floor',
    type: 'Offline',
    capacity: 15,
    equipment: ['Display Screen', 'Whiteboard', 'WiFi'],
    status: 'In Use'
  },
  {
    id: 'ROOM-A103',
    name: 'Room A103',
    block: 'Main Academic Block',
    floor: '1st Floor',
    type: 'Offline',
    capacity: 10,
    equipment: ['Whiteboard', 'Webcam', 'Conference Mic'],
    status: 'Available'
  },
  {
    id: 'ROOM-CONF',
    name: 'Conference Hall',
    block: 'Admin Block',
    floor: '2nd Floor',
    type: 'Offline',
    capacity: 40,
    equipment: ['Multi-panel TV', 'Acoustic Sound', 'Mic System', 'AC'],
    status: 'Available'
  },
  {
    id: 'ROOM-SEM',
    name: 'Seminar Hall',
    block: 'Technology Center',
    floor: 'Ground Floor',
    type: 'Offline',
    capacity: 60,
    equipment: ['Stage', 'Podium', 'Dual Projectors', 'Recording Studio'],
    status: 'Available'
  },
  {
    id: 'PANEL-ONLINE-1',
    name: 'Google Meet Panel 1',
    type: 'Online',
    platform: 'Google Meet',
    defaultLink: 'https://meet.google.com/cpl-tnva-alpha',
    capacity: 50,
    status: 'Active'
  },
  {
    id: 'PANEL-ONLINE-2',
    name: 'Microsoft Teams Panel 2',
    type: 'Online',
    platform: 'Microsoft Teams',
    defaultLink: 'https://teams.microsoft.com/l/meetup-join/cpl-tnva-beta',
    capacity: 50,
    status: 'Active'
  },
  {
    id: 'PANEL-ONLINE-3',
    name: 'CampusCore Virtual Room 3',
    type: 'Online',
    platform: 'CampusCore Meeting',
    defaultLink: 'https://meet.campuscore.demo/room-gamma-live',
    capacity: 100,
    status: 'Active'
  },
  {
    id: 'PANEL-ONLINE-4',
    name: 'Zoom Video Panel 4',
    type: 'Online',
    platform: 'Zoom',
    defaultLink: 'https://zoom.us/j/campuscore-delta-panel',
    capacity: 50,
    status: 'Active'
  }
];

export const INITIAL_DRIVES_SCHEDULE_METRICS = {
  activeDrives: 12,
  scheduledCandidates: 386,
  pendingScheduling: 74,
  conflictsDetected: 18,
  interviewsToday: 42,
  roomsUtilized: '28 / 32'
};

export const INITIAL_ACTIVE_DRIVES = [
  {
    id: 'JOB-2027-001',
    companyName: 'TechNova Solutions',
    jobTitle: 'Software Engineer',
    openings: 25,
    shortlistedCount: 125,
    scheduledCount: 96,
    pendingCount: 29,
    roundsCount: 4,
    status: 'Active Drive',
    dates: ['2026-10-15', '2026-10-16', '2026-10-17'],
    avatarBg: '#2563EB',
    avatarText: 'TNS'
  },
  {
    id: 'JOB-2027-INF',
    companyName: 'Infosys',
    jobTitle: 'Graduate Engineer',
    openings: 40,
    shortlistedCount: 160,
    scheduledCount: 142,
    pendingCount: 18,
    roundsCount: 3,
    status: 'Active Drive',
    dates: ['2026-10-15', '2026-10-16'],
    avatarBg: '#0284C7',
    avatarText: 'INF'
  },
  {
    id: 'JOB-2027-DEL',
    companyName: 'Deloitte',
    jobTitle: 'Business Analyst',
    openings: 20,
    shortlistedCount: 100,
    scheduledCount: 80,
    pendingCount: 20,
    roundsCount: 4,
    status: 'Active Drive',
    dates: ['2026-10-16', '2026-10-17'],
    avatarBg: '#059669',
    avatarText: 'DEL'
  }
];

export function formatTime12h(timeStr) {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let h = parseInt(parts[0], 10);
  const m = parts[1];
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

export default {
  SCHEDULE_STATUS,
  ATTENDANCE_STATUS,
  ROUND_RESULT_STATUS,
  CONFLICT_SEVERITY,
  CONFLICT_TYPE,
  ROUND_TYPES,
  DEFAULT_SCHEDULING_CONFIG,
  DEFAULT_INTERVIEWERS,
  DEFAULT_ROOMS,
  INITIAL_DRIVES_SCHEDULE_METRICS,
  INITIAL_ACTIVE_DRIVES,
  formatTime12h
};
