import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  Calendar,
  FileText,
  Briefcase,
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import {
  getNotificationHistory,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  drainLayer10Queue
} from '../../services/notificationEngine';
import { NOTIFICATION_TYPES, PRIORITIES } from '../../data/communicationRules';

export default function NotificationBell({ role = 'student', userId = 'CL-2027-0042' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const loadNotifications = () => {
    drainLayer10Queue();
    const list = getNotificationHistory(userId);
    setNotifications(list.slice(0, 8));
    setUnreadCount(getUnreadCount(userId));
  };

  useEffect(() => {
    loadNotifications();

    // Listen to storage events or periodic refresh for real-time schedule updates
    const interval = setInterval(loadNotifications, 4000);
    return () => clearInterval(interval);
  }, [userId]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id);
    loadNotifications();

    if (notif.relatedEntity?.type === 'schedule') {
      if (role === 'student') navigate('/student/schedule');
      else if (role === 'recruiter') navigate('/recruiter/interviews');
      else navigate('/officer/scheduling');
    } else if (notif.relatedEntity?.type === 'announcement') {
      if (role === 'officer') navigate('/officer/communications');
      else navigate('/student/notifications');
    } else {
      if (role === 'student') navigate('/student/notifications');
      else if (role === 'recruiter') navigate('/recruiter/notifications');
      else navigate('/officer/communications');
    }
    setIsOpen(false);
  };

  const handleMarkAll = (e) => {
    e.stopPropagation();
    markAllAsRead(userId);
    loadNotifications();
  };

  const getIcon = (type, priority) => {
    if (priority === PRIORITIES.URGENT || type === NOTIFICATION_TYPES.INTERVIEW_RESCHEDULED) {
      return <AlertTriangle size={15} color="#EF4444" />;
    }
    if (type === NOTIFICATION_TYPES.SHORTLISTED) {
      return <Sparkles size={15} color="#8B5CF6" />;
    }
    if (type === NOTIFICATION_TYPES.INTERVIEW_SCHEDULED || type === NOTIFICATION_TYPES.INTERVIEW_REMINDER) {
      return <Calendar size={15} color="#2563EB" />;
    }
    if (type === NOTIFICATION_TYPES.OFFER_AVAILABLE) {
      return <Briefcase size={15} color="#10B981" />;
    }
    return <Bell size={15} color="#64748B" />;
  };

  const getTargetNotificationsPage = () => {
    if (role === 'student') return '/student/notifications';
    if (role === 'recruiter') return '/recruiter/notifications';
    return '/officer/communications';
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          backgroundColor: isOpen ? '#EFF6FF' : '#FFFFFF',
          color: unreadCount > 0 ? '#2563EB' : '#64748B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 2px rgba(16, 27, 54, 0.04)'
        }}
        title="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              minWidth: '18px',
              height: '18px',
              padding: '0 4px',
              borderRadius: '999px',
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              fontSize: '10.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #FFFFFF',
              boxShadow: '0 2px 4px rgba(239, 68, 68, 0.4)'
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '380px',
            maxWidth: '90vw',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 20px 40px -8px rgba(16, 27, 54, 0.16)',
            zIndex: 1000,
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
                Notifications
              </span>
              {unreadCount > 0 && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '999px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    border: '1px solid #BFDBFE'
                  }}
                >
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAll}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#2563EB',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Check size={13} />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '36px 20px', textAlign: 'center', color: '#64748B' }}>
                <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#101B36' }}>
                  You're all caught up!
                </div>
                <div style={{ fontSize: '11.5px', color: '#94A3B8' }}>
                  No new placement notifications at this time.
                </div>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: n.read ? '#FFFFFF' : '#F0F7FF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = n.read ? '#FFFFFF' : '#F0F7FF')
                  }
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: n.priority === PRIORITIES.URGENT ? '#FEE2E2' : '#EFF6FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    {getIcon(n.type, n.priority)}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                      <div
                        style={{
                          fontSize: '12.5px',
                          fontWeight: n.read ? 600 : 800,
                          color: '#101B36',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {n.title}
                      </div>
                      {!n.read && (
                        <span
                          style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            backgroundColor: '#2563EB',
                            flexShrink: 0
                          }}
                        />
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: '11.5px',
                        color: '#475569',
                        lineHeight: 1.4,
                        margin: '2px 0 4px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {n.message}
                    </div>

                    <div style={{ fontSize: '10.5px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={11} />
                      <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {n.priority === PRIORITIES.URGENT && (
                        <span style={{ color: '#EF4444', fontWeight: 800, marginLeft: '4px' }}>• URGENT</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer View All */}
          <div
            style={{
              padding: '10px 16px',
              backgroundColor: '#F8FAFC',
              borderTop: '1px solid #E2E8F0',
              textAlign: 'center'
            }}
          >
            <button
              onClick={() => {
                setIsOpen(false);
                navigate(getTargetNotificationsPage());
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                color: '#2563EB',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>View All Notifications</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
