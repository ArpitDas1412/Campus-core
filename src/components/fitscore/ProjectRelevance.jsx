import React, { useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  X,
  Layers,
  Code2,
  GitBranch
} from 'lucide-react';

export default function ProjectRelevance({ projectData, job }) {
  const [selectedProject, setSelectedProject] = useState(null);

  if (!projectData) return null;

  const { score = 88, count = 0, projects = [], summary } = projectData;

  const getRelevanceBadge = (level) => {
    switch (level) {
      case 'High':
        return { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' };
      case 'Moderate':
        return { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' };
      default:
        return { bg: '#F8FAFC', color: '#64748B', border: '#E2E8F0' };
    }
  };

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
                color: '#0E8EA8',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              PORTFOLIO ARCHITECTURE
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EBF9FD',
                color: '#0E8EA8'
              }}
            >
              Verified Repositories
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Project Relevance ({score}%)
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Capstone projects evaluated for architectural overlap with job technical requirements. Click any project to inspect evidence.
          </p>
        </div>

        {/* Project Score Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            backgroundColor: '#F8FAFD',
            borderRadius: '14px',
            border: '1.5px solid #BAE6FD'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#EBF9FD',
              color: '#0E8EA8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FolderGit2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#0E8EA8', textTransform: 'uppercase', fontWeight: 700 }}>
              Relevance Score
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#101B36' }}>
              {score}%
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {projects.map((project) => {
          const badge = getRelevanceBadge(project.relevanceLevel);
          const isSelected = selectedProject?.name === project.name;

          return (
            <div
              key={project.name}
              onClick={() => setSelectedProject(project)}
              style={{
                padding: '20px',
                borderRadius: '16px',
                backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFD',
                border: isSelected ? '1.5px solid #3978F6' : '1px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseOver={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#0E8EA8';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }
              }}
              onMouseOut={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.backgroundColor = '#F8FAFD';
                }
              }}
            >
              <div>
                {/* Project Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                      {project.name}
                    </h3>
                    <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                      {project.impact || 'Verified Capstone Project'}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: badge.bg,
                      color: badge.color,
                      border: `1px solid ${badge.border}`
                    }}
                  >
                    {project.relevanceLevel} Relevance
                  </span>
                </div>

                <p style={{ fontSize: '12.5px', color: '#475569', margin: '0 0 12px', lineHeight: 1.4 }}>
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    Technologies:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(project.technologies || []).map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#FFFFFF',
                          color: '#101B36',
                          border: '1px solid #CBD5E1'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Matched Concepts */}
                {project.matchedConcepts && project.matchedConcepts.length > 0 && (
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                      Matched Concepts:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {project.matchedConcepts.map((c) => (
                        <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#065F46' }}>
                          <CheckCircle2 size={13} color="#059669" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid #E2E8F0',
                  marginTop: '10px'
                }}
              >
                <span style={{ fontSize: '11.5px', color: '#3978F6', fontWeight: 700 }}>
                  View Evidence Overlay →
                </span>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: '11.5px',
                      color: '#64748B',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Repo</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Project Evidence Modal / Card */}
      {selectedProject && (
        <div
          style={{
            padding: '22px 26px',
            backgroundColor: '#F0F9FF',
            borderRadius: '16px',
            border: '1.5px solid #BAE6FD',
            position: 'relative'
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#0284C7',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Sparkles size={16} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0369A1', margin: 0 }}>
                PROJECT EVIDENCE: {selectedProject.name}
              </h4>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                border: '1px solid #BAE6FD',
                backgroundColor: '#FFFFFF',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={14} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              fontSize: '13px'
            }}
          >
            <div>
              <div style={{ color: '#0369A1', fontWeight: 700 }}>Job requires:</div>
              <div style={{ color: '#1E293B', marginTop: '4px' }}>
                {(job?.requiredSkills || ['Java', 'SQL', 'REST APIs']).map((r) => r.name || r).join(', ')}
              </div>
            </div>

            <div>
              <div style={{ color: '#0369A1', fontWeight: 700 }}>Project contains:</div>
              <div style={{ color: '#1E293B', marginTop: '4px' }}>
                {(selectedProject.technologies || []).join(', ')}
              </div>
            </div>

            <div>
              <div style={{ color: '#0369A1', fontWeight: 700 }}>Relevant overlap:</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#0284C7', marginTop: '2px' }}>
                {selectedProject.overlapCount} technologies matched
              </div>
            </div>
          </div>

          <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #BAE6FD', fontSize: '12px', color: '#0369A1' }}>
            <strong>Evidence source:</strong> {selectedProject.evidenceSource}
          </div>
        </div>
      )}
    </div>
  );
}
