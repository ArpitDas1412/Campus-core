// CampusLink — Layer 12: Offers & Document Tracker Data Store
// Centralized, deterministic offer records connected to Layers 1-11

export const OFFER_STATUSES = {
  DRAFT: 'Draft',
  SENT: 'Sent',
  VIEWED: 'Viewed',
  ACCEPTED: 'Accepted',
  DECLINED: 'Declined',
  EXPIRED: 'Expired',
  CANCELLED: 'Cancelled'
};

export const ACCEPTANCE_STATUSES = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  DECLINED: 'Declined'
};

export const DOCUMENT_STATUSES = {
  NOT_REQUESTED: 'Not Requested',
  REQUESTED: 'Requested',
  PARTIALLY_SUBMITTED: 'Partially Submitted',
  SUBMITTED: 'Submitted',
  UNDER_VERIFICATION: 'Under Verification',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected'
};

export const JOINING_STATUSES = {
  NOT_SCHEDULED: 'Not Scheduled',
  SCHEDULED: 'Scheduled',
  CONFIRMED: 'Confirmed',
  JOINED: 'Joined',
  NO_SHOW: 'No Show',
  CANCELLED: 'Cancelled'
};

export const REQUIRED_DOCUMENT_TYPES = [
  'Aadhaar / Government ID',
  'PAN',
  '10th Marksheet',
  '12th Marksheet',
  'College ID',
  'Semester Mark Sheets',
  'Degree / Provisional Certificate',
  'Resume',
  'Passport Photograph',
  'Bank Details'
];

