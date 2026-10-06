import React from 'react';
import { Calendar, Sparkles, Plus, Clock, ShieldCheck, ChevronDown } from 'lucide-react';

export default function ScheduleHeader({
  activeDate,
  onDateChange,
  onCreateScheduleClick,
  jobTitle = null,
  companyName = null,
  isRecruiter = false
}) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '24px 28px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.05)'
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        {/* Left Title & Subtitle */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#2563EB',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                padding: '3px 10px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Sparkles size={12} />
              Layer 10 • Conflict-Aware Placement Scheduler
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                padding: '3px 10px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              ● Placement Season Active (2026–27)
            </span>
          </div>

          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#101B36',
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-heading)'
            }}
          >
            {jobTitle ? `${jobTitle} — Placement Schedule` : 'Placement Scheduling Center'}
          </h1>

          <p style={{ fontSize: '14px', color: '#64748B', margin: 0, maxWidth: '680px' }}>
            {companyName
              ? `Coordinate multi-round interviews and slot allocations for ${companyName} with automated candidate, interviewer, and room conflict detection.`
              : 'Coordinate placement drives, interviews and assessments without scheduling conflicts. AI Shortlist to conflict-free roster.'}
          </p>
        </div>

        {/* Right Actions: Date Selector + Create Schedule Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Date Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155'
            }}
          >
            <Calendar size={16} color="#3978F6" />
            <select
              value={activeDate || '2026-10-15'}
              onChange={(e) => onDateChange && onDateChange(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '13px',
                fontWeight: 700,
                color: '#101B36',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="2026-10-15">Thu, 15 Oct 2026 (Drive Day 1)</option>
              <option value="2026-10-16">Fri, 16 Oct 2026 (Drive Day 2)</option>
              <option value="2026-10-17">Sat, 17 Oct 2026 (Drive Day 3)</option>
              <option value="2026-10-18">Sun, 18 Oct 2026 (Technical Finals)</option>
            </select>
          </div>

          {/* Create Placement Schedule Button */}
          {onCreateScheduleClick && (
            <button
              onClick={onCreateScheduleClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 18px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
            >
              <Plus size={16} />
              <span>Create Placement Schedule</span>
            </button>
          )}
        </div>
      </div>

      {/* Innovation Callout Pill */}
      <div
        style={{
          marginTop: '18px',
          padding: '10px 16px',
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          border: '1px dashed #CBD5E1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#3978F6' }}>
            ✦ Conflict-Aware Scheduling Engine
          </span>
          <span style={{ color: '#94A3B8' }}>•</span>
          <span style={{ fontSize: '12.5px', color: '#64748B' }}>
            CampusCore continuously checks candidate, interviewer, room, and round dependencies before recommending slot assignments.
          </span>
        </div>
        <span
          style={{
            fontSize: '11px',
            color: '#64748B',
            fontWeight: 600,
            backgroundColor: '#FFFFFF',
            padding: '2px 8px',
            borderRadius: '6px',
            border: '1px solid #E2E8F0'
          }}
        >
          Explainable Rule-Based Logic
        </span>
      </div>
    </div>
  );
}
