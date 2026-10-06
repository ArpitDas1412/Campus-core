import React from 'react';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { getOfferPipeline } from '../../services/offerService';

export default function OfferPipeline({ activeFilter, onSelectStage }) {
  const stages = getOfferPipeline();

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #E2E8F0',
        padding: '20px 24px',
        boxShadow: '0 2px 8px rgba(16, 27, 54, 0.03)',
        marginBottom: '24px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="#3978F6" />
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            End-to-End Placement Conversion Pipeline
          </h3>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: '#EEF4FF',
              color: '#3978F6',
              padding: '2px 8px',
              borderRadius: '6px'
            }}
          >
            Selection → Offer → Onboarding
          </span>
        </div>

        {activeFilter && (
          <button
            onClick={() => onSelectStage && onSelectStage(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#3978F6',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Clear Pipeline Filter
          </button>
        )}
      </div>

      {/* Pipeline Stages Grid / Horizontal Flow */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
          gap: '8px',
          alignItems: 'stretch'
        }}
      >
        {stages.map((stage, idx) => {
          const isSelected = activeFilter === stage.stage;
          return (
            <div
              key={stage.stage}
              onClick={() => onSelectStage && onSelectStage(stage.stage)}
              style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                border: isSelected ? '1.5px solid #3978F6' : '1px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = '#F1F5F9';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                  Step {idx + 1}
                </span>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: stage.color
                  }}
                />
              </div>

              <div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', lineHeight: 1.1 }}>
                  {stage.count}
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', marginTop: '2px' }}>
                  {stage.stage}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                  {stage.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