export const INITIAL_OFFERS = [
  {
    id: 'OFFER-001',
    jobId: 'JOB-2027-001',
    candidateId: 'CL-2027-0042',
    studentId: 'CL-2027-0042', // backward compat
    candidateName: 'Rahul Kumar',
    studentName: 'Rahul Kumar', // backward compat
    candidateEmail: 'rahul.kumar@campuscore.demo',
    candidateDepartment: 'Computer Science & Engineering',
    candidateCgpa: 8.7,
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    company: 'TechNova Solutions', // backward compat
    jobTitle: 'Software Engineer',
    role: 'Software Engineer', // backward compat
    packageLpa: 9.2,
    employmentType: 'Full-time',
    compensation: {
      totalCTC: '₹9.2 LPA',
      baseSalary: '₹7.8 LPA',
      variablePay: '₹1.4 LPA',
      joiningBonus: '₹50,000'
    },
    location: 'Bangalore',
    workMode: 'Hybrid',
    joiningDate: '2026-12-01',
    probationPeriod: '6 months',
    noticePeriod: '30 days',
    offerDate: '2026-10-15',
    expiryDate: '2026-10-25',
    status: 'Accepted',
    acceptance: {
      status: 'Accepted',
      acceptedAt: '2026-10-15T13:45:00Z',
      declinedAt: null,
      declineReason: null
    },
    documentsRequired: [
      { id: 'DOC-REQ-001', type: 'Resume', required: true, status: 'Verified' },
      { id: 'DOC-REQ-002', type: '10th Marksheet', required: true, status: 'Verified' },
      { id: 'DOC-REQ-003', type: '12th Marksheet', required: true, status: 'Under Review' },
      { id: 'DOC-REQ-004', type: 'Degree / Provisional Certificate', required: true, status: 'Verified' },
      { id: 'DOC-REQ-005', type: 'Aadhaar / Government ID', required: true, status: 'Submitted' }
    ],
    joining: {
      status: 'Confirmed',
      confirmedAt: '2026-10-20T10:00:00Z',
      joinedAt: null,
      reportingContact: 'Ananya Mehta (Talent Acquisition)',
      reportingTime: '09:30 AM',
      location: 'TechNova Bangalore Campus, Electronic City Phase 1'
    },
    createdBy: 'OFFICER-001',
    auditLog: [
      {
        timestamp: '2026-10-15 10:30 AM',
        actor: 'Placement Officer',
        role: 'officer',
        action: 'Offer Sent',
        previousStatus: 'Draft',
        newStatus: 'Sent'
      },
      {
        timestamp: '2026-10-15 11:12 AM',
        actor: 'Rahul Kumar',
        role: 'student',
        action: 'Offer Viewed',
        previousStatus: 'Sent',
        newStatus: 'Viewed'
      },
      {
        timestamp: '2026-10-15 01:45 PM',
        actor: 'Rahul Kumar',
        role: 'student',
        action: 'Offer Accepted',
        previousStatus: 'Viewed',
        newStatus: 'Accepted'
      },
      {
        timestamp: '2026-10-20 10:00 AM',
        actor: 'Placement Officer',
        role: 'officer',
        action: 'Joining Confirmed',
        previousStatus: 'Scheduled',
        newStatus: 'Confirmed'
      }
    ],
    createdAt: '2026-10-15'
  },
  {
    id: 'OFFER-002',
    jobId: 'JOB-2027-001',
    candidateId: 'CL-2027-0003',
    studentId: 'CL-2027-0003',
    candidateName: 'Arjun Sharma',
    studentName: 'Arjun Sharma',
    candidateEmail: 'arjun.sharma@campuscore.demo',
    candidateDepartment: 'Computer Science & Engineering',
    candidateCgpa: 8.9,
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    company: 'TechNova Solutions',
    jobTitle: 'Software Engineer',
    role: 'Software Engineer',
    packageLpa: 10.5,
    employmentType: 'Full-time',
    compensation: {
      totalCTC: '₹10.5 LPA',
      baseSalary: '₹8.8 LPA',
      variablePay: '₹1.7 LPA',
      joiningBonus: '₹75,000'
    },
    location: 'Bangalore',
    workMode: 'On-site',
    joiningDate: '2026-12-01',
    probationPeriod: '6 months',
    noticePeriod: '30 days',
    offerDate: '2026-10-15',
    expiryDate: '2026-10-25',
    status: 'Accepted',
    acceptance: {
      status: 'Accepted',
      acceptedAt: '2026-10-16T09:30:00Z',
      declinedAt: null,
      declineReason: null
    },
    documentsRequired: [
      { id: 'DOC-REQ-006', type: 'Resume', required: true, status: 'Verified' },
      { id: 'DOC-REQ-007', type: '10th Marksheet', required: true, status: 'Verified' },
      { id: 'DOC-REQ-008', type: '12th Marksheet', required: true, status: 'Verified' },
      { id: 'DOC-REQ-009', type: 'Degree / Provisional Certificate', required: true, status: 'Verified' },
      { id: 'DOC-REQ-010', type: 'Aadhaar / Government ID', required: true, status: 'Verified' }
    ],
    joining: {
      status: 'Joined',
      confirmedAt: '2026-10-18T11:00:00Z',
      joinedAt: '2026-12-01T09:30:00Z',
      reportingContact: 'Ananya Mehta',
      reportingTime: '09:30 AM',
      location: 'TechNova Bangalore Campus'
    },
    createdBy: 'OFFICER-001',
    auditLog: [
      {
        timestamp: '2026-10-15 11:00 AM',
        actor: 'Placement Officer',
        role: 'officer',
        action: 'Offer Sent',
        previousStatus: 'Draft',
        newStatus: 'Sent'
      },
      {
        timestamp: '2026-10-16 09:30 AM',
        actor: 'Arjun Sharma',
        role: 'student',
        action: 'Offer Accepted',
        previousStatus: 'Sent',
        newStatus: 'Accepted'
      }
    ],
    createdAt: '2026-10-15'
  },
  {
    id: 'OFFER-003',
    jobId: 'JOB-2027-002',
    candidateId: 'CL-2027-0015',
    studentId: 'CL-2027-0015',
    candidateName: 'Priya Nair',
    studentName: 'Priya Nair',
    candidateEmail: 'priya.nair@campuscore.demo',
    candidateDepartment: 'Information Technology',
    candidateCgpa: 8.4,
    companyId: 'COMP-002',
    companyName: 'Infosys',
    company: 'Infosys',
    jobTitle: 'Systems Engineer Specialist',
    role: 'Systems Engineer Specialist',
    packageLpa: 9.5,
    employmentType: 'Full-time',
    compensation: {
      totalCTC: '₹9.5 LPA',
      baseSalary: '₹8.0 LPA',
      variablePay: '₹1.5 LPA',
      joiningBonus: null
    },
    location: 'Pune',
    workMode: 'Hybrid',
    joiningDate: '2027-01-10',
    probationPeriod: '6 months',
    noticePeriod: '60 days',
    offerDate: '2026-10-16',
    expiryDate: '2026-10-26',
    status: 'Sent',
    acceptance: {
      status: 'Pending',
      acceptedAt: null,
      declinedAt: null,
      declineReason: null
    },
    documentsRequired: [
      { id: 'DOC-REQ-011', type: 'Resume', required: true, status: 'Verified' },
      { id: 'DOC-REQ-012', type: '10th Marksheet', required: true, status: 'Verified' },
      { id: 'DOC-REQ-013', type: '12th Marksheet', required: true, status: 'Requested' },
      { id: 'DOC-REQ-014', type: 'College ID', required: false, status: 'Not Requested' }
    ],
    joining: {
      status: 'Scheduled',
      confirmedAt: null,
      joinedAt: null,
      reportingContact: 'Campus Relations Infosys',
      reportingTime: '10:00 AM',
      location: 'Infosys Hinjewadi Campus, Pune'
    },
    createdBy: 'OFFICER-001',
    auditLog: [
      {
        timestamp: '2026-10-16 02:00 PM',
        actor: 'Placement Officer',
        role: 'officer',
        action: 'Offer Sent',
        previousStatus: 'Draft',
        newStatus: 'Sent'
      }
    ],
    createdAt: '2026-10-16'
  },
  {
    id: 'OFFER-004',
    jobId: 'JOB-2027-003',
    candidateId: 'CL-2027-0021',
    studentId: 'CL-2027-0021',
    candidateName: 'Aditya Verma',
    studentName: 'Aditya Verma',
    candidateEmail: 'aditya.verma@campuscore.demo',
    candidateDepartment: 'Computer Science & Engineering',
    candidateCgpa: 8.6,
    companyId: 'COMP-003',
    companyName: 'Deloitte',
    company: 'Deloitte',
    jobTitle: 'Analyst — Technology Consulting',
    role: 'Analyst — Technology Consulting',
    packageLpa: 11.2,
    employmentType: 'Full-time',
    compensation: {
      totalCTC: '₹11.2 LPA',
      baseSalary: '₹9.4 LPA',
      variablePay: '₹1.8 LPA',
      joiningBonus: '₹1,00,000'
    },
    location: 'Hyderabad',
    workMode: 'Hybrid',
    joiningDate: '2026-12-15',
    probationPeriod: '3 months',
    noticePeriod: '30 days',
    offerDate: '2026-10-12',
    expiryDate: '2026-10-22',
    status: 'Accepted',
    acceptance: {
      status: 'Accepted',
      acceptedAt: '2026-10-14T16:20:00Z',
      declinedAt: null,
      declineReason: null
    },
    documentsRequired: [
      { id: 'DOC-REQ-015', type: 'Resume', required: true, status: 'Verified' },
      { id: 'DOC-REQ-016', type: 'PAN', required: true, status: 'Verified' },
      { id: 'DOC-REQ-017', type: '10th Marksheet', required: true, status: 'Verified' },
      { id: 'DOC-REQ-018', type: '12th Marksheet', required: true, status: 'Verified' }
    ],
    joining: {
      status: 'Confirmed',
      confirmedAt: '2026-10-17T14:00:00Z',
      joinedAt: null,
      reportingContact: 'Deloitte Onboarding Cell',
      reportingTime: '09:00 AM',
      location: 'Deloitte Towers, Hitec City, Hyderabad'
    },
    createdBy: 'OFFICER-001',
    auditLog: [
      {
        timestamp: '2026-10-12 10:00 AM',
        actor: 'Placement Officer',
        role: 'officer',
        action: 'Offer Sent',
        previousStatus: 'Draft',
        newStatus: 'Sent'
      },
      {
        timestamp: '2026-10-14 04:20 PM',
        actor: 'Aditya Verma',
        role: 'student',
        action: 'Offer Accepted',
        previousStatus: 'Sent',
        newStatus: 'Accepted'
      }
    ],
    createdAt: '2026-10-12'
  },
  {
    id: 'OFFER-005',
    jobId: 'JOB-2027-004',
    candidateId: 'CL-2027-0029',
    studentId: 'CL-2027-0029',
    candidateName: 'Sneha Iyer',
    studentName: 'Sneha Iyer',
    candidateEmail: 'sneha.iyer@campuscore.demo',
    candidateDepartment: 'Electronics & Communication',
    candidateCgpa: 8.1,
    companyId: 'COMP-004',
    companyName: 'Accenture',
    company: 'Accenture',
    jobTitle: 'Advanced App Engineering Associate',
    role: 'Advanced App Engineering Associate',
    packageLpa: 8.5,
    employmentType: 'Full-time',
    compensation: {
      totalCTC: '₹8.5 LPA',
      baseSalary: '₹7.2 LPA',
      variablePay: '₹1.3 LPA',
      joiningBonus: null
    },
    location: 'Chennai',
    workMode: 'Hybrid',
    joiningDate: '2027-01-15',
    probationPeriod: '6 months',
    noticePeriod: '30 days',
    offerDate: '2026-10-14',
    expiryDate: '2026-10-24',
    status: 'Sent',
    acceptance: {
      status: 'Pending',
      acceptedAt: null,
      declinedAt: null,
      declineReason: null
    },
    documentsRequired: [
      { id: 'DOC-REQ-019', type: 'Resume', required: true, status: 'Submitted' },
      { id: 'DOC-REQ-020', type: '10th Marksheet', required: true, status: 'Under Review' },
      { id: 'DOC-REQ-021', type: '12th Marksheet', required: true, status: 'Requested' }
    ],
    joining: {
      status: 'Scheduled',
      confirmedAt: null,
      joinedAt: null,
      reportingContact: 'Accenture Campus HR',
      reportingTime: '09:30 AM',
      location: 'Accenture CDC, Sholinganallur, Chennai'
    },
    createdBy: 'OFFICER-001',
    auditLog: [
      {
        timestamp: '2026-10-14 03:30 PM',
        actor: 'Placement Officer',
        role: 'officer',
        action: 'Offer Sent',
        previousStatus: 'Draft',
        newStatus: 'Sent'
      }
    ],
    createdAt: '2026-10-14'
  },
  {
    id: 'OFFER-006',
    jobId: 'JOB-2027-005',
    candidateId: 'CL-2027-0033',
    studentId: 'CL-2027-0033',
    candidateName: 'Rohan Das',
    studentName: 'Rohan Das',
    candidateEmail: 'rohan.das@campuscore.demo',
    candidateDepartment: 'Computer Science & Engineering',
    candidateCgpa: 9.3,
    companyId: 'COMP-005',
    companyName: 'Amazon',
    company: 'Amazon',
    jobTitle: 'Software Development Engineer I',
    role: 'Software Development Engineer I',
    packageLpa: 28.5,
    employmentType: 'Full-time',
    compensation: {
      totalCTC: '₹28.5 LPA',
      baseSalary: '₹18.0 LPA',
      variablePay: '₹4.5 LPA',
      joiningBonus: '₹6,00,000'
    },
    location: 'Hyderabad',
    workMode: 'On-site',
    joiningDate: '2026-11-15',
    probationPeriod: '6 months',
    noticePeriod: '30 days',
    offerDate: '2026-10-05',
    expiryDate: '2026-10-15',
    status: 'Accepted',
    acceptance: {
      status: 'Accepted',
      acceptedAt: '2026-10-07T12:00:00Z',
      declinedAt: null,
      declineReason: null
    },
    documentsRequired: [
      { id: 'DOC-REQ-022', type: 'Resume', required: true, status: 'Verified' },
      { id: 'DOC-REQ-023', type: 'PAN', required: true, status: 'Verified' },
      { id: 'DOC-REQ-024', type: 'Aadhaar / Government ID', required: true, status: 'Verified' },
      { id: 'DOC-REQ-025', type: 'Degree / Provisional Certificate', required: true, status: 'Verified' },
      { id: 'DOC-REQ-026', type: '10th Marksheet', required: true, status: 'Verified' },
      { id: 'DOC-REQ-027', type: '12th Marksheet', required: true, status: 'Verified' }
    ],
    joining: {
      status: 'Joined',
      confirmedAt: '2026-10-10T15:00:00Z',
      joinedAt: '2026-11-15T09:00:00Z',
      reportingContact: 'Amazon Student Programs',
      reportingTime: '09:00 AM',
      location: 'Amazon Development Centre, Nanakramguda, Hyderabad'
    },
    createdBy: 'OFFICER-001',
    auditLog: [
      {
        timestamp: '2026-10-05 09:00 AM',
        actor: 'Placement Officer',
        role: 'officer',
        action: 'Offer Sent',
        previousStatus: 'Draft',
        newStatus: 'Sent'
      },
      {
        timestamp: '2026-10-07 12:00 PM',
        actor: 'Rohan Das',
        role: 'student',
        action: 'Offer Accepted',
        previousStatus: 'Sent',
        newStatus: 'Accepted'
      }
    ],
    createdAt: '2026-10-05'
  },
  {
    id: 'OFFER-007',
    jobId: 'JOB-2027-006',
    candidateId: 'CL-2027-0048',
    studentId: 'CL-2027-0048',
    candidateName: 'Ananya Singh',
    studentName: 'Ananya Singh',
    candidateEmail: 'ananya.singh@campuscore.demo',
    candidateDepartment: 'Information Technology',
    candidateCgpa: 7.9,
    companyId: 'COMP-006',
    companyName: 'TCS',
    company: 'TCS',
    jobTitle: 'Digital Software Engineer',
    role: 'Digital Software Engineer',
    packageLpa: 7.2,
    employmentType: 'Full-time',
    compensation: {
      totalCTC: '₹7.2 LPA',
      baseSalary: '₹6.2 LPA',
      variablePay: '₹1.0 LPA',
      joiningBonus: null
    },
    location: 'Mumbai',
    workMode: 'On-site',
    joiningDate: '2027-02-01',
    probationPeriod: '12 months',
    noticePeriod: '90 days',
    offerDate: '2026-10-10',
    expiryDate: '2026-10-20',
    status: 'Declined',
    acceptance: {
      status: 'Declined',
      acceptedAt: null,
      declinedAt: '2026-10-18T14:30:00Z',
      declineReason: 'Accepted alternative higher offer'
    },
    documentsRequired: [],
    joining: {
      status: 'Cancelled',
      confirmedAt: null,
      joinedAt: null,
      reportingContact: 'TCS Talent Acquisition',
      reportingTime: '10:00 AM',
      location: 'TCS Olympus, Thane, Mumbai'
    },
    createdBy: 'OFFICER-001',
    auditLog: [
      {
        timestamp: '2026-10-10 11:00 AM',
        actor: 'Placement Officer',
        role: 'officer',
        action: 'Offer Sent',
        previousStatus: 'Draft',
        newStatus: 'Sent'
      },
      {
        timestamp: '2026-10-18 02:30 PM',
        actor: 'Ananya Singh',
        role: 'student',
        action: 'Offer Declined',
        previousStatus: 'Sent',
        newStatus: 'Declined'
      }
    ],
    createdAt: '2026-10-10'
  },
  {
    id: 'OFFER-008',
    jobId: 'JOB-2027-001',
    candidateId: 'CL-2027-0056',
    studentId: 'CL-2027-0056',
    candidateName: 'Karan Patel',
    studentName: 'Karan Patel',
    candidateEmail: 'karan.patel@campuscore.demo',
    candidateDepartment: 'Computer Science & Engineering',
    candidateCgpa: 8.3,
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    company: 'TechNova Solutions',
    jobTitle: 'Software Engineer',
    role: 'Software Engineer',
    packageLpa: 9.2,
    employmentType: 'Full-time',
    compensation: {
      totalCTC: '₹9.2 LPA',
      baseSalary: '₹7.8 LPA',
      variablePay: '₹1.4 LPA',
      joiningBonus: '₹50,000'
    },
    location: 'Bangalore',
    workMode: 'Hybrid',
    joiningDate: '2026-12-01',
    probationPeriod: '6 months',
    noticePeriod: '30 days',
    offerDate: '2026-10-01',
    expiryDate: '2026-10-10',
    status: 'Expired',
    acceptance: {
      status: 'Pending',
      acceptedAt: null,
      declinedAt: null,
      declineReason: null
    },
    documentsRequired: [],
    joining: {
      status: 'Cancelled',
      confirmedAt: null,
      joinedAt: null,
      reportingContact: 'TechNova HR',
      reportingTime: '09:30 AM',
      location: 'TechNova Bangalore Campus'
    },
    createdBy: 'OFFICER-001',
    auditLog: [
      {
        timestamp: '2026-10-01 10:00 AM',
        actor: 'Placement Officer',
        role: 'officer',
        action: 'Offer Sent',
        previousStatus: 'Draft',
        newStatus: 'Sent'
      },
      {
        timestamp: '2026-10-11 12:00 AM',
        actor: 'System',
        role: 'system',
        action: 'Offer Expired',
        previousStatus: 'Sent',
        newStatus: 'Expired'
      }
    ],
    createdAt: '2026-10-01'
  }
];
