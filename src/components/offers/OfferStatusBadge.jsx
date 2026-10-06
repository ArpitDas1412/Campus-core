import React from 'react';
import {
  FileText,
  Send,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Ban
} from 'lucide-react';

export default function OfferStatusBadge({ status = 'Sent', size = 'normal' }) {
  const isSmall = size === 'small';

  const config = {
    Draft: {
      bg: '#FEF3C7',
      color: '#92400E',
      border: '#FDE68A',
      icon: FileText
    },
    Sent: {
      bg: '#EFF6FF',
      color: '#1E40AF',
      border: '#BFDBFE',
      icon: Send
    },
    Viewed: {
      bg: '#E0F2FE',
      color: '#0369A1',
      border: '#BAE6FD',
      icon: Eye
    },
    Accepted: {
      bg: '#ECFDF5',
      color: '#065F46',
      border: '#A7F3D0',
      icon: CheckCircle2
    },
    Declined: {
      bg: '#FEF2F2',
      color: '#991B1B',
      border: '#FECACA',
      icon: XCircle
    },
    Expired: {
      bg: '#F1F5F9',
      color: '#64748B',
      border: '#CBD5E1',
      icon: Clock
    },
    Cancelled: {
      bg: '#F8FAFC',
      color: '#475569',
      border: '#E2E8F0',
      icon: Ban
    }
  };

  const style = config[status] || config.Sent;
  const Icon = style.icon;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '4px' : '5px',
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
