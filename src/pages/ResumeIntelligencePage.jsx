import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Download,
  Printer,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  ArrowLeft,
  Search,
  Check,
  Sliders,
  FolderOpen
} from 'lucide-react';

import Sidebar from '../components/officer/Sidebar';
import Topbar from '../components/officer/Topbar';
import NotificationPanel from '../components/officer/NotificationPanel';
import SearchModal from '../components/officer/SearchModal';
import ProfileSyncModal from '../components/resume/ProfileSyncModal';
import ResumeVersionCompareModal from '../components/resume/ResumeVersionCompareModal';
import PrintResumeReportModal from '../components/resume/PrintResumeReportModal';

import { getStoredStudents, getStudentById } from '../data';
import { DEFAULT_DEMO_RESUME, analyzeResumeForJob } from '../services/resumeAnalyzer';

export default function ResumeIntelligencePage() {
  const { studentId: paramStudentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  // Student State
  const [students, setStudents] = useState([]);
  const [activeStudentId, setActiveStudentId] = useState(paramStudentId || 'CL-2027-0042');
  const [student, setStudent] = useState(null);

  // Resume Processing State
  const [resumeData, setResumeData] = useState(DEFAULT_DEMO_RESUME);
  const [uploadState, setUploadState] = useState('complete'); // 'empty', 'uploading', 'processing', 'complete', 'error'
  const [uploadProgress, setUploadProgress] = useState(100);
  const [processingPhase, setProcessingPhase] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // UI Interactive States
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedTargetRole, setSelectedTargetRole] = useState('software-engineer');
  const [customJdText, setCustomJdText] = useState('Software Engineer required with strong Java, Spring Boot, SQL, REST APIs, Git and AWS experience.');
  const [jobMatchResult, setJobMatchResult] = useState(null);

  // Modals
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [versionCompareOpen, setVersionCompareOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load students on mount
  useEffect(() => {
    const list = getStoredStudents();
    setStudents(list);

    const targetId = paramStudentId || (list.length > 0 ? list[0].id : 'CL-2027-0042');
    setActiveStudentId(targetId);

    const found = getStudentById(targetId) || list.find(s => s.id === targetId) || list[0];
    if (found) {
      setStudent(found);
    }
  }, [paramStudentId]);

  // Initial Job Match Calculation
  useEffect(() => {
    if (resumeData) {
      const match = analyzeResumeForJob(resumeData, "Software Engineer", customJdText);
      setJobMatchResult(match);
    }
  }, [resumeData]);

  // Simulated Upload & Processing pipeline (Section 5)
  const triggerProcessSimulation = (fileName = "Rahul_Kumar_Resume_v3.pdf") => {
    setUploadError('');
    setUploadState('uploading');
    setUploadProgress(0);

    let currentProgress = 0;
    const uploadInterval = setInterval(() => {
      currentProgress += 20;
      setUploadProgress(Math.min(100, currentProgress));
      if (currentProgress >= 100) {
        clearInterval(uploadInterval);
        startAiProcessingPhases(fileName);
      }
    }, 150);
  };

  const startAiProcessingPhases = (fileName) => {
    setUploadState('processing');
    setProcessingPhase('Reading resume...');

    const p1 = setTimeout(() => setProcessingPhase('Extracting education...'), 350);
    const p2 = setTimeout(() => setProcessingPhase('Identifying skills & confidence...'), 700);
    const p3 = setTimeout(() => setProcessingPhase('Analyzing projects & signals...'), 1050);
    const p4 = setTimeout(() => setProcessingPhase('Evaluating resume quality & ATS readiness...'), 1400);
    const p5 = setTimeout(() => {
      setProcessingPhase('Resume analysis complete.');
      setUploadState('complete');
      setResumeData({
        ...DEFAULT_DEMO_RESUME,
        fileName
      });
      showToast('Resume parsed successfully! Extracted 14 skills & 3 projects.');
    }, 1750);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(p4);
      clearTimeout(p5);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation (Section 31: PDF, DOC, DOCX up to 5MB)
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!hasValidExt) {
      setUploadState('error');
      setUploadError('Unable to process this file. Please upload a valid PDF or DOCX file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadState('error');
      setUploadError('File exceeds maximum size of 5 MB.');
      return;
    }

    triggerProcessSimulation(file.name);
  };

  const handleUseDemoResume = () => {
    triggerProcessSimulation("Rahul_Kumar_Resume_v3.pdf");
  };

  const handleRunJobAnalysis = () => {
    const roleTitleMap = {
      'software-engineer': 'Software Engineer',
      'frontend-developer': 'Frontend Developer',
      'fullstack-developer': 'Full Stack Developer'
    };
    const match = analyzeResumeForJob(resumeData, roleTitleMap[selectedTargetRole] || 'Software Engineer', customJdText);
    setJobMatchResult(match);
    showToast(`Resume re-evaluated for ${match.roleTitle}. Relevance score: ${match.relevanceScore}%.`);
  };

  const handleProfileSyncSuccess = (updatedStudent) => {
    setStudent(updatedStudent);
    showToast('Student profile updated successfully in CampusCore database.');
  };

  const isStudentPerspective = location.pathname.startsWith('/student');

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
          title="Resume Intelligence"
          subtitle="Turn an unstructured resume into an intelligent career profile."
          badgeText="CampusCore AI Core"
        />

        <main style={{ flex: 1, padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
            <button
              onClick={() => {
                if (isStudentPerspective) navigate('/dashboard/student');
                else if (student) navigate(`/officer/students/${student.id}`);
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
              <span>Back to {isStudentPerspective ? 'Student Dashboard' : student ? `${student.name}'s Profile` : 'Student Directory'}</span>
            </button>

            {/* Candidate Selector */}
            {!isStudentPerspective && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Evaluating Candidate:</span>
                <select
                  value={activeStudentId}
                  onChange={e => {
                    const newId = e.target.value;
                    setActiveStudentId(newId);
                    const found = getStudentById(newId) || students.find(s => s.id === newId);
                    if (found) {
                      setStudent(found);
                      navigate(`/officer/students/${newId}/resume`);
                    }
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#101B36',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.id}) — {s.department}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Section 3: Main Header Card with Explanation & AI Badge */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px 28px',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
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
                  OCR & Entity Intelligence Active
                </span>
              </div>

              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#101B36', letterSpacing: '-0.02em' }}>
                Resume Intelligence & Profile Extraction
              </h1>
              <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#64748B', maxWidth: '780px' }}>
                CampusCore analyzes resumes to extract skills, experience and career signals while identifying opportunities for improvement.
              </p>
            </div>

            {/* Quick Actions Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setVersionCompareOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                <TrendingUp size={15} color="#3978F6" />
                <span>Compare Versions</span>
              </button>

              <button
                onClick={() => setPrintModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                <Printer size={15} />
                <span>Download Report</span>
              </button>
            </div>
          </div>

          {/* Section 4 & 5: Resume Upload Area & Processing States */}
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
            {/* Drag & Drop Upload Zone */}
            <div
              style={{
                border: '2px dashed #CBD5E1',
                borderRadius: '12px',
                padding: '28px 20px',
                textAlign: 'center',
                backgroundColor: '#F8FAFC',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  color: '#3978F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}
              >
                <Upload size={24} />
              </div>

              <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                Upload Your Resume
              </h3>
              <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#64748B' }}>
                Drag & drop your PDF here or browse from your device.
              </p>
              <div style={{ fontSize: '11.5px', color: '#94A3B8', marginBottom: '16px' }}>
                Supported formats: <strong>PDF • DOC • DOCX</strong> • Maximum size: <strong>5 MB</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = '#3978F6'}
                  onMouseOut={e => e.currentTarget.style.borderColor = '#CBD5E1'}
                >
                  <FolderOpen size={15} />
                  <span>Browse Files</span>
                </button>

                {/* Section 4: Crucial Hackathon Demo Button */}
                <button
                  onClick={handleUseDemoResume}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#2563EB'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#3978F6'}
                >
                  <Sparkles size={15} />
                  <span>Use Demo Resume ({student?.name || 'Rahul Kumar'})</span>
                </button>
              </div>
            </div>

            {/* Upload States (Section 5) */}
            {uploadState === 'uploading' && (
              <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#EFF6FF', borderRadius: '10px', border: '1px solid #BFDBFE' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 600, color: '#1E40AF', marginBottom: '6px' }}>
                  <span>Uploading file...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#DBEAFE', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${uploadProgress}%`, height: '100%', backgroundColor: '#3978F6', borderRadius: '999px', transition: 'width 0.2s' }} />
                </div>
              </div>
            )}

            {uploadState === 'processing' && (
              <div style={{ marginTop: '16px', padding: '14px 18px', backgroundColor: '#F0F9FF', borderRadius: '10px', border: '1px solid #BAE6FD', display: 'flex', alignItems: 'center', gap: '10px', color: '#0369A1', fontSize: '13px', fontWeight: 600 }}>
                <RefreshCw size={16} className="pulse-dot" />
                <span>CampusCore AI Engine: {processingPhase}</span>
              </div>
            )}

            {uploadState === 'error' && (
              <div style={{ marginTop: '16px', padding: '14px 18px', backgroundColor: '#FEF2F2', borderRadius: '10px', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', gap: '10px', color: '#991B1B', fontSize: '13px' }}>
                <AlertCircle size={16} color="#EF4444" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Privacy UI Notice (Section 32) */}
            <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '11.5px', color: '#94A3B8' }}>
              🔒 <strong>Privacy Assurance:</strong> Your resume contains personal information. CampusCore demo data is stored locally for this prototype.
            </div>
          </div>

          {/* Section 7 & 8: Resume Analysis Dashboard Metrics & Score Card */}
          {uploadState === 'complete' && resumeData && (
            <>
              {/* Top Metrics Row (Section 7) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '14px',
                  marginBottom: '24px'
                }}
              >
                {/* Metric 1: Resume Score */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Resume Score</span>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#10B981', marginTop: '4px', letterSpacing: '-0.02em' }}>
                    {resumeData.scores.overall} <span style={{ fontSize: '13px', color: '#94A3B8' }}>/ 100</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#065F46', fontWeight: 600 }}>{resumeData.scores.statusText}</span>
                </div>

                {/* Metric 2: Skills Detected */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Skills Detected</span>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#101B36', marginTop: '4px', letterSpacing: '-0.02em' }}>
                    {resumeData.skills.length}
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Across 5 tech domains</span>
                </div>

                {/* Metric 3: Projects */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Verified Projects</span>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#101B36', marginTop: '4px', letterSpacing: '-0.02em' }}>
                    {resumeData.projects.length}
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Outcome signals detected</span>
                </div>

                {/* Metric 4: Certifications */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Certifications</span>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#101B36', marginTop: '4px', letterSpacing: '-0.02em' }}>
                    {resumeData.certifications.length}
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Verified external credentials</span>
                </div>

                {/* Metric 5: Experience */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Work Experience</span>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#101B36', marginTop: '4px', letterSpacing: '-0.02em' }}>
                    {resumeData.experience.length}
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Summer tech internship</span>
                </div>
              </div>

              {/* Section 8: Visual Score Breakdown Card & Section 9: Structure Analysis */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                
                {/* Score Breakdown Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                        Overall Resume Score
                      </h3>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                        Composite quality, formatting & signal density evaluation
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '28px', fontWeight: 900, color: '#10B981', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {resumeData.scores.overall} <span style={{ fontSize: '14px', color: '#94A3B8' }}>/ 100</span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#065F46' }}>
                        {resumeData.scores.statusText}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Sub-Scores */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { label: 'Content Quality', score: resumeData.scores.contentQuality },
                      { label: 'Skills Coverage', score: resumeData.scores.skillsCoverage },
                      { label: 'Project Strength', score: resumeData.scores.projectStrength },
                      { label: 'Experience', score: resumeData.scores.experienceStrength },
                      { label: 'Formatting', score: resumeData.scores.formatting },
                      { label: 'ATS Readiness', score: resumeData.scores.atsReadiness }
                    ].map(sub => (
                      <div key={sub.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}>
                          <span style={{ color: '#334155', fontWeight: 500 }}>{sub.label}</span>
                          <strong style={{ color: '#101B36' }}>{sub.score}%</strong>
                        </div>
                        <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${sub.score}%`,
                              height: '100%',
                              backgroundColor: sub.score >= 85 ? '#10B981' : sub.score >= 70 ? '#3978F6' : '#F59E0B',
                              borderRadius: '999px'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '16px', fontSize: '11px', color: '#64748B', fontStyle: 'italic' }}>
                    Demo AI evaluation — does not represent a scientifically validated hiring guarantee.
                  </div>
                </div>

                {/* Section 9: Resume Structure Analysis */}
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
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                      Resume Structure
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                      <span style={{ color: '#065F46', fontWeight: 600 }}>✓ Present</span>
                      <span style={{ color: '#92400E', fontWeight: 600 }}>⚠ Needs Imp.</span>
                      <span style={{ color: '#991B1B', fontWeight: 600 }}>❌ Missing</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {resumeData.structureAnalysis.map(sec => {
                      const isPresent = sec.status === 'Present';
                      const isWarn = sec.status === 'Needs Improvement';
                      return (
                        <div
                          key={sec.section}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '8px',
                            backgroundColor: isPresent ? '#F0FDF4' : isWarn ? '#FFFBEB' : '#FEF2F2',
                            border: isPresent ? '1px solid #DCFCE7' : isWarn ? '1px solid #FEF3C7' : '1px solid #FEE2E2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '12.5px'
                          }}
                        >
                          <div>
                            <strong style={{ color: '#101B36' }}>{sec.icon} {sec.section}</strong>
                            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{sec.note}</div>
                          </div>
                          <span
                            style={{
                              fontSize: '10.5px',
                              fontWeight: 700,
                              padding: '2px 6px',
                              borderRadius: '4px',
                              backgroundColor: '#FFFFFF',
                              color: isPresent ? '#15803D' : isWarn ? '#B45309' : '#DC2626'
                            }}
                          >
                            {sec.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Section 10: Extracted Profile Information & Section 11 & 12: Skill Confidence */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                
                {/* Extracted Profile Cards (Personal, Education, Experience) */}
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
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                      Information Extracted
                    </h3>
                    <button
                      onClick={() => setSyncModalOpen(true)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#10B981',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <ShieldCheck size={14} />
                      <span>Sync Profile</span>
                    </button>
                  </div>

                  {/* Personal Card */}
                  <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', marginBottom: '12px', fontSize: '12.5px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#3978F6', textTransform: 'uppercase' }}>
                      PERSONAL
                    </span>
                    <div style={{ marginTop: '4px', fontWeight: 700, color: '#101B36', fontSize: '14px' }}>
                      {resumeData.personal.name}
                    </div>
                    <div style={{ color: '#475569', marginTop: '2px' }}>
                      {resumeData.personal.email} • {resumeData.personal.phone}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '11.5px', marginTop: '4px' }}>
                      {resumeData.personal.linkedin} • {resumeData.personal.github}
                    </div>
                  </div>

                  {/* Education Card */}
                  <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', marginBottom: '12px', fontSize: '12.5px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#3978F6', textTransform: 'uppercase' }}>
                      EDUCATION
                    </span>
                    <div style={{ marginTop: '4px', fontWeight: 700, color: '#101B36' }}>
                      {resumeData.education.degree}
                    </div>
                    <div style={{ color: '#475569' }}>
                      {resumeData.education.university} • Class of {resumeData.education.graduationYear}
                    </div>
                    <div style={{ marginTop: '4px', color: '#10B981', fontWeight: 700 }}>
                      CGPA: {resumeData.education.cgpa} / 10.0
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '12.5px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#3978F6', textTransform: 'uppercase' }}>
                      EXPERIENCE
                    </span>
                    {resumeData.experience.map(exp => (
                      <div key={exp.id} style={{ marginTop: '4px' }}>
                        <strong style={{ color: '#101B36' }}>{exp.role}</strong>
                        <div style={{ color: '#64748B' }}>{exp.company} • {exp.period}</div>
                        <ul style={{ margin: '6px 0 0', paddingLeft: '16px', color: '#334155', fontSize: '11.5px' }}>
                          {exp.responsibilities.slice(0, 3).map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 11 & 12: Skills Detected with Extraction Confidence */}
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
                        Skills Detected & Confidence
                      </h3>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>
                        NLP extraction confidence and evidence context
                      </p>
                    </div>

                    <span style={{ fontSize: '11px', color: '#64748B' }}>
                      {resumeData.skills.length} items
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '380px', overflowY: 'auto' }}>
                    {resumeData.skills.map(sk => (
                      <div
                        key={sk.name}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '12.5px'
                        }}
                      >
                        <div>
                          <strong style={{ color: '#101B36' }}>{sk.name}</strong>
                          <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>
                            {sk.evidence}
                          </span>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span
                            style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              backgroundColor: sk.confidence >= 90 ? '#ECFDF5' : '#EFF6FF',
                              color: sk.confidence >= 90 ? '#065F46' : '#1E40AF',
                              fontWeight: 700,
                              fontSize: '11px'
                            }}
                          >
                            {sk.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '12px', fontSize: '11px', color: '#94A3B8' }}>
                    Extraction confidence represents simulated semantic matching heuristics.
                  </div>
                </div>
              </div>

              {/* Section 13 & 14: Project Intelligence & Section 15: Experience Analysis */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                
                {/* Project Intelligence */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                  }}
                >
                  <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                    Projects Detected & Depth Analysis
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {resumeData.projects.map(proj => (
                      <div
                        key={proj.id}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
                            {proj.title}
                          </h4>
                          <span style={{ fontSize: '11.5px', color: '#3978F6', fontWeight: 600 }}>
                            {proj.technologies}
                          </span>
                        </div>

                        <p style={{ margin: '6px 0', fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                          {proj.description}
                        </p>

                        {/* Signals */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '8px 0' }}>
                          <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#ECFDF5', color: '#065F46' }}>
                            ✓ Technical implementation
                          </span>
                          <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#ECFDF5', color: '#065F46' }}>
                            ✓ Project outcome
                          </span>
                          <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#FFFBEB', color: '#92400E' }}>
                            ⚠ Quantified impact missing
                          </span>
                        </div>

                        {/* Sub scores */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', fontSize: '11px', textAlign: 'center', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #E2E8F0' }}>
                          <div><span style={{ color: '#64748B' }}>Depth</span> <strong>{proj.scores.technicalDepth}%</strong></div>
                          <div><span style={{ color: '#64748B' }}>Clarity</span> <strong>{proj.scores.clarity}%</strong></div>
                          <div><span style={{ color: '#64748B' }}>Impact</span> <strong style={{ color: '#F59E0B' }}>{proj.scores.impactEvidence}%</strong></div>
                          <div><span style={{ color: '#64748B' }}>Complete</span> <strong>{proj.scores.completeness}%</strong></div>
                        </div>

                        <div style={{ marginTop: '8px', fontSize: '11px', color: '#0369A1', backgroundColor: '#EFF6FF', padding: '6px 10px', borderRadius: '6px' }}>
                          ✦ <strong>AI Tip:</strong> {proj.recommendation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience & Certifications Extraction */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                  }}
                >
                  <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                    Experience & Certifications Analysis
                  </h3>

                  {/* Experience Card */}
                  {resumeData.experience.map(exp => (
                    <div
                      key={exp.id}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        marginBottom: '16px'
                      }}
                    >
                      <strong style={{ fontSize: '14px', color: '#101B36' }}>{exp.role}</strong>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{exp.company} • {exp.period}</div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '10px', textAlign: 'center', fontSize: '11px' }}>
                        <div style={{ padding: '6px', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                          <span style={{ color: '#64748B', display: 'block' }}>Tech Relevance</span>
                          <strong style={{ color: '#10B981', fontSize: '13px' }}>{exp.metrics.technicalRelevance}%</strong>
                        </div>
                        <div style={{ padding: '6px', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                          <span style={{ color: '#64748B', display: 'block' }}>Role Relevance</span>
                          <strong style={{ color: '#3978F6', fontSize: '13px' }}>{exp.metrics.roleRelevance}%</strong>
                        </div>
                        <div style={{ padding: '6px', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                          <span style={{ color: '#64748B', display: 'block' }}>Achievement</span>
                          <strong style={{ color: '#F59E0B', fontSize: '13px' }}>{exp.metrics.achievementEvidence}%</strong>
                        </div>
                      </div>

                      <div style={{ marginTop: '10px', fontSize: '11px', color: '#92400E', backgroundColor: '#FFFBEB', padding: '6px 10px', borderRadius: '6px' }}>
                        💡 {exp.recommendation}
                      </div>
                    </div>
                  ))}

                  {/* Certifications Detected (Section 16) */}
                  <h4 style={{ margin: '14px 0 8px', fontSize: '13.5px', fontWeight: 800, color: '#101B36' }}>
                    Certifications Detected
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {resumeData.certifications.map((c, i) => (
                      <div key={i} style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '13px', color: '#101B36' }}>{c.name}</strong>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>{c.issuer} • {c.year}</div>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#ECFDF5', color: '#065F46' }}>
                          ✓ Detected
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 17 & 18 & 19: ATS Compatibility, Role Keywords & Job Optimization */}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#101B36' }}>
                      ATS Compatibility & Keyword Analysis
                    </h3>
                    <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748B' }}>
                      Benchmark ATS readability against recruiter enterprise filters
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>ATS Score</span>
                    <span style={{ fontSize: '24px', fontWeight: 900, color: '#3978F6' }}>
                      {resumeData.atsAnalysis.score} <span style={{ fontSize: '13px', color: '#94A3B8' }}>/ 100</span>
                    </span>
                  </div>
                </div>

                {/* Sub-ATS breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '20px', textAlign: 'center' }}>
                  <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>Keyword Coverage</span>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#101B36' }}>{resumeData.atsAnalysis.keywordCoverage}%</strong>
                  </div>
                  <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>Formatting</span>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#101B36' }}>{resumeData.atsAnalysis.formatting}%</strong>
                  </div>
                  <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>Section Structure</span>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#101B36' }}>{resumeData.atsAnalysis.sectionStructure}%</strong>
                  </div>
                  <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>Job Relevance</span>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#3978F6' }}>{resumeData.atsAnalysis.jobRelevance}%</strong>
                  </div>
                </div>

                {/* Section 18: ATS Keywords by Role */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>
                      Select Target Role for Keyword Audit:
                    </span>
                    <select
                      value={selectedTargetRole}
                      onChange={e => setSelectedTargetRole(e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '12.5px',
                        fontWeight: 600
                      }}
                    >
                      <option value="software-engineer">Software Engineer</option>
                      <option value="frontend-developer">Frontend Developer</option>
                      <option value="fullstack-developer">Full Stack Developer</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', fontSize: '12px' }}>
                    <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                      <strong style={{ color: '#166534', display: 'block', marginBottom: '6px' }}>
                        Detected Keywords
                      </strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {(resumeData.roleKeywords[selectedTargetRole]?.detected || []).map(kw => (
                          <span key={kw} style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#15803D', fontWeight: 600 }}>
                            ✓ {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                      <strong style={{ color: '#991B1B', display: 'block', marginBottom: '6px' }}>
                        Missing Keywords
                      </strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {(resumeData.roleKeywords[selectedTargetRole]?.missing || []).map(kw => (
                          <span key={kw} style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#DC2626', fontWeight: 600 }}>
                            ⚠ {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '8px', fontSize: '11px', color: '#64748B' }}>
                    ⚠️ <strong>Notice:</strong> Only add skills or keywords that genuinely reflect your experience. Avoid artificial keyword stuffing.
                  </div>
                </div>

                {/* Section 19 & 20: Job-Specific Resume Analysis */}
                <div style={{ paddingTop: '18px', borderTop: '1px solid #E2E8F0' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '14.5px', fontWeight: 800, color: '#101B36' }}>
                    Optimize Resume for a Specific Job
                  </h4>

                  <textarea
                    rows={3}
                    value={customJdText}
                    onChange={e => setCustomJdText(e.target.value)}
                    placeholder="Paste job posting snippet to test resume match..."
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '12.5px',
                      fontFamily: "'Inter', sans-serif",
                      marginBottom: '10px',
                      outline: 'none'
                    }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <button
                      onClick={handleRunJobAnalysis}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#3978F6',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Analyze Resume Against Job
                    </button>

                    {jobMatchResult && (
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#10B981' }}>
                        Resume-to-Job Relevance: {jobMatchResult.relevanceScore}%
                      </span>
                    )}
                  </div>

                  {jobMatchResult && (
                    <div style={{ marginTop: '12px', padding: '12px 16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <span>• <strong>Strong Matches:</strong> {jobMatchResult.strongMatches.join(', ')}</span>
                        <span>• <strong>Missing / Not Evidenced:</strong> {jobMatchResult.missing.join(', ')}</span>
                      </div>
                      <div style={{ color: '#0369A1', fontStyle: 'italic' }}>
                        "{jobMatchResult.recommendation}"
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 21: Resume Improvement Center & Section 22: Before / After View */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                
                {/* Improvement Recommendations */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
                  }}
                >
                  <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#101B36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={18} color="#3978F6" /> ✦ AI Resume Recommendations
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {resumeData.recommendations.map(rec => (
                      <div
                        key={rec.id}
                        style={{
                          padding: '14px',
                          borderRadius: '10px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          fontSize: '12.5px'
                        }}
                      >
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#3978F6', textTransform: 'uppercase' }}>
                          RECOMMENDATION {rec.number}
                        </span>
                        <h4 style={{ margin: '3px 0 6px', fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                          {rec.title}
                        </h4>

                        <div style={{ margin: '4px 0', padding: '6px 10px', borderRadius: '6px', backgroundColor: '#FEF2F2', color: '#991B1B', fontSize: '11.5px' }}>
                          <strong>Current:</strong> "{rec.current}"
                        </div>

                        <div style={{ margin: '4px 0', padding: '6px 10px', borderRadius: '6px', backgroundColor: '#F0FDF4', color: '#166534', fontSize: '11.5px' }}>
                          <strong>Suggested structure:</strong> "{rec.suggested}"
                        </div>

                        <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '4px' }}>
                          💡 {rec.actionText}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Before / After Progression & Section 24: Connection to Layer 4 */}
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
                    <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#101B36' }}>
                      Resume Before / After Projection
                    </h3>

                    {/* Before / After Visual Card */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                      <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CURRENT RESUME</span>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: '#3978F6', margin: '4px 0' }}>82</div>
                        <span style={{ fontSize: '11.5px', color: '#64748B' }}>Baseline version</span>
                      </div>

                      <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', textAlign: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#065F46', fontWeight: 700 }}>SUGGESTED REVISIONS</span>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: '#10B981', margin: '4px 0' }}>92+</div>
                        <span style={{ fontSize: '11.5px', color: '#065F46', fontWeight: 600 }}>Estimated potential</span>
                      </div>
                    </div>

                    <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, marginBottom: '20px' }}>
                      • Quantify project bullets with performance & user metrics.<br />
                      • Surface Spring Boot & cloud deployment practices.<br />
                      • Highlight hackathon achievements or club leadership.
                    </div>
                  </div>

                  {/* Section 24: Connection to Layer 4 Callout Box */}
                  <div
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      backgroundColor: '#EFF6FF',
                      border: '1.5px solid #BFDBFE'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1E40AF', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                      <Sparkles size={15} /> Continue With AI Skill Analysis
                    </div>
                    <p style={{ margin: '0 0 12px', fontSize: '12px', color: '#1E3A8A' }}>
                      Transfer newly extracted skills and verified project signals directly into the Layer 4 AI Skill-Gap Analyzer.
                    </p>

                    <button
                      onClick={() => navigate(isStudentPerspective ? '/skill-gap' : `/officer/students/${student?.id || activeStudentId}/skill-gap`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        backgroundColor: '#3978F6',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)'
                      }}
                    >
                      <span>Analyze Skill Gap →</span>
                    </button>
                  </div>
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
              ℹ️ <strong>CampusCore Prototype Notice:</strong> Resume intelligence extraction, ATS readiness scores, and keyword audits represent simulated AI heuristic models.
            </span>
            <span style={{ fontWeight: 600, color: '#3978F6' }}>
              CampusCore Layer 5 Engine
            </span>
          </div>
        </main>
      </div>

      {/* Profile Sync Modal (Section 23) */}
      <ProfileSyncModal
        isOpen={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
        student={student}
        resumeData={resumeData}
        onSyncSuccess={handleProfileSyncSuccess}
      />

      {/* Version Progression Modal (Section 25 & 26) */}
      <ResumeVersionCompareModal
        isOpen={versionCompareOpen}
        onClose={() => setVersionCompareOpen(false)}
        versionComparison={resumeData.versionComparison}
        versionHistory={resumeData.versionHistory}
      />

      {/* Printable Report Modal (Section 27) */}
      <PrintResumeReportModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        student={student}
        resumeData={resumeData}
      />

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={notificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        students={students}
        recruiters={[]}
        drives={[]}
        onSelectStudent={(s) => {
          setSearchModalOpen(false);
          setActiveStudentId(s.id);
          setStudent(s);
          navigate(`/officer/students/${s.id}/resume`);
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
