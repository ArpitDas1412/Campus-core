// CampusLink — Layer 11: Master Communication Service
// Manages Announcements, Unified Conversations & Inbox, Delivery Analytics, and History.

import {
  INITIAL_COMMUNICATION_METRICS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CONVERSATIONS,
  CHANNELS,
  PRIORITIES,
  DELIVERY_STATUS
} from '../data/communicationRules';
import {
  createNotification,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  getNotificationHistory
} from './notificationEngine';

const STORAGE_KEYS = {
  ANNOUNCEMENTS: 'campuslink_announcements',
  CONVERSATIONS: 'campuslink_conversations',
  HISTORY: 'campuslink_communication_history',
  METRICS: 'campuslink_communication_metrics'
};

function getStored(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`Error reading ${key}:`, e);
    return fallback;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key}:`, e);
  }
}

// Initial seed data bootstrap
function initialize() {
  if (!getStored(STORAGE_KEYS.ANNOUNCEMENTS, null)) {
    setStored(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }
  if (!getStored(STORAGE_KEYS.CONVERSATIONS, null)) {
    setStored(STORAGE_KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS);
  }
  if (!getStored(STORAGE_KEYS.METRICS, null)) {
    setStored(STORAGE_KEYS.METRICS, INITIAL_COMMUNICATION_METRICS);
  }
}

/**
 * 1. Send a message in a conversation thread or start a new thread
 */
export function sendMessage({ conversationId, senderId, senderName, recipientId, subject, body, attachments = [], isOfficer = false }) {
  initialize();
  const convs = getStored(STORAGE_KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS);
  let targetConv = convs.find((c) => c.id === conversationId || c.participantId === recipientId);

  const newMsg = {
    id: `MSG-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    senderId,
    senderName,
    isOfficer,
    body,
    attachments,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  if (targetConv) {
    targetConv.messages.push(newMsg);
    targetConv.lastMessage = body;
    targetConv.lastTime = newMsg.time;
    targetConv.unread = !isOfficer; // unread for recipient if sender is officer
  } else {
    targetConv = {
      id: conversationId || `CONV-${Date.now()}`,
      participantId: recipientId || 'CL-2027-0042',
      participantName: recipientId === 'CL-2027-0042' ? 'Rahul Kumar' : 'Placement Contact',
      participantRole: 'Student',
      participantAvatar: 'ST',
      participantColor: '#3978F6',
      subject: subject || 'Placement Communication',
      lastMessage: body,
      lastTime: newMsg.time,
      unread: true,
      category: 'Students',
      messages: [newMsg]
    };
    convs.unshift(targetConv);
  }

  setStored(STORAGE_KEYS.CONVERSATIONS, convs);

  // Update master history
  logCommunicationHistory({
    type: 'Direct Message',
    subject: subject || targetConv.subject,
    audience: targetConv.participantName,
    channel: CHANNELS.IN_APP,
    recipients: 1,
    status: DELIVERY_STATUS.DELIVERED,
    sentBy: senderName || 'Placement Officer'
  });

  // Simulated auto-reply if student messages officer (for interactive judge demo)
  if (!isOfficer) {
    setTimeout(() => {
      simulateOfficerReply(targetConv.id);
    }, 1500);
  }

  return targetConv;
}

function simulateOfficerReply(conversationId) {
  const convs = getStored(STORAGE_KEYS.CONVERSATIONS, []);
  const conv = convs.find((c) => c.id === conversationId);
  if (!conv) return;

  const autoReplies = [
    'Acknowledged. Your schedule details have been verified by the placement coordinator.',
    'Thank you for confirming. Your interview panel has been updated accordingly.',
    'Noted. Please check Turing Lab A slot board for live sequence updates.'
  ];
  const replyText = autoReplies[Math.floor(Math.random() * autoReplies.length)];

  conv.messages.push({
    id: `MSG-REPLY-${Date.now()}`,
    senderId: 'OFFICER',
    senderName: 'Placement Coordinator',
    isOfficer: true,
    body: replyText,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });
  conv.lastMessage = replyText;
  conv.lastTime = 'Just now';
  setStored(STORAGE_KEYS.CONVERSATIONS, convs);
}

/**
 * 2. Get all conversations or filter by user role
 */
export function getConversationsForUser(userId = null, category = 'All') {
  initialize();
  const convs = getStored(STORAGE_KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS);

  let filtered = convs;
  if (category && category !== 'All') {
    filtered = filtered.filter((c) => c.category === category);
  }

  if (userId && userId !== 'officer' && userId !== 'admin') {
    // Student view
    filtered = filtered.filter((c) => c.participantId === userId || c.participantId === 'CL-2027-0042');
  }

  return filtered;
}

/**
 * 3. Get single conversation by ID
 */
export function getConversation(conversationId) {
  initialize();
  const convs = getStored(STORAGE_KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS);
  return convs.find((c) => c.id === conversationId) || convs[0];
}

/**
 * 4. Create and publish an announcement
 */
