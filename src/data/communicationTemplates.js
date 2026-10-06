// CampusCore — Layer 11: Notification & Communication Templates

export const DEFAULT_TEMPLATES = [
  {
    id: 'TPL-INTERVIEW-SCHEDULED',
    eventType: 'INTERVIEW_SCHEDULED',
    name: 'Interview Scheduled',
    category: 'Interviews',
    subject: 'Interview Scheduled — {{companyName}}',
    body: `Hello {{studentName}},

Your {{roundName}} for {{companyName}} ({{jobTitle}}) has been scheduled.

Date: {{date}}
Time: {{time}}
Venue: {{room}}
Mode: {{mode}}
Meeting Link: {{meetingLink}}

Please report 15 minutes before your scheduled slot. Good luck!

— CampusCore Placement Cell`,
    variables: ['studentName', 'companyName', 'jobTitle', 'roundName', 'date', 'time', 'room', 'mode', 'meetingLink'],
    isSystem: true,
    active: true
  },
  {
    id: 'TPL-INTERVIEW-RESCHEDULED',
    eventType: 'INTERVIEW_RESCHEDULED',
    name: 'Interview Rescheduled',
    category: 'Interviews',
    subject: '⚠ URGENT: Interview Rescheduled — {{companyName}}',
    body: `Hi {{studentName}},

Your {{roundName}} for {{companyName}} has been rescheduled.

New Date: {{date}}
New Time: {{time}}
Venue / Link: {{room}}
Reason: {{reason}}

Please review your updated schedule on your CampusCore student dashboard immediately.

— CampusCore Placement Cell`,
    variables: ['studentName', 'companyName', 'roundName', 'date', 'time', 'room', 'reason'],
    isSystem: true,
    active: true
  },
  {
    id: 'TPL-INTERVIEW-CANCELLED',
    eventType: 'INTERVIEW_CANCELLED',
    name: 'Interview Cancelled',
    category: 'Interviews',
    subject: 'Interview Cancelled — {{companyName}}',
    body: `Dear {{studentName}},

Your {{roundName}} for {{companyName}} on {{date}} at {{time}} has been cancelled.

Reason: {{reason}}

Our placement team will coordinate alternative arrangements where applicable.

— CampusCore Placement Cell`,
    variables: ['studentName', 'companyName', 'roundName', 'date', 'time', 'reason'],
    isSystem: true,
    active: true
  },
  {
    id: 'TPL-SHORTLISTED',
    eventType: 'SHORTLISTED',
    name: 'Candidate Shortlisted',
    category: 'Shortlisting',
    subject: 'Congratulations! You Have Been Shortlisted — {{companyName}}',
    body: `Congratulations {{studentName}}!

You have been successfully shortlisted for the {{companyName}} recruitment drive for {{jobTitle}}.

Tier Classification: {{tier}}
Next Step: Round 1 Schedule allotment in progress.

Please keep your resume and project portfolios updated on your 360° profile.

— CampusCore Placement Cell`,
    variables: ['studentName', 'companyName', 'jobTitle', 'tier'],
    isSystem: true,
    active: true
  },
  {
    id: 'TPL-ROUND-RESULT',
    eventType: 'ROUND_RESULT',
    name: 'Round Result Announced',
    category: 'Results',
    subject: 'Placement Evaluation Update — {{companyName}}',
    body: `Hello {{studentName}},

Your evaluation result for {{roundName}} with {{companyName}} is now available.

Result: {{status}}
{{#if score}}Score: {{score}}/100{{/if}}

{{nextSteps}}

— CampusCore Placement Cell`,
    variables: ['studentName', 'companyName', 'roundName', 'status', 'score', 'nextSteps'],
    isSystem: true,
    active: true
  },
  {
    id: 'TPL-ROOM-CHANGED',
    eventType: 'ROOM_CHANGED',
    name: 'Venue / Room Change Notice',
    category: 'Operations',
    subject: '⚠ URGENT: Room Change for {{companyName}} {{roundName}}',
    body: `Attention {{studentName}},

The interview venue for your {{companyName}} {{roundName}} on {{date}} has moved:
From: {{oldRoom}}
To: {{newRoom}}

Scheduled Time: {{time}}. Please proceed directly to {{newRoom}}.

— CampusCore Placement Cell`,
    variables: ['studentName', 'companyName', 'roundName', 'date', 'time', 'oldRoom', 'newRoom'],
    isSystem: true,
    active: true
  },
  {
    id: 'TPL-INTERVIEW-REMINDER-1H',
    eventType: 'INTERVIEW_REMINDER',
    name: '1-Hour Interview Reminder',
    category: 'Reminders',
    subject: 'Reminder: {{companyName}} Interview Starts in 1 Hour',
    body: `Hi {{studentName}},

Your {{companyName}} {{roundName}} starts in 1 hour (at {{time}}).

Location / Link: {{room}}
Checklist: College ID, Resume copies, Working IDE setup.

Be ready 10 minutes prior.

— CampusCore Placement Cell`,
    variables: ['studentName', 'companyName', 'roundName', 'time', 'room'],
    isSystem: true,
    active: true
  },
  {
    id: 'TPL-OFFER-AVAILABLE',
    eventType: 'OFFER_AVAILABLE',
    name: 'Job Offer Available',
    category: 'Offers',
    subject: '🎉 Offer Letter Released — {{companyName}}!',
    body: `Dear {{studentName}},

We are thrilled to announce that {{companyName}} has extended an official placement offer to you for the position of {{jobTitle}}!

CTC Package: {{ctc}}
Offer Acceptance Window: Until {{deadline}}

Please log into your CampusCore student dashboard to review terms and accept.

Heartiest congratulations!

— CampusCore Placement Cell`,
    variables: ['studentName', 'companyName', 'jobTitle', 'ctc', 'deadline'],
    isSystem: true,
    active: true
  },
  {
    id: 'TPL-DOCUMENT-REQUEST',
    eventType: 'DOCUMENT_REQUEST',
    name: 'Document Verification Request',
    category: 'Compliance',
    subject: 'Action Required: Document Verification for {{companyName}}',
    body: `Hello {{studentName}},

The recruiter panel for {{companyName}} has requested document verification for {{jobTitle}}.

Required Documents: {{documentList}}
Deadline: {{deadline}}

Please upload documents through your CampusCore profile.

— CampusCore Placement Cell`,
    variables: ['studentName', 'companyName', 'jobTitle', 'documentList', 'deadline'],
    isSystem: true,
    active: true
  }
];

export const DEMO_PREVIEW_DATA = {
  studentName: 'Rahul Kumar',
  companyName: 'TechNova Solutions',
  jobTitle: 'Software Development Engineer I',
  roundName: 'Technical Interview',
  date: '15 October 2026',
  time: '11:30 AM',
  room: 'Turing Lab A (Main Computing Block)',
  mode: 'In-Person & Online Hybrid',
  meetingLink: 'https://meet.google.com/cmp-nova-tech',
  reason: 'Resolution of concurrent drive conflict with Infosys coding assessment',
  tier: 'Tier 1 (Top 5% Elite Match)',
  status: 'Passed (Recommended for Next Round)',
  score: '92',
  nextSteps: 'You have qualified for the Managerial & Culture Fit Round. Your slot will be posted shortly.',
  oldRoom: 'Room A101',
  newRoom: 'Turing Lab A',
  ctc: '14.5 LPA',
  deadline: '20 October 2026',
  documentList: 'Degree Provisional Certificate, Class X/XII Marksheets, College ID'
};
