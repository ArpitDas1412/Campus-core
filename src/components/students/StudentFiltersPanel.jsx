import React from 'react';
import { Filter, X, Check, RotateCcw } from 'lucide-react';

export const ALL_SKILLS = [
  'Java',
  'Python',
  'C++',
  'JavaScript',
  'React',
  'SQL',
  'Machine Learning',
  'Data Structures',
  'AWS',
  'Communication'
];

export const DEPARTMENTS = [
  'All Departments',
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Electrical',
  'Mechanical',
  'Civil'
];

export const GRADUATION_YEARS = ['All Years', '2027', '2028', '2029'];

export const READINESS_LEVELS = [
  'All Levels',
  'Job Ready',
  'Nearly Ready',
  'Needs Improvement',
  'Critical'
];

export const CGPA_RANGES = [
  'All CGPA',
  '9.0+',
  '8.0–8.99',
  '7.0–7.99',
  'Below 7'
];

export const PLACEMENT_STATUSES = [
  'All Statuses',
  'Not Placed',
  'Shortlisted',
  'Placed',
  'Offer Accepted',
  'Offer Declined'
];

export default function StudentFiltersPanel({
  isOpen,
  onClose,
  filters,
  setFilters,
  onApply,
  onClear,
  activeFilterCount
}) {
  if (!isOpen) return null;

  const handleSkillToggle = (skill) => {
    const current = filters.skills || [];
    if (current.includes(skill)) {
      setFilters({ ...filters, skills: current.filter((s) => s !== skill) });
    } else {
      setFilters({ ...filters, skills: [...current, skill] });
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #CBD5E1',
        padding: '20px 24px',
        boxShadow: '0 12px 32px -4px rgba(16, 27, 54, 0.08)',
        marginBottom: '20px'
      }}
      className="animate-scale-in"
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          borderBottom: '1px solid #F1F5F9',
          paddingBottom: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} style={{ color: '#3978F6' }} />
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            Filter Student Cohort
          </h4>
          {activeFilterCount > 0 && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                padding: '2px 8px',
                borderRadius: '6px'
              }}
            >
              {activeFilterCount} active
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '6px'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Grid of Filters */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        {/* Department Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
            Department
          </label>
          <select
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '13px',
              fontWeight: 600,
              color: '#101B36',
              outline: 'none'
            }}
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Graduation Year */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
            Graduation Year
          </label>
          <select
            value={filters.graduationYear}
            onChange={(e) => setFilters({ ...filters, graduationYear: e.target.value })}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '13px',
              fontWeight: 600,
              color: '#101B36',
              outline: 'none'
            }}
          >
            {GRADUATION_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Readiness Level */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
            Readiness Level
          </label>
          <select
            value={filters.readinessLevel}
            onChange={(e) => setFilters({ ...filters, readinessLevel: e.target.value })}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '13px',
              fontWeight: 600,
              color: '#101B36',
              outline: 'none'
            }}
          >
            {READINESS_LEVELS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* CGPA */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
            CGPA Threshold
          </label>
          <select
            value={filters.cgpa}
            onChange={(e) => setFilters({ ...filters, cgpa: e.target.value })}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '13px',
              fontWeight: 600,
              color: '#101B36',
              outline: 'none'
            }}
          >
            {CGPA_RANGES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Placement Status */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
            Placement Status
          </label>
          <select
            value={filters.placementStatus}
            onChange={(e) => setFilters({ ...filters, placementStatus: e.target.value })}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '13px',
              fontWeight: 600,
              color: '#101B36',
              outline: 'none'
            }}
          >
            {PLACEMENT_STATUSES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Multi-Select Skills Section */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>
            Skills (Select Multiple):
          </label>
          {filters.skills?.length > 0 && (
            <button
              onClick={() => setFilters({ ...filters, skills: [] })}
              style={{ fontSize: '11px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Clear Skills
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {ALL_SKILLS.map((skill) => {
            const isSelected = filters.skills?.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: isSelected ? '#3978F6' : '#CBD5E1',
                  backgroundColor: isSelected ? '#EEF4FF' : '#FFFFFF',
                  color: isSelected ? '#2563EB' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                {isSelected && <Check size={13} style={{ color: '#2563EB' }} />}
                <span>{skill}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Buttons: Apply & Clear */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #F1F5F9',
          paddingTop: '14px'
        }}
      >
        <button
          onClick={onClear}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#64748B',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={14} />
          <span>Clear Filters</span>
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px' }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onApply();
              onClose();
            }}
            className="btn btn-primary"
            style={{ padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