export function createAnnouncement(announcementData) {
  initialize();
  const list = getStored(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);

  const count = announcementData.audience?.recipientCount || 125;

  const newAnn = {
    id: `ANN-${Date.now().toString().slice(-4)}`,
    title: announcementData.title,
    type: announcementData.type || 'Placement Drive',
    content: announcementData.content,
    audience: announcementData.audience || {
      type: 'Placement Drive',
      target: 'TechNova Solutions — SDE I',
      recipientCount: count
    },
    priority: announcementData.priority || PRIORITIES.IMPORTANT,
    channels: announcementData.channels || [CHANNELS.IN_APP, CHANNELS.EMAIL],
    status: announcementData.status || 'Published',
    scheduledAt: announcementData.scheduledAt || null,
    publishedAt: new Date().toISOString(),
    createdBy: announcementData.createdBy || 'Dr. Ramesh Sharma (Placement Director)',
    readCount: Math.round(count * 0.85),
    unreadCount: Math.round(count * 0.15)
  };

  list.unshift(newAnn);
  setStored(STORAGE_KEYS.ANNOUNCEMENTS, list);

  // Push notification to Rahul Kumar (demo student)
  createNotification({
    type: 'PLACEMENT_ANNOUNCEMENT',
    title: newAnn.title,
    message: newAnn.content.length > 120 ? newAnn.content.slice(0, 117) + '...' : newAnn.content,
    priority: newAnn.priority,
    relatedEntity: {
      type: 'announcement',
      id: newAnn.id
    },
    candidateId: 'CL-2027-0042'
  });

  // Log in Master Communication History
  logCommunicationHistory({
    type: `Announcement: ${newAnn.type}`,
    subject: newAnn.title,
    audience: `${newAnn.audience.target} (${count} Students)`,
    channel: newAnn.channels.join(' + '),
    recipients: count,
    status: DELIVERY_STATUS.DELIVERED,
    sentBy: newAnn.createdBy
  });

  return newAnn;
}

/**
 * 5. Get all announcements
 */
export function getAllAnnouncements() {
  initialize();
  return getStored(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
}

/**
 * 6. Get stats for a specific announcement
 */
export function getAnnouncementStats(announcementId) {
  initialize();
  const list = getStored(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  const ann = list.find((a) => a.id === announcementId) || list[0];
  const total = ann?.audience?.recipientCount || 125;
  const read = ann?.readCount || Math.round(total * 0.87);
  return {
    recipients: total,
    delivered: total,
    read,
    unread: total - read,
    readRate: ((read / total) * 100).toFixed(1)
  };
}

/**
 * 7. Get master communication history
 */
export function getCommunicationHistory(filters = {}) {
  initialize();
  const history = getStored(STORAGE_KEYS.HISTORY, [
    {
      id: 'HIST-001',
      date: '10 Oct 2026',
      type: 'Interview Scheduled',
      subject: 'Interview Scheduled — TechNova Solutions',
      audience: '125 Shortlisted Students',
      channel: 'In-App + Email (Simulated)',
      recipients: '125 / 125',
      status: 'Delivered',
      sentBy: 'SchedulingEngine (Layer 10)'
    },
    {
      id: 'HIST-002',
      date: '10 Oct 2026',
      type: 'Interview Rescheduled',
      subject: '⚠ URGENT: Technical Interview Rescheduled — Rahul Kumar',
      audience: 'Rahul Kumar (2023CS0104)',
      channel: 'In-App + SMS (Simulated)',
      recipients: '1 / 1',
      status: 'Delivered',
      sentBy: 'Placement Officer'
    },
    {
      id: 'HIST-003',
      date: '09 Oct 2026',
      type: 'Campus Announcement',
      subject: 'Infosys — Online Aptitude Assessment Slot Allotments',
      audience: 'CSE & IT Departments',
      channel: 'In-App + Email (Simulated)',
      recipients: '240 / 240',
      status: 'Delivered',
      sentBy: 'Placement Office Coordinator'
    },
    {
      id: 'HIST-004',
      date: '08 Oct 2026',
      type: 'Candidate Shortlisted',
      subject: 'Congratulations! You Have Been Shortlisted — TechNova',
      audience: '86 Verified Shortlists',
      channel: 'In-App',
      recipients: '86 / 86',
      status: 'Delivered',
      sentBy: 'SmartShortlisting (Layer 9)'
    }
  ]);

  let result = history;
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (h) =>
        h.subject.toLowerCase().includes(q) ||
        h.type.toLowerCase().includes(q) ||
        h.audience.toLowerCase().includes(q)
    );
  }
  if (filters.type && filters.type !== 'All') {
    result = result.filter((h) => h.type.includes(filters.type));
  }
  return result;
}

function logCommunicationHistory(entry) {
  const history = getCommunicationHistory();
  const item = {
    id: `HIST-${Date.now().toString().slice(-4)}`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    ...entry
  };
  history.unshift(item);
  setStored(STORAGE_KEYS.HISTORY, history.slice(0, 100));
}

/**
 * 8. Get overall delivery stats and KPI cards
 */
export function getDeliveryStats() {
  initialize();
  return getStored(STORAGE_KEYS.METRICS, INITIAL_COMMUNICATION_METRICS);
}

export default {
  sendMessage,
  getConversationsForUser,
  getConversation,
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementStats,
  getCommunicationHistory,
  getDeliveryStats,
  createNotification,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  getNotificationHistory
};
