import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  Building,
  ShieldCheck,
  LogOut,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  Bell,
  Home,
  UserCheck,
  Calendar,
  MessageSquare,
  Award,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../communications/NotificationBell';

export default function DashboardLayout({ children, currentTab = 'overview', roleKey }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleMeta = {
    student: {
      name: 'Student Portal',
      icon: GraduationCap,
      color: '#3978F6',
      badgeBg: '#EEF4FE'
    },
    officer: {
      name: 'Placement Officer Hub',
      icon: Briefcase,
      color: '#0E8EA8',
      badgeBg: '#EBF9FD'
    },
    recruiter: {
      name: 'Corporate Recruiter Console',
      icon: Building,
      color: '#8B5CF6',
      badgeBg: '#F5F3FF'
    },
    admin: {
      name: 'Institutional Governance',
      icon: ShieldCheck,
      color: '#101B36',
      badgeBg: '#F1F5F9'
    }
  };

  const meta = roleMeta[roleKey || user?.roleKey || 'student'];
  const RoleIcon = meta.icon;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFD' }}>
      {/* Top Application Bar */}
      <header
        style={{
          height: '70px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxShadow: '0 1px 3px rgba(16, 27, 54, 0.04)'
        }}
      >
        {/* Left: Brand + Role Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #101B36 0%, #3978F6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <GraduationCap size={20} />
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', fontFamily: 'var(--font-heading)' }}>
              Campus<span style={{ color: '#3978F6' }}>Core</span>
            </span>
          </Link>

          <span style={{ color: '#CBD5E1' }}>|</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '8px',
                backgroundColor: meta.badgeBg,
                color: meta.color,
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              <RoleIcon size={14} />
              <span>{meta.name}</span>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: '#EEF2FF',
                color: '#4F46E5',
                border: '1px solid #C7D2FE',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={11} />
              Layers 1–7 Live
            </span>
          </div>
        </div>

        {/* Right: Quick Portal Links, User Profile & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Quick Jump to AI Candidate Matching */}
          <Link
            to="/recruiter/jobs/JOB-2027-001/matching"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#FAF5FF',
              color: '#8B5CF6',
              border: '1px solid #E9D5FF',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <Sparkles size={14} />
            <span>AI Matching (L7)</span>
          </Link>

          {/* Quick Jump to Recruiter Portal */}
          <Link
            to="/recruiter/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#F5F3FF',
              color: '#7C3AED',
              border: '1px solid #DDD6FE',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <Building size={14} />
            <span>Recruiter Portal (L6)</span>
          </Link>

          {/* Quick Jump to Layer 12 Offers & Documents */}
          <Link
            to="/officer/offers"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#ECFDF5',
              color: '#059669',
              border: '1px solid #A7F3D0',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <Award size={14} />
            <span>Offers (L12)</span>
          </Link>

          {/* Quick Jump to Layer 13 Campus Intelligence */}
          <Link
            to="/officer/analytics"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              color: '#1D4ED8',
              border: '1px solid #BFDBFE',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <BarChart3 size={14} />
            <span>Intelligence (L13)</span>
          </Link>

          {/* Quick Jump to Officer Portal */}
          <Link
            to="/officer/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <Briefcase size={14} />
            <span>Officer Console (L2-L5)</span>
          </Link>

          <Link
            to="/"
            className="btn btn-secondary btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#475569'
            }}
          >
            <Home size={14} />
            <span>Home</span>
          </Link>

          {/* Layer 11 Global Notification Bell */}
          <NotificationBell
            role={roleKey || user?.roleKey || 'student'}
            userId={user?.id || 'CL-2027-0042'}
          />

          {/* User Profile Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: meta.color,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '12px'
              }}
            >
              {user?.avatar || 'U'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36', lineHeight: 1.2 }}>
                {user?.name || 'Verified User'}
              </span>
              <span style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.2 }}>
                {user?.orgName || 'Institutional Account'}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Log out and return to landing page"
            className="btn btn-secondary btn-sm"
            style={{
              color: '#EF4444',
              borderColor: '#FCA5A5',
              backgroundColor: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Student Sub-Navigation Bar (Section 6) */}
      {(roleKey || user?.roleKey || 'student') === 'student' && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            boxShadow: '0 1px 2px rgba(16, 27, 54, 0.02)'
          }}
        >
          {[
            { label: 'Dashboard', path: '/dashboard/student' },
            { label: 'My Profile', path: '/student/profile' },
            { label: 'Skill Gap', path: '/skill-gap' },
            { label: 'Resume', path: '/student/resume' },
            { label: 'Schedule', path: '/student/schedule' },
            { label: 'My Offers', path: '/student/offers' },
            { label: 'My Documents', path: '/student/documents' },
            { label: 'My Joining', path: '/student/joining' },
            { label: 'Notifications', path: '/student/notifications' },
            { label: 'Messages', path: '/student/messages' }
          ].map((item) => {
            const isActive = window.location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                style={{
                  padding: '12px 14px',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#3978F6' : '#475569',
                  borderBottom: isActive ? '2px solid #3978F6' : '2px solid transparent',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Main Content View */}
      <main style={{ flex: 1, padding: '32px 24px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          {children}
        </div>
      </main>

      {/* Dashboard Sticky Footer */}
      <footer
        style={{
          padding: '16px 24px',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          fontSize: '12.5px',
          color: '#94A3B8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          CampusCore Placement System • Session Auth: <strong style={{ color: '#101B36' }}>{user?.email}</strong>
        </div>
        <div>
          Layers 1–6 Operational • Recruiter Portal, Resume Intelligence, Skill-Gap, 360° Profiles & Drives Live
        </div>
      </footer>
    </div>
  );
}
