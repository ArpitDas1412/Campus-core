import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
  RotateCcw,
  Check,
  Flame,
  LayoutDashboard,
  Video,
  MapPin,
  Calendar
} from 'lucide-react';

export default function Layer10ShowcaseSection() {
  const navigate = useNavigate();

  // Interactive Conflict Sandbox State
  const [hasResolved, setHasResolved] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [activeTab, setActiveTab] = useState('sandbox'); // 'sandbox' | 'dimensions' | 'portals'

  const handleResolve = () => {
    setIsResolving(true);
    setTimeout(() => {
      setIsResolving(false);
      setHasResolved(true);
    }, 700);
  };

  const handleReset = () => {
    setHasResolved(false);
  };

  const conflictDimensions = [
    {
      title: 'Candidate Double-Booking',
      severity: 'Critical Collision',
      color: '#EF4444',
      bg: '#FEF2F2',
      border: '#FCA5A5',
      desc: 'Prevents students from being scheduled for simultaneous rounds across concurrent drives (e.g. TechNova vs Infosys).'
    },
    {
      title: 'Interviewer Overload & Fatigue',
      severity: 'Capacity Limit',
      color: '#F59E0B',
      bg: '#FFFBEB',
      border: '#FCD34D',
      desc: 'Enforces maximum daily interview quotas (e.g. max 8–10 slots/day) and flags interviewer fatigue when load exceeds 85%.'
    },
    {
      title: 'Physical Room Double-Booking',
      severity: 'Facility Collision',
      color: '#EF4444',
      bg: '#FEF2F2',
      border: '#FCA5A5',
      desc: 'Tracks physical venue allotments across CS Labs, Turing Suites, and Boardrooms, preventing two panels in one room.'
    },
    {
      title: 'Prerequisite Dependencies',
      severity: 'Sequencing Guard',
      color: '#8B5CF6',
      bg: '#F5F3FF',
      border: '#DDD6FE',
      desc: 'Enforces strict round progression. Ensures Technical Interview cannot begin until Coding Test evaluation is marked "Passed".'
    },
    {
      title: 'Institutional Break Clashes',
      severity: 'Time Protection',
      color: '#0E8EA8',
      bg: '#EBF9FD',
      border: '#BAE6FD',
      desc: 'Automatically reserves campus-wide break windows (13:00–14:00 Lunch Break) and enforces 10-minute panel buffer rest times.'
    },
    {
      title: 'Room & Virtual Link Capacity',
      severity: 'Capacity Guard',
      color: '#10B981',
      bg: '#ECFDF5',
      border: '#A7F3D0',
      desc: 'Guarantees interview rooms and virtual conference URLs have verified connectivity and match seat allocations.'
    }
  ];

  const portals = [
    {
      role: 'Placement Officer',
      badge: 'Command Center',
      title: 'Drive Scheduling Dashboard',
      route: '/officer/scheduling',
      desc: 'Full campus visibility: Gantt timeline (09:00–17:00), 5-way calendar views, multi-drive collision radar, and 1-click alternative reallocation.',
      icon: LayoutDashboard,
      color: '#2563EB',
      bg: '#EFF6FF',
      action: 'Launch Officer Dashboard'
    },
    {
      role: 'Corporate Recruiter',
      badge: 'Interview Portal',
      title: 'Recruiter Interview Hub',
      route: '/recruiter/interviews',
      desc: 'Real-time candidate 360° dossiers (CGPA, L8 Fit Score, L5 ATS Resume), instant Google Meet links, attendance marking & score evaluation.',
      icon: Users,
      color: '#7C3AED',
      bg: '#F5F3FF',
      action: 'Launch Recruiter Portal'
    },
    {
      role: 'Final Year Student',
      badge: 'Candidate Portal',
      title: 'My Interview Schedule',
      route: '/student/schedule',
      desc: 'Personalized timeline with live round countdowns, venue directions, panel credentials, reporting guidelines, and reschedule requests.',
      icon: CalendarCheck,
      color: '#059669',
      bg: '#ECFDF5',
      action: 'Launch Student Portal'
    }
  ];

  return (
    <section
      id="layer10-scheduler"
      style={{
        paddingTop: '80px',
        paddingBottom: '90px',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #EFF6FF 100%)',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: '#EFF6FF',
              border: '1.5px solid #BFDBFE',
              color: '#2563EB',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '14px'
            }}
          >
            <Sparkles size={14} />
            <span>Layer 10 Operational Spotlight</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
            <span>Conflict-Aware Placement Engine</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 800,
              color: '#101B36',
              margin: '0 0 16px',
              letterSpacing: '-0.025em',
              lineHeight: 1.2
            }}
          >
            Zero-Collision Placement Drive Scheduler &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Interview Management
            </span>
          </h2>

          <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
            Layer 10 automates placement interview schedules across multiple concurrent corporate drives, eliminating candidate double-booking, panel fatigue, and room clashes with 1-click deterministic reallocation.
          </p>

          {/* KPI Metrics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              marginTop: '32px',
              padding: '16px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 12px rgba(16, 27, 54, 0.04)'
            }}
          >
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#101B36' }}>12</div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Active Drives</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#2563EB' }}>386</div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Scheduled Slots</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#059669' }}>
                {hasResolved ? '100%' : '96%'}
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Schedule Health</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: hasResolved ? '#059669' : '#EF4444' }}>
                {hasResolved ? '0' : '1'}
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Active Conflicts</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#7C3AED' }}>8 Panels</div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Fatigue Guarded</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0E8EA8' }}>9 Suites</div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Physical & Virtual</div>
            </div>
          </div>
        </div>

        {/* View Switcher Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          <button
            onClick={() => setActiveTab('sandbox')}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              border: activeTab === 'sandbox' ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
              backgroundColor: activeTab === 'sandbox' ? '#EFF6FF' : '#FFFFFF',
              color: activeTab === 'sandbox' ? '#2563EB' : '#475569',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Zap size={15} />
            <span>Interactive Conflict Sandbox</span>
          </button>
          <button
            onClick={() => setActiveTab('dimensions')}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              border: activeTab === 'dimensions' ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
              backgroundColor: activeTab === 'dimensions' ? '#EFF6FF' : '#FFFFFF',
              color: activeTab === 'dimensions' ? '#2563EB' : '#475569',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShieldCheck size={15} />
            <span>6-Dimensional Collision Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('portals')}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              border: activeTab === 'portals' ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
              backgroundColor: activeTab === 'portals' ? '#EFF6FF' : '#FFFFFF',
              color: activeTab === 'portals' ? '#2563EB' : '#475569',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users size={15} />
            <span>Role Portals Triad</span>
          </button>
        </div>

        {/* TAB 1: INTERACTIVE CONFLICT RESOLUTION SANDBOX */}
        {activeTab === 'sandbox' && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid #E2E8F0',
              padding: '32px',
              boxShadow: '0 16px 36px -8px rgba(16, 27, 54, 0.08)',
              maxWidth: '960px',
              margin: '0 auto'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Live Interactive Demonstration
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
                  Simulated Placement Collision & 1-Click Auto-Resolution
                </h3>
              </div>

              {hasResolved && (
                <button
                  onClick={handleReset}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#64748B',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Re-inject Conflict</span>
                </button>
              )}
            </div>

            {/* Sandbox Simulation Body */}
            {!hasResolved ? (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1.5px solid #FCA5A5',
                  borderRadius: '16px',
                  padding: '24px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <AlertTriangle size={22} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 800, backgroundColor: '#EF4444', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px' }}>
                        CRITICAL COLLISION DETECTED
                      </span>
                      <span style={{ fontSize: '12px', color: '#991B1B', fontWeight: 700 }}>
                        Candidate Double-Booking
                      </span>
                    </div>

                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginBottom: '4px' }}>
                      Rahul Kumar (Roll: 2023CS0104) is scheduled for two concurrent drives!
                    </div>

                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '0 0 16px' }}>
                      Simultaneous interviews scheduled on <strong>2026-10-15 at 10:00 AM</strong>:
                      <br />• <strong>TechNova Solutions</strong>: Technical Interview (Room: Turing Lab A, Panel: Rahul Mehta)
                      <br />• <strong>Infosys</strong>: Coding Round Assessment (Room: Main Lab 201)
                    </p>

                    {/* AI Alternative Recommendation Box */}
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1.5px solid #60A5FA',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '16px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            backgroundColor: '#EFF6FF',
                            color: '#2563EB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
                            Engine Recommended Conflict-Free Slot
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                            Oct 15, 2026 at 11:30 AM — Turing Lab A (30 mins)
                          </div>
                          <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>
                            ✓ 0 Candidate Clashes • ✓ Panel Available • ✓ Room Free • ✓ Break Compliant
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleResolve}
                        disabled={isResolving}
                        style={{
                          backgroundColor: '#2563EB',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '10px 18px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: isResolving ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                        }}
                      >
                        {isResolving ? (
                          <span>Reallocating...</span>
                        ) : (
                          <>
                            <Zap size={15} />
                            <span>1-Click Apply Alternative</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div style={{ fontSize: '12px', color: '#7F1D1D' }}>
                      Deterministic Engine scans all 6 dimensions across candidate, room, panel capacity, and breaks.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: '#ECFDF5',
                  border: '1.5px solid #6EE7B7',
                  borderRadius: '16px',
                  padding: '24px',
                  animation: 'fadeIn 0.4s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <CheckCircle2 size={24} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 800, backgroundColor: '#10B981', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px' }}>
                        CONFLICT RESOLVED DETERMINISTICALLY
                      </span>
                      <span style={{ fontSize: '12px', color: '#047857', fontWeight: 700 }}>
                        Schedule Health: 100%
                      </span>
                    </div>

                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                      Rahul Kumar successfully rescheduled to Oct 15 at 11:30 AM!
                    </div>

                    <p style={{ fontSize: '13px', color: '#065F46', lineHeight: 1.5, margin: '0 0 16px' }}>
                      The old slot (10:00 AM) was safely de-allocated, avoiding collision with Infosys. TechNova interview panel (Rahul Mehta) and Turing Lab A have been locked for the new conflict-free slot. Audit log recorded and notification event queued for Layer 11!
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      <button
                        onClick={() => navigate('/officer/scheduling/JOB-2027-TNS')}
                        style={{
                          backgroundColor: '#101B36',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '10px 18px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Open TechNova Drive Schedule</span>
                        <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => navigate('/student/schedule')}
                        style={{
                          backgroundColor: '#FFFFFF',
                          color: '#059669',
                          border: '1.5px solid #10B981',
                          padding: '10px 18px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>View in Student Portal</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: 6-DIMENSIONAL COLLISION MATRIX */}
        {activeTab === 'dimensions' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              maxWidth: '1040px',
              margin: '0 auto'
            }}
          >
            {conflictDimensions.map((dim, idx) => (
              <div
                key={dim.title}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: `1.5px solid ${dim.border}`,
                  padding: '20px',
                  boxShadow: '0 4px 12px rgba(16, 27, 54, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 800,
                        backgroundColor: dim.bg,
                        color: dim.color,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: `1px solid ${dim.border}`
                      }}
                    >
                      {dim.severity}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>
                      Dimension 0{idx + 1}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: '0 0 8px' }}>
                    {dim.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                    {dim.desc}
                  </p>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>
                  <Check size={14} />
                  <span>Real-time constraint active</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: THREE-PORTAL ECOSYSTEM */}
        {activeTab === 'portals' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              maxWidth: '1040px',
              margin: '0 auto'
            }}
          >
            {portals.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.role}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1.5px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 8px 24px -4px rgba(16, 27, 54, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          backgroundColor: p.bg,
                          color: p.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icon size={22} />
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          backgroundColor: p.bg,
                          color: p.color,
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {p.badge}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 700, color: p.color, textTransform: 'uppercase' }}>
                      {p.role}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '4px 0 10px' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.55, margin: 0 }}>
                      {p.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(p.route)}
                    style={{
                      marginTop: '20px',
                      backgroundColor: p.color,
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '11px 16px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: `0 4px 14px ${p.color}40`,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{p.action}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Global Bottom CTA Row */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/officer/scheduling')}
              className="btn btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 700,
                borderRadius: '10px',
                boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)'
              }}
            >
              <CalendarCheck size={17} />
              <span>Explore Officer Scheduling Command Center</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/officer/scheduling/JOB-2027-TNS')}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#101B36',
                border: '1.5px solid #CBD5E1',
                padding: '12px 22px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Zap size={16} color="#F59E0B" />
              <span>Live TechNova Schedule & Conflict Sandbox</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
