import React from 'react';
import { Target, Lightbulb, Shield, Award, CheckCircle, Network, Layers } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      title: 'Unified Talent Ecosystem',
      desc: 'Eliminates fragmented communication by connecting students, placement teams, and recruiters inside a shared verified environment.',
      icon: Network,
      color: '#3978F6'
    },
    {
      title: 'Ethical AI Architecture',
      desc: 'Algorithmic matching based strictly on verified technical skills, verified academic benchmarks, and portfolio quality without demographic bias.',
      icon: Shield,
      color: '#0E8EA8'
    },
    {
      title: '15-Layer Modular Foundation',
      desc: 'Layer 1 establishes enterprise authentication and landing architecture, engineered to seamlessly host advanced analytics and auto-schedulers.',
      icon: Layers,
      color: '#8B5CF6'
    }
  ];

  return (
    <section
      id="about"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#F8FAFD',
        borderTop: '1px solid #E2E8F0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: '940px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            border: '1.5px solid #E2E8F0',
            padding: 'clamp(32px, 5vw, 60px)',
            boxShadow: '0 20px 45px -10px rgba(16, 27, 54, 0.08)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
                marginBottom: '14px'
              }}
            >
              <Lightbulb size={14} />
              <span>Project Identity & Mission</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(28px, 3.2vw, 38px)',
                fontWeight: 800,
                color: '#101B36',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              About CampusCore
            </h2>

            <p
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#3978F6',
                fontFamily: 'var(--font-heading)',
                marginBottom: '14px'
              }}
            >
              "Bridging Campus Talent with Corporate Opportunities."
            </p>

            <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto' }}>
              CAMPUSCORE is an AI-powered Campus-to-Corporate Placement Management and Analytics Platform
              that connects students, colleges, placement officers, and recruiters through one intelligent
              ecosystem. Designed to replace archaic spreadsheets and uncoordinated email threads with
              data-driven hiring precision.
            </p>
          </div>

          {/* Pillars Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #F1F5F9'
            }}
          >
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    backgroundColor: '#F8FAFD',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      color: p.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#101B36', marginBottom: '8px' }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.55 }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Layers 1-5 Status Banner */}
          <div
            style={{
              marginTop: '36px',
              padding: '16px 20px',
              backgroundColor: '#101B36',
              borderRadius: '16px',
              color: '#FFFFFF',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}
              >
                Layers 1–5 Operational
              </span>
              <span style={{ fontSize: '13.5px', color: '#E2E8F0' }}>
                Auth • Command Center • Student 360° Profiles • AI Skill-Gap • Resume Intelligence
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>
              Built for National Hackathon Placement Operations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
