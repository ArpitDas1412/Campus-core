import React, { useState } from 'react';
import {
  UserCheck,
  AlertCircle,
  XCircle,
  Clock,
  Download,
  X,
  AlertTriangle
} from 'lucide-react';
import { RECRUITER_DECISION_STATUS } from '../../data/shortlistingConfig.js';

export default function BulkActionToolbar({
  selectedCount = 0,
  onClearSelection,
  onBulkDecision,
  onBulkExport
}) {
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    targetStatus: null,
    title: '',
    message: ''
  })

  if (selectedCount === 0) return null;

  const handleActionClick = (targetStatus, label) => {
    setConfirmModal({
      isOpen: true,
      targetStatus,
      title: `Update ${selectedCount} Candidates?`,
      message: `You are about to mark ${selectedCount} selected candidate(s) as "${label}". Would you like to proceed?`
    });
  };

  const executeBulk = () => {
    if (confirmModal.targetStatus) {
      onBulkDecision(confirmModal.targetStatus);
    }
    setConfirmModal({ isOpen: false, targetStatus: null, title: '', message: '' });
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#101B36',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 10px 30px rgba(16, 27, 54, 0.4)',
          zIndex: 90,
          border: '1px solid #1E293B'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 800
            }}
          >
            {selectedCount}
          </span>
          <span style={{ fontSize: '13.5px', fontWeight: 700 }}>Candidates Selected</span>
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#334155' }} />

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => handleActionClick(RECRUITER_DECISION_STATUS.SHORTLISTED, 'Shortlisted')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              backgroundColor: '#059669',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <UserCheck size={14} />
            <span>Shortlist Selected</span>
          </button>

          <button
            onClick={() => handleActionClick(RECRUITER_DECISION_STATUS.NEEDS_REVIEW, 'Needs Review')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              backgroundColor: '#D97706',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <AlertCircle size={14} />
            <span>Mark for Review</span>
          </button>

          <button
            onClick={() => handleActionClick(RECRUITER_DECISION_STATUS.ON_HOLD, 'On Hold')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              backgroundColor: '#475569',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Clock size={14} />
            <span>Put on Hold</span>
          </button>

          <button
            onClick={() => handleActionClick(RECRUITER_DECISION_STATUS.REJECTED, 'Rejected')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <XCircle size={14} />
            <span>Reject Selected</span>
          </button>

          <button
            onClick={onBulkExport}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              backgroundColor: '#1E293B',
              color: '#94A3B8',
              border: '1px solid #334155',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Download size={14} />
            <span>Export Selected</span>
          </button>
        </div>

        <button
          onClick={onClearSelection}
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '4px',
            marginLeft: '4px'
          }}
          title="Clear Selection"
        >
          <X size={16} />
        </button>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16, 27, 54, 0.7)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '440px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#FEF2F2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AlertTriangle size={18} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                {confirmModal.title}
              </h3>
            </div>

            <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, margin: '0 0 20px' }}>
              {confirmModal.message}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setConfirmModal({ isOpen: false, targetStatus: null, title: '', message: '' })}
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
                onClick={executeBulk}
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
