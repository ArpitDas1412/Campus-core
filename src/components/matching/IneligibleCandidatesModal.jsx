import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, AlertTriangle, ExternalLink, ShieldAlert, ArrowRight } from 'lucide-react';

export default function IneligibleCandidatesModal({
  ineligibleCandidates = [],
  job,
  isOpen,
  onClose
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '85vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(16, 27, 54, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'scaleUp 0.2s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FEF2F2'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#991B1B', margin: 0 }}>
                Excluded by Hard Eligibility Criteria
              </h2>
              <p style={{ fontSize: '12.5px', color: '#B91C1C', margin: '2px 0 0' }}>
                {ineligibleCandidates.length} candidate{ineligibleCandidates.length > 1 ? 's' : ''} do not satisfy mandatory drive baselines
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid #FECACA',
              backgroundColor: '#FFFFFF',
              color: '#991B1B',
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
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              fontSize: '12.5px',
              color: '#475569'
            }}
          >
            <strong>Mandatory Drive Rules for {job?.title || 'Selected Job'}:</strong> Min CGPA: {job?.eligibility?.minCGPA || 7.5} • Allowed Depts: [{job?.eligibility?.departments?.join(', ') || 'CSE, IT, ECE'}] • Max Backlogs: {job?.eligibility?.maxBacklogs ?? 0} • Grad Year: {job?.eligibility?.graduationYear || 2027}
          </div>

          {ineligibleCandidates.map((cand) => {
            const student = cand.student || {};

            return (
              <div
                key={cand.candidateId}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #FCA5A5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '13px'
                    }}
                  >
                    {student.avatar || student.name?.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
                        {student.name}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626'
                        }}
                      >
                        Not Eligible
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                      {student.deptCode || student.department} • CGPA: <strong>{student.cgpa}</strong> • Backlogs: {student.backlogs || 0}
                    </div>

                    {/* Specific Failure Reasons */}
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#B91C1C', textTransform: 'uppercase' }}>
                        Reason(s) for Exclusion:
                      </div>
                      <ul style={{ margin: '4px 0 0', paddingLeft: '16px', color: '#991B1B', fontSize: '12px' }}>
                        {(cand.eligibilityReasons || []).map((r, ri) => (
                          <li key={ri}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* View Candidate Button */}
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/officer/students/${student.id || student.legacyId}`);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0
                  }}
                >
                  <span>360° Profile</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            fontSize: '12px',
            color: '#64748B',
            textAlign: 'center'
          }}
        >
          These candidates are excluded from the main ranking table to uphold compliance with strict corporate drive guidelines.
        </div>
      </div>
    </div>
  );
}
