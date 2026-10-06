import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  Calendar,
  AlertCircle,
  Briefcase,
  ChevronRight,
  Check
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function RecruiterNotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(recruiterService.getNotifications());
  const [toastMessage, setToastMessage] = useState(null);

  const handleMarkAsRead = (id) => {
    recruiterService.markNotificationRead(id);
    setNotifications(recruiterService.getNotifications());
  };

  const handleMarkAllRead = () => {
    recruiterService.markAllNotificationsRead();
    setNotifications(recruiterService.getNotifications());
    setToastMessage('All notifications marked as read');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application':
        return <Users size={18} color="#3978F6" />;
      case 'eligibility':
        return <CheckCircle2 size={18} color="#10B981" />;
      case 'ai_matching':
        return <Sparkles size={18} color="#8B5CF6" />;
      case 'stage_move':
        return <Users size={18} color="#F59E0B" />;
      case 'interview':
        return <Calendar size={18} color="#0E8EA8" />;
      case 'deadline':
        return <AlertCircle size={18} color="#EF4444" />;
      default:
        return <Bell size={18} color="#64748B" />;
    }
  };

  return (
    <RecruiterLayout>
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
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: 600,
            zIndex: 99
          }}
        >
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: '#101B36',
                margin: 0,
                letterSpacing: '-0.02em'
              }}
            >
              Notifications & Activity Feed
            </h1>
            {unreadCount > 0 && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '999px',
                  backgroundColor: '#FEE2E2',
                  color: '#EF4444'
                }}
              >
                {unreadCount} unread
              </span>
            )}
          </div>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Drive applications, candidate status progression, and interview scheduling alerts.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Check size={15} />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid #F1F5F9',
                backgroundColor: n.read ? '#FFFFFF' : '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = n.read ? '#FFFFFF' : '#F8FAFC')
              }
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    flexShrink: 0
                  }}
                >
                  {getNotificationIcon(n.type)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3
                      onClick={() => n.link && navigate(n.link)}
                      style={{
                        fontSize: '14.5px',
                        fontWeight: 700,
                        color: '#101B36',
                        margin: 0,
                        cursor: n.link ? 'pointer' : 'default'
                      }}
                      onMouseEnter={(e) => {
                        if (n.link) e.currentTarget.style.color = '#3978F6';
                      }}
                      onMouseLeave={(e) => {
                        if (n.link) e.currentTarget.style.color = '#101B36';
                      }}
                    >
                      {n.title}
                    </h3>
                    {!n.read && (
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#3978F6'
                        }}
                      />
                    )}
                  </div>

                  <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 6px' }}>
                    {n.message}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11.5px',
                      color: '#94A3B8'
                    }}
                  >
                    <Clock size={12} />
                    <span>{n.time}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {n.link && (
                  <button
                    onClick={() => navigate(n.link)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '6px',
                      border: '1px solid #BFDBFE',
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>View</span>
                    <ChevronRight size={13} />
                  </button>
                )}

                {!n.read && (
                  <button
                    onClick={() => handleMarkAsRead(n.id)}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: '#475569',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Dismiss
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RecruiterLayout>
  );
}
