import React, { useState } from 'react';
import {
  Sparkles,
  FileCheck2,
  GitBranch,
  CalendarCheck,
  BarChart4,
  BellRing,
  ArrowRight,
  CheckCircle2,
  Layers,
  Cpu,
  Filter
} from 'lucide-react';

export default function FeaturesSection({ onSelectFeature }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 'drive-scheduling',
      title: 'Intelligent Drive Scheduling & Conflicts',
      subtitle: 'Layer 10: Conflict-free interview engine',
      description:
        'Coordinates multi-round schedules across concurrent drives, enforcing 6D constraints: candidate double-booking, panel fatigue (>85%), room allocation, prerequisite sequencing, and break periods.',
      icon: CalendarCheck,
      tag: 'Layer 10 Live',
      accentColor: '#2563EB',
      bgGlow: 'rgba(37, 99, 235, 0.08)'
    },
    {
      id: 'smart-shortlisting',
      title: 'Smart Shortlisting & Decision Engine',
      subtitle: 'Layer 9: Algorithmic candidate tiering',
      description:
        'Classifies applicant pools into Tier 1 (Elite Match), Tier 2, Tier 3, and Reject with customizable cutoffs, comparative matrices, and 1-click promotion directly to drive scheduling.',
      icon: Filter,
      tag: 'Layer 9 Live',
      accentColor: '#059669',
      bgGlow: 'rgba(5, 150, 105, 0.08)'
    },
    {
      id: 'explainable-fit',
      title: 'Explainable AI Fit Score & Dossiers',
      subtitle: 'Layer 8: Transparent radar intelligence',
      description:
        'Provides multi-dimensional radar score breakdowns (Technical, Academics, Projects, ATS), criteria importance weights, positive & missing evidence, and personalized candidate prep kits.',
      icon: Cpu,
      tag: 'Layer 8 Live',
      accentColor: '#7C3AED',
      bgGlow: 'rgba(124, 58, 237, 0.08)'
    },
    {
      id: 'ai-matching',
      title: 'AI-Powered Candidate Matching',
      subtitle: 'Layer 7: Multi-vector talent ranker',
      description:
        'Analyzes enterprise job descriptions against verified student coursework, GitHub projects, and coding assessments to deliver precise match percentages and ranked candidate pools.',
      icon: Sparkles,
      tag: 'Layer 7 Live',
      accentColor: '#3978F6',
      bgGlow: 'rgba(57, 120, 246, 0.08)'
    },
    {
      id: 'resume-intelligence',
      title: 'Smart Resume Intelligence',
      subtitle: 'Layer 5: Automated ATS parsing & scoring',
      description:
        'Instantly parses multi-format resumes, extracts verified technical competencies, flags missing industry keywords, and produces standardized 82/100 ATS readiness profiles.',
      icon: FileCheck2,
      tag: 'Layer 5 Live',
      accentColor: '#0E8EA8',
      bgGlow: 'rgba(14, 142, 168, 0.08)'
    },
    {
      id: 'skill-gap',
      title: 'Student Skill-Gap Analysis',
      subtitle: 'Layer 4: Actionable readiness roadmaps',
      description:
        'Identifies missing competencies between current student profiles and corporate requirements, recommending personalized upskilling modules before corporate drives.',
      icon: GitBranch,
      tag: 'Layer 4 Live',
      accentColor: '#8B5CF6',
      bgGlow: 'rgba(139, 92, 246, 0.08)'
    }
  ];

  return (
    <section
      id="features"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#F8FAFD',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              border: '1px solid #BFDBFE'
            }}
          >
            <Sparkles size={14} />
            <span>End-to-End Placement Architecture</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(30px, 3.8vw, 42px)',
              fontWeight: 800,
              color: '#101B36',
              letterSpacing: '-0.025em',
              marginBottom: '14px',
              fontFamily: 'var(--font-heading)'
            }}
          >
            Enterprise Placement Intelligence,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #101B36 0%, #3978F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Unified in 10 Connected Layers
            </span>
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: '#475569',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Every phase of campus recruitment is engineered for maximum speed, fairness, and zero operational collision.
          </p>
        </div>

        {/* 6-Card Responsive Feature Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {features.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredCard === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onSelectFeature(item)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '32px',
                  border: isHovered ? `1.5px solid ${item.accentColor}` : '1.5px solid #E2E8F0',
                  boxShadow: isHovered
                    ? `0 20px 35px -10px ${item.accentColor}25, 0 4px 10px rgba(16, 27, 54, 0.04)`
                    : '0 4px 12px rgba(16, 27, 54, 0.03)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div>
                  {/* Top Bar with Icon and Tag */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px'
                    }}
                  >
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '16px',
                        backgroundColor: item.bgGlow,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.accentColor,
                        transition: 'transform 0.2s ease',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                      }}
                    >
                      <Icon size={26} strokeWidth={2.1} />
                    </div>

                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        backgroundColor: item.bgGlow,
                        color: item.accentColor,
                        border: `1px solid ${item.accentColor}33`
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    style={{
                      fontSize: '19px',
                      fontWeight: 700,
                      color: '#101B36',
                      marginBottom: '6px',
                      letterSpacing: '-0.015em'
                    }}
                  >
                    {item.title}
                  </h3>

                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: item.accentColor,
                      marginBottom: '14px'
                    }}
                  >
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '14.5px',
                      color: '#475569',
                      lineHeight: 1.6,
                      marginBottom: '20px'
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom link & interactive arrow */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: isHovered ? item.accentColor : '#64748B',
                    transition: 'color 0.2s ease',
                    paddingTop: '16px',
                    borderTop: '1px solid #F1F5F9'
                  }}
                >
                  <span>Architecture Details</span>
                  <ArrowRight
                    size={15}
                    style={{
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
