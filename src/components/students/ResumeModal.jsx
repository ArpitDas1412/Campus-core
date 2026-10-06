import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, FileText, CheckCircle2, RefreshCw, Upload, Sparkles, Award, Code2, Briefcase } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose, student, onReanalyze }) {
  const navigate = useNavigate();
  if (!isOpen || !student) return null;

  const resume = student.resume || {
    fileName: `${student.name.replace(/\s+/g, '_')}_Resume.pdf`,
    status: 'Analyzed',
    score: 82,
    extractedSkillsCount: student.skills?.length || 14,
    extractedProjectsCount: student.projects?.length || 3,
    extractedCertsCount: student.certifications?.length || 3,
    extractedExperience: '1 Internship'
  };

  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleTriggerReanalyze = () => {
    setIsReanalyzing(true);
    setTimeout(() => {
      setIsReanalyzing(false);
      setSuccessMsg('Resume re-analyzed successfully! Extracted signals refreshed.');
      if (onReanalyze) onReanalyze();
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 1200);
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
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(16, 27, 54, 0.25)',
          border: '1px solid #E2E8F0'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                color: '#3978F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#101B36' }}>
                Resume Intelligence Dossier
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748B' }}>
                AI-parsed document telemetry for {student.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: '#F1F5F9',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              color: '#64748B'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {successMsg && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#065F46',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Current File Banner */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#FEF2F2',
                  color: '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '11px'
                }}
              >
                PDF
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                  {resume.fileName}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#059669',
                      backgroundColor: '#ECFDF5',
                      padding: '1px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    <CheckCircle2 size={11} /> {resume.status}
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                    Uploaded Oct 2026 • Verified PDF Document
                  </span>
                </div>
              </div>
            </div>

            {/* Score Pill */}
            <div
              onClick={() => {
                onClose();
                navigate(`/officer/students/${student.id}/resume`);
              }}
              style={{
                textAlign: 'right',
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                transition: 'all 0.15s ease'
              }}
              title="Click → Open Full Resume Intelligence"
            >
              <span style={{ fontSize: '11px', color: '#1E40AF', display: 'block', fontWeight: 600 }}>Resume Score</span>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#2563EB' }}>
                {resume.score} <span style={{ fontSize: '13px', color: '#94A3B8' }}>/ 100</span>
              </span>
              <span style={{ fontSize: '10.5px', color: '#3978F6', display: 'block', fontWeight: 700 }}>
                Click → Resume Intelligence
              </span>
            </div>
          </div>

          {/* Extracted Metrics Grid */}
          <h4 style={{ margin: '0 0 12px', fontSize: '13.5px', fontWeight: 700, color: '#334155' }}>
            Extracted Telemetry & Signal Entities
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
            <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <Code2 size={18} color="#3978F6" style={{ margin: '0 auto 6px' }} />
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Skills Found</span>
              <strong style={{ fontSize: '18px', color: '#101B36' }}>{resume.extractedSkillsCount}</strong>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <FileText size={18} color="#10B981" style={{ margin: '0 auto 6px' }} />
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Projects</span>
              <strong style={{ fontSize: '18px', color: '#101B36' }}>{resume.extractedProjectsCount}</strong>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <Award size={18} color="#F59E0B" style={{ margin: '0 auto 6px' }} />
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Certifications</span>
              <strong style={{ fontSize: '18px', color: '#101B36' }}>{resume.extractedCertsCount}</strong>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <Briefcase size={18} color="#8B5CF6" style={{ margin: '0 auto 6px' }} />
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Experience</span>
              <strong style={{ fontSize: '14px', color: '#101B36' }}>{resume.extractedExperience}</strong>
            </div>
          </div>

          {/* AI Parsing Insights */}
          <div style={{ padding: '14px 18px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: '#1E40AF', fontSize: '12.5px', fontWeight: 700 }}>
              <Sparkles size={14} /> Resume Intelligence Summary (Layer 5 Preview)
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#1E3A8A', lineHeight: 1.5 }}>
              Candidate resume demonstrates high ATS compliance (82/100). Keywords for React, SQL, Java and Backend systems are prominently positioned. Suggest refining action verbs under the CampusConnect project description for higher recruiter engagement.
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
            <button
              onClick={() => {
                alert(`Simulated demo: Viewing ${resume.fileName}. In production, this launches the embedded PDF viewer with AI bounding boxes.`);
              }}
              style={{
                padding: '9px 16px',
                borderRadius: '8px',
                border: '1.5px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              View Resume Document
            </button>

            <button
              onClick={handleTriggerReanalyze}
              disabled={isReanalyzing}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '8px',
                border: '1.5px solid #3978F6',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                fontSize: '13px',
                fontWeight: 600,
                cursor: isReanalyzing ? 'not-allowed' : 'pointer'
              }}
            >
              <RefreshCw size={14} className={isReanalyzing ? 'pulse-dot' : ''} />
              <span>{isReanalyzing ? 'Re-analyzing...' : 'Re-analyze Resume'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                navigate(`/officer/students/${student.id}/resume`);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)'
              }}
            >
              <Upload size={14} />
              <span>Upload New Resume</span>
            </button>
          </div>

          <div style={{ marginTop: '14px', textAlign: 'center' }}>
            <button
              onClick={() => {
                onClose();
                navigate(`/officer/students/${student.id}/resume`);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563EB',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Open Full AI Resume Intelligence & Profile Extraction Dashboard →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
