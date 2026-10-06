import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { AI_RECOMMENDATION_STATUS, STATUS_STYLES } from '../../data/shortlistingConfig.js';

export default function RecommendationBadge({ status, showIcon = true, size = 'md' }) {
  const meta = STATUS_STYLES[status] || {
    bg: '#F1F5F9',
    color: '#64748B',
    border: '#E2E8F0',
    label: status || 'Unknown'
  };

  const getIcon = () => {
    switch (status) {
      case AI_RECOMMENDATION_STATUS.RECOMMENDED:
        return <CheckCircle2 size={size === 'sm' ? 12 : 14} />;
      case AI_RECOMMENDATION_STATUS.NEEDS_REVIEW:
        return <AlertCircle size={size === 'sm' ? 12 : 14} />;
      case AI_RECOMMENDATION_STATUS.NOT_RECOMMENDED:
        return <XCircle size={size === 'sm' ? 12 : 14} />;
      case AI_RECOMMENDATION_STATUS.INELIGIBLE:
        return <ShieldAlert size={size === 'sm' ? 12 : 14} />;
      default:
        return <Sparkles size={size === 'sm' ? 12 : 14} />;
    }
  };

  const padding = size === 'sm' ? '3px 8px' : '5px 12px';
  const fontSize = size === 'sm' ? '11px' : '12px';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding,
        borderRadius: '9999px',
        backgroundColor: meta.bg,
        color: meta.color,
        border: `1px solid ${meta.border}`,
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap'
      }}
    >
      {showIcon && getIcon()}
      <span>{meta.label || status}</span>
    </span>
  );
}
