import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Download,
  Edit3,
  Bot,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  FileText,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building,
  Target,
  Plus,
  Send,
  Trash2,
  Calendar,
  Layers,
  Star,
  Upload
} from 'lucide-react';

const LinkedinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import Sidebar from '../components/officer/Sidebar';
import Topbar from '../components/officer/Topbar';
import NotificationPanel from '../components/officer/NotificationPanel';
import SearchModal from '../components/officer/SearchModal';
import EditStudentModal from '../components/students/EditStudentModal';
import PrintProfileModal from '../components/students/PrintProfileModal';
import ResumeModal from '../components/students/ResumeModal';
import ModuleComingSoonModal from '../components/officer/modals/ModuleComingSoonModal';

import {
  getStudentById,
  updateStudentInStorage,
  addStudentNoteToStorage,
  getStoredStudents
} from '../data';

export default function StudentProfilePage() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // Student State
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Layout UI states
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState({
    isOpen: false,
    moduleKey: '',
    moduleTitle: '',
    layerNumber: 4
  });

  // Officer Notes state
  const [newNoteText, setNewNoteText] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  // Load student on mount or ID change
  useEffect(() => {
    setLoading(true);
    const targetId = studentId || 'CL-2027-0042';
    const found = getStudentById(targetId);
    if (found) {
      setStudent(found);
    } else {
      // Fallback: check stored students directly
      const all = getStoredStudents();
      const match = all.find(s => s.id === targetId) || all[0];
      if (match) {
        setStudent(match);
      }
    }
    setLoading(false);
  }, [studentId]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUpdateStudent = (updatedData) => {
    setStudent(updatedData);
    updateStudentInStorage(updatedData);
    showToast('Student profile successfully updated.');
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const author = 'Dr. Priya Sharma (Placement Officer)';
    const updatedNotes = addStudentNoteToStorage(student.id, newNoteText.trim(), author);
    setStudent({
      ...student,
      officerNotes: updatedNotes
    });
    setNewNoteText('');
    showToast('Officer note added to student record.');
  };

  const handleTogglePriority = () => {
    const updated = {
      ...student,
      isPriority: !student.isPriority
    };
    handleUpdateStudent(updated);
    setMoreMenuOpen(false);
    showToast(updated.isPriority ? 'Marked student as priority candidate.' : 'Removed priority status.');
  };

  // Radar chart data for readiness breakdown
  const radarData = useMemo(() => {
    if (!student || !student.readinessBreakdown) {
      return [
        { subject: 'Technical Skills', score: 92, fullMark: 100 },
        { subject: 'Academic Eligibility', score: 88, fullMark: 100 },
        { subject: 'Projects', score: 84, fullMark: 100 },
        { subject: 'Resume Quality', score: 79, fullMark: 100 },
        { subject: 'Communication', score: 81, fullMark: 100 },
        { subject: 'Certifications', score: 72, fullMark: 100 }
      ];
    }
    const b = student.readinessBreakdown;
    return [
      { subject: 'Technical Skills', score: b.technicalSkills || 85, fullMark: 100 },
      { subject: 'Academic Eligibility', score: b.academicEligibility || 85, fullMark: 100 },
      { subject: 'Projects', score: b.projects || 80, fullMark: 100 },
      { subject: 'Resume Quality', score: b.resumeQuality || 75, fullMark: 100 },
      { subject: 'Communication', score: b.communication || 80, fullMark: 100 },
      { subject: 'Certifications', score: b.certifications || 70, fullMark: 100 }
    ];
  }, [student]);

  // Semester performance chart data
  const semesterChartData = useMemo(() => {
    if (!student || !student.academic?.semesterHistory) {
      return [
        { semester: 'Sem 1', cgpa: 7.8 },
        { semester: 'Sem 2', cgpa: 8.1 },
        { semester: 'Sem 3', cgpa: 8.4 },
        { semester: 'Sem 4', cgpa: 8.7 },
        { semester: 'Sem 5', cgpa: 8.7 }
      ];
    }
    return student.academic.semesterHistory;
  }, [student]);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748B', fontSize: '14px' }}>Loading student profile...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} activeModule="students" />
        <div style={{ flex: 1, padding: '40px', textAlign: 'center' }}>
          <AlertCircle size={48} color="#EF4444" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '20px', color: '#101B36', margin: '0 0 8px' }}>Student Profile Not Found</h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>
            No profile exists with student ID "{studentId}".
          </p>
          <button
            onClick={() => navigate('/officer/students')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ← Return to Student Directory
          </button>
        </div>
      </div>
    );
  }

  // Visual Readiness Level Config
  const getReadinessBadgeConfig = (score, level) => {
    if (score >= 85 || level === 'Job Ready') {
      return {
        bg: '#ECFDF5',
        border: '#A7F3D0',
        text: '#065F46',
        color: '#10B981',
        label: 'JOB READY'
      };
    }
    if (score >= 70 || level === 'Nearly Ready') {
      return {
        bg: '#EFF6FF',
        border: '#BFDBFE',
        text: '#1E40AF',
        color: '#3978F6',
        label: 'NEARLY READY'
      };
    }
    if (score >= 50 || level === 'Needs Improvement') {
      return {
        bg: '#FFFBEB',
        border: '#FDE68A',
        text: '#92400E',
        color: '#F59E0B',
        label: 'NEEDS IMPROVEMENT'
      };
    }
    return {
      bg: '#FEF2F2',
      border: '#FECACA',
      text: '#991B1B',
      color: '#EF4444',
      label: 'CRITICAL'
    };
  };

  const readinessBadge = getReadinessBadgeConfig(student.readinessScore, student.readinessLevel);

  // Group technical skills
  const categorizedSkills = student.categorizedSkills || {
    programming: [
      { name: 'Java', level: 'Advanced' },
      { name: 'Python', level: 'Advanced' },
      { name: 'C++', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' }
    ],
    web: [
      { name: 'React', level: 'Intermediate' },
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'HTML', level: 'Advanced' },
      { name: 'CSS', level: 'Advanced' }
    ],
    database: [
      { name: 'SQL', level: 'Intermediate' },
      { name: 'MongoDB', level: 'Beginner' }
    ],
    core: [
      { name: 'Data Structures', level: 'Advanced' },
      { name: 'OOP', level: 'Advanced' },
      { name: 'DBMS', level: 'Intermediate' }
    ]
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
          title="Student 360° Readiness Profile"
          subtitle={`Detailed competencies, verification and placement readiness for ${student.name}.`}
          badgeText="Profile Active"
        />

        <main style={{ flex: 1, padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          
          {/* Breadcrumb & Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <button
              onClick={() => navigate('/officer/students')}
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
              <span>Back to Student Directory</span>
            </button>

            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Student ID: <strong>{student.id}</strong>
            </span>
          </div>

          {/* Section 6: Student Header Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px 28px',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)',
              position: 'relative'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '20px'
              }}
            >
              {/* Left: Avatar + Info */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #3978F6 0%, #101B36 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    fontWeight: 800,
                    boxShadow: '0 8px 16px rgba(57, 120, 246, 0.25)',
                    flexShrink: 0
                  }}
                >
                  {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h1
                      style={{
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: 800,
                        color: '#101B36',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {student.name}
                    </h1>

                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#F1F5F9',
                        color: '#475569',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      {student.id}
                    </span>

                    {student.isPriority && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#FEF3C7',
                          color: '#92400E',
                          fontSize: '11px',
                          fontWeight: 700
                        }}
                      >
                        <Star size={12} fill="#F59E0B" color="#F59E0B" /> Priority Candidate
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', margin: '4px 0 10px' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#475569', fontWeight: 500 }}>
                      {student.department} • Final Year • Graduation {student.graduationYear}
                    </p>
                    <button
                      onClick={() => navigate(`/officer/students/${student.id}/resume`)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        color: '#1E40AF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = '#DBEAFE';
                        e.currentTarget.style.borderColor = '#93C5FD';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = '#EFF6FF';
                        e.currentTarget.style.borderColor = '#BFDBFE';
                      }}
                      title="Click to open AI Resume Intelligence for this student"
                    >
                      <FileText size={12} color="#2563EB" />
                      <span>Resume Score: <strong style={{ color: '#2563EB' }}>{student.resume?.score || 82} / 100</strong></span>
                      <span style={{ color: '#3978F6', fontWeight: 700 }}>Click → Resume Intelligence</span>
                    </button>
                  </div>

                  {/* Contact row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12.5px', color: '#64748B' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Mail size={14} color="#94A3B8" /> {student.email}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Phone size={14} color="#94A3B8" /> {student.phone}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={14} color="#94A3B8" /> {student.location || 'Campus Resident'}
                    </span>
                    {student.links?.linkedin && (
                      <a
                        href={student.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0A66C2', textDecoration: 'none', fontWeight: 600 }}
                      >
                        <Linkedin size={14} /> LinkedIn
                      </a>
                    )}
                    {student.links?.github && (
                      <a
                        href={student.links.github}
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#24292F', textDecoration: 'none', fontWeight: 600 }}
                      >
                        <Github size={14} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setEditModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    color: '#334155',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                >
                  <Edit3 size={15} />
                  <span>Edit Profile</span>
                </button>

                <button
                  onClick={() => setPrintModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    color: '#334155',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                >
                  <Download size={15} />
                  <span>Download Profile</span>
                </button>

                <button
                  onClick={() => navigate(`/officer/students/${student.id}/resume`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #BFDBFE',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#DBEAFE'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                  title="Upload resume into Layer 5 AI Resume Intelligence"
                >
                  <Upload size={15} />
                  <span>Upload New Resume</span>
                </button>

                <button
                  onClick={() => navigate(`/officer/students/${student.id}/skill-gap`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#2563EB'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#3978F6'}
                >
                  <Sparkles size={15} />
                  <span>Analyze with AI</span>
                </button>

                {/* More Dropdown */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    style={{
                      border: '1.5px solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>

                  {moreMenuOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '110%',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 10px 25px rgba(16, 27, 54, 0.1)',
                        minWidth: '180px',
                        zIndex: 50,
                        padding: '6px'
                      }}
                    >
                      <button
                        onClick={handleTogglePriority}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontSize: '12.5px',
                          color: '#334155',
                          cursor: 'pointer',
                          borderRadius: '6px'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {student.isPriority ? 'Remove Priority' : 'Mark as Priority'}
                      </button>

                      <button
                        onClick={() => {
                          setMoreMenuOpen(false);
                          const el = document.getElementById('officer-notes-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontSize: '12.5px',
                          color: '#334155',
                          cursor: 'pointer',
                          borderRadius: '6px'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Add Officer Note
                      </button>

                      <button
                        onClick={() => {
                          setMoreMenuOpen(false);
                          const el = document.getElementById('placement-activity-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontSize: '12.5px',
                          color: '#334155',
                          cursor: 'pointer',
                          borderRadius: '6px'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        View Placement Activity
                      </button>

                      <button
                        onClick={() => {
                          setMoreMenuOpen(false);
                          setPrintModalOpen(true);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontSize: '12.5px',
                          color: '#334155',
                          cursor: 'pointer',
                          borderRadius: '6px'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Export Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Profile Summary (5 Metric Cards) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
              marginBottom: '24px'
            }}
          >
            {/* Card 1: CGPA */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '16px 20px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Cumulative CGPA</span>
                <GraduationCap size={18} color="#3978F6" />
              </div>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#101B36', letterSpacing: '-0.02em' }}>
                  {student.cgpa}
                </span>
                <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>/ 10</span>
              </div>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600, display: 'block', marginTop: '4px' }}>
                First Class with Distinction
              </span>
            </div>

            {/* Card 2: Readiness */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '16px 20px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Readiness</span>
                <Target size={18} color={readinessBadge.color} />
              </div>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: readinessBadge.color, letterSpacing: '-0.02em' }}>
                  {student.readinessScore}%
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: readinessBadge.bg,
                    color: readinessBadge.text
                  }}
                >
                  {readinessBadge.label}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '4px' }}>
                Automated Multi-Metric Evaluation
              </span>
            </div>

            {/* Card 3: Skills */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '16px 20px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Verified Skills</span>
                <Award size={18} color="#8B5CF6" />
              </div>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#101B36', letterSpacing: '-0.02em' }}>
                  {student.skills?.length || 14}
                </span>
                <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>competencies</span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '4px' }}>
                Across 4 core domains
              </span>
            </div>

            {/* Card 4: Applications */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '16px 20px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Drive Applications</span>
                <Briefcase size={18} color="#0EA5E9" />
              </div>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#101B36', letterSpacing: '-0.02em' }}>
                  {student.applicationsCount || 8}
                </span>
                <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>drives</span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '4px' }}>
                Active in 2026-27 season
              </span>
            </div>

            {/* Card 5: Placement Status */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '16px 20px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Placement Status</span>
                <CheckCircle2 size={18} color="#10B981" />
              </div>
              <div style={{ marginTop: '8px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: student.placementStatus === 'Placed' || student.placementStatus === 'Offer Accepted' ? '#ECFDF5' : '#EFF6FF',
                    color: student.placementStatus === 'Placed' || student.placementStatus === 'Offer Accepted' ? '#065F46' : '#1E40AF',
                    fontWeight: 800,
                    fontSize: '15px'
                  }}
                >
                  {student.placementStatus}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '6px' }}>
                Available for recruitment
              </span>
            </div>
          </div>

          {/* Section 18: CampusCore AI Summary Card */}
          <div
            style={{
              backgroundColor: '#F8FAFF',
              borderRadius: '16px',
              border: '1.5px solid #BFDBFE',
              padding: '20px 24px',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(57, 120, 246, 0.06)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  ✦ CampusCore AI Summary
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    border: '1px solid #93C5FD'
                  }}
                >
                  AI-GENERATED DEMO INSIGHT
                </span>
              </div>

              <button
                onClick={() => navigate(`/officer/students/${student.id}/skill-gap`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#2563EB',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <span>Analyze Profile →</span>
              </button>
            </div>

            <p style={{ margin: 0, fontSize: '13.5px', color: '#1E293B', lineHeight: 1.6 }}>
              {student.aiSummary?.text || `${student.name} demonstrates strong readiness for software development roles, with particularly strong Java, SQL and React capabilities. Primary development areas are cloud fundamentals and system design. Based on the current demo profile, suitable for entry-level software engineering opportunities.`}
            </p>
          </div>

          {/* Grid Layout: Main Analytics & Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            
            {/* Section 8: Readiness Score Breakdown (with Radar Chart & Progress Bars) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '22px 24px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                    Student Readiness Score
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                    Comprehensive 6-pillar multidimensional index
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: readinessBadge.color, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {student.readinessScore}%
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: readinessBadge.text }}>
                    {readinessBadge.label}
                  </span>
                </div>
              </div>

              {/* Radar Chart */}
              <div style={{ width: '100%', height: '220px', marginBottom: '16px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="#E2E8F0" />
                    <Radar name="Readiness" dataKey="score" stroke="#3978F6" fill="#3978F6" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Visual Breakdown Progress Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {radarData.map(item => (
                  <div key={item.subject}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '3px' }}>
                      <span style={{ color: '#334155', fontWeight: 500 }}>{item.subject}</span>
                      <strong style={{ color: '#101B36' }}>{item.score}%</strong>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${item.score}%`,
                          height: '100%',
                          backgroundColor: item.score >= 85 ? '#10B981' : item.score >= 70 ? '#3978F6' : item.score >= 50 ? '#F59E0B' : '#EF4444',
                          borderRadius: '999px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '11px', color: '#64748B', lineHeight: 1.4 }}>
                ⚠️ <strong>Simulated Demo Logic:</strong> This readiness index is calculated via mock composite rules for prototype demonstration.
              </div>
            </div>

            {/* Section 9: Academic Profile (with Semester Trend Mini-Chart) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '22px 24px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                  Academic Profile
                </h3>
                <span style={{ fontSize: '12px', color: '#3978F6', fontWeight: 700 }}>
                  CGPA {student.cgpa} / 10
                </span>
              </div>

              {/* Academic Key Values */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '18px', fontSize: '12.5px' }}>
                <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>Degree</span>
                  <strong style={{ color: '#101B36' }}>{student.academic?.degree || 'B.Tech'}</strong>
                </div>
                <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>Department</span>
                  <strong style={{ color: '#101B36' }}>{student.department}</strong>
                </div>
                <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>University</span>
                  <strong style={{ color: '#101B36' }}>{student.academic?.university || 'Demo Engineering University'}</strong>
                </div>
                <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '11px' }}>Graduation Year</span>
                  <strong style={{ color: '#101B36' }}>{student.graduationYear}</strong>
                </div>
              </div>

              {/* Secondary Academic Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '18px', textAlign: 'center' }}>
                <div style={{ padding: '8px 4px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>10th Score</span>
                  <strong style={{ fontSize: '13px', color: '#101B36' }}>{student.academic?.tenthPercentage || 92}%</strong>
                </div>
                <div style={{ padding: '8px 4px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>12th Score</span>
                  <strong style={{ fontSize: '13px', color: '#101B36' }}>{student.academic?.twelfthPercentage || 89}%</strong>
                </div>
                <div style={{ padding: '8px 4px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>Backlogs</span>
                  <strong style={{ fontSize: '13px', color: (student.academic?.backlogs || 0) === 0 ? '#10B981' : '#EF4444' }}>
                    {student.academic?.backlogs ?? 0}
                  </strong>
                </div>
                <div style={{ padding: '8px 4px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>Attendance</span>
                  <strong style={{ fontSize: '13px', color: '#101B36' }}>{student.academic?.attendance || 91}%</strong>
                </div>
              </div>

              {/* Semester Performance Mini-Chart */}
              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>
                  Semester CGPA Trajectory
                </span>
                <div style={{ width: '100%', height: '140px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={semesterChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="semester" tick={{ fontSize: 10, fill: '#64748B' }} />
                      <YAxis domain={[6.0, 10.0]} tick={{ fontSize: 10, fill: '#64748B' }} />
                      <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                      <Line type="monotone" dataKey="cgpa" stroke="#3978F6" strokeWidth={2.5} dot={{ r: 4, fill: '#3978F6' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Section 10: Technical Skills by Domain */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '22px 24px',
              marginBottom: '24px',
              boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                  Technical Skills & Competency Matrix
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                  Categorized skills with evaluated proficiency indicators
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#065F46' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} /> Advanced
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1E40AF' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3978F6' }} /> Intermediate
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#92400E' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B' }} /> Beginner
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {/* Programming */}
              <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Programming
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categorizedSkills.programming?.map(sk => (
                    <div
                      key={sk.name}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                      }}
                    >
                      <strong style={{ color: '#101B36' }}>{sk.name}</strong>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          backgroundColor: sk.level === 'Advanced' ? '#ECFDF5' : sk.level === 'Intermediate' ? '#EFF6FF' : '#FEF3C7',
                          color: sk.level === 'Advanced' ? '#065F46' : sk.level === 'Intermediate' ? '#1E40AF' : '#92400E',
                          fontWeight: 700
                        }}
                      >
                        {sk.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Web */}
              <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Web Technologies
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categorizedSkills.web?.map(sk => (
                    <div
                      key={sk.name}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px'
                      }}
                    >
                      <strong style={{ color: '#101B36' }}>{sk.name}</strong>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          backgroundColor: sk.level === 'Advanced' ? '#ECFDF5' : sk.level === 'Intermediate' ? '#EFF6FF' : '#FEF3C7',
                          color: sk.level === 'Advanced' ? '#065F46' : sk.level === 'Intermediate' ? '#1E40AF' : '#92400E',
                          fontWeight: 700
                        }}
                      >
                        {sk.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Databases
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categorizedSkills.database?.map(sk => (
                    <div
                      key={sk.name}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px'
                      }}
                    >
                      <strong style={{ color: '#101B36' }}>{sk.name}</strong>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          backgroundColor: sk.level === 'Advanced' ? '#ECFDF5' : sk.level === 'Intermediate' ? '#EFF6FF' : '#FEF3C7',
                          color: sk.level === 'Advanced' ? '#065F46' : sk.level === 'Intermediate' ? '#1E40AF' : '#92400E',
                          fontWeight: 700
                        }}
                      >
                        {sk.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core CS */}
              <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Core CS Foundations
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categorizedSkills.core?.map(sk => (
                    <div
                      key={sk.name}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px'
                      }}
                    >
                      <strong style={{ color: '#101B36' }}>{sk.name}</strong>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          backgroundColor: sk.level === 'Advanced' ? '#ECFDF5' : sk.level === 'Intermediate' ? '#EFF6FF' : '#FEF3C7',
                          color: sk.level === 'Advanced' ? '#065F46' : sk.level === 'Intermediate' ? '#1E40AF' : '#92400E',
                          fontWeight: 700
                        }}
                      >
                        {sk.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 11 & 12: Projects and Certifications Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            
            {/* Section 11: Projects */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '22px 24px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                  Verified Projects ({student.projects?.length || 0})
                </h3>
                <span style={{ fontSize: '12px', color: '#64748B' }}>GitHub & Demo Verified</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {(student.projects || []).map((project, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#F8FAFC'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                        {project.title}
                      </h4>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => alert(`Opening demo GitHub repository for ${project.title} (Fictional Demo Link)`)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#334155',
                            cursor: 'pointer'
                          }}
                        >
                          <Github size={12} /> Repo
                        </button>
                        <button
                          onClick={() => alert(`Launching live demo container for ${project.title} (Fictional Demo Link)`)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#EFF6FF',
                            border: '1px solid #BFDBFE',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#2563EB',
                            cursor: 'pointer'
                          }}
                        >
                          <ExternalLink size={12} /> Live
                        </button>
                      </div>
                    </div>

                    <p style={{ margin: '6px 0', fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Tech:</span>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#3978F6' }}>
                        {project.technologies}
                      </span>
                    </div>

                    {project.impact && (
                      <div style={{ marginTop: '8px', fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
                        ✦ {project.impact}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 12: Certifications */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '22px 24px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                  Industry Certifications ({student.certifications?.length || 0})
                </h3>
                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
                  Blockchain / Credential Verified
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {(student.certifications || []).map((cert, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: '#EFF6FF',
                          color: '#3978F6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Award size={20} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                          {cert.name}
                        </h4>
                        <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                          {cert.issuer} • Issued {cert.year}
                        </p>
                      </div>
                    </div>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        color: '#065F46',
                        fontSize: '11px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <ShieldCheck size={12} /> {cert.verificationStatus || 'Verified'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Section 13: Resume Intelligence Callout Card */}
              <div
                style={{
                  marginTop: '18px',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div
                    onClick={() => navigate(`/officer/students/${student.id}/resume`)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    title="Click → Open Full Resume Intelligence"
                  >
                    <FileText size={18} color="#2563EB" />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 800, color: '#1E40AF' }}>
                        Resume Intelligence (Score: {student.resume?.score || 82}/100) ✦ Click →
                      </h4>
                      <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#3B82F6' }}>
                        File: {student.resume?.fileName || `${student.name.replace(/\s+/g, '_')}_Resume.pdf`}
                      </p>
                    </div>
                  </div>

                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#065F46', backgroundColor: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' }}>
                    {student.resume?.status || 'Analyzed'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '14px', fontSize: '11.5px', color: '#1E3A8A', margin: '10px 0' }}>
                  <span>• <strong>{student.resume?.extractedSkillsCount || 14}</strong> Skills Found</span>
                  <span>• <strong>{student.resume?.extractedProjectsCount || 3}</strong> Projects</span>
                  <span>• <strong>{student.resume?.extractedCertsCount || 3}</strong> Certs</span>
                  <span>• <strong>{student.resume?.extractedExperience || '1 Internship'}</strong></span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button
                    onClick={() => navigate(`/officer/students/${student.id}/resume`)}
                    style={{
                      flex: 1,
                      padding: '7px 10px',
                      backgroundColor: '#3978F6',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <span>View Resume Intelligence</span>
                    <ChevronRight size={13} />
                  </button>
                  <button
                    onClick={() => navigate(`/officer/students/${student.id}/resume`)}
                    style={{
                      padding: '7px 12px',
                      backgroundColor: '#FFFFFF',
                      color: '#2563EB',
                      border: '1px solid #BFDBFE',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Upload size={13} />
                    <span>Upload New</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 14, 15, 16: Career Preferences, Placement History, Eligibility */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            
            {/* Section 14: Career Preferences */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '22px 24px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <h3 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                Career Preferences
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    PREFERRED ROLES
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(student.careerPreferences?.roles || ['Software Engineer', 'Full Stack Developer', 'Backend Developer']).map(r => (
                      <span key={r} style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '12px', fontWeight: 600 }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    PREFERRED INDUSTRIES
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(student.careerPreferences?.industries || ['IT Services', 'FinTech', 'SaaS', 'E-commerce']).map(ind => (
                      <span key={ind} style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: '#F1F5F9', color: '#334155', fontSize: '12px', fontWeight: 500 }}>
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    PREFERRED LOCATIONS
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(student.careerPreferences?.locations || ['Bangalore', 'Hyderabad', 'Chennai', 'Pune']).map(loc => (
                      <span key={loc} style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569', fontSize: '12px' }}>
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
                  <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Expected CTC</span>
                    <strong style={{ color: '#101B36', fontSize: '13px' }}>{student.careerPreferences?.expectedSalary || '₹6–10 LPA'}</strong>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Work Mode</span>
                    <strong style={{ color: '#101B36', fontSize: '13px' }}>{student.careerPreferences?.workPreference || 'On-site / Hybrid'}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 15: Placement Activity Timeline */}
            <div
              id="placement-activity-section"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '22px 24px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                  Placement Activity
                </h3>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Drive History</span>
              </div>

              {/* Timeline */}
              <div style={{ position: 'relative', paddingLeft: '20px' }}>
                {/* Vertical bar */}
                <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '12px', width: '2px', backgroundColor: '#E2E8F0' }} />

                {(student.placementActivity || [
                  { stage: 'Applied', company: 'TCS', role: 'Software Engineer', date: 'Oct 02, 2026', statusColor: '#3978F6' },
                  { stage: 'Shortlisted', company: 'Infosys', role: 'Graduate Engineer', date: 'Sep 28, 2026', statusColor: '#10B981' },
                  { stage: 'Assessment Completed', company: 'Deloitte', role: 'Analyst', date: 'Sep 24, 2026', statusColor: '#8B5CF6' },
                  { stage: 'Application Submitted', company: 'Accenture', role: 'Associate Software Engineer', date: 'Sep 20, 2026', statusColor: '#64748B' }
                ]).map((act, i) => (
                  <div key={i} style={{ position: 'relative', marginBottom: '16px' }}>
                    {/* Bullet */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-20px',
                        top: '4px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: act.statusColor || '#3978F6',
                        border: '2px solid #FFFFFF',
                        boxShadow: '0 0 0 2px rgba(57, 120, 246, 0.2)'
                      }}
                    />

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <strong style={{ fontSize: '13px', color: '#101B36' }}>{act.stage}</strong>
                        <span style={{ fontSize: '11px', color: '#94A3B8' }}>{act.date}</span>
                      </div>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#475569' }}>
                        {act.company} — <span style={{ color: '#64748B' }}>{act.role}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 16: Current Recruitment Eligibility Snapshot */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '22px 24px',
                boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                  Current Recruitment Eligibility
                </h3>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Recruiter Rules</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(student.eligibilitySnapshot || [
                  { company: 'TCS', eligible: true },
                  { company: 'Infosys', eligible: true },
                  { company: 'Deloitte', eligible: true },
                  { company: 'Google', eligible: false, reason: 'CGPA requirement: 9.0' },
                  { company: 'Accenture', eligible: true }
                ]).map((rec, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: rec.eligible ? '#F0FDF4' : '#FEF2F2',
                      border: rec.eligible ? '1px solid #BBF7D0' : '1px solid #FECACA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12.5px'
                    }}
                  >
                    <div>
                      <strong style={{ color: '#101B36', fontSize: '13px' }}>{rec.company}</strong>
                      {rec.reason && (
                        <span style={{ display: 'block', fontSize: '11px', color: '#DC2626', marginTop: '2px' }}>
                          Reason: {rec.reason}
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: rec.eligible ? '#15803D' : '#DC2626'
                      }}
                    >
                      {rec.eligible ? '🟢 Eligible' : '🔴 Not Eligible'}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '12px', fontSize: '11px', color: '#64748B', lineHeight: 1.4 }}>
                CampusCore matches student attributes with active recruiter criterion automatically.
              </div>
            </div>
          </div>

          {/* Section 17: Potential Skill Gaps & AI Analysis CTA */}
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
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                  Potential Skill Gaps & Development Focus
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748B' }}>
                  Comparison against Tier-1 Software Engineering recruiter profiles
                </p>
              </div>

              <button
                onClick={() => navigate(`/officer/students/${student.id}/skill-gap`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#2563EB'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#3978F6'}
              >
                <span>Run AI Skill-Gap Analysis →</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {(student.skillGapsPreview || [
                { skill: 'React', status: 'Strong', badgeColor: '#10B981', badgeBg: '#ECFDF5' },
                { skill: 'SQL', status: 'Strong', badgeColor: '#10B981', badgeBg: '#ECFDF5' },
                { skill: 'Data Structures', status: 'Strong', badgeColor: '#10B981', badgeBg: '#ECFDF5' },
                { skill: 'AWS', status: 'Needs Improvement', badgeColor: '#F59E0B', badgeBg: '#FFFBEB' },
                { skill: 'System Design', status: 'Needs Improvement', badgeColor: '#F59E0B', badgeBg: '#FFFBEB' }
              ]).map((gap, i) => (
                <div
                  key={i}
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
                  <strong style={{ fontSize: '13px', color: '#101B36' }}>{gap.skill}</strong>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      backgroundColor: gap.badgeBg,
                      color: gap.badgeColor
                    }}
                  >
                    {gap.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 22: Placement Officer Notes */}
          <div
            id="officer-notes-section"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                  Officer Notes & Mentorship Logs
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                  Confidential internal placement cell advisories
                </p>
              </div>

              <span style={{ fontSize: '12px', color: '#64748B' }}>
                {(student.officerNotes || []).length} note{(student.officerNotes || []).length !== 1 ? 's' : ''} recorded
              </span>
            </div>

            {/* List of Existing Notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {(student.officerNotes || []).length === 0 ? (
                <p style={{ fontSize: '13px', color: '#94A3B8', fontStyle: 'italic', margin: 0 }}>
                  No internal notes recorded yet. Add recommendations below.
                </p>
              ) : (
                student.officerNotes.map(note => (
                  <div
                    key={note.id}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      fontSize: '13px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#3978F6' }}>
                        {note.author}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                        {note.date}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: '#334155', lineHeight: 1.5 }}>
                      "{note.text}"
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Note Input Form */}
            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={newNoteText}
                onChange={e => setNewNoteText(e.target.value)}
                placeholder="Add internal placement note (e.g., Needs improvement in cloud skills before applying)..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '13px',
                  color: '#101B36',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
                onFocus={e => e.target.style.borderColor = '#3978F6'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  backgroundColor: '#101B36',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} />
                <span>+ Add Note</span>
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* Modals */}
      <EditStudentModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        student={student}
        onSave={handleUpdateStudent}
      />

      <PrintProfileModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        student={student}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        student={student}
        onReanalyze={() => {
          showToast('Resume re-analyzed.');
        }}
      />

      <NotificationPanel
        isOpen={notificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        students={getStoredStudents()}
        recruiters={[]}
        drives={[]}
        onSelectStudent={(s) => {
          setSearchModalOpen(false);
          navigate(`/officer/students/${s.id}`);
        }}
        onSelectRecruiter={() => {}}
        onSelectDrive={() => {}}
      />

      <ModuleComingSoonModal
        isOpen={comingSoonModal.isOpen}
        onClose={() => setComingSoonModal({ ...comingSoonModal, isOpen: false })}
        moduleKey={comingSoonModal.moduleKey}
        moduleTitle={comingSoonModal.moduleTitle}
        layerNumber={comingSoonModal.layerNumber}
      />

      {/* Toast Feedback */}
      {toastMsg && (
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
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
