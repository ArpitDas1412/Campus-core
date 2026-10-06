import React from 'react';
import { Calendar, CheckCircle2, UserCheck, UserX, XCircle, Clock } from 'lucide-react';

export default function JoiningStatusBadge({ status = 'Not Scheduled' }) {
  const configs = {
    'Not Scheduled': {
      bg: 'bg-slate-100',
      text: 'text-slate-600',
      border: 'border-slate-200',
      icon: Clock
    },
    'Scheduled': {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: Calendar
    },
    'Confirmed': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: CheckCircle2
    },
    'Joined': {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: UserCheck
    },
    'No Show': {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: UserX
    },
    'Cancelled': {
      bg: 'bg-slate-100',
      text: 'text-slate-500',
      border: 'border-slate-200',
      icon: XCircle
    }
  };

  const config = configs[status] || configs['Not Scheduled'];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{status}</span>
    </span>
  );
}
