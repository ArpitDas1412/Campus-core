import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  Users,
  Target,
  FileText,
  Building2,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Filter,
  CalendarCheck,
  Zap,
  Check,
  Award,
  BarChart3
} from 'lucide-react';

export default function LiveLayersNavigator() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const layers = [
    {
      layer: 'Layer 1',
      title: 'Role Auth & Access',
      category: 'core',
      badge: 'Live',
      badgeColor: '#10B981',
      badgeBg: '#ECFDF5',
      route: '/login',
      icon: ShieldCheck,
      iconColor: '#3978F6',
      desc: '4 Isolated Role Portals (Officer, Student, Recruiter, Dean) with instant 1-click demo logins & session security.'
    },
    {
      layer: 'Layer 2',
      title: 'Officer Command Center',
      category: 'officer',
      badge: 'Live',
      badgeColor: '#10B981',
      badgeBg: '#ECFDF5',
      route: '/officer/dashboard',
      icon: LayoutDashboard,
      iconColor: '#2563EB',
      desc: 'Enterprise placement operations dashboard with institutional KPIs, at-risk detection & cohort distribution.'
    },
    {
      layer: 'Layer 3',
      title: 'Student 360° Readiness',
      category: 'student',
      badge: 'Live',
      badgeColor: '#10B981',
      badgeBg: '#ECFDF5',
      route: '/officer/students/CL-2027-0042',
      icon: Users,
      iconColor: '#8B5CF6',
      desc: 'Multi-metric student profiles (Rahul Kumar), academic transcripts, verified skills, and placement records.'
    },
    {
      layer: 'Layer 4',
      title: 'AI Skill-Gap Analyzer',
      category: 'ai',
      badge: '✦ AI Core',
      badgeColor: '#3978F6',
      badgeBg: '#EFF6FF',
      route: '/skill-gap',
      icon: Target,
      iconColor: '#0E8EA8',
      desc: 'Compares student competencies against target job roles, uncovering priority gaps, match percentages & roadmaps.'
    },
    {
      layer: 'Layer 5',
      title: 'Resume Intelligence',
      category: 'ai',
      badge: '✦ AI Core',
      badgeColor: '#3978F6',
      badgeBg: '#EFF6FF',
      route: '/officer/resume-intelligence',
      icon: FileText,
      iconColor: '#3978F6',
      desc: 'Extracts skills & projects from unstructured resumes, evaluates 82/100 ATS readiness, and syncs profiles.'
    },
    {
      layer: 'Layer 6',
      title: 'Recruiter & Company Portal',
      category: 'recruiter',
      badge: 'Live',
      badgeColor: '#10B981',
      badgeBg: '#ECFDF5',
      route: '/recruiter/dashboard',
      icon: Building2,
      iconColor: '#2563EB',
      desc: 'Corporate hiring portal: TechNova Solutions, 8-step drive creation wizard, candidate pipelines, shortlists & offers.'
    },
    {
      layer: 'Layer 7',
      title: 'AI Candidate Matching',
      category: 'ai',
      badge: '✦ AI Core',
      badgeColor: '#7C3AED',
      badgeBg: '#F5F3FF',
      route: '/recruiter/jobs/JOB-2027-001/matching',
      icon: Sparkles,
      iconColor: '#7C3AED',
      desc: 'Multi-vector talent ranking engine evaluating technical skills, academics, projects, and resume signals for TechNova SDE drive.'
    },
    {
      layer: 'Layer 8',
      title: 'Explainable AI Fit Score',
      category: 'ai',
      badge: '✦ AI Core',
      badgeColor: '#7C3AED',
      badgeBg: '#F5F3FF',
      route: '/recruiter/jobs/JOB-2027-001/matching/CL-2027-0042',
      icon: Cpu,
      iconColor: '#7C3AED',
      desc: 'Transparent match intelligence: 5-axis radar breakdown, criterion weights, positive/missing evidence & interview prep kit.'
    },
    {
      layer: 'Layer 9',
      title: 'Smart Shortlisting Engine',
      category: 'recruiter',
      badge: '✦ AI Core',
      badgeColor: '#059669',
      badgeBg: '#ECFDF5',
      route: '/recruiter/jobs/JOB-2027-001/shortlisting',
      icon: Filter,
      iconColor: '#059669',
      desc: 'Automated candidate tiering (Tier 1/2/3/Reject), cutoff gates, comparative matrix, and 1-click promotion to scheduling.'
    },
    {
      layer: 'Layer 10',
      title: 'Drive Scheduler & Conflicts',
      category: 'officer',
      badge: '✦ New (L10)',
      badgeColor: '#2563EB',
      badgeBg: '#EFF6FF',
      route: '/officer/scheduling',
      icon: CalendarCheck,
      iconColor: '#2563EB',
      desc: 'Deterministic multi-drive scheduler, 6D collision detector, Gantt timeline, 1-click alternative slot resolution & portals.'
    },
    {
      layer: 'Layer 11',
      title: 'Communication Hub & Alerts',
      category: 'officer',
      badge: '✦ Live (L11)',
      badgeColor: '#059669',
      badgeBg: '#ECFDF5',
      route: '/officer/communications',
      icon: Zap,
      iconColor: '#3978F6',
      desc: 'Centralized placement communication center, automated schedule notifications, bulk announcement wizard & delivery analytics.'
    },
    {
      layer: 'Layer 12',
      title: 'Offer & Document Tracker',
      category: 'officer',
      badge: '✦ Live (L12)',
      badgeColor: '#7C3AED',
      badgeBg: '#F5F3FF',
      route: '/officer/offers',
      icon: Award,
      iconColor: '#7C3AED',
      desc: 'End-to-end placement completion: selection to offer generation, candidate acceptance, credential verification & onboarding tracker.'
    },
    {
      layer: 'Layer 13',
      title: 'Campus Intelligence & Analytics',
      category: 'officer',
      badge: '✦ New (L13)',
      badgeColor: '#059669',
      badgeBg: '#ECFDF5',
      route: '/officer/analytics',
      icon: BarChart3,
      iconColor: '#2563EB',
      desc: 'Institutional nervous system: 10-stage placement funnel, drop-off radar, department CTC benchmarks & prescriptive AI recommendations.'
    }
  ];

  const filteredLayers = layers.filter((l) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'ai') return l.category === 'ai';
    if (selectedFilter === 'officer') return l.category === 'officer' || l.category === 'core';
    if (selectedFilter === 'recruiter') return l.category === 'recruiter';
    if (selectedFilter === 'student') return l.category === 'student';
    return true;
  });

  return (
    <section
      id="live-layers"
      style={{
        paddingTop: '48px',
        paddingBottom: '68px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '28px' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                fontSize: '11.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
                border: '1px solid #BFDBFE'
              }}
            >
              <Sparkles size={13} />
              <span>Full 11-Layer Placement Architecture Live & Connected</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#101B36', margin: 0, letterSpacing: '-0.02em' }}>
              CampusCore Live Operational Modules (Layers 1–13)
            </h2>
            <p style={{ fontSize: '14.5px', color: '#64748B', margin: '6px 0 0', maxWidth: '720px' }}>
              Every layer operates seamlessly together in a unified institutional placement engine. Click any card to launch its live dashboard or interactive simulation:
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => navigate('/officer/scheduling')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                borderRadius: '8px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
            >
              <CalendarCheck size={15} />
              <span>Launch Layer 10 Scheduler</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '8px',
                backgroundColor: '#101B36',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Demo Logins</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {[
            { id: 'all', label: 'All 10 Layers (10)' },
            { id: 'ai', label: '✦ AI Intelligence Modules (4)' },
            { id: 'officer', label: 'Operations & Placement Officer (3)' },
            { id: 'recruiter', label: 'Enterprise & Recruiter (2)' },
            { id: 'student', label: 'Student Readiness (1)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: selectedFilter === cat.id ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                backgroundColor: selectedFilter === cat.id ? '#EFF6FF' : '#F8FAFC',
                color: selectedFilter === cat.id ? '#2563EB' : '#475569',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 10-Card Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))',
            gap: '16px'
          }}
        >
          {filteredLayers.map((l) => {
            const Icon = l.icon;
            const isL10 = l.layer === 'Layer 10';
            return (
              <div
                key={l.layer}
                onClick={() => navigate(l.route)}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: isL10 ? '#F0F7FF' : '#F8FAFC',
                  border: isL10 ? '1.5px solid #93C5FD' : '1.5px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isL10 ? '0 4px 14px rgba(37, 99, 235, 0.08)' : 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = l.iconColor;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 24px -4px ${l.iconColor}22`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = isL10 ? '#F0F7FF' : '#F8FAFC';
                  e.currentTarget.style.borderColor = isL10 ? '#93C5FD' : '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isL10 ? '0 4px 14px rgba(37, 99, 235, 0.08)' : 'none';
                }}
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: l.iconColor,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '6px',
                        backgroundColor: l.badgeBg,
                        color: l.badgeColor
                      }}
                    >
                      {l.badge}
                    </span>
                  </div>

                  <span style={{ fontSize: '11px', fontWeight: 800, color: l.iconColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {l.layer}
                  </span>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: '2px 0 8px' }}>
                    {l.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                    {l.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: l.iconColor,
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid #E2E8F0'
                  }}
                >
                  <span>Launch Live</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
