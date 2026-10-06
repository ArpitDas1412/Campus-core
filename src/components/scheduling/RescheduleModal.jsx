import React, { useState } from 'react';
import {
  X,
  RotateCcw,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  Sparkles
} from 'lucide-react';
import { formatTime12h } from '../../data/schedulingConfig';

export default function RescheduleModal({
  interview,
  alternatives = [],
  onClose,
  onConfirmReschedule
}) {
  const [selectedSlot, setSelectedSlot] = useState(alternatives[0] || null);
  const [customDate, setCustomDate] = useState(interview?.date || '2026-10-15');
  const [customTime, setCustomTime] = useState(interview?.startTime || '10:30');
  const [reason, setReason] = useState('Interviewer unavailable');
  const [customReason, setCustomReason] = useState('');
  const [useCustomSlot, setUseCustomSlot] = useState(false);

  if (!interview) return null;

  const defaultReasons = [
    'Interviewer unavailable',
    'Candidate requested change',
    'Room unavailable',
    'Technical issue',
    'Recruiter request',
    'Other'
  ];

  // Demo alternative slots with conflict status
  const demoAlternatives = alternatives.length > 0 ? alternatives : [
    { date: '2026-10-15', time: '10:30', label: '15 Oct — 10:30 AM', roomName: 'Room A102', isConflictFree: true },
    { date: '2026-10-15', time: '11:00', label: '15 Oct — 11:00 AM', roomName: 'Room A103', isConflictFree: true },
    { date: '2026-10-16', time: '09:30', label: '16 Oct — 09:30 AM', roomName: 'Room A101', isConflictFree: false, conflictReason: 'Interviewer panel already booked' },
    { date: '2026-10-16', time: '10:00', label: '16 Oct — 10:00 AM', roomName: 'Room A102', isConflictFree: true }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = reason === 'Other' && customReason ? customReason : reason;

    if (useCustomSlot) {
      onConfirmReschedule({
        date: customDate,
        startTime: customTime,
        roomId: interview.roomId,
        reason: finalReason
      });
    } else if (selectedSlot) {
      onConfirmReschedule({
        date: selectedSlot.date,
        startTime: selectedSlot.time,
        roomId: selectedSlot.roomId,
        roomName: selectedSlot.roomName,
        interviewerId: selectedSlot.interviewerId,
        interviewerName: selectedSlot.interviewerName,
        reason: finalReason
      });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '560px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="animate-fade-in"
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38BDF8'
              }}
            >
              <RotateCcw size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0 }}>
                Reschedule Interview
              </h3>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0' }}>
                Conflict-aware slot reallocation with audit logging
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Current Slot Info Card */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '16px'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
              Current Assigned Slot
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#101B36' }}>
              {interview.candidateName} — {interview.roundName}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '12.5px', color: '#475569' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} color="#2563EB" /> {interview.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} color="#2563EB" /> {formatTime12h(interview.startTime)}
              </span>
              <span>Room: {interview.roomName || interview.roomId}</span>
            </div>
          </div>

          {/* Conflict-Free Recommended Alternatives */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, color: '#101B36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="#059669" />
                <span>Conflict-Free Recommended Slots</span>
              </label>
              <button
                type="button"
                onClick={() => setUseCustomSlot(!useCustomSlot)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#2563EB',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {useCustomSlot ? '← Select from recommendations' : '+ Custom Date & Time'}
              </button>
            </div>

            {!useCustomSlot ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {demoAlternatives.map((slot, sIdx) => {
                  const isSelected = selectedSlot?.time === slot.time && selectedSlot?.date === slot.date;
                  const isFree = slot.isConflictFree !== false;

                  return (
                    <div
                      key={sIdx}
                      onClick={() => {
                        if (isFree) setSelectedSlot(slot);
                      }}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: isSelected
                          ? '2px solid #2563EB'
                          : `1px solid ${isFree ? '#E2E8F0' : '#FECACA'}`,
                        backgroundColor: isSelected
                          ? '#EFF6FF'
                          : isFree
                          ? '#FFFFFF'
                          : '#FEF2F2',
                        cursor: isFree ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: isSelected ? '5px solid #2563EB' : '2px solid #CBD5E1',
                            backgroundColor: '#FFFFFF'
                          }}
                        />
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                            {slot.label || `${slot.date} — ${formatTime12h(slot.time)}`}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>
                            {slot.roomName || 'Room A102'}
                          </div>
                        </div>
                      </div>

                      {isFree ? (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#059669',
                            backgroundColor: '#ECFDF5',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <CheckCircle2 size={12} />
                          Conflict Free
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#DC2626',
                            backgroundColor: '#FEE2E2',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <XCircle size={12} />
                          {slot.conflictReason || 'Interviewer unavailable'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  backgroundColor: '#F8FAFC',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Time Slot
                  </label>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Reschedule Reason Selector */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#101B36', display: 'block', marginBottom: '6px' }}>
              Reason for Rescheduling <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                color: '#101B36',
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            >
              {defaultReasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {reason === 'Other' && (
              <input
                type="text"
                placeholder="Specify reason for reschedule..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px'
                }}
              />
            )}
          </div>

          {/* Modal Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px',
              paddingTop: '12px',
              borderTop: '1px solid #F1F5F9'
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 18px',
                backgroundColor: '#F1F5F9',
                color: '#475569',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 22px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)'
              }}
            >
              Confirm Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
