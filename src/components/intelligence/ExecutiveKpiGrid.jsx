import React from 'react';
import { 
  TrendingUp, Users, Award, DollarSign, Building2, Calendar, 
  CheckCircle2, ArrowUpRight, Percent, Sparkles
} from 'lucide-react';

export default function ExecutiveKpiGrid({ kpis }) {
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
      {/* 1. Placement Rate */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Placement Rate</span>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
            {kpis.placementRateYoY}
          </span>
        </div>
        <div className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
          {kpis.placementRate}%
        </div>
        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
          {kpis.studentsPlaced} of {kpis.eligibleStudents} eligible
        </div>
      </div>

      {/* 2. Students Placed */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Placed</span>
          <Users className="w-3.5 h-3.5 text-blue-600" />
        </div>
        <div className="text-2xl font-black text-blue-600 mt-1.5 tracking-tight">
          {kpis.studentsPlaced}
        </div>
        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
          Unique candidates
        </div>
      </div>

      {/* 3. Total Offers */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Offers</span>
          <Award className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="text-2xl font-black text-emerald-600 mt-1.5 tracking-tight">
          {kpis.totalOffers}
        </div>
        <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">
          {kpis.offersPerPlacedStudent} offers / student
        </div>
      </div>

      {/* 4. Average CTC */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-400 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Average CTC</span>
          <DollarSign className="w-3.5 h-3.5 text-purple-600" />
        </div>
        <div className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight font-mono">
          {kpis.averageCTC}
        </div>
        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
          Median: {kpis.medianCTC}
        </div>
      </div>

      {/* 5. Highest CTC */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-400 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Highest CTC</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <div className="text-2xl font-black text-amber-600 mt-1.5 tracking-tight font-mono">
          {kpis.highestCTC}
        </div>
        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
          TechNova / AWS Tier
        </div>
      </div>

      {/* 6. Active Recruiters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-400 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Recruiters</span>
          <Building2 className="w-3.5 h-3.5 text-indigo-600" />
        </div>
        <div className="text-2xl font-black text-indigo-600 mt-1.5 tracking-tight">
          {kpis.activeRecruiters}
        </div>
        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
          Corporate Partners
        </div>
      </div>

      {/* 7. Active Drives */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Live Drives</span>
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
        </div>
        <div className="text-2xl font-black text-blue-600 mt-1.5 tracking-tight">
          {kpis.activeDrives}
        </div>
        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
          On-campus & Hybrid
        </div>
      </div>

      {/* 8. Joining Rate */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Joining Rate</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="text-2xl font-black text-emerald-600 mt-1.5 tracking-tight">
          {kpis.joiningRate}%
        </div>
        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
          {kpis.joiningConfirmed} Day 1 confirmed
        </div>
      </div>
    </div>
  );
}
