// CampusLink — Layer 12: Joining Data Store
// Centralized onboarding and joining records

export const INITIAL_JOINING_RECORDS = [
  {
    id: 'JOIN-001',
    offerId: 'OFFER-001',
    candidateId: 'CL-2027-0042',
    candidateName: 'Rahul Kumar',
    candidateDepartment: 'Computer Science & Engineering',
    candidateEmail: 'rahul.kumar@campuscore.demo',
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    jobTitle: 'Software Engineer',
    joiningDate: '2026-12-01',
    joiningTime: '09:30 AM',
    location: 'TechNova Bangalore Campus, Electronic City Phase 1',
    workMode: 'Hybrid',
    reportingContact: 'Ananya Mehta (Talent Acquisition)',
    status: 'Confirmed',
    confirmedAt: '2026-10-20T10:00:00Z',
    joinedAt: null,
    notes: 'Reporting at Block A Reception with college ID and original marksheets for physical verification.',
    auditLog: [
      {
        timestamp: '2026-10-15 01:45 PM',
        actor: 'Rahul Kumar',
        action: 'Offer Accepted'
      },
      {
        timestamp: '2026-10-20 10:00 AM',
        actor: 'Placement Officer',
        action: 'Joining Confirmed'
      }
    ]
  },
  {
    id: 'JOIN-002',
    offerId: 'OFFER-002',
    candidateId: 'CL-2027-0003',
    candidateName: 'Arjun Sharma',
    candidateDepartment: 'Computer Science & Engineering',
    candidateEmail: 'arjun.sharma@campuscore.demo',
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    jobTitle: 'Software Engineer',
    joiningDate: '2026-12-01',
    joiningTime: '09:30 AM',
    location: 'TechNova Bangalore Campus',
    workMode: 'On-site',
    reportingContact: 'Ananya Mehta',
    status: 'Joined',
    confirmedAt: '2026-10-18T11:00:00Z',
    joinedAt: '2026-12-01T09:30:00Z',
    notes: 'Candidate completed Day-1 orientation and badge issuance.',
    auditLog: [
      {
        timestamp: '2026-10-18 11:00 AM',
        actor: 'Placement Officer',
        action: 'Joining Confirmed'
      },
      {
        timestamp: '2026-12-01 09:30 AM',
        actor: 'Recruiter',
        action: 'Marked as Joined'
      }
    ]
  },
  {
    id: 'JOIN-003',
    offerId: 'OFFER-003',
    candidateId: 'CL-2027-0015',
    candidateName: 'Priya Nair',
    candidateDepartment: 'Information Technology',
    candidateEmail: 'priya.nair@campuscore.demo',
    companyId: 'COMP-002',
    companyName: 'Infosys',
    jobTitle: 'Systems Engineer Specialist',
    joiningDate: '2027-01-10',
    joiningTime: '10:00 AM',
    location: 'Infosys Hinjewadi Campus, Pune',
    workMode: 'Hybrid',
    reportingContact: 'Campus Relations Infosys',
    status: 'Scheduled',
    confirmedAt: null,
    joinedAt: null,
    notes: 'Awaiting offer acceptance and document verification completion.',
    auditLog: []
  },
  {
    id: 'JOIN-004',
    offerId: 'OFFER-004',
    candidateId: 'CL-2027-0021',
    candidateName: 'Aditya Verma',
    candidateDepartment: 'Computer Science & Engineering',
    candidateEmail: 'aditya.verma@campuscore.demo',
    companyId: 'COMP-003',
    companyName: 'Deloitte',
    jobTitle: 'Analyst — Technology Consulting',
    joiningDate: '2026-12-15',
    joiningTime: '09:00 AM',
    location: 'Deloitte Towers, Hitec City, Hyderabad',
    workMode: 'Hybrid',
    reportingContact: 'Deloitte Onboarding Cell',
    status: 'Confirmed',
    confirmedAt: '2026-10-17T14:00:00Z',
    joinedAt: null,
    notes: 'Background verification cleared. Pre-joining learning modules dispatched.',
    auditLog: [
      {
        timestamp: '2026-10-17 02:00 PM',
        actor: 'Placement Officer',
        action: 'Joining Confirmed'
      }
    ]
  },
  {
    id: 'JOIN-005',
    offerId: 'OFFER-005',
    candidateId: 'CL-2027-0029',
    candidateName: 'Sneha Iyer',
    candidateDepartment: 'Electronics & Communication',
    candidateEmail: 'sneha.iyer@campuscore.demo',
    companyId: 'COMP-004',
    companyName: 'Accenture',
    jobTitle: 'Advanced App Engineering Associate',
    joiningDate: '2027-01-15',
    joiningTime: '09:30 AM',
    location: 'Accenture CDC, Sholinganallur, Chennai',
    workMode: 'Hybrid',
    reportingContact: 'Accenture Campus HR',
    status: 'Scheduled',
    confirmedAt: null,
    joinedAt: null,
    notes: 'Scheduled for Q1 cohort induction.',
    auditLog: []
  },
  {
    id: 'JOIN-006',
    offerId: 'OFFER-006',
    candidateId: 'CL-2027-0033',
    candidateName: 'Rohan Das',
    candidateDepartment: 'Computer Science & Engineering',
    candidateEmail: 'rohan.das@campuscore.demo',
    companyId: 'COMP-005',
    companyName: 'Amazon',
    jobTitle: 'Software Development Engineer I',
    joiningDate: '2026-11-15',
    joiningTime: '09:00 AM',
    location: 'Amazon Development Centre, Nanakramguda, Hyderabad',
    workMode: 'On-site',
    reportingContact: 'Amazon Student Programs',
    status: 'Joined',
    confirmedAt: '2026-10-10T15:00:00Z',
    joinedAt: '2026-11-15T09:00:00Z',
    notes: 'Joined AWS Core team.',
    auditLog: [
      {
        timestamp: '2026-11-15 09:00 AM',
        actor: 'Amazon HR',
        action: 'Marked as Joined'
      }
    ]
  }
];
