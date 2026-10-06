import React from 'react';
import { X, CheckCircle2, ChevronRight, Award, Sparkles, TrendingUp } from 'lucide-react';
import { JOB_ROLES } from '../../data/jobRoles';
import { analyzeSkillGap } from '../../services/skillGapAnalyzer';

export default function RoleComparisonModal({ isOpen, onClose, student, currentRoleId, onSelectRole }) {
  if (!isOpen || !student) return null;

  // Compute readiness for each role
  const comparisons = JOB_ROLES.map(role => {
    const analysis = analyzeSkillGap(student, role);
    return {
      role,
      score: analysis?.overallScore || 70,
      level: analysis?.readinessLevel || 'Nearly Ready',
      matchedCount: (analysis?.matchedSkills || []).length,
      gapCount: (analysis?.missingSkills || []).length + (analysis?.partialSkills || []).length
    };
  });

  // Sort highest readiness to lowest
  comparisons.sort((a, b) => b.score - a.score);

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
          maxWidth: '740px',
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
              <Sparkles size={16} color="#36C5E8" />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                Multi-Role Career Fit Comparison
              </h3>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#93C5FD' }}>
              Comparing {student.name}'s competencies across {JOB_ROLES.length} career trajectories
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

        {/* List of Roles */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {comparisons.map(({ role, score, level, matchedCount, gapCount }) => {
              const isCurrent = role.id === currentRoleId;
              const isHigh = score >= 85;
              const isModerate = score >= 70 && score < 85;

              return (
                <div
                  key={role.id}
                  onClick={() => {
                    onSelectRole(role.id);
                    onClose();
                  }}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: isCurrent ? '2px solid #3978F6' : '1px solid #E2E8F0',
                    backgroundColor: isCurrent ? '#F0F7FF' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={e => {
                    if (!isCurrent) e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }}
                  onMouseOut={e => {
                    if (!isCurrent) e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        backgroundColor: isHigh ? '#ECFDF5' : isModerate ? '#EFF6FF' : '#FFFBEB',
                        color: isHigh ? '#10B981' : isModerate ? '#3978F6' : '#F59E0B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: '15px'
                      }}
                    >
                      {score}%
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#101B36' }}>
                          {role.title}
                        </h4>
                        {isCurrent && (
                          <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#3978F6', color: '#FFFFFF', fontWeight: 700 }}>
                            ACTIVE SELECTION
                          </span>
                        )}
                      </div>
                      <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748B' }}>
                        {role.targetBracket} • {matchedCount} Matched • {gapCount} Gaps
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        backgroundColor: isHigh ? '#ECFDF5' : isModerate ? '#EFF6FF' : '#FEF2F2',
                        color: isHigh ? '#065F46' : isModerate ? '#1E40AF' : '#991B1B'
                      }}
                    >
                      {level}
                    </span>

                    <button
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: '#3978F6',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <span>Switch Role</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: '#64748B'
          }}
        >
          <span>Click any role to update the active skill-gap breakdown and curriculum.</span>
          <button
            onClick={onClose}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
