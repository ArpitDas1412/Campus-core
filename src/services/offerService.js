// CampusLink — Layer 12: Offer Service
// Complete Offer Lifecycle, Acceptance Engine, Event Dispatch, and Analytics Contracts

import { INITIAL_OFFERS, OFFER_STATUSES, ACCEPTANCE_STATUSES } from '../data/offers';
import { createNotification } from './notificationEngine';
import { NOTIFICATION_TYPES, PRIORITIES } from '../data/communicationRules';

const STORAGE_KEY = 'campuslink_offers_v1';

function getStoredOffers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load offers from localStorage', e);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_OFFERS));
  } catch (e) {}
  return INITIAL_OFFERS;
}

function saveStoredOffers(offers) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
  } catch (e) {
    console.error('Failed to save offers to localStorage', e);
  }
}

/**
 * 1. Retrieve all offers with optional filters
 */
export function getOffers(filters = {}) {
  let list = getStoredOffers();

  if (filters.candidateId) {
    list = list.filter(
      (o) =>
        o.candidateId === filters.candidateId ||
        o.studentId === filters.candidateId ||
        (filters.candidateId === 'CL-2027-0042' && (o.candidateName === 'Rahul Kumar' || o.studentName === 'Rahul Kumar'))
    );
  }

  if (filters.companyId) {
    list = list.filter((o) => o.companyId === filters.companyId);
  }

  if (filters.jobId) {
    list = list.filter((o) => o.jobId === filters.jobId);
  }

  if (filters.status && filters.status !== 'All') {
    list = list.filter((o) => o.status === filters.status);
  }

  if (filters.acceptanceStatus && filters.acceptanceStatus !== 'All') {
    list = list.filter((o) => o.acceptance?.status === filters.acceptanceStatus);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (o) =>
        o.candidateName?.toLowerCase().includes(q) ||
        o.id?.toLowerCase().includes(q) ||
        o.jobTitle?.toLowerCase().includes(q) ||
        o.companyName?.toLowerCase().includes(q)
    );
  }

  return list;
}

/**
 * 2. Retrieve single offer by ID
 */
export function getOffer(id) {
  const list = getStoredOffers();
  return list.find((o) => o.id === id) || null;
}

export function getOffersByCandidate(candidateId) {
  return getOffers({ candidateId });
}

export function getOffersByJob(jobId) {
  return getOffers({ jobId });
}

export function getOffersByCompany(companyId) {
  return getOffers({ companyId });
}

/**
 * 3. Create a new offer
 */
