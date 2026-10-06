import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  ShieldCheck,
  FileText
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function MessagesPage() {
  const [conversations, setConversations] = useState(recruiterService.getMessages());
  const [selectedStudentId, setSelectedStudentId] = useState('std-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);

  const activeThread =
    conversations.find((c) => c.studentId === selectedStudentId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !attachedFile) return;

    let textToSend = newMessage.trim();
    if (attachedFile) {
      textToSend += ` [Attachment: ${attachedFile.name}]`;
    }

    recruiterService.sendMessage(activeThread.studentId, textToSend);
    setConversations(recruiterService.getMessages());
    setNewMessage('');
    setAttachedFile(null);
  };

  const filteredConversations = (conversations || []).filter(
    (c) =>
      (c.studentName || c.candidateName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.jobTitle || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <RecruiterLayout>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#101B36',
              margin: 0,
              letterSpacing: '-0.02em'
            }}
          >
            Candidate Communications
          </h1>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE'
            }}
          >
            Layer 11 Messaging Architecture Ready
          </span>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
          Direct two-way recruitment channel between TechNova Talent Acquisition and campus candidates.
        </p>
      </div>

      {/* Split Layout: Conversations Sidebar + Chat Panel */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          minHeight: '620px',
          overflow: 'hidden'
        }}
      >
        {/* Left: Conversations List */}
        <div
          style={{
            borderRight: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F8FAFC'
          }}
        >
          {/* Search Bar */}
          <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
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
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  outline: 'none',
                  backgroundColor: '#F8FAFC'
                }}
              />
            </div>
          </div>

          {/* List items */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredConversations.map((thread) => {
              const isSelected = thread.studentId === activeThread?.studentId;
              const lastMsg = thread.messages[thread.messages.length - 1];

              return (
                <div
                  key={thread.studentId}
                  onClick={() => setSelectedStudentId(thread.studentId)}
                  style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#F1F5F9';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#3978F6' : '#101B36',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {(thread.studentName || thread.candidateName || 'CD').slice(0, 2).toUpperCase()}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: isSelected ? '#1E40AF' : '#101B36',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {thread.studentName || thread.candidateName || 'Candidate'}
                      </div>
                      <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>{lastMsg?.time || ''}</span>
                    </div>

                    <div style={{ fontSize: '11.5px', color: '#64748B', margin: '2px 0 4px' }}>
                      {thread.jobTitle || 'Placement Drive'}
                    </div>

                    <div
                      style={{
                        fontSize: '12px',
                        color: isSelected ? '#1E3A8A' : '#64748B',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {lastMsg?.sender === 'Ananya Mehta' ? 'You: ' : ''}
                      {lastMsg?.text || 'No messages yet'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Area */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Chat Header */}
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {(activeThread?.studentName || activeThread?.candidateName || 'CD').slice(0, 2).toUpperCase()}
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                  {activeThread?.studentName || activeThread?.candidateName || 'Candidate'}
                </h3>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  Candidate for {activeThread?.jobTitle || 'Placement Drive'} • TechNova Campus Drive
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '999px',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46'
                }}
              >
                ● Connected
              </span>
            </div>
          </div>

          {/* Messages Stream */}
          <div
            style={{
              flex: 1,
              padding: '24px',
              overflowY: 'auto',
              backgroundColor: '#FAFCFE',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {activeThread?.messages.map((m) => {
              const isMe = m.sender === 'Ananya Mehta' || m.sender === 'TechNova Recruitment';
              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    alignSelf: isMe ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#94A3B8',
                      marginBottom: '4px',
                      fontWeight: 600
                    }}
                  >
                    {isMe ? 'Ananya Mehta (TechNova)' : (activeThread?.studentName || activeThread?.candidateName || 'Candidate')} • {m.time}
                  </div>

                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      backgroundColor: isMe ? '#3978F6' : '#FFFFFF',
                      color: isMe ? '#FFFFFF' : '#1E293B',
                      fontSize: '13.5px',
                      lineHeight: 1.5,
                      boxShadow: isMe
                        ? '0 2px 8px rgba(57, 120, 246, 0.25)'
                        : '0 1px 3px rgba(0,0,0,0.06)',
                      border: isMe ? 'none' : '1px solid #E2E8F0'
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF'
            }}
          >
            {attachedFile && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  fontSize: '12px',
                  color: '#2563EB',
                  marginBottom: '10px'
                }}
              >
                <FileText size={13} />
                <span>{attachedFile.name}</span>
                <button
                  type="button"
                  onClick={() => setAttachedFile(null)}
                  style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>
            )}

            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
              <label
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Attach Document / Round Details"
              >
                <Paperclip size={18} />
                <input
                  type="file"
                  onChange={(e) => setAttachedFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </label>

              <input
                type="text"
                placeholder={`Reply to ${activeThread?.studentName || activeThread?.candidateName || 'candidate'}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              />

              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <span>Send</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
