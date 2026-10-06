import React, { useState } from 'react';
import {
  Sliders,
  CheckCircle2,
  ShieldCheck,
  Briefcase,
  Layers,
  HelpCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { RATIO_OPTIONS } from '../../data/shortlistingConfig.js';

export default function ShortlistCriteria({
  config,
  onChangeConfig,
  onApplyCriteria,
  job,
  isProcessing = false
}) {
  const [localConfig, setLocalConfig] = useState(config);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleRatioChange = (val) => {
    let ratioVal = val;
    let customOpenings = localConfig.openings;
    if (val !== 'custom') {
      ratioVal = Number(val);
    }
    const updated = {
      ...localConfig,
      candidateToOpeningRatio: ratioVal
    };
    setLocalConfig(updated);
    onChangeConfig(updated);
  };

  const handleSliderChange = (key, value) => {
    const updated = {
      ...localConfig,
      [key]: Number(value)
    };
    setLocalConfig(updated);
    onChangeConfig(updated);
  };

  const handleToggle = (key) => {
    const updated = {
      ...localConfig,
      [key]: !localConfig[key]
    };
    setLocalConfig(updated);
    onChangeConfig(updated);
  };

  const targetSize =
    typeof localConfig.candidateToOpeningRatio === 'number'
      ? localConfig.openings * localConfig.candidateToOpeningRatio
      : localConfig.customTarget || 125;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(16, 27, 54, 0.04)'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563EB'
            }}
          >
            <Sliders size={18} />
          </div>
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#101B36',
                margin: 0,
                letterSpacing: '-0.02em'
              }}
            >
              Shortlist Strategy & AI Criteria
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Configure target cohort ratio and recommendation thresholds for {job?.title || 'this drive'}.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              fontSize: '12px',
              color: '#475569',
              fontWeight: 600
            }}
          >
            Recommended Cohort: <strong style={{ color: '#2563EB' }}>{targetSize} Candidates</strong>
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'none',
              border: 'none',
              color: '#3978F6',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {isExpanded ? 'Collapse' : 'Configure Criteria'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Section 1: Shortlist Target Strategy */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              padding: '18px',
              border: '1px solid #E2E8F0'
            }}
          >
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 800,
                color: '#101B36',
                margin: '0 0 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Briefcase size={15} style={{ color: '#3978F6' }} />
              <span>Target Sizing Strategy</span>
            </h3>

            {/* Openings Count */}
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12.5px',
                  color: '#475569',
                  marginBottom: '6px',
                  fontWeight: 600
                }}
              >
                <span>Number of Openings:</span>
                <strong style={{ color: '#101B36' }}>{localConfig.openings} positions</strong>
              </div>
              <input
                type="number"
                min="1"
                max="500"
                value={localConfig.openings}
                onChange={(e) => {
                  const val = Math.max(1, parseInt(e.target.value || 1, 10));
                  const updated = { ...localConfig, openings: val };
                  setLocalConfig(updated);
                  onChangeConfig(updated);
                }}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Candidate to Opening Ratio */}
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12.5px',
                  color: '#475569',
                  marginBottom: '6px',
                  fontWeight: 600
                }}
              >
                <span>Candidate-to-Opening Ratio:</span>
                <strong style={{ color: '#2563EB' }}>
                  {typeof localConfig.candidateToOpeningRatio === 'number'
                    ? `${localConfig.candidateToOpeningRatio}× Ratio`
                    : 'Custom'}
                </strong>
              </div>
              <select
                value={localConfig.candidateToOpeningRatio}
                onChange={(e) => handleRatioChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF',
                  color: '#101B36',
                  cursor: 'pointer'
                }}
              >
                {RATIO_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Calculation Result Callout */}
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #DBEAFE',
                fontSize: '12px',
                color: '#1E40AF',
                lineHeight: 1.4
              }}
            >
              Formula:{' '}
              <strong>
                {localConfig.openings} openings × {localConfig.candidateToOpeningRatio} = {targetSize} target candidates
              </strong>
              . This pipeline ensures adequate talent coverage for multi-round interviews.
            </div>
          </div>

          {/* Section 2: AI Shortlisting Criteria Sliders */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              padding: '18px',
              border: '1px solid #E2E8F0'
            }}
          >
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 800,
                color: '#101B36',
                margin: '0 0 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={15} style={{ color: '#7C3AED' }} />
              <span>Recommendation Thresholds</span>
            </h3>

            {/* Required Skill Coverage Slider */}
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12.5px',
                  color: '#334155',
                  marginBottom: '6px',
                  fontWeight: 600
                }}
              >
                <span>Minimum Required Skill Coverage:</span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    fontSize: '12px',
                    fontWeight: 800
                  }}
                >
                  {localConfig.minimumRequiredSkillCoverage}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="5"
                value={localConfig.minimumRequiredSkillCoverage}
                onChange={(e) => handleSliderChange('minimumRequiredSkillCoverage', e.target.value)}
                style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '10.5px',
                  color: '#94A3B8',
                  marginTop: '2px'
                }}
              >
                <span>50% (Permissive)</span>
                <span>70% (Default)</span>
                <span>100% (Strict)</span>
              </div>
            </div>

            {/* Minimum Fit Score Slider */}
            <div style={{ marginBottom: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12.5px',
                  color: '#334155',
                  marginBottom: '6px',
                  fontWeight: 600
                }}
              >
                <span>Minimum Recommended Fit Score:</span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    fontSize: '12px',
                    fontWeight: 800
                  }}
                >
                  {localConfig.minimumFitScore}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="1"
                value={localConfig.minimumFitScore}
                onChange={(e) => handleSliderChange('minimumFitScore', e.target.value)}
                style={{ width: '100%', accentColor: '#3978F6', cursor: 'pointer' }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '10.5px',
                  color: '#94A3B8',
                  marginTop: '2px'
                }}
              >
                <span>50% (Broad)</span>
                <span>75% (Target)</span>
                <span>90%+ (Top Tier)</span>
              </div>
            </div>
          </div>

          {/* Section 3: Factor Inclusion Toggles & Eligibility Gates */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              padding: '18px',
              border: '1px solid #E2E8F0'
            }}
          >
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 800,
                color: '#101B36',
                margin: '0 0 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShieldCheck size={15} style={{ color: '#059669' }} />
              <span>Evidence Factor Signals</span>
            </h3>

            {/* Hard Academic Eligibility Gate */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                marginBottom: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#101B36', fontWeight: 600 }}>
                <CheckCircle2 size={15} style={{ color: '#059669' }} />
                <span>Hard Eligibility Gating</span>
              </div>
              <span style={{ fontSize: '11px', color: '#059669', fontWeight: 800 }}>MANDATORY</span>
            </div>

            {/* Factor Toggles */}
            {[
              { key: 'considerProjectRelevance', label: 'Consider Project Relevance' },
              { key: 'considerResumeRelevance', label: 'Consider Resume Relevance' },
              { key: 'considerExperience', label: 'Consider Internship/Experience' },
              { key: 'considerCertifications', label: 'Consider Certifications' }
            ].map((toggle) => (
              <label
                key={toggle.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  color: '#334155',
                  fontWeight: 500
                }}
              >
                <span>{toggle.label}</span>
                <input
                  type="checkbox"
                  checked={localConfig[toggle.key]}
                  onChange={() => handleToggle(toggle.key)}
                  style={{ cursor: 'pointer', accentColor: '#3978F6' }}
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info Notice */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingTop: '14px',
          borderTop: '1px solid #F1F5F9',
          fontSize: '12px',
          color: '#64748B'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <HelpCircle size={14} style={{ color: '#94A3B8' }} />
          <span>
            These settings influence AI recommendation categorization. They do not automatically determine hiring decisions.
          </span>
        </div>

        <button
          onClick={() => onApplyCriteria(localConfig)}
          disabled={isProcessing}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: isProcessing ? 'wait' : 'pointer'
          }}
        >
          <RotateCcw size={13} />
          <span>Apply Criteria & Recalculate</span>
        </button>
      </div>
    </div>
  );
}
