import React from 'react';
import {
  Sparkles,
  Plus,
  BarChart3,
  Bot,
  Zap,
  Activity,
  ArrowUpRight
} from 'lucide-react';

export default function WelcomeBanner({ onCreateDrive, onViewAnalytics }) {
  return (
    <div
      style={{
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #101B36 0%, #172B59 60%, #1A365D 100%)',
        color: '#FFFFFF',
        padding: '28px 32px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 35px -10px rgba(16, 27, 54, 0.25)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}
      className="welcome-banner"
    >
      {/* Background Decorative Neural Mesh */}
      <div
        style={{
          position: 'absolute',
          right: '-40px',
          top: '-40px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(57, 120, 246, 0.18) 0%, rgba(54, 197, 232, 0.08) 45%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Left Content */}
      <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            borderRadius: '999px',
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38BDF8',
            fontSize: '11.5px',
            fontWeight: 700,
            marginBottom: '14px'
          }}
        >
          <Sparkles size={13} />
          <span>Intelligent Placement Automation Active</span>
        </div>

        <h2
          style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-heading)'
          }}
        >
          Good morning, Dr. Priya 👋
        </h2>

        <p
          style={{
            fontSize: '15px',
            color: '#CBD5E1',
            lineHeight: 1.6,
            margin: '0 0 22px'
          }}
        >
          Monitor student readiness, recruitment activity and placement outcomes from one intelligent workspace.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onCreateDrive}
            className="btn btn-primary"
            style={{
              padding: '11px 22px',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '12px',
              boxShadow: '0 10px 20px -5px rgba(57, 120, 246, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={18} />
            <span>+ Create Placement Drive</span>
          </button>

          <button
            onClick={onViewAnalytics}
            style={{
              padding: '11px 20px',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <BarChart3 size={16} />
            <span>View Analytics</span>
          </button>
        </div>
      </div>

      {/* Right: AI-Powered Placement Intelligence Visual Badge */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minWidth: '240px',
          padding: '18px 20px',
          borderRadius: '18px',
          background: 'rgba(255, 255, 255, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.2)'
        }}
        className="ai-visual-card"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #36C5E8 0%, #3978F6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Bot size={16} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
              CampusCore AI
            </span>
          </div>
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              color: '#34D399',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            LIVE SYNC
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: '#94A3B8' }}>Cohort Readiness Index</span>
            <strong style={{ color: '#38BDF8' }}>88.4 / 100</strong>
          </div>
          <div style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ width: '88.4%', height: '100%', background: 'linear-gradient(90deg, #3978F6, #36C5E8)' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '11px', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Activity size={12} style={{ color: '#34D399' }} /> 18 drives matched today
            </span>
            <span style={{ fontSize: '11px', color: '#93C5FD', fontWeight: 600 }}>
              99.2% accuracy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
