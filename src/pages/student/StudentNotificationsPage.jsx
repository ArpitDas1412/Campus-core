import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import {
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
  AlertTriangle,
  FileText,
  Briefcase,
  ChevronRight,
  Check,
  Filter,
  Search,
  Settings2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Inbox
} from 'lucide-react';
import {
  getNotificationHistory,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  drainLayer10Queue
} from '../../services/notificationEngine';
import { PRIORITIES } from '../../data/communicationRules';

export default function StudentNotificationsPage() {
  const navigate = useNavigate();
  const studentId = 'CL-2027-0042'; // Rahul Kumar
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread' | 'important' | 'system'
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // Student reminder preferences state
  const [preferences, setPreferences] = useState({
    interviewReminders: true,
    scheduleChanges: true,
    announcements: true,
    documentRequests: true,
    results: true,
    channelInApp: true,
    channelEmail: false,
    channelSms: false
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = () => {
    drainLayer10Queue();
    const list = getNotificationHistory(studentId);
    setNotifications(list);
    setUnreadCount(getUnreadCount(studentId));
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkRead = (id) => {
    markAsRead(id);
    loadData();
    showToast('Notification marked as read');
  };

  const handleMarkAllRead = () => {
    markAllAsRead(studentId);
    loadData();
    showToast('All notifications marked as read');
  };

  const filteredNotifications = notifications.filter((notif) => {
    // Tab filtering
    if (activeTab === 'unread' && notif.read) return false;
    if (activeTab === 'important' && notif.priority === PRIORITIES.NORMAL) return false;
    if (activeTab === 'system' && !notif.type?.includes('SYSTEM') && !notif.type?.includes('ANNOUNCEMENT'))
      return false;

    // Priority filter
    if (priorityFilter !== 'ALL' && notif.priority !== priorityFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = notif.title?.toLowerCase().includes(q);
      const matchMsg = notif.message?.toLowerCase().includes(q);
      if (!matchTitle && !matchMsg) return false;
    }

    return true;
  });

  const getNotificationIcon = (notif) => {
    if (notif.priority === PRIORITIES.URGENT) {
      return <AlertTriangle size={18} color="#EF4444" />;
    }
    switch (notif.type) {
      case 'INTERVIEW_SCHEDULED':
      case 'INTERVIEW_RESCHEDULED':
        return <Calendar size={18} color="#3978F6" />;
      case 'SHORTLISTED':
        return <CheckCircle2 size={18} color="#10B981" />;
      case 'ROUND_RESULT':
        return <Sparkles size={18} color="#8B5CF6" />;
      case 'DOCUMENT_REQUEST':
        return <FileText size={18} color="#F59E0B" />;
      case 'INTERVIEW_REMINDER':
        return <Clock size={18} color="#0E8EA8" />;
      default:
        return <Bell size={18} color="#3978F6" />;
    }
  };

  return (
    <DashboardLayout roleKey="student">
      {/* Toast */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            right: '32px',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
            fontSize: '13.5px',
            fontWeight: 700,
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          className="animate-fade-in"
        >
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 0 40px' }}>
        {/* Navigation Breadcrumb / Student Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            padding: '12px 18px',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(16, 27, 54, 0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B' }}>Student Portal:</span>
            <Link
              to="/dashboard/student"
              style={{ fontSize: '13px', fontWeight: 600, color: '#3978F6', textDecoration: 'none' }}
            >
              Dashboard
            </Link>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <Link
              to="/student/schedule"
              style={{ fontSize: '13px', fontWeight: 600, color: '#3978F6', textDecoration: 'none' }}
            >
              My Schedule
            </Link>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <Link
              to="/student/messages"
              style={{ fontSize: '13px', fontWeight: 600, color: '#3978F6', textDecoration: 'none' }}
            >
              Messages
            </Link>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
              Notifications ({unreadCount} new)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: showSettings ? '#EEF4FF' : '#F8FAFC',
                color: showSettings ? '#3978F6' : '#64748B',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Settings2 size={14} />
              <span>Reminder Settings</span>
            </button>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#EEF4FF',
                  color: '#3978F6',
                  border: 'none',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Check size={14} />
                <span>Mark All Read</span>
              </button>
            )}
          </div>
        </div>

        {/* Reminder Settings Panel (Collapsible) */}
        {showSettings && (
          <div
            style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1.5px solid #CBD5E1',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(16, 27, 54, 0.05)'
            }}
            className="animate-fade-in"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings2 size={18} color="#3978F6" />
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                  Personal Reminder Preferences
                </h3>
              </div>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                Auto-saves to browser session
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                  Event Subscriptions
                </div>
                {[
                  { key: 'interviewReminders', label: 'Interview reminders (24h, 1h, 15m)' },
                  { key: 'scheduleChanges', label: 'Schedule changes & room reallocations' },
                  { key: 'announcements', label: 'New placement announcements' },
                  { key: 'documentRequests', label: 'Document & resume requests' },
                  { key: 'results', label: 'Round & selection results' }
                ].map((item) => (
                  <label
                    key={item.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#334155',
                      marginBottom: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={preferences[item.key]}
                      onChange={(e) =>
                        setPreferences({ ...preferences, [item.key]: e.target.checked })
                      }
                      style={{ accentColor: '#3978F6' }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                  Delivery Channels
                </div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#334155',
                    marginBottom: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={preferences.channelInApp}
                    onChange={(e) =>
                      setPreferences({ ...preferences, channelInApp: e.target.checked })
                    }
                    style={{ accentColor: '#3978F6' }}
                  />
                  <span>In-App Notifications (Active)</span>
                </label>

                <div
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                    color: '#64748B',
                    marginTop: '8px'
                  }}
                >
                  <strong>External Channels:</strong> Email & SMS delivery are presented with <em>Simulated Delivery</em> status for this hackathon prototype.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Smart Reminders Spotlight Card */}
        <div
          style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #101B36 0%, #1E293B 100%)',
            borderRadius: '18px',
            color: '#FFFFFF',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(16, 27, 54, 0.12)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'rgba(57, 120, 246, 0.25)',
                border: '1px solid rgba(57, 120, 246, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#36C5E8',
                flexShrink: 0
              }}
            >
              <Clock size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    backgroundColor: 'rgba(54, 197, 232, 0.15)',
                    color: '#36C5E8',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}
                >
                  Smart Reminder Sequence Active
                </span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>Next Event</span>
              </div>
              <h2 style={{ fontSize: '17px', fontWeight: 800, margin: '4px 0 2px', color: '#FFFFFF' }}>
                TechNova Solutions — Technical Interview
              </h2>
              <p style={{ fontSize: '13px', color: '#CBD5E1', margin: 0 }}>
                15 Oct 2026 • 10:30 AM • Lab 3 (Offline) / Google Meet
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                fontSize: '12px',
                color: '#E2E8F0',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              Automated reminders: <strong>24h</strong> • <strong>1h</strong> • <strong>15m</strong>
            </div>
            <Link
              to="/student/schedule"
              style={{
                padding: '9px 16px',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>View My Schedule</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '20px'
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#FFFFFF',
              padding: '4px',
              borderRadius: '10px',
              border: '1px solid #E2E8F0'
            }}
          >
            {[
              { id: 'all', label: 'All', count: notifications.length },
              { id: 'unread', label: 'Unread', count: unreadCount },
              {
                id: 'important',
                label: 'Important',
                count: notifications.filter((n) => n.priority !== PRIORITIES.NORMAL).length
              },
              {
                id: 'system',
                label: 'System & Notices',
                count: notifications.filter(
                  (n) => n.type?.includes('SYSTEM') || n.type?.includes('ANNOUNCEMENT')
                ).length
              }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '7px',
                  border: 'none',
                  backgroundColor: activeTab === tab.id ? '#3978F6' : 'transparent',
                  color: activeTab === tab.id ? '#FFFFFF' : '#64748B',
                  fontSize: '13px',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: '8px',
                      backgroundColor:
                        activeTab === tab.id ? 'rgba(255,255,255,0.25)' : '#F1F5F9',
                      color: activeTab === tab.id ? '#FFFFFF' : '#64748B'
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search & Priority Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'flex-end' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '9px',
                maxWidth: '280px',
                width: '100%'
              }}
            >
              <Search size={14} color="#94A3B8" />
              <input
                type="text"
                placeholder="Search updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  width: '100%',
                  color: '#101B36'
                }}
              />
            </div>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{
                padding: '7px 12px',
                borderRadius: '9px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#475569',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Priorities</option>
              <option value="Normal">Normal</option>
              <option value="Important">Important</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredNotifications.length === 0 ? (
            <div
              style={{
                padding: '60px 20px',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0'
              }}
            >
              <Inbox size={44} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#101B36', margin: '0 0 4px' }}>
                You're all caught up.
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                No notifications match your current filter selection.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const isUrgent = notif.priority === PRIORITIES.URGENT;
              const isImportant = notif.priority === PRIORITIES.IMPORTANT;

              return (
                <div
                  key={notif.id}
                  style={{
                    padding: '16px 20px',
                    backgroundColor: notif.read ? '#FFFFFF' : '#F8FAFF',
                    borderRadius: '14px',
                    border: isUrgent
                      ? '1.5px solid #FCA5A5'
                      : notif.read
                      ? '1px solid #E2E8F0'
                      : '1.5px solid #BFDBFE',
                    boxShadow: notif.read
                      ? '0 1px 3px rgba(16, 27, 54, 0.02)'
                      : '0 2px 8px rgba(57, 120, 246, 0.08)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '14px',
                    transition: 'all 0.15s ease'
                  }}
                  className="animate-fade-in"
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: isUrgent
                          ? '#FEF2F2'
                          : notif.read
                          ? '#F1F5F9'
                          : '#EFF6FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {getNotificationIcon(notif)}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          flexWrap: 'wrap',
                          marginBottom: '4px'
                        }}
                      >
                        <h4
                          style={{
                            fontSize: '14.5px',
                            fontWeight: notif.read ? 700 : 800,
                            color: '#101B36',
                            margin: 0
                          }}
                        >
                          {notif.title}
                        </h4>

                        {!notif.read && (
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: '#3978F6'
                            }}
                          />
                        )}

                        {isUrgent && (
                          <span
                            style={{
                              fontSize: '10.5px',
                              fontWeight: 800,
                              backgroundColor: '#FEE2E2',
                              color: '#DC2626',
                              padding: '1px 6px',
                              borderRadius: '4px'
                            }}
                          >
                            URGENT
                          </span>
                        )}

                        {isImportant && (
                          <span
                            style={{
                              fontSize: '10.5px',
                              fontWeight: 700,
                              backgroundColor: '#FEF3C7',
                              color: '#D97706',
                              padding: '1px 6px',
                              borderRadius: '4px'
                            }}
                          >
                            Important
                          </span>
                        )}

                        <span style={{ fontSize: '12px', color: '#94A3B8', marginLeft: 'auto' }}>
                          {notif.createdAt
                            ? new Date(notif.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'Just now'}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: '13.5px',
                          color: '#334155',
                          margin: '0 0 10px',
                          lineHeight: 1.45
                        }}
                      >
                        {notif.message}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {notif.relatedEntity?.type === 'schedule' && (
                          <Link
                            to="/student/schedule"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              backgroundColor: '#EEF4FF',
                              color: '#3978F6',
                              fontSize: '12px',
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                          >
                            <span>View Schedule</span>
                            <ChevronRight size={13} />
                          </Link>
                        )}

                        {!notif.read ? (
                          <button
                            onClick={() => handleMarkRead(notif.id)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '6px',
                              border: '1px solid #E2E8F0',
                              backgroundColor: '#FFFFFF',
                              color: '#64748B',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Mark as Read
                          </button>
                        ) : (
                          <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>Read</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
