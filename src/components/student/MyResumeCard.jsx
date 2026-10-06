import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Upload,
  ArrowRight,
  Target,
  RefreshCw,
  Award,
  Layers
} from 'lucide-react';
import ProfileSyncModal from '../resume/ProfileSyncModal';
import { DEFAULT_DEMO_RESUME } from '../../services/resumeAnalyzer';

export default function MyResumeCard({ user }) {
  const navigate = useNavigate();
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncedSuccess, setSyncedSuccess] = useState(false);

  // Resume status and metrics matching specification 29
  const resumeInfo = {
    fileName: 'Rahul_Kumar_Resume.pdf',
    score: 82,
    status: 'Good',
    statusDetail: 'Good — Improvement Recommended',
    uploadedDate: 'Oct 04, 2026',
    atsScore: 79,
    skillsDetected: 14,
    projects: 3,
    certifications: 2
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        border: '1.5px solid #BFDBFE',
        padding: '24px',
        boxShadow: '0 4px 20px -2px rgba(37, 99, 235, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background AI Accent */}
      <div
        style={{
          position: 'absolute',
          top: '-24px',
          right: '-24px',
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FileText size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16.5px', fontWeight: 800, color: '#101B36' }}>
              My Resume
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
              Layer 5 AI-Powered Intelligence & Profile Extraction
            </p>
          </div>
        </div>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 9px',
            borderRadius: '20px',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            fontSize: '11px',
            fontWeight: 700,
            border: '1px solid #BFDBFE'
          }}
        >
          <Sparkles size={11} /> ✦ CAMPUSCORE AI
        </span>
      </div>

      {syncedSuccess && (
        <div
          style={{
            marginBottom: '14px',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            fontSize: '12.5px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle2 size={16} /> Student profile updated successfully with extracted resume data!
        </div>
      )}

      {/* Primary Overview Box */}
      <div
        style={{
          padding: '16px 18px',
          borderRadius: '12px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          marginBottom: '18px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Resume File
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
              <FileText size={16} color="#3978F6" />
              <strong style={{ fontSize: '14.5px', color: '#101B36' }}>{resumeInfo.fileName}</strong>
            </div>
            <span style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '2px', display: 'block' }}>
              Uploaded {resumeInfo.uploadedDate} • Verified PDF Document
            </span>
          </div>

          {/* Score & Status */}
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'block' }}>Overall Score</span>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '4px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#2563EB', letterSpacing: '-0.02em' }}>
                {resumeInfo.score}
              </span>
              <span style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 600 }}>/ 100</span>
            </div>
            <span
              style={{
                display: 'inline-block',
                marginTop: '2px',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                border: '1px solid #A7F3D0'
              }}
            >
              Status: {resumeInfo.status}
            </span>
          </div>
        </div>

        {/* 4 Mini Signals Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '10px',
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: '1px solid #E2E8F0'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: '#64748B' }}>Skills Detected</span>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>{resumeInfo.skillsDetected} Skills</div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#64748B' }}>Projects</span>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>{resumeInfo.projects} Built</div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#64748B' }}>Certifications</span>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>{resumeInfo.certifications} Verified</div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#64748B' }}>ATS Readiness</span>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#2563EB' }}>{resumeInfo.atsScore}% Score</div>
          </div>
        </div>
      </div>

      {/* 4 Actions as mandated in Section 29 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
        {/* Action 1: View Analysis */}
        <button
          onClick={() => navigate('/student/resume')}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#3978F6',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            boxShadow: '0 2px 6px rgba(57, 120, 246, 0.25)',
            transition: 'background-color 0.15s'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#2563EB'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#3978F6'}
        >
          <span>View Analysis</span>
          <ArrowRight size={14} />
        </button>

        {/* Action 2: Upload New Version */}
        <button
          onClick={() => navigate('/student/resume')}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            border: '1px solid #BFDBFE',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#DBEAFE'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
        >
          <Upload size={14} />
          <span>Upload New Version</span>
        </button>

        {/* Action 3: Analyze for Job */}
        <button
          onClick={() => navigate('/student/resume?tab=job')}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            color: '#334155',
            border: '1px solid #E2E8F0',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#F1F5F9'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
        >
          <Target size={14} color="#3978F6" />
          <span>Analyze for Job</span>
        </button>

        {/* Action 4: Sync Profile */}
        <button
          onClick={() => setSyncModalOpen(true)}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            color: '#065F46',
            border: '1px solid #A7F3D0',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#ECFDF5'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
        >
          <RefreshCw size={14} color="#10B981" />
          <span>Sync Profile</span>
        </button>
      </div>

      {/* Sync Profile Modal */}
      <ProfileSyncModal
        isOpen={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
        student={{
          id: 'std-1',
          name: 'Rahul Kumar',
          cgpa: 8.5,
          skills: ['Java', 'React', 'SQL', 'Python']
        }}
        resumeData={DEFAULT_DEMO_RESUME}
        onSyncSuccess={() => {
          setSyncedSuccess(true);
          setTimeout(() => setSyncedSuccess(false), 4000);
        }}
      />
    </div>
  );
}
