import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import MessageInbox from '../../components/communications/MessageInbox';
import ConversationView from '../../components/communications/ConversationView';
import {
  MessageSquare,
  Send,
  User,
  ShieldAlert,
  Sparkles,
  Info,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { getConversationsForUser } from '../../services/communicationService';

export default function StudentMessagesPage() {
  const studentId = 'CL-2027-0042'; // Rahul Kumar
  const [conversations, setConversations] = useState(getConversationsForUser(studentId));
  const [selectedConversation, setSelectedConversation] = useState(conversations[0] || null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <DashboardLayout roleKey="student">
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 0 40px' }}>
        {/* Navigation Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            padding: '12px 18px',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(16, 27, 54, 0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B' }}>Student Portal:</span>
            <Link
              to="/dashboard/student"
              style={{ fontSize: '13px', fontWeight: 600, color: '#3978F6', textDecoration: 'none' }}
            >
              Dashboard
            </Link>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <Link
              to="/student/schedule"
              style={{ fontSize: '13px', fontWeight: 600, color: '#3978F6', textDecoration: 'none' }}
            >
              My Schedule
            </Link>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
              Messages & Questions
            </span>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <Link
              to="/student/notifications"
              style={{ fontSize: '13px', fontWeight: 600, color: '#3978F6', textDecoration: 'none' }}
            >
              Notifications
            </Link>
          </div>

          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              padding: '4px 10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ShieldAlert size={12} />
            <span>Placement Officer & Recruiter Verified Channel</span>
          </div>
        </div>

        {/* Messaging Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            gap: '20px',
            alignItems: 'start'
          }}
        >
          {/* Left: Inbox List */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1.5px solid #E2E8F0',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)'
            }}
          >
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Placement Conversations
              </h2>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                Direct inquiries with your Placement Cell & active drive recruiters.
              </p>
            </div>

            <MessageInbox
              role="student"
              userId={studentId}
              selectedId={selectedConversation?.id}
              onSelectConversation={(conv) => setSelectedConversation(conv)}
            />
          </div>

          {/* Right: Active Conversation */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1.5px solid #E2E8F0',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)',
              height: '660px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {selectedConversation ? (
              <ConversationView
                conversation={selectedConversation}
                currentUserId={studentId}
                currentUserName="Rahul Kumar"
                onClose={() => {}}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#64748B'
                }}
              >
                <MessageSquare size={40} color="#CBD5E1" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#101B36' }}>
                  No conversation selected
                </h3>
                <p style={{ fontSize: '13px' }}>Select a conversation from the left to read messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
