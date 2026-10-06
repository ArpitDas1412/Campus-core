import React, { useState, useMemo } from 'react';
import {
  Users,
  Trophy,
  CheckCircle2,
  TrendingUp,
  X,
  ExternalLink,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { calculateMatchScore } from '../../services/candidateMatcher';
import { calculateFitBreakdown } from '../../services/fitExplanationEngine';
import { getStoredStudents } from '../../data';
import { getScoreVisualMeta } from '../../utils/fitScoreUtils';

export default function CandidateComparison({ currentStudent, job, onSelectCandidate }) {
  const allStudents = useMemo(() => getStoredStudents(), []);

  // Default initial 3 candidates to compare: currentStudent + 2 top peers
  const [selectedCandidateIds, setSelectedCandidateIds] = useState(() => {
    const list = [currentStudent?.id];
    allStudents.forEach((s) => {
      if (list.length < 3 && s.id !== currentStudent?.id) {
        list.push(s.id);
      }
    });
    return list;
  });

  // Calculate fit breakdowns for selected candidates
  const candidateAnalyses = useMemo(() => {
    return selectedCandidateIds.map((cid) => {
      const stu = allStudents.find((s) => s.id === cid || s.legacyId === cid) || currentStudent;
      const match = calculateMatchScore(stu, job);
      const breakdown = calculateFitBreakdown(match);
      return {
        student: stu,
        match,
        breakdown,
        overallScore: breakdown.finalScore,
        isCurrent: stu.id === currentStudent?.id
      };
    });
  }, [selectedCandidateIds, allStudents, job, currentStudent]);

  // Find candidate with highest configured score
  const highestCandidate = useMemo(() => {
    if (candidateAnalyses.length === 0) return null;
    return [...candidateAnalyses].sort((a, b) => b.overallScore - a.overallScore)[0];
  }, [candidateAnalyses]);

  const handleAddCandidate = (e) => {
    const newId = e.target.value;
    if (!newId || selectedCandidateIds.includes(newId)) return;
    if (selectedCandidateIds.length >= 3) {
      setSelectedCandidateIds([selectedCandidateIds[0], selectedCandidateIds[1], newId]);
    } else {
      setSelectedCandidateIds([...selectedCandidateIds, newId]);
    }
  };

  const handleRemoveCandidate = (cid) => {
    if (cid === currentStudent?.id) return; // Keep current student
    setSelectedCandidateIds(selectedCandidateIds.filter((id) => id !== cid));
  };

  const metricRows = [
    { label: 'Overall Fit Score', key: 'overall', isTotal: true },
    { label: 'Required Skills (40%)', key: 'requiredSkills' },
    { label: 'Academic Eligibility (20%)', key: 'academicEligibility' },
    { label: 'Project Relevance (15%)', key: 'projectRelevance' },
    { label: 'Resume Relevance (10%)', key: 'resumeRelevance' },
    { label: 'Experience (10%)', key: 'experience' },
    { label: 'Certifications (5%)', key: 'certifications' }
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
              MULTI-CANDIDATE INTELLIGENCE
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
              Side-by-Side Analysis
            </span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Compare Candidate Fit Scores
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Side-by-side factor attribution across up to 3 shortlisted candidates for {job?.title || 'this role'}.
          </p>
        </div>

        {/* Candidate Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Compare with:</span>
          <select
            onChange={handleAddCandidate}
            value=""
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <option value="" disabled>Select a student...</option>
            {allStudents
              .filter((s) => !selectedCandidateIds.includes(s.id))
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.degree} {s.deptCode || s.department} • CGPA {s.cgpa})
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Highest Configured Fit Score Callout Banner */}
      {highestCandidate && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: '#F8FAFD',
            borderRadius: '12px',
            border: '1px solid #DBEAFE',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            color: '#1E293B'
          }}
        >
          <Trophy size={16} color="#3978F6" />
          <span>
            <strong>Highest configured job-fit score:</strong> {highestCandidate.student.name} ({highestCandidate.overallScore}%) — evaluated strictly against active job criteria without subjective human classification.
          </span>
        </div>
      )}

      {/* Comparison Matrix Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
              <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
                Evaluation Pillar
              </th>
              {candidateAnalyses.map((cand) => {
                const visual = getScoreVisualMeta(cand.overallScore);
                return (
                  <th
                    key={cand.student.id}
                    style={{
                      padding: '14px 16px',
                      textAlign: 'center',
                      backgroundColor: cand.isCurrent ? '#EFF6FF' : 'transparent',
                      borderLeft: '1px solid #E2E8F0',
                      borderRight: '1px solid #E2E8F0'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 800, color: '#101B36' }}>
                          {cand.student.name}
                        </span>
                        {cand.isCurrent && (
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 800,
                              padding: '1px 6px',
                              borderRadius: '4px',
                              backgroundColor: '#3978F6',
                              color: '#FFFFFF'
                            }}
                          >
                            Current
                          </span>
                        )}
                        {!cand.isCurrent && (
                          <button
                            onClick={() => handleRemoveCandidate(cand.student.id)}
                            title="Remove candidate from comparison"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#94A3B8',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                          >
                            <X size={13} />
                          </button>
                        )}
                      </div>
                      <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>
                        {cand.student.deptCode || cand.student.department} • CGPA {cand.student.cgpa}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {metricRows.map((row, idx) => (
              <tr
                key={row.key}
                style={{
                  borderBottom: '1px solid #F1F5F9',
                  backgroundColor: row.isTotal ? '#F8FAFC' : idx % 2 === 0 ? '#FFFFFF' : '#FAFCFF',
                  fontWeight: row.isTotal ? 800 : 500
                }}
              >
                <td style={{ padding: '12px 16px', fontSize: '13px', color: row.isTotal ? '#101B36' : '#475569' }}>
                  {row.label}
                </td>

                {candidateAnalyses.map((cand) => {
                  let val = 0;
                  if (row.isTotal) {
                    val = `${cand.overallScore}%`;
                  } else {
                    val = `${cand.breakdown.factors[row.key]?.score || 0}%`;
                  }

                  const isTopInRow = candidateAnalyses.every(
                    (other) =>
                      parseInt(val, 10) >=
                      parseInt(
                        row.isTotal
                          ? other.overallScore
                          : other.breakdown.factors[row.key]?.score || 0,
                        10
                      )
                  );

                  return (
                    <td
                      key={cand.student.id}
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: row.isTotal ? '16px' : '13.5px',
                        fontWeight: isTopInRow || row.isTotal ? 800 : 600,
                        color: row.isTotal
                          ? '#101B36'
                          : isTopInRow
                          ? '#059669'
                          : '#334155',
                        backgroundColor: cand.isCurrent ? '#F0F7FF' : 'transparent',
                        borderLeft: '1px solid #E2E8F0',
                        borderRight: '1px solid #E2E8F0'
                      }}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
