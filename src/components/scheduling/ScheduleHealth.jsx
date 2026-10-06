import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export default function ScheduleHealth({
  healthScore = 96,
  validCount = 382,
  warningCount = 6,
  criticalCount = 4,
  onResolveClick,
  onRefresh
}) {
  const getStatusText = (score) => {
    if (score >= 90) return { label: 'Excellent Health', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' };
    if (score >= 75) return { label: 'Good • Minor Warnings', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' };
    if (score >= 60) return { label: 'Requires Attention', color: '#D97706', bg: '#FEF3C7', border: '#FDE68A' };
    return { label: 'Critical Conflicts Present', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' };
  };

  const status = getStatusText(healthScore);

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
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: '#EEF4FF',
              color: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 2px' }}>
              Schedule Health
            </h2>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Real-time operational collision and resource constraint analysis
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: status.color,
              backgroundColor: status.bg,
              border: `1px solid ${status.border}`,
              padding: '4px 12px',
              borderRadius: '8px'
            }}
          >
            {status.label}
          </span>
          {onRefresh && (
            <button
              onClick={onRefresh}
              title="Re-run Conflict Check"
              style={{
                background: 'transparent',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px'
              }}
            >
              <RefreshCw size={13} />
              <span>Re-check</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Score & Tri-State Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '18px'
        }}
      >
        {/* Score Card */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '14px',
            border: '1px solid #E2E8F0',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div
            style={{
              fontSize: '32px',
              fontWeight: 900,
              color: status.color,
              fontFamily: 'var(--font-heading)',
              lineHeight: 1
            }}
          >
            {healthScore}%
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#101B36' }}>Health Score</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Operational demo score</div>
          </div>
        </div>

        {/* Valid Schedules */}
        <div
          style={{
            backgroundColor: '#ECFDF5',
            borderRadius: '14px',
            border: '1px solid #A7F3D0',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <CheckCircle2 size={24} color="#059669" />
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#065F46', lineHeight: 1 }}>
              {validCount}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#047857', marginTop: '2px' }}>
              ✓ Schedules Valid
            </div>
          </div>
        </div>

        {/* Warnings */}
        <div
          style={{
            backgroundColor: '#FEF3C7',
            borderRadius: '14px',
            border: '1px solid #FDE68A',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <AlertTriangle size={24} color="#D97706" />
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#92400E', lineHeight: 1 }}>
              {warningCount}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#B45309', marginTop: '2px' }}>
              ⚠ Warnings Detected
            </div>
          </div>
        </div>

        {/* Critical Conflicts */}
        <div
          style={{
            backgroundColor: criticalCount > 0 ? '#FEF2F2' : '#F8FAFC',
            borderRadius: '14px',
            border: `1px solid ${criticalCount > 0 ? '#FECACA' : '#E2E8F0'}`,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <XCircle size={24} color={criticalCount > 0 ? '#DC2626' : '#94A3B8'} />
          <div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: criticalCount > 0 ? '#991B1B' : '#475569',
                lineHeight: 1
              }}
            >
              {criticalCount}
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: criticalCount > 0 ? '#B91C1C' : '#64748B',
                marginTop: '2px'
              }}
            >
              ✕ Critical Conflicts
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '12px',
          borderTop: '1px solid #F1F5F9'
        }}
      >
        <div style={{ fontSize: '12.5px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#3978F6" />
          <span>
            {criticalCount > 0
              ? `${criticalCount} double-booking collisions detected. Recommended conflict-free slots available.`
              : 'All interviews and panels are scheduled without resource collision.'}
          </span>
        </div>

        {onResolveClick && (
          <button
            onClick={onResolveClick}
            style={{
              padding: '8px 16px',
              backgroundColor: criticalCount > 0 ? '#DC2626' : '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: criticalCount > 0 ? '0 4px 12px rgba(220, 38, 38, 0.25)' : 'none'
            }}
          >
            <span>Resolve Conflicts</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
