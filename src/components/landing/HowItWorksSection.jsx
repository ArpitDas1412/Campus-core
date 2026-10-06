import React from 'react';
import { UserPlus, Cpu, SearchCode, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      stepNumber: '01',
      title: 'Student Registration',
      subtitle: 'Verified Profile Creation',
      description:
        'Students onboard with verified academic records, coursework transcripts, GitHub repositories, and skill credentials.',
      icon: UserPlus,
      color: '#3978F6',
      badge: 'Step 1'
    },
    {
      stepNumber: '02',
      title: 'AI Skill Analysis',
      subtitle: 'Deep Competency Profiling',
      description:
        'The neural engine parses resumes, benchmark tests coding mastery, and generates a multidimensional student readiness index.',
      icon: Cpu,
      color: '#36C5E8',
      badge: 'Step 2'
    },
    {
      stepNumber: '03',
      title: 'Intelligent Matching',
      subtitle: 'Precision Candidate Shortlisting',
      description:
        'Recruiter JD parameters are cross-matched in real time with eligible student pools, eliminating manual screening cycles.',
      icon: SearchCode,
      color: '#8B5CF6',
      badge: 'Step 3'
    },
    {
      stepNumber: '04',
      title: 'Corporate Placement',
      subtitle: 'Offer Letter Acceptance',
      description:
        'Live drive schedules, multi-round interview tracking, and digital offer rollouts with institutional compliance verification.',
      icon: Briefcase,
      color: '#10B981',
      badge: 'Step 4'
    }
  ];

  return (
    <section
      id="how-it-works"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 64px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: '#ECFDF5',
              color: '#059669',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '14px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            <CheckCircle2 size={14} />
            <span>Seamless 4-Stage Lifecycle</span>
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
            How CampusCore Works
          </h2>

          <p style={{ fontSize: '17px', color: '#64748B', lineHeight: 1.6 }}>
            A unified, automated workflow guiding candidates from initial enrollment to corporate offer acceptance.
          </p>
        </div>

        {/* 4 Steps Horizontal Workflow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            position: 'relative'
          }}
          className="steps-grid"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={step.stepNumber}
                style={{
                  backgroundColor: '#F8FAFD',
                  borderRadius: '20px',
                  padding: '32px 24px',
                  border: '1px solid #E2E8F0',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px -4px rgba(16, 27, 54, 0.08)';
                  e.currentTarget.style.borderColor = step.color;
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.backgroundColor = '#F8FAFD';
                }}
              >
                {/* Step Number & Icon Header */}
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
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: '#FFFFFF',
                      color: step.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(16, 27, 54, 0.06)',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#CBD5E1',
                      letterSpacing: '-0.03em'
                    }}
                  >
                    {step.stepNumber}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#101B36',
                    marginBottom: '6px'
                  }}
                >
                  {step.title}
                </h3>

                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: step.color,
                    marginBottom: '12px'
                  }}
                >
                  {step.subtitle}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    lineHeight: 1.6
                  }}
                >
                  {step.description}
                </p>

                {/* Arrow indicator for desktop layout between steps */}
                {!isLast && (
                  <div
                    style={{
                      position: 'absolute',
                      right: '-14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
                    }}
                    className="step-connector"
                  >
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .step-connector {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
