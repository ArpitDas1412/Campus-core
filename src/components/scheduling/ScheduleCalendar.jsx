import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  User,
  ChevronLeft,
  ChevronRight,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { formatTime12h, SCHEDULE_STATUS } from '../../data/schedulingConfig';

export default function ScheduleCalendar({
  schedules = [],
  activeDate = '2026-10-15',
  onSelectInterview
}) {
  const [calendarView, setCalendarView] = useState('WEEK'); // 'DAY', 'WEEK', 'MONTH'
  const [selectedDay, setSelectedDay] = useState(activeDate);

  // Time row labels from 09:00 AM to 05:00 PM
  const timeHours = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00', // Lunch
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30'
  ];

  // Days in week view
  const weekDays = [
    { label: 'Thu, 15 Oct', date: '2026-10-15' },
    { label: 'Fri, 16 Oct', date: '2026-10-16' },
    { label: 'Sat, 17 Oct', date: '2026-10-17' },
    { label: 'Sun, 18 Oct', date: '2026-10-18' }
  ];

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
      {/* Calendar Header Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CalendarIcon size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 2px' }}>
              Placement Drive Calendar
            </h2>
            <div style={{ fontSize: '12.5px', color: '#64748B' }}>
              Multi-panel visual slot allocation and conflict tracking
            </div>
          </div>
        </div>

        {/* View Switcher: Day, Week, Month */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '3px'
            }}
          >
            {['DAY', 'WEEK', 'MONTH'].map((v) => (
              <button
                key={v}
                onClick={() => setCalendarView(v)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '7px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: calendarView === v ? '#FFFFFF' : 'transparent',
                  color: calendarView === v ? '#2563EB' : '#64748B',
                  boxShadow: calendarView === v ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {v === 'DAY' ? 'Day' : v === 'WEEK' ? 'Week' : 'Month'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Week Grid Header */}
      {calendarView === 'WEEK' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '80px repeat(4, 1fr)',
            gap: '8px',
            borderBottom: '2px solid #E2E8F0',
            paddingBottom: '10px',
            marginBottom: '10px'
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', textAlign: 'center' }}>Time</div>
          {weekDays.map((d) => (
            <div
              key={d.date}
              style={{
                textAlign: 'center',
                padding: '8px',
                backgroundColor: d.date === selectedDay ? '#EFF6FF' : 'transparent',
                borderRadius: '8px',
                border: d.date === selectedDay ? '1px solid #BFDBFE' : '1px solid transparent'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#101B36' }}>{d.label}</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>
                {schedules.filter((s) => s.date === d.date && s.status !== SCHEDULE_STATUS.CANCELLED).length} Sessions
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar Body Slots */}
      <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '4px' }}>
        {timeHours.map((hour) => {
          const isLunch = hour === '13:00';

          return (
            <div
              key={hour}
              style={{
                display: 'grid',
                gridTemplateColumns: calendarView === 'WEEK' ? '80px repeat(4, 1fr)' : '80px 1fr',
                gap: '8px',
                minHeight: isLunch ? '40px' : '72px',
                borderBottom: '1px solid #F1F5F9',
                backgroundColor: isLunch ? '#F8FAFC' : 'transparent',
                alignItems: 'stretch'
              }}
            >
              {/* Left Time Label */}
              <div
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: isLunch ? '#94A3B8' : '#64748B',
                  textAlign: 'center',
                  paddingTop: '8px'
                }}
              >
                {formatTime12h(hour)}
              </div>

              {isLunch ? (
                <div
                  style={{
                    gridColumn: calendarView === 'WEEK' ? 'span 4' : 'span 1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: '#94A3B8',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderLeft: '3px solid #CBD5E1',
                    padding: '6px 12px'
                  }}
                >
                  <Clock size={13} />
                  <span>Protected Institutional Break Window (01:00 PM – 02:00 PM)</span>
                </div>
              ) : calendarView === 'WEEK' ? (
                weekDays.map((d) => {
                  const dayHourSchedules = schedules.filter(
                    (s) => s.date === d.date && s.startTime === hour && s.status !== SCHEDULE_STATUS.CANCELLED
                  );

                  return (
                    <div
                      key={d.date}
                      style={{
                        padding: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        backgroundColor: dayHourSchedules.length > 0 ? '#FAFAFA' : 'transparent',
                        borderRadius: '8px'
                      }}
                    >
                      {dayHourSchedules.map((item) => {
                        const hasConflict = item.hasConflict || item.conflictStatus === 'Conflict';
                        return (
                          <div
                            key={item.id}
                            onClick={() => onSelectInterview && onSelectInterview(item)}
                            style={{
                              backgroundColor: hasConflict ? '#FEF2F2' : '#FFFFFF',
                              border: `1.5px solid ${hasConflict ? '#FECACA' : '#DBEAFE'}`,
                              borderLeft: `4px solid ${hasConflict ? '#DC2626' : '#2563EB'}`,
                              borderRadius: '8px',
                              padding: '6px 8px',
                              cursor: 'pointer',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                              transition: 'transform 0.15s ease'
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                            onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: '11px', fontWeight: 800, color: '#101B36' }}>
                                {item.candidateName}
                              </span>
                              {hasConflict && <AlertTriangle size={12} color="#DC2626" />}
                            </div>

                            <div style={{ fontSize: '10.5px', color: '#2563EB', fontWeight: 700 }}>
                              {item.roundName || 'Technical Interview'}
                            </div>

                            <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              {item.mode === 'Online' ? <Video size={10} /> : <MapPin size={10} />}
                              <span>{item.roomName?.split('(')[0] || item.roomId}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                /* Single Day View */
                <div style={{ padding: '6px' }}>
                  {schedules
                    .filter((s) => s.date === selectedDay && s.startTime === hour && s.status !== SCHEDULE_STATUS.CANCELLED)
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectInterview && onSelectInterview(item)}
                        style={{
                          backgroundColor: item.hasConflict ? '#FEF2F2' : '#EFF6FF',
                          border: `1px solid ${item.hasConflict ? '#FECACA' : '#BFDBFE'}`,
                          borderRadius: '8px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#101B36' }}>
                            {item.candidateName} — {item.roundName}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                            Panel: {item.interviewerNames?.[0] || 'Assigned Interviewer'} • {item.roomName}
                          </div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB' }}>
                          {formatTime12h(item.startTime)} – {formatTime12h(item.endTime)}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
