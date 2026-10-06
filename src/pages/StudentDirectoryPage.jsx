import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Filter,
  ArrowUpDown,
  Search,
  Sparkles,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Briefcase,
  Layers,
  ChevronDown
} from 'lucide-react';
import Sidebar from '../components/officer/Sidebar';
import Topbar from '../components/officer/Topbar';
import NotificationPanel from '../components/officer/NotificationPanel';
import SearchModal from '../components/officer/SearchModal';
import StudentTable from '../components/students/StudentTable';
import StudentFiltersPanel from '../components/students/StudentFiltersPanel';
import StudentBulkActions from '../components/students/StudentBulkActions';
import ModuleComingSoonModal from '../components/officer/modals/ModuleComingSoonModal';
import { getStoredStudents, saveStoredStudents } from '../data';

export default function StudentDirectoryPage() {
  const navigate = useNavigate();

  // Core Data
  const [students, setStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  // UI state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [comingSoonModal, setComingSoonModal] = useState({
    isOpen: false,
    moduleKey: '',
    moduleTitle: '',
    layerNumber: 3
  });

  // Filter & Search & Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('readiness-desc'); // 'readiness-desc', 'readiness-asc', 'cgpa-desc', 'name-asc', 'dept-asc', 'grad-desc'
  const [filters, setFilters] = useState({
    department: 'All Departments',
    gradYear: 'All Years',
    readinessLevel: 'All Levels',
    cgpaRange: 'All CGPA',
    placementStatus: 'All Statuses',
    skills: []
  });

  // Load students on mount
  useEffect(() => {
    const list = getStoredStudents();
    setStudents(list);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Top stats dynamic calculation
  const stats = useMemo(() => {
    // If demo cohort is smaller than campus representation, display calibrated campus numbers
    // or compute directly from student list. The prompt specifies:
    // Total Students: 1,248, Job Ready: 624, Nearly Ready: 382, Needs Improvement: 168, Critical: 74
    const totalLoaded = students.length;
    if (totalLoaded === 0) {
      return { total: '1,248', jobReady: '624', nearlyReady: '382', needsImp: '168', critical: '74' };
    }
    const jobReadyCount = students.filter(s => s.readinessLevel === 'Job Ready' || s.readinessScore >= 85).length;
    const nearlyReadyCount = students.filter(s => s.readinessLevel === 'Nearly Ready' || (s.readinessScore >= 70 && s.readinessScore < 85)).length;
    const needsImpCount = students.filter(s => s.readinessLevel === 'Needs Improvement' || (s.readinessScore >= 50 && s.readinessScore < 70)).length;
    const criticalCount = students.filter(s => s.readinessLevel === 'Critical' || s.readinessScore < 50).length;

    return {
      total: '1,248',
      jobReady: '624',
      nearlyReady: '382',
      needsImp: '168',
      critical: '74',
      loadedCount: totalLoaded,
      loadedJobReady: jobReadyCount,
      loadedNearlyReady: nearlyReadyCount,
      loadedNeedsImp: needsImpCount,
      loadedCritical: criticalCount
    };
  }, [students]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.department !== 'All Departments') count++;
    if (filters.gradYear !== 'All Years') count++;
    if (filters.readinessLevel !== 'All Levels') count++;
    if (filters.cgpaRange !== 'All CGPA') count++;
    if (filters.placementStatus !== 'All Statuses') count++;
    if (filters.skills && filters.skills.length > 0) count += filters.skills.length;
    return count;
  }, [filters]);

  // Filtered and sorted students
  const filteredStudents = useMemo(() => {
    let result = [...students];

    // Search query: name, ID, skill, or department
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(student => {
        const matchName = student.name?.toLowerCase().includes(q);
        const matchId = student.id?.toLowerCase().includes(q);
        const matchDept = student.department?.toLowerCase().includes(q);
        const matchSkills = (student.skills || []).some(skill => skill.toLowerCase().includes(q));
        const matchStatus = student.placementStatus?.toLowerCase().includes(q);
        return matchName || matchId || matchDept || matchSkills || matchStatus;
      });
    }

    // Filter: Department
    if (filters.department && filters.department !== 'All Departments') {
      result = result.filter(s => {
        const d = (s.department || '').toLowerCase();
        const f = filters.department.toLowerCase();
        if (f.includes('computer')) return d.includes('computer') || d.includes('cse');
        if (f.includes('information')) return d.includes('information') || d.includes('it');
        if (f.includes('electronics')) return d.includes('electronic') || d.includes('ece');
        if (f.includes('electrical')) return d.includes('electrical') || d.includes('eee');
        if (f.includes('mechanical')) return d.includes('mechanical') || d.includes('mech');
        if (f.includes('civil')) return d.includes('civil');
        return d.includes(f);
      });
    }

    // Filter: Graduation Year
    if (filters.gradYear && filters.gradYear !== 'All Years') {
      const targetYear = parseInt(filters.gradYear, 10);
      result = result.filter(s => s.graduationYear === targetYear);
    }

    // Filter: Readiness Level
    if (filters.readinessLevel && filters.readinessLevel !== 'All Levels') {
      result = result.filter(s => s.readinessLevel === filters.readinessLevel);
    }

    // Filter: CGPA Range
    if (filters.cgpaRange && filters.cgpaRange !== 'All CGPA') {
      if (filters.cgpaRange === '9.0+') {
        result = result.filter(s => s.cgpa >= 9.0);
      } else if (filters.cgpaRange === '8.0–8.99' || filters.cgpaRange === '8.0-8.99') {
        result = result.filter(s => s.cgpa >= 8.0 && s.cgpa < 9.0);
      } else if (filters.cgpaRange === '7.0–7.99' || filters.cgpaRange === '7.0-7.99') {
        result = result.filter(s => s.cgpa >= 7.0 && s.cgpa < 8.0);
      } else if (filters.cgpaRange === 'Below 7' || filters.cgpaRange === 'Below 7.0') {
        result = result.filter(s => s.cgpa < 7.0);
      }
    }

    // Filter: Placement Status
    if (filters.placementStatus && filters.placementStatus !== 'All Statuses') {
      result = result.filter(s => s.placementStatus === filters.placementStatus);
    }

    // Filter: Skills (must match all selected skills or any?) - match any selected skill for breadth
    if (filters.skills && filters.skills.length > 0) {
      result = result.filter(s => {
        const studentSkills = (s.skills || []).map(sk => sk.toLowerCase());
        return filters.skills.every(reqSkill => studentSkills.includes(reqSkill.toLowerCase()));
      });
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'readiness-desc':
          return (b.readinessScore || 0) - (a.readinessScore || 0);
        case 'readiness-asc':
          return (a.readinessScore || 0) - (b.readinessScore || 0);
        case 'cgpa-desc':
          return (b.cgpa || 0) - (a.cgpa || 0);
        case 'cgpa-asc':
          return (a.cgpa || 0) - (b.cgpa || 0);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'dept-asc':
          return (a.department || '').localeCompare(b.department || '');
        case 'grad-desc':
          return (b.graduationYear || 0) - (a.graduationYear || 0);
        case 'status-asc':
          return (a.placementStatus || '').localeCompare(b.placementStatus || '');
        default:
          return (b.readinessScore || 0) - (a.readinessScore || 0);
      }
    });

    return result;
  }, [students, searchQuery, filters, sortBy]);

  // Bulk actions handlers
  const handleBulkNotification = (ids) => {
    showToast(`Broadcast notification dispatched to ${ids.length} selected students.`);
    setSelectedStudentIds([]);
  };

  const handleBulkAddToDrive = (ids) => {
    showToast(`${ids.length} students enrolled into next active placement drive.`);
    setSelectedStudentIds([]);
  };

  const handleBulkExport = (ids) => {
    const selectedData = students.filter(s => ids.includes(s.id));
    const jsonStr = JSON.stringify(selectedData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campuscore_students_export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${ids.length} student records as JSON.`);
  };

  const handleBulkMarkPriority = (ids) => {
    const updated = students.map(s => {
      if (ids.includes(s.id)) {
        return { ...s, isPriority: true };
      }
      return s;
    });
    setStudents(updated);
    saveStoredStudents(updated);
    showToast(`Marked ${ids.length} students as high priority for interview rounds.`);
    setSelectedStudentIds([]);
  };

  const handleBulkAnalyze = (ids) => {
    showToast(`AI analysis queued for ${ids.length} selected students.`);
    setSelectedStudentIds([]);
  };

  const handleClearFilters = () => {
    setFilters({
      department: 'All Departments',
      gradYear: 'All Years',
      readinessLevel: 'All Levels',
      cgpaRange: 'All CGPA',
      placementStatus: 'All Statuses',
      skills: []
    });
    setSearchQuery('');
    showToast('Filters cleared.');
  };

  const handleOpenComingSoon = (key, title, layerNum) => {
    setComingSoonModal({
      isOpen: true,
      moduleKey: key,
      moduleTitle: title,
      layerNumber: layerNum || 3
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        color: '#101B36',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        activeModule="students"
        onNavigateModule={handleOpenComingSoon}
      />

      {/* Main Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflowX: 'hidden'
        }}
      >
        <Topbar
          onOpenSearch={() => setSearchModalOpen(true)}
          onToggleNotifications={() => setNotificationPanelOpen(!notificationPanelOpen)}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          title="Student Readiness"
          subtitle="Monitor student profiles, skills, readiness and placement eligibility from one workspace."
          badgeText="Live Directory Active"
        />

        <main style={{ flex: 1, padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          
          {/* Header Action Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    border: '1px solid #BFDBFE'
                  }}
                >
                  <Sparkles size={11} /> Layer 3: Student Readiness
                </span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  • {filteredStudents.length} candidate{filteredStudents.length !== 1 ? 's' : ''} listed
                </span>
              </div>
              <h2
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#101B36',
                  margin: '4px 0 0',
                  letterSpacing: '-0.02em'
                }}
              >
                Student Readiness Directory
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => navigate('/officer/students/add')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#2563EB'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#3978F6'}
              >
                <UserPlus size={16} />
                <span>+ Add Student</span>
              </button>
            </div>
          </div>

          {/* Top Statistics Cards (Section 23) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
              marginBottom: '24px'
            }}
          >
            {/* Total Students */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '16px 20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  color: '#3978F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Users size={22} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>
                  Total Students
                </p>
                <p style={{ margin: '3px 0 0', fontSize: '24px', fontWeight: 800, color: '#101B36', letterSpacing: '-0.02em' }}>
                  {stats.total}
                </p>
              </div>
            </div>

            {/* Job Ready */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '16px 20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <CheckCircle2 size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <p style={{ margin: 0, fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>
                    Job Ready
                  </p>
                  <span style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '4px', backgroundColor: '#ECFDF5', color: '#065F46', fontWeight: 700 }}>
                    85-100%
                  </span>
                </div>
                <p style={{ margin: '3px 0 0', fontSize: '24px', fontWeight: 800, color: '#10B981', letterSpacing: '-0.02em' }}>
                  {stats.jobReady}
                </p>
              </div>
            </div>

            {/* Nearly Ready */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '16px 20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  color: '#3978F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Clock size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <p style={{ margin: 0, fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>
                    Nearly Ready
                  </p>
                  <span style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '4px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontWeight: 700 }}>
                    70-84%
                  </span>
                </div>
                <p style={{ margin: '3px 0 0', fontSize: '24px', fontWeight: 800, color: '#3978F6', letterSpacing: '-0.02em' }}>
                  {stats.nearlyReady}
                </p>
              </div>
            </div>

            {/* Needs Improvement */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '16px 20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#FFFBEB',
                  color: '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <AlertCircle size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <p style={{ margin: 0, fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>
                    Needs Improvement
                  </p>
                  <span style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '4px', backgroundColor: '#FFFBEB', color: '#92400E', fontWeight: 700 }}>
                    50-69%
                  </span>
                </div>
                <p style={{ margin: '3px 0 0', fontSize: '24px', fontWeight: 800, color: '#F59E0B', letterSpacing: '-0.02em' }}>
                  {stats.needsImp}
                </p>
              </div>
            </div>

            {/* Critical */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '16px 20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#FEF2F2',
                  color: '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <AlertCircle size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <p style={{ margin: 0, fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>
                    Critical
                  </p>
                  <span style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#991B1B', fontWeight: 700 }}>
                    &lt; 50%
                  </span>
                </div>
                <p style={{ margin: '3px 0 0', fontSize: '24px', fontWeight: 800, color: '#EF4444', letterSpacing: '-0.02em' }}>
                  {stats.critical}
                </p>
              </div>
            </div>
          </div>

          {/* Search, Filter Bar, Sorting Toolbar */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '16px',
              marginBottom: '16px',
              boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                flex: '1 1 320px',
                maxWidth: '540px'
              }}
            >
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8'
                }}
              />
              <input
                type="text"
                placeholder="Search by student name, ID, skill or department..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 14px 10px 42px',
                  borderRadius: '10px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '13.5px',
                  color: '#101B36',
                  backgroundColor: '#F8FAFC',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#3978F6';
                  e.target.style.backgroundColor = '#FFFFFF';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.backgroundColor = '#F8FAFC';
                }}
              />
            </div>

            {/* Filter & Sort Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Filter Button */}
              <button
                onClick={() => setFilterPanelOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  border: activeFiltersCount > 0 ? '1.5px solid #3978F6' : '1.5px solid #E2E8F0',
                  backgroundColor: activeFiltersCount > 0 ? '#EFF6FF' : '#FFFFFF',
                  color: activeFiltersCount > 0 ? '#2563EB' : '#475569',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Filter size={16} />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span
                    style={{
                      padding: '1px 7px',
                      borderRadius: '999px',
                      backgroundColor: '#3978F6',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700
                    }}
                  >
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sorting Select */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ArrowUpDown size={15} style={{ color: '#64748B' }} />
                <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    color: '#101B36',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="readiness-desc">Readiness: Highest → Lowest</option>
                  <option value="readiness-asc">Readiness: Lowest → Highest</option>
                  <option value="cgpa-desc">CGPA: Highest → Lowest</option>
                  <option value="cgpa-asc">CGPA: Lowest → Highest</option>
                  <option value="name-asc">Student Name (A-Z)</option>
                  <option value="dept-asc">Department</option>
                  <option value="grad-desc">Graduation Year</option>
                  <option value="status-asc">Placement Status</option>
                </select>
              </div>

              {/* Reset if active filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#EF4444',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '6px 8px'
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Chips Preview */}
          {activeFiltersCount > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '14px',
                padding: '4px 0'
              }}
            >
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Active Filters:</span>
              {filters.department !== 'All Departments' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#E0E7FF',
                    color: '#3730A3',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  Dept: {filters.department}
                </span>
              )}
              {filters.gradYear !== 'All Years' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#E0E7FF',
                    color: '#3730A3',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  Year: {filters.gradYear}
                </span>
              )}
              {filters.readinessLevel !== 'All Levels' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#ECFDF5',
                    color: '#065F46',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  Readiness: {filters.readinessLevel}
                </span>
              )}
              {filters.cgpaRange !== 'All CGPA' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  CGPA: {filters.cgpaRange}
                </span>
              )}
              {filters.placementStatus !== 'All Statuses' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#EFF6FF',
                    color: '#1E40AF',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  Status: {filters.placementStatus}
                </span>
              )}
              {filters.skills.map(sk => (
                <span
                  key={sk}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#F1F5F9',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  Skill: {sk}
                </span>
              ))}
            </div>
          )}

          {/* Student Table */}
          <StudentTable
            students={filteredStudents}
            selectedStudentIds={selectedStudentIds}
            onSelectStudent={(id) => {
              if (selectedStudentIds.includes(id)) {
                setSelectedStudentIds(selectedStudentIds.filter(item => item !== id));
              } else {
                setSelectedStudentIds([...selectedStudentIds, id]);
              }
            }}
            onSelectAll={(allIds) => setSelectedStudentIds(allIds)}
            onViewProfile={(studentId) => navigate(`/officer/students/${studentId}`)}
          />

          {/* Prototype Demo Notice */}
          <div
            style={{
              marginTop: '28px',
              padding: '12px 18px',
              borderRadius: '10px',
              backgroundColor: '#F1F5F9',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#64748B'
            }}
          >
            <span>
              ℹ️ <strong>CampusCore Prototype Notice:</strong> Student profiles, readiness metrics, and eligibility indications are simulated demo data for verification.
            </span>
            <span style={{ fontWeight: 600, color: '#3978F6' }}>
              CampusCore Layer 3 Foundation
            </span>
          </div>
        </main>
      </div>

      {/* Filter Side Panel / Drawer */}
      <StudentFiltersPanel
        isOpen={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        filters={filters}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          setFilterPanelOpen(false);
          showToast('Filters applied.');
        }}
        onClearFilters={handleClearFilters}
      />

      {/* Bulk Actions Floating Bar */}
      <StudentBulkActions
        selectedCount={selectedStudentIds.length}
        onSendNotification={() => handleBulkNotification(selectedStudentIds)}
        onAddToDrive={() => handleBulkAddToDrive(selectedStudentIds)}
        onExport={() => handleBulkExport(selectedStudentIds)}
        onMarkPriority={() => handleBulkMarkPriority(selectedStudentIds)}
        onAnalyzeSelected={() => handleBulkAnalyze(selectedStudentIds)}
        onClearSelection={() => setSelectedStudentIds([])}
      />

      {/* Global Notifications Panel */}
      <NotificationPanel
        isOpen={notificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        students={students}
        recruiters={[]}
        drives={[]}
        onSelectStudent={(student) => {
          setSearchModalOpen(false);
          navigate(`/officer/students/${student.id}`);
        }}
        onSelectRecruiter={() => {}}
        onSelectDrive={() => {}}
      />

      {/* Module Coming Soon Modal */}
      <ModuleComingSoonModal
        isOpen={comingSoonModal.isOpen}
        onClose={() => setComingSoonModal({ ...comingSoonModal, isOpen: false })}
        moduleKey={comingSoonModal.moduleKey}
        moduleTitle={comingSoonModal.moduleTitle}
        layerNumber={comingSoonModal.layerNumber}
      />

      {/* Feedback Toast */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '13.5px',
            fontWeight: 500,
            boxShadow: '0 8px 24px rgba(16, 27, 54, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 9999,
            animation: 'fadeInUp 0.2s ease-out'
          }}
        >
          <CheckCircle2 size={16} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
