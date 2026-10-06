import React, { useState } from 'react';
import {
  Code2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  X,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award
} from 'lucide-react';

export default function SkillExplanation({ skillData }) {
  const [selectedSkill, setSelectedSkill] = useState(null);

  if (!skillData) return null;

  const {
    matchedCount = 0,
    totalCount = 0,
    percentage = 100,
    required = [],
    preferred = [],
    missingRequired = [],
    missingPreferred = [],
    partialRequired = []
  } = skillData;

  const getBadgeStyle = (badgeType) => {
    switch (badgeType) {
      case 'strong':
        return {
          bg: '#ECFDF5',
          text: '#059669',
          border: '#A7F3D0',
          label: '✓ Strong Match'
        };
      case 'match':
        return {
          bg: '#EFF6FF',
          text: '#2563EB',
          border: '#BFDBFE',
          label: '✓ Match'
        };
      case 'partial':
        return {
          bg: '#FFFBEB',
          text: '#D97706',
          border: '#FDE68A',
          label: '◐ Partial'
        };
      case 'missing':
        return {
          bg: '#FEF2F2',
          text: '#DC2626',
          border: '#FECACA',
          label: '✕ Missing'
        };
      default:
        return {
          bg: '#F8FAFC',
          text: '#64748B',
          border: '#E2E8F0',
          label: 'Neutral'
        };
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
      {/* Section Header with Skill Coverage Counter */}
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
              TECHNICAL ALIGNMENT
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#ECFDF5',
                color: '#059669'
              }}
            >
              Core Job Requirements
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Technical Skill Fit
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Click any skill to inspect verified evidence sources, proficiency alignment, and targeted recommendations.
          </p>
        </div>

        {/* Counter Pill */}
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
            <Code2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              Required Match
            </div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#101B36' }}>
              <span style={{ color: '#059669' }}>{matchedCount}</span> / {totalCount} Skills Matched
            </div>
          </div>
        </div>
      </div>

      {/* Required Skills Interactive Table */}
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr
              style={{
                backgroundColor: '#F8FAFC',
                borderBottom: '1.5px solid #E2E8F0',
                color: '#475569',
                fontSize: '11.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              <th style={{ padding: '12px 16px' }}>Job Skill</th>
              <th style={{ padding: '12px 14px' }}>Required Level</th>
              <th style={{ padding: '12px 14px' }}>Candidate Level</th>
              <th style={{ padding: '12px 16px' }}>Evaluation Result</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>Evidence & Detail</th>
            </tr>
          </thead>
          <tbody>
            {required.map((skill, idx) => {
              const badge = getBadgeStyle(skill.badgeType);
              const isSelected = selectedSkill?.name === skill.name;

              return (
                <tr
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: isSelected ? '#EFF6FF' : idx % 2 === 0 ? '#FFFFFF' : '#FAFCFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#F0F7FF';
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#FFFFFF' : '#FAFCFF';
                  }}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 800, color: '#101B36', fontSize: '14px' }}>
                      {skill.name}
                    </div>
                    {skill.importance && (
                      <span style={{ fontSize: '10.5px', color: '#64748B' }}>
                        {skill.importance} Priority
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '14px 14px', fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                    {skill.requiredLevel}
                  </td>
                  <td style={{ padding: '14px 14px', fontSize: '13px', color: '#101B36', fontWeight: 700 }}>
                    {skill.candidateLevel}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: badge.bg,
                        color: badge.text,
                        border: `1px solid ${badge.border}`,
                        display: 'inline-block'
                      }}
                    >
                      {skill.result || badge.label}
                    </span>
                  </td>
                  <td style={{ padding: '14px 14px', textAlign: 'right' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSkill(skill);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? '#3978F6' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#3978F6',
                        border: '1px solid #CBD5E1',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>Explain</span>
                      <ChevronRight size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Skill Strength Detail Card (Interactive Modal or Drawer embedded) */}
      {selectedSkill && (
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#F8FAFD',
            borderRadius: '16px',
            border: '1.5px solid #DBEAFE',
            marginBottom: '24px',
            position: 'relative'
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: '#EFF6FF',
                  color: '#3978F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Sparkles size={16} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                {selectedSkill.name} — Detailed Alignment Analysis
              </h3>
            </div>

            <button
              onClick={() => setSelectedSkill(null)}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={15} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              fontSize: '13px'
            }}
          >
            <div>
              <div style={{ color: '#64748B', fontWeight: 600 }}>Required vs Candidate Level:</div>
              <div style={{ fontWeight: 800, color: '#101B36', marginTop: '2px' }}>
                Required: {selectedSkill.requiredLevel} • Candidate: {selectedSkill.candidateLevel}
              </div>
              <div style={{ marginTop: '8px', color: '#64748B', fontWeight: 600 }}>Assessment:</div>
              <div style={{ color: '#334155', fontWeight: 700, marginTop: '2px' }}>
                {selectedSkill.assessment}
              </div>
            </div>

            <div>
              <div style={{ color: '#64748B', fontWeight: 600 }}>Verifiable Evidence:</div>
              <ul style={{ margin: '4px 0 0', paddingLeft: '18px', color: '#334155' }}>
                {(selectedSkill.evidence || []).map((ev, i) => (
                  <li key={i} style={{ marginBottom: '2px' }}>
                    {ev}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ color: '#64748B', fontWeight: 600 }}>Actionable Recommendation:</div>
              <div
                style={{
                  marginTop: '4px',
                  padding: '8px 12px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  color: '#1E293B',
                  lineHeight: 1.4
                }}
              >
                {selectedSkill.recommendation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Missing Skills Section Categorized by Impact */}
      <div>
        <div style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', marginBottom: '12px' }}>
          Skill Gaps Affecting Fit
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          {/* Missing Required Category */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#FEF2F2',
              borderRadius: '12px',
              border: '1px solid #FECACA'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', marginBottom: '6px' }}>
              Missing Required ({missingRequired.length})
            </div>
            {missingRequired.length === 0 ? (
              <div style={{ fontSize: '12.5px', color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} />
                <span>All required skills are covered</span>
              </div>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12.5px', color: '#991B1B' }}>
                {missingRequired.map((s) => (
                  <li key={s.name}>
                    <strong>{s.name}</strong> — Essential requirement
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Missing Preferred Category (Non-disqualifying) */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#EFF6FF',
              borderRadius: '12px',
              border: '1px solid #BFDBFE'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', marginBottom: '6px' }}>
              Missing Preferred (Non-Disqualifying)
            </div>
            {missingPreferred.length === 0 ? (
              <div style={{ fontSize: '12.5px', color: '#2563EB' }}>All preferred technologies detected</div>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12.5px', color: '#1E40AF' }}>
                {missingPreferred.slice(0, 3).map((s) => (
                  <li key={s.name}>
                    <strong>△ {s.name}</strong> — Preferred skill; not found in profile
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Weak Evidence / Developing Skills */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#FFFBEB',
              borderRadius: '12px',
              border: '1px solid #FDE68A'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', marginBottom: '6px' }}>
              Weak Evidence / Developing
            </div>
            {partialRequired.length === 0 ? (
              <div style={{ fontSize: '12.5px', color: '#64748B' }}>No partial skill gaps identified</div>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12.5px', color: '#92400E' }}>
                {partialRequired.map((s) => (
                  <li key={s.name}>
                    <strong>◐ {s.name}</strong> — Intermediate grasp; seeking Advanced
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
