import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  PlusCircle,
  ExternalLink,
  ChevronDown,
  Building,
  Sparkles,
  LogOut,
  User,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import recruiterService from '../../services/recruiterService';
import NotificationBell from '../communications/NotificationBell';

export default function RecruiterTopbar({ setMobileOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(recruiterService.getNotifications());
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recruiter/candidates?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const markAllRead = () => {
    recruiterService.markAllNotificationsRead();
    setNotifications(recruiterService.getNotifications());
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        height: '68px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}
    >
      {/* Left: Mobile trigger & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, maxWidth: '540px' }}>
        <button
          onClick={() => setMobileOpen(true)}
          className="recruiter-mobile-btn"
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '6px',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Menu size={22} />
        </button>

        {/* Global Candidate / Job Search */}
        <form onSubmit={handleSearchSubmit} style={{ width: '100%', position: 'relative' }}>
          <Search
            size={17}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94A3B8'
            }}
          />
          <input
            type="text"
            placeholder="Search candidates by name, roll, skills (e.g. Java, React)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 38px',
              borderRadius: '999px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              fontSize: '13px',
              color: '#1E293B',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3978F6';
              e.target.style.backgroundColor = '#FFFFFF';
              e.target.style.boxShadow = '0 0 0 3px rgba(57, 120, 246, 0.12)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E2E8F0';
              e.target.style.backgroundColor = '#F8FAFC';
              e.target.style.boxShadow = 'none';
            }}
          />
        </form>
      </div>

      {/* Right: Actions, Season Pill, Notifications, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Recruitment Season Active status pill */}
        <div
          className="recruitment-status-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            padding: '6px 12px',
            borderRadius: '999px',
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            fontSize: '12px',
            fontWeight: 700
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981'
            }}
          />
          <span>Recruitment Season Active</span>
        </div>

        {/* Create Placement Drive Primary Button */}
        <button
          onClick={() => navigate('/recruiter/jobs/create')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: '#3978F6',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(57, 120, 246, 0.3)',
            transition: 'background-color 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3978F6')}
        >
          <PlusCircle size={16} />
          <span>+ Create Placement Drive</span>
        </button>

        {/* Messages Shortcut */}
        <button
          onClick={() => navigate('/recruiter/messages')}
          title="Candidate Messages"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <MessageSquare size={18} />
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#D97706'
            }}
          />
        </button>

        {/* Layer 11 Global Notification Bell */}
        <NotificationBell role="recruiter" userId="REC-001" />

        {/* Recruiter Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '5px 10px 5px 6px',
              borderRadius: '999px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#101B36',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              AM
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#101B36' }}>
                Ananya Mehta
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>TechNova Solutions</div>
            </div>
            <ChevronDown size={14} color="#64748B" />
          </button>

          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: 0,
                width: '220px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 12px 32px rgba(16, 27, 54, 0.15)',
                border: '1px solid #E2E8F0',
                padding: '8px 0',
                zIndex: 60
              }}
            >
              <div style={{ padding: '8px 16px 10px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                  Ananya Mehta
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  recruiter@campuscore.demo
                </div>
              </div>

              <button
                onClick={() => {
                  navigate('/recruiter/company');
                  setShowProfileMenu(false);
                }}
                style={{
                  width: '100%',
                  padding: '9px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'none',
                  border: 'none',
                  color: '#334155',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Building size={16} color="#64748B" />
                <span>Company Profile</span>
              </button>

              <button
                onClick={() => {
                  navigate('/recruiter/settings');
                  setShowProfileMenu(false);
                }}
                style={{
                  width: '100%',
                  padding: '9px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'none',
                  border: 'none',
                  color: '#334155',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <User size={16} color="#64748B" />
                <span>Account Settings</span>
              </button>

              <div style={{ margin: '6px 0', borderTop: '1px solid #F1F5F9' }} />

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '9px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'none',
                  border: 'none',
                  color: '#EF4444',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
