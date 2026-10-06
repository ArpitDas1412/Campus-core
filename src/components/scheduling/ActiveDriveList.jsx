import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { INITIAL_ACTIVE_DRIVES } from '../../data/schedulingConfig';

export default function ActiveDriveList({ drives = INITIAL_ACTIVE_DRIVES, onSelectDrive }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        marginBottom: '24px',
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
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#101B36',
              margin: '0 0 4px',
              letterSpacing: '-0.01em'
            }}
          >
            Active Placement Drives
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Real-time schedule allocation status across ongoing corporate recruitment drives
          </p>
        </div>

        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#2563EB',
            backgroundColor: '#EFF6FF',
            padding: '4px 12px',
            borderRadius: '8px',
            border: '1px solid #BFDBFE'
          }}
        >
          {drives.length} Drives Monitored
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {drives.map((drive) => {
          const scheduledPct = Math.round((drive.scheduledCount / (drive.shortlistedCount || 1)) * 100);

          return (
            <div
              key={drive.id}
              style={{
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '20px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#BFDBFE';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.06)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Left Company & Role */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '260px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: drive.avatarBg || '#101B36',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '15px'
                  }}
                >
                  {drive.avatarText || drive.companyName.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                      {drive.companyName}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: '#ECFDF5',
                        color: '#059669',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {drive.openings} Openings
                    </span>
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#475569', fontWeight: 600, marginTop: '2px' }}>
                    {drive.jobTitle}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                    {drive.roundsCount} Rounds • {drive.dates?.length || 2} Interview Days
                  </div>
                </div>
              </div>

              {/* Middle Metrics & Progress */}
              <div style={{ flex: '1 1 280px', minWidth: '240px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                    fontSize: '12.5px'
                  }}
                >
                  <span style={{ color: '#475569', fontWeight: 600 }}>
                    <strong style={{ color: '#101B36' }}>{drive.scheduledCount}</strong> of{' '}
                    <strong style={{ color: '#101B36' }}>{drive.shortlistedCount}</strong> Shortlisted Scheduled
                  </span>
                  <span style={{ fontWeight: 800, color: scheduledPct >= 80 ? '#059669' : '#D97706' }}>
                    {scheduledPct}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '999px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${scheduledPct}%`,
                      backgroundColor: scheduledPct >= 80 ? '#059669' : '#3978F6',
                      borderRadius: '999px',
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginTop: '8px',
                    fontSize: '11.5px',
                    color: '#64748B'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} color="#059669" /> {drive.scheduledCount} Scheduled
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} color="#D97706" /> {drive.pendingCount} Pending
                  </span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => {
                    if (onSelectDrive) {
                      onSelectDrive(drive.id);
                    } else {
                      navigate(`/officer/scheduling/${drive.id}`);
                    }
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    border: '1px solid #BFDBFE',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#DBEAFE')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#EFF6FF')}
                >
                  <span>View Schedule</span>
                  <ChevronRight size={14} />
                </button>

                <button
                  onClick={() => {
                    if (onSelectDrive) {
                      onSelectDrive(drive.id, true);
                    } else {
                      navigate(`/officer/scheduling/${drive.id}?wizard=true`);
                    }
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#101B36',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1E293B')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#101B36')}
                >
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
