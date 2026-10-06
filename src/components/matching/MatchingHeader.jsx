import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  RotateCw,
  Download,
  Building,
  MapPin,
  Briefcase,
  IndianRupee,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function MatchingHeader({
  job,
  isProcessing,
  onRerunMatching,
  onExport,
  isOfficer = false
}) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        padding: '24px 28px',
        boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.05)',
        marginBottom: '24px'
      }}
    >
      {/* Top Breadcrumb & Status */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B' }}>
          <button
            onClick={() => navigate(isOfficer ? '/officer/dashboard' : `/recruiter/jobs/${job?.id || 'JOB-2027-001'}`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={14} />
            <span>{isOfficer ? 'Back to Officer Console' : '← Back to Job'}</span>
          </button>
          <span>/</span>
          <span>{job?.companyName || 'TechNova Solutions'}</span>
          <span>/</span>
          <span style={{ color: '#101B36', fontWeight: 600 }}>AI Candidate Matching</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '999px',
              backgroundColor: '#ECFDF5',
              color: '#059669',
              fontSize: '12px',
              fontWeight: 700,
              border: '1px solid #A7F3D0'
            }}
          >
            ● Active Placement Drive
          </span>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 8px',
              borderRadius: '6px',
              backgroundColor: '#EEF2FF',
              color: '#4F46E5',
              border: '1px solid #C7D2FE',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Sparkles size={11} />
            Layer 7 Matching Engine
          </span>
        </div>
      </div>

      {/* Main Row: Job Title & Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#101B36',
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-heading)'
            }}
          >
            AI Candidate Matching
          </h1>
          <p style={{ fontSize: '14.5px', color: '#64748B', margin: '0 0 12px', maxWidth: '680px' }}>
            Discover the candidates whose verified skills, academic baseline, projects, and resume signals best align with this placement opportunity.
          </p>

          {/* Job Badges Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13px',
              color: '#475569'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700, color: '#101B36' }}>
              <Briefcase size={15} style={{ color: '#3978F6' }} />
              <span>{job?.title || 'Software Engineer'}</span>
            </div>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Building size={14} style={{ color: '#8B5CF6' }} />
              <span>{job?.companyName || 'TechNova Solutions'}</span>
            </div>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={14} style={{ color: '#0E8EA8' }} />
              <span>{job?.location || 'Bangalore'} ({job?.workMode || 'Hybrid'})</span>
            </div>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontWeight: 700 }}>
              <IndianRupee size={14} />
              <span>{job?.salary || '₹8–10 LPA'}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onRerunMatching}
            disabled={isProcessing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 20px',
              borderRadius: '10px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(57, 120, 246, 0.35)',
              opacity: isProcessing ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <RotateCw size={15} className={isProcessing ? 'animate-spin' : ''} />
            <span>{isProcessing ? 'Analyzing Pool...' : 'Run AI Matching'}</span>
          </button>

          <button
            onClick={onExport}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              border: '1.5px solid #CBD5E1',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Download size={14} />
            <span>Export Results</span>
          </button>
        </div>
      </div>
    </div>
  );
}
