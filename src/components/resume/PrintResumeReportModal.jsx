import React from 'react';
import { X, Printer, Download, Sparkles, CheckCircle2, FileText } from 'lucide-react';

export default function PrintResumeReportModal({ isOpen, onClose, student, resumeData }) {
  if (!isOpen || !student || !resumeData) return null;

  const handlePrint = () => {
    window.print();
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
          maxWidth: '840px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px rgba(16, 27, 54, 0.25)',
          overflow: 'hidden',
          border: '1px solid #E2E8F0'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Toolbar (hidden on print) */}
        <div
          className="no-print"
          style={{
            padding: '16px 24px',
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#36C5E8" />
            <span style={{ fontSize: '14px', fontWeight: 800 }}>
              Printable Resume Intelligence Audit Report
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>

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
        </div>

        {/* Printable Document Body */}
        <div
          id="printable-dossier"
          style={{
            padding: '36px 40px',
            overflowY: 'auto',
            fontFamily: "'Inter', sans-serif",
            color: '#101B36',
            backgroundColor: '#FFFFFF',
            lineHeight: 1.5
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #101B36', paddingBottom: '16px', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#3978F6', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                CampusCore Resume Intelligence Dossier
              </span>
              <h1 style={{ margin: '4px 0', fontSize: '24px', fontWeight: 900, color: '#101B36' }}>
                {resumeData.personal?.name || student.name}
              </h1>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                File: {resumeData.fileName} • ID: {student.id} • {student.department}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Resume Quality Score</span>
              <div
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  fontWeight: 900,
                  fontSize: '18px',
                  marginTop: '4px'
                }}
              >
                {resumeData.scores?.overall || 82} / 100
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                ATS Readiness: {resumeData.atsAnalysis?.score || 79}%
              </div>
            </div>
          </div>

          {/* Metric Summary Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '10px', marginBottom: '24px', textAlign: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Content Quality</span>
              <strong style={{ fontSize: '16px', color: '#101B36' }}>{resumeData.scores?.contentQuality || 86}%</strong>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Skills Coverage</span>
              <strong style={{ fontSize: '16px', color: '#101B36' }}>{resumeData.scores?.skillsCoverage || 91}%</strong>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Project Strength</span>
              <strong style={{ fontSize: '16px', color: '#101B36' }}>{resumeData.scores?.projectStrength || 82}%</strong>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Experience</span>
              <strong style={{ fontSize: '16px', color: '#101B36' }}>{resumeData.scores?.experienceStrength || 74}%</strong>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>ATS Compatibility</span>
              <strong style={{ fontSize: '16px', color: '#3978F6' }}>{resumeData.atsAnalysis?.score || 79}%</strong>
            </div>
          </div>

          {/* Extracted Experience & Education */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '13.5px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '4px', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#334155' }}>
                Extracted Experience
              </h3>
              {(resumeData.experience || []).map(exp => (
                <div key={exp.id} style={{ fontSize: '12px', marginBottom: '10px' }}>
                  <strong style={{ color: '#101B36' }}>{exp.role}</strong>
                  <div style={{ color: '#64748B' }}>{exp.company} • {exp.period}</div>
                  <ul style={{ margin: '4px 0 0', paddingLeft: '16px', color: '#334155' }}>
                    {exp.responsibilities.slice(0, 2).map((r, ri) => (
                      <li key={ri}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ fontSize: '13.5px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '4px', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#334155' }}>
                Extracted Education
              </h3>
              <div style={{ fontSize: '12px', color: '#334155' }}>
                <strong style={{ color: '#101B36' }}>{resumeData.education?.degree}</strong>
                <div style={{ color: '#64748B' }}>{resumeData.education?.university} • Graduating {resumeData.education?.graduationYear}</div>
                <div style={{ marginTop: '4px' }}>CGPA: <strong>{resumeData.education?.cgpa} / 10.0</strong></div>
              </div>
            </div>
          </div>

          {/* Extracted Skills */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13.5px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '4px', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#334155' }}>
              Extracted Skills & Confidence Ratings
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(resumeData.skills || []).map(s => (
                <span
                  key={s.name}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    fontSize: '11.5px',
                    color: '#1E40AF',
                    fontWeight: 600
                  }}
                >
                  {s.name} ({s.confidence}%)
                </span>
              ))}
            </div>
          </div>

          {/* Projects Extracted */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13.5px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '4px', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#334155' }}>
              Extracted Projects & Evaluated Signals
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(resumeData.projects || []).map(p => (
                <div key={p.id} style={{ padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ color: '#101B36' }}>{p.title}</strong>
                    <span style={{ color: '#3978F6' }}>{p.technologies}</span>
                  </div>
                  <p style={{ margin: '3px 0 0', color: '#475569' }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div style={{ padding: '14px', backgroundColor: '#F0F9FF', borderRadius: '8px', border: '1px solid #BAE6FD', fontSize: '12px', color: '#0369A1' }}>
            <strong>CampusCore AI Synthesis:</strong> Candidate resume is strong in technical coverage and clean formatting. For top-tier tech shortlisting, inject quantified metrics (latency, user counts) into project descriptions and feature backend keywords such as Spring Boot and Docker.
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '10.5px', color: '#94A3B8' }}>
            CampusCore Placement Management System • Prototype Demo Data
          </div>
        </div>
      </div>
    </div>
  );
}
