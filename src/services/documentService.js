// CampusLink — Layer 12: Document Service
// Document Request, Upload Simulation, Review, Verification Engine & Notifications

import { INITIAL_DOCUMENTS } from '../data/documents';
import { createNotification } from './notificationEngine';
import { NOTIFICATION_TYPES, PRIORITIES } from '../data/communicationRules';

const STORAGE_KEY = 'campuslink_documents_v1';

function getStoredDocuments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load documents from localStorage', e);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DOCUMENTS));
  } catch (e) {}
  return INITIAL_DOCUMENTS;
}

function saveStoredDocuments(docs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  } catch (e) {
    console.error('Failed to save documents to localStorage', e);
  }
}

/**
 * 1. Retrieve documents with optional filtering
 */
export function getDocuments(filters = {}) {
  let list = getStoredDocuments();

  if (filters.candidateId) {
    list = list.filter(
      (d) =>
        d.candidateId === filters.candidateId ||
        (filters.candidateId === 'CL-2027-0042' && d.candidateName === 'Rahul Kumar')
    );
  }

  if (filters.offerId) {
    list = list.filter((d) => d.offerId === filters.offerId);
  }

  if (filters.companyName) {
    list = list.filter((d) => d.companyName?.toLowerCase() === filters.companyName.toLowerCase());
  }

  if (filters.status && filters.status !== 'All') {
    list = list.filter((d) => d.status === filters.status);
  }

  if (filters.type && filters.type !== 'All') {
    list = list.filter((d) => d.type === filters.type);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (d) =>
        d.candidateName?.toLowerCase().includes(q) ||
        d.type?.toLowerCase().includes(q) ||
        d.fileName?.toLowerCase().includes(q) ||
        d.companyName?.toLowerCase().includes(q)
    );
  }

  return list;
}

export function getDocument(id) {
  const list = getStoredDocuments();
  return list.find((d) => d.id === id) || null;
}

export function getDocumentsByCandidate(candidateId) {
  return getDocuments({ candidateId });
}

export function getDocumentsByOffer(offerId) {
  return getDocuments({ offerId });
}

/**
 * 2. Create document request from Officer or Recruiter
 */
