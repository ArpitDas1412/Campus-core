import React, { useState } from 'react';
import {
  Users,
  DoorOpen,
  Video,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Layers,
  MapPin
} from 'lucide-react';
import { DEFAULT_INTERVIEWERS, DEFAULT_ROOMS } from '../../data/schedulingConfig';

export default function ResourcePanel({ schedules = [] }) {
  const [activeTab, setActiveTab] = useState('INTERVIEWERS'); // 'INTERVIEWERS', 'ROOMS', 'PANELS'

  const interviewers = DEFAULT_INTERVIEWERS;
  const offlineRooms = DEFAULT_ROOMS.filter((r) => r.type === 'Offline');
  const onlinePanels = DEFAULT_ROOMS.filter((r) => r.type === 'Online');

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
      {/* Header & Tabs */}
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
            Resource Allocation & Capacity Monitor
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Manage interviewer panels, physical rooms, and virtual meeting rooms
          </p>
        </div>

        {/* Tab Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F8FAFC',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            padding: '3px'
          }}
        >
          <button
            onClick={() => setActiveTab('INTERVIEWERS')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeTab === 'INTERVIEWERS' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'INTERVIEWERS' ? '#2563EB' : '#64748B',
              boxShadow: activeTab === 'INTERVIEWERS' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users size={13} />
            <span>Interviewers ({interviewers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ROOMS')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeTab === 'ROOMS' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'ROOMS' ? '#2563EB' : '#64748B',
              boxShadow: activeTab === 'ROOMS' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <DoorOpen size={13} />
            <span>Rooms ({offlineRooms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('PANELS')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeTab === 'PANELS' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'PANELS' ? '#2563EB' : '#64748B',
              boxShadow: activeTab === 'PANELS' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Video size={13} />
            <span>Online Panels ({onlinePanels.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Interviewers */}
      {activeTab === 'INTERVIEWERS' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '14px'
          }}
        >
          {interviewers.map((int) => {
            const assignedCount = schedules.filter(
              (s) => s.status !== 'Cancelled' && s.interviewerIds?.includes(int.id)
            ).length;
            const capacity = (int.dailyCapacity || 8) * 2;
            const util = Math.min(100, Math.round((assignedCount / capacity) * 100));

            return (
              <div
                key={int.id}
                style={{
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#EFF6FF',
                        color: '#2563EB',
                        fontWeight: 800,
                        fontSize: '12.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {int.avatar || int.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>{int.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{int.title}</div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: util >= 80 ? '#D97706' : '#059669',
                      backgroundColor: util >= 80 ? '#FEF3C7' : '#ECFDF5',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    {util}% Utilized
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px', color: '#64748B' }}>
                    <span>Assigned: {assignedCount} interviews</span>
                    <span>Cap: {capacity}</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${util}%`,
                        backgroundColor: util >= 80 ? '#D97706' : '#2563EB',
                        borderRadius: '999px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  <span>Available: 09:00 AM – 05:00 PM (Break 1–2 PM)</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Physical Rooms */}
      {activeTab === 'ROOMS' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '14px'
          }}
        >
          {offlineRooms.map((room) => {
            const isAvailable = room.status === 'Available';
            return (
              <div
                key={room.id}
                style={{
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>{room.name}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: isAvailable ? '#059669' : '#D97706',
                      backgroundColor: isAvailable ? '#ECFDF5' : '#FEF3C7',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    {room.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  {room.block} • {room.floor}
                </div>
                <div style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>
                  Capacity: {room.capacity} Candidates
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                  {room.equipment?.join(', ') || 'Standard Audio/Visual setup'}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Online Panels */}
      {activeTab === 'PANELS' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '14px'
          }}
        >
          {onlinePanels.map((panel) => (
            <div
              key={panel.id}
              style={{
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '16px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>{panel.name}</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#2563EB',
                    backgroundColor: '#EFF6FF',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {panel.platform}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Virtual Meeting Capacity: {panel.capacity} concurrent attendees
              </div>
              <div style={{ fontSize: '11.5px', color: '#2563EB', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {panel.defaultLink}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
