import React from 'react';
import { Clock, UploadCloud, Eye, CheckCircle2, XCircle } from 'lucide-react';

export default function DocumentStatusBadge({ status = 'Requested', size = 'normal' }) {
  const isSmall = size === 'small';

  const config = {
    'Requested': {
      bg: '#F1F5F9',
      color: '#475569',
      border: '#CBD5E1',
      icon: Clock
    },
    'Submitted': {
      bg: '#EFF6FF',
      color: '#1E40AF',
      border: '#BFDBFE',
      icon: UploadCloud
    },
    'Under Review': {
      bg: '#FEF3C7',
      color: '#92400E',
      border: '#FDE68A',
      icon: Eye
    },
    'Verified': {
      bg: '#ECFDF5',
      color: '#065F46',
      border: '#A7F3D0',
      icon: CheckCircle2
    },
    'Rejected': {
      bg: '#FEF2F2',
      color: '#991B1B',
      border: '#FECACA',
      icon: XCircle
    }
  };

  const style = config[status] || config.Requested;
  const Icon = style.icon;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '3px' : '5px',
        padding: isSmall ? '2px 7px' : '3px 10px',
        borderRadius: '999px',
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        fontSize: isSmall ? '11px' : '12px',
        fontWeight: 700,
        whiteSpace: 'nowrap'
      }}
    >
      <Icon size={isSmall ? 11 : 13} />
      <span>{status}</span>
    </span>
  );
}
