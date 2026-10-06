import React from 'react';
import { X, TrendingUp, CheckCircle2, ArrowRight, Clock, FileText } from 'lucide-react';

export default function ResumeVersionCompareModal({ isOpen, onClose, versionComparison, versionHistory }) {
  if (!isOpen) return null;

  const comparison = versionComparison || {
    from: "Version 1",
    to: "Version 3",
    scoreDelta: "+14 (68 → 82)",
    changes: [
      "+4 skills detected (React, Node.js, AWS, REST APIs)",
      "+1 verified project added (CampusConnect)",
      "+1 industry certification added (AWS Cloud Practitioner)",
      "Reorganized into clean single-column ATS-compliant hierarchy",
      "Quantified bullet points increased from 0% to 35%"
    ]
  };

  const history = versionHistory || [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px rgba(16, 27, 54, 0.25)',
          overflow: 'hidden',
          border: '1px solid #E2E8F0'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#36C5E8" />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                Resume Version Progression
              </h3>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '12.5px', color: '#93C5FD' }}>
              Tracking improvements across iterative drafts and feedback cycles
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          
          {/* Top Delta Callout Banner */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ECFDF5 0%, #EFF6FF 100%)',
              border: '1px solid #A7F3D0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                OVERALL PROGRESS TRAJECTORY
              </span>
              <h4 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                {comparison.from} → {comparison.to}
              </h4>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#065F46', display: 'block' }}>Score Progression</span>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#10B981' }}>
                {comparison.scoreDelta}
              </span>
            </div>
          </div>

          {/* Detected Iteration Enhancements */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
              Detected Revision Enhancements
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {comparison.changes.map((ch, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13px',
                    color: '#334155'
                  }}
                >
                  <CheckCircle2 size={16} color="#10B981" />
                  <span>{ch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Version History Timeline */}
          <div>
            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
              Recorded Upload History
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {history.map(ver => (
                <div
                  key={ver.version}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    backgroundColor: ver.isCurrent ? '#F0F9FF' : '#FFFFFF',
                    border: ver.isCurrent ? '1.5px solid #3978F6' : '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        backgroundColor: ver.isCurrent ? '#3978F6' : '#F1F5F9',
                        color: ver.isCurrent ? '#FFFFFF' : '#475569',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '12px'
                      }}
                    >
                      {ver.version.toUpperCase()}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '13.5px', color: '#101B36' }}>{ver.fileName}</strong>
                        {ver.isCurrent && (
                          <span style={{ fontSize: '10.5px', fontWeight: 800, padding: '1px 6px', borderRadius: '4px', backgroundColor: '#3978F6', color: '#FFFFFF' }}>
                            CURRENT ACTIVE
                          </span>
                        )}
                      </div>
                      <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748B' }}>
                        {ver.notes}
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: ver.score >= 80 ? '#10B981' : '#3978F6' }}>
                      {ver.score} <span style={{ fontSize: '11px', color: '#94A3B8' }}>/ 100</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>{ver.uploadDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
