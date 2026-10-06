import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, TrendingUp, AlertCircle, CheckCircle2, ChevronRight, Upload } from 'lucide-react';

export default function ResumeIntelligenceSummaryCard() {
  const navigate = useNavigate();

  // Metrics from specification
  const stats = {
    analyzed: 842,
    avgScore: 76,
    needsImprovement: 286,
    strongResumes: 418,
    notYetAnalyzed: 406,
    totalCohort: 1248
  };

  const strongPct = Math.round((stats.strongResumes / stats.totalCohort) * 100);
  const needsImpPct = Math.round((stats.needsImprovement / stats.totalCohort) * 100);
  const unanalyzedPct = Math.round((stats.notYetAnalyzed / stats.totalCohort) * 100);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(16, 27, 54, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Accent */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(57, 120, 246, 0.08) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563EB'
                }}
              >
                <FileText size={18} />
              </div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                Resume Intelligence
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
              Automated career extraction, ATS scoring & skill intelligence
            </p>
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
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

        {/* Top 2 Primary KPI Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '18px'
          }}
        >
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0'
            }}
          >
            <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, display: 'block' }}>
              Students Analyzed
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#101B36', letterSpacing: '-0.02em' }}>
                {stats.analyzed}
              </span>
              <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>/ {stats.totalCohort}</span>
            </div>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600, display: 'block', marginTop: '3px' }}>
              67.5% cohort coverage
            </span>
          </div>

          <div
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE'
            }}
          >
            <span style={{ fontSize: '11.5px', color: '#1E40AF', fontWeight: 600, display: 'block' }}>
              Average Resume Score
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '4px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#2563EB', letterSpacing: '-0.02em' }}>
                {stats.avgScore}
              </span>
              <span style={{ fontSize: '13px', color: '#3B82F6', fontWeight: 600 }}>/ 100</span>
            </div>
            <span style={{ fontSize: '11px', color: '#2563EB', fontWeight: 600, display: 'block', marginTop: '3px' }}>
              Good — Competitive Cohort
            </span>
          </div>
        </div>

        {/* 3 Detail Metric Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
          {/* Strong Resumes */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #DCFCE7'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={14} color="#16A34A" />
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#166534' }}>Strong Resumes (Score ≥ 75)</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#166534' }}>{stats.strongResumes}</span>
          </div>

          {/* Needs Improvement */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#FFFBEB',
              border: '1px solid #FEF3C7'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={14} color="#D97706" />
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#92400E' }}>Needs Improvement (Score &lt; 75)</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#92400E' }}>{stats.needsImprovement}</span>
          </div>

          {/* Not Yet Analyzed */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#94A3B8' }} />
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>Not Yet Analyzed</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#475569' }}>{stats.notYetAnalyzed}</span>
          </div>
        </div>

        {/* Stacked Cohort Distribution Bar */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', marginBottom: '5px' }}>
            <span>Cohort Breakdown</span>
            <span>{strongPct}% Strong • {needsImpPct}% Needs Work • {unanalyzedPct}% Pending</span>
          </div>
          <div style={{ height: '7px', borderRadius: '10px', backgroundColor: '#E2E8F0', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: `${strongPct}%`, backgroundColor: '#10B981' }} title={`Strong: ${stats.strongResumes}`} />
            <div style={{ width: `${needsImpPct}%`, backgroundColor: '#F59E0B' }} title={`Needs Improvement: ${stats.needsImprovement}`} />
            <div style={{ width: `${unanalyzedPct}%`, backgroundColor: '#CBD5E1' }} title={`Pending: ${stats.notYetAnalyzed}`} />
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div style={{ display: 'flex', gap: '10px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
        <button
          onClick={() => navigate('/officer/resume-intelligence')}
          style={{
            flex: 1,
            padding: '9px 14px',
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
          <span>View Resume Insights</span>
          <ChevronRight size={15} />
        </button>

        <button
          onClick={() => navigate('/officer/students/std-1/resume')}
          style={{
            padding: '9px 14px',
            borderRadius: '8px',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            border: '1px solid #BFDBFE',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#DBEAFE'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
          title="Inspect Rahul Kumar demo resume"
        >
          <Upload size={14} />
          <span>Demo Resume</span>
        </button>
      </div>
    </div>
  );
}
