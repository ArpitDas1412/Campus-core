import React from 'react';
import { AlertTriangle, HelpCircle, Info } from 'lucide-react';

export default function WeakSignals({ signals = [] }) {
  if (!signals || signals.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #FDE68A',
        padding: '24px 28px',
        boxShadow: '0 4px 16px rgba(217, 119, 6, 0.05)',
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
            backgroundColor: '#FEF3C7',
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <AlertTriangle size={18} />
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            EVIDENCE GAPS
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            What is reducing the score?
          </h3>
        </div>
      </div>

      <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px' }}>
        Identified areas with limited evidence or missing preferred criteria (neutral decision factors):
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
              backgroundColor: '#FFFBEB',
              borderRadius: '10px',
              border: '1px solid #FEF3C7'
            }}
          >
            <span
              style={{
                color: '#D97706',
                fontWeight: 900,
                fontSize: '14px',
                lineHeight: 1.2,
                flexShrink: 0
              }}
            >
              △
            </span>
            <span style={{ fontSize: '13px', color: '#78350F', fontWeight: 500, lineHeight: 1.4 }}>
              {signal}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '16px',
          padding: '8px 12px',
          backgroundColor: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          fontSize: '11.5px',
          color: '#64748B'
        }}
      >
        <strong>Note:</strong> CampusCore identifies evidence gaps to support recruitment decisions without making subjective predictions about individual potential.
      </div>
    </div>
  );
}
