import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Briefcase,
  Award,
  CheckCircle2,
  Users,
  Compass,
  Cpu,
  BarChart3,
  Building2,
  Flame,
  Check,
  CalendarCheck,
  Filter,
  Clock,
  Zap,
  MapPin
} from 'lucide-react';

export default function HeroSection({ onExploreClick }) {
  const [activeTab, setActiveTab] = useState('scheduler'); // 'scheduler' | 'shortlist' | 'fit' | 'match'
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        paddingTop: '64px',
        paddingBottom: '100px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #F8FAFD 0%, #EFF5FF 60%, #F8FAFD 100%)'
      }}
    >
      {/* Decorative ambient background mesh */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(57, 120, 246, 0.12) 0%, rgba(54, 197, 232, 0.05) 50%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-8%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(54, 197, 232, 0.1) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            gap: '56px',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Headlines & Call to Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* National Hackathon / 10-Layer Live Badge */}
            <div style={{ display: 'inline-flex' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(57, 120, 246, 0.3)',
                  boxShadow: '0 2px 10px rgba(57, 120, 246, 0.1)'
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#EEF4FE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3978F6'
                  }}
                >
                  <Sparkles size={12} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36', letterSpacing: '-0.01em' }}>
                  Next-Gen Placement OS
                </span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB' }}>
                  10 Operational Layers Live
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(36px, 4.5vw, 54px)',
                lineHeight: 1.14,
                fontWeight: 800,
                color: '#101B36',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.035em'
              }}
            >
              Your Campus. <br />
              Your Career. <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #101B36 0%, #3978F6 50%, #36C5E8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                One Intelligent Platform.
              </span>
            </h1>

            {/* Supporting Text */}
            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: '#475569',
                maxWidth: '540px'
              }}
            >
              From student readiness and ATS resume parsing to AI matching, smart shortlists, and <strong>conflict-aware placement drive scheduling</strong>—CampusCore unites universities, students, and recruiters.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '8px'
              }}
            >
              <Link
                to="/register"
                className="btn btn-primary btn-lg"
                style={{
                  boxShadow: '0 12px 24px -6px rgba(57, 120, 246, 0.45)',
                  minWidth: '140px'
                }}
              >
                <span>Get Started</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/officer/scheduling"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)',
                  transition: 'all 0.2s ease'
                }}
              >
                <CalendarCheck size={18} />
                <span>Layer 10 Scheduler</span>
              </Link>

              <Link
                to="/recruiter/jobs/JOB-2027-001/matching"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#7C3AED',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px -4px rgba(124, 58, 237, 0.4)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Sparkles size={18} />
                <span>AI Talent Engine</span>
              </Link>

              <button
                onClick={() => {
                  const el = document.getElementById('layer10-scheduler');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else if (onExploreClick) onExploreClick();
                }}
                className="btn btn-secondary btn-lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  color: '#101B36',
                  minWidth: '140px'
                }}
              >
                <Compass size={18} style={{ color: '#3978F6' }} />
                <span>Explore L10</span>
              </button>
            </div>

            {/* Quick Feature Badges */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(226, 232, 240, 0.8)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#475569' }}>
                <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                <span>Zero Interview Collisions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#475569' }}>
                <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                <span>Multi-Round Prerequisites</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#475569' }}>
                <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                <span>1-Click Slot Reallocation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Dashboard Preview with Floating Cards */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              margin: '0 auto'
            }}
          >
            {/* FLOATING CARD 1: "0 Conflicts • Conflict-Free" (Top Left) */}
            <div
              style={{
                position: 'absolute',
                top: '-24px',
                left: '-24px',
                zIndex: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '12px 18px',
                boxShadow: '0 16px 32px -4px rgba(16, 27, 54, 0.12), 0 4px 10px rgba(57, 120, 246, 0.08)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'floatSlow 4.5s ease-in-out infinite'
              }}
              className="floating-card-1"
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 6px 12px rgba(16, 185, 129, 0.3)'
                }}
              >
                <CalendarCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                  0 Drive Collisions
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>386 Candidates</span> • <span style={{ color: '#10B981', fontWeight: 600 }}>96% Health</span>
                </div>
              </div>
            </div>

            {/* FLOATING CARD 2: "Layer 10 Live" (Top Right) */}
            <div
              style={{
                position: 'absolute',
                top: '40px',
                right: '-28px',
                zIndex: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: '0 16px 32px -4px rgba(16, 27, 54, 0.12), 0 4px 10px rgba(57, 120, 246, 0.08)',
                border: '1px solid rgba(57, 120, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'floatCardAlt 5s ease-in-out infinite'
              }}
              className="floating-card-2"
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563EB'
                }}
              >
                <Zap size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                    Layer 10 Active
                  </span>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB',
                      padding: '2px 5px',
                      borderRadius: '4px',
                      border: '1px solid #BFDBFE'
                    }}
                  >
                    SCHEDULER
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  TechNova, Infosys, Deloitte
                </div>
              </div>
            </div>

            {/* FLOATING CARD 3: "Offer Received!" (Bottom Right) */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '12px',
                zIndex: 20,
                backgroundColor: '#101B36',
                color: '#FFFFFF',
                borderRadius: '16px',
                padding: '12px 18px',
                boxShadow: '0 20px 40px -8px rgba(16, 27, 54, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'floatSlow 4s ease-in-out infinite 1s'
              }}
              className="floating-card-3"
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Award size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Offer Received! 🎉
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                  Rahul Kumar • TechNova SDE I
                </div>
              </div>
            </div>

            {/* Main Interactive Animated Dashboard Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                boxShadow: '0 25px 60px -15px rgba(16, 27, 54, 0.14), 0 0 0 1px rgba(226, 232, 240, 0.8)',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #E2E8F0'
              }}
            >
              {/* Dashboard Top Application Bar */}
              <div
                style={{
                  padding: '14px 20px',
                  backgroundColor: '#101B36',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', marginLeft: '8px' }}>
                    CampusCore Placement OS • Layer 10
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: 'rgba(57, 120, 246, 0.25)',
                      color: '#93C5FD',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    LIVE DEMO
                  </span>
                </div>
              </div>

              {/* Interactive Layer Tab Switcher inside the Hero Card */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#F1F5F9',
                  padding: '4px',
                  gap: '4px',
                  borderBottom: '1px solid #E2E8F0'
                }}
              >
                {[
                  { id: 'scheduler', label: 'L10 Scheduler', icon: CalendarCheck, color: '#2563EB' },
                  { id: 'shortlist', label: 'L9 Shortlist', icon: Filter, color: '#059669' },
                  { id: 'fit', label: 'L8 Fit Score', icon: Cpu, color: '#7C3AED' },
                  { id: 'match', label: 'L7 Match', icon: Sparkles, color: '#3978F6' }
                ].map((t) => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '8px 4px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                        color: isActive ? t.color : '#64748B',
                        fontSize: '11.5px',
                        fontWeight: isActive ? 800 : 600,
                        cursor: 'pointer',
                        boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Icon size={13} />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dashboard Body Preview */}
              <div style={{ padding: '20px' }}>
                {/* TAB 1: LAYER 10 SCHEDULER */}
                {activeTab === 'scheduler' && (
                  <div>
                    {/* Header stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
                      <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#F8FAFD', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Scheduled</div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#101B36' }}>386 Slots</div>
                      </div>
                      <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#F8FAFD', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Conflicts</div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>0 Active</div>
                      </div>
                      <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                        <div style={{ fontSize: '11px', color: '#2563EB', fontWeight: 700 }}>Health</div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563EB' }}>96% Optimal</div>
                      </div>
                    </div>

                    {/* Today's Schedule Timeline Preview */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={14} color="#2563EB" />
                          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#101B36' }}>Rahul Kumar</span>
                          <span style={{ fontSize: '11px', color: '#64748B' }}>TechNova Technical Interview</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB' }}>10:00 AM • Turing Lab</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={14} color="#64748B" />
                          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#101B36' }}>Priya Sharma</span>
                          <span style={{ fontSize: '11px', color: '#64748B' }}>Infosys Coding Assessment</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>11:30 AM • Lab 201</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '10px', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={14} color="#B45309" />
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#92400E' }}>Lunch Break Protected</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#B45309' }}>01:00 PM – 02:00 PM</span>
                      </div>
                    </div>

                    <div
                      onClick={() => navigate('/officer/scheduling')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: '#101B36',
                        color: '#FFFFFF',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <CalendarCheck size={14} />
                      <span>Open Full Scheduling Command Center</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                )}

                {/* TAB 2: LAYER 9 SMART SHORTLISTING */}
                {activeTab === 'shortlist' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#101B36' }}>Decision Engine Cutoffs</span>
                      <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>42 Candidates Shortlisted</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                      <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#065F46' }}>Tier 1: Top 5% Elite Match</div>
                          <div style={{ fontSize: '11px', color: '#047857' }}>Rahul Kumar (94%), Sneha Patel (91%)</div>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#047857', backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: '6px' }}>12 Placed</span>
                      </div>

                      <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E40AF' }}>Tier 2: Strong Candidate Pool</div>
                          <div style={{ fontSize: '11px', color: '#1D4ED8' }}>Fit Score ≥ 80% • CGPA ≥ 7.5</div>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#1E40AF', backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: '6px' }}>30 Verified</span>
                      </div>
                    </div>

                    <div
                      onClick={() => navigate('/recruiter/jobs/JOB-2027-001/shortlisting')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: '#059669',
                        color: '#FFFFFF',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <Filter size={14} />
                      <span>View Smart Shortlisting Dashboard</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                )}

                {/* TAB 3: LAYER 8 EXPLAINABLE FIT */}
                {activeTab === 'fit' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#101B36' }}>Rahul Kumar (SDE I Fit Breakdown)</span>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#7C3AED' }}>91% Overall</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '14px' }}>
                      <div style={{ padding: '8px 10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>Technical Competencies</div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>96% (Strong Match)</div>
                      </div>
                      <div style={{ padding: '8px 10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>Academic CGPA (8.7)</div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>88% (Eligible)</div>
                      </div>
                      <div style={{ padding: '8px 10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>GitHub & Projects</div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>92% (High Impact)</div>
                      </div>
                      <div style={{ padding: '8px 10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>ATS Resume Quality</div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>84% (Verified)</div>
                      </div>
                    </div>

                    <div
                      onClick={() => navigate('/recruiter/jobs/JOB-2027-001/matching/CL-2027-0042')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: '#7C3AED',
                        color: '#FFFFFF',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <Cpu size={14} />
                      <span>Inspect Explainable Fit Score Dossier</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                )}

                {/* TAB 4: LAYER 7 AI MATCHING */}
                {activeTab === 'match' && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '14px' }}>
                      <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#F8FAFD', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Placement Rate</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#101B36' }}>94.8%</div>
                      </div>
                      <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#F8FAFD', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Readiness Score</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#3978F6' }}>92/100</div>
                      </div>
                    </div>

                    <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#101B36', color: '#FFFFFF', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700 }}>AI Neural Scan Match</span>
                        <span style={{ fontSize: '11px', color: '#36C5E8' }}>Live Vector Reranking</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', textAlign: 'center' }}>
                        <div style={{ padding: '6px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: '#94A3B8' }}>Technical</div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#36C5E8' }}>96%</div>
                        </div>
                        <div style={{ padding: '6px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: '#94A3B8' }}>Aptitude</div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#60A5FA' }}>91%</div>
                        </div>
                        <div style={{ padding: '6px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: '#94A3B8' }}>Comm.</div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#34D399' }}>89%</div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => navigate('/recruiter/jobs/JOB-2027-001/matching')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: '#3978F6',
                        color: '#FFFFFF',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <Sparkles size={14} />
                      <span>Launch AI Candidate Matching Matrix</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            align-items: center;
          }
          .hero-grid > div:first-child p {
            margin: 0 auto;
          }
          .hero-grid > div:first-child > div {
            justify-content: center;
          }
          .floating-card-1 {
            top: -12px !important;
            left: 0 !important;
          }
          .floating-card-2 {
            top: 20px !important;
            right: 0 !important;
          }
          .floating-card-3 {
            bottom: -10px !important;
            right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
