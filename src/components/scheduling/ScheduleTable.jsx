import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MoreVertical,
  Play,
  RotateCcw,
  XCircle,
  FileCheck2,
  User,
  Video,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { formatTime12h, SCHEDULE_STATUS, ATTENDANCE_STATUS, ROUND_RESULT_STATUS } from '../../data/schedulingConfig';

export default function ScheduleTable({
  schedules = [],
  onRescheduleClick,
  onCancelClick,
  onStartInterviewClick,
  onRecordResultClick,
  onMarkAttendanceClick,
  onViewCandidate
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeMenuId, setActiveMenuId] = useState(null);

  const filtered = schedules.filter((item) => {
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = (item.candidateName || '').toLowerCase().includes(q);
    const rollMatch = (item.studentRoll || '').toLowerCase().includes(q);
    const roundMatch = (item.roundName || '').toLowerCase().includes(q);
    return nameMatch || rollMatch || roundMatch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case SCHEDULE_STATUS.SCHEDULED:
        return { label: 'Scheduled', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' };
      case SCHEDULE_STATUS.CONFIRMED:
        return { label: 'Confirmed', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' };
      case SCHEDULE_STATUS.RESCHEDULED:
        return { label: 'Rescheduled', color: '#D97706', bg: '#FEF3C7', border: '#FDE68A' };
      case SCHEDULE_STATUS.COMPLETED:
        return { label: 'Completed', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' };
      case SCHEDULE_STATUS.CANCELLED:
        return { label: 'Cancelled', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' };
      default:
        return { label: status, color: '#64748B', bg: '#F1F5F9', border: '#E2E8F0' };
    }
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
      {/* Header & Controls */}
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
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
            Placement Schedule Roster
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            {filtered.length} interviews logged across interview panels
          </p>
        </div>

        {/* Search & Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '6px 12px'
            }}
          >
            <Search size={15} color="#94A3B8" />
            <input
              type="text"
              placeholder="Search candidate, roll, round..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '13px',
                width: '180px'
              }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value={SCHEDULE_STATUS.SCHEDULED}>Scheduled</option>
            <option value={SCHEDULE_STATUS.CONFIRMED}>Confirmed</option>
            <option value={SCHEDULE_STATUS.RESCHEDULED}>Rescheduled</option>
            <option value={SCHEDULE_STATUS.COMPLETED}>Completed</option>
            <option value={SCHEDULE_STATUS.CANCELLED}>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
              <th style={{ padding: '12px 14px', fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Candidate</th>
              <th style={{ padding: '12px 14px', fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Round</th>
              <th style={{ padding: '12px 14px', fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Date & Time</th>
              <th style={{ padding: '12px 14px', fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Interviewer</th>
              <th style={{ padding: '12px 14px', fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Room / Mode</th>
              <th style={{ padding: '12px 14px', fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 14px', fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Conflict</th>
              <th style={{ padding: '12px 14px', fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const badge = getStatusBadge(item.status);
              const hasConflict = item.hasConflict || item.conflictStatus === 'Conflict';

              return (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: hasConflict ? '#FFFDFD' : 'transparent',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hasConflict ? '#FEF2F2' : '#F8FAFC')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = hasConflict ? '#FFFDFD' : 'transparent')}
                >
                  {/* Candidate */}
                  <td style={{ padding: '14px' }}>
                    <div style={{ fontWeight: 800, color: '#101B36', fontSize: '13.5px' }}>
                      {item.candidateName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                      {item.studentRoll} • {item.department}
                    </div>
                  </td>

                  {/* Round */}
                  <td style={{ padding: '14px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>
                      {item.roundName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>{item.duration || 30} mins</div>
                  </td>

                  {/* Date & Time */}
                  <td style={{ padding: '14px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                      {formatTime12h(item.startTime)}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>{item.date}</div>
                  </td>

                  {/* Interviewer */}
                  <td style={{ padding: '14px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                      {item.interviewerNames?.[0] || 'Assigned Panel'}
                    </div>
                  </td>

                  {/* Room / Mode */}
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#475569', fontWeight: 600 }}>
                      {item.mode === 'Online' ? <Video size={13} color="#2563EB" /> : <MapPin size={13} color="#059669" />}
                      <span>{item.roomName?.split('(')[0] || item.roomId}</span>
                    </div>
                    {item.meetingLink && (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: '11px', color: '#2563EB', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}
                      >
                        <span>Join Link</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </td>

                  {/* Status */}
                  <td style={{ padding: '14px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: badge.color,
                        backgroundColor: badge.bg,
                        border: `1px solid ${badge.border}`,
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {badge.label}
                    </span>
                  </td>

                  {/* Conflict */}
                  <td style={{ padding: '14px' }}>
                    {hasConflict ? (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          color: '#DC2626',
                          backgroundColor: '#FEE2E2',
                          border: '1px solid #FECACA',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <AlertTriangle size={11} />
                        Conflict
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#059669',
                          backgroundColor: '#ECFDF5',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <CheckCircle2 size={11} />
                        Clear
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => onStartInterviewClick && onStartInterviewClick(item)}
                        title="Start / Evaluate Interview"
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#2563EB',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Play size={11} fill="#FFFFFF" />
                        <span>Start</span>
                      </button>

                      <button
                        onClick={() => onRescheduleClick && onRescheduleClick(item)}
                        title="Reschedule Interview"
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#F8FAFC',
                          color: '#334155',
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <RotateCcw size={11} />
                        <span>Reschedule</span>
                      </button>

                      <button
                        onClick={() => onCancelClick && onCancelClick(item)}
                        title="Cancel Interview"
                        style={{
                          padding: '5px 8px',
                          backgroundColor: '#FFF1F2',
                          color: '#E11D48',
                          border: '1px solid #FECDD3',
                          borderRadius: '8px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
