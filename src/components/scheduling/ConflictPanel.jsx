import React, { useState } from 'react';
import {
  AlertTriangle,
  XCircle,
  Info,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  User,
  DoorOpen,
  Calendar,
  Check
} from 'lucide-react';
import { CONFLICT_SEVERITY, CONFLICT_TYPE } from '../../data/schedulingConfig';

export default function ConflictPanel({
  conflicts = [],
  onApplyRecommendation,
  onManuallyReschedule
}) {
  const [filterSeverity, setFilterSeverity] = useState('ALL'); // 'ALL', 'CRITICAL', 'WARNING'

  const filtered = conflicts.filter((c) => {
    if (filterSeverity === 'ALL') return true;
    return c.severity?.toUpperCase() === filterSeverity;
  });

  const criticalList = conflicts.filter((c) => c.severity === CONFLICT_SEVERITY.CRITICAL);
  const warningList = conflicts.filter((c) => c.severity === CONFLICT_SEVERITY.WARNING);
  const infoList = conflicts.filter((c) => c.severity === CONFLICT_SEVERITY.INFO);

  if (conflicts.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          padding: '32px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)'
        }}
      >
        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#ECFDF5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}
        >
          <CheckCircle2 size={30} />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 6px' }}>
          ✓ Schedule looks good
        </h3>
        <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0, maxWidth: '440px', marginInline: 'auto' }}>
          No candidate, interviewer, room or break collisions detected across this placement drive.
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
      {/* Header & Filter Tabs */}
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
            Conflict Detection & Resolution
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Automated collision engine checking student availability, interviewer panels, and room bookings.
          </p>
        </div>

        {/* Severity filter tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#F8FAFC',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid #E2E8F0'
          }}
        >
          <button
            onClick={() => setFilterSeverity('ALL')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: filterSeverity === 'ALL' ? '#FFFFFF' : 'transparent',
              color: filterSeverity === 'ALL' ? '#101B36' : '#64748B',
              boxShadow: filterSeverity === 'ALL' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            All ({conflicts.length})
          </button>
          <button
            onClick={() => setFilterSeverity('CRITICAL')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: filterSeverity === 'CRITICAL' ? '#FEF2F2' : 'transparent',
              color: filterSeverity === 'CRITICAL' ? '#DC2626' : '#64748B'
            }}
          >
            Critical ({criticalList.length})
          </button>
          <button
            onClick={() => setFilterSeverity('WARNING')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: filterSeverity === 'WARNING' ? '#FEF3C7' : 'transparent',
              color: filterSeverity === 'WARNING' ? '#B45309' : '#64748B'
            }}
          >
            Warnings ({warningList.length})
          </button>
        </div>
      </div>

      {/* Conflicts Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map((item) => {
          const isCritical = item.severity === CONFLICT_SEVERITY.CRITICAL;
          const isWarning = item.severity === CONFLICT_SEVERITY.WARNING;

          return (
            <div
              key={item.id}
              style={{
                borderRadius: '16px',
                border: `1.5px solid ${isCritical ? '#FECACA' : isWarning ? '#FDE68A' : '#E2E8F0'}`,
                backgroundColor: isCritical ? '#FFFDFD' : isWarning ? '#FFFDF5' : '#F8FAFC',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              {/* Conflict Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: isCritical ? '#FEE2E2' : isWarning ? '#FEF3C7' : '#EFF6FF',
                      color: isCritical ? '#DC2626' : isWarning ? '#D97706' : '#2563EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {isCritical ? <XCircle size={20} /> : <AlertTriangle size={20} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          color: isCritical ? '#DC2626' : '#D97706',
                          backgroundColor: isCritical ? '#FEF2F2' : '#FEF3C7',
                          border: `1px solid ${isCritical ? '#FECACA' : '#FDE68A'}`,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.type || item.severity}
                      </span>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                        {item.title}
                      </h4>
                    </div>

                    <p style={{ fontSize: '13px', color: '#475569', margin: '4px 0 0' }}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {item.date && (
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#64748B',
                      fontWeight: 600,
                      backgroundColor: '#FFFFFF',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      flexShrink: 0
                    }}
                  >
                    {item.date} {item.time ? `• ${item.time}` : ''}
                  </span>
                )}
              </div>

              {/* Recommended Alternatives Box */}
              {item.recommendations && item.recommendations.length > 0 && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    padding: '14px 16px',
                    marginTop: '4px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      color: '#059669',
                      marginBottom: '10px'
                    }}
                  >
                    <Sparkles size={14} />
                    <span>Conflict-Free Recommended Alternatives:</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {item.recommendations.map((rec, rIdx) => (
                      <div
                        key={rIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          backgroundColor: '#F8FAFC',
                          borderRadius: '10px',
                          border: '1px solid #E2E8F0',
                          padding: '8px 12px',
                          flex: '1 1 240px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Check size={14} color="#059669" />
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                            {rec.label || `${rec.date} — ${rec.time}`}
                          </span>
                        </div>

                        <button
                          onClick={() => onApplyRecommendation && onApplyRecommendation(item.scheduleId, rec)}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: '#059669',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#047857')}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
                        >
                          <span>Apply</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
