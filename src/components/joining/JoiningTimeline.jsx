import React from 'react';
import { CheckCircle2, Clock, Calendar, MapPin, Building2, User, Phone, FileCheck, ShieldCheck } from 'lucide-react';

export default function JoiningTimeline({ joiningRecord, offer }) {
  // Reference demo date 2026-10-06
  const targetDate = new Date(joiningRecord?.joiningDate || offer?.joiningDate || '2026-12-01');
  const now = new Date('2026-10-06');
  const diffTime = targetDate - now;
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const stages = [
    {
      id: 1,
      title: 'Offer Accepted',
      subtitle: offer?.acceptance?.acceptedAt ? new Date(offer.acceptance.acceptedAt).toLocaleDateString('en-IN') : 'Completed',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Documents Submitted',
      subtitle: 'All scans received',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Documents Verified',
      subtitle: 'Placement cell approved',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Joining Confirmed',
      subtitle: joiningRecord?.status === 'Confirmed' || joiningRecord?.status === 'Joined' ? 'HR Slot Allocated' : 'Scheduled',
      status: joiningRecord?.status === 'Confirmed' || joiningRecord?.status === 'Joined' ? 'completed' : 'current'
    },
    {
      id: 5,
      title: 'First Day at Office',
      subtitle: targetDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: joiningRecord?.status === 'Joined' ? 'completed' : 'upcoming'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            {joiningRecord?.status || 'Joining Confirmed'}
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2 flex items-center gap-2">
            <span>{offer?.companyName || joiningRecord?.companyName || 'TechNova Solutions'}</span>
            <span className="text-slate-400 font-normal">•</span>
            <span className="text-blue-600 font-semibold">{offer?.jobTitle || joiningRecord?.jobTitle || 'Software Engineer'}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Formal Campus Placement Onboarding • Tracked End-to-End
          </p>
        </div>

        {/* Countdown Badge */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 text-center min-w-[160px]">
          <span className="text-xs text-slate-500 font-medium block">Countdown to Day 1</span>
          <div className="text-3xl font-black text-blue-700 tracking-tight mt-0.5">
            {daysRemaining} <span className="text-sm font-semibold text-blue-600">days</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            {targetDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* 5-Stage Stepper */}
      <div className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
          {stages.map((stage, idx) => {
            const isDone = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div key={stage.id} className="flex flex-col items-center text-center relative group">
                {/* Horizontal line connector for desktop */}
                {idx < stages.length - 1 && (
                  <div className={`hidden sm:block absolute top-4 left-1/2 w-full h-0.5 -z-0 ${
                    isDone ? 'bg-emerald-500' : 'bg-slate-200'
                  }`} />
                )}

                {/* Circle Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs z-10 transition-transform ${
                  isDone 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
                    : isCurrent 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse' 
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}>
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{stage.id}</span>
                  )}
                </div>

                <div className="mt-2.5">
                  <h5 className={`text-xs font-bold ${
                    isDone ? 'text-slate-900' : isCurrent ? 'text-blue-600' : 'text-slate-500'
                  }`}>
                    {stage.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">{stage.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Onboarding logistics details */}
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">Reporting Location</span>
            <span className="font-semibold text-slate-800 block">{joiningRecord?.location || 'TechNova Campus, Electronic City, Bangalore'}</span>
            <span className="text-[11px] text-slate-500">Mode: {joiningRecord?.workMode || 'Hybrid (3 days in-office)'}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">Reporting Schedule</span>
            <span className="font-semibold text-slate-800 block">Time: {joiningRecord?.joiningTime || '09:30 AM'} IST</span>
            <span className="text-[11px] text-slate-500">Registration Desk: Main Tower Lobby B</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <User className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">HR Coordinator</span>
            <span className="font-semibold text-slate-800 block">{joiningRecord?.reportingContact || 'Talent Onboarding Operations'}</span>
            <span className="text-[11px] text-slate-500">Campus Placement POC assigned</span>
          </div>
        </div>
      </div>
    </div>
  );
}
