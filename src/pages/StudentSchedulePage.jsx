import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { getCandidateSchedule, formatTime12h } from '../services/schedulingEngine';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Building2,
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';

export default function StudentSchedulePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is a student, use their id or fallback to std-1 (Rahul Kumar) for demo purposes
  const studentId = user?.studentId || user?.id || 'std-1';
  const mySchedules = getCandidateSchedule(studentId);

  const [activeTab, setActiveTab] = useState('UPCOMING'); // 'UPCOMING', 'COMPLETED', 'CANCELLED'

  const filtered = mySchedules.filter((s) => {
    if (activeTab === 'UPCOMING') return s.status === 'Scheduled' || s.status === 'Confirmed' || s.status === 'Rescheduled';
    if (activeTab === 'COMPLETED') return s.status === 'Completed' || s.roundResult?.status === 'Passed';
    if (activeTab === 'CANCELLED') return s.status === 'Cancelled';
    return true;
  });

  return (
    <DashboardLayout roleKey="student">
      <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
        {/* Header Banner */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '26px 30px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.05)'
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#2563EB',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                padding: '3px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}
            >
              Layer 10 • Student Placement Roster
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                padding: '3px 8px',
                borderRadius: '6px'
              }}
            >
              Live Synchronized Schedule
            </span>
          </div>

          <h1
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: '#101B36',
              margin: '0 0 6px',
              fontFamily: 'var(--font-heading)'
            }}
          >
            My Placement Schedule
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
            Official recruitment rounds, assessments, and interview panel timings for {user?.name || 'Rahul Kumar'}.
          </p>
        </div>

        {/* Tab Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid #E2E8F0',
            padding: '8px 12px',
            marginBottom: '20px'
          }}
        >
          {[
            { id: 'UPCOMING', label: 'Upcoming Interviews' },
            { id: 'COMPLETED', label: 'Completed Rounds' },
            { id: 'CANCELLED', label: 'Cancelled / Modified' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: activeTab === tab.id ? '#2563EB' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : '#64748B',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Schedule Cards List */}
        {filtered.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              textAlign: 'center'
            }}
          >
            <Clock size={36} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
              No {activeTab.toLowerCase()} interviews found
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              You will automatically see scheduled interview sessions here when corporate drives allocate slots.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map((item) => {
              const isToday = item.date === '2026-10-15';

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '18px',
                    border: '1.5px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px'
                  }}
                >
                  {/* Left Company & Round Details */}
                  <div style={{ flex: '1 1 320px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          backgroundColor: '#101B36',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {item.companyName?.slice(0, 3).toUpperCase() || 'JOB'}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                          {item.companyName || 'Corporate Drive'}
                        </h3>
                        <div style={{ fontSize: '13px', color: '#2563EB', fontWeight: 700 }}>
                          {item.jobTitle || 'Software Engineer'}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', marginTop: '12px' }}>
                      {item.roundName || 'Technical Interview'}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px', fontSize: '13px', color: '#475569' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} color="#2563EB" />
                        <span>
                          <strong>{item.date}</strong> at <strong>{formatTime12h(item.startTime)}</strong> ({item.duration || 30} mins)
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {item.mode === 'Online' ? <Video size={14} color="#2563EB" /> : <MapPin size={14} color="#059669" />}
                        <span>
                          {item.mode === 'Online'
                            ? 'Virtual Video Interview'
                            : `${item.roomName || 'Room A101'}, Main Academic Block`}
                        </span>
                      </div>

                      <div style={{ fontSize: '12px', color: '#64748B' }}>
                        Interviewer Panel: {item.interviewerNames?.[0] || 'Senior Engineering Panel'}
                      </div>
                    </div>
                  </div>

                  {/* Right Countdown & Join Actions */}
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 800,
                        color: isToday ? '#DC2626' : '#2563EB',
                        backgroundColor: isToday ? '#FEF2F2' : '#EFF6FF',
                        border: `1px solid ${isToday ? '#FECACA' : '#BFDBFE'}`,
                        padding: '4px 12px',
                        borderRadius: '999px'
                      }}
                    >
                      {isToday ? '● Today at ' + formatTime12h(item.startTime) : 'Starts in 2 days'}
                    </span>

                    {item.meetingLink ? (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#2563EB',
                          color: '#FFFFFF',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)'
                        }}
                      >
                        <Video size={15} />
                        <span>Join Interview</span>
                      </a>
                    ) : (
                      <div
                        style={{
                          padding: '10px 16px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          borderRadius: '10px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: '#334155'
                        }}
                      >
                        Physical Venue: {item.roomName?.split('(')[0] || 'Room A101'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
