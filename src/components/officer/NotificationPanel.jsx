import React, { useEffect, useRef } from 'react';
import {
  Bell,
  CheckCheck,
  Building,
  Calendar,
  Users,
  AlertTriangle,
  X
} from 'lucide-react';

export default function NotificationPanel({
  isOpen,
  onClose,
  notifications = [],
  onMarkAllAsRead
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (category) => {
    switch (category) {
      case 'recruiter':
        return <Building size={16} style={{ color: '#3978F6' }} />;
      case 'drive':
        return <Calendar size={16} style={{ color: '#0E8EA8' }} />;
      case 'shortlist':
        return <Users size={16} style={{ color: '#10B981' }} />;
      case 'risk':
        return <AlertTriangle size={16} style={{ color: '#EF4444' }} />;
      default:
        return <Bell size={16} style={{ color: '#3978F6' }} />;
    }
  };

  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute',
        top: '64px',
        right: '20px',
        width: '360px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 20px 45px -10px rgba(16, 27, 54, 0.2), 0 0 0 1px rgba(226, 232, 240, 0.9)',
        zIndex: 1100,
        overflow: 'hidden'
      }}
      className="animate-scale-in"
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 18px',
          borderBottom: '1px solid #F1F5F9',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} style={{ color: '#3978F6' }} />
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            Notifications
          </h4>
        </div>

        <button
          onClick={onMarkAllAsRead}
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#3978F6',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          <CheckCheck size={14} />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px 18px',
              borderBottom: '1px solid #F8FAFC',
              backgroundColor: n.read ? '#FFFFFF' : '#F8FAFD',
              transition: 'background-color 0.15s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = n.read ? '#FFFFFF' : '#F8FAFD')
            }
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px'
              }}
            >
              {getIcon(n.category)}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#101B36',
                  lineHeight: 1.2
                }}
              >
                {n.title}
              </div>
              <div
                style={{
                  fontSize: '11.5px',
                  color: '#64748B',
                  marginTop: '3px',
                  lineHeight: 1.3
                }}
              >
                {n.subtitle}
              </div>
              <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '4px' }}>
                {n.time}
              </div>
            </div>

            {!n.read && (
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#3978F6',
                  flexShrink: 0,
                  marginTop: '4px'
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '10px 16px',
          textAlign: 'center',
          backgroundColor: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          fontSize: '11.5px',
          color: '#64748B'
        }}
      >
        <span>CampusCore Live Notification Engine</span>
      </div>
    </div>
  );
}
