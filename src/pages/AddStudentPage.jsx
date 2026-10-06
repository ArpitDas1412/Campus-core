import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  UserPlus,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Code,
  Briefcase,
  User,
  GraduationCap
} from 'lucide-react';
import Sidebar from '../components/officer/Sidebar';
import Topbar from '../components/officer/Topbar';
import NotificationPanel from '../components/officer/NotificationPanel';
import SearchModal from '../components/officer/SearchModal';
import { getStoredStudents, saveStoredStudents } from '../data';

export default function AddStudentPage() {
  const navigate = useNavigate();

  // Layout UI states
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    studentId: `CL-2027-0${Math.floor(100 + Math.random() * 900)}`,
    email: '',
    phone: '',
    dob: '2004-05-15',
    gender: 'Male',

    // Academic Information
    department: 'Computer Science & Engineering',
    degree: 'B.Tech',
    graduationYear: 2027,
    cgpa: '8.5',
    tenthPercentage: '90.5',
    twelfthPercentage: '88.0',
    backlogs: '0',
    attendance: '92',

    // Technical Skills
    programmingSkills: 'Java, Python, C++',
    webSkills: 'React, Node.js, HTML, CSS',
    databaseSkills: 'SQL, MongoDB',
    otherSkills: 'Data Structures, Git, AWS',

    // Career Preferences
    preferredRoles: 'Software Engineer, Full Stack Developer',
    preferredLocations: 'Bangalore, Hyderabad, Pune',
    expectedSalary: '₹6–10 LPA',

    // Placement
    placementStatus: 'Not Placed'
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.studentId.trim()) errs.studentId = 'Student ID is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!formData.email.includes('@')) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    
    const cgpaVal = parseFloat(formData.cgpa);
    if (isNaN(cgpaVal) || cgpaVal < 0 || cgpaVal > 10) {
      errs.cgpa = 'CGPA must be between 0.0 and 10.0';
    }

    const tenthVal = parseFloat(formData.tenthPercentage);
    if (isNaN(tenthVal) || tenthVal < 0 || tenthVal > 100) {
      errs.tenthPercentage = '10th % must be between 0 and 100';
    }

    const twelfthVal = parseFloat(formData.twelfthPercentage);
    if (isNaN(twelfthVal) || twelfthVal < 0 || twelfthVal > 100) {
      errs.twelfthPercentage = '12th % must be between 0 and 100';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const calculateReadinessScore = (cgpa, backlogs, skillsCount) => {
    let base = Math.min(100, Math.round((cgpa / 10) * 85 + (skillsCount * 1.5)));
    if (parseInt(backlogs, 10) > 0) base -= 15;
    return Math.max(35, Math.min(98, base));
  };

  const getReadinessLevel = (score) => {
    if (score >= 85) return 'Job Ready';
    if (score >= 70) return 'Nearly Ready';
    if (score >= 50) return 'Needs Improvement';
    return 'Critical';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Combine all entered skills into flat array
    const allSkills = [
      ...formData.programmingSkills.split(','),
      ...formData.webSkills.split(','),
      ...formData.databaseSkills.split(','),
      ...formData.otherSkills.split(',')
    ]
      .map(s => s.trim())
      .filter(Boolean);

    const cgpaNum = parseFloat(formData.cgpa);
    const score = calculateReadinessScore(cgpaNum, formData.backlogs, allSkills.length);
    const level = getReadinessLevel(score);

    const newStudent = {
      id: formData.studentId.trim(),
      name: formData.name.trim(),
      department: formData.department,
      graduationYear: parseInt(formData.graduationYear, 10),
      cgpa: cgpaNum,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: 'Campus Residence',
      readinessScore: score,
      readinessLevel: level,
      skills: allSkills.length > 0 ? allSkills : ['Java', 'SQL', 'React', 'Data Structures'],
      applicationsCount: 0,
      placementStatus: formData.placementStatus,
      isPriority: false,

      academic: {
        degree: formData.degree,
        department: formData.department,
        university: 'Demo Engineering University',
        graduationYear: parseInt(formData.graduationYear, 10),
        cgpa: cgpaNum,
        tenthPercentage: parseFloat(formData.tenthPercentage),
        twelfthPercentage: parseFloat(formData.twelfthPercentage),
        backlogs: parseInt(formData.backlogs, 10) || 0,
        attendance: parseInt(formData.attendance, 10) || 90,
        semesterHistory: [
          { semester: 'Sem 1', cgpa: Math.max(6.5, +(cgpaNum - 0.6).toFixed(2)) },
          { semester: 'Sem 2', cgpa: Math.max(6.8, +(cgpaNum - 0.4).toFixed(2)) },
          { semester: 'Sem 3', cgpa: Math.max(7.0, +(cgpaNum - 0.2).toFixed(2)) },
          { semester: 'Sem 4', cgpa: cgpaNum },
          { semester: 'Sem 5', cgpa: cgpaNum }
        ]
      },

      readinessBreakdown: {
        technicalSkills: Math.min(95, score + 4),
        academicEligibility: Math.min(96, Math.round(cgpaNum * 10)),
        projects: Math.min(90, score - 2),
        resumeQuality: 78,
        communication: 80,
        certifications: 70
      },

      categorizedSkills: {
        programming: formData.programmingSkills.split(',').map(s => s.trim()).filter(Boolean).map(s => ({ name: s, level: 'Advanced' })),
        web: formData.webSkills.split(',').map(s => s.trim()).filter(Boolean).map(s => ({ name: s, level: 'Intermediate' })),
        database: formData.databaseSkills.split(',').map(s => s.trim()).filter(Boolean).map(s => ({ name: s, level: 'Intermediate' })),
        core: formData.otherSkills.split(',').map(s => s.trim()).filter(Boolean).map(s => ({ name: s, level: 'Intermediate' }))
      },

      projects: [
        {
          title: 'Capstone Collaborative Platform',
          description: 'Web-based application architected for peer collaboration and tracking.',
          technologies: formData.webSkills.split(',').slice(0, 3).join(' • ') || 'React • Node.js',
          impact: 'Demo project submission'
        }
      ],

      certifications: [
        {
          name: 'Foundational Cloud & Computing',
          issuer: 'Industry Certification Board',
          year: '2026',
          verificationStatus: 'Verified'
        }
      ],

      resume: {
        fileName: `${formData.name.replace(/\s+/g, '_')}_Resume.pdf`,
        status: 'Analyzed',
        score: Math.min(92, score - 5),
        extractedSkillsCount: allSkills.length || 8,
        extractedProjectsCount: 1,
        extractedCertsCount: 1,
        extractedExperience: 'Academic Projects'
      },

      careerPreferences: {
        roles: formData.preferredRoles.split(',').map(r => r.trim()).filter(Boolean),
        industries: ['IT Services', 'FinTech', 'SaaS'],
        locations: formData.preferredLocations.split(',').map(l => l.trim()).filter(Boolean),
        expectedSalary: formData.expectedSalary,
        workPreference: 'On-site / Hybrid'
      },

      placementActivity: [
        {
          stage: 'Profile Registered',
          company: 'Campus Placement Cell',
          role: 'Placement Season 2026-27 Enrollment',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          statusColor: '#10B981'
        }
      ],

      eligibilitySnapshot: [
        { company: 'TCS', eligible: cgpaNum >= 6.5 },
        { company: 'Infosys', eligible: cgpaNum >= 6.5 },
        { company: 'Deloitte', eligible: cgpaNum >= 7.0 },
        { company: 'Google', eligible: cgpaNum >= 9.0, reason: cgpaNum < 9.0 ? 'CGPA requirement: 9.0' : null },
        { company: 'Accenture', eligible: cgpaNum >= 6.5 }
      ],

      skillGapsPreview: [
        { skill: allSkills[0] || 'Core Skills', status: 'Strong', badgeColor: '#10B981', badgeBg: '#ECFDF5' },
        { skill: allSkills[1] || 'Web', status: 'Strong', badgeColor: '#10B981', badgeBg: '#ECFDF5' },
        { skill: 'AWS Cloud', status: 'Needs Improvement', badgeColor: '#F59E0B', badgeBg: '#FFFBEB' },
        { skill: 'System Design', status: 'Needs Improvement', badgeColor: '#F59E0B', badgeBg: '#FFFBEB' }
      ],

      aiSummary: {
        text: `${formData.name} demonstrates a readiness score of ${score}% with primary strengths in ${allSkills.slice(0, 3).join(', ')}. Suitable for recruitment evaluation across software and technology tracks.`
      },

      officerNotes: [
        {
          id: 'note_init',
          author: 'Dr. Priya Sharma (Placement Officer)',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          text: 'Initial student readiness profile established and validated.'
        }
      ]
    };

    // Save to stored students in localStorage
    const currentList = getStoredStudents();
    // Prepend or add new
    const updatedList = [newStudent, ...currentList.filter(s => s.id !== newStudent.id)];
    saveStoredStudents(updatedList);

    setToastMessage('Student profile created successfully.');

    // Redirect to newly created profile after brief delay
    setTimeout(() => {
      navigate(`/officer/students/${newStudent.id}`);
    }, 1200);
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

      {/* Main Form Content */}
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
          title="Add New Student"
          subtitle="Enroll a student candidate into the CampusCore placement readiness database."
          badgeText="Student Enrollment"
        />

        <main style={{ flex: 1, padding: '24px 28px', maxWidth: '1000px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          
          {/* Breadcrumb */}
          <div style={{ marginBottom: '16px' }}>
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
          </div>

          {/* Form Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '32px',
              boxShadow: '0 1px 3px rgba(16, 27, 54, 0.03)'
            }}
          >
            <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '18px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#EFF6FF',
                    color: '#3978F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <UserPlus size={22} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#101B36', letterSpacing: '-0.02em' }}>
                    Student Enrollment & 360° Profile Setup
                  </h2>
                  <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#64748B' }}>
                    Fill out all required details to build the candidate's initial readiness baseline.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* Section 1: Personal Information */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <User size={18} color="#3978F6" /> 1. Personal Information
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Kumar"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: errors.name ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                        fontSize: '13.5px',
                        outline: 'none'
                      }}
                    />
                    {errors.name && <span style={{ fontSize: '11px', color: '#EF4444' }}>{errors.name}</span>}
                  </div>

                  {/* Student ID */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Student ID / Roll No *
                    </label>
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: errors.studentId ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                        fontSize: '13.5px',
                        outline: 'none'
                      }}
                    />
                    {errors.studentId && <span style={{ fontSize: '11px', color: '#EF4444' }}>{errors.studentId}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul.kumar@demo.campuscore"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: errors.email ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                        fontSize: '13.5px',
                        outline: 'none'
                      }}
                    />
                    {errors.email && <span style={{ fontSize: '11px', color: '#EF4444' }}>{errors.email}</span>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: errors.phone ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                        fontSize: '13.5px',
                        outline: 'none'
                      }}
                    />
                    {errors.phone && <span style={{ fontSize: '11px', color: '#EF4444' }}>{errors.phone}</span>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={e => setFormData({ ...formData, dob: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={e => setFormData({ ...formData, gender: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-Binary">Non-Binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Academic Profile */}
              <div style={{ marginBottom: '28px', borderTop: '1px solid #F1F5F9', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <GraduationCap size={18} color="#3978F6" /> 2. Academic Information
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {/* Department */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics & Communication">Electronics & Communication</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                    </select>
                  </div>

                  {/* Degree */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Degree
                    </label>
                    <select
                      value={formData.degree}
                      onChange={e => setFormData({ ...formData, degree: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      <option value="B.Tech">B.Tech</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="MCA">MCA</option>
                    </select>
                  </div>

                  {/* Graduation Year */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Graduation Year *
                    </label>
                    <select
                      value={formData.graduationYear}
                      onChange={e => setFormData({ ...formData, graduationYear: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      <option value={2027}>2027</option>
                      <option value={2028}>2028</option>
                      <option value={2029}>2029</option>
                    </select>
                  </div>

                  {/* CGPA */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Cumulative CGPA (0.0 - 10.0) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={formData.cgpa}
                      onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: errors.cgpa ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                    {errors.cgpa && <span style={{ fontSize: '11px', color: '#EF4444' }}>{errors.cgpa}</span>}
                  </div>

                  {/* 10th % */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      10th Percentage (%) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={formData.tenthPercentage}
                      onChange={e => setFormData({ ...formData, tenthPercentage: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: errors.tenthPercentage ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>

                  {/* 12th % */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      12th Percentage (%) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={formData.twelfthPercentage}
                      onChange={e => setFormData({ ...formData, twelfthPercentage: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: errors.twelfthPercentage ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>

                  {/* Backlogs */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Active Backlogs
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.backlogs}
                      onChange={e => setFormData({ ...formData, backlogs: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Technical Skills */}
              <div style={{ marginBottom: '28px', borderTop: '1px solid #F1F5F9', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Code size={18} color="#3978F6" /> 3. Technical Skills
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Programming Languages
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Java, Python, C++, JavaScript"
                      value={formData.programmingSkills}
                      onChange={e => setFormData({ ...formData, programmingSkills: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Web Frameworks & Stacks
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. React, Node.js, Express, HTML, CSS"
                      value={formData.webSkills}
                      onChange={e => setFormData({ ...formData, webSkills: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Database Technologies
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SQL, PostgreSQL, MongoDB"
                      value={formData.databaseSkills}
                      onChange={e => setFormData({ ...formData, databaseSkills: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Other Tools & Competencies
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AWS, Docker, Machine Learning, Git"
                      value={formData.otherSkills}
                      onChange={e => setFormData({ ...formData, otherSkills: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Career & Placement */}
              <div style={{ marginBottom: '28px', borderTop: '1px solid #F1F5F9', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Briefcase size={18} color="#3978F6" /> 4. Career Preferences & Placement Status
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Preferred Roles
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Software Engineer, Full Stack Developer"
                      value={formData.preferredRoles}
                      onChange={e => setFormData({ ...formData, preferredRoles: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Preferred Locations
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bangalore, Hyderabad, Pune, Mumbai"
                      value={formData.preferredLocations}
                      onChange={e => setFormData({ ...formData, preferredLocations: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Expected Salary
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹6–10 LPA"
                      value={formData.expectedSalary}
                      onChange={e => setFormData({ ...formData, expectedSalary: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Placement Status
                    </label>
                    <select
                      value={formData.placementStatus}
                      onChange={e => setFormData({ ...formData, placementStatus: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      <option value="Not Placed">Not Placed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Placed">Placed</option>
                      <option value="Offer Accepted">Offer Accepted</option>
                      <option value="Offer Declined">Offer Declined</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div
                style={{
                  borderTop: '1px solid #E2E8F0',
                  paddingTop: '20px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <button
                  type="button"
                  onClick={() => navigate('/officer/students')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    color: '#64748B',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#2563EB'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#3978F6'}
                >
                  <Save size={16} />
                  <span>Save Student</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* Global Notifications Panel */}
      <NotificationPanel
        isOpen={notificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
      />

      {/* Global Quick Search Modal */}
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

      {/* Success Toast */}
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
