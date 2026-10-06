import React from 'react';
import { GraduationCap, CheckCircle2, XCircle, TrendingUp, Award } from 'lucide-react';

export default function AcademicFit({ academicData }) {
  if (!academicData) return null;

  const {
    candidateCGPA = 8.7,
    requiredCGPA = 7.5,
    cgpaDifference = '+1.2',
    isCgpaSufficient = true,
    department = {},
    graduationYear = {},
    backlogs = {},
    degree = {},
    score = 100,
    isEligible = true,
    summary = 'Candidate satisfies all configured academic eligibility criteria.'
  } = academicData;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        padding: '28px 32px',
        boxShadow: '0 4px 20px rgba(16, 27, 54, 0.05)',
        marginBottom: '28px'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid #F1F5F9'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#10B981',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              ELIGIBILITY COMPLIANCE
            </span>
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
              100% Academic Baseline
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Academic Eligibility
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Verifies institutional thresholds for CGPA, graduation batch, discipline, and active academic standing.
          </p>
        </div>

        {/* Academic Fit Score Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            backgroundColor: '#F0FDF4',
            borderRadius: '14px',
            border: '1.5px solid #BBF7D0'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#DCFCE7',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <GraduationCap size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#059669', textTransform: 'uppercase', fontWeight: 700 }}>
              Academic Fit
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#101B36' }}>
              {score}%
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Metrics Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        {/* Candidate CGPA */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#F8FAFD',
            borderRadius: '14px',
            border: '1px solid #E2E8F0'
          }}
        >
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Candidate CGPA</div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#101B36', margin: '4px 0 2px' }}>
            {candidateCGPA}
          </div>
          <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>
            Verifiable Institutional Record
          </div>
        </div>

        {/* Required CGPA */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#F8FAFD',
            borderRadius: '14px',
            border: '1px solid #E2E8F0'
          }}
        >
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Required CGPA</div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#475569', margin: '4px 0 2px' }}>
            {requiredCGPA}
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>
            Minimum cutoff baseline
          </div>
        </div>

        {/* Difference */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: isCgpaSufficient ? '#ECFDF5' : '#FEF2F2',
            borderRadius: '14px',
            border: isCgpaSufficient ? '1px solid #A7F3D0' : '1px solid #FECACA'
          }}
        >
          <div style={{ fontSize: '12px', color: isCgpaSufficient ? '#065F46' : '#991B1B', fontWeight: 600 }}>
            CGPA Difference
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 900,
              color: isCgpaSufficient ? '#059669' : '#DC2626',
              margin: '4px 0 2px'
            }}
          >
            {cgpaDifference}
          </div>
          <div style={{ fontSize: '11.5px', color: isCgpaSufficient ? '#059669' : '#DC2626', fontWeight: 700 }}>
            {isCgpaSufficient ? 'Comfortably above cutoff' : 'Below cutoff'}
          </div>
        </div>
      </div>

      {/* Institutional Criteria Checklist */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '16px'
        }}
      >
        {/* Department */}
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: department.isMatch ? '#F0FDF4' : '#FEF2F2',
            borderRadius: '10px',
            border: department.isMatch ? '1px solid #DCFCE7' : '1px solid #FEE2E2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Department</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>{department.candidate}</div>
          </div>
          {department.isMatch ? <CheckCircle2 size={18} color="#059669" /> : <XCircle size={18} color="#DC2626" />}
        </div>

        {/* Graduation Year */}
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: graduationYear.isMatch ? '#F0FDF4' : '#FEF2F2',
            borderRadius: '10px',
            border: graduationYear.isMatch ? '1px solid #DCFCE7' : '1px solid #FEE2E2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Graduation Year</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>{graduationYear.candidate}</div>
          </div>
          {graduationYear.isMatch ? <CheckCircle2 size={18} color="#059669" /> : <XCircle size={18} color="#DC2626" />}
        </div>

        {/* Backlogs */}
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: backlogs.isMatch ? '#F0FDF4' : '#FEF2F2',
            borderRadius: '10px',
            border: backlogs.isMatch ? '1px solid #DCFCE7' : '1px solid #FEE2E2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Active Backlogs</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>{backlogs.candidate} Backlogs</div>
          </div>
          {backlogs.isMatch ? <CheckCircle2 size={18} color="#059669" /> : <XCircle size={18} color="#DC2626" />}
        </div>

        {/* Degree */}
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: degree.isMatch ? '#F0FDF4' : '#FEF2F2',
            borderRadius: '10px',
            border: degree.isMatch ? '1px solid #DCFCE7' : '1px solid #FEE2E2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Degree</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>{degree.candidate}</div>
          </div>
          {degree.isMatch ? <CheckCircle2 size={18} color="#059669" /> : <XCircle size={18} color="#DC2626" />}
        </div>
      </div>

      {/* Dynamic Summary */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          fontSize: '13px',
          color: '#334155',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <CheckCircle2 size={16} color="#059669" />
        <span>{summary}</span>
      </div>
    </div>
  );
}
