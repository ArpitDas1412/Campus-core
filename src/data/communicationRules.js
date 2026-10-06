// CampusLink — Layer 11: Intelligent Communication Center & Placement Notification System
// Communication Rules, Enums, Channel Types, and Seed Data

export const NOTIFICATION_TYPES = {
  SHORTLISTED: 'SHORTLISTED',
  INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED',
  INTERVIEW_REMINDER: 'INTERVIEW_REMINDER',
  INTERVIEW_RESCHEDULED: 'INTERVIEW_RESCHEDULED',
  INTERVIEW_CANCELLED: 'INTERVIEW_CANCELLED',
  ROOM_CHANGED: 'ROOM_CHANGED',
  MEETING_LINK_CHANGED: 'MEETING_LINK_CHANGED',
  ROUND_RESULT: 'ROUND_RESULT',
  NEXT_ROUND: 'NEXT_ROUND',
  DOCUMENT_REQUEST: 'DOCUMENT_REQUEST',
  DOCUMENT_SUBMITTED: 'DOCUMENT_SUBMITTED',
  DOCUMENT_VERIFIED: 'DOCUMENT_VERIFIED',
  DOCUMENT_REJECTED: 'DOCUMENT_REJECTED',
  OFFER_AVAILABLE: 'OFFER_AVAILABLE',
  OFFER_EXPIRING: 'OFFER_EXPIRING',
  OFFER_ACCEPTED: 'OFFER_ACCEPTED',
  OFFER_DECLINED: 'OFFER_DECLINED',
  JOINING_REMINDER: 'JOINING_REMINDER',
  JOINING_CONFIRMED: 'JOINING_CONFIRMED',
  PLACEMENT_ANNOUNCEMENT: 'PLACEMENT_ANNOUNCEMENT',
  SYSTEM_ALERT: 'SYSTEM_ALERT'
};

export const PRIORITIES = {
  NORMAL: 'Normal',
  IMPORTANT: 'Important',
  URGENT: 'Urgent'
};

export const CHANNELS = {
  IN_APP: 'In-App',
  EMAIL: 'Email',
  SMS: 'SMS',
  WHATSAPP: 'WhatsApp'
};

export const DELIVERY_STATUS = {
  DRAFT: 'Draft',
  QUEUED: 'Queued',
  SIMULATED_SENDING: 'Simulated Sending',
  DELIVERED: 'Delivered',
  READ: 'Read',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled'
};

export const ANNOUNCEMENT_TYPES = [
  'General Notice',
  'Placement Drive',
  'Interview',
  'Assessment',
  'Schedule Change',
  'Deadline Reminder',
  'Document Request',
  'Result Announcement',
  'Emergency Notice',
  'Custom'
];

export const AUDIENCE_SEGMENTS = [
  'Individual Student',
  'Multiple Students',
  'Placement Drive',
  'Department',
  'Student Status',
  'Corporate Recruiter',
  'Interviewer Panel',
  'Entire Campus'
];

export const COMMUNICATION_AUTOMATION_RULES = [
  {
    event: NOTIFICATION_TYPES.INTERVIEW_SCHEDULED,
    notification: true,
    priority: PRIORITIES.IMPORTANT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    templateId: 'TPL-INTERVIEW-SCHEDULED',
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.INTERVIEW_RESCHEDULED,
    notification: true,
    priority: PRIORITIES.URGENT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL, CHANNELS.SMS],
    templateId: 'TPL-INTERVIEW-RESCHEDULED',
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.INTERVIEW_CANCELLED,
    notification: true,
    priority: PRIORITIES.URGENT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    templateId: 'TPL-INTERVIEW-CANCELLED',
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.SHORTLISTED,
    notification: true,
    priority: PRIORITIES.IMPORTANT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    templateId: 'TPL-SHORTLISTED',
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.INTERVIEW_REMINDER,
    notification: true,
    priority: PRIORITIES.IMPORTANT,
    channels: [CHANNELS.IN_APP, CHANNELS.WHATSAPP],
    templateId: 'TPL-INTERVIEW-REMINDER-1H',
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.ROOM_CHANGED,
    notification: true,
    priority: PRIORITIES.URGENT,
    channels: [CHANNELS.IN_APP, CHANNELS.SMS],
    templateId: 'TPL-ROOM-CHANGED',
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.ROUND_RESULT,
    notification: true,
    priority: PRIORITIES.NORMAL,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    templateId: 'TPL-ROUND-RESULT',
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.OFFER_AVAILABLE,
    notification: true,
    priority: PRIORITIES.URGENT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL, CHANNELS.SMS],
    templateId: 'TPL-OFFER-AVAILABLE',
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.DOCUMENT_REQUEST,
    notification: true,
    priority: PRIORITIES.IMPORTANT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    templateId: 'TPL-DOCUMENT-REQUEST',
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.OFFER_ACCEPTED,
    notification: true,
    priority: PRIORITIES.IMPORTANT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.OFFER_DECLINED,
    notification: true,
    priority: PRIORITIES.NORMAL,
    channels: [CHANNELS.IN_APP],
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.DOCUMENT_SUBMITTED,
    notification: true,
    priority: PRIORITIES.NORMAL,
    channels: [CHANNELS.IN_APP],
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.DOCUMENT_VERIFIED,
    notification: true,
    priority: PRIORITIES.IMPORTANT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.DOCUMENT_REJECTED,
    notification: true,
    priority: PRIORITIES.URGENT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.JOINING_CONFIRMED,
    notification: true,
    priority: PRIORITIES.IMPORTANT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    autoDispatch: true
  },
  {
    event: NOTIFICATION_TYPES.JOINING_REMINDER,
    notification: true,
    priority: PRIORITIES.IMPORTANT,
    channels: [CHANNELS.IN_APP, CHANNELS.SMS],
    autoDispatch: true
  }
];

