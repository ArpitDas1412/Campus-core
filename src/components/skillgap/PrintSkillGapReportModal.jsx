import React from 'react';
import { X, Printer, Download, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function PrintSkillGapReportModal({ isOpen, onClose, student, analysis, role }) {
  if (!isOpen || !student || !analysis) return null;

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
        {/* Toolbar */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="#36C5E8" />
            <span style={{ fontSize: '14px', fontWeight: 800 }}>CampusCore AI Skill-Gap Appraisal Report</span>
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
                CampusCore AI Skill-Gap Audit
              </span>
              <h1 style={{ margin: '4px 0', fontSize: '24px', fontWeight: 900, color: '#101B36' }}>
                {student.name}
              </h1>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                ID: {student.id} • {student.department} • CGPA: {student.cgpa}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Target Benchmark</span>
              <h3 style={{ margin: '2px 0 0', fontSize: '18px', fontWeight: 800, color: '#101B36' }}>
                {analysis.roleTitle}
              </h3>
              <div
                style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: analysis.overallScore >= 85 ? '#ECFDF5' : '#EFF6FF',
                  color: analysis.overallScore >= 85 ? '#065F46' : '#1E40AF',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  marginTop: '4px'
                }}
              >
                Role Readiness: {analysis.overallScore}% ({analysis.readinessLevel})
              </div>
            </div>
          </div>

          {/* Metric Summary Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '10px', marginBottom: '24px', textAlign: 'center' }}>
            <div>
              <span style={{ fontSize: '11.5px', color: '#64748B', display: 'block' }}>Overall Fit Score</span>
              <strong style={{ fontSize: '22px', color: '#3978F6' }}>{analysis.overallScore}%</strong>
            </div>
            <div>
              <span style={{ fontSize: '11.5px', color: '#059669', display: 'block' }}>Matched Skills</span>
              <strong style={{ fontSize: '22px', color: '#059669' }}>{analysis.matchedSkills.length}</strong>
            </div>
            <div>
              <span style={{ fontSize: '11.5px', color: '#D97706', display: 'block' }}>Partial Skills</span>
              <strong style={{ fontSize: '22px', color: '#D97706' }}>{analysis.partialSkills.length}</strong>
            </div>
            <div>
              <span style={{ fontSize: '11.5px', color: '#DC2626', display: 'block' }}>Skill Gaps</span>
              <strong style={{ fontSize: '22px', color: '#DC2626' }}>{analysis.missingSkills.length}</strong>
            </div>
          </div>

          {/* Priority Skill Gaps */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155' }}>
              Priority Skill Gaps Requiring Bridge Intervention
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {analysis.priorityGaps.slice(0, 4).map((pg, i) => (
                <div key={i} style={{ padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                  <div>
                    <strong>{pg.name}</strong> — <span style={{ color: '#64748B' }}>Current: {pg.currentLevel} → Target: {pg.targetLevel}</span>
                    <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{pg.whyItMatters}</div>
                  </div>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#991B1B', fontWeight: 700, fontSize: '11px' }}>
                    {pg.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Skills Breakdown Table */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155' }}>
              Skills Breakdown Matrix
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F1F5F9', textAlign: 'left' }}>
                  <th style={{ padding: '6px 10px', borderBottom: '1px solid #CBD5E1' }}>Skill</th>
                  <th style={{ padding: '6px 10px', borderBottom: '1px solid #CBD5E1' }}>Required</th>
                  <th style={{ padding: '6px 10px', borderBottom: '1px solid #CBD5E1' }}>Current</th>
                  <th style={{ padding: '6px 10px', borderBottom: '1px solid #CBD5E1' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...analysis.matchedSkills, ...analysis.partialSkills, ...analysis.missingSkills].map((s, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '6px 10px', fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: '6px 10px', color: '#64748B' }}>{s.requiredLevel}</td>
                    <td style={{ padding: '6px 10px' }}>{s.currentLevel}</td>
                    <td style={{ padding: '6px 10px' }}>
                      <span
                        style={{
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: s.status === 'Matched' ? '#ECFDF5' : s.status === 'Partial' ? '#FEF3C7' : '#FEF2F2',
                          color: s.status === 'Matched' ? '#065F46' : s.status === 'Partial' ? '#92400E' : '#991B1B'
                        }}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 6-Week Actionable Roadmap */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155' }}>
              Personalized 6-Week Learning Roadmap
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '11.5px' }}>
              {analysis.roadmap.map(rm => (
                <div key={rm.week} style={{ padding: '8px 10px', border: '1px solid #E2E8F0', borderRadius: '6px', backgroundColor: '#F8FAFC' }}>
                  <strong style={{ color: '#3978F6' }}>Week {rm.week}: {rm.title}</strong>
                  <div style={{ color: '#475569', marginTop: '2px' }}>{rm.focus}</div>
                  <div style={{ color: '#64748B', marginTop: '3px', fontSize: '10.5px' }}>Effort: {rm.hours} hrs</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Explainability & Summary */}
          <div style={{ padding: '14px', backgroundColor: '#EFF6FF', borderRadius: '8px', border: '1px solid #BFDBFE', fontSize: '12px', color: '#1E3A8A' }}>
            <strong>CampusCore AI Executive Synthesis:</strong> {analysis.aiInsightText}
            <div style={{ marginTop: '6px', fontSize: '11px', color: '#3B82F6' }}>
              Estimated improvement potential: {analysis.overallScore}% → {analysis.improvementPotential}% upon roadmap completion.
            </div>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '10.5px', color: '#94A3B8' }}>
            CampusCore Placement Management Prototype • Demo AI Engine Evaluation
          </div>
        </div>
      </div>
    </div>
  );
}
