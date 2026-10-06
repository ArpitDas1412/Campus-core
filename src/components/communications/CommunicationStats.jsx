import React from 'react';
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Mail,
  Bell,
  Smartphone,
  Send,
  MessageCircle,
  TrendingUp,
  Info
} from 'lucide-react';

export default function CommunicationStats({ stats }) {
  const kpis = [
    {
      label: 'Total Messages',
      value: stats?.totalMessages || 2486,
      sublabel: 'Across all cohorts & drives',
      icon: MessageSquare,
      color: '#3978F6',
      bg: '#EEF4FF',
      border: '#C7D2FE'
    },
    {
      label: 'Delivered',
      value: stats?.delivered || 2421,
      sublabel: '97.4% delivery rate',
      icon: CheckCircle2,
      color: '#10B981',
      bg: '#ECFDF5',
      border: '#A7F3D0'
    },
    {
      label: 'Pending',
      value: stats?.pending || 42,
      sublabel: 'In scheduled dispatch queue',
      icon: Clock,
      color: '#F59E0B',
      bg: '#FFFBEB',
      border: '#FCD34D'
    },
    {
      label: 'Failed',
      value: stats?.failed || 23,
      sublabel: 'Simulated delivery exceptions',
      icon: AlertTriangle,
      color: '#EF4444',
      bg: '#FEF2F2',
      border: '#FCA5A5'
    },
    {
      label: 'Unread Messages',
      value: stats?.unread || 186,
      sublabel: 'Student response queue',
      icon: Mail,
      color: '#8B5CF6',
      bg: '#F5F3FF',
      border: '#DDD6FE'
    },
    {
      label: 'Active Announcements',
      value: stats?.activeAnnouncements || 8,
      sublabel: 'Published across campus',
      icon: Bell,
      color: '#0E8EA8',
      bg: '#EBF9FD',
      border: '#BAE6FD'
    }
  ];

  const channels = [
    {
      name: 'In-App Notifications',
      status: 'Live & Operational',
      rate: '97.8% Delivery',
      icon: Bell,
      color: '#10B981',
      bg: '#ECFDF5',
      note: 'Instant banner & modal delivery'
    },
    {
      name: 'Corporate Email Gateway',
      status: 'Simulated Delivery',
      rate: '94.2% Simulated',
      icon: Mail,
      color: '#2563EB',
      bg: '#EFF6FF',
      note: 'Simulated SMTP dispatch for demo'
    },
    {
      name: 'SMS Mobile Gateway',
      status: 'Integration Ready',
      rate: 'Planned Channel',
      icon: Smartphone,
      color: '#D97706',
      bg: '#FFFBEB',
      note: 'External carrier connection required'
    },
    {
      name: 'WhatsApp Business API',
      status: 'Integration Ready',
      rate: 'Planned Channel',
      icon: MessageCircle,
      color: '#059669',
      bg: '#ECFDF5',
      note: 'Meta Cloud API connection required'
    }
  ];

  return (
    <div style={{ marginBottom: '28px' }}>
      {/* 6 KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '14px',
          marginBottom: '20px'
        }}
      >
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #E2E8F0',
                padding: '18px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(16, 27, 54, 0.03)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>
                  {kpi.label}
                </span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: kpi.bg,
                    color: kpi.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>

              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', fontFamily: 'var(--font-heading)' }}>
                  {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  {kpi.sublabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Channel Capabilities Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px solid #E2E8F0',
          padding: '18px 20px',
          boxShadow: '0 2px 6px rgba(16, 27, 54, 0.03)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#101B36', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Multi-Channel Dispatch Network
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE'
              }}
            >
              Hybrid Engine
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#64748B' }}>
            <Info size={13} color="#2563EB" />
            <span>External gateways use simulated delivery in demo mode</span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '12px'
          }}
        >
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <div
                key={ch.name}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: ch.bg,
                    color: ch.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={18} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#101B36', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ch.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        color: ch.color
                      }}
                    >
                      {ch.status}
                    </span>
                    <span style={{ fontSize: '10px', color: '#CBD5E1' }}>•</span>
                    <span style={{ fontSize: '10.5px', color: '#64748B' }}>{ch.rate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