export function createOffer(offerData, actor = 'Placement Officer') {
  const list = getStoredOffers();
  const nextNum = list.length + 1;
  const newId = `OFFER-${String(nextNum).padStart(3, '0')}`;

  const newOffer = {
    id: newId,
    jobId: offerData.jobId || 'JOB-2027-001',
    candidateId: offerData.candidateId || 'CL-2027-0042',
    studentId: offerData.candidateId || 'CL-2027-0042',
    candidateName: offerData.candidateName || 'Rahul Kumar',
    studentName: offerData.candidateName || 'Rahul Kumar',
    candidateEmail: offerData.candidateEmail || 'candidate@campuscore.demo',
    candidateDepartment: offerData.candidateDepartment || 'Computer Science & Engineering',
    candidateCgpa: offerData.candidateCgpa || 8.5,
    companyId: offerData.companyId || 'COMP-001',
    companyName: offerData.companyName || 'TechNova Solutions',
    company: offerData.companyName || 'TechNova Solutions',
    jobTitle: offerData.jobTitle || 'Software Engineer',
    role: offerData.jobTitle || 'Software Engineer',
    packageLpa: parseFloat(offerData.compensation?.totalCTC?.replace(/[^0.9.]/g, '') || 9.2),
    employmentType: offerData.employmentType || 'Full-time',
    compensation: {
      totalCTC: offerData.compensation?.totalCTC || '₹9.2 LPA',
      baseSalary: offerData.compensation?.baseSalary || '₹7.8 LPA',
      variablePay: offerData.compensation?.variablePay || '₹1.4 LPA',
      joiningBonus: offerData.compensation?.joiningBonus || '₹50,000'
    },
    location: offerData.location || 'Bangalore',
    workMode: offerData.workMode || 'Hybrid',
    joiningDate: offerData.joiningDate || '2026-12-01',
    probationPeriod: offerData.probationPeriod || '6 months',
    noticePeriod: offerData.noticePeriod || '30 days',
    offerDate: new Date().toISOString().split('T')[0],
    expiryDate: offerData.expiryDate || '2026-10-25',
    status: offerData.sendImmediately ? OFFER_STATUSES.SENT : OFFER_STATUSES.DRAFT,
    acceptance: {
      status: ACCEPTANCE_STATUSES.PENDING,
      acceptedAt: null,
      declinedAt: null,
      declineReason: null
    },
    documentsRequired: offerData.documentsRequired || [
      { id: `REQ-${Date.now()}-1`, type: 'Resume', required: true, status: 'Verified' },
      { id: `REQ-${Date.now()}-2`, type: '10th Marksheet', required: true, status: 'Verified' },
      { id: `REQ-${Date.now()}-3`, type: '12th Marksheet', required: true, status: 'Under Review' },
      { id: `REQ-${Date.now()}-4`, type: 'Degree / Provisional Certificate', required: true, status: 'Requested' },
      { id: `REQ-${Date.now()}-5`, type: 'Aadhaar / Government ID', required: true, status: 'Submitted' }
    ],
    joining: {
      status: 'Scheduled',
      confirmedAt: null,
      joinedAt: null,
      reportingContact: `${offerData.companyName || 'Corporate'} HR Team`,
      reportingTime: '09:30 AM',
      location: `${offerData.companyName || 'Corporate'} Campus, ${offerData.location || 'Bangalore'}`
    },
    createdBy: actor,
    auditLog: [
      {
        timestamp: new Date().toLocaleString(),
        actor,
        role: actor.toLowerCase().includes('officer') ? 'officer' : 'recruiter',
        action: offerData.sendImmediately ? 'Offer Created and Sent' : 'Offer Draft Created',
        previousStatus: null,
        newStatus: offerData.sendImmediately ? 'Sent' : 'Draft'
      }
    ],
    createdAt: new Date().toISOString().split('T')[0]
  };

  list.unshift(newOffer);
  saveStoredOffers(list);

  if (offerData.sendImmediately) {
    dispatchOfferNotification(newOffer, 'OFFER_AVAILABLE');
  }

  return newOffer;
}

/**
 * 4. Send an existing draft offer
 */
export function sendOffer(id, actor = 'Placement Officer') {
  const list = getStoredOffers();
  const index = list.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const current = list[index];
  const updated = {
    ...current,
    status: OFFER_STATUSES.SENT,
    auditLog: [
      {
        timestamp: new Date().toLocaleString(),
        actor,
        role: actor.toLowerCase().includes('officer') ? 'officer' : 'recruiter',
        action: 'Offer Sent',
        previousStatus: current.status,
        newStatus: 'Sent'
      },
      ...current.auditLog
    ]
  };

  list[index] = updated;
  saveStoredOffers(list);

  dispatchOfferNotification(updated, 'OFFER_AVAILABLE');
  return updated;
}

export function resendOffer(id, actor = 'Placement Officer') {
  return sendOffer(id, actor);
}

/**
 * 5. Mark offer as viewed by student
 */
export function viewOffer(id, actor = 'Student') {
  const list = getStoredOffers();
  const index = list.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const current = list[index];
  if (current.status === OFFER_STATUSES.SENT) {
    const updated = {
      ...current,
      status: OFFER_STATUSES.VIEWED,
      auditLog: [
        {
          timestamp: new Date().toLocaleString(),
          actor,
          role: 'student',
          action: 'Offer Viewed',
          previousStatus: 'Sent',
          newStatus: 'Viewed'
        },
        ...current.auditLog
      ]
    };
    list[index] = updated;
    saveStoredOffers(list);
    return updated;
  }
  return current;
}

/**
 * 6. Accept Offer Flow
 */
