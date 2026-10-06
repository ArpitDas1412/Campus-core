import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  Building,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export default function RolesSection() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loggingInRole, setLoggingInRole] = useState(null);

  const roles = [
    {
      id: 'student',
      title: 'Student',
      badge: 'Candidates & Alumni',
      tagline: 'Unlock dream career opportunities with AI resume matching',
      description:
        'Track eligibility, view tailored drive recommendations, practice benchmark assessments, and manage offer letters from a unified dashboard.',
      icon: GraduationCap,
      color: '#3978F6',
      bgGlow: 'rgba(57, 120, 246, 0.1)',
      demoEmail: DEMO_ACCOUNTS.student.email,
      capabilities: [
        'AI Resume Score & Keyword Match',
        'Direct Campus Drive Applications',
        'Personalized Skill Gap Roadmaps',
        'Real-time Shortlist Notifications'
      ]
    },
    {
      id: 'officer',
      title: 'Placement Officer',
      badge: 'T&P Directorate',
      tagline: 'Orchestrate drives and monitor batch statistics with ease',
      description:
        'Coordinate multiple recruiting companies, schedule interviews without hall or exam conflicts, and generate NAAC/NIRF placement compliance reports.',
      icon: Briefcase,
      color: '#0E8EA8',
      bgGlow: 'rgba(54, 197, 232, 0.12)',
      demoEmail: DEMO_ACCOUNTS.officer.email,
      capabilities: [
        'Company Onboarding & Slot Allocation',
        'Batch Eligibility Filter Presets',
        'Live Multi-Round Interview Tracker',
        'NAAC Placement Audit Exports'
      ]
    },
    {
      id: 'recruiter',
      title: 'Corporate Recruiter',
      badge: '✦ Layers 6 & 7 Live',
      tagline: 'Discover top campus talent with AI Candidate Matching',
      description:
        'Corporate hiring portal (TechNova Solutions): create job requisitions, run AI multi-vector candidate matching, access student pipelines with skill-match scores, and manage shortlists.',
      icon: Building,
      color: '#8B5CF6',
      bgGlow: 'rgba(139, 92, 246, 0.12)',
      demoEmail: DEMO_ACCOUNTS.recruiter.email,
      capabilities: [
        'AI Multi-Vector Candidate Matching',
        '8-Step Job Requisition Wizard',
        'Direct Candidate Pipeline & Filters',
        'Dynamic Shortlists & Interview Rounds'
      ]
    },
    {
      id: 'admin',
      title: 'College Administrator',
      badge: 'Executive Governance',
      tagline: 'Gain multi-department visibility and ensure institutional compliance',
      description:
        'Monitor macro hiring trends, salary distribution statistics, department-wise placement velocity, and manage staff security privileges.',
      icon: ShieldCheck,
      color: '#101B36',
      bgGlow: 'rgba(16, 27, 54, 0.12)',
      demoEmail: DEMO_ACCOUNTS.admin.email,
      capabilities: [
        'Cross-Department Placement Analytics',
        'Historical CTC Growth Metrics',
        'Role-Based Staff Access Control',
        'Institutional Accreditation Logs'
      ]
    }
  ];

  const handleQuickDemoLogin = async (roleKey) => {
    setLoggingInRole(roleKey);
    const demo = DEMO_ACCOUNTS[roleKey];
    if (demo) {
      const result = await login(demo.email, demo.password, roleKey);
      if (result.success) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 }
          });
        } catch (e) {}
        if (roleKey === 'officer') {
          navigate('/officer/dashboard');
        } else if (roleKey === 'recruiter') {
          navigate('/recruiter/dashboard');
        } else {
          navigate(`/dashboard/${roleKey}`);
        }
      }
    }
    setLoggingInRole(null);
  };

  return (
    <section
      id="roles"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: '#EEF4FE',
              color: '#3978F6',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '14px',
              border: '1px solid rgba(57, 120, 246, 0.2)'
            }}
          >
            <Zap size={14} />
            <span>Dedicated Stakeholder Ecosystem</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(30px, 3.5vw, 42px)',
              fontWeight: 800,
              color: '#101B36',
              marginBottom: '16px',
              letterSpacing: '-0.025em'
            }}
          >
            Tailored Experiences for Every Role
          </h2>

          <p style={{ fontSize: '17px', color: '#64748B', lineHeight: 1.6 }}>
            Each stakeholder enters a role-isolated interface customized with specialized analytics,
            actionable workflows, and governance controls.
          </p>
        </div>

        {/* 4 Roles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '28px'
          }}
        >
          {roles.map((role) => {
            const Icon = role.icon;
            const isLoggingIn = loggingInRole === role.id;

            return (
              <div
                key={role.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '32px 26px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 8px 24px -4px rgba(16, 27, 54, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = role.color;
                  e.currentTarget.style.boxShadow = `0 20px 36px -8px ${role.bgGlow}, 0 6px 16px -4px rgba(16, 27, 54, 0.08)`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(16, 27, 54, 0.05)';
                }}
              >
                <div>
                  {/* Top Bar with Icon and Audience Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px'
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        backgroundColor: role.color === '#101B36' ? '#101B36' : '#F1F5F9',
                        color: role.color === '#101B36' ? '#FFFFFF' : role.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(16, 27, 54, 0.06)'
                      }}
                    >
                      <Icon size={26} />
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        backgroundColor: '#F8FAFC',
                        color: '#475569',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      {role.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#101B36',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {role.title}
                  </h3>

                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: role.color,
                      marginBottom: '14px',
                      lineHeight: 1.4
                    }}
                  >
                    {role.tagline}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#475569',
                      lineHeight: 1.55,
                      marginBottom: '20px'
                    }}
                  >
                    {role.description}
                  </p>

                  {/* Capabilities List */}
                  <div
                    style={{
                      paddingTop: '16px',
                      borderTop: '1px solid #F1F5F9',
                      marginBottom: '24px'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#94A3B8',
                        letterSpacing: '0.04em',
                        marginBottom: '10px'
                      }}
                    >
                      Key Features:
                    </div>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {role.capabilities.map((cap, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '12.5px',
                            color: '#334155'
                          }}
                        >
                          <CheckCircle2 size={14} style={{ color: role.color, flexShrink: 0 }} />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Primary: Navigate to Role Login */}
                  <button
                    onClick={() => {
                      if (role.id === 'recruiter') {
                        navigate('/recruiter/dashboard');
                      } else if (role.id === 'officer') {
                        navigate('/officer/dashboard');
                      } else {
                        navigate(`/login?role=${role.id}`);
                      }
                    }}
                    className="btn btn-secondary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      borderColor: role.id === 'recruiter' ? '#C4B5FD' : '#CBD5E1',
                      backgroundColor: role.id === 'recruiter' ? '#F5F3FF' : '#FFFFFF',
                      color: role.id === 'recruiter' ? '#6D28D9' : '#101B36',
                      fontWeight: 700,
                      fontSize: '14px',
                      padding: '11px'
                    }}
                  >
                    <span>{role.id === 'recruiter' ? 'Launch Recruiter Portal (L6)' : role.id === 'officer' ? 'Launch Officer Console' : 'Login / Access Portal'}</span>
                    <ArrowRight size={15} />
                  </button>

                  {/* Secondary: Instant Demo Login */}
                  <button
                    onClick={() => handleQuickDemoLogin(role.id)}
                    disabled={isLoggingIn}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#F8FAFC',
                      color: '#475569',
                      fontSize: '12px',
                      fontWeight: 600,
                      border: '1px dashed #CBD5E1',
                      transition: 'all 0.2s ease',
                      cursor: isLoggingIn ? 'not-allowed' : 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                      e.currentTarget.style.color = '#3978F6';
                      e.currentTarget.style.borderColor = '#3978F6';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.borderColor = '#CBD5E1';
                    }}
                  >
                    <Zap size={13} style={{ color: '#F59E0B' }} />
                    <span>{isLoggingIn ? 'Logging in...' : `Quick Demo as ${role.title}`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
