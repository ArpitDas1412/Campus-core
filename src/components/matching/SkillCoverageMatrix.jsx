import React from 'react';
import { CheckCircle2, AlertCircle, Sparkles, XCircle } from 'lucide-react';

export default function SkillCoverageMatrix({ skillMatch }) {
  const details = skillMatch?.details || [];

  if (details.length === 0) {
    return <div style={{ fontSize: '13px', color: '#64748B' }}>No skill details available for evaluation.</div>;
  }

  const getStatusBadge = (item) => {
    if (item.type === 'strong') {
      return {
        label: 'Strong Match',
        bgColor: '#ECFDF5',
        color: '#059669',
        icon: CheckCircle2,
        width: '95%'
      };
    } else if (item.type === 'partial' || item.type === 'preferred_match') {
      return {
        label: item.type === 'preferred_match' ? 'Preferred Match' : 'Partial Match',
        bgColor: '#EFF6FF',
        color: '#2563EB',
        icon: Sparkles,
        width: '75%'
      };
    } else if (item.type === 'preferred_missing') {
      return {
        label: 'Not Acquired',
        bgColor: '#F8FAFC',
        color: '#94A3B8',
        icon: AlertCircle,
        width: '20%'
      };
    } else {
      return {
        label: 'Missing Skill',
        bgColor: '#FEF2F2',
        color: '#DC2626',
        icon: XCircle,
        width: '10%'
      };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {details.map((item, idx) => {
        const badge = getStatusBadge(item);
        const Icon = badge.icon;

        return (
          <div
            key={idx}
            style={{
              padding: '12px 14px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                  {item.name}
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: item.isRequired ? '#F1F5F9' : '#F5F3FF',
                    color: item.isRequired ? '#475569' : '#7C3AED'
                  }}
                >
                  {item.isRequired ? 'Required' : 'Preferred'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  Req: <strong style={{ color: '#101B36' }}>{item.requiredLevel || 'Any'}</strong> • Candidate:{' '}
                  <strong style={{ color: badge.color }}>{item.candidateLevel}</strong>
                </span>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: badge.bgColor,
                    color: badge.color,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Icon size={12} />
                  <span>{badge.label}</span>
                </span>
              </div>
            </div>

            {/* Proficiency Alignment Bar */}
            <div
              style={{
                height: '5px',
                backgroundColor: '#F1F5F9',
                borderRadius: '999px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: badge.width,
                  backgroundColor: badge.color,
                  borderRadius: '999px'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
