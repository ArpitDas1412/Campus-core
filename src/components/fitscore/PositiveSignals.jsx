import React from 'react';
import { CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';

export default function PositiveSignals({ signals = [] }) {
  if (!signals || signals.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #BBF7D0',
        padding: '24px 28px',
        boxShadow: '0 4px 16px rgba(5, 150, 105, 0.06)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#DCFCE7',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Sparkles size={18} />
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            POSITIVE SIGNALS
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            Why this candidate stands out
          </h3>
        </div>
      </div>

      <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px' }}>
        Dynamically surfaced strengths verified against candidate profile records and active job criteria:
      </p>

      {/* Signals List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {signals.map((signal, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '10px 14px',
              backgroundColor: '#F0FDF4',
              borderRadius: '10px',
              border: '1px solid #DCFCE7'
            }}
          >
            <CheckCircle2 size={16} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: '#14532D', fontWeight: 600, lineHeight: 1.4 }}>
              {signal}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
