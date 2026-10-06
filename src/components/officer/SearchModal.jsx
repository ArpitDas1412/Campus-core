import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Users,
  Building,
  Calendar,
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { searchPlacementData } from '../../data';

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ students: [], recruiters: [], drives: [] });

  useEffect(() => {
    if (query.trim()) {
      setResults(searchPlacementData(query));
    } else {
      // Default initial suggestions showing Rahul Kumar and top companies
      setResults(searchPlacementData(''));
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalFound =
    results.students.length + results.recruiters.length + results.drives.length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 17, 35, 0.6)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 16px 20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(16, 27, 54, 0.25)',
          border: '1px solid #CBD5E1',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF'
          }}
        >
          <Search size={20} style={{ color: '#3978F6' }} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type 'Rahul', 'Computer Science', 'TCS', or 'Software Engineer'..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: '#101B36',
              fontWeight: 500,
              backgroundColor: 'transparent'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={16} />
            </button>
          )}
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: '#F1F5F9',
              padding: '3px 8px',
              borderRadius: '6px',
              color: '#64748B'
            }}
          >
            ESC to close
          </span>
        </div>

        {/* Quick Suggestion Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #F1F5F9',
            fontSize: '12px',
            color: '#64748B',
            overflowX: 'auto'
          }}
        >
          <span>Suggestions:</span>
          {['Rahul', 'TCS', 'Computer Science', 'Infosys', 'Amazon'].map((pill) => (
            <button
              key={pill}
              onClick={() => setQuery(pill)}
              style={{
                fontSize: '11.5px',
                fontWeight: 600,
                color: '#3978F6',
                backgroundColor: '#FFFFFF',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer'
              }}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Search Results Container */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 20px' }}>
          {query.trim() && totalFound === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 20px', color: '#64748B' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#101B36' }}>
                No records matching "{query}"
              </div>
              <p style={{ fontSize: '13px', marginTop: '4px' }}>
                Try searching by student name, roll number, company, or job role.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* STUDENTS SECTION */}
              {results.students.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#64748B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <GraduationCap size={14} style={{ color: '#3978F6' }} />
                    <span>Students ({results.students.length})</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {results.students.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onSelectResult && onSelectResult('student', s);
                          onClose();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          backgroundColor: '#F8FAFD',
                          border: '1px solid #E2E8F0',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#EFF6FF';
                          e.currentTarget.style.borderColor = '#BFDBFE';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#F8FAFD';
                          e.currentTarget.style.borderColor = '#E2E8F0';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '8px',
                              backgroundColor: '#3978F6',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '12px'
                            }}
                          >
                            {s.avatar || 'ST'}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                              {s.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>
                              Department: <strong>{s.department}</strong> • CGPA: {s.cgpa}
                            </div>
                          </div>
                        </div>

                        {/* Exact prompt spec for search result: Readiness & Status */}
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>
                            Readiness: {s.readinessScore}%
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>
                            Status: <span style={{ fontWeight: 600, color: '#101B36' }}>{s.placementStatus}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RECRUITERS SECTION */}
              {results.recruiters.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#64748B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Building size={14} style={{ color: '#8B5CF6' }} />
                    <span>Recruiters & Companies ({results.recruiters.length})</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {results.recruiters.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => {
                          onSelectResult && onSelectResult('recruiter', r);
                          onClose();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          backgroundColor: '#F8FAFD',
                          border: '1px solid #E2E8F0',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#F5F3FF';
                          e.currentTarget.style.borderColor = '#DDD6FE';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#F8FAFD';
                          e.currentTarget.style.borderColor = '#E2E8F0';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '8px',
                              backgroundColor: r.logoBg || '#8B5CF6',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '11.5px'
                            }}
                          >
                            {r.shortName || r.company.slice(0, 3)}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                              {r.company}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>
                              Recruiter: {r.recruiterName} • {r.industry}
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
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
                            {r.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PLACEMENT DRIVES SECTION */}
              {results.drives.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#64748B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Calendar size={14} style={{ color: '#0E8EA8' }} />
                    <span>Placement Drives ({results.drives.length})</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {results.drives.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => {
                          onSelectResult && onSelectResult('drive', d);
                          onClose();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          backgroundColor: '#F8FAFD',
                          border: '1px solid #E2E8F0',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#EBF9FD';
                          e.currentTarget.style.borderColor = '#BAE6FD';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#F8FAFD';
                          e.currentTarget.style.borderColor = '#E2E8F0';
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                            {d.company} — {d.role}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>
                            Date: {d.date} • Eligible: {d.eligibleStudents} students
                          </div>
                        </div>

                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#EFF6FF',
                            color: '#2563EB'
                          }}
                        >
                          {d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
