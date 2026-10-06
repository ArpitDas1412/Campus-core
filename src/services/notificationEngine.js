// CampusLink — Layer 11: Automatic Notification Engine
// Consumes events from Layer 9 (Shortlisting) and Layer 10 (Drive Scheduling),
// maps them via automation rules and templates, and manages delivery and read state.

import {
  NOTIFICATION_TYPES,
  PRIORITIES,
  CHANNELS,
  COMMUNICATION_AUTOMATION_RULES,
  INITIAL_NOTIFICATIONS
} from '../data/communicationRules';
import { getTemplateByEvent, renderTemplate } from './templateService';
import { STUDENTS } from '../data/students';

const STORAGE_KEYS = {
  NOTIFICATIONS: 'campuslink_notifications',
  EVENTS_PROCESSED: 'campuslink_events_processed',
  COMMUNICATION_EVENTS: 'campuslink_communication_events'
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
    console.error(`Error saving ${key}:`, e);
  }
}

// Initialize seed notifications if empty
function initializeEngine() {
  const existing = getStored(STORAGE_KEYS.NOTIFICATIONS, null);
  if (!existing || existing.length === 0) {
    setStored(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  // Drain any queued events from Layer 10
  drainLayer10Queue();
}

/**
 * 1. Drain pending Layer 10 notification queue events from schedulingEngine
 */
export function drainLayer10Queue() {
  try {
    const rawQueue = localStorage.getItem('campuslink_notifications_queue');
    if (!rawQueue) return;
    const queue = JSON.parse(rawQueue);
    if (!Array.isArray(queue) || queue.length === 0) return;

    const processedIds = getStored(STORAGE_KEYS.EVENTS_PROCESSED, []);

    queue.forEach((ev) => {
      if (!processedIds.includes(ev.id)) {
        createNotificationFromEvent(ev);
        processedIds.push(ev.id);
      }
    });

    setStored(STORAGE_KEYS.EVENTS_PROCESSED, processedIds.slice(-200));
  } catch (e) {
    console.error('Error draining Layer 10 event queue:', e);
  }
}

/**
 * 2. Select the appropriate template for an event
 */
export function selectNotificationTemplate(event) {
  const rule = COMMUNICATION_AUTOMATION_RULES.find((r) => r.event === event.type);
  if (rule?.templateId) {
    return getTemplateByEvent(event.type);
  }
  return getTemplateByEvent(event.type) || null;
}

/**
 * 3. Generate notification content using template and event metadata
 */
export function generateNotificationContent(event, template = null) {
  const tpl = template || selectNotificationTemplate(event);
  if (tpl) {
    const rendered = renderTemplate(tpl, {
      studentName: event.studentName || event.candidateName || 'Candidate',
      companyName: event.companyName || 'Corporate Partner',
      roundName: event.roundName || 'Interview Round',
      date: event.date || 'TBD',
      time: event.time || event.startTime || 'TBD',
      room: event.roomName || event.room || 'TBD',
      reason: event.reason || 'Schedule adjustment',
      status: event.status || 'Updated'
    });
    return {
      title: rendered.subject,
      message: event.message || rendered.body
    };
  }

  return {
    title: event.type ? event.type.replace(/_/g, ' ') : 'Placement Notification',
    message: event.message || 'You have an update regarding your placement schedule.'
  };
}

/**
 * 4. Resolve recipient IDs for an event
 */
export function getNotificationRecipients(event) {
  if (event.recipientIds && event.recipientIds.length > 0) {
    return event.recipientIds;
  }
  if (event.candidateId) {
    return [event.candidateId];
  }
  if (event.studentId) {
    return [event.studentId];
  }
  if (event.userId) {
    return [event.userId];
  }
  // Fallback to demo default student Rahul Kumar
  return ['CL-2027-0042'];
}

/**
 * 5. Create and persist a new notification from an event
 */
export function createNotification(event) {
  initializeEngine();

  const recipients = getNotificationRecipients(event);
  const rule = COMMUNICATION_AUTOMATION_RULES.find((r) => r.event === event.type);
  const priority = event.priority || rule?.priority || PRIORITIES.NORMAL;
  const content = generateNotificationContent(event);

  const notifications = getStored(STORAGE_KEYS.NOTIFICATIONS, []);
  const created = [];

  recipients.forEach((userId) => {
    // Find candidate name if available
    const student = STUDENTS?.find((s) => s.id === userId || s.legacyId === userId);
    const candidateName = student?.name || event.candidateName || 'Rahul Kumar';

    const notifItem = {
      id: `NOTIF-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      userName: candidateName,
      type: event.type || NOTIFICATION_TYPES.SYSTEM_ALERT,
      title: content.title,
      message: content.message,
      priority,
      relatedEntity: event.relatedEntity || {
        type: event.type ? event.type.toLowerCase() : 'placement',
        id: event.scheduleId || event.jobId || null
      },
      read: false,
      channel: event.channel || CHANNELS.IN_APP,
      createdAt: new Date().toISOString()
    };

    notifications.unshift(notifItem);
    created.push(notifItem);
  });

  setStored(STORAGE_KEYS.NOTIFICATIONS, notifications.slice(0, 300));

  // Also log to Communication Events history
  createCommunicationEvent({
    ...event,
    priority,
    recipientCount: recipients.length
  });

  return created[0];
}

/**
 * Internal helper for draining Layer 10 queue
 */
function createNotificationFromEvent(ev) {
  return createNotification({
    type: ev.type,
    candidateId: ev.candidateId || 'CL-2027-0042',
    candidateName: ev.candidateName || 'Rahul Kumar',
    jobId: ev.jobId,
    scheduleId: ev.scheduleId,
    message: ev.message,
    priority: ev.type === NOTIFICATION_TYPES.INTERVIEW_RESCHEDULED ? PRIORITIES.URGENT : PRIORITIES.IMPORTANT,
    createdAt: ev.createdAt || new Date().toISOString()
  });
}

/**
 * 6. Record a communication event in the master event audit
 */
export function createCommunicationEvent(event) {
  const allEvents = getStored(STORAGE_KEYS.COMMUNICATION_EVENTS, []);
  const comEvent = {
    id: `COM-EVENT-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    type: event.type || NOTIFICATION_TYPES.SYSTEM_ALERT,
    source: event.source || 'PlacementEngine',
    jobId: event.jobId || 'JOB-2027-TNS',
    candidateId: event.candidateId || event.userId || 'CL-2027-0042',
    recipientIds: getNotificationRecipients(event),
    priority: event.priority || PRIORITIES.NORMAL,
    channels: event.channels || [CHANNELS.IN_APP],
    status: 'Delivered',
    createdAt: new Date().toISOString(),
    messageSnippet: (event.message || '').substring(0, 80)
  };
  allEvents.unshift(comEvent);
  setStored(STORAGE_KEYS.COMMUNICATION_EVENTS, allEvents.slice(0, 200));
  return comEvent;
}

/**
 * 7. Mark a single notification as read
 */
export function markAsRead(notificationId) {
  initializeEngine();
  const list = getStored(STORAGE_KEYS.NOTIFICATIONS, []);
  const item = list.find((n) => n.id === notificationId);
  if (item) {
    item.read = true;
    item.readAt = new Date().toISOString();
    setStored(STORAGE_KEYS.NOTIFICATIONS, list);
  }
  return item;
}

/**
 * 8. Mark all notifications as read for a user
 */
export function markAllAsRead(userId = null) {
  initializeEngine();
  const list = getStored(STORAGE_KEYS.NOTIFICATIONS, []);
  list.forEach((n) => {
    if (!userId || n.userId === userId || userId === 'all') {
      n.read = true;
      n.readAt = n.readAt || new Date().toISOString();
    }
  });
  setStored(STORAGE_KEYS.NOTIFICATIONS, list);
  return list;
}

/**
 * 9. Get unread notification count for a user
 */
export function getUnreadCount(userId = null) {
  initializeEngine();
  const list = getStored(STORAGE_KEYS.NOTIFICATIONS, []);
  if (!userId || userId === 'all') {
    return list.filter((n) => !n.read).length;
  }
  return list.filter((n) => (n.userId === userId || n.userId === 'CL-2027-0042') && !n.read).length;
}

/**
 * 10. Get full notification history for a user
 */
export function getNotificationHistory(userId = null) {
  initializeEngine();
  drainLayer10Queue();
  const list = getStored(STORAGE_KEYS.NOTIFICATIONS, []);

  if (!userId || userId === 'all' || userId === 'officer') {
    return list;
  }

  // Support both new ID and legacy ID for Rahul Kumar
  return list.filter(
    (n) => n.userId === userId || n.userId === 'CL-2027-0042' || (userId === 'student' && n.userId === 'CL-2027-0042')
  );
}

/**
 * 11. Schedule simulated reminder (24h, 1h, 15m)
 */
export function scheduleNotification(notification, delayMinutes = 0) {
  // In demo prototype, push with simulated delay metadata
  return createNotification({
    ...notification,
    scheduledFor: new Date(Date.now() + delayMinutes * 60 * 1000).toISOString()
  });
}

export default {
  createNotification,
  getNotificationRecipients,
  generateNotificationContent,
  selectNotificationTemplate,
  scheduleNotification,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  getNotificationHistory,
  createCommunicationEvent,
  drainLayer10Queue
};
