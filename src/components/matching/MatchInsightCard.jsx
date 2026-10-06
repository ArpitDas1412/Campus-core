import React from 'react';
import { Sparkles, Lightbulb, ArrowRight, Brain } from 'lucide-react';

export default function MatchInsightCard({ aiInsight }) {
  if (!aiInsight) return null;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #C7D2FE',
        padding: '20px 24px',
        boxShadow: '0 4px 20px -2px rgba(99, 102, 241, 0.08)',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
          }}
        >
          <Lightbulb size={22} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#6D28D9', letterSpacing: '0.04em' }}>
              {aiInsight.title || 'AI MATCHING TALENT INSIGHT'}
            </span>
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EDE9FE',
                color: '#6D28D9',
                border: '1px solid #DDD6FE'
              }}
            >
              {aiInsight.badge || 'Demo-Generated Insight'}
            </span>
          </div>

          <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.55, margin: '6px 0 0' }}>
            {aiInsight.text}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '10px',
              fontSize: '11.5px',
              color: '#6B7280'
            }}
          >
            <span>Engine Provider: <strong style={{ color: '#4F46E5' }}>{aiInsight.matchingProvider}</strong></span>
            <span>•</span>
            <span>Synthesized against active placement drive dataset</span>
          </div>
        </div>
      </div>
    </div>
  );
}
