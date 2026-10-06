import React from 'react';
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  Command,
  CheckCircle2
} from 'lucide-react';
import NotificationBell from '../communications/NotificationBell';

export default function Topbar({
  onOpenSearch,
  onToggleNotifications,
  unreadCount = 4,
  onOpenMobileMenu,
  title = 'Placement Command Center',
  subtitle = "Here's what's happening across your campus today.",
  badgeText = 'Placement Season Active',
  showBadge = true
}) {
  return (
    <header
      style={{
        height: '76px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
      }}
    >
      {/* Left: Mobile Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onOpenMobileMenu}
          aria-label="Open sidebar menu"
          style={{
            display: 'none',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            color: '#101B36',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
        >
          <Menu size={20} />
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#101B36',
                margin: 0,
                letterSpacing: '-0.02em'
              }}
            >
              {title}
            </h1>

            {/* Status pill */}
            {showBadge && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  backgroundColor: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#065F46',
                  fontSize: '11.5px',
                  fontWeight: 700
                }}
                className="status-pill-desktop"
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.25)',
                    display: 'inline-block'
                  }}
                  className="pulse-dot"
                />
                <span>{badgeText}</span>
              </div>
            )}
          </div>

          {subtitle && (
            <p
              style={{
                fontSize: '13px',
                color: '#64748B',
                margin: '2px 0 0',
                fontWeight: 400
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Search, Notifications, User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Search Bar Button */}
        <button
          onClick={onOpenSearch}
          aria-label="Quick search students, recruiters, drives"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            backgroundColor: '#F8FAFC',
            border: '1.5px solid #E2E8F0',
            borderRadius: '12px',
            color: '#64748B',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            minWidth: '220px',
            justifyContent: 'space-between'
          }}
          className="search-btn-responsive"
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = '#3978F6';
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(57, 120, 246, 0.08)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.backgroundColor = '#F8FAFC';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={16} style={{ color: '#94A3B8' }} />
            <span style={{ color: '#64748B' }}>Search students, drives...</span>
          </div>
          <kbd
            style={{
              fontSize: '10px',
              fontWeight: 700,
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              padding: '2px 6px',
              color: '#64748B',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <Command size={10} /> K
          </kbd>
        </button>

        {/* Notification Bell with Dropdown & Live Events */}
        <NotificationBell role="officer" userId="OFFICER-001" />

        {/* User Avatar + Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '5px 12px 5px 6px',
            borderRadius: '14px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0'
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0E8EA8 0%, #3978F6 100%)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '12.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(14, 142, 168, 0.25)'
            }}
          >
            PS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#101B36',
                lineHeight: 1.2
              }}
            >
              Dr. Priya Sharma
            </span>
            <span
              style={{
                fontSize: '11px',
                color: '#64748B',
                lineHeight: 1.2
              }}
            >
              Placement Officer
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
