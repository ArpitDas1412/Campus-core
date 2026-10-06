import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  TrendingUp,
  Plus,
  Trash2,
  RefreshCw,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { simulateImprovement } from '../../services/fitExplanationEngine';
import { getScoreVisualMeta, formatContribution } from '../../utils/fitScoreUtils';

export default function WhatIfSimulator({ student, job, currentScore = 91 }) {
  // Preset list of high-value skills to simulate
  const availablePresetSkills = [
    { name: 'AWS', level: 'Intermediate', label: 'AWS Cloud Architecture' },
    { name: 'Docker', level: 'Intermediate', label: 'Docker Containerization' },
    { name: 'Kubernetes', level: 'Beginner', label: 'Kubernetes Orchestration' },
    { name: 'Spring Boot', level: 'Intermediate', label: 'Spring Boot Microservices' },
    { name: 'Redis', level: 'Intermediate', label: 'Redis Distributed Caching' },
    { name: 'System Design', level: 'Intermediate', label: 'Scalable System Architecture' }
  ];

  // Active simulated skills selection
  const [selectedSkills, setSelectedSkills] = useState([
    { name: 'AWS', level: 'Intermediate' },
    { name: 'Docker', level: 'Beginner' }
  ]);

  const [customSkillName, setCustomSkillName] = useState('');
  const [customSkillLevel, setCustomSkillLevel] = useState('Intermediate');

  // Dynamically simulate improvement using cloned candidate & Layer 7 matching logic
  const simulationResult = useMemo(() => {
    if (!student || !job) return null;
    return simulateImprovement(student, job, selectedSkills);
  }, [student, job, selectedSkills]);

  const projectedScore = simulationResult?.projectedScore || currentScore;
  const delta = simulationResult?.delta || '+0';
  const deltaNum = simulationResult?.deltaNum || 0;
  const currentVisual = getScoreVisualMeta(currentScore);
  const projectedVisual = getScoreVisualMeta(projectedScore);

  const handleToggleSkill = (skill) => {
    setSelectedSkills((prev) => {
      const exists = prev.some((s) => s.name.toLowerCase() === skill.name.toLowerCase());
      if (exists) {
        return prev.filter((s) => s.name.toLowerCase() !== skill.name.toLowerCase());
      } else {
        return [...prev, skill];
      }
    });
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customSkillName.trim()) return;
    const newSkill = { name: customSkillName.trim(), level: customSkillLevel };
    if (!selectedSkills.some((s) => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
      setSelectedSkills((prev) => [...prev, newSkill]);
    }
    setCustomSkillName('');
  };

  const handleReset = () => {
    setSelectedSkills([]);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        padding: '28px 32px',
        boxShadow: '0 8px 30px rgba(16, 27, 54, 0.06)',
        marginBottom: '28px',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 100%)'
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
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#3978F6',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              WHAT-IF INTELLIGENCE SIMULATOR
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB'
              }}
            >
              Interactive Feature
            </span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Improve Candidate Fit (Simulation)
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Simulate the impact of candidate upskilling on their job fit score. Re-runs Layer 7 matching on cloned student data.
          </p>
        </div>

        {/* Reset Action */}
        {selectedSkills.length > 0 && (
          <button
            onClick={handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              backgroundColor: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#475569',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={13} />
            <span>Clear Simulation</span>
          </button>
        )}
      </div>

      {/* Main Simulation Arena: Before vs After + Controls */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center',
          marginBottom: '24px'
        }}
      >
        {/* Left: Score Comparison Card */}
        <div
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1.5px solid #DBEAFE',
            boxShadow: '0 4px 16px rgba(57, 120, 246, 0.08)'
          }}
        >
          <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '14px' }}>
            Projected Fit Score Shift
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '16px' }}>
            {/* Current Score */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                Current Fit
              </div>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  color: currentVisual.color,
                  lineHeight: 1.1,
                  margin: '4px 0'
                }}
              >
                {currentScore}%
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: currentVisual.bgColor,
                  color: currentVisual.color
                }}
              >
                {currentVisual.tier}
              </span>
            </div>

            {/* Shift Arrow & Delta */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 900,
                  color: deltaNum > 0 ? '#059669' : '#64748B',
                  backgroundColor: deltaNum > 0 ? '#DCFCE7' : '#F1F5F9',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border: deltaNum > 0 ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
                  marginBottom: '4px'
                }}
              >
                {deltaNum > 0 ? `+${deltaNum} pts` : 'No change'}
              </span>
              <ArrowRight size={22} color={deltaNum > 0 ? '#059669' : '#94A3B8'} />
            </div>

            {/* Projected Score */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#3978F6', fontWeight: 800, textTransform: 'uppercase' }}>
                Projected Fit
              </div>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  color: projectedVisual.color,
                  lineHeight: 1.1,
                  margin: '4px 0'
                }}
              >
                {projectedScore}%
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: projectedVisual.bgColor,
                  color: projectedVisual.color
                }}
              >
                {projectedVisual.tier}
              </span>
            </div>
          </div>

          {/* Potential Improvement Callout */}
          <div
            style={{
              marginTop: '18px',
              padding: '10px 14px',
              backgroundColor: '#F0FDF4',
              borderRadius: '10px',
              border: '1px solid #BBF7D0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12.5px',
              color: '#14532D'
            }}
          >
            <TrendingUp size={16} color="#059669" />
            <span>
              {deltaNum > 0
                ? `Acquiring ${selectedSkills.map((s) => s.name).join(' & ')} yields a +${deltaNum}% boost to candidate fit.`
                : 'Select one or more technologies below to simulate impact on candidate ranking.'}
            </span>
          </div>
        </div>

        {/* Right: Skill Selectors */}
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#101B36', marginBottom: '8px' }}>
            Toggle Target Upskilling Competencies:
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {availablePresetSkills.map((preset) => {
              const isSelected = selectedSkills.some((s) => s.name.toLowerCase() === preset.name.toLowerCase());

              return (
                <button
                  key={preset.name}
                  onClick={() => handleToggleSkill(preset)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    backgroundColor: isSelected ? '#3978F6' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#334155',
                    border: isSelected ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: isSelected ? '0 2px 8px rgba(57, 120, 246, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{isSelected ? '✓' : '+'}</span>
                  <span>{preset.name}</span>
                  <span style={{ fontSize: '10.5px', opacity: 0.85 }}>({preset.level})</span>
                </button>
              );
            })}
          </div>

          {/* Custom Skill Input */}
          <form onSubmit={handleAddCustom} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Add custom skill (e.g. GraphQL, Next.js)"
              value={customSkillName}
              onChange={(e) => setCustomSkillName(e.target.value)}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12.5px'
              }}
            />
            <select
              value={customSkillLevel}
              onChange={(e) => setCustomSkillLevel(e.target.value)}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              type="submit"
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#101B36',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </form>
        </div>
      </div>

      {/* Factor Breakdown Comparison Table */}
      {selectedSkills.length > 0 && simulationResult?.projectedBreakdown && (
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid #E2E8F0',
            marginBottom: '16px'
          }}
          className="animate-fade-in"
        >
          <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#101B36', marginBottom: '10px' }}>
            Factor-by-Factor Simulated Shift:
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              fontSize: '12px'
            }}
          >
            {Object.keys(simulationResult.currentBreakdown.factors).map((k) => {
              const currentF = simulationResult.currentBreakdown.factors[k];
              const projF = simulationResult.projectedBreakdown.factors[k];
              const fDelta = projF.score - currentF.score;

              return (
                <div
                  key={k}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: fDelta > 0 ? '#F0FDF4' : '#F8FAFC',
                    border: fDelta > 0 ? '1px solid #BBF7D0' : '1px solid #E2E8F0'
                  }}
                >
                  <div style={{ color: '#64748B', fontSize: '11px' }}>{currentF.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontWeight: 800, color: '#101B36' }}>{projF.score}%</span>
                    {fDelta > 0 && (
                      <span style={{ color: '#059669', fontWeight: 800, fontSize: '11px' }}>
                        +{fDelta}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mandatory Illustrative Disclaimer Notice */}
      <div
        style={{
          padding: '10px 14px',
          backgroundColor: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          fontSize: '11.5px',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Info size={14} color="#64748B" />
        <span>
          <strong>Disclaimer:</strong> {simulationResult?.disclaimer || 'Illustrative projection based on demo scoring rules. It is NOT a prediction of actual hiring probability.'}
        </span>
      </div>
    </div>
  );
}
