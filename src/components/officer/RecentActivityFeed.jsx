import React, { useState } from 'react';
import {
  Activity,
  Award,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Users,
  Clock,
  ArrowRight
} from 'lucide-react';
import { RECENT_ACTIVITIES } from '../../data/analytics';

export default function RecentActivityFeed({ onActivityClick }) {
  const [filterType, setFilterType] = useState('all');

  const filteredActivities =
    filterType === 'all'
      ? RECENT_ACTIVITIES
      : RECENT_ACTIVITIES.filter((a) => a.type === filterType);

  const getIcon = (type) => {
    switch (type) {
      case 'offer':
        return <Award size={15} style={{ color: '#10B981' }} />;
      case 'drive':
        return <Calendar size={15} style={{ color: '#3978F6' }} />;
      case 'assessment':
        return <CheckCircle2 size={15} style={{ color: '#8B5CF6' }} />;
      case 'alert':
        return <AlertTriangle size={15} style={{ color: '#F59E0B' }} />;
      case 'shortlist':
        return <Users size={15} style={{ color: '#0E8EA8' }} />;
      default:
        return <Activity size={15} style={{ color: '#3978F6' }} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#ECFDF5',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Activity size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Recent Activity
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0' }}>
              Live placement stream and candidate status updates
            </p>
          </div>
        </div>

        {/* Live Pulse Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11.5px',
            color: '#059669',
            fontWeight: 700,
            backgroundColor: '#ECFDF5',
            padding: '3px 8px',
            borderRadius: '999px',
            border: '1px solid #A7F3D0'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10B981'
            }}
            className="pulse-dot"
          />
          <span>LIVE</span>
        </div>
      </div>

      {/* Filter Chips */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '16px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}
      >
        {[
          { key: 'all', label: 'All Events' },
          { key: 'offer', label: 'Offers' },
          { key: 'drive', label: 'Drives' },
          { key: 'assessment', label: 'Assessments' },
          { key: 'alert', label: 'Alerts' }
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilterType(f.key)}
            style={{
              padding: '4px 10px',
              fontSize: '11.5px',
              fontWeight: 600,
              borderRadius: '6px',
              border: '1px solid',
              borderColor: filterType === f.key ? '#3978F6' : '#E2E8F0',
              backgroundColor: filterType === f.key ? '#EEF4FF' : '#FFFFFF',
              color: filterType === f.key ? '#3978F6' : '#64748B',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Scrollable Feed List */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          maxHeight: '340px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingRight: '4px'
        }}
        className="custom-scrollbar"
      >
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            onClick={() => onActivityClick && onActivityClick(act)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 27, 54, 0.05)';
              e.currentTarget.style.borderColor = '#CBD5E1';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
          >
            {/* Left Status Dot / Icon Container */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}
            >
              {getIcon(act.type)}
            </div>

            {/* Middle Content */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#101B36',
                  lineHeight: 1.3
                }}
              >
                {act.text}
              </div>

              {act.details && (
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                  {act.details}
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '5px',
                  fontSize: '11px',
                  color: '#94A3B8'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Clock size={11} />
                  <span>{act.time}</span>
                </span>
                <span>•</span>
                <span
                  style={{
                    fontWeight: 600,
                    color: act.dotColor
                  }}
                >
                  {act.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
