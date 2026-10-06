import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/officer/Sidebar';
import Topbar from '../../components/officer/Topbar';
import AnnouncementList from '../../components/communications/AnnouncementList';
import AnnouncementComposer from '../../components/communications/AnnouncementComposer';
import { Plus, ArrowLeft, CheckCircle2, Megaphone } from 'lucide-react';

export default function AnnouncementsPage() {
  const [showComposer, setShowComposer] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFD' }}>
      <Sidebar activeModule="communications" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Campus Announcements"
          subtitle="Publish notices to shortlisted cohorts, placement drives, and candidate groups."
          badgeText="Layer 11 Live"
        />

        <main style={{ padding: '24px 32px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {toastMessage && (
            <div
              style={{
                position: 'fixed',
                top: '84px',
                right: '32px',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                padding: '12px 20px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
                fontSize: '13.5px',
                fontWeight: 700,
                zIndex: 1300,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              className="animate-fade-in"
            >
              <CheckCircle2 size={16} />
              <span>{toastMessage}</span>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
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
                Campus Announcements
              </h1>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '3px 0 0' }}>
                Create, preview, schedule, and publish official campus placement notices.
              </p>
            </div>

            <button
              onClick={() => setShowComposer(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)'
              }}
            >
              <Plus size={16} />
              <span>+ New Announcement</span>
            </button>
          </div>

          <AnnouncementList onNewClick={() => setShowComposer(true)} />

          {showComposer && (
            <AnnouncementComposer
              isOpen={showComposer}
              onClose={() => setShowComposer(false)}
              onAnnouncementCreated={(ann) => {
                showToast(`✓ Announcement "${ann.title}" published to ${ann.audience?.recipientCount || 125} students!`);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
