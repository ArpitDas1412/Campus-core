import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function ResumeRelevance({ resumeData, student, role = 'recruiter' }) {
  const navigate = useNavigate();
  if (!resumeData) return null;

  const {
    score = 91,
    atsQualityScore = 82,
    fileName = 'Resume_Profile.pdf',
    matchedKeywords = [],
    missingKeywords = [],
    summary
  } = resumeData;

  const handleOpenResume = () => {
    if (role === 'officer') {
      navigate(`/officer/students/${student?.id || student?.legacyId}/resume`);
    } else {
      navigate(`/student/resume`);
    }
  };

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
                color: '#8B5CF6',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              LAYER 5 INTEGRATION
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#F5F3FF',
                color: '#7C3AED'
              }}
            >
              ATS Semantic Analysis
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Resume Relevance ({score}%)
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Extracted from {fileName} via Layer 5 Resume Intelligence with full ATS keyword alignment.
          </p>
        </div>

        {/* ATS Score & Resume Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: '#F5F3FF',
              borderRadius: '12px',
              border: '1px solid #DDD6FE',
              textAlign: 'right'
            }}
          >
            <div style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 700, textTransform: 'uppercase' }}>
              Resume Quality
            </div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#6D28D9' }}>
              {atsQualityScore} / 100
            </div>
          </div>

          <button
            onClick={handleOpenResume}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '12px',
              backgroundColor: '#8B5CF6',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.15s ease'
            }}
          >
            <span>View Full Resume Analysis</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Keywords Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '16px'
        }}
      >
        {/* Matched Job Keywords */}
        <div
          style={{
            padding: '18px',
            backgroundColor: '#F0FDF4',
            borderRadius: '14px',
            border: '1px solid #BBF7D0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <CheckCircle2 size={16} color="#059669" />
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#065F46', textTransform: 'uppercase' }}>
              Matched Job Keywords ({matchedKeywords.length})
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {matchedKeywords.map((kw) => (
              <span
                key={kw}
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  color: '#047857',
                  border: '1px solid #A7F3D0',
                  boxShadow: '0 1px 3px rgba(5, 150, 105, 0.08)'
                }}
              >
                ✓ {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Missing or Weak Keywords */}
        <div
          style={{
            padding: '18px',
            backgroundColor: '#FFFBEB',
            borderRadius: '14px',
            border: '1px solid #FDE68A'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <AlertCircle size={16} color="#D97706" />
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#92400E', textTransform: 'uppercase' }}>
              Missing or Weak Keywords ({missingKeywords.length})
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {missingKeywords.length === 0 ? (
              <span style={{ fontSize: '12px', color: '#059669' }}>All primary job keywords represented</span>
            ) : (
              missingKeywords.map((kw) => (
                <span
                  key={kw}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    color: '#B45309',
                    border: '1px solid #FCD34D'
                  }}
                >
                  △ {kw}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Summary note */}
      <div style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5 }}>
        {summary || `Candidate resume demonstrates strong vocabulary density around core job technologies, confirming production readiness.`}
      </div>
    </div>
  );
}
