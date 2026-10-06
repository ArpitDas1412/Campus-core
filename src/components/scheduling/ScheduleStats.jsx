import React from 'react';
import {
  Briefcase,
  UserCheck,
  Clock,
  AlertTriangle,
  CalendarCheck2,
  DoorOpen,
  Info
} from 'lucide-react';
import { INITIAL_DRIVES_SCHEDULE_METRICS } from '../../data/schedulingConfig';

export default function ScheduleStats({ customMetrics = null }) {
  const metrics = { ...INITIAL_DRIVES_SCHEDULE_METRICS, ...customMetrics };

  const cards = [
    {
      label: 'Active Drives',
      value: metrics.activeDrives,
      subtitle: 'Across CSE, IT, ECE cohorts',
      icon: Briefcase,
      color: '#2563EB',
      bgColor: '#EFF6FF',
      borderColor: '#DBEAFE'
    },
    {
      label: 'Scheduled Candidates',
      value: metrics.scheduledCandidates,
      subtitle: 'Slots confirmed & assigned',
      icon: UserCheck,
      color: '#059669',
      bgColor: '#ECFDF5',
      borderColor: '#A7F3D0'
    },
    {
      label: 'Pending Scheduling',
      value: metrics.pendingScheduling,
      subtitle: 'Shortlisted awaiting slots',
      icon: Clock,
      color: '#D97706',
      bgColor: '#FEF3C7',
      borderColor: '#FDE68A'
    },
    {
      label: 'Conflicts Detected',
      value: metrics.conflictsDetected,
      subtitle: 'Immediate resolution ready',
      icon: AlertTriangle,
      color: '#DC2626',
      bgColor: '#FEF2F2',
      borderColor: '#FECACA'
    },
    {
      label: 'Interviews Today',
      value: metrics.interviewsToday,
      subtitle: '42 panels in session',
      icon: CalendarCheck2,
      color: '#7C3AED',
      bgColor: '#F5F3FF',
      borderColor: '#DDD6FE'
    },
    {
      label: 'Rooms Utilized',
      value: metrics.roomsUtilized,
      subtitle: '87.5% campus venue capacity',
      icon: DoorOpen,
      color: '#0E8EA8',
      bgColor: '#EBF9FD',
      borderColor: '#B9E8F5'
    }
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Illustrative Demo Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '6px',
          marginBottom: '10px',
          fontSize: '11.5px',
          color: '#64748B'
        }}
      >
        <Info size={13} color="#94A3B8" />
        <span>Demonstration operational metrics across institutional placement drives</span>
      </div>

      {/* Grid of 6 KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '14px'
        }}
      >
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '18px 20px',
                boxShadow: '0 2px 8px rgba(16, 27, 54, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 27, 54, 0.07)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 27, 54, 0.03)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  {card.label}
                </span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: card.bgColor,
                    color: card.color,
                    border: `1px solid ${card.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#101B36',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1
                  }}
                >
                  {card.value}
                </div>
                <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '4px' }}>
                  {card.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
