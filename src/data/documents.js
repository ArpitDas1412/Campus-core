// CampusLink — Layer 12: Documents Data Store
// Centralized document records and verification statuses

export const INITIAL_DOCUMENTS = [
  {
    id: 'DOC-001',
    offerId: 'OFFER-001',
    candidateId: 'CL-2027-0042',
    candidateName: 'Rahul Kumar',
    companyName: 'TechNova Solutions',
    companyId: 'COMP-001',
    jobTitle: 'Software Engineer',
    type: '12th Marksheet',
    required: true,
    status: 'Under Review',
    fileName: 'rahul_12th_marksheet.pdf',
    fileSize: '1.8 MB',
    submittedAt: '2026-10-18T14:20:00Z',
    verifiedAt: null,
    verifiedBy: null,
    rejectionReason: null,
    comments: 'Higher secondary marksheet submitted. Awaiting officer verification.',
    auditLog: [
      {
        timestamp: '2026-10-15 10:30 AM',
        actor: 'Placement Officer',
        action: 'Document Requested'
      },
      {
        timestamp: '2026-10-18 02:20 PM',
        actor: 'Rahul Kumar',
        action: 'Document Uploaded'
      }
    ],
    createdAt: '2026-10-15'
  },
  {
    id: 'DOC-002',
    offerId: 'OFFER-001',
    candidateId: 'CL-2027-0042',
    candidateName: 'Rahul Kumar',
    companyName: 'TechNova Solutions',
    companyId: 'COMP-001',
    jobTitle: 'Software Engineer',
    type: '10th Marksheet',
    required: true,
    status: 'Verified',
    fileName: 'rahul_10th_marksheet.pdf',
    fileSize: '1.4 MB',
    submittedAt: '2026-10-17T11:00:00Z',
    verifiedAt: '2026-10-18T09:15:00Z',
    verifiedBy: 'Placement Officer',
    rejectionReason: null,
    comments: 'Verified against secondary school board roll number.',
    auditLog: [
      {
        timestamp: '2026-10-17 11:00 AM',
        actor: 'Rahul Kumar',
        action: 'Document Uploaded'
      },
      {
        timestamp: '2026-10-18 09:15 AM',
        actor: 'Placement Officer',
        action: 'Document Verified'
      }
    ],
    createdAt: '2026-10-15'
  },
  {
    id: 'DOC-003',
    offerId: 'OFFER-001',
    candidateId: 'CL-2027-0042',
    candidateName: 'Rahul Kumar',
    companyName: 'TechNova Solutions',
    companyId: 'COMP-001',
    jobTitle: 'Software Engineer',
    type: 'Resume',
    required: true,
    status: 'Verified',
    fileName: 'rahul_kumar_resume_2026.pdf',
    fileSize: '240 KB',
    submittedAt: '2026-10-15T14:00:00Z',
    verifiedAt: '2026-10-15T15:30:00Z',
    verifiedBy: 'Placement Officer',
    rejectionReason: null,
    comments: 'Verified with CampusCore verified resume intelligence score.',
    auditLog: [
      {
        timestamp: '2026-10-15 02:00 PM',
        actor: 'Rahul Kumar',
        action: 'Document Uploaded'
      },
      {
        timestamp: '2026-10-15 03:30 PM',
        actor: 'Placement Officer',
        action: 'Document Verified'
      }
    ],
    createdAt: '2026-10-15'
  },
  {
    id: 'DOC-004',
    offerId: 'OFFER-001',
    candidateId: 'CL-2027-0042',
    candidateName: 'Rahul Kumar',
    companyName: 'TechNova Solutions',
    companyId: 'COMP-001',
    jobTitle: 'Software Engineer',
    type: 'Aadhaar / Government ID',
    required: true,
    status: 'Submitted',
    fileName: 'rahul_govt_id.pdf',
    fileSize: '950 KB',
    submittedAt: '2026-10-19T10:10:00Z',
    verifiedAt: null,
    verifiedBy: null,
    rejectionReason: null,
    comments: 'Submitted photo ID proof. Ready for officer check.',
    auditLog: [
      {
        timestamp: '2026-10-19 10:10 AM',
        actor: 'Rahul Kumar',
        action: 'Document Uploaded'
      }
    ],
    createdAt: '2026-10-15'
  },
  {
    id: 'DOC-005',
    offerId: 'OFFER-001',
    candidateId: 'CL-2027-0042',
    candidateName: 'Rahul Kumar',
    companyName: 'TechNova Solutions',
    companyId: 'COMP-001',
    jobTitle: 'Software Engineer',
    type: 'Degree / Provisional Certificate',
    required: true,
    status: 'Requested',
    fileName: null,
    fileSize: null,
    submittedAt: null,
    verifiedAt: null,
    verifiedBy: null,
    rejectionReason: null,
    comments: 'Pending final 8th semester provisional certificate issuance.',
    auditLog: [
      {
        timestamp: '2026-10-15 10:30 AM',
        actor: 'Placement Officer',
        action: 'Document Requested'
      }
    ],
    createdAt: '2026-10-15'
  },
  {
    id: 'DOC-006',
    offerId: 'OFFER-002',
    candidateId: 'CL-2027-0003',
    candidateName: 'Arjun Sharma',
    companyName: 'TechNova Solutions',
    companyId: 'COMP-001',
    jobTitle: 'Software Engineer',
    type: '12th Marksheet',
    required: true,
    status: 'Verified',
    fileName: 'arjun_12th_cbse.pdf',
    fileSize: '1.2 MB',
    submittedAt: '2026-10-16T12:00:00Z',
    verifiedAt: '2026-10-17T10:00:00Z',
    verifiedBy: 'Placement Officer',
    rejectionReason: null,
    comments: 'Mark sheet authenticated.',
    auditLog: [],
    createdAt: '2026-10-15'
  },
  {
    id: 'DOC-007',
    offerId: 'OFFER-003',
    candidateId: 'CL-2027-0015',
    candidateName: 'Priya Nair',
    companyName: 'Infosys',
    companyId: 'COMP-002',
    jobTitle: 'Systems Engineer Specialist',
    type: '12th Marksheet',
    required: true,
    status: 'Requested',
    fileName: null,
    fileSize: null,
    submittedAt: null,
    verifiedAt: null,
    verifiedBy: null,
    rejectionReason: null,
    comments: 'Awaiting student upload before deadline.',
    auditLog: [],
    createdAt: '2026-10-16'
  },
  {
    id: 'DOC-008',
    offerId: 'OFFER-004',
    candidateId: 'CL-2027-0021',
    candidateName: 'Aditya Verma',
    companyName: 'Deloitte',
    companyId: 'COMP-003',
    jobTitle: 'Analyst — Technology Consulting',
    type: 'PAN',
    required: true,
    status: 'Verified',
    fileName: 'aditya_pan_card.jpg',
    fileSize: '820 KB',
    submittedAt: '2026-10-15T15:00:00Z',
    verifiedAt: '2026-10-16T11:30:00Z',
    verifiedBy: 'Placement Officer',
    rejectionReason: null,
    comments: 'PAN verified for institutional payroll onboarding.',
    auditLog: [],
    createdAt: '2026-10-12'
  },
  {
    id: 'DOC-009',
    offerId: 'OFFER-005',
    candidateId: 'CL-2027-0029',
    candidateName: 'Sneha Iyer',
    companyName: 'Accenture',
    companyId: 'COMP-004',
    jobTitle: 'Advanced App Engineering Associate',
    type: '10th Marksheet',
    required: true,
    status: 'Under Review',
    fileName: 'sneha_10th_state.pdf',
    fileSize: '2.1 MB',
    submittedAt: '2026-10-18T16:00:00Z',
    verifiedAt: null,
    verifiedBy: null,
    rejectionReason: null,
    comments: 'Submitted yesterday, queued for verification.',
    auditLog: [],
    createdAt: '2026-10-14'
  },
  {
    id: 'DOC-010',
    offerId: 'OFFER-005',
    candidateId: 'CL-2027-0029',
    candidateName: 'Sneha Iyer',
    companyName: 'Accenture',
    companyId: 'COMP-004',
    jobTitle: 'Advanced App Engineering Associate',
    type: '12th Marksheet',
    required: true,
    status: 'Rejected',
    fileName: 'sneha_12th_blurry.jpg',
    fileSize: '650 KB',
    submittedAt: '2026-10-16T14:00:00Z',
    verifiedAt: '2026-10-17T09:30:00Z',
    verifiedBy: 'Placement Officer',
    rejectionReason: 'Document is unclear. Please upload a higher-quality scan.',
    comments: 'Resubmission requested due to illegible grade breakdown.',
    auditLog: [
      {
        timestamp: '2026-10-17 09:30 AM',
        actor: 'Placement Officer',
        action: 'Document Rejected',
        reason: 'Document is unclear. Please upload a higher-quality scan.'
      }
    ],
    createdAt: '2026-10-14'
  }
];
