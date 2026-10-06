import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight, TrendingUp, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export default function FitScoreVsSkillGap({ fitScore = 91, student, role = 'recruiter' }) {
  const navigate = useNavigate();
  const readinessScore = student?.readinessScore || 86;

  const handleOpenSkillGap = () => {
    if (role === 'officer') {
      navigate(`/officer/students/${student?.id || student?.legacyId}/skill-gap`);
    } else {
      navigate(`/student/skill-gap`);
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
                color: '#0E8EA8',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              LAYER 4 INTEGRATION
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EBF9FD',
                color: '#0E8EA8'
              }}
            >
              Campus Readiness Sync
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Fit Score vs Skill Gap Readiness
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Cross-references job-specific alignment (Layer 8) with institutional career readiness (Layer 4).
          </p>
        </div>

        {/* View Complete Skill Gap Analysis Button */}
        <button
          onClick={handleOpenSkillGap}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '12px',
            backgroundColor: '#0E8EA8',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(14, 142, 168, 0.3)',
            transition: 'all 0.15s ease'
          }}
        >
          <span>View Complete Skill Gap Analysis</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          alignItems: 'center'
        }}
      >
        {/* Fit Score Box */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#EFF6FF',
            borderRadius: '16px',
            border: '1.5px solid #BFDBFE'
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
            Job Fit Score (Layer 8)
          </div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#1D4ED8', margin: '4px 0' }}>
            {fitScore}%
          </div>
          <div style={{ fontSize: '12.5px', color: '#1E40AF', fontWeight: 600 }}>
            Targeted alignment with current job requirements
          </div>
        </div>

        {/* Skill Gap Readiness Box */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#ECFDF5',
            borderRadius: '16px',
            border: '1.5px solid #A7F3D0'
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>
            Institutional Readiness (Layer 4)
          </div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#047857', margin: '4px 0' }}>
            {readinessScore}%
          </div>
          <div style={{ fontSize: '12.5px', color: '#065F46', fontWeight: 600 }}>
            Baseline campus technical & academic proficiency
          </div>
        </div>

        {/* Relationship Synthesis */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#F8FAFD',
            borderRadius: '16px',
            border: '1px solid #E2E8F0'
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
            Analytical Relationship
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', marginBottom: '6px' }}>
            Strong overall fit with minor preferred-skill gaps.
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
            Candidate displays superior job-specific alignment ({fitScore}%) due to high project overlap with backend requirements, slightly outperforming general institutional readiness ({readinessScore}%).
          </p>
        </div>
      </div>
    </div>
  );
}
