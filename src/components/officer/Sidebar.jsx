import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  Sparkles,
  Clock,
  Award,
  BarChart3,
  AlertTriangle,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  ShieldAlert,
  FileText,
  X,
  Target,
  MessageSquare,
  Megaphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  onNavigateModule,
  activeModule: propActiveModule
}) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const activeModule =
    propActiveModule ||
    (location.pathname.includes('analytics') || location.pathname.includes('intelligence')
      ? 'analytics'
      : location.pathname.includes('offers') || location.pathname.includes('documents') || location.pathname.includes('joining')
      ? 'offers'
      : location.pathname.includes('communications')
      ? 'communications'
      : location.pathname.includes('scheduling')
      ? 'scheduling'
      : location.pathname.includes('ai-shortlisting')
      ? 'smart-shortlisting'
      : location.pathname.includes('ai-matching')
      ? 'ai-matching'
      : location.pathname.includes('resume')
      ? 'resume-intelligence'
      : location.pathname.includes('skill-gap')
      ? 'skill-gap'
      : location.pathname.startsWith('/officer/students')
      ? 'students'
      : location.pathname.startsWith('/officer/dashboard')
      ? 'dashboard'
      : 'dashboard');

  const handleNavClick = (moduleKey, label, isComingSoon = false, layerNumber = 3, route = null) => {
    if (setMobileOpen) setMobileOpen(false);
    if (!isComingSoon && route) {
      navigate(route);
      return;
    }
    if (onNavigateModule) {
      onNavigateModule(moduleKey, label, isComingSoon, layerNumber);
    }
  };

  const navSections = [
    {
      heading: 'MAIN',
      items: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          isComingSoon: false,
          route: '/officer/dashboard'
        },
        {
          key: 'students',
          label: 'Students',
          icon: Users,
          isComingSoon: false,
          layerNumber: 3,
          badge: '1,248',
          route: '/officer/students'
        },
        {
          key: 'resume-intelligence',
          label: 'Resume Intelligence',
          icon: FileText,
          isComingSoon: false,
          layerNumber: 5,
          badge: '✦ AI',
          route: '/officer/resume-intelligence'
        },
        {
          key: 'skill-gap',
          label: 'AI Skill-Gap',
          icon: Sparkles,
          isComingSoon: false,
          layerNumber: 4,
          badge: '✦ AI',
          route: '/skill-gap'
        },
        {
          key: 'recruiters',
          label: 'Recruiter Portal',
          icon: Building2,
          isComingSoon: false,
          layerNumber: 6,
          badge: 'Live (L6)',
          route: '/recruiter/dashboard'
        },
        {
          key: 'drives',
          label: 'Job Drives',
          icon: Calendar,
          isComingSoon: true,
          layerNumber: 7,
          badge: '12 Live'
        },
        {
          key: 'ai-matching',
          label: 'AI Talent Matching',
          icon: Sparkles,
          isComingSoon: false,
          layerNumber: 7,
          badge: 'Live (L7)',
          route: '/officer/ai-matching'
        },
        {
          key: 'smart-shortlisting',
          label: 'Smart Shortlisting',
          icon: Target,
          isComingSoon: false,
          layerNumber: 9,
          badge: 'Live (L9)',
          route: '/officer/ai-shortlisting'
        },
        {
          key: 'scheduling',
          label: 'Scheduling',
          icon: Clock,
          isComingSoon: false,
          layerNumber: 10,
          badge: 'Live (L10)',
          route: '/officer/scheduling'
        },
        {
          key: 'offers',
          label: 'Offers & Documents',
          icon: Award,
          isComingSoon: false,
          layerNumber: 12,
          badge: 'Live (L12)',
          route: '/officer/offers'
        }
      ]
    },
    {
      heading: 'INSIGHTS',
      items: [
        {
          key: 'analytics',
          label: 'Campus Intelligence',
          icon: BarChart3,
          isComingSoon: false,
          layerNumber: 13,
          badge: 'Live (L13)',
          route: '/officer/analytics'
        },
        {
          key: 'at-risk',
          label: 'At-Risk Students',
          icon: AlertTriangle,
          isComingSoon: true,
          layerNumber: 13,
          badge: '74',
          badgeVariant: 'alert'
        }
      ]
    },
    {
      heading: 'SYSTEM',
      items: [
        {
          key: 'communications',
          label: 'Communications',
          icon: MessageSquare,
          isComingSoon: false,
          layerNumber: 11,
          badge: 'Live (L11)',
          route: '/officer/communications'
        },
        {
          key: 'notifications',
          label: 'Notifications',
          icon: Bell,
          isComingSoon: false,
          layerNumber: 11,
          badge: '4 New',
          route: '/officer/communications'
        },
        {
          key: 'settings',
          label: 'Settings',
          icon: Settings,
          isComingSoon: true,
          layerNumber: 15
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16, 27, 54, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1040
          }}
          className="desktop-hidden"
        />
      )}

      {/* Persistent Left Sidebar */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#101B36',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 1050,
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '4px 0 24px rgba(10, 17, 35, 0.12)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className={`campus-sidebar ${mobileOpen ? 'open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '22px 20px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <Link
            to="/officer/dashboard"
            onClick={() => handleNavClick('dashboard', 'Dashboard', false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3978F6 0%, #36C5E8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(57, 120, 246, 0.35)'
              }}
            >
              <GraduationCap size={20} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}
              >
                Campus<span style={{ color: '#36C5E8' }}>Core</span>
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}
              >
                Command Center
              </span>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            style={{
              color: '#94A3B8',
              backgroundColor: 'transparent',
              padding: '4px',
              borderRadius: '6px'
            }}
            className="desktop-hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Sections */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {navSections.map((section) => (
            <div key={section.heading}>
              <div
                style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: '#64748B',
                  letterSpacing: '0.08em',
                  padding: '4px 10px 8px',
                  textTransform: 'uppercase'
                }}
              >
                {section.heading}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.key;

                  return (
                    <button
                      key={item.key}
                      onClick={() =>
                        handleNavClick(item.key, item.label, item.isComingSoon, item.layerNumber, item.route)
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '9px 12px',
                        borderRadius: '10px',
                        backgroundColor: isActive
                          ? 'rgba(57, 120, 246, 0.18)'
                          : 'transparent',
                        color: isActive ? '#38BDF8' : '#CBD5E1',
                        border: isActive
                          ? '1px solid rgba(56, 189, 248, 0.3)'
                          : '1px solid transparent',
                        fontSize: '13.5px',
                        fontWeight: isActive ? 700 : 500,
                        transition: 'all 0.15s ease',
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%'
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.color = '#FFFFFF';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#CBD5E1';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon
                          size={17}
                          style={{
                            color: isActive ? '#38BDF8' : '#94A3B8'
                          }}
                        />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 700,
                            padding: '2px 7px',
                            borderRadius: '6px',
                            backgroundColor:
                              item.badgeVariant === 'alert'
                                ? 'rgba(239, 68, 68, 0.2)'
                                : item.badge === '✦ AI'
                                ? 'rgba(139, 92, 246, 0.25)'
                                : 'rgba(255, 255, 255, 0.1)',
                            color:
                              item.badgeVariant === 'alert'
                                ? '#FCA5A5'
                                : item.badge === '✦ AI'
                                ? '#C4B5FD'
                                : '#CBD5E1',
                            border:
                              item.badgeVariant === 'alert'
                                ? '1px solid rgba(239, 68, 68, 0.3)'
                                : item.badge === '✦ AI'
                                ? '1px solid rgba(139, 92, 246, 0.35)'
                                : '1px solid rgba(255, 255, 255, 0.08)'
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Placement Officer Profile & Logout */}
        <div
          style={{
            padding: '16px 14px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(10, 17, 35, 0.6)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0E8EA8 0%, #3978F6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '13px',
                  border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  flexShrink: 0
                }}
              >
                PS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.2
                  }}
                >
                  Dr. Priya Sharma
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#94A3B8',
                    lineHeight: 1.2
                  }}
                >
                  Placement Cell
                </span>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={() => {
              logout();
              window.location.href = '/login?role=officer';
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              color: '#F87171',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.22)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
              e.currentTarget.style.color = '#F87171';
            }}
          >
            <LogOut size={14} />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
