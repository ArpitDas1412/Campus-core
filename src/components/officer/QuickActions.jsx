import React from 'react';
import {
  UserPlus,
  Building,
  CalendarPlus,
  FileSpreadsheet,
  ArrowRight,
  Zap
} from 'lucide-react';

export default function QuickActions({
  onAddStudent,
  onAddRecruiter,
  onCreateDrive,
  onGenerateReport
}) {
  const actions = [
    {
      title: '+ Add Student',
      subtitle: 'Enroll student profile & calculate ATS readiness',
      icon: UserPlus,
      onClick: onAddStudent,
      color: '#3978F6',
      bg: '#EEF4FF'
    },
    {
      title: '+ Add Recruiter',
      subtitle: 'Register corporate hiring partner & JD slots',
      icon: Building,
      onClick: onAddRecruiter,
      color: '#8B5CF6',
      bg: '#F5F3FF'
    },
    {
      title: '+ Create Drive',
      subtitle: 'Publish on-campus or virtual recruitment slot',
      icon: CalendarPlus,
      onClick: onCreateDrive,
      color: '#0E8EA8',
      bg: '#EBF9FD'
    },
    {
      title: 'Generate Report',
      subtitle: 'Export institutional placement audit & metrics',
      icon: FileSpreadsheet,
      onClick: onGenerateReport,
      color: '#10B981',
      bg: '#ECFDF5'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.04)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#FFFBEB',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Zap size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Quick Actions
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
              Common placement officer administrative workflows
            </p>
          </div>
        </div>
      </div>

      {/* 4 Large Action Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '14px'
        }}
      >
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.title}
              onClick={act.onClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                borderRadius: '14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                width: '100%'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = act.color;
                e.currentTarget.style.boxShadow = '0 8px 20px -4px rgba(16, 27, 54, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: act.bg,
                  color: act.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', lineHeight: 1.2 }}>
                  {act.title}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '3px', lineHeight: 1.3 }}>
                  {act.subtitle}
                </div>
              </div>
              <ArrowRight size={15} style={{ color: '#94A3B8' }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
