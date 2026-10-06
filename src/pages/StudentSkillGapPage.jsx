import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Target,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  FileText,
  Printer,
  ChevronRight,
  RefreshCw,
  Search,
  BookOpen,
  Award,
  Layers,
  Check,
  PlayCircle,
  Briefcase,
  HelpCircle,
  BarChart2,
  Sliders,
  Filter
} from 'lucide-react';

import Sidebar from '../components/officer/Sidebar';
import Topbar from '../components/officer/Topbar';
import NotificationPanel from '../components/officer/NotificationPanel';
import SearchModal from '../components/officer/SearchModal';
import RoleComparisonModal from '../components/skillgap/RoleComparisonModal';
import JobDescriptionModal from '../components/skillgap/JobDescriptionModal';
import PrintSkillGapReportModal from '../components/skillgap/PrintSkillGapReportModal';

import { JOB_ROLES, getJobRoleById } from '../data/jobRoles';
import { getStudentById, getStoredStudents } from '../data';
import { analyzeSkillGap } from '../services/skillGapAnalyzer';

export default function StudentSkillGapPage() {
  const { studentId: paramStudentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active student
  const [studentsList, setStudentsList] = useState([]);
  const [currentStudentId, setCurrentStudentId] = useState(paramStudentId || 'CL-2027-0042');
  const [student, setStudent] = useState(null);

  // Role Selection State
  const [selectedRoleId, setSelectedRoleId] = useState('software-engineer');
  const [customRole, setCustomRole] = useState(null);
  const [customTitleInput, setCustomTitleInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Analysis Animation Phased States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  // UI Interactive States
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('ALL'); // 'ALL', 'MATCHED', 'PARTIAL', 'GAP'
  const [roadmapStarted, setRoadmapStarted] = useState(false);
  const [completedWeeks, setCompletedWeeks] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals
  const [roleComparisonOpen, setRoleComparisonOpen] = useState(false);
  const [jobDescModalOpen, setJobDescModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load students on mount
  useEffect(() => {
    const list = getStoredStudents();
    setStudentsList(list);

    const targetId = paramStudentId || (list.length > 0 ? list[0].id : 'CL-2027-0042');
    setCurrentStudentId(targetId);

    const found = getStudentById(targetId) || list.find(s => s.id === targetId) || list[0];
    if (found) {
      setStudent(found);
    }
  }, [paramStudentId]);

  // Active target role definition
  const currentRole = useMemo(() => {
    if (customRole) return customRole;
    return getJobRoleById(selectedRoleId);
  }, [selectedRoleId, customRole]);

  // Run analysis function with 1.5s simulated multi-phase sequence
  const runAnalysis = (targetStudent = student, targetRole = currentRole) => {
    if (!targetStudent || !targetRole) return;
    setIsAnalyzing(true);
    setAnalysisPhase('Reading student profile...');

    const timer1 = setTimeout(() => {
      setAnalysisPhase('Analyzing technical skills...');
    }, 300);

    const timer2 = setTimeout(() => {
      setAnalysisPhase('Comparing role requirements...');
    }, 600);

    const timer3 = setTimeout(() => {
      setAnalysisPhase('Identifying skill gaps...');
    }, 900);

    const timer4 = setTimeout(() => {
      setAnalysisPhase('Generating recommendations...');
    }, 1200);

    const timer5 = setTimeout(() => {
      setAnalysisPhase('Analysis Complete');
      const result = analyzeSkillGap(targetStudent, targetRole);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  };

  // Initial calculation when student or role changes
  useEffect(() => {
    if (student && currentRole) {
      runAnalysis(student, currentRole);
    }
  }, [student, selectedRoleId, customRole]);

  // Handle switching student in general view
  const handleSwitchStudent = (newId) => {
    setCurrentStudentId(newId);
    const found = getStudentById(newId) || studentsList.find(s => s.id === newId);
    if (found) {
      setStudent(found);
      if (paramStudentId) {
        navigate(`/officer/students/${newId}/skill-gap`);
      }
    }
  };

  // Filter skills list based on user click on MATCHED, PARTIAL, MISSING cards
  const filteredSkills = useMemo(() => {
    if (!analysisResult) return [];
    const all = [
      ...analysisResult.matchedSkills,
      ...analysisResult.partialSkills,
      ...analysisResult.missingSkills
    ];
    if (activeFilterTab === 'MATCHED') return analysisResult.matchedSkills;
    if (activeFilterTab === 'PARTIAL') return analysisResult.partialSkills;
    if (activeFilterTab === 'GAP') return analysisResult.missingSkills;
    return all;
  }, [analysisResult, activeFilterTab]);

  const toggleWeekCompletion = (weekNum) => {
    if (completedWeeks.includes(weekNum)) {
      setCompletedWeeks(completedWeeks.filter(w => w !== weekNum));
    } else {
      setCompletedWeeks([...completedWeeks, weekNum]);
    }
  };

  const handleStartRoadmap = () => {
    setRoadmapStarted(true);
    showToast('6-Week Personalized Roadmap started. Milestones linked to student study portal.');
  };

  const isOfficerContext = location.pathname.startsWith('/officer');

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
      {/* Persistent Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        activeModule="students"
      />

      {/* Main Workspace */}
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
          title="AI Skill-Gap Analyzer"
          subtitle="Discover what students need to learn to become placement-ready for their target roles."
          badgeText="CampusCore AI Core"
        />

        <main style={{ flex: 1, padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          
          {/* Breadcrumb & Navigation */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
            <button
              onClick={() => {
                if (student) navigate(`/officer/students/${student.id}`);
                else navigate('/officer/students');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                border: 'none',
                background: 'transparent',
                color: '#3978F6',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 0'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to {student ? `${student.name}'s Profile` : 'Student Directory'}</span>
            </button>

            {/* Student Switcher dropdown (if multiple students available) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Active Student:</span>
              <select
                value={currentStudentId}
                onChange={e => handleSwitchStudent(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#101B36',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {studentsList.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.id}) — {s.department}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: Page Header Card with AI Badge & Candidate Meta */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '22px 28px',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    border: '1px solid #BFDBFE'
                  }}
                >
                  <Sparkles size={12} /> ✦ CAMPUSCORE AI
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
                  Live Benchmarking
                </span>
              </div>

              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#101B36', letterSpacing: '-0.02em' }}>
                AI Skill-Gap Analyzer
              </h1>
              <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#64748B' }}>
                Discover what students need to learn to become placement-ready for their target roles.
              </p>
            </div>

            {/* Candidate Quick Pill */}
            {student && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 800
                  }}
                >
                  {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                    Student: {student.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Readiness: <strong style={{ color: '#10B981' }}>{student.readinessScore}%</strong> • CGPA: {student.cgpa}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 4 & 5: Target Role Selector & Demo Requirements Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#101B36' }}>
                  Select Target Role
                </h2>
                <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748B' }}>
                  Benchmark against enterprise placement tracks or analyze any recruiter job posting
                </p>
              </div>

              {/* Action Buttons: Compare Roles & Paste JD */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setRoleComparisonOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                >
                  <BarChart2 size={15} color="#3978F6" />
                  <span>Compare Roles</span>
                </button>

                <button
                  onClick={() => setJobDescModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    border: '1.5px solid #BFDBFE',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#2563EB',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#DBEAFE'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                >
                  <FileText size={15} />
                  <span>Analyze Any Job Description</span>
                </button>
              </div>
            </div>

            {/* Target Role Dropdown & Custom Role Input */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Target Industry Role
                </label>
                <select
                  value={customRole ? 'custom' : selectedRoleId}
                  onChange={e => {
                    const val = e.target.value;
                    if (val === 'custom') {
                      setShowCustomInput(true);
                    } else {
                      setCustomRole(null);
                      setShowCustomInput(false);
                      setSelectedRoleId(val);
                    }
                  }}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '14px',
                    fontWeight: 600,
                    backgroundColor: '#FFFFFF',
                    color: '#101B36',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {JOB_ROLES.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.title} ({role.category})
                    </option>
                  ))}
                  <option value="custom">+ Custom Job Role</option>
                </select>
              </div>

              {/* Custom Role Field if selected */}
              {(showCustomInput || customRole) && (
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Enter Custom Role Title
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="e.g. AI Engineer, Site Reliability Engineer"
                      value={customTitleInput}
                      onChange={e => setCustomTitleInput(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                    <button
                      onClick={() => {
                        if (!customTitleInput.trim()) return;
                        const newCustom = {
                          id: `custom-${Date.now()}`,
                          title: customTitleInput.trim(),
                          targetBracket: 'Custom Role Track',
                          category: 'Custom Role',
                          description: `Custom job specification for ${customTitleInput.trim()}`,
                          requiredSkills: [
                            { name: 'Python', level: 'Advanced', importance: 'High', minProficiency: 80, domain: 'Programming' },
                            { name: 'Data Structures', level: 'Advanced', importance: 'High', minProficiency: 80, domain: 'Core CS' },
                            { name: 'System Design', level: 'Intermediate', importance: 'High', minProficiency: 70, domain: 'Architecture' }
                          ],
                          preferredSkills: [
                            { name: 'AWS', level: 'Intermediate', importance: 'Medium', minProficiency: 65, domain: 'Cloud' },
                            { name: 'Docker', level: 'Intermediate', importance: 'Medium', minProficiency: 60, domain: 'DevOps' }
                          ],
                          academicCutoff: { cgpa: 7.0, maxBacklogs: 0, degree: ['B.Tech'] }
                        };
                        setCustomRole(newCustom);
                        showToast(`Custom role "${customTitleInput}" benchmark created.`);
                      }}
                      style={{
                        padding: '10px 16px',
                        backgroundColor: '#3978F6',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Target Job Requirements Preview (Section 5) */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                marginBottom: '18px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={16} color="#3978F6" />
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                    {currentRole.title} — Requirements Breakdown
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    border: '1px solid #FDE68A'
                  }}
                >
                  DEMO JOB REQUIREMENTS
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '12.5px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    PROGRAMMING & CORE
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {(currentRole.requiredSkills || []).slice(0, 5).map(s => (
                      <span key={s.name} style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', color: '#1E293B', fontSize: '12px' }}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    SYSTEMS & ARCHITECTURE
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {(currentRole.requiredSkills || []).slice(5).map(s => (
                      <span key={s.name} style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', color: '#1E293B', fontSize: '12px' }}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    PREFERRED / BONUS
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {(currentRole.preferredSkills || []).map(s => (
                      <span key={typeof s === 'string' ? s : s.name} style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1E40AF', fontSize: '12px' }}>
                        {typeof s === 'string' ? s : s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Analysis Button & Sequence Feedback */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
              <button
                onClick={() => runAnalysis(student, currentRole)}
                disabled={isAnalyzing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(57, 120, 246, 0.3)',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={e => {
                  if (!isAnalyzing) e.currentTarget.style.backgroundColor = '#2563EB';
                }}
                onMouseOut={e => {
                  if (!isAnalyzing) e.currentTarget.style.backgroundColor = '#3978F6';
                }}
              >
                <Sparkles size={16} className={isAnalyzing ? 'pulse-dot' : ''} />
                <span>{isAnalyzing ? analysisPhase : '✦ Analyze Skill Gap'}</span>
              </button>

              {/* Action: Generate Report */}
              {analysisResult && (
                <button
                  onClick={() => setPrintModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                >
                  <Printer size={15} />
                  <span>Generate Skill-Gap Report</span>
                </button>
              )}
            </div>

            {/* In-progress analysis status notification */}
            {isAnalyzing && (
              <div
                style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#1E40AF',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                <RefreshCw size={16} className="pulse-dot" />
                <span>CampusCore AI Engine: {analysisPhase}</span>
              </div>
            )}
          </div>

          {/* Section 7, 8, 18: Main Results & Role Readiness Cards */}
          {analysisResult && (
            <>
              {/* Overall Readiness & Match Overview Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                
                {/* Section 7: Overall Role Readiness Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#3978F6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        OVERALL MATCH INDEX
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: analysisResult.overallScore >= 85 ? '#ECFDF5' : '#EFF6FF',
                          color: analysisResult.overallScore >= 85 ? '#065F46' : '#1E40AF'
                        }}
                      >
                        {analysisResult.readinessLevel}
                      </span>
                    </div>

                    <h3 style={{ margin: '0 0 14px', fontSize: '18px', fontWeight: 800, color: '#101B36' }}>
                      Role Readiness
                    </h3>

                    {/* Circular Visual Score Progress */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '14px 0' }}>
                      <div
                        style={{
                          width: '92px',
                          height: '92px',
                          borderRadius: '50%',
                          background: `conic-gradient(#3978F6 ${analysisResult.overallScore * 3.6}deg, #E2E8F0 0deg)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <div
                          style={{
                            width: '74px',
                            height: '74px',
                            borderRadius: '50%',
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <span style={{ fontSize: '24px', fontWeight: 900, color: '#101B36', lineHeight: 1 }}>
                            {analysisResult.overallScore}%
                          </span>
                        </div>
                      </div>

                      <div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                          "{student.name} meets most technical requirements for {currentRole.title}, with primary development gaps in cloud fundamentals and system design."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Readiness Change Potential */}
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      backgroundColor: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      marginTop: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803D' }}>
                        Readiness Change Potential
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#15803D' }}>
                        {analysisResult.overallScore}% → {analysisResult.improvementPotential}%
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#166534', display: 'block', marginTop: '2px' }}>
                      If high-priority skill gaps and recommended modules are addressed (Demo projection).
                    </span>
                  </div>
                </div>

                {/* Section 8: Skill Match Overview (3 Clickable Cards) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  {/* MATCHED Card */}
                  <div
                    onClick={() => setActiveFilterTab(activeFilterTab === 'MATCHED' ? 'ALL' : 'MATCHED')}
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      border: activeFilterTab === 'MATCHED' ? '2px solid #10B981' : '1px solid #E2E8F0',
                      padding: '16px 20px',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(16, 27, 54, 0.03)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          backgroundColor: '#ECFDF5',
                          color: '#10B981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <CheckCircle2 size={22} />
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          MATCHED
                        </span>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#101B36' }}>
                          {analysisResult.matchedSkills.length} Skills
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#10B981', fontWeight: 600 }}>
                      {activeFilterTab === 'MATCHED' ? 'Filtered ✓' : 'Click to filter'}
                    </span>
                  </div>

                  {/* PARTIAL Card */}
                  <div
                    onClick={() => setActiveFilterTab(activeFilterTab === 'PARTIAL' ? 'ALL' : 'PARTIAL')}
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      border: activeFilterTab === 'PARTIAL' ? '2px solid #F59E0B' : '1px solid #E2E8F0',
                      padding: '16px 20px',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(16, 27, 54, 0.03)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          backgroundColor: '#FFFBEB',
                          color: '#F59E0B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <AlertCircle size={22} />
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          PARTIAL
                        </span>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#101B36' }}>
                          {analysisResult.partialSkills.length} Skills
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#F59E0B', fontWeight: 600 }}>
                      {activeFilterTab === 'PARTIAL' ? 'Filtered ✓' : 'Click to filter'}
                    </span>
                  </div>

                  {/* MISSING Card */}
                  <div
                    onClick={() => setActiveFilterTab(activeFilterTab === 'GAP' ? 'ALL' : 'GAP')}
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      border: activeFilterTab === 'GAP' ? '2px solid #EF4444' : '1px solid #E2E8F0',
                      padding: '16px 20px',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(16, 27, 54, 0.03)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          backgroundColor: '#FEF2F2',
                          color: '#EF4444',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <AlertTriangle size={22} />
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          MISSING GAPS
                        </span>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#101B36' }}>
                          {analysisResult.missingSkills.length} Skills
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#EF4444', fontWeight: 600 }}>
                      {activeFilterTab === 'GAP' ? 'Filtered ✓' : 'Click to filter'}
                    </span>
                  </div>
                </div>

                {/* Section 18: CampusCore AI Insight Card */}
                <div
                  style={{
                    backgroundColor: '#F8FAFF',
                    borderRadius: '16px',
                    border: '1.5px solid #BFDBFE',
                    padding: '24px',
                    boxShadow: '0 4px 16px rgba(57, 120, 246, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        ✦ CampusCore AI Insight
                      </span>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: '#EFF6FF',
                          color: '#2563EB',
                          border: '1px solid #BFDBFE'
                        }}
                      >
                        AI-GENERATED DEMO INSIGHT
                      </span>
                    </div>

                    <p style={{ margin: 0, fontSize: '13px', color: '#1E293B', lineHeight: 1.6 }}>
                      {analysisResult.aiInsightText}
                    </p>
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #DBEAFE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                      Profile Strength: <strong style={{ color: '#101B36' }}>{analysisResult.profileStrength}</strong>
                    </span>
                    <button
                      onClick={() => setRoleComparisonOpen(true)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: '#2563EB',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Compare against 10 other roles →
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 9: Skill Comparison Matrix & Section 10: Horizontal Proficiency Chart */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                
                {/* Section 9: Skill Gap Breakdown Matrix */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                        Skill Gap Breakdown
                      </h3>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                        Showing {filteredSkills.length} competencies {activeFilterTab !== 'ALL' ? `(${activeFilterTab})` : ''}
                      </p>
                    </div>

                    {activeFilterTab !== 'ALL' && (
                      <button
                        onClick={() => setActiveFilterTab('ALL')}
                        style={{
                          border: 'none',
                          background: '#F1F5F9',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          color: '#475569',
                          cursor: 'pointer'
                        }}
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>

                  {/* Table */}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1.5px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                          <th style={{ padding: '8px 10px', fontWeight: 600 }}>Skill</th>
                          <th style={{ padding: '8px 10px', fontWeight: 600 }}>Required Level</th>
                          <th style={{ padding: '8px 10px', fontWeight: 600 }}>Current Level</th>
                          <th style={{ padding: '8px 10px', fontWeight: 600 }}>Status</th>
                          <th style={{ padding: '8px 10px', fontWeight: 600 }}>Priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSkills.map((sk, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                            <td style={{ padding: '10px', fontWeight: 700, color: '#101B36' }}>
                              {sk.name}
                            </td>
                            <td style={{ padding: '10px', color: '#475569' }}>
                              {sk.requiredLevel}
                            </td>
                            <td style={{ padding: '10px', color: '#334155' }}>
                              {sk.currentLevel}
                            </td>
                            <td style={{ padding: '10px' }}>
                              <span
                                style={{
                                  padding: '2px 8px',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  backgroundColor: sk.status === 'Matched' ? '#ECFDF5' : sk.status === 'Partial' ? '#FFFBEB' : '#FEF2F2',
                                  color: sk.status === 'Matched' ? '#065F46' : sk.status === 'Partial' ? '#92400E' : '#991B1B'
                                }}
                              >
                                {sk.status}
                              </span>
                            </td>
                            <td style={{ padding: '10px', color: sk.priority === 'High' ? '#DC2626' : '#64748B', fontWeight: sk.priority === 'High' ? 700 : 500 }}>
                              {sk.priority}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 10: Horizontal Skill Proficiency Visualization */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                        Current vs Required Skills
                      </h3>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                        Visualizing competency index against recruitment cutoffs
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', fontSize: '11.5px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#3978F6' }} /> Current
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#CBD5E1' }} /> Required
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {analysisResult.horizontalChartData.map(item => {
                      const isSatisfied = item.current >= item.required;
                      return (
                        <div key={item.skill}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                            <strong style={{ color: '#101B36' }}>{item.skill}</strong>
                            <span style={{ color: isSatisfied ? '#059669' : '#DC2626', fontWeight: 600 }}>
                              Current: {item.current} / Req: {item.required}
                            </span>
                          </div>

                          <div style={{ position: 'relative', width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                            {/* Required Marker Background */}
                            <div
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: `${item.required}%`,
                                backgroundColor: '#E2E8F0',
                                borderRadius: '999px'
                              }}
                            />
                            {/* Candidate Progress Bar */}
                            <div
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: `${item.current}%`,
                                backgroundColor: isSatisfied ? '#10B981' : item.current >= 45 ? '#3978F6' : '#EF4444',
                                borderRadius: '999px',
                                transition: 'width 0.4s ease'
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Section 11 & Section 14: Priority Skill Gaps & Learning Priority Score */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                
                {/* Section 11: Priority Skill Gaps */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                  }}
                >
                  <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#101B36', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertTriangle size={18} color="#EF4444" /> ⚠️ Priority Skill Gaps
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {analysisResult.priorityGaps.slice(0, 3).map((gap, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          backgroundColor: '#FEF2F2',
                          border: '1px solid #FECACA'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#991B1B' }}>
                            0{i + 1} — {gap.name}
                          </h4>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '10.5px',
                              fontWeight: 800,
                              backgroundColor: '#FFFFFF',
                              color: '#DC2626',
                              border: '1px solid #FCA5A5'
                            }}
                          >
                            {gap.priority} PRIORITY
                          </span>
                        </div>

                        <div style={{ fontSize: '12.5px', color: '#7F1D1D', marginBottom: '8px' }}>
                          Current: <strong>{gap.currentLevel}</strong> • Target: <strong>{gap.targetLevel}</strong>
                        </div>

                        <p style={{ margin: 0, fontSize: '12px', color: '#991B1B', fontStyle: 'italic', lineHeight: 1.4 }}>
                          "{gap.whyItMatters}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 14: Skill Priority Ranking */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                        Skill Priority Ranking
                      </h3>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                        Ranked by job impact, candidate readiness & recruitment relevance
                      </p>
                    </div>

                    <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#64748B', fontWeight: 600 }}>
                      Demo AI prioritization
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {analysisResult.priorityGaps.map((gap, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '10px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: idx === 0 ? '#3978F6' : '#E2E8F0',
                              color: idx === 0 ? '#FFFFFF' : '#475569',
                              fontSize: '11px',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {idx + 1}
                          </span>
                          <strong style={{ fontSize: '13px', color: '#101B36' }}>{gap.name}</strong>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#3978F6' }}>
                            {gap.priorityScore} Priority
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '16px', fontSize: '11.5px', color: '#64748B' }}>
                    ℹ️ Prioritization considers hiring cycle timeline, candidate career preference, and prerequisite dependencies.
                  </div>
                </div>
              </div>

              {/* Section 12: AI Recommendations & Section 17: Explainable AI */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                
                {/* Section 12: AI Recommendations Engine */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                  }}
                >
                  <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#101B36', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} color="#3978F6" /> ✦ CampusCore AI Recommendations
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {analysisResult.recommendations.map((rec, i) => (
                      <div
                        key={rec.id}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0'
                        }}
                      >
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#3978F6', textTransform: 'uppercase' }}>
                          Recommendation 0{i + 1} • {rec.timeframe}
                        </span>
                        <h4 style={{ margin: '4px 0 8px', fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                          "{rec.title}"
                        </h4>

                        <div style={{ fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
                          <strong>Recommended focus areas:</strong>
                          <ul style={{ margin: '4px 0 0', paddingLeft: '18px', color: '#334155' }}>
                            {rec.focus.map((f, fi) => (
                              <li key={fi}>{f}</li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
                          Estimated effort: {rec.estimatedEffort}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 17: Explainable AI ("Why This Score?") */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                        Why This Score?
                      </h3>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                        Explainable transparency factors behind {analysisResult.overallScore}% evaluation
                      </p>
                    </div>

                    <span style={{ fontSize: '11.5px', padding: '3px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontWeight: 700 }}>
                      Profile: {analysisResult.profileStrength}
                    </span>
                  </div>

                  {/* Positive Factors */}
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ margin: '0 0 8px', fontSize: '12.5px', fontWeight: 700, color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Positive Contributing Factors
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {analysisResult.positiveFactors.map((pf, pfi) => (
                        <div key={pfi} style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#F0FDF4', border: '1px solid #DCFCE7', fontSize: '12px', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={14} color="#10B981" />
                          <span>{pf}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gap Factors */}
                  <div>
                    <h4 style={{ margin: '0 0 8px', fontSize: '12.5px', fontWeight: 700, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Identified Gap Penalties
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {analysisResult.gapFactors.map((gf, gfi) => (
                        <div key={gfi} style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', fontSize: '12px', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <AlertTriangle size={14} color="#EF4444" />
                          <span>{gf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 13: Personalized Learning Roadmap */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '24px',
                  marginBottom: '24px',
                  boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#101B36' }}>
                      Recommended Improvement Roadmap (6 Weeks)
                    </h3>
                    <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748B' }}>
                      Structured weekly sprint curriculum targeted to bridge high-priority gaps
                    </p>
                  </div>

                  <button
                    onClick={handleStartRoadmap}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      backgroundColor: roadmapStarted ? '#10B981' : '#3978F6',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)'
                    }}
                  >
                    {roadmapStarted ? <Check size={16} /> : <PlayCircle size={16} />}
                    <span>{roadmapStarted ? 'Roadmap Active in Student Portal' : 'Start Roadmap'}</span>
                  </button>
                </div>

                {/* Timeline Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {analysisResult.roadmap.map(stage => {
                    const isDone = completedWeeks.includes(stage.week);
                    return (
                      <div
                        key={stage.week}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          border: isDone ? '1.5px solid #10B981' : '1px solid #E2E8F0',
                          backgroundColor: isDone ? '#F0FDF4' : '#F8FAFC',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#3978F6' }}>
                              WEEK {stage.week}
                            </span>
                            <button
                              onClick={() => toggleWeekCompletion(stage.week)}
                              style={{
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                padding: 0,
                                color: isDone ? '#10B981' : '#94A3B8'
                              }}
                              title={isDone ? 'Mark Incomplete' : 'Mark Completed'}
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          </div>

                          <h4 style={{ margin: '0 0 6px', fontSize: '13.5px', fontWeight: 800, color: '#101B36' }}>
                            {stage.title}
                          </h4>

                          <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#475569' }}>
                            {stage.focus}
                          </p>

                          <ul style={{ margin: '0 0 10px', paddingLeft: '14px', fontSize: '11px', color: '#64748B' }}>
                            {stage.activities.map((act, ai) => (
                              <li key={ai} style={{ marginBottom: '3px' }}>{act}</li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ paddingTop: '8px', borderTop: '1px solid #E2E8F0', fontSize: '11px', color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                          <span>Target: {stage.hours} hrs</span>
                          <span style={{ color: isDone ? '#059669' : '#3978F6', fontWeight: 600 }}>
                            {isDone ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Prototype Demo Notice */}
          <div
            style={{
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
              ℹ️ <strong>CampusCore Prototype Notice:</strong> Skill-gap calculations, priority scores and roadmaps represent algorithmic demo heuristics for hackathon validation.
            </span>
            <span style={{ fontWeight: 600, color: '#3978F6' }}>
              CampusCore Layer 4 AI Engine
            </span>
          </div>
        </main>
      </div>

      {/* Role Comparison Modal */}
      <RoleComparisonModal
        isOpen={roleComparisonOpen}
        onClose={() => setRoleComparisonOpen(false)}
        student={student}
        currentRoleId={currentRole.id}
        onSelectRole={(roleId) => {
          setCustomRole(null);
          setSelectedRoleId(roleId);
          showToast(`Switched analysis target to ${getJobRoleById(roleId).title}.`);
        }}
      />

      {/* Paste Job Description Modal */}
      <JobDescriptionModal
        isOpen={jobDescModalOpen}
        onClose={() => setJobDescModalOpen(false)}
        onApplyCustomRole={(parsedRole) => {
          setCustomRole(parsedRole);
          showToast(`Benchmarking against pasted job description: "${parsedRole.title}".`);
        }}
      />

      {/* Printable Report Modal */}
      {analysisResult && (
        <PrintSkillGapReportModal
          isOpen={printModalOpen}
          onClose={() => setPrintModalOpen(false)}
          student={student}
          analysis={analysisResult}
          role={currentRole}
        />
      )}

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={notificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        students={studentsList}
        recruiters={[]}
        drives={[]}
        onSelectStudent={(s) => {
          setSearchModalOpen(false);
          handleSwitchStudent(s.id);
        }}
        onSelectRecruiter={() => {}}
        onSelectDrive={() => {}}
      />

      {/* Toast Feedback */}
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
            zIndex: 9999
          }}
        >
          <CheckCircle2 size={16} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
