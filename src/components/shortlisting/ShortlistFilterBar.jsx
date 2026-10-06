import React from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import {
  AI_RECOMMENDATION_STATUS,
  RECRUITER_DECISION_STATUS
} from '../../data/shortlistingConfig.js';

export default function ShortlistFilterBar({
  filters,
  onChangeFilter,
  onResetFilters,
  totalCount,
  filteredCount,
  viewMode = 'table',
  onChangeViewMode
}) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '16px 20px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}
    >
      {/* Top Search & View Mode Toggle */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 320px', maxWidth: '420px' }}>
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
            placeholder="Search by candidate name, roll no, department, or skill..."
            value={filters.search}
            onChange={(e) => onChangeFilter('search', e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              color: '#101B36',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* View Mode Toggle & Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            Showing <strong>{filteredCount}</strong> of {totalCount} candidates
          </span>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F1F5F9',
              borderRadius: '8px',
              padding: '2px',
              border: '1px solid #E2E8F0'
            }}
          >
            <button
              onClick={() => onChangeViewMode('table')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'table' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'table' ? '#2563EB' : '#64748B',
                boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Table View"
            >
              <List size={14} />
              <span>Table</span>
            </button>
            <button
              onClick={() => onChangeViewMode('cards')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'cards' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'cards' ? '#2563EB' : '#64748B',
                boxShadow: viewMode === 'cards' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Card View"
            >
              <LayoutGrid size={14} />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips & Sorting Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px',
          paddingTop: '10px',
          borderTop: '1px solid #F1F5F9',
          fontSize: '12.5px'
        }}
      >
        {/* Recommendation Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#475569', fontWeight: 600 }}>AI Rec:</span>
          <select
            value={filters.recommendation}
            onChange={(e) => onChangeFilter('recommendation', e.target.value)}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '12px',
              fontWeight: 600,
              color: '#101B36',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Recommendations</option>
            <option value={AI_RECOMMENDATION_STATUS.RECOMMENDED}>AI Recommended</option>
            <option value={AI_RECOMMENDATION_STATUS.NEEDS_REVIEW}>Needs Review</option>
            <option value={AI_RECOMMENDATION_STATUS.NOT_RECOMMENDED}>Not Recommended</option>
            <option value={AI_RECOMMENDATION_STATUS.INELIGIBLE}>Ineligible</option>
          </select>
        </div>

        {/* Recruiter Decision Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#475569', fontWeight: 600 }}>Decision:</span>
          <select
            value={filters.decision}
            onChange={(e) => onChangeFilter('decision', e.target.value)}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '12px',
              fontWeight: 600,
              color: '#101B36',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Decisions</option>
            <option value={RECRUITER_DECISION_STATUS.PENDING}>Pending</option>
            <option value={RECRUITER_DECISION_STATUS.SHORTLISTED}>Shortlisted</option>
            <option value={RECRUITER_DECISION_STATUS.NEEDS_REVIEW}>Needs Review</option>
            <option value={RECRUITER_DECISION_STATUS.ON_HOLD}>On Hold</option>
            <option value={RECRUITER_DECISION_STATUS.REJECTED}>Rejected</option>
          </select>
        </div>

        {/* Department Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#475569', fontWeight: 600 }}>Dept:</span>
          <select
            value={filters.department}
            onChange={(e) => onChangeFilter('department', e.target.value)}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '12px',
              fontWeight: 600,
              color: '#101B36',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
          <span style={{ color: '#475569', fontWeight: 600 }}>Sort By:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onChangeFilter('sortBy', e.target.value)}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '12px',
              fontWeight: 600,
              color: '#101B36',
              cursor: 'pointer'
            }}
          >
            <option value="score_desc">Fit Score: High to Low</option>
            <option value="score_asc">Fit Score: Low to High</option>
            <option value="skills_desc">Skill Coverage: High to Low</option>
            <option value="cgpa_desc">CGPA: High to Low</option>
            <option value="rank_asc">Rank: 1 to N</option>
          </select>

          {/* Reset Filters */}
          <button
            onClick={onResetFilters}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 10px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: '1px solid #CBD5E1',
              color: '#64748B',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Reset Filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
