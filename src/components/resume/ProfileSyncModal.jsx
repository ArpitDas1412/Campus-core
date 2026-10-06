import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Check, ShieldCheck } from 'lucide-react';
import { syncExtractedProfile } from '../../services/resumeAnalyzer';
import { updateStudentInStorage } from '../../data';

export default function ProfileSyncModal({ isOpen, onClose, student, resumeData, onSyncSuccess }) {
  if (!isOpen || !student || !resumeData) return null;

  const existingCgpa = student.cgpa || 8.5;
  const resumeCgpa = resumeData.education?.cgpa || 8.7;
  const hasCgpaConflict = Math.abs(existingCgpa - resumeCgpa) > 0.01;

  const [cgpaChoice, setCgpaChoice] = useState('useResume'); // 'useResume', 'keepExisting'
  const [isSyncing, setIsSyncing] = useState(false);

  const handleConfirmSync = () => {
    setIsSyncing(true);

    setTimeout(() => {
      const updated = syncExtractedProfile(student, resumeData, {
        cgpaResolution: cgpaChoice
      });
      updateStudentInStorage(updated);
      setIsSyncing(false);
      onSyncSuccess(updated);
      onClose();
    }, 700);
  };

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
          maxWidth: '680px',
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
              <RefreshCw size={18} color="#36C5E8" />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                Sync With CampusCore Profile
              </h3>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '12.5px', color: '#93C5FD' }}>
              Merge validated signals from {resumeData.fileName} into {student.name}'s active dossier
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
          
          {/* Ready to Sync Checklist */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3978F6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              PROFILE ATTRIBUTES READY TO SYNC
            </span>
            <h4 style={{ margin: '4px 0 12px', fontSize: '15px', fontWeight: 800, color: '#101B36' }}>
              Information Ready to Sync
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>
                  ✓ Skills ({(resumeData.skills || []).length} items)
                </span>
              </div>

              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>
                  ✓ Projects ({(resumeData.projects || []).length} items)
                </span>
              </div>

              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>
                  ✓ Certifications ({(resumeData.certifications || []).length} items)
                </span>
              </div>

              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>
                  ✓ Education ({resumeData.education?.degree ? 'B.Tech CS' : 'Verified'})
                </span>
              </div>

              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>
                  ✓ Experience ({resumeData.experience?.length || 1} Internship)
                </span>
              </div>
            </div>
          </div>

          {/* Conflict Resolution Section */}
          {hasCgpaConflict && (
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                backgroundColor: '#FFFBEB',
                border: '1.5px solid #FDE68A',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400E', marginBottom: '8px' }}>
                <AlertTriangle size={18} />
                <strong style={{ fontSize: '14px' }}>Conflict Detected: Academic CGPA</strong>
              </div>

              <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: '#78350F' }}>
                The uploaded resume lists a cumulative CGPA of <strong>{resumeCgpa}</strong>, while the candidate's active CampusCore record lists <strong>{existingCgpa}</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#101B36', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="cgpaConflict"
                    value="useResume"
                    checked={cgpaChoice === 'useResume'}
                    onChange={() => setCgpaChoice('useResume')}
                  />
                  <span>
                    <strong>Use Resume Data ({resumeCgpa})</strong> — Reflect latest validated grade sheet
                  </span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#101B36', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="cgpaConflict"
                    value="keepExisting"
                    checked={cgpaChoice === 'keepExisting'}
                    onChange={() => setCgpaChoice('keepExisting')}
                  />
                  <span>
                    <strong>Keep Existing ({existingCgpa})</strong> — Retain official college registrar mark
                  </span>
                </label>
              </div>
            </div>
          )}

          <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B' }}>
            ℹ️ <strong>Intelligent Merge:</strong> CampusCore merges new skills and projects without overwriting existing achievements or manual placement officer notes.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#64748B',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmSync}
            disabled={isSyncing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 700,
              cursor: isSyncing ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
            }}
          >
            {isSyncing ? (
              <>
                <RefreshCw size={15} className="pulse-dot" />
                <span>Updating Profile...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>Confirm Sync</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
