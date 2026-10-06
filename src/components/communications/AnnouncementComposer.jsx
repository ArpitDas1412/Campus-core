import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Bell,
  Users,
  Calendar,
  AlertTriangle,
  Smartphone,
  Sparkles,
  Send,
  Eye,
  Info
} from 'lucide-react';
import { PRIORITIES, CHANNELS, ANNOUNCEMENT_TYPES } from '../../data/communicationRules';

export default function AnnouncementComposer({ isOpen, onClose, onPublish }) {
  const [step, setStep] = useState(1); // 1: Audience, 2: Content, 3: Schedule, 4: Preview, 5: Publish/Confirm

  // Form State
  const [audienceType, setAudienceType] = useState('Placement Drive');
  const [targetDrive, setTargetDrive] = useState('TechNova Solutions — Software Engineer');
  const [recipientCount, setRecipientCount] = useState(125);
  const [announcementType, setAnnouncementType] = useState('Interview');
  const [title, setTitle] = useState('TechNova Solutions — Technical Interview Guidelines');
  const [content, setContent] = useState(
    'All shortlisted candidates must report to the placement cell 15 minutes before their scheduled slot. Ensure you carry your College ID and resume hard copies. Turing Lab A has been reserved for live coding demonstrations.'
  );
  const [priority, setPriority] = useState(PRIORITIES.IMPORTANT);
  const [selectedChannels, setSelectedChannels] = useState([CHANNELS.IN_APP, CHANNELS.EMAIL]);
  const [scheduleMode, setScheduleMode] = useState('now'); // 'now' | 'later'
  const [scheduledDate, setScheduledDate] = useState('2026-10-15T09:00');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else setShowConfirmModal(true);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalPublish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onPublish({
        title,
        type: announcementType,
        content,
        audience: {
          type: audienceType,
          target: targetDrive,
          recipientCount
        },
        priority,
        channels: selectedChannels,
        status: scheduleMode === 'now' ? 'Published' : 'Scheduled',
        scheduledAt: scheduleMode === 'later' ? scheduledDate : null
      });
      setIsSubmitting(false);
      setShowConfirmModal(false);
      onClose();
    }, 600);
  };

  const handleDriveChange = (val) => {
    setTargetDrive(val);
    if (val.includes('TechNova')) setRecipientCount(125);
    else if (val.includes('Infosys')) setRecipientCount(240);
    else if (val.includes('Deloitte')) setRecipientCount(80);
    else setRecipientCount(420);
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
          maxWidth: '720px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(16, 27, 54, 0.25)',
          border: '1.5px solid #E2E8F0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh'
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                Broadcast Campus Announcement
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE'
                }}
              >
                Step {step} of 4
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
              5-Step Announcement Wizard with Multi-Channel Simulation & Confirmation Guards
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

        {/* Wizard Stepper Bar */}
        <div style={{ padding: '12px 24px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
          {[
            { num: 1, label: '1. Audience' },
            { num: 2, label: '2. Content' },
            { num: 3, label: '3. Schedule' },
            { num: 4, label: '4. Preview & Guard' }
          ].map((s) => (
            <div
              key={s.num}
              style={{
                flex: 1,
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: step === s.num ? '#EFF6FF' : step > s.num ? '#ECFDF5' : '#F8FAFC',
                border: step === s.num ? '1.5px solid #2563EB' : step > s.num ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {step > s.num ? (
                <Check size={13} color="#059669" />
              ) : (
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: step === s.num ? '#2563EB' : '#CBD5E1',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {s.num}
                </span>
              )}
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: step === s.num ? 800 : 600,
                  color: step === s.num ? '#2563EB' : step > s.num ? '#059669' : '#64748B'
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* STEP 1: AUDIENCE */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#101B36', marginBottom: '8px' }}>
                  Target Audience Segment
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {['Placement Drive', 'Department Cohort', 'Entire Campus'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setAudienceType(t)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: audienceType === t ? '2px solid #2563EB' : '1px solid #CBD5E1',
                        backgroundColor: audienceType === t ? '#EFF6FF' : '#FFFFFF',
                        color: audienceType === t ? '#2563EB' : '#475569',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {audienceType === 'Placement Drive' && (
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                    Select Drive Cohort
                  </label>
                  <select
                    value={targetDrive}
                    onChange={(e) => handleDriveChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <option value="TechNova Solutions — Software Engineer">
                      TechNova Solutions — Software Engineer (125 Shortlisted Candidates)
                    </option>
                    <option value="Infosys — Systems Engineer">
                      Infosys — Systems Engineer (240 Eligible Assessment Candidates)
                    </option>
                    <option value="Deloitte — Business Analyst">
                      Deloitte — Business Analyst (80 Shortlisted Candidates)
                    </option>
                  </select>
                </div>
              )}

              {audienceType === 'Department Cohort' && (
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                    Select Department
                  </label>
                  <select
                    value={targetDrive}
                    onChange={(e) => handleDriveChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
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
                </div>
              )}

              {audienceType === 'Entire Campus' && (
                <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', color: '#92400E' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13px' }}>
                    <AlertTriangle size={16} />
                    <span>Campus-Wide Broadcast Notice</span>
                  </div>
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>
                    This announcement will be delivered to 1,248 registered students across all branches. A confirmation guard will be required before dispatch.
                  </div>
                </div>
              )}

              {/* Recipient Counter Card */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Users size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                      Resolved Audience
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#101B36' }}>
                      {targetDrive}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#2563EB' }}>
                    {recipientCount}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Verified Students</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CONTENT */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                    Announcement Type
                  </label>
                  <select
                    value={announcementType}
                    onChange={(e) => setAnnouncementType(e.target.value)}
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
                    {ANNOUNCEMENT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                    Priority Level
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[PRIORITIES.NORMAL, PRIORITIES.IMPORTANT, PRIORITIES.URGENT].map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPriority(p)}
                        style={{
                          flex: 1,
                          padding: '8px 4px',
                          borderRadius: '8px',
                          border: priority === p ? '2px solid #2563EB' : '1px solid #CBD5E1',
                          backgroundColor: priority === p ? '#EFF6FF' : '#FFFFFF',
                          color: priority === p ? '#2563EB' : '#64748B',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                  Announcement Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px',
                    outline: 'none',
                    fontWeight: 600
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                  Announcement Body & Instructions
                </label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    lineHeight: 1.5
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE & CHANNELS */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#101B36', marginBottom: '8px' }}>
                  Dispatch Schedule
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setScheduleMode('now')}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      border: scheduleMode === 'now' ? '2px solid #2563EB' : '1px solid #CBD5E1',
                      backgroundColor: scheduleMode === 'now' ? '#EFF6FF' : '#FFFFFF',
                      color: scheduleMode === 'now' ? '#2563EB' : '#475569',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div>🚀 Send Immediately</div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', fontWeight: 400 }}>
                      Dispatches to 125 candidate inboxes on publish
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScheduleMode('later')}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      border: scheduleMode === 'later' ? '2px solid #2563EB' : '1px solid #CBD5E1',
                      backgroundColor: scheduleMode === 'later' ? '#EFF6FF' : '#FFFFFF',
                      color: scheduleMode === 'later' ? '#2563EB' : '#475569',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div>⏰ Schedule for Later</div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', fontWeight: 400 }}>
                      Specify future placement drive date & time
                    </div>
                  </button>
                </div>

                {scheduleMode === 'later' && (
                  <input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#101B36', marginBottom: '8px' }}>
                  Target Delivery Channels
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {[
                    { ch: CHANNELS.IN_APP, desc: 'Real-time dashboard banner & student portal feed' },
                    { ch: CHANNELS.EMAIL, desc: 'Simulated institutional email broadcast' },
                    { ch: CHANNELS.SMS, desc: 'Simulated mobile SMS flash broadcast' },
                    { ch: CHANNELS.WHATSAPP, desc: 'Simulated WhatsApp bot placement alert' }
                  ].map(({ ch, desc }) => {
                    const isSel = selectedChannels.includes(ch);
                    return (
                      <div
                        key={ch}
                        onClick={() => {
                          if (isSel) {
                            if (selectedChannels.length > 1) setSelectedChannels(selectedChannels.filter((c) => c !== ch));
                          } else {
                            setSelectedChannels([...selectedChannels, ch]);
                          }
                        }}
                        style={{
                          padding: '12px',
                          borderRadius: '10px',
                          border: isSel ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                          backgroundColor: isSel ? '#F0F7FF' : '#FFFFFF',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input type="checkbox" checked={isSel} readOnly style={{ cursor: 'pointer' }} />
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>{ch}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px', marginLeft: '22px' }}>
                          {desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PREVIEW & MOBILE MOCKUP */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                  Preview: Student Notification & Notice Board
                </span>
                <span style={{ fontSize: '11.5px', color: '#2563EB', fontWeight: 600 }}>
                  Personalized for 125 Shortlisted Candidates
                </span>
              </div>

              {/* Mobile Notification Preview Card */}
              <div
                style={{
                  backgroundColor: '#101B36',
                  borderRadius: '18px',
                  padding: '16px',
                  color: '#FFFFFF',
                  boxShadow: '0 12px 28px rgba(16, 27, 54, 0.25)',
                  maxWidth: '480px',
                  margin: '0 auto'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Bell size={14} color="#36C5E8" />
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#E2E8F0' }}>CampusCore Placement Notice</span>
                  </div>
                  <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>Now</span>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#EF4444', color: '#FFFFFF', padding: '1px 6px', borderRadius: '4px' }}>
                      {priority.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>{title}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: 1.4, margin: '6px 0 10px' }}>
                    {content}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <span style={{ fontSize: '11px', color: '#36C5E8', fontWeight: 600 }}>Turing Lab A • Oct 15</span>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>Tap to view schedule</span>
                  </div>
                </div>
              </div>

              {/* Delivery Summary Matrix */}
              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#101B36', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Dispatch Manifest
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
                  <div style={{ padding: '8px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Recipients</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#101B36' }}>{recipientCount} Students</div>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Channels</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#2563EB' }}>{selectedChannels.join(' + ')}</div>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Dispatch Mode</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>
                      {scheduleMode === 'now' ? 'Immediate' : 'Scheduled'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Nav */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <button
            type="button"
            disabled={step === 1}
            onClick={handleBack}
            className="btn btn-secondary"
            style={{
              padding: '9px 16px',
              visibility: step === 1 ? 'hidden' : 'visible',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft size={14} />
            <span>Previous</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '9px 16px' }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
              style={{
                padding: '9px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
            >
              <span>{step === 4 ? 'Confirm & Publish' : 'Continue'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRMATION GUARD MODAL (Section 49 of Layer 11 Prompt) */}
      {showConfirmModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16, 27, 54, 0.75)',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(16, 27, 54, 0.3)',
              border: '1.5px solid #E2E8F0'
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px'
              }}
            >
              <Send size={22} />
            </div>

            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 6px' }}>
              Confirm Announcement Dispatch
            </h4>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '0 0 16px' }}>
              You are about to broadcast this official placement announcement to <strong>{recipientCount} students</strong>.
            </p>

            <div
              style={{
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                fontSize: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                marginBottom: '20px'
              }}
            >
              <div><strong>Audience:</strong> {targetDrive}</div>
              <div><strong>Recipients:</strong> {recipientCount} Students</div>
              <div><strong>Priority:</strong> {priority}</div>
              <div><strong>Channels:</strong> {selectedChannels.join(', ')}</div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalPublish}
                className="btn btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                {isSubmitting ? (
                  <span>Publishing...</span>
                ) : (
                  <>
                    <Check size={15} />
                    <span>Confirm & Send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
