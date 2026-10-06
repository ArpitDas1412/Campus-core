import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/officer/Sidebar';
import Topbar from '../../components/officer/Topbar';
import CommunicationHistory from '../../components/communications/CommunicationHistory';
import { ArrowLeft } from 'lucide-react';

export default function CommunicationHistoryPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFD' }}>
      <Sidebar activeModule="communications" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Communication History"
          subtitle="Audit log of all student, recruiter, and campus-wide notifications and announcements."
          badgeText="Layer 11 Live"
        />

        <main style={{ padding: '24px 32px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <Link
              to="/officer/communications"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#3978F6',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                marginBottom: '6px'
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Communication Center</span>
            </Link>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Communication History & Delivery Log
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '3px 0 0' }}>
              Full chronological record of placement alerts, direct communications, and drive broadcasts.
            </p>
          </div>

          <CommunicationHistory />
        </main>
      </div>
    </div>
  );
}
