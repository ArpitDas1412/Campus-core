import React from 'react';
import { BookmarkCheck, X, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getScoreVisualMeta } from '../../utils/fitScoreUtils';

export default function ShortlistModal({
  isOpen,
  onClose,
  onConfirm,
  candidateName = 'Candidate',
  fitScore = 91,
  recommendationTier = 'Strong Match',
  jobTitle = 'Software Engineer',
  companyName = 'TechNova Solutions'
}) {
  if (!isOpen) return null;

  const visualMeta = getScoreVisualMeta(fitScore);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.55)',
        backdropFilter: 'blur(5px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '28px 32px',
          boxShadow: '0 20px 40px rgba(16, 27, 54, 0.2)',
          border: '1.5px solid #E2E8F0',
          animation: 'scaleIn 0.2s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#EFF6FF',
              color: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <BookmarkCheck size={22} />
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', margin: '0 0 8px' }}>
          Shortlist {candidateName}?
        </h3>

        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, margin: '0 0 20px' }}>
          CampusCore will move this candidate to the <strong>Shortlisted</strong> recruitment stage for the <strong>{jobTitle}</strong> opening at {companyName}.
        </p>

        {/* Fit Score Badge Info */}
        <div
          style={{
            padding: '16px',
            backgroundColor: '#F8FAFD',
            borderRadius: '14px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              AI Fit Assessment
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', marginTop: '2px' }}>
              {recommendationTier}
            </div>
          </div>

          <div
            style={{
              fontSize: '24px',
              fontWeight: 900,
              color: visualMeta.color
            }}
          >
            {fitScore}%
          </div>
        </div>

        {/* Notice on Decision Maker */}
        <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="#64748B" />
          <span>The AI provides advisory ranking. You make the final hiring decision.</span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '11px 18px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#475569',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              flex: 1,
              padding: '11px 18px',
              borderRadius: '10px',
              backgroundColor: '#3978F6',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(57, 120, 246, 0.35)'
            }}
          >
            Confirm Shortlist
          </button>
        </div>
      </div>
    </div>
  );
}
