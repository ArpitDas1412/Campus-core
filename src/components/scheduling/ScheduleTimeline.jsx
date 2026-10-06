import React from 'react';
import { Clock, AlertTriangle, Video, MapPin, Sparkles } from 'lucide-react';
import { formatTime12h, SCHEDULE_STATUS } from '../../data/schedulingConfig';

export default function ScheduleTimeline({ schedules = [], activeDate = '2026-10-15', onSelectInterview }) {
  const daySchedules = schedules.filter(
    (s) => s.date === activeDate && s.status !== SCHEDULE_STATUS.CANCELLED
  );

  // Time grid from 09:00 (540 mins) to 17:00 (1020 mins) = 480 mins total
  const dayStartMinutes = 9 * 60; // 540
  const dayTotalMinutes = 8 * 60; // 480

  const timeMarkers = [
    { label: '09:00', min: 540 },
    { label: '10:00', min: 600 },
    { label: '11:00', min: 660 },
    { label: '12:00', min: 720 },
    { label: '13:00 (Lunch)', min: 780 },
    { label: '14:00', min: 840 },
    { label: '15:00', min: 900 },
    { label: '16:00', min: 960 },
    { label: '17:00', min: 1020 }
  ];

  const getPositionPercent = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    const totalM = h * 60 + (m || 0);
    const clamped = Math.max(dayStartMinutes, Math.min(dayStartMinutes + dayTotalMinutes, totalM));
    return ((clamped - dayStartMinutes) / dayTotalMinutes) * 100;
  };

  const getWidthPercent = (durationMins = 30) => {
    return (durationMins / dayTotalMinutes) * 100;
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
            Resource & Candidate Timeline View
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Horizontal schedule distribution showing parallel interview panels and collision zones ({activeDate})
          </p>
        </div>

        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#2563EB',
            backgroundColor: '#EFF6FF',
            padding: '4px 10px',
            borderRadius: '6px'
          }}
        >
          {daySchedules.length} Scheduled Sessions
        </span>
      </div>

      {/* Timeline Ruler Header */}
      <div style={{ position: 'relative', height: '36px', borderBottom: '2px solid #E2E8F0', marginBottom: '14px' }}>
        {timeMarkers.map((marker, idx) => {
          const pct = ((marker.min - dayStartMinutes) / dayTotalMinutes) * 100;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: `${pct}%`,
                transform: 'translateX(-50%)',
                fontSize: '11px',
                fontWeight: 700,
                color: marker.label.includes('Lunch') ? '#D97706' : '#64748B'
              }}
            >
              {marker.label}
            </div>
          );
        })}
      </div>

      {/* Timeline Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {daySchedules.map((item) => {
          const leftPct = getPositionPercent(item.startTime);
          const widthPct = getWidthPercent(item.duration || 30);
          const hasConflict = item.hasConflict || item.conflictStatus === 'Conflict';

          return (
            <div
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                alignItems: 'center',
                gap: '14px',
                padding: '6px 0',
                borderBottom: '1px solid #F1F5F9'
              }}
            >
              {/* Left Label */}
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#101B36', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.candidateName}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  {item.studentRoll || 'Candidate'} • {formatTime12h(item.startTime)}
                </div>
              </div>

              {/* Right Gantt Track */}
              <div
                style={{
                  position: 'relative',
                  height: '38px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                {/* Lunch Break Strip */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${((780 - dayStartMinutes) / dayTotalMinutes) * 100}%`,
                    width: `${(60 / dayTotalMinutes) * 100}%`,
                    height: '100%',
                    backgroundColor: '#FEF3C7',
                    borderLeft: '1px dashed #F59E0B',
                    borderRight: '1px dashed #F59E0B',
                    zIndex: 1
                  }}
                  title="Protected Lunch Break"
                />

                {/* Interview Block */}
                <div
                  onClick={() => onSelectInterview && onSelectInterview(item)}
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    width: `max(${widthPct}%, 70px)`,
                    height: '32px',
                    top: '3px',
                    borderRadius: '6px',
                    backgroundColor: hasConflict ? '#EF4444' : '#2563EB',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 8px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: hasConflict ? '0 2px 8px rgba(239, 68, 68, 0.4)' : '0 2px 6px rgba(37, 99, 235, 0.25)',
                    zIndex: 2,
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
                  title={`${item.candidateName} - ${item.roundName} (${formatTime12h(item.startTime)} - ${formatTime12h(item.endTime)})`}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.roundName?.split(' ')[0] || 'Technical'} ({item.roomName?.split(' ')[0] || item.roomId})
                  </span>
                  {hasConflict ? <AlertTriangle size={13} color="#FFFFFF" /> : <Clock size={12} color="#FFFFFF" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
