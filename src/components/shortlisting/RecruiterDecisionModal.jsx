import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  UserCheck,
  X
} from 'lucide-react';
import { OVERRIDE_REASONS } from '../../data/shortlistingConfig.js';

export function OverrideModal({
  isOpen,
  onClose,
  candidateItem,
  targetDecision,
  onConfirmOverride
}) {
  const [selectedReason, setSelectedReason] = useState(OVERRIDE_REASONS[0]);
  const [customReason, setCustomReason] = useState('');

  if (!isOpen || !candidateItem) return null;

  const candidate = candidateItem.candidate || candidateItem.student || {};
  const aiStatus = candidateItem.aiRecommendation?.status;
  const fitScore = candidateItem.aiRecommendation?.score;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason =
      selectedReason === 'Other' && customReason.trim()
        ? customReason.trim()
        : selectedReason;
    onConfirmOverride(candidateItem.candidateId, targetDecision, finalReason);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
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
          borderRadius: '18px',
          maxWidth: '500px',
          width: '100%',
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#FFFBEB',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#101B36', margin: 0 }}>
                Recruiter Decision Override
              </h3>
              <span style={{ fontSize: '12.5px', color: '#64748B' }}>
                Human-in-the-Loop Oversight Protocol
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Override Comparison Card */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            padding: '14px 16px',
            border: '1px solid #E2E8F0',
            marginBottom: '20px'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#101B36', marginBottom: '8px' }}>
            {candidate.name} ({candidate.id})
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
            <div>
              <span style={{ color: '#64748B' }}>AI Recommendation:</span>
              <div style={{ fontWeight: 800, color: '#D97706', marginTop: '2px' }}>
                {aiStatus} ({fitScore}%)
              </div>
            </div>
            <div>
              <span style={{ color: '#64748B' }}>Your Decision:</span>
              <div style={{ fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                {targetDecision}
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '0 0 16px' }}>
          This decision differs from the AI recommendation. In accordance with CampusCore Responsible AI guidelines,
          please document the human justification for this override.
        </p>

        {/* Reason Selector */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Reason for Override:
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                color: '#101B36',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              {OVERRIDE_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {selectedReason === 'Other' && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Provide Custom Justification:
              </label>
              <textarea
                rows={3}
                placeholder="e.g., Exceptional technical assessment in external hackathon or unique portfolio evidence..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '12.5px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 16px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#475569',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '9px 20px',
                borderRadius: '8px',
                backgroundColor: '#7C3AED',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)'
              }}
            >
              Confirm Override
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ShortlistConfirmationModal({
  isOpen,
  onClose,
  candidateItem,
  onConfirm
}) {
  if (!isOpen || !candidateItem) return null;

  const candidate = candidateItem.candidate || candidateItem.student || {};
  const fitScore = candidateItem.aiRecommendation?.score;
  const reasons = candidateItem.aiRecommendation?.reasons || [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
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
          borderRadius: '18px',
          maxWidth: '460px',
          width: '100%',
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#ECFDF5',
              border: '2px solid #A7F3D0',
              color: '#059669',
              margin: '0 auto 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <UserCheck size={26} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#101B36', margin: '0 0 6px' }}>
            Shortlist {candidate.name}?
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Move this candidate to the shortlisted pool for recruitment rounds.
          </p>
        </div>

        {/* AI Recommendation Summary */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            padding: '14px',
            border: '1px solid #E2E8F0',
            marginBottom: '20px',
            fontSize: '12.5px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: '#64748B' }}>AI Fit Score:</span>
            <strong style={{ color: '#059669' }}>{fitScore}% ({candidateItem.aiRecommendation?.tier})</strong>
          </div>
          <div style={{ color: '#475569', fontSize: '12px', lineHeight: 1.4 }}>
            <strong>Primary Reason:</strong> {reasons[0] || 'Strong technical skill coverage and academic eligibility.'}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#475569',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(candidateItem.candidateId);
              onClose();
            }}
            style={{
              padding: '10px 22px',
              borderRadius: '8px',
              backgroundColor: '#059669',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)'
            }}
          >
            Confirm Shortlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default {
  OverrideModal,
  ShortlistConfirmationModal
};
