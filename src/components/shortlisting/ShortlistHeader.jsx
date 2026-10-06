import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Download,
  Building2,
  Briefcase,
  MapPin,
  IndianRupee,
  Layers,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  RotateCcw
} from 'lucide-react';

export default function ShortlistHeader({
  job,
  onRunShortlist,
  onExport,
  isProcessing = false,
  isOfficer = false
}) {
  const navigate = useNavigate();
  const [isExportOpen, setIsExportOpen] = useState(false);

  const backUrl = isOfficer
    ? `/officer/ai-matching`
    : `/recruiter/jobs/${job?.id || 'JOB-2027-001'}/matching`;

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Top Breadcrumb & Navigation */}
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
        <button
          onClick={() => navigate(backUrl)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#3978F6',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to AI Candidate Matching</span>
        </button>

        {/* Layer Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#2563EB',
              fontSize: '11.5px',
              fontWeight: 800,
              letterSpacing: '0.04em'
            }}
          >
            <Layers size={13} />
            LAYER 9 • SMART SHORTLISTING
          </span>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: '#F5F3FF',
              border: '1px solid #DDD6FE',
              color: '#7C3AED',
              fontSize: '11.5px',
              fontWeight: 700
            }}
          >
            HUMAN-IN-THE-LOOP
          </span>
        </div>
      </div>

      {/* Main Title & Action Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '24px 28px',
          boxShadow: '0 2px 8px rgba(16, 27, 54, 0.04)'
        }}
      >
        {/* Title and Drive Info */}
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 900,
                color: '#101B36',
                margin: 0,
                letterSpacing: '-0.03em'
              }}
            >
              Smart Shortlisting
            </h1>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              Active Drive
            </span>
          </div>

          <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 16px', lineHeight: 1.5 }}>
            Review AI-recommended candidates, understand every recommendation, and build your
            shortlist with confidence.
          </p>

          {/* Placement Drive Pill */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              fontSize: '13px',
              color: '#334155'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: '#101B36' }}>
              <Briefcase size={15} style={{ color: '#3978F6' }} />
              <span>{job?.title || 'Software Engineer'}</span>
            </div>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Building2 size={14} style={{ color: '#64748B' }} />
              <span>{job?.companyName || 'TechNova Solutions'}</span>
            </div>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: 700, color: '#2563EB' }}>{job?.openings || 25} Openings</span>
            </div>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748B' }}>
              <MapPin size={14} />
              <span>{job?.location || 'Bangalore'} ({job?.workMode || 'Hybrid'})</span>
            </div>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 700 }}>
              <IndianRupee size={14} />
              <span>{job?.salary || '₹8–10 LPA'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Export Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 18px',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#334155',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Download size={16} />
              <span>Export Report</span>
              <ChevronDown size={14} />
            </button>

            {isExportOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  padding: '6px',
                  width: '180px',
                  zIndex: 20
                }}
              >
                <button
                  onClick={() => {
                    onExport('csv');
                    setIsExportOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#1E293B',
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <FileSpreadsheet size={15} color="#059669" />
                  <span>Export as CSV</span>
                </button>
                <button
                  onClick={() => {
                    onExport('text');
                    setIsExportOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#1E293B',
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <FileText size={15} color="#2563EB" />
                  <span>Export as Text</span>
                </button>
              </div>
            )}
          </div>

          {/* Run Shortlist CTA */}
          <button
            onClick={onRunShortlist}
            disabled={isProcessing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 22px',
              borderRadius: '10px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: 800,
              cursor: isProcessing ? 'wait' : 'pointer',
              boxShadow: '0 4px 14px rgba(57, 120, 246, 0.35)',
              transition: 'all 0.15s ease',
              opacity: isProcessing ? 0.75 : 1
            }}
          >
            {isProcessing ? (
              <>
                <RotateCcw size={16} className="animate-spin" />
                <span>Processing AI Shortlist...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Run Smart Shortlist</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
