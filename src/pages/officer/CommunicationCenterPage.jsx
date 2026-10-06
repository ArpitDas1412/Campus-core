import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/officer/Sidebar';
import Topbar from '../../components/officer/Topbar';
import CommunicationStats from '../../components/communications/CommunicationStats';
import MessageInbox from '../../components/communications/MessageInbox';
import ConversationView from '../../components/communications/ConversationView';
import MessageComposer from '../../components/communications/MessageComposer';
import AnnouncementList from '../../components/communications/AnnouncementList';
import AnnouncementComposer from '../../components/communications/AnnouncementComposer';
import TemplateManager from '../../components/communications/TemplateManager';
import TemplateEditor from '../../components/communications/TemplateEditor';
import CommunicationHistory from '../../components/communications/CommunicationHistory';
import DeliveryAnalytics from '../../components/communications/DeliveryAnalytics';
import {
  Bell,
  Send,
  Plus,
  FileCode2,
  Inbox,
  Megaphone,
  History,
  BarChart2,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { drainLayer10Queue, getNotificationHistory } from '../../services/notificationEngine';
import { getCommunicationHistory, getConversationsForUser } from '../../services/communicationService';

export default function CommunicationCenterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Active view tab: 'inbox' | 'announcements' | 'templates' | 'history' | 'analytics'
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showMessageComposer, setShowMessageComposer] = useState(false);
  const [showAnnouncementComposer, setShowAnnouncementComposer] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [recentNotificationEvent, setRecentNotificationEvent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Check for Layer 10 queue and recent notification events on mount and every 3 seconds
  useEffect(() => {
    const checkEvents = () => {
      const generated = drainLayer10Queue();
      if (generated && generated.length > 0) {
        const latest = generated[0];
        setRecentNotificationEvent(latest);
        showToast(`✦ New notification generated from schedule: "${latest.title}"`);
        setRefreshKey((prev) => prev + 1);
      }
    };

    checkEvents();
    const timer = setInterval(checkEvents, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleMessageSent = (sentResult) => {
    showToast(`✓ Message sent via ${sentResult.channels?.join(', ') || 'In-App'}`);
    setRefreshKey((prev) => prev + 1);
  };

  const handleAnnouncementCreated = (announcement) => {
    showToast(`✓ Announcement "${announcement.title}" published to ${announcement.audience?.recipientCount || 125} students!`);
    setRefreshKey((prev) => prev + 1);
    setActiveTab('announcements');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFD' }}>
      {/* Officer Sidebar with 'communications' highlighted */}
      <Sidebar activeModule="communications" />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Communication Center"
          subtitle="Manage placement announcements, candidate updates, interview notifications and recruiter communication from one workspace."
          badgeText="Layer 11 Live"
        />

        <main style={{ padding: '24px 32px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {/* Toast Notification */}
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

          {/* Header Action Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '24px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#EEF4FF',
                    color: '#3978F6'
                  }}
                >
                  Layer 11 • Communication Hub
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#059669',
                    backgroundColor: '#ECFDF5',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  ● Event Pipeline Synchronized
                </span>
              </div>
              <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#101B36', margin: 0, letterSpacing: '-0.02em' }}>
                Placement Communication Center
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
                Manage placement announcements, candidate updates, interview notifications and recruiter communication from one workspace.
              </p>
            </div>

            {/* Top-Right Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setShowAnnouncementComposer(true)}
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
                  boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)',
                  transition: 'all 0.15s ease'
                }}
              >
                <Plus size={16} />
                <span>+ New Announcement</span>
              </button>

              <button
                onClick={() => setShowMessageComposer(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  backgroundColor: '#FFFFFF',
                  color: '#101B36',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(16, 27, 54, 0.04)'
                }}
              >
                <Send size={15} color="#3978F6" />
                <span>Send Message</span>
              </button>

              <button
                onClick={() => setActiveTab('templates')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <FileCode2 size={15} color="#64748B" />
                <span>Notification Templates</span>
              </button>
            </div>
          </div>

          {/* Real-time Schedule Event Alert Banner */}
          {recentNotificationEvent && (
            <div
              style={{
                marginBottom: '24px',
                padding: '14px 18px',
                backgroundColor: '#EFF6FF',
                border: '1.5px solid #BFDBFE',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
              className="animate-fade-in"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E40AF' }}>
                      ✦ Auto-Generated Notification Event (Layer 10 Schedule Hook)
                    </span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      Delivered
                    </span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#1E3A8A', margin: '2px 0 0' }}>
                    <strong>{recentNotificationEvent.title}:</strong> {recentNotificationEvent.message}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRecentNotificationEvent(null)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: '1px solid #93C5FD',
                  backgroundColor: '#FFFFFF',
                  color: '#1E40AF',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Communication KPI Cards & Channels */}
          <div style={{ marginBottom: '28px' }}>
            <CommunicationStats />
          </div>

          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderBottom: '2px solid #E2E8F0',
              marginBottom: '24px',
              paddingBottom: '2px'
            }}
          >
            {[
              { id: 'inbox', label: 'Message Inbox', icon: Inbox, count: 3 },
              { id: 'announcements', label: 'Announcements', icon: Megaphone, count: 8 },
              { id: 'templates', label: 'Notification Templates', icon: FileCode2, count: 9 },
              { id: 'history', label: 'Delivery History', icon: History },
              { id: 'analytics', label: 'Communication Analytics', icon: BarChart2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== 'inbox') setSelectedConversation(null);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    borderBottom: isActive ? '3px solid #3978F6' : '3px solid transparent',
                    color: isActive ? '#3978F6' : '#64748B',
                    fontSize: '14px',
                    fontWeight: isActive ? 800 : 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    marginBottom: '-2px'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '10px',
                        backgroundColor: isActive ? '#EEF4FF' : '#F1F5F9',
                        color: isActive ? '#3978F6' : '#64748B'
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab 1: Unified Message Inbox & Conversation View */}
          {activeTab === 'inbox' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: selectedConversation ? '420px 1fr' : '1fr',
                gap: '20px',
                alignItems: 'start'
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1.5px solid #E2E8F0',
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                    Unified Placement Inbox
                  </h3>
                  <button
                    onClick={() => setShowMessageComposer(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '5px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#EEF4FF',
                      color: '#3978F6',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={13} />
                    <span>Compose</span>
                  </button>
                </div>

                <MessageInbox
                  role="officer"
                  userId="OFFICER-001"
                  selectedId={selectedConversation?.id}
                  onSelectConversation={(conv) => setSelectedConversation(conv)}
                />
              </div>

              {selectedConversation ? (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '18px',
                    border: '1.5px solid #E2E8F0',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)',
                    height: '680px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <ConversationView
                    conversation={selectedConversation}
                    currentUserId="OFFICER-001"
                    currentUserName="Placement Officer"
                    onClose={() => setSelectedConversation(null)}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: 'none'
                  }}
                />
              )}
            </div>
          )}

          {/* Tab 2: Announcements */}
          {activeTab === 'announcements' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                    Campus Placement Announcements
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: '3px 0 0' }}>
                    Publish official notices to shortlisted cohorts, departments, or the entire student body.
                  </p>
                </div>
                <button
                  onClick={() => setShowAnnouncementComposer(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '9px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={15} />
                  <span>+ Create Announcement</span>
                </button>
              </div>

              <AnnouncementList onNewClick={() => setShowAnnouncementComposer(true)} />
            </div>
          )}

          {/* Tab 3: Notification Templates */}
          {activeTab === 'templates' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                    Notification Templates & Variable Tags
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: '3px 0 0' }}>
                    Customize event-triggered copy for interviews, rescheduling, shortlists, and offer updates.
                  </p>
                </div>
              </div>

              <TemplateManager onEditTemplate={(tpl) => setEditingTemplate(tpl)} />
            </div>
          )}

          {/* Tab 4: Delivery History */}
          {activeTab === 'history' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                  Placement Communication Audit Trail
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '3px 0 0' }}>
                  Complete delivery log of notifications, direct messages, and campus announcements across all channels.
                </p>
              </div>

              <CommunicationHistory />
            </div>
          )}

          {/* Tab 5: Analytics */}
          {activeTab === 'analytics' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                  Communication Performance & Analytics
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '3px 0 0' }}>
                  Analyze delivery reliability, recipient engagement rates, response times, and channel effectiveness.
                </p>
              </div>

              <DeliveryAnalytics />
            </div>
          )}

          {/* Modals & Wizards */}
          {showMessageComposer && (
            <MessageComposer
              isOpen={showMessageComposer}
              onClose={() => setShowMessageComposer(false)}
              onMessageSent={handleMessageSent}
            />
          )}

          {showAnnouncementComposer && (
            <AnnouncementComposer
              isOpen={showAnnouncementComposer}
              onClose={() => setShowAnnouncementComposer(false)}
              onAnnouncementCreated={handleAnnouncementCreated}
            />
          )}

          {editingTemplate && (
            <TemplateEditor
              template={editingTemplate}
              isOpen={!!editingTemplate}
              onClose={() => setEditingTemplate(null)}
              onSave={(updated) => {
                setEditingTemplate(null);
                showToast(`✓ Template "${updated.name}" updated successfully!`);
                setRefreshKey((prev) => prev + 1);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
