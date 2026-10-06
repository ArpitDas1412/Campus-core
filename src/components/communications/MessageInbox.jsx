import React, { useState } from 'react';
import {
  Search,
  MessageSquare,
  Users,
  Building2,
  Calendar,
  Sparkles,
  Clock,
  Filter,
  CheckCircle2
} from 'lucide-react';

export default function MessageInbox({
  conversations = [],
  selectedId,
  onSelectConversation,
  onOpenCompose
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyUnread, setOnlyUnread] = useState(false);

  const tabs = ['All', 'Students', 'Recruiters', 'Interviewers'];

  const filtered = conversations.filter((c) => {
    if (activeTab !== 'All' && c.category !== activeTab) return false;
    if (onlyUnread && !c.unread) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (c.participantName || '').toLowerCase().includes(q);
      const matchSubject = (c.subject || '').toLowerCase().includes(q);
      const matchMsg = (c.lastMessage || '').toLowerCase().includes(q);
      return matchName || matchSubject || matchMsg;
    }
    return true;
  });

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        height: '620px',
        overflow: 'hidden',
        boxShadow: '0 4px 14px rgba(16, 27, 54, 0.04)'
      }}
    >
      {/* Top Header & Search */}
      <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#101B36' }}>
              Messages & Inquiries
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '999px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE'
              }}
            >
              {conversations.length}
            </span>
          </div>

          <button
            onClick={onOpenCompose}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
            }}
          >
            <MessageSquare size={13} />
            <span>Compose</span>
          </button>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94A3B8'
            }}
          />
          <input
            type="text"
            placeholder="Search student, company, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12.5px',
              outline: 'none',
              backgroundColor: '#FFFFFF'
            }}
          />
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: activeTab === tab ? '1px solid #2563EB' : '1px solid transparent',
                backgroundColor: activeTab === tab ? '#EFF6FF' : 'transparent',
                color: activeTab === tab ? '#2563EB' : '#64748B',
                fontSize: '11.5px',
                fontWeight: activeTab === tab ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}

          <div style={{ marginLeft: 'auto' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748B', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={onlyUnread}
                onChange={(e) => setOnlyUnread(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span>Unread</span>
            </label>
          </div>
        </div>
      </div>

      {/* Conversation Thread List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748B' }}>
            <MessageSquare size={32} color="#CBD5E1" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#101B36' }}>No conversations found</div>
            <div style={{ fontSize: '11.5px', color: '#94A3B8' }}>Try adjusting your search or tab filters</div>
          </div>
        ) : (
          filtered.map((conv) => {
            const isSelected = conv.id === selectedId;
            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv)}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #F1F5F9',
                  backgroundColor: isSelected ? '#EFF6FF' : conv.unread ? '#F0F9FF' : '#FFFFFF',
                  borderLeft: isSelected ? '4px solid #2563EB' : '4px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = conv.unread ? '#F0F9FF' : '#FFFFFF';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: conv.participantColor || '#3978F6',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {conv.participantAvatar || 'PL'}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: conv.unread ? 800 : 700,
                          color: '#101B36',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {conv.participantName}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94A3B8', flexShrink: 0 }}>
                        {conv.lastTime}
                      </span>
                    </div>

                    <div style={{ fontSize: '11px', color: '#64748B', margin: '1px 0 2px' }}>
                      {conv.participantRole}
                    </div>

                    <div
                      style={{
                        fontSize: '12px',
                        color: conv.unread ? '#1E293B' : '#64748B',
                        fontWeight: conv.unread ? 700 : 400,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {conv.lastMessage}
                    </div>
                  </div>

                  {conv.unread && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#2563EB',
                        flexShrink: 0,
                        marginTop: '6px'
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
