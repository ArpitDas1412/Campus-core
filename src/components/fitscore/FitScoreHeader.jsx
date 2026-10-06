import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  User,
  FileText,
  Target,
  BookmarkCheck,
  MessageSquare,
  Download,
  Share2,
  Building,
  GraduationCap
} from 'lucide-react';
import { exportFitReport } from '../../utils/fitScoreUtils';

export default function FitScoreHeader({
  fitData,
  isShortlisted,
  onShortlist,
  onMessage,
  role = 'recruiter',
  backUrl
}) {
  const navigate = useNavigate();
  const student = fitData?.student || {};
  const job = fitData?.job || {};

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else if (role === 'officer') {
      navigate('/officer/ai-matching');
    } else {
      navigate(`/recruiter/jobs/${job.id || 'JOB-2027-001'}/matching`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        padding: '24px 28px',
        boxShadow: '0 4px 20px rgba(16, 27, 54, 0.05)',
        marginBottom: '24px'
      }}
    >
      {/* Top Bar Navigation & Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid #F1F5F9'
        }}
      >
        {/* Back Button */}
        <button
          onClick={handleBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '10px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #CBD5E1',
            color: '#101B36',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#EFF6FF')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
        >
          <ArrowLeft size={16} />
          <span>Back to Matching</span>
        </button>

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {/* View Candidate Profile (Layer 3) */}
          <button
            onClick={() => navigate(role === 'officer' ? `/officer/students/${student.id || student.legacyId}` : `/recruiter/candidates/${student.id || student.legacyId}`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Open Student 360° Profile (Layer 3)"
          >
            <User size={14} color="#3978F6" />
            <span>Candidate Profile</span>
          </button>

          {/* View Resume (Layer 5) */}
          <button
            onClick={() => navigate(role === 'officer' ? `/officer/students/${student.id || student.legacyId}/resume` : `/student/resume`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Open Resume Intelligence (Layer 5)"
          >
            <FileText size={14} color="#8B5CF6" />
            <span>View Resume</span>
          </button>

          {/* View Skill Gap (Layer 4) */}
          <button
            onClick={() => navigate(role === 'officer' ? `/officer/students/${student.id || student.legacyId}/skill-gap` : `/student/skill-gap`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Open Skill Gap Analysis (Layer 4)"
          >
            <Target size={14} color="#0E8EA8" />
            <span>Skill Gap</span>
          </button>

          {/* Message Candidate */}
          {onMessage && (
            <button
              onClick={onMessage}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#334155',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={14} color="#2563EB" />
              <span>Message</span>
            </button>
          )}

          {/* Shortlist Action */}
          <button
            onClick={onShortlist}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '10px',
              backgroundColor: isShortlisted ? '#ECFDF5' : '#3978F6',
              border: isShortlisted ? '1px solid #A7F3D0' : 'none',
              color: isShortlisted ? '#059669' : '#FFFFFF',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: isShortlisted ? 'none' : '0 2px 8px rgba(57, 120, 246, 0.35)',
              transition: 'all 0.15s ease'
            }}
          >
            <BookmarkCheck size={15} />
            <span>{isShortlisted ? 'Shortlisted ✓' : 'Shortlist Candidate'}</span>
          </button>

          {/* Export Report */}
          <button
            onClick={() => exportFitReport(fitData)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '10px',
              backgroundColor: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#475569',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Download Fit Analysis Summary"
          >
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Main Title & Entity Details Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '20px'
        }}
      >
        {/* Left: Section Title & Subtitle */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
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
              LAYER 8 — EXPLAINABLE AI
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748B'
              }}
            >
              Decision-Support Intelligence
            </span>
          </div>

          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#101B36',
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            Explainable AI Fit Score
          </h1>
          <p
            style={{
              fontSize: '14.5px',
              color: '#64748B',
              margin: 0,
              maxWidth: '680px',
              lineHeight: 1.5
            }}
          >
            Understand exactly how this candidate aligns with the selected placement opportunity through transparent, evidence-backed factor attribution.
          </p>
        </div>

        {/* Right: Job & Candidate Context Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: '#F8FAFD',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '12px 18px',
            flexWrap: 'wrap'
          }}
        >
          {/* Candidate Card Snippet */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: student.avatarBg || '#101B36',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '15px'
              }}
            >
              {student.avatar || student.name?.slice(0, 2).toUpperCase() || 'ST'}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
                {student.name || 'Candidate'}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                {student.degree || 'B.Tech'} {student.deptCode || student.department || 'CSE'} • CGPA {student.cgpa}
              </div>
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', backgroundColor: '#CBD5E1' }} />

          {/* Job Card Snippet */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#101B36' }}>
                {job.title || 'Software Engineer'}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              {job.companyName || 'TechNova Solutions'} • Batch {job.eligibility?.graduationYear || 2027}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
