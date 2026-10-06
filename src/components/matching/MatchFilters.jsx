import React from 'react';
import { Search, Filter, RotateCcw, ArrowUpDown, ChevronDown } from 'lucide-react';

export default function MatchFilters({
  filters,
  onFilterChange,
  onResetFilters,
  resultCount = 0
}) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #E2E8F0',
        padding: '18px 20px',
        boxShadow: '0 2px 8px rgba(16, 27, 54, 0.04)',
        marginBottom: '20px'
      }}
    >
      {/* Row 1: Search & Sorting */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '16px'
        }}
      >
        {/* Search Input */}
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94A3B8'
            }}
          />
          <input
            type="text"
            placeholder="Search by candidate name, skill (Java, React, SQL), project or department..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              fontSize: '13.5px',
              color: '#101B36',
              outline: 'none',
              backgroundColor: '#F8FAFC'
            }}
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange('search', '')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
            <ArrowUpDown size={14} />
            <span>Sort by:</span>
          </div>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            style={{
              padding: '9px 14px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              fontSize: '13px',
              color: '#101B36',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <option value="score_desc">Match Score — Highest First</option>
            <option value="cgpa_desc">CGPA — Highest First</option>
            <option value="skill_desc">Required Skill Coverage ↓</option>
            <option value="project_desc">Project Relevance ↓</option>
            <option value="resume_desc">Resume Relevance ↓</option>
            <option value="experience_desc">Experience Signals ↓</option>
          </select>

          <button
            onClick={onResetFilters}
            style={{
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#64748B',
              fontSize: '12.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Reset all filters"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Row 2: Secondary Dropdown Filters Strip */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px',
          paddingTop: '12px',
          borderTop: '1px solid #F1F5F9',
          fontSize: '12.5px'
        }}
      >
        {/* Recommendation Tier */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#64748B' }}>Tier:</span>
          <select
            value={filters.tier}
            onChange={(e) => onFilterChange('tier', e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              color: '#101B36',
              fontWeight: 600
            }}
          >
            <option value="All">All Tiers</option>
            <option value="Strong Match">Strong Match (90–100%)</option>
            <option value="Good Match">Good Match (80–89%)</option>
            <option value="Potential Match">Potential Match (70–79%)</option>
            <option value="Partial Match">Partial Match (60–69%)</option>
          </select>
        </div>

        {/* Department Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#64748B' }}>Dept:</span>
          <select
            value={filters.department}
            onChange={(e) => onFilterChange('department', e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              color: '#101B36',
              fontWeight: 600
            }}
          >
            <option value="All">All Departments</option>
            <option value="CSE">Computer Science (CSE)</option>
            <option value="IT">Information Tech (IT)</option>
            <option value="ECE">Electronics (ECE)</option>
            <option value="EEE">Electrical (EEE)</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>

        {/* Min Match Score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#64748B' }}>Score:</span>
          <select
            value={filters.minScore}
            onChange={(e) => onFilterChange('minScore', e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              color: '#101B36',
              fontWeight: 600
            }}
          >
            <option value="All">All Scores</option>
            <option value="90">90%+ (Top Tier)</option>
            <option value="80">80%+ (Strong/Good)</option>
            <option value="70">70%+ (Potential)</option>
            <option value="60">60%+ (Passing)</option>
          </select>
        </div>

        {/* Min CGPA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#64748B' }}>CGPA:</span>
          <select
            value={filters.minCgpa}
            onChange={(e) => onFilterChange('minCgpa', e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              color: '#101B36',
              fontWeight: 600
            }}
          >
            <option value="All">All CGPA</option>
            <option value="8.5">8.5+ CGPA</option>
            <option value="8.0">8.0+ CGPA</option>
            <option value="7.5">7.5+ CGPA</option>
            <option value="7.0">7.0+ CGPA</option>
          </select>
        </div>

        {/* Skill Coverage */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#64748B' }}>Skill Cov:</span>
          <select
            value={filters.skillCoverage}
            onChange={(e) => onFilterChange('skillCoverage', e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              color: '#101B36',
              fontWeight: 600
            }}
          >
            <option value="All">Any Coverage</option>
            <option value="100">100% Core Skills</option>
            <option value="80">80%+ Core Skills</option>
            <option value="60">60%+ Core Skills</option>
          </select>
        </div>

        {/* Experience */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#64748B' }}>Exp:</span>
          <select
            value={filters.experience}
            onChange={(e) => onFilterChange('experience', e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              color: '#101B36',
              fontWeight: 600
            }}
          >
            <option value="All">Any Experience</option>
            <option value="internship">Has Internship</option>
            <option value="none">Freshers / Academic</option>
          </select>
        </div>

        {/* Filtered Count Indicator */}
        <div style={{ marginLeft: 'auto', color: '#64748B', fontWeight: 600 }}>
          Showing <span style={{ color: '#101B36', fontWeight: 800 }}>{resultCount}</span> matching candidates
        </div>
      </div>
    </div>
  );
}
