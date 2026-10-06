import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Sparkles,
  Calendar,
  FileText,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ClipboardPaste,
  ShieldCheck,
  Building2,
  Clock,
  MapPin,
  Award
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(null);

  // Form State initialized with realistic defaults matching prompt demo flow
  const [formData, setFormData] = useState({
    title: 'Software Engineer',
    type: 'Full-time',
    department: 'Engineering',
    workMode: 'Hybrid',
    location: 'Bangalore',
    salary: '₹8–10 LPA',
    openings: 25,

    // Step 2: JD
    summary:
      'We are looking for passionate Software Engineers to join our Core Platform Engineering team. You will build highly scalable backend services and responsive client web applications.',
    responsibilities:
      '• Design, develop, test, and deploy robust microservices and web applications.\n• Collaborate with cross-functional teams to define architecture and requirements.\n• Write clean, well-tested, and maintainable code adhering to best design patterns.\n• Participate in active code reviews and engineering design discussions.',
    requiredQualifications:
      '• B.Tech / B.E. in Computer Science, IT, or Electronics & Communication.\n• Strong foundation in Computer Science fundamentals, algorithms, and data structures.\n• Minimum CGPA of 7.5 with 0 active backlogs.',
    technicalRequirements:
      '• Core Java, Data Structures, Algorithms, and Object-Oriented Design.\n• Relational databases (SQL, schema design, index optimization).\n• RESTful API development and basic cloud awareness.',
    preferredQualifications:
      '• Prior internship experience in backend or full-stack software development.\n• Hands-on familiarity with Docker, AWS cloud, or modern frontend frameworks (React).',
    benefits:
      '• Competitive CTC ₹8–10 LPA + Performance Bonus.\n• Comprehensive medical insurance & wellness allowance.\n• Hybrid flexible work schedule with state-of-the-art developer hardware.',

    // Step 3: Required Skills
    requiredSkills: [
      { name: 'Java', level: 'Advanced', importance: 'High' },
      { name: 'Data Structures', level: 'Advanced', importance: 'High' },
      { name: 'SQL', level: 'Intermediate', importance: 'High' },
      { name: 'Git', level: 'Intermediate', importance: 'Medium' },
      { name: 'REST APIs', level: 'Intermediate', importance: 'High' }
    ],

    // Step 4: Preferred Skills (Bonus)
    preferredSkills: ['AWS', 'Docker', 'React', 'Spring Boot', 'Kubernetes', 'Python'],

    // Step 5: Eligibility
    eligibility: {
      minCGPA: 7.5,
      maxBacklogs: 0,
      departments: ['CSE', 'IT', 'ECE'],
      graduationYear: 2027,
      degree: ['B.Tech', 'B.E.'],
      requiredCertifications: false,
      requiredInternship: false,
      allowEquivalent: true
    },

    // Step 6: Selection Process
    selectionProcess: [
      {
        name: 'Resume Screening',
        evaluationType: 'Assessment',
        duration: '1-2 Days',
        description: 'Automated eligibility verification & AI profile screening'
      },
      {
        name: 'Online Assessment',
        evaluationType: 'Assessment',
        duration: '90 Minutes',
        description: 'Coding challenge, data structures & CS fundamentals'
      },
      {
        name: 'Technical Interview',
        evaluationType: 'Technical Interview',
        duration: '60 Minutes',
        description: 'Live problem solving, system design basics & code walkthrough'
      },
      {
        name: 'HR Interview',
        evaluationType: 'HR Interview',
        duration: '30 Minutes',
        description: 'Culture fit, communication, and compensation discussion'
      },
      {
        name: 'Final Selection',
        evaluationType: 'Other',
        duration: '1 Day',
        description: 'Offer release and joining confirmation'
      }
    ],

    // Step 7: Schedule
    schedule: {
      applicationStart: '2026-10-05',
      applicationDeadline: '2026-10-18',
      assessmentDate: '2026-10-21',
      interviewStart: '2026-10-25',
      interviewEnd: '2026-10-28',
      joiningTimeline: 'July 2027',
      driveMode: 'Hybrid',
      driveLocation: 'Campus Placement Cell & Virtual (Google Meet)'
    }
  });

  const steps = [
    { number: 1, title: 'Basic Details' },
    { number: 2, title: 'Job Description' },
    { number: 3, title: 'Required Skills' },
    { number: 4, title: 'Preferred Skills' },
    { number: 5, title: 'Eligibility' },
    { number: 6, title: 'Selection Process' },
    { number: 7, title: 'Schedule' },
    { number: 8, title: 'Review & Publish' }
  ];

  // Quick autofill / paste demo JD
  const handlePasteDemoJD = () => {
    setFormData((prev) => ({
      ...prev,
      title: 'Full Stack Engineer (Campus 2027)',
      department: 'Cloud Solutions',
      summary:
        'TechNova Solutions is hiring top campus engineers to architect the next generation of cloud-native enterprise intelligence systems.',
      responsibilities:
        '• Develop performant web applications using React and Spring Boot.\n• Implement scalable REST and GraphQL endpoints.\n• Integrate automated test suites and maintain 90%+ code coverage.\n• Participate in agile sprints and bi-weekly product demos.',
      requiredQualifications:
        '• B.Tech/B.E. in CSE, IT, or ECE (Graduation 2027).\n• Strong problem solving in Java or Python.\n• Solid understanding of relational and NoSQL databases.',
      benefits:
        '• ₹9.5–12.0 LPA CTC.\n• Relocation allowance to Bangalore / Hyderabad.\n• Learning budget for cloud certifications (AWS / GCP).'
    }));
  };

  // Skill management helpers
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');
  const [newSkillImportance, setNewSkillImportance] = useState('High');

  const addRequiredSkill = () => {
    if (!newSkillName.trim()) return;
    setFormData((prev) => ({
      ...prev,
      requiredSkills: [
        ...prev.requiredSkills,
        {
          name: newSkillName.trim(),
          level: newSkillLevel,
          importance: newSkillImportance
        }
      ]
    }));
    setNewSkillName('');
  };

  const removeRequiredSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((_, i) => i !== index)
    }));
  };

  const [newPreferredSkill, setNewPreferredSkill] = useState('');
  const addPreferredSkill = () => {
    if (!newPreferredSkill.trim()) return;
    if (!formData.preferredSkills.includes(newPreferredSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        preferredSkills: [...prev.preferredSkills, newPreferredSkill.trim()]
      }));
    }
    setNewPreferredSkill('');
  };

  const removePreferredSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      preferredSkills: prev.preferredSkills.filter((s) => s !== skill)
    }));
  };

  // Selection process stage helpers
  const [newStageName, setNewStageName] = useState('');
  const [newStageType, setNewStageType] = useState('Technical Interview');
  const [newStageDuration, setNewStageDuration] = useState('45 Minutes');

  const addStage = () => {
    if (!newStageName.trim()) return;
    setFormData((prev) => ({
      ...prev,
      selectionProcess: [
        ...prev.selectionProcess,
        {
          name: newStageName.trim(),
          evaluationType: newStageType,
          duration: newStageDuration,
          description: `Candidate evaluation round for ${newStageName.trim()}`
        }
      ]
    }));
    setNewStageName('');
  };

  const removeStage = (index) => {
    setFormData((prev) => ({
      ...prev,
      selectionProcess: prev.selectionProcess.filter((_, i) => i !== index)
    }));
  };

  // Publishing
  const handlePublish = (status = 'Active') => {
    setIsSubmitting(true);
    const newDrive = recruiterService.createJob({
      ...formData,
      status: status
    });

    setSuccessToast(`Placement Drive "${newDrive.title}" ${status === 'Active' ? 'Published' : 'Saved as Draft'}!`);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/recruiter/jobs/${newDrive.id}`);
    }, 1200);
  };

  return (
    <RecruiterLayout>
      {/* Toast Notification */}
      {successToast && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            right: '32px',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            padding: '14px 24px',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14.5px',
            fontWeight: 700,
            zIndex: 99
          }}
        >
          <CheckCircle2 size={20} />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => navigate('/recruiter/jobs')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
            marginBottom: '8px'
          }}
        >
          <ChevronLeft size={16} />
          <span>Back to Jobs & Drives</span>
        </button>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#101B36',
            margin: '0 0 4px',
            letterSpacing: '-0.02em'
          }}
        >
          Create Placement Drive
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
          Define role requirements, set eligibility rules, and configure the selection pipeline.
        </p>
      </div>

      {/* 8-Step Wizard Progress Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          padding: '16px 20px',
          marginBottom: '28px',
          overflowX: 'auto',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            minWidth: '780px',
            justifyContent: 'space-between'
          }}
        >
          {steps.map((s, idx) => {
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;
            return (
              <React.Fragment key={s.number}>
                <div
                  onClick={() => setCurrentStep(s.number)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted
                        ? '#10B981'
                        : isCurrent
                        ? '#3978F6'
                        : '#F1F5F9',
                      color: isCompleted || isCurrent ? '#FFFFFF' : '#64748B',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: isCurrent ? '0 0 0 4px rgba(57, 120, 246, 0.15)' : 'none'
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : s.number}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: isCurrent ? '#3978F6' : '#94A3B8',
                        textTransform: 'uppercase'
                      }}
                    >
                      Step {s.number}
                    </div>
                    <div
                      style={{
                        fontSize: '12.5px',
                        fontWeight: isCurrent ? 700 : 600,
                        color: isCurrent ? '#101B36' : '#64748B'
                      }}
                    >
                      {s.title}
                    </div>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      backgroundColor: isCompleted ? '#10B981' : '#E2E8F0',
                      margin: '0 12px',
                      minWidth: '24px'
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          marginBottom: '28px'
        }}
      >
        {/* STEP 1: BASIC DETAILS */}
        {currentStep === 1 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Step 1: Role Overview & Basic Details
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
                Specify the position title, compensation, open headcount, and primary location.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Software Engineer"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Job Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Internship + Full-time">Internship + Full-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Target Department / Division
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Engineering, Cloud"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Work Arrangement Mode
                </label>
                <select
                  value={formData.workMode}
                  onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Primary Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bangalore, Hyderabad"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Annual Compensation (CTC) *
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="e.g. ₹8–10 LPA"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Number of Open Headcounts *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.openings}
                  onChange={(e) => setFormData({ ...formData, openings: parseInt(e.target.value) || 1 })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: JOB DESCRIPTION */}
        {currentStep === 2 && (
          <div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}
            >
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                  Step 2: Rich Job Description
                </h2>
                <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
                  This text feeds directly into Layer 7 automated AI requirement extraction.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePasteDemoJD}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  color: '#334155',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ClipboardPaste size={15} color="#3978F6" />
                <span>Paste Sample Job Description</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Job Summary
                </label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px',
                    lineHeight: 1.5
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Key Responsibilities
                </label>
                <textarea
                  rows={4}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px',
                    lineHeight: 1.5
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Required Technical Qualifications
                  </label>
                  <textarea
                    rows={4}
                    value={formData.technicalRequirements}
                    onChange={(e) => setFormData({ ...formData, technicalRequirements: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px',
                      lineHeight: 1.5
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Benefits & Perks
                  </label>
                  <textarea
                    rows={4}
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px',
                      lineHeight: 1.5
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: REQUIRED SKILLS */}
        {currentStep === 3 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Step 3: Core Required Skills
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
                Candidates must exhibit proficiency in these skills. Used for initial qualification.
              </p>
            </div>

            {/* Existing Skills Table */}
            <div
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '20px'
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 700, color: '#64748B', textAlign: 'left' }}>
                      Skill Name
                    </th>
                    <th style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 700, color: '#64748B', textAlign: 'left' }}>
                      Required Level
                    </th>
                    <th style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 700, color: '#64748B', textAlign: 'left' }}>
                      Evaluation Importance
                    </th>
                    <th style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 700, color: '#64748B', textAlign: 'right' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.requiredSkills.map((sk, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                        {sk.name}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#EFF6FF',
                            color: '#2563EB'
                          }}
                        >
                          {sk.level}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor:
                              sk.importance === 'High'
                                ? '#FEF2F2'
                                : sk.importance === 'Medium'
                                ? '#FEF3C7'
                                : '#F1F5F9',
                            color:
                              sk.importance === 'High'
                                ? '#DC2626'
                                : sk.importance === 'Medium'
                                ? '#D97706'
                                : '#475569'
                          }}
                        >
                          {sk.importance}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => removeRequiredSkill(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Skill Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              <input
                type="text"
                placeholder="Enter skill name (e.g. Python, Docker, Spring Boot)"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                style={{
                  flex: 2,
                  minWidth: '200px',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px'
                }}
              />
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '130px',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <select
                value={newSkillImportance}
                onChange={(e) => setNewSkillImportance(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '120px',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="High">High Importance</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <button
                type="button"
                onClick={addRequiredSkill}
                style={{
                  padding: '9px 16px',
                  borderRadius: '6px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={15} />
                <span>Add Skill</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PREFERRED SKILLS */}
        {currentStep === 4 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Step 4: Preferred / Bonus Skills
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
                Additional competencies that give candidates a competitive edge.
              </p>
            </div>

            <div
              style={{
                padding: '14px 18px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#1E40AF',
                fontSize: '13px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Sparkles size={18} color="#2563EB" />
              <span>
                <strong>Matching Principle:</strong> Preferred skills will <u>NOT</u> automatically
                disqualify candidates. They act as positive bonus signals during AI candidate scoring
                in Layer 7.
              </span>
            </div>

            {/* Preferred skills chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                marginBottom: '20px'
              }}
            >
              {formData.preferredSkills.map((sk) => (
                <span
                  key={sk}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#334155',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                  }}
                >
                  <span>{sk}</span>
                  <button
                    type="button"
                    onClick={() => removePreferredSkill(sk)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add Preferred Skill */}
            <div style={{ display: 'flex', gap: '10px', maxWidth: '460px' }}>
              <input
                type="text"
                placeholder="e.g. AWS, Kubernetes, TensorFlow, GraphQL"
                value={newPreferredSkill}
                onChange={(e) => setNewPreferredSkill(e.target.value)}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px'
                }}
              />
              <button
                type="button"
                onClick={addPreferredSkill}
                style={{
                  padding: '9px 16px',
                  borderRadius: '6px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={15} />
                <span>Add Bonus Skill</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: ELIGIBILITY CRITERIA */}
        {currentStep === 5 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Step 5: Strict Eligibility Criteria
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
                These parameters establish <strong>hard eligibility filters</strong> applied before AI ranking.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Minimum CGPA Rule *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.eligibility.minCGPA}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eligibility: {
                        ...formData.eligibility,
                        minCGPA: parseFloat(e.target.value) || 0
                      }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Maximum Active Backlogs *
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={formData.eligibility.maxBacklogs}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eligibility: {
                        ...formData.eligibility,
                        maxBacklogs: parseInt(e.target.value) || 0
                      }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Graduation Batch Year *
                </label>
                <select
                  value={formData.eligibility.graduationYear}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eligibility: {
                        ...formData.eligibility,
                        graduationYear: parseInt(e.target.value)
                      }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value={2026}>2026</option>
                  <option value={2027}>2027 (Current Final Year)</option>
                  <option value={2028}>2028</option>
                </select>
              </div>
            </div>

            {/* Allowed Departments Multi-select */}
            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                Eligible Academic Departments
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Data Science'].map((dept) => {
                  const isSelected = formData.eligibility.departments.includes(dept);
                  return (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => {
                        const updated = isSelected
                          ? formData.eligibility.departments.filter((d) => d !== dept)
                          : [...formData.eligibility.departments, dept];
                        setFormData({
                          ...formData,
                          eligibility: { ...formData.eligibility, departments: updated }
                        });
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: isSelected ? '1px solid #3978F6' : '1px solid #CBD5E1',
                        backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                        color: isSelected ? '#2563EB' : '#475569',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {isSelected ? '✓ ' : ''}
                      {dept}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggles */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  color: '#334155',
                  fontWeight: 600
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.eligibility.allowEquivalent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eligibility: {
                        ...formData.eligibility,
                        allowEquivalent: e.target.checked
                      }
                    })
                  }
                  style={{ width: '16px', height: '16px' }}
                />
                <span>Allow equivalent qualifications (MCA / Dual Degree / Honors)</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  color: '#334155',
                  fontWeight: 600
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.eligibility.requiredInternship}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eligibility: {
                        ...formData.eligibility,
                        requiredInternship: e.target.checked
                      }
                    })
                  }
                  style={{ width: '16px', height: '16px' }}
                />
                <span>Mandatory prior software internship experience</span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 6: SELECTION PROCESS */}
        {currentStep === 6 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Step 6: Selection Pipeline & Stages
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
                Configure the assessment rounds and interview evaluations for this drive.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {formData.selectionProcess.map((stg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#3978F6',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                        {stg.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                        {stg.evaluationType} • {stg.duration} • {stg.description}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeStage(idx)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#EF4444',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Stage Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              <input
                type="text"
                placeholder="Stage Name (e.g. System Design Round)"
                value={newStageName}
                onChange={(e) => setNewStageName(e.target.value)}
                style={{
                  flex: 2,
                  minWidth: '200px',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px'
                }}
              />
              <select
                value={newStageType}
                onChange={(e) => setNewStageType(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '150px',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="Assessment">Assessment</option>
                <option value="Technical Interview">Technical Interview</option>
                <option value="HR Interview">HR Interview</option>
                <option value="Group Discussion">Group Discussion</option>
                <option value="Presentation">Presentation</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Duration (e.g. 45 mins)"
                value={newStageDuration}
                onChange={(e) => setNewStageDuration(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '120px',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px'
                }}
              />
              <button
                type="button"
                onClick={addStage}
                style={{
                  padding: '9px 16px',
                  borderRadius: '6px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={15} />
                <span>Add Stage</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: SCHEDULE */}
        {currentStep === 7 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Step 7: Drive Schedule & Milestones
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
                Set key milestone dates. This structured timeline feeds into Layer 10 conflict-aware scheduling.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Application Window Start
                </label>
                <input
                  type="date"
                  value={formData.schedule.applicationStart}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, applicationStart: e.target.value }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Application Deadline *
                </label>
                <input
                  type="date"
                  value={formData.schedule.applicationDeadline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, applicationDeadline: e.target.value }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Online Assessment Date
                </label>
                <input
                  type="date"
                  value={formData.schedule.assessmentDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, assessmentDate: e.target.value }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Interviews Commencement
                </label>
                <input
                  type="date"
                  value={formData.schedule.interviewStart}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, interviewStart: e.target.value }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Drive Delivery Mode
                </label>
                <select
                  value={formData.schedule.driveMode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, driveMode: e.target.value }
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Online">Online / Remote</option>
                  <option value="Offline">Offline / On Campus</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Joining Expected Timeline
                </label>
                <input
                  type="text"
                  value={formData.schedule.joiningTimeline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, joiningTimeline: e.target.value }
                    })
                  }
                  placeholder="e.g. July 2027"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: REVIEW & PUBLISH */}
        {currentStep === 8 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} color="#10B981" />
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                  Step 8: Review & Publish Drive
                </h2>
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
                Please review the full placement drive configuration before activating campus applications.
              </p>
            </div>

            {/* Comprehensive Review Card */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '24px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              {/* Header block */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB',
                      textTransform: 'uppercase'
                    }}
                  >
                    TechNova Solutions Drive
                  </span>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '6px 0 2px' }}>
                    {formData.title}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>
                    {formData.department} • {formData.type} • {formData.location} ({formData.workMode})
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#10B981' }}>
                    {formData.salary}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {formData.openings} Openings
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E2E8F0' }} />

              {/* Requirements & Skills Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Required Skills ({formData.requiredSkills.length})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {formData.requiredSkills.map((sk) => (
                      <span
                        key={sk.name}
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#EFF6FF',
                          color: '#2563EB',
                          border: '1px solid #BFDBFE'
                        }}
                      >
                        {sk.name} ({sk.level})
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Bonus / Preferred Skills ({formData.preferredSkills.length})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {formData.preferredSkills.map((sk) => (
                      <span
                        key={sk}
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#FFFFFF',
                          color: '#475569',
                          border: '1px solid #CBD5E1'
                        }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Eligibility Preview */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Hard Eligibility Filter Rules
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#334155' }}>
                  <div>
                    <strong>CGPA:</strong> ≥ {formData.eligibility.minCGPA}
                  </div>
                  <div>•</div>
                  <div>
                    <strong>Backlogs:</strong> ≤ {formData.eligibility.maxBacklogs}
                  </div>
                  <div>•</div>
                  <div>
                    <strong>Batch:</strong> {formData.eligibility.graduationYear}
                  </div>
                  <div>•</div>
                  <div>
                    <strong>Depts:</strong> {formData.eligibility.departments.join(', ')}
                  </div>
                </div>
              </div>

              {/* Selection Process Stages */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Hiring Stages ({formData.selectionProcess.length} Rounds)
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {formData.selectionProcess.map((stg, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        fontSize: '12.5px',
                        color: '#1E293B',
                        fontWeight: 600
                      }}
                    >
                      {i + 1}. {stg.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid #E2E8F0',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#475569',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={16} />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {currentStep < 8 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(57, 120, 246, 0.3)'
                }}
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handlePublish('Draft')}
                  disabled={isSubmitting}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#475569',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Save as Draft
                </button>

                <button
                  type="button"
                  onClick={() => handlePublish('Active')}
                  disabled={isSubmitting}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 26px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>Publish Placement Drive</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