export function acceptOffer(id, metadata = {}, actor = 'Rahul Kumar') {
  const list = getStoredOffers();
  const index = list.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const current = list[index];
  const nowIso = new Date().toISOString();

  const updated = {
    ...current,
    status: OFFER_STATUSES.ACCEPTED,
    acceptance: {
      status: ACCEPTANCE_STATUSES.ACCEPTED,
      acceptedAt: nowIso,
      declinedAt: null,
      declineReason: null,
      confirmedTerms: true
    },
    joining: {
      ...current.joining,
      status: 'Confirmed',
      confirmedAt: nowIso
    },
    auditLog: [
      {
        timestamp: new Date().toLocaleString(),
        actor,
        role: 'student',
        action: 'Offer Accepted',
        previousStatus: current.status,
        newStatus: 'Accepted'
      },
      ...current.auditLog
    ]
  };

  list[index] = updated;
  saveStoredOffers(list);

  // Trigger Layer 11 notification
  dispatchOfferNotification(updated, 'OFFER_ACCEPTED');

  return updated;
}

/**
 * 7. Decline Offer Flow
 */
export function declineOffer(id, reason = 'Alternative opportunity', actor = 'Rahul Kumar') {
  const list = getStoredOffers();
  const index = list.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const current = list[index];
  const nowIso = new Date().toISOString();

  const updated = {
    ...current,
    status: OFFER_STATUSES.DECLINED,
    acceptance: {
      status: ACCEPTANCE_STATUSES.DECLINED,
      acceptedAt: null,
      declinedAt: nowIso,
      declineReason: reason
    },
    joining: {
      ...current.joining,
      status: 'Cancelled'
    },
    auditLog: [
      {
        timestamp: new Date().toLocaleString(),
        actor,
        role: 'student',
        action: 'Offer Declined',
        previousStatus: current.status,
        newStatus: 'Declined',
        reason
      },
      ...current.auditLog
    ]
  };

  list[index] = updated;
  saveStoredOffers(list);

  // Trigger Layer 11 notification
  dispatchOfferNotification(updated, 'OFFER_DECLINED');

  return updated;
}

/**
 * 8. Cancel Offer (Officer / Recruiter)
 */
export function cancelOffer(id, reason = 'Drive revised', actor = 'Placement Officer') {
  const list = getStoredOffers();
  const index = list.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const current = list[index];
  const updated = {
    ...current,
    status: OFFER_STATUSES.CANCELLED,
    auditLog: [
      {
        timestamp: new Date().toLocaleString(),
        actor,
        role: 'officer',
        action: 'Offer Cancelled',
        previousStatus: current.status,
        newStatus: 'Cancelled',
        reason
      },
      ...current.auditLog
    ]
  };

  list[index] = updated;
  saveStoredOffers(list);
  return updated;
}

/**
 * Helper to dispatch Layer 11 notifications
 */
function dispatchOfferNotification(offer, eventType) {
  try {
    let title = 'Employment Offer Update';
    let message = `Update regarding your ${offer.companyName} offer.`;
    let priority = PRIORITIES.IMPORTANT;

    if (eventType === 'OFFER_AVAILABLE') {
      title = `Employment Offer Available — ${offer.companyName}`;
      message = `Congratulations ${offer.candidateName}! Your official employment offer for ${offer.jobTitle} at ${offer.companyName} (${offer.compensation?.totalCTC}) is now ready for review.`;
      priority = PRIORITIES.URGENT;
    } else if (eventType === 'OFFER_ACCEPTED') {
      title = `Offer Accepted — ${offer.candidateName}`;
      message = `Great news! ${offer.candidateName} has formally accepted the employment offer for ${offer.jobTitle} at ${offer.companyName}. Proceed with document verification.`;
      priority = PRIORITIES.IMPORTANT;
    } else if (eventType === 'OFFER_DECLINED') {
      title = `Offer Declined — ${offer.candidateName}`;
      message = `${offer.candidateName} has declined the offer for ${offer.jobTitle} at ${offer.companyName} (Reason: ${offer.acceptance?.declineReason || 'Not specified'}).`;
      priority = PRIORITIES.NORMAL;
    }

    createNotification({
      type: NOTIFICATION_TYPES[eventType] || eventType,
      candidateId: offer.candidateId,
      candidateName: offer.candidateName,
      companyName: offer.companyName,
      jobTitle: offer.jobTitle,
      priority,
      message,
      relatedEntity: {
        type: 'offer',
        id: offer.id
      }
    });
  } catch (e) {
    console.error('Failed to dispatch offer notification:', e);
  }
}

