import React, { useState } from 'react';
import RecruiterSidebar from './RecruiterSidebar';
import RecruiterTopbar from './RecruiterTopbar';

export default function RecruiterLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#F5F7FB',
        fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
      }}
    >
      {/* Recruiter Sidebar */}
      <RecruiterSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflowX: 'hidden'
        }}
      >
        <RecruiterTopbar setMobileOpen={setMobileOpen} />
        <main
          style={{
            flex: 1,
            padding: '28px 32px 48px',
            maxWidth: '1600px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .recruiter-sidebar-desktop {
            display: none !important;
          }
          .recruiter-mobile-btn {
            display: flex !important;
          }
          .recruitment-status-pill {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
