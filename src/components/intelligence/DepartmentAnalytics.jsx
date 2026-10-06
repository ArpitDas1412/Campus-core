import React, { useState } from 'react';
import { 
  Building2, Award, DollarSign, TrendingUp, Users, 
  CheckCircle2, AlertCircle, ArrowUpRight, Filter, Sparkles
} from 'lucide-react';

export default function DepartmentAnalytics({ 
  departments = [], 
  recruiters = [],
  selectedDept = 'ALL',
  onSelectDept 
}) {
  const [activeTab, setActiveTab] = useState('departments'); // 'departments' | 'recruiters'

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Cross-Disciplinary Intelligence
            </span>
            <span className="text-xs text-slate-400 font-semibold">•</span>
            <span className="text-xs text-slate-500 font-medium">Departmental & Recruiter Matrix</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Department Performance & Corporate Demand Analytics
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify high-velocity branches, package brackets, and company hiring volumes across engineering domains.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'departments'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Departments ({departments.length})
          </button>
          <button
            onClick={() => setActiveTab('recruiters')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'recruiters'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Top Recruiters ({recruiters.length})
          </button>
        </div>
      </div>

      {/* VIEW 1: DEPARTMENTS COMPARATIVE TABLE & CARDS */}
      {activeTab === 'departments' && (
        <div className="space-y-6">
          {/* Quick department pills filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-medium text-[11px] mr-1">Filter Domain:</span>
            {['ALL', 'CSE', 'IT', 'ECE', 'EEE', 'MECH'].map((code) => {
              const isSelected = selectedDept === code;
              return (
                <button
                  key={code}
                  onClick={() => onSelectDept && onSelectDept(code)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {code === 'ALL' ? 'All Departments' : code}
                </button>
              );
            })}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Placed / Eligible</th>
                  <th className="py-3 px-4">Placement Rate</th>
                  <th className="py-3 px-4">Offers</th>
                  <th className="py-3 px-4">Average Package</th>
                  <th className="py-3 px-4">Highest CTC</th>
                  <th className="py-3 px-4">Top Recruiters</th>
                  <th className="py-3 px-4">Concentrated Skill Gaps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {departments
                  .filter(d => selectedDept === 'ALL' || d.code === selectedDept)
                  .map((dept) => {
                    const isHigh = dept.placementRate >= 80;
                    const isMed = dept.placementRate >= 65 && dept.placementRate < 80;

                    return (
                      <tr key={dept.code} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">{dept.name}</div>
                          <span className="text-[11px] font-mono text-slate-400">{dept.code}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-800">{dept.placed}</span>
                          <span className="text-slate-400"> / {dept.eligible}</span>
                          <div className="text-[10px] text-slate-400 font-mono">Total: {dept.totalStudents}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-black text-sm font-mono ${
                              isHigh ? 'text-emerald-600' : isMed ? 'text-blue-600' : 'text-amber-600'
                            }`}>
                              {dept.placementRate}%
                            </span>
                          </div>
                          <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                            <div
                              className={`h-full rounded-full ${
                                isHigh ? 'bg-emerald-500' : isMed ? 'bg-blue-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${dept.placementRate}%` }}
                            />
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-800 text-sm font-mono">{dept.offers}</span>
                          <div className="text-[10px] text-slate-400">Total letters</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 font-mono text-sm">{dept.averageCTC}</span>
                          <div className="text-[10px] text-slate-400">Cohort mean</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-emerald-600 font-mono text-sm">{dept.highestCTC}</span>
                          <div className="text-[10px] text-slate-400">Peak package</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[170px]">
                            {dept.topRecruiters.map(r => (
                              <span key={r} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                                {r}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5 max-w-[180px]">
                            {dept.topSkillGaps.map(g => (
                              <span key={g} className="block text-[10px] text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded font-semibold truncate border border-rose-100">
                                ⚠ {g}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: TOP RECRUITERS & HIRING DEMAND */}
      {activeTab === 'recruiters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recruiters.map((rec) => (
            <div key={rec.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span>{rec.name}</span>
                      <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {rec.tier}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {rec.drivesConducted} placement drive cycles • {rec.hiringVelocity}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                    {rec.averageCTC}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 text-xs my-3">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Offers Released</span>
                    <span className="font-bold text-slate-900">{rec.offersReleased}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Accepted</span>
                    <span className="font-bold text-emerald-600">{rec.offersAccepted}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Acceptance Rate</span>
                    <span className="font-bold text-blue-600">{rec.acceptanceRate}%</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Mandatory Skill Stack Demanded:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {rec.keySkillsRequested.map((skill) => (
                      <span key={skill} className="text-[10px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
