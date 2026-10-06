import React from 'react';
import { Award, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function CertificationFit({ certData }) {
  if (!certData) return null;

  const {
    score = 75,
    totalCount = 0,
    relevantCount = 0,
    certifications = [],
    summary
  } = certData;

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
                color: '#EC4899',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              PROFESSIONAL CREDENTIALS
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#FDF2F8',
                color: '#BE185D'
              }}
            >
              Verified Issuers
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
            Certification Relevance ({score}%)
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Alignment of certified technical proficiencies against role demands.
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
            border: '1.5px solid #FBCFE8'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#FDF2F8',
              color: '#EC4899',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Award size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#EC4899', textTransform: 'uppercase', fontWeight: 700 }}>
              Certification Fit
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#101B36' }}>
              {score}%
            </div>
          </div>
        </div>
      </div>

      {/* Certifications List Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
        {certifications.map((cert) => {
          const isRelevant = cert.relevance === 'Relevant';

          return (
            <div
              key={cert.name}
              style={{
                padding: '16px 20px',
                backgroundColor: isRelevant ? '#F0FDF4' : '#F8FAFD',
                borderRadius: '14px',
                border: isRelevant ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  {cert.issuer || 'Accredited Issuer'} • {cert.year || '2026'}
                </div>
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: isRelevant ? '#DCFCE7' : '#F1F5F9',
                  color: isRelevant ? '#059669' : '#64748B',
                  border: isRelevant ? '1px solid #A7F3D0' : '1px solid #CBD5E1',
                  flexShrink: 0
                }}
              >
                {cert.relevance || 'Relevant'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary note */}
      <div style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5 }}>
        {summary || `${relevantCount} highly relevant certification(s) identified.`}
      </div>
    </div>
  );
}
