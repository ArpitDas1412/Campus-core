import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Trophy,
  Award,
  Building,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { getScoreVisualMeta } from '../../utils/fitScoreUtils';

export default function FitScoreHero({ fitData }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const targetScore = fitData?.overallScore || 91;
  const tierMeta = fitData?.tierMeta || {};
  const visualMeta = getScoreVisualMeta(targetScore);
  const student = fitData?.student || {};
  const job = fitData?.job || {};

  // Animate score from 0 to targetScore on mount
  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = targetScore / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetScore) {
        setAnimatedScore(targetScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetScore]);

  // Circumference for SVG gauge
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        padding: '32px',
        boxShadow: '0 8px 30px rgba(16, 27, 54, 0.06)',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Accent Gradient Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: visualMeta.gradient
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}
      >
        {/* Left: Prominent Fit Score Meter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
          {/* Circular SVG Gauge */}
          <div style={{ position: 'relative', width: '150px', height: '150px', flexShrink: 0 }}>
            <svg width="150" height="150" viewBox="0 0 150 150" style={{ transform: 'rotate(-90deg)' }}>
              {/* Background circle track */}
              <circle
                cx="75"
                cy="75"
                r={radius}
                stroke="#F1F5F9"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Progress stroke */}
              <circle
                cx="75"
                cy="75"
                r={radius}
                stroke={visualMeta.color}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 0.8s ease-out'
                }}
              />
            </svg>

            {/* Inner Content */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <span
                style={{
                  fontSize: '38px',
                  fontWeight: 900,
                  color: visualMeta.color,
                  lineHeight: 1,
                  fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
                }}
              >
                {animatedScore}%
              </span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>
                FIT SCORE
              </span>
            </div>
          </div>

          {/* Fit Label & Target Role Details */}
          <div>
            <div
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#3978F6',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '4px'
              }}
            >
              CANDIDATE FIT
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <h2
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#101B36',
                  margin: 0
                }}
              >
                {tierMeta.label || visualMeta.tier}
              </h2>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '8px',
                  backgroundColor: visualMeta.bgColor,
                  color: visualMeta.color,
                  border: `1.5px solid ${visualMeta.borderColor}`
                }}
              >
                {targetScore >= 90 ? 'High Priority' : targetScore >= 80 ? 'Recommended' : 'Potential Match'}
              </span>
            </div>

            <div style={{ fontSize: '15px', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Briefcase size={16} color="#3978F6" />
              <span>{job.title || 'Software Engineer'}</span>
              <span style={{ color: '#94A3B8' }}>•</span>
              <Building size={16} color="#64748B" />
              <span style={{ color: '#475569' }}>{job.companyName || 'TechNova Solutions'}</span>
            </div>

            <p style={{ fontSize: '13px', color: '#64748B', margin: '6px 0 0', maxWidth: '380px', lineHeight: 1.4 }}>
              {tierMeta.description || 'Strong multi-dimensional alignment across core technical stack, academic performance, and practical capstone projects.'}
            </p>
          </div>
        </div>

        {/* Middle: Rank & Eligibility Comparison Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px' }}>
          {/* Candidate Rank */}
          {fitData?.rank && (
            <div
              style={{
                padding: '14px 18px',
                backgroundColor: '#F8FAFD',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    color: '#3978F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Trophy size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Candidate Rank
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#101B36' }}>
                    #{fitData.rank} of {fitData.totalCandidates || 126} eligible
                  </div>
                </div>
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: fitData.rank <= 3 ? '#FEF3C7' : '#EFF6FF',
                  color: fitData.rank <= 3 ? '#B45309' : '#2563EB',
                  border: fitData.rank <= 3 ? '1px solid #FDE68A' : '1px solid #BFDBFE'
                }}
              >
                {fitData.rank === 1 ? 'Top Candidate' : fitData.rank <= 3 ? 'Top 3 Match' : 'High Match'}
              </span>
            </div>
          )}

          {/* Hard Eligibility Card */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: fitData?.isEligible ? '#F0FDF4' : '#FEF2F2',
              borderRadius: '14px',
              border: fitData?.isEligible ? '1px solid #BBF7D0' : '1px solid #FECACA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: fitData?.isEligible ? '#DCFCE7' : '#FEE2E2',
                  color: fitData?.isEligible ? '#059669' : '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {fitData?.isEligible ? <CheckCircle2 size={18} /> : <ShieldCheck size={18} />}
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Hard Eligibility
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    color: fitData?.isEligible ? '#059669' : '#DC2626'
                  }}
                >
                  {fitData?.isEligible ? '✓ Eligible' : 'Ineligible'}
                </div>
              </div>
            </div>

            <span style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              {student.cgpa} CGPA • 0 Backlogs
            </span>
          </div>
        </div>

        {/* Right: Score Interpretation Scale */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Score Interpretation Scale
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
            {[
              { range: '90–100', label: 'Strong Match', color: '#059669', bg: '#ECFDF5', isCurrent: targetScore >= 90 },
              { range: '80–89', label: 'Good Match', color: '#2563EB', bg: '#EFF6FF', isCurrent: targetScore >= 80 && targetScore < 90 },
              { range: '70–79', label: 'Potential Match', color: '#0E8EA8', bg: '#EBF9FD', isCurrent: targetScore >= 70 && targetScore < 80 },
              { range: '60–69', label: 'Partial Match', color: '#D97706', bg: '#FFFBEB', isCurrent: targetScore >= 60 && targetScore < 70 },
              { range: 'Below 60', label: 'Low Match', color: '#64748B', bg: '#F1F5F9', isCurrent: targetScore < 60 }
            ].map((tierItem) => (
              <div
                key={tierItem.range}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  backgroundColor: tierItem.isCurrent ? tierItem.bg : 'transparent',
                  border: tierItem.isCurrent ? `1px solid ${tierItem.color}40` : '1px solid transparent',
                  fontWeight: tierItem.isCurrent ? 700 : 500,
                  color: tierItem.isCurrent ? tierItem.color : '#64748B'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: tierItem.color,
                      display: 'inline-block'
                    }}
                  />
                  <span>{tierItem.label}</span>
                </div>
                <span>{tierItem.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
