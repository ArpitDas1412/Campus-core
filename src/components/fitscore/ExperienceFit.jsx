import React from 'react';
import { Briefcase, CheckCircle2, Clock, Building, Layers } from 'lucide-react';

export default function ExperienceFit({ experienceData }) {
  if (!experienceData) return null;

  const {
    score = 80,
    title = 'Software Development Intern',
    duration = '6 months',
    technologies = ['Java', 'SQL', 'REST APIs'],
    relevanceLevel = 'High',
    summary,
    isFresher = false
  } = experienceData;

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
                color: '#F59E0B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              INDUSTRY EXPOSURE
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#FFFBEB',
                color: '#B45309'
              }}
            >
              Verified Experience
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Experience Fit ({score}%)
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Evaluates professional internships, capstone project velocity, and real-world deployment exposure.
          </p>
        </div>

        {/* Score Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            backgroundColor: '#F8FAFD',
            borderRadius: '14px',
            border: '1.5px solid #FDE68A'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#FEF3C7',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Briefcase size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#D97706', textTransform: 'uppercase', fontWeight: 700 }}>
              Experience Score
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#101B36' }}>
              {score}%
            </div>
          </div>
        </div>
      </div>

      {/* Experience Details Card */}
      {!isFresher ? (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#F8FAFD',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                {title}
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  border: '1px solid #A7F3D0'
                }}
              >
                {relevanceLevel} Relevance
              </span>
            </div>

            <div style={{ fontSize: '12.5px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={13} />
              <span>Duration: {duration}</span>
            </div>

            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Technologies:
              </span>
              {technologies.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#334155'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '12px 18px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              maxWidth: '360px',
              fontSize: '12.5px',
              color: '#334155',
              lineHeight: 1.4
            }}
          >
            {summary || 'Verifiable 6-month software development internship demonstrates production engineering familiarity.'}
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#F8FAFD',
            borderRadius: '16px',
            border: '1px solid #E2E8F0'
          }}
        >
          <div style={{ fontWeight: 700, color: '#101B36', marginBottom: '4px' }}>
            No formal corporate internship on record.
          </div>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            However, relevant project experience is present and evaluated favorably. CampusCore avoids excessive penalties for students graduating without formal corporate internships by recognizing complex capstone and open-source contributions.
          </p>
        </div>
      )}
    </div>
  );
}
