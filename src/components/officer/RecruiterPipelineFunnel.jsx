import React from 'react';
import {
  Building2,
  Users,
  Calendar,
  CheckCircle2,
  Award,
  ChevronDown,
  Layers
} from 'lucide-react';
import { RECRUITER_PIPELINE } from '../../data/analytics';

export default function RecruiterPipelineFunnel({ onInspectFunnel }) {
  const getIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Building2 size={15} />;
      case 1:
        return <Users size={15} />;
      case 2:
        return <Calendar size={15} />;
      case 3:
        return <CheckCircle2 size={15} />;
      case 4:
        return <Award size={15} />;
      default:
        return <Layers size={15} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#F3E8FF',
              color: '#8B5CF6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Layers size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Recruiter Pipeline
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0' }}>
              Corporate acquisition to offer conversion funnel
            </p>
          </div>
        </div>
      </div>

      {/* Funnel Stages */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flex: 1,
          justifyContent: 'center'
        }}
      >
        {RECRUITER_PIPELINE.map((stage, idx) => {
          // Progress bar percentage relative to top stage
          const percentWidth = Math.max(28, Math.min(100, 100 - idx * 14));

          return (
            <div key={stage.stage} style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = stage.color;
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 27, 54, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Visual subtle progress fill */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: `${percentWidth}%`,
                    backgroundColor: stage.color,
                    opacity: 0.06,
                    pointerEvents: 'none'
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      color: stage.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                    }}
                  >
                    {getIcon(idx)}
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                      {stage.stage}
                    </span>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      {stage.dropoff}
                    </div>
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: stage.color,
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {stage.count}
                  </span>
                </div>
              </div>

              {/* Connecting Down Arrow between stages */}
              {idx < RECRUITER_PIPELINE.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '-4px 0',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#94A3B8'
                    }}
                  >
                    <ChevronDown size={11} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
