import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  UserCheck,
  Calendar,
  Award,
  BarChart3,
  Sparkles,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  X,
  ExternalLink,
  Target,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RecruiterSidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed
}) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navGroups = [
    {
      group: 'RECRUITMENT',
      items: [
        {
          to: '/recruiter/dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard
        },
        {
          to: '/recruiter/company',
          label: 'Company Profile',
          icon: Building2
        },
        {
          to: '/recruiter/jobs',
          label: 'Jobs & Drives',
          icon: Briefcase,
          badge: '4 Active',
          badgeColor: '#2563EB',
          badgeBg: '#EFF6FF'
        },
        {
          to: '/recruiter/candidates',
          label: 'Candidates',
          icon: Users,
          badge: '312',
          badgeColor: '#0E8EA8',
          badgeBg: '#E0F7FA'
        },
        {
          to: '/recruiter/shortlists',
          label: 'Shortlists',
          icon: UserCheck,
          badge: '86',
          badgeColor: '#16A34A',
          badgeBg: '#ECFDF5'
        },
        {
          to: '/recruiter/interviews',
          label: 'Interviews & Schedule',
          icon: Calendar,
          badge: 'Layer 10',
          badgeColor: '#2563EB',
          badgeBg: '#EFF6FF'
        },
        {
          to: '/recruiter/offers',
          label: 'Offers',
          icon: Award,
          badge: 'Layer 12',
          badgeColor: '#7C3AED',
          badgeBg: '#F5F3FF'
        }
      ]
    },
    {
      group: 'ANALYTICS & AI',
      items: [
        {
          to: '/recruiter/jobs/JOB-2027-001/matching',
          label: 'AI Candidate Matching',
          icon: Sparkles,
          badge: 'Layer 7',
          badgeColor: '#7C3AED',
          badgeBg: '#F5F3FF'
        },
        {
          to: '/recruiter/jobs/JOB-2027-001/shortlisting',
          label: 'Smart Shortlisting',
          icon: Target,
          badge: 'Layer 9',
          badgeColor: '#059669',
          badgeBg: '#ECFDF5'
        },
        {
          to: '/recruiter/jobs/JOB-2027-001/scheduling',
          label: 'Drive Scheduling',
          icon: Clock,
          badge: 'Layer 10',
          badgeColor: '#2563EB',
          badgeBg: '#EFF6FF'
        },
        {
          to: '/recruiter/analytics',
          label: 'Recruitment Analytics',
          icon: BarChart3
        },
        {
          to: '/recruiter/talent-insights',
          label: 'Talent Insights',
          icon: Sparkles,
          badge: '✦ AI',
          badgeColor: '#2563EB',
          badgeBg: '#EFF6FF'
        }
      ]
    },
    {
      group: 'COMMUNICATION',
      items: [
        {
          to: '/recruiter/messages',
          label: 'Messages',
          icon: MessageSquare,
          badge: '3',
          badgeColor: '#D97706',
          badgeBg: '#FEF3C7'
        },
        {
          to: '/recruiter/notifications',
          label: 'Notifications',
          icon: Bell,
          badge: '6',
          badgeColor: '#EF4444',
          badgeBg: '#FEE2E2'
        },
        {
          to: '/recruiter/settings',
          label: 'Settings',
          icon: Settings
        }
      ]
    }
  ];

  const sidebarContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#101B36',
        color: '#F8FAFC',
        borderRight: '1px solid #1E293B',
        width: collapsed ? '80px' : '270px',
        transition: 'width 0.25s ease',
        overflowX: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: collapsed ? '20px 14px' : '20px 20px',
          borderBottom: '1px solid #1E293B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(57, 120, 246, 0.4)',
              flexShrink: 0
            }}
          >
            <GraduationCap size={22} />
          </div>
          {!collapsed && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  lineHeight: 1.1
                }}
              >
                CAMPUS<span style={{ color: '#36C5E8' }}>CORE</span>
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '2px'
                }}
              >
                Recruiter Portal
              </span>
            </div>
          )}
        </div>

        {/* Mobile close or desktop collapse */}
        {mobileOpen ? (
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        ) : (
          !mobileOpen && setCollapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )
        )}
      </div>

      {/* Company badge pill */}
      {!collapsed && (
        <div
          style={{
            margin: '14px 16px 8px',
            padding: '10px 14px',
            borderRadius: '10px',
            backgroundColor: 'rgba(57, 120, 246, 0.1)',
            border: '1px solid rgba(57, 120, 246, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            TN
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              TechNova Solutions
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              Active Partner
            </div>
          </div>
        </div>
      )}

      {/* Nav List */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: collapsed ? '12px 8px' : '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        {navGroups.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <div
                style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#64748B',
                  padding: '4px 10px 8px',
                  textTransform: 'uppercase'
                }}
              >
                {group.group}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.to ||
                  (item.to !== '/recruiter/dashboard' && location.pathname.startsWith(item.to));

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      if (setMobileOpen) setMobileOpen(false);
                    }}
                    title={collapsed ? item.label : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: collapsed ? '12px 0' : '10px 14px',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: isActive ? '#FFFFFF' : '#94A3B8',
                      backgroundColor: isActive ? '#3978F6' : 'transparent',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '13.5px',
                      transition: 'all 0.15s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                        e.currentTarget.style.color = '#FFFFFF';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#94A3B8';
                      }
                    }}
                  >
                    <Icon size={19} style={{ flexShrink: 0, color: isActive ? '#FFFFFF' : '#94A3B8' }} />
                    {!collapsed && (
                      <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.label}
                      </span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: '999px',
                          backgroundColor: item.badgeBg || 'rgba(255, 255, 255, 0.12)',
                          color: item.badgeColor || '#FFFFFF'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recruiter Identity & Logout */}
      <div
        style={{
          padding: collapsed ? '16px 8px' : '16px 14px',
          borderTop: '1px solid #1E293B',
          backgroundColor: '#0B1327'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              AM
            </div>
            {!collapsed && (
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  Ananya Mehta
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#94A3B8',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  Talent Acquisition
                </div>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={handleLogout}
              title="Sign Out"
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#EF4444';
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94A3B8';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <LogOut size={17} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <aside
        className="recruiter-sidebar-desktop"
        style={{
          display: 'block',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          flexShrink: 0
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex'
          }}
        >
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(3px)'
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 51,
              width: '280px',
              maxWidth: '85vw',
              height: '100%'
            }}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
