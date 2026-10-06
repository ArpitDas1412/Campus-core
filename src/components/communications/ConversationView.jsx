import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  User,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

export default function ConversationView({
  conversation,
  onSendMessage,
  currentUserRole = 'officer'
}) {
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px solid #E2E8F0',
          height: '620px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748B',
          textAlign: 'center',
          padding: '24px'
        }}
      >
        <div>
          <Info size={36} color="#CBD5E1" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#101B36' }}>
            Select a conversation
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
            Choose a thread from the inbox to review communication history or reply.
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedFile) return;

    let fullBody = inputText.trim();
    if (attachedFile) {
      fullBody += ` [Attached: ${attachedFile.name}]`;
    }

    onSendMessage({
      conversationId: conversation.id,
      body: fullBody,
      recipientId: conversation.participantId,
      subject: conversation.subject,
      isOfficer: currentUserRole === 'officer'
    });

    setInputText('');
    setAttachedFile(null);
  };

  const handleFileAttach = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
    }
  };

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
      {/* Thread Header */}
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: conversation.participantColor || '#3978F6',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {conversation.participantAvatar || 'ST'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#101B36' }}>
                {conversation.participantName}
              </span>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE'
                }}
              >
                {conversation.participantRole}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '1px' }}>
              {conversation.subject}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              color: '#059669',
              backgroundColor: '#ECFDF5',
              padding: '3px 8px',
              borderRadius: '6px',
              fontWeight: 700,
              border: '1px solid #A7F3D0',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <CheckCircle2 size={12} />
            <span>Synchronized</span>
          </span>
        </div>
      </div>

      {/* Messages Stream */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          backgroundColor: '#FAFBFD',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ textAlign: 'center', margin: '8px 0' }}>
          <span
            style={{
              fontSize: '11px',
              color: '#94A3B8',
              backgroundColor: '#F1F5F9',
              padding: '3px 10px',
              borderRadius: '999px'
            }}
          >
            Placement Communication Thread Initialized
          </span>
        </div>

        {conversation.messages?.map((msg) => {
          const isMine =
            currentUserRole === 'officer'
              ? msg.isOfficer
              : !msg.isOfficer;

          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMine ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                alignSelf: isMine ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#64748B',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{msg.senderName}</span>
                <span style={{ fontSize: '10px', color: '#CBD5E1' }}>•</span>
                <span style={{ fontSize: '10px', color: '#94A3B8' }}>{msg.time}</span>
              </div>

              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  backgroundColor: isMine ? '#2563EB' : '#FFFFFF',
                  color: isMine ? '#FFFFFF' : '#101B36',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  border: isMine ? 'none' : '1px solid #E2E8F0',
                  boxShadow: '0 2px 4px rgba(16, 27, 54, 0.04)',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {msg.body}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment Preview Chip */}
      {attachedFile && (
        <div
          style={{
            padding: '6px 16px',
            backgroundColor: '#EFF6FF',
            borderTop: '1px solid #BFDBFE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#2563EB'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Paperclip size={13} />
            <span>Attachment: {attachedFile.name} ({(attachedFile.size / 1024).toFixed(1)} KB)</span>
          </div>
          <button
            onClick={() => setAttachedFile(null)}
            style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontSize: '12px' }}
          >
            ✕ Remove
          </button>
        </div>
      )}

      {/* Message Composer Footer */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <label
          style={{
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#F8FAFC',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Attach Document or Verification Badge"
        >
          <Paperclip size={16} />
          <input
            type="file"
            onChange={handleFileAttach}
            style={{ display: 'none' }}
          />
        </label>

        <input
          type="text"
          placeholder="Type your message to candidate or placement panel..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid #CBD5E1',
            fontSize: '13px',
            outline: 'none'
          }}
        />

        <button
          type="submit"
          disabled={!inputText.trim() && !attachedFile}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            backgroundColor: inputText.trim() || attachedFile ? '#2563EB' : '#94A3B8',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: inputText.trim() || attachedFile ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: inputText.trim() || attachedFile ? '0 4px 10px rgba(37, 99, 235, 0.3)' : 'none'
          }}
        >
          <span>Send</span>
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