export const INITIAL_COMMUNICATION_METRICS = {
  totalMessages: 2486,
  delivered: 2421,
  pending: 42,
  failed: 23,
  unread: 186,
  activeAnnouncements: 8,
  deliveryRate: 97.4,
  readRate: 84.2,
  avgResponseTimeMin: 18,
  channels: {
    inApp: { name: 'In-App Notifications', status: 'Live & Active', rate: 97.8, delivered: 2421, planned: false },
    email: { name: 'Corporate Email Gateway', status: 'Simulated Delivery', rate: 94.2, delivered: 2280, planned: false },
    sms: { name: 'SMS Mobile Gateway', status: 'Integration Ready', rate: 0, delivered: 0, planned: true },
    whatsapp: { name: 'WhatsApp Business API', status: 'Integration Ready', rate: 0, delivered: 0, planned: true }
  }
};

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ANN-001',
    title: 'TechNova Solutions — Technical Interview Guidelines',
    type: 'Interview',
    content:
      'All 125 shortlisted candidates must report to the placement cell 15 minutes before their scheduled slot. Ensure you carry your College ID, two hard copies of your ATS-verified resume, and your coding assessment confirmation badge. Dress code: Formal Business.',
    audience: {
      type: 'Placement Drive',
      target: 'TechNova Solutions — SDE I',
      recipientCount: 125
    },
    priority: PRIORITIES.IMPORTANT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    status: 'Published',
    publishedAt: '2026-10-10T09:30:00.000Z',
    createdBy: 'Dr. Ramesh Sharma (Placement Director)',
    readCount: 109,
    unreadCount: 16
  },
  {
    id: 'ANN-002',
    title: 'Infosys — Online Aptitude Assessment Slot Allotments',
    type: 'Assessment',
    content:
      'The National Qualifier Test links have been dispatched. Students scheduled for Lab 201 must report with laptops charged and Chrome v120+ installed. Test window is strictly monitored via WebCam proctoring.',
    audience: {
      type: 'Department',
      target: 'CSE & IT Departments',
      recipientCount: 240
    },
    priority: PRIORITIES.NORMAL,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL],
    status: 'Published',
    publishedAt: '2026-10-09T14:15:00.000Z',
    createdBy: 'Placement Office Coordinator',
    readCount: 218,
    unreadCount: 22
  },
  {
    id: 'ANN-003',
    title: '⚠ URGENT — TechNova Interview Venue Change to Turing Lab A',
    type: 'Schedule Change',
    content:
      'Due to power optimization in Block B, all TechNova technical interviews originally allotted to Room A101 will now be conducted in Turing Lab A (Main Computing Complex, 1st Floor). Please note updated slot boards.',
    audience: {
      type: 'Placement Drive',
      target: 'TechNova Solutions — SDE I',
      recipientCount: 125
    },
    priority: PRIORITIES.URGENT,
    channels: [CHANNELS.IN_APP, CHANNELS.EMAIL, CHANNELS.SMS],
    status: 'Published',
    publishedAt: '2026-10-10T10:15:00.000Z',
    createdBy: 'Campus Operations Desk',
    readCount: 122,
    unreadCount: 3
  },
  {
    id: 'ANN-004',
    title: 'Deloitte USI — Case Study Round Instructions',
    type: 'Placement Drive',
    content:
      'Shortlisted business technology analysts are requested to download the Case Study briefing deck from your student portal before 2:00 PM today. Presentation panels will convene in Boardroom B.',
    audience: {
      type: 'Placement Drive',
      target: 'Deloitte — Business Analyst',
      recipientCount: 80
    },
    priority: PRIORITIES.NORMAL,
    channels: [CHANNELS.IN_APP],
    status: 'Published',
    publishedAt: '2026-10-08T11:00:00.000Z',
    createdBy: 'Corporate Relations Manager',
    readCount: 74,
    unreadCount: 6
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-001',
    userId: 'CL-2027-0042', // Rahul Kumar
    userName: 'Rahul Kumar',
    type: NOTIFICATION_TYPES.INTERVIEW_RESCHEDULED,
    title: 'Interview Rescheduled',
    message: 'Your TechNova Technical Interview has been rescheduled to Oct 15, 2026 at 11:30 AM in Turing Lab A.',
    priority: PRIORITIES.URGENT,
    relatedEntity: {
      type: 'schedule',
      jobId: 'JOB-2027-TNS',
      companyName: 'TechNova Solutions',
      roundName: 'Technical Interview'
    },
    read: false,
    channel: CHANNELS.IN_APP,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString() // 10 mins ago
  },
  {
    id: 'NOTIF-002',
    userId: 'CL-2027-0042', // Rahul Kumar
    userName: 'Rahul Kumar',
    type: NOTIFICATION_TYPES.SHORTLISTED,
    title: 'You Have Been Shortlisted! 🎉',
    message: 'Congratulations Rahul! You have been shortlisted for TechNova Solutions Software Development Engineer I drive.',
    priority: PRIORITIES.IMPORTANT,
    relatedEntity: {
      type: 'shortlist',
      jobId: 'JOB-2027-TNS',
      companyName: 'TechNova Solutions'
    },
    read: false,
    channel: CHANNELS.IN_APP,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hrs ago
  },
  {
    id: 'NOTIF-003',
    userId: 'CL-2027-0042', // Rahul Kumar
    userName: 'Rahul Kumar',
    type: NOTIFICATION_TYPES.PLACEMENT_ANNOUNCEMENT,
    title: 'TechNova Reporting Instructions',
    message: 'Placement Office published: Please report to Turing Lab A 15 minutes prior to your 11:30 AM interview.',
    priority: PRIORITIES.IMPORTANT,
    relatedEntity: {
      type: 'announcement',
      announcementId: 'ANN-001'
    },
    read: true,
    channel: CHANNELS.IN_APP,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hrs ago
  },
  {
    id: 'NOTIF-004',
    userId: 'CL-2027-0042', // Rahul Kumar
    userName: 'Rahul Kumar',
    type: NOTIFICATION_TYPES.DOCUMENT_REQUEST,
    title: 'Resume Verification Acknowledged',
    message: 'Your updated ATS Resume score (82/100) has been verified and attached to your TechNova interview dossier.',
    priority: PRIORITIES.NORMAL,
    relatedEntity: {
      type: 'resume',
      studentId: 'CL-2027-0042'
    },
    read: true,
    channel: CHANNELS.IN_APP,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12 hrs ago
  },
  // Recruiter notifications
  {
    id: 'NOTIF-REC-001',
    userId: 'recruiter',
    userName: 'Priya Nair (TechNova)',
    type: NOTIFICATION_TYPES.INTERVIEW_RESCHEDULED,
    title: 'Candidate Slot Rescheduled',
    message: 'Rahul Kumar has been reallocated to Oct 15 at 11:30 AM (Room: Turing Lab A) with Panel Rahul Mehta.',
    priority: PRIORITIES.IMPORTANT,
    relatedEntity: {
      type: 'schedule',
      candidateId: 'CL-2027-0042',
      jobId: 'JOB-2027-TNS'
    },
    read: false,
    channel: CHANNELS.IN_APP,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: 'NOTIF-REC-002',
    userId: 'recruiter',
    userName: 'Priya Nair (TechNova)',
    type: NOTIFICATION_TYPES.SYSTEM_ALERT,
    title: 'Schedule Health: 100% Conflict-Free',
    message: 'TechNova drive interview roster published with 386 total verified slots across campus panels.',
    priority: PRIORITIES.NORMAL,
    relatedEntity: {
      type: 'drive',
      jobId: 'JOB-2027-TNS'
    },
    read: false,
    channel: CHANNELS.IN_APP,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  // Officer notifications
  {
    id: 'NOTIF-OFF-001',
    userId: 'officer',
    userName: 'Placement Officer',
    type: NOTIFICATION_TYPES.INTERVIEW_RESCHEDULED,
    title: 'Deterministic Conflict Resolved',
    message: 'Candidate collision for Rahul Kumar (TechNova vs Infosys) resolved with 1-click alternative slot.',
    priority: PRIORITIES.IMPORTANT,
    relatedEntity: {
      type: 'schedule',
      candidateId: 'CL-2027-0042'
    },
    read: false,
    channel: CHANNELS.IN_APP,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  },
  {
    id: 'NOTIF-OFF-002',
    userId: 'officer',
    userName: 'Placement Officer',
    type: NOTIFICATION_TYPES.PLACEMENT_ANNOUNCEMENT,
    title: 'Announcement Published: 125 Students',
    message: 'TechNova Technical Interview guidelines successfully dispatched to 125 candidate inboxes.',
    priority: PRIORITIES.NORMAL,
    relatedEntity: {
      type: 'announcement',
      announcementId: 'ANN-001'
    },
    read: false,
    channel: CHANNELS.IN_APP,
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString()
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'CONV-001',
    participantId: 'CL-2027-0042',
    participantName: 'Rahul Kumar',
    participantRole: 'Student (CSE • 2023CS0104)',
    participantAvatar: 'RK',
    participantColor: '#3978F6',
    subject: 'TechNova Technical Interview Preparation',
    lastMessage: 'Please carry your college ID and resume.',
    lastTime: '10:42 AM',
    unread: false,
    category: 'Students',
    messages: [
      {
        id: 'MSG-001',
        senderId: 'SYSTEM',
        senderName: 'CampusCore Placement Cell',
        isOfficer: true,
        body: 'Your TechNova technical interview has been scheduled for Oct 15, 2026 at 11:30 AM in Turing Lab A.',
        time: '10:15 AM',
        date: 'Oct 10, 2026'
      },
      {
        id: 'MSG-002',
        senderId: 'CL-2027-0042',
        senderName: 'Rahul Kumar',
        isOfficer: false,
        body: 'Thank you sir. What specific documents should I carry for the physical verification round?',
        time: '10:28 AM',
        date: 'Oct 10, 2026'
      },
      {
        id: 'MSG-003',
        senderId: 'OFFICER',
        senderName: 'Placement Coordinator',
        isOfficer: true,
        body: 'Please carry your college ID and two physical copies of your resume. You may also bring your laptop for the live coding demonstration.',
        time: '10:42 AM',
        date: 'Oct 10, 2026'
      }
    ]
  },
  {
    id: 'CONV-002',
    participantId: 'std-2',
    participantName: 'Priya Sharma',
    participantRole: 'Student (IT • 2023IT0082)',
    participantAvatar: 'PS',
    participantColor: '#10B981',
    subject: 'Question regarding technical interview slot',
    lastMessage: 'Is it possible to take the second round online?',
    lastTime: '10:18 AM',
    unread: true,
    category: 'Students',
    messages: [
      {
        id: 'MSG-004',
        senderId: 'std-2',
        senderName: 'Priya Sharma',
        isOfficer: false,
        body: 'Hello team, I have my Infosys coding round in the morning. Is it possible to take the second round online if I have travel constraints?',
        time: '10:18 AM',
        date: 'Oct 10, 2026'
      }
    ]
  },
  {
    id: 'CONV-003',
    participantId: 'recruiter-technova',
    participantName: 'TechNova Solutions',
    participantRole: 'Corporate Recruiter (Priya Nair)',
    participantAvatar: 'TN',
    participantColor: '#7C3AED',
    subject: 'Candidate feedback request for morning batch',
    lastMessage: 'All morning panel evaluation forms submitted.',
    lastTime: '09:52 AM',
    unread: false,
    category: 'Recruiters',
    messages: [
      {
        id: 'MSG-005',
        senderId: 'recruiter-technova',
        senderName: 'Priya Nair (TechNova)',
        isOfficer: false,
        body: 'Good morning Placement Office. Our technical panel has wrapped up the 9:00 AM batch. All morning evaluation scores are synced.',
        time: '09:52 AM',
        date: 'Oct 10, 2026'
      }
    ]
  },
  {
    id: 'CONV-004',
    participantId: 'interviewer-001',
    participantName: 'Rahul Mehta',
    participantRole: 'Senior SDE (TechNova Interviewer)',
    participantAvatar: 'RM',
    participantColor: '#2563EB',
    subject: 'Turing Lab A workstation configuration',
    lastMessage: 'All terminals configured with Ubuntu and Docker.',
    lastTime: 'Yesterday',
    unread: false,
    category: 'Interviewers',
    messages: [
      {
        id: 'MSG-006',
        senderId: 'interviewer-001',
        senderName: 'Rahul Mehta',
        isOfficer: false,
        body: 'All terminals in Turing Lab A are ready with the assessment IDEs. See you tomorrow at 9:00 AM.',
        time: 'Yesterday',
        date: 'Oct 09, 2026'
      }
    ]
  }
];