/**
 * 9. Offer Statistics & KPI Cards (Section 6 & 43)
 */
export function getOfferStats() {
  const offers = getStoredOffers();

  const offersSent = offers.filter((o) => o.status === 'Sent' || o.status === 'Viewed' || o.status === 'Accepted').length;
  const accepted = offers.filter((o) => o.status === 'Accepted').length;
  const pending = offers.filter((o) => o.status === 'Sent' || o.status === 'Viewed' || o.acceptance?.status === 'Pending').length;
  const declined = offers.filter((o) => o.status === 'Declined').length;
  const expired = offers.filter((o) => o.status === 'Expired').length;

  return {
    selectedCandidates: 42,
    offersGenerated: 38,
    offersSent: 36,
    accepted: 29,
    pending: 7,
    declined: 3,
    expired: 2,
    documentsPending: 11,
    verified: 24,
    joiningConfirmed: 18,
    // Rates for analytics (Section 43)
    acceptanceRate: 80.6,
    declineRate: 8.3,
    documentCompletionRate: 88.2,
    documentVerificationRate: 82.4,
    joiningConfirmationRate: 79.3
  };
}

/**
 * 10. Horizontal Offer Pipeline Stages (Section 7)
 */
export function getOfferPipeline() {
  return [
    { stage: 'Final Selected', count: 42, color: '#3978F6', sub: 'Passed interviews' },
    { stage: 'Offer Draft', count: 4, color: '#F59E0B', sub: 'In review' },
    { stage: 'Offer Sent', count: 36, color: '#2563EB', sub: 'Dispatched to candidates' },
    { stage: 'Viewed', count: 32, color: '#0E8EA8', sub: 'Opened by students' },
    { stage: 'Accepted', count: 29, color: '#10B981', sub: 'Accepted by candidates' },
    { stage: 'Declined', count: 3, color: '#EF4444', sub: 'Alternative offers' },
    { stage: 'Documents Pending', count: 11, color: '#8B5CF6', sub: 'Uploads required' },
    { stage: 'Verified', count: 24, color: '#059669', sub: 'All proofs cleared' },
    { stage: 'Joining Confirmed', count: 18, color: '#047857', sub: 'Ready to onboard' }
  ];
}

/**
 * 11. Structured Analytics contracts for future Layer 13
 */
export function getAcceptanceStats() {
  return {
    totalSent: 36,
    totalAccepted: 29,
    totalDeclined: 3,
    totalPending: 7,
    avgTimeToAcceptHours: 18.4,
    acceptanceRate: 80.6
  };
}

export function getCompanyOfferStats() {
  return [
    { company: 'TechNova Solutions', sent: 12, accepted: 10, rate: 83.3, avgCtc: '9.4 LPA' },
    { company: 'Amazon', sent: 4, accepted: 4, rate: 100.0, avgCtc: '28.5 LPA' },
    { company: 'Deloitte', sent: 8, accepted: 7, rate: 87.5, avgCtc: '11.2 LPA' },
    { company: 'Infosys', sent: 6, accepted: 4, rate: 66.7, avgCtc: '9.5 LPA' },
    { company: 'Accenture', sent: 6, accepted: 4, rate: 66.7, avgCtc: '8.5 LPA' }
  ];
}

export function getDepartmentOfferStats() {
  return [
    { department: 'Computer Science & Engineering', offers: 22, accepted: 19, rate: 86.4 },
    { department: 'Information Technology', offers: 10, accepted: 7, rate: 70.0 },
    { department: 'Electronics & Communication', offers: 6, accepted: 3, rate: 50.0 }
  ];
}

// Default export wrapper
const offerService = {
  getOffers,
  getOffer,
  getOffersByCandidate,
  getOffersByJob,
  getOffersByCompany,
  createOffer,
  sendOffer,
  resendOffer,
  viewOffer,
  acceptOffer,
  declineOffer,
  cancelOffer,
  getOfferStats,
  getOfferPipeline,
  getAcceptanceStats,
  getCompanyOfferStats,
  getDepartmentOfferStats
};

export { offerService };
export default offerService;