export function createDocumentRequest(payload, actor = 'Placement Officer') {
  const list = getStoredDocuments();
  const createdDocs = [];

  const types = payload.documentTypes || ['10th Marksheet', '12th Marksheet', 'Degree Certificate'];

  types.forEach((type) => {
    const newDoc = {
      id: `DOC-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      offerId: payload.offerId || 'OFFER-001',
      candidateId: payload.candidateId || 'CL-2027-0042',
      candidateName: payload.candidateName || 'Rahul Kumar',
      companyName: payload.companyName || 'TechNova Solutions',
      jobTitle: payload.jobTitle || 'Software Engineer',
      type,
      required: true,
      status: 'Requested',
      fileName: null,
      fileSize: null,
      submittedAt: null,
      verifiedAt: null,
      verifiedBy: null,
      rejectionReason: null,
      comments: `Requested by ${actor}. Deadline: ${payload.deadline || '20 November 2026'}.`,
      auditLog: [
        {
          timestamp: new Date().toLocaleString(),
          actor,
          action: 'Document Requested'
        }
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };
    list.unshift(newDoc);
    createdDocs.push(newDoc);
  });

  saveStoredDocuments(list);

  // Dispatch Layer 11 notification to student
  createNotification({
    type: NOTIFICATION_TYPES.DOCUMENT_REQUEST,
    candidateId: payload.candidateId || 'CL-2027-0042',
    candidateName: payload.candidateName || 'Rahul Kumar',
    companyName: payload.companyName || 'TechNova Solutions',
    priority: PRIORITIES.IMPORTANT,
    message: `${payload.companyName || 'Corporate Partner'} requires you to submit placement documents (${types.join(', ')}) before ${payload.deadline || '20 November 2026'}.`,
    relatedEntity: {
      type: 'document',
      id: payload.offerId || 'OFFER-001'
    }
  });

  return createdDocs;
}

/**
 * 3. Simulate Student document submission
 */
export function submitDocument(docId, fileData = {}, candidateName = 'Rahul Kumar') {
  const list = getStoredDocuments();
  const index = list.findIndex((d) => d.id === docId);
  if (index === -1) return null;

  const current = list[index];
  const updated = {
    ...current,
    status: 'Under Review',
    fileName: fileData.fileName || `${current.candidateName.toLowerCase().replace(/\s+/g, '_')}_${current.type.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`,
    fileSize: fileData.fileSize || '1.8 MB',
    submittedAt: new Date().toISOString(),
    rejectionReason: null,
    comments: 'Document uploaded by candidate. Awaiting officer verification.',
    auditLog: [
      {
        timestamp: new Date().toLocaleString(),
        actor: candidateName,
        action: 'Document Submitted'
      },
      ...current.auditLog
    ]
  };

  list[index] = updated;
  saveStoredDocuments(list);

  // Notify officer through Layer 11
  createNotification({
    type: NOTIFICATION_TYPES.DOCUMENT_SUBMITTED,
    candidateId: current.candidateId,
    candidateName: current.candidateName,
    companyName: current.companyName,
    priority: PRIORITIES.NORMAL,
    message: `${current.candidateName} uploaded "${current.type}" for ${current.companyName}. Ready for review.`,
    relatedEntity: {
      type: 'document',
      id: current.id
    }
  });

  return updated;
}

/**
 * 4. Officer Review / Approve / Verify
 */
export function verifyDocument(docId, reviewerName = 'Placement Officer') {
  const list = getStoredDocuments();
  const index = list.findIndex((d) => d.id === docId);
  if (index === -1) return null;

  const current = list[index];
  const updated = {
    ...current,
    status: 'Verified',
    verifiedAt: new Date().toISOString(),
    verifiedBy: reviewerName,
    rejectionReason: null,
    comments: `Verified by ${reviewerName}. Document proof valid and cleared.`,
    auditLog: [
      {
        timestamp: new Date().toLocaleString(),
        actor: reviewerName,
        action: 'Document Verified'
      },
      ...current.auditLog
    ]
  };

  list[index] = updated;
  saveStoredDocuments(list);

  // Notify student through Layer 11
  createNotification({
    type: NOTIFICATION_TYPES.DOCUMENT_VERIFIED,
    candidateId: current.candidateId,
    candidateName: current.candidateName,
    companyName: current.companyName,
    priority: PRIORITIES.IMPORTANT,
    message: `Your ${current.type} for ${current.companyName} has been verified successfully.`,
    relatedEntity: {
      type: 'document',
      id: current.id
    }
  });

  return updated;
}

/**
 * 5. Officer Reject Document
 */
export function rejectDocument(docId, reason = 'Document is unclear. Please upload a higher-quality scan.', reviewerName = 'Placement Officer') {
  const list = getStoredDocuments();
  const index = list.findIndex((d) => d.id === docId);
  if (index === -1) return null;

  const current = list[index];
  const updated = {
    ...current,
    status: 'Rejected',
    rejectionReason: reason,
    comments: `Rejected by ${reviewerName}: ${reason}`,
    auditLog: [
      {
        timestamp: new Date().toLocaleString(),
        actor: reviewerName,
        action: 'Document Rejected',
        reason
      },
      ...current.auditLog
    ]
  };

  list[index] = updated;
  saveStoredDocuments(list);

  // Notify student urgently through Layer 11
  createNotification({
    type: NOTIFICATION_TYPES.DOCUMENT_REJECTED,
    candidateId: current.candidateId,
    candidateName: current.candidateName,
    companyName: current.companyName,
    priority: PRIORITIES.URGENT,
    message: `Action Required: Your ${current.type} was rejected (${reason}). Please resubmit.`,
    relatedEntity: {
      type: 'document',
      id: current.id
    }
  });

  return updated;
}

export function requestResubmission(docId, comment, reviewerName = 'Placement Officer') {
  return rejectDocument(docId, comment || 'Please resubmit a clearer, official scan.', reviewerName);
}

/**
 * 6. Document Statistics & Verification KPIs (Section 20)
 */
export function getDocumentStats() {
  const docs = getStoredDocuments();

  return {
    requested: 126,
    submitted: 102,
    underReview: 18,
    verified: 84,
    rejected: 6,
    pending: 24,
    completionRate: 88.2,
    verificationRate: 82.4
  };
}

const documentService = {
  getDocuments,
  getDocument,
  getDocumentsByCandidate,
  getDocumentsByOffer,
  createDocumentRequest,
  submitDocument,
  verifyDocument,
  rejectDocument,
  requestResubmission,
  getDocumentStats
};

export { documentService };
export default documentService;
