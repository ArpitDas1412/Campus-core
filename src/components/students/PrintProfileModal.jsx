import React, { useRef } from 'react';
import { X, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PrintProfileModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

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
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar (hidden when printing) */}
        <div
          className="no-print"
          style={{
            padding: '16px 24px',
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700 }}>Printable Student Readiness Dossier</span>
            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.15)' }}>
              {student.id}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
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
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #101B36', paddingBottom: '18px', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', color: '#3978F6', textTransform: 'uppercase', marginBottom: '4px' }}>
                CampusCore Verified Student Profile
              </div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#101B36' }}>
                {student.name}
              </h1>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#475569', fontWeight: 500 }}>
                {student.department} • Batch of {student.graduationYear} • ID: {student.id}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  backgroundColor: student.readinessScore >= 85 ? '#ECFDF5' : '#EFF6FF',
                  border: student.readinessScore >= 85 ? '1.5px solid #10B981' : '1.5px solid #3978F6',
                  color: student.readinessScore >= 85 ? '#065F46' : '#1E40AF',
                  fontWeight: 800,
                  fontSize: '15px'
                }}
              >
                Readiness: {student.readinessScore}% ({student.readinessLevel})
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                Placement Status: <strong>{student.placementStatus}</strong>
              </div>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '12px 16px', backgroundColor: '#F8FAFC', borderRadius: '10px', marginBottom: '24px', fontSize: '12.5px' }}>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>Email</span>
              <strong>{student.email}</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>Phone</span>
              <strong>{student.phone}</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>Location</span>
              <strong>{student.location || 'Campus / Hostels'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>Cumulative GPA</span>
              <strong style={{ color: '#3978F6' }}>{student.cgpa} / 10.0</strong>
            </div>
          </div>

          {/* Academic Profile */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155' }}>
              Academic Performance
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', fontSize: '12.5px' }}>
              <div style={{ padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Degree</span>
                <strong>{student.academic?.degree || 'B.Tech'}</strong>
              </div>
              <div style={{ padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>CGPA</span>
                <strong>{student.cgpa}</strong>
              </div>
              <div style={{ padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>10th Standard</span>
                <strong>{student.academic?.tenthPercentage || student.tenthPercentage || 92}%</strong>
              </div>
              <div style={{ padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>12th Standard</span>
                <strong>{student.academic?.twelfthPercentage || student.twelfthPercentage || 89}%</strong>
              </div>
              <div style={{ padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Backlogs</span>
                <strong>{student.academic?.backlogs ?? student.backlogs ?? 0}</strong>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155' }}>
              Technical Competencies
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(student.skills || []).map(skill => (
                <span
                  key={skill}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    color: '#1E40AF',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155' }}>
              Highlighted Projects
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(student.projects || []).map((proj, idx) => (
                <div key={idx} style={{ padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: '8px', backgroundColor: '#F8FAFC' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '13.5px', color: '#101B36' }}>{proj.title}</strong>
                    <span style={{ fontSize: '11.5px', color: '#3978F6', fontWeight: 600 }}>{proj.technologies}</span>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#475569' }}>{proj.description}</p>
                  {proj.impact && (
                    <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '3px' }}>
                      Impact: {proj.impact}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Career Preferences */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155' }}>
                Certifications
              </h3>
              {(student.certifications || []).map((c, i) => (
                <div key={i} style={{ fontSize: '12px', marginBottom: '6px' }}>
                  • <strong>{c.name}</strong> — {c.issuer} ({c.year})
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155' }}>
                Target Career Roles
              </h3>
              <div style={{ fontSize: '12px', color: '#334155' }}>
                <p style={{ margin: '0 0 4px' }}><strong>Roles:</strong> {(student.careerPreferences?.roles || []).join(', ')}</p>
                <p style={{ margin: '0 0 4px' }}><strong>Locations:</strong> {(student.careerPreferences?.locations || []).join(', ')}</p>
                <p style={{ margin: '0' }}><strong>Target Bracket:</strong> {student.careerPreferences?.expectedSalary || '₹6–10 LPA'}</p>
              </div>
            </div>
          </div>

          {/* AI Assessment Summary Footer */}
          <div style={{ padding: '14px 18px', backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '10px', fontSize: '12px', color: '#0369A1' }}>
            <strong>CampusCore AI Executive Appraisal:</strong> {student.aiSummary?.text || 'Demonstrates strong technical fundamentals and project portfolio. Suitable for core software development roles with immediate recruitment eligibility.'}
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '11px', color: '#94A3B8' }}>
            Generated via CampusCore Placement Management System • Prototype Demo Data
          </div>
        </div>
      </div>
    </div>
  );
}
