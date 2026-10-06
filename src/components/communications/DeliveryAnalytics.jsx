import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Mail,
  Bell,
  Smartphone,
  MessageCircle,
  Users,
  ShieldCheck,
  Info
} from 'lucide-react';

export default function DeliveryAnalytics({ stats }) {
  const metrics = [
    {
      title: 'Messages Sent',
      value: '2,486',
      subtext: '+342 this week across drives',
      color: '#2563EB',
      bg: '#EFF6FF',
      icon: TrendingUp
    },
    {
      title: 'Delivery Rate',
      value: '97.4%',
      subtext: 'Optimal network reach',
      color: '#10B981',
      bg: '#ECFDF5',
      icon: CheckCircle2
    },
    {
      title: 'Read Rate',
      value: '84.2%',
      subtext: 'Candidate open acknowledgment',
      color: '#7C3AED',
      bg: '#F5F3FF',
      icon: Users
    },
    {
      title: 'Avg. Response Time',
      value: '18 min',
      subtext: 'Student acknowledgment velocity',
      color: '#0E8EA8',
      bg: '#EBF9FD',
      icon: Clock
    }
  ];

  const channelPerformance = [
    {
      name: 'In-App Placement Notifications',
      status: 'Live & Operational',
      rate: 97.8,
      delivered: '2,421 / 2,486',
      readRate: 88.4,
      color: '#10B981'
    },
    {
      name: 'Corporate Email Gateway (Simulated)',
      status: 'Simulated Dispatch',
      rate: 94.2,
      delivered: '2,280 / 2,421',
      readRate: 79.1,
      color: '#2563EB'
    },
    {
      name: 'SMS Mobile Gateway (Demo Planned)',
      status: 'Carrier Integration Required',
      rate: 0,
      delivered: '0 (Planned)',
      readRate: 0,
      color: '#D97706'
    },
    {
      name: 'WhatsApp Business API (Demo Planned)',
      status: 'Meta Cloud API Required',
      rate: 0,
      delivered: '0 (Planned)',
      readRate: 0,
      color: '#059669'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 4px 14px rgba(16, 27, 54, 0.04)'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
          Placement Communication & Delivery Analytics
        </h3>
        <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
          Real-time metrics on candidate engagement, notification open rates, and channel delivery reliability.
        </p>
      </div>

      {/* 4 KPI Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.title}
              style={{
                padding: '18px',
                borderRadius: '14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>{m.title}</span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: m.bg,
                    color: m.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#101B36', fontFamily: 'var(--font-heading)' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                {m.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Channel Reliability Bars */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            Channel Reliability & Delivery Status
          </h4>
          <span style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Info size={12} color="#2563EB" />
            <span>Simulated delivery indicators active for external channels</span>
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {channelPerformance.map((ch) => (
            <div
              key={ch.name}
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>{ch.name}</span>
                  <span style={{ fontSize: '11px', color: '#64748B', marginLeft: '8px' }}>({ch.status})</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: ch.color }}>
                    {ch.rate > 0 ? `${ch.rate}% Success` : 'Integration Required'}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748B', marginLeft: '8px' }}>
                    {ch.delivered}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '7px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${ch.rate}%`,
                    height: '100%',
                    backgroundColor: ch.color,
                    borderRadius: '999px',
                    transition: 'width 0.6s ease'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcement Engagement Highlight */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '12px',
          backgroundColor: '#F0FDF4',
          border: '1.5px solid #86EFAC',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#065F46' }}>
              TechNova Interview Guidelines Broadcast
            </div>
            <div style={{ fontSize: '12px', color: '#047857' }}>
              125 Candidates • 109 Acknowledged within 45 mins • <strong>87.2% Read Rate</strong>
            </div>
          </div>
        </div>

        <span
          style={{
            fontSize: '11.5px',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: '999px',
            backgroundColor: '#FFFFFF',
            color: '#059669',
            border: '1px solid #A7F3D0'
          }}
        >
          High Engagement Threshold Met
        </span>
      </div>
    </div>
  );
}
