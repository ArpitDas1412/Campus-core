import React from 'react';
import { History, Clock, User, CheckCircle2, RotateCcw, XCircle, Sparkles } from 'lucide-react';

export default function ScheduleAuditLog({ auditLogs = [] }) {
  const getActionBadge = (action) => {
    switch (action) {
      case 'INTERVIEW_RESCHEDULED':
        return { label: 'Rescheduled', color: '#D97706', bg: '#FEF3C7', icon: RotateCcw };
      case 'INTERVIEW_CANCELLED':
        return { label: 'Cancelled', color: '#DC2626', bg: '#FEF2F2', icon: XCircle };
      case 'SCHEDULE_PUBLISHED':
        return { label: 'Published', color: '#059669', bg: '#ECFDF5', icon: CheckCircle2 };
      case 'SCHEDULE_AUTO_GENERATED':
        return { label: 'Auto-Generated', color: '#2563EB', bg: '#EFF6FF', icon: Sparkles };
      case 'ROUND_RESULT_RECORDED':
        return { label: 'Result Logged', color: '#7C3AED', bg: '#F5F3FF', icon: CheckCircle2 };
      default:
        return { label: action, color: '#475569', bg: '#F1F5F9', icon: Clock };
    }
  };

  if (!auditLogs || auditLogs.length === 0) {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <History size={18} color="#2563EB" />
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            Schedule Activity Audit Trail
          </h3>
        </div>
        <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
          No schedule modifications logged yet.
        </p>
      </div>
    );
  }

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={18} color="#2563EB" />
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            Schedule Activity & Compliance Audit Trail
          </h3>
        </div>
        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
          {auditLogs.length} Events Recorded
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {auditLogs.map((entry) => {
          const badge = getActionBadge(entry.action);
          const Icon = badge.icon;

          return (
            <div
              key={entry.id}
              style={{
                borderRadius: '12px',
                border: '1px solid #F1F5F9',
                backgroundColor: '#F8FAFC',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: badge.bg,
                    color: badge.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={15} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        color: badge.color,
                        backgroundColor: badge.bg,
                        padding: '1px 7px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {badge.label}
                    </span>
                    {entry.candidateName && (
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#101B36' }}>
                        {entry.candidateName}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '3px' }}>
                    {entry.detail}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B' }}>
                  {entry.timestamp}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                  By {entry.changedBy || 'Officer'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
