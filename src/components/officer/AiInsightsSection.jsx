import React from 'react';
import {
  Sparkles,
  Bot,
  AlertTriangle,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
  Info,
  ShieldCheck
} from 'lucide-react';
import { AI_INSIGHTS } from '../../data/analytics';

export default function AiInsightsSection({ onInsightAction }) {
  const getInsightIcon = (index) => {
    switch (index) {
      case 0:
        return <BrainCircuit size={18} style={{ color: '#3978F6' }} />;
      case 1:
        return <AlertTriangle size={18} style={{ color: '#EF4444' }} />;
      case 2:
        return <TrendingUp size={18} style={{ color: '#8B5CF6' }} />;
      default:
        return <Sparkles size={18} style={{ color: '#0E8EA8' }} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid rgba(57, 120, 246, 0.25)',
        padding: '24px 28px',
        boxShadow: '0 8px 30px -4px rgba(57, 120, 246, 0.08), 0 2px 6px -2px rgba(16, 27, 54, 0.04)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Banner Accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #3978F6 0%, #36C5E8 50%, #8B5CF6 100%)'
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#101B36',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>CampusCore AI Insights</span>
            </h3>

            {/* AI Badge */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '999px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                letterSpacing: '0.04em'
              }}
            >
              <span>✦ AI INSIGHT</span>
            </span>
          </div>

          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
            AI-generated observations from current placement data
          </p>
        </div>

        {/* Small Model Confidence indicator */}
        <div
          style={{
            fontSize: '11.5px',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#F8FAFC',
            padding: '5px 10px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0'
          }}
        >
          <ShieldCheck size={14} style={{ color: '#10B981' }} />
          <span>Model Confidence: <strong>96.8%</strong></span>
        </div>
      </div>

      {/* Three Insight Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '16px'
        }}
      >
        {AI_INSIGHTS.map((insight, idx) => (
          <div
            key={insight.id}
            style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: '#F8FAFD',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative'
            }}
            className="ai-card"
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = '#3978F6';
              e.currentTarget.style.boxShadow = '0 10px 24px -4px rgba(57, 120, 246, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#F8FAFD';
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              {/* Header: Insight Number + Tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}
                  >
                    {getInsightIcon(idx)}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#3978F6',
                      letterSpacing: '0.06em'
                    }}
                  >
                    {insight.number}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '6px',
                    backgroundColor:
                      idx === 1 ? '#FEF2F2' : idx === 2 ? '#F5F3FF' : '#EFF6FF',
                    color:
                      idx === 1 ? '#DC2626' : idx === 2 ? '#7C3AED' : '#2563EB',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  {insight.impact}
                </span>
              </div>

              {/* Text */}
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#101B36',
                  lineHeight: 1.5,
                  margin: '0 0 16px'
                }}
              >
                "{insight.text}"
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onInsightAction && onInsightAction(insight)}
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#101B36',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#3978F6';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#3978F6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#101B36';
                e.currentTarget.style.borderColor = '#CBD5E1';
              }}
            >
              <span>{insight.actionLabel}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Simulated AI Disclaimer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: '#94A3B8',
          borderTop: '1px solid #F1F5F9',
          paddingTop: '10px'
        }}
      >
        <Info size={13} />
        <span>
          DEMO AI-generated insights based on simulated data. Does not represent real statistical findings.
        </span>
      </div>
    </div>
  );
}
