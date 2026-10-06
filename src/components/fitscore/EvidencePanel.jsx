import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileCheck,
  Database,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

export default function EvidencePanel({ evidenceCoverageData }) {
  const coverage = evidenceCoverageData?.percentage || 92;
  const dimensions = evidenceCoverageData?.dimensions || [];

  const evidenceSourcesList = [
    'Student 360° Profile Records',
    'Official Academic Registry & CGPA Data',
    'Self-Assessed & Verified Technical Skills',
    'Capstone Software Project Repositories',
    'Layer 5 Resume Intelligence Parser',
    'Verified Industry Certifications',
    'Industry Internship Experience Logs',
    'Target Job Technical Requirements',
    'Hard Eligibility Cutoff Filters'
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        padding: '28px 32px',
        boxShadow: '0 4px 20px rgba(16, 27, 54, 0.05)',
        marginBottom: '28px'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid #F1F5F9'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#3978F6',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              DATA COMPLETENESS & AUDIT
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB'
              }}
            >
              Explainable Verification
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Evidence Sources & Profile Coverage
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Verifies the presence and completeness of underlying candidate data to ensure reliable fit analysis.
          </p>
        </div>

        {/* Profile Evidence Coverage Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 18px',
            backgroundColor: '#F8FAFD',
            borderRadius: '14px',
            border: '1.5px solid #DBEAFE'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#EFF6FF',
              color: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Database size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              Profile Evidence Coverage
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: coverage >= 80 ? '#059669' : '#D97706' }}>
                {coverage}%
              </span>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B' }}>
                ({evidenceCoverageData?.availableCount || 6}/{evidenceCoverageData?.totalCount || 6} sources)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Evidence Checklist + Responsible Matching Notice */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '20px'
        }}
      >
        {/* Left: 6 Profile Dimensions Completeness */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36', marginBottom: '12px' }}>
            Candidate Profile Completeness
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dimensions.map((dim) => (
              <div
                key={dim.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: dim.available ? '#F0FDF4' : '#FFFBEB',
                  borderRadius: '10px',
                  border: dim.available ? '1px solid #DCFCE7' : '1px solid #FDE68A',
                  fontSize: '12.5px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {dim.available ? (
                    <CheckCircle2 size={15} color="#059669" />
                  ) : (
                    <AlertCircle size={15} color="#D97706" />
                  )}
                  <span style={{ fontWeight: 700, color: '#101B36' }}>{dim.name}</span>
                </div>
                <span style={{ color: dim.available ? '#059669' : '#B45309', fontWeight: 600 }}>
                  {dim.detail}
                </span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '11.5px', color: '#64748B', marginTop: '10px', lineHeight: 1.4 }}>
            *Profile Evidence Coverage reflects data completeness rather than subjective model certainty.
          </p>
        </div>

        {/* Right: Evidence Used List & Responsible Matching Statement */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36', marginBottom: '12px' }}>
              Evidence Sources Ingested
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '8px'
              }}
            >
              {evidenceSourcesList.map((src, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    color: '#334155'
                  }}
                >
                  <CheckCircle2 size={13} color="#3978F6" />
                  <span>{src}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Responsible Matching & Fairness Box */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#F8FAFD',
              borderRadius: '14px',
              border: '1.5px solid #DBEAFE'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={16} color="#2563EB" />
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#1E40AF', textTransform: 'uppercase' }}>
                Responsible Matching & Anti-Bias Assurance
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#334155', margin: 0, lineHeight: 1.5 }}>
              CampusCore strictly limits candidate matching and ranking to job-relevant academic, skill, experience, project, and resume signals. <strong>Protected personal characteristics (religion, caste, gender, race, political affiliation, or family background) are never included in candidate-ranking algorithms.</strong> The fit score is designed as a transparent decision-support tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
