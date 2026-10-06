import React, { useState } from 'react';
import {
  X,
  Send,
  Users,
  Building2,
  Sparkles,
  AlertTriangle,
  Info,
  CheckCircle2,
  Paperclip
} from 'lucide-react';
import { PRIORITIES, CHANNELS, AUDIENCE_SEGMENTS } from '../../data/communicationRules';
import { STUDENTS } from '../../data/students';

export default function MessageComposer({ isOpen, onClose, onSend }) {
  const [recipientType, setRecipientType] = useState('Individual Student');
  const [selectedStudentId, setSelectedStudentId] = useState('CL-2027-0042');
  const [selectedDrive, setSelectedDrive] = useState('TechNova — Software Engineer (125 Students)');
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science & Engineering');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState(PRIORITIES.NORMAL);
  const [selectedChannels, setSelectedChannels] = useState([CHANNELS.IN_APP, CHANNELS.EMAIL]);

  if (!isOpen) return null;

  const toggleChannel = (ch) => {
    if (selectedChannels.includes(ch)) {
      if (selectedChannels.length === 1) return; // Keep at least one
      setSelectedChannels(selectedChannels.filter((c) => c !== ch));
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;

    let targetAudience = '';
    let targetId = selectedStudentId;

    if (recipientType === 'Individual Student') {
      const std = STUDENTS?.find((s) => s.id === selectedStudentId || s.legacyId === selectedStudentId);
      targetAudience = std?.name || 'Rahul Kumar';
    } else if (recipientType === 'Placement Drive') {
      targetAudience = selectedDrive;
    } else {
      targetAudience = selectedDepartment;
    }

    onSend({
      recipientType,
      recipientId: targetId,
      audienceLabel: targetAudience,
      subject,
      body,
      priority,
      channels: selectedChannels
    });

    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(16, 27, 54, 0.25)',
          border: '1.5px solid #E2E8F0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Compose Placement Communication
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
              Dispatch real-time updates directly to student inboxes, corporate recruiters, or drive cohorts.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#64748B'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Recipient Segment */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '8px' }}>
              Recipient Segment
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '10px' }}>
              {['Individual Student', 'Placement Drive', 'Department'].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setRecipientType(type)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: recipientType === type ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                    backgroundColor: recipientType === type ? '#EFF6FF' : '#FFFFFF',
                    color: recipientType === type ? '#2563EB' : '#475569',
                    fontSize: '12px',
                    fontWeight: recipientType === type ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            {recipientType === 'Individual Student' && (
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              >
                {STUDENTS?.slice(0, 10).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.rollNo} • {s.department})
                  </option>
                ))}
              </select>
            )}

            {recipientType === 'Placement Drive' && (
              <select
                value={selectedDrive}
                onChange={(e) => setSelectedDrive(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="TechNova — Software Engineer (125 Students)">
                  TechNova Solutions — Software Engineer (125 Shortlisted)
                </option>
                <option value="Infosys — Systems Engineer (240 Students)">
                  Infosys — Systems Engineer (240 Eligible)
                </option>
                <option value="Deloitte — Business Analyst (80 Students)">
                  Deloitte — Business Analyst (80 Shortlisted)
                </option>
              </select>
            )}

            {recipientType === 'Department' && (
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering (420 Students)</option>
                <option value="Information Technology">Information Technology (180 Students)</option>
                <option value="Electronics & Communication">Electronics & Communication (220 Students)</option>
              </select>
            )}
          </div>

          {/* Subject */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
              Subject Line
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Schedule Update: TechNova Interview Timing"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          {/* Message Body */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
              Message
            </label>
            <textarea
              required
              rows={4}
              placeholder="Type your message clearly with relevant instructions, venue details, or prerequisites..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Priority & Channels Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {/* Priority */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                Priority
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { p: PRIORITIES.NORMAL, color: '#64748B', bg: '#F8FAFC' },
                  { p: PRIORITIES.IMPORTANT, color: '#2563EB', bg: '#EFF6FF' },
                  { p: PRIORITIES.URGENT, color: '#EF4444', bg: '#FEF2F2' }
                ].map(({ p, color, bg }) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    style={{
                      flex: 1,
                      padding: '7px 4px',
                      borderRadius: '8px',
                      border: priority === p ? `1.5px solid ${color}` : '1px solid #E2E8F0',
                      backgroundColor: priority === p ? bg : '#FFFFFF',
                      color: priority === p ? color : '#64748B',
                      fontSize: '11.5px',
                      fontWeight: priority === p ? 800 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                Channels
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {[CHANNELS.IN_APP, CHANNELS.EMAIL, CHANNELS.SMS, CHANNELS.WHATSAPP].map((ch) => {
                  const isChecked = selectedChannels.includes(ch);
                  const isExternal = ch !== CHANNELS.IN_APP;
                  return (
                    <button
                      type="button"
                      key={ch}
                      onClick={() => toggleChannel(ch)}
                      style={{
                        padding: '5px 9px',
                        borderRadius: '6px',
                        border: isChecked ? '1px solid #2563EB' : '1px solid #CBD5E1',
                        backgroundColor: isChecked ? '#EFF6FF' : '#FFFFFF',
                        color: isChecked ? '#2563EB' : '#64748B',
                        fontSize: '11.5px',
                        fontWeight: isChecked ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {isChecked ? '✓ ' : ''}{ch}
                    </button>
                  );
                })}
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '4px' }}>
                *External channels use simulated delivery in demo mode.
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '9px 18px' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: '9px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
            >
              <Send size={14} />
              <span>Dispatch Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
