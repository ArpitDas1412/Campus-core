import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';

export default function StudentTable({
  students = [],
  selectedIds = [],
  onToggleSelect,
  onSelectAll,
  allSelected = false
}) {
  const navigate = useNavigate();

  // Readiness badge helper
  const getReadinessBadge = (score) => {
    if (score >= 85) {
      return {
        label: 'JOB READY',
        bg: '#ECFDF5',
        color: '#059669',
        border: '#A7F3D0',
        barColor: '#10B981'
      };
    }
    if (score >= 70) {
      return {
        label: 'NEARLY READY',
        bg: '#EEF4FF',
        color: '#2563EB',
        border: '#BFDBFE',
        barColor: '#3978F6'
      };
    }
    if (score >= 50) {
      return {
        label: 'NEEDS IMPROVEMENT',
        bg: '#FFFBEB',
        color: '#B45309',
        border: '#FDE68A',
        barColor: '#F59E0B'
      };
    }
    return {
      label: 'CRITICAL',
      bg: '#FEF2F2',
      color: '#DC2626',
      border: '#FCA5A5',
      barColor: '#EF4444'
    };
  };

  // Placement status styling helper
  const getPlacementBadge = (status) => {
    switch (status) {
      case 'Offer Accepted':
      case 'Placed':
        return { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' };
      case 'Shortlisted':
        return { bg: '#F3E8FF', color: '#7C3AED', border: '#DDD6FE' };
      case 'Not Placed':
        return { bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' };
      case 'Offer Declined':
        return { bg: '#FEF2F2', color: '#DC2626', border: '#FCA5A5' };
      default:
        return { bg: '#F8FAFC', color: '#64748B', border: '#E2E8F0' };
    }
  };

  if (students.length === 0) {
    return (
      <div
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          border: '1px solid #E2E8F0'
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#F1F5F9',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}
        >
          <AlertTriangle size={24} />
        </div>
        <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: '0 0 6px' }}>
          No Students Found Matching Filters
        </h4>
        <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '420px', margin: '0 auto' }}>
          Try clearing your search keyword, adjusting department selections, or resetting readiness thresholds.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.04)'
      }}
    >
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#F8FAFC',
                borderBottom: '1.5px solid #E2E8F0',
                color: '#64748B',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              <th style={{ padding: '14px 16px', width: '40px' }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  aria-label="Select all students"
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: '#3978F6',
                    cursor: 'pointer'
                  }}
                />
              </th>
              <th style={{ padding: '14px 16px' }}>Student</th>
              <th style={{ padding: '14px 16px' }}>Department</th>
              <th style={{ padding: '14px 16px' }}>CGPA</th>
              <th style={{ padding: '14px 16px' }}>Skills</th>
              <th style={{ padding: '14px 16px' }}>Readiness</th>
              <th style={{ padding: '14px 16px' }}>Placement Status</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const isSelected = selectedIds.includes(student.id);
              const readiness = getReadinessBadge(student.readinessScore);
              const placement = getPlacementBadge(student.placementStatus);

              return (
                <tr
                  key={student.id}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    transition: 'background-color 0.15s ease'
                  }}
                  className="student-table-row"
                  onMouseOver={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFD';
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  {/* Checkbox */}
                  <td style={{ padding: '14px 16px' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(student.id)}
                      aria-label={`Select ${student.name}`}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#3978F6',
                        cursor: 'pointer'
                      }}
                    />
                  </td>

                  {/* Student Name & Avatar */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          backgroundColor: student.avatarBg || '#3978F6',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {student.avatar || 'ST'}
                      </div>
                      <div>
                        <div
                          onClick={() => navigate(`/officer/students/${student.id}`)}
                          style={{
                            fontWeight: 700,
                            color: '#101B36',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
                          onMouseOut={(e) => (e.currentTarget.style.color = '#101B36')}
                        >
                          {student.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B', display: 'flex', gap: '6px' }}>
                          <span>{student.id}</span>
                          {student.rollNo && <span>• {student.rollNo}</span>}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Department & Grad Year */}
                  <td style={{ padding: '14px 16px', fontSize: '13.5px', color: '#334155' }}>
                    <div style={{ fontWeight: 600, color: '#101B36' }}>
                      {student.deptCode || student.department}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                      Grad: {student.graduationYear || '2027'}
                    </div>
                  </td>

                  {/* CGPA */}
                  <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
                    {student.cgpa}
                  </td>

                  {/* Skills (3–4 pills) */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', maxWidth: '240px' }}>
                      {student.skills?.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '2px 7px',
                            borderRadius: '6px',
                            backgroundColor: '#F1F5F9',
                            color: '#475569',
                            border: '1px solid #E2E8F0'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                      {student.skills?.length > 3 && (
                        <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, alignSelf: 'center' }}>
                          +{student.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Readiness Score & Progress */}
                  <td style={{ padding: '14px 16px', minWidth: '150px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 800,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          backgroundColor: readiness.bg,
                          color: readiness.color,
                          border: `1px solid ${readiness.border}`
                        }}
                      >
                        {readiness.label}
                      </span>
                      <strong style={{ fontSize: '13px', color: '#101B36' }}>
                        {student.readinessScore}%
                      </strong>
                    </div>
                    <div
                      style={{
                        height: '5px',
                        backgroundColor: '#E2E8F0',
                        borderRadius: '99px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${student.readinessScore}%`,
                          height: '100%',
                          backgroundColor: readiness.barColor,
                          borderRadius: '99px'
                        }}
                      />
                    </div>
                  </td>

                  {/* Placement Status */}
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: placement.bg,
                        color: placement.color,
                        border: `1px solid ${placement.border}`,
                        display: 'inline-block'
                      }}
                    >
                      {student.placementStatus}
                    </span>
                  </td>

                  {/* View Profile Action */}
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => navigate(`/officer/students/${student.id}`)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: '#101B36',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#3978F6';
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#3978F6';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.color = '#101B36';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                      }}
                    >
                      <span>View Profile</span>
                      <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
