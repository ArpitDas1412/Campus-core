import React from 'react';
import { 
  AlertTriangle, ShieldAlert, ArrowRight, UserX, Clock, 
  FileWarning, HelpCircle, BellRing, CheckCircle2
} from 'lucide-react';

export default function AtRiskRadar({ cohorts = [], onIntervene }) {
  if (!cohorts || cohorts.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Institutional Early Warning Radar
            </span>
            <span className="text-xs text-slate-400 font-semibold">•</span>
            <span className="text-xs text-slate-500 font-medium">Predictive At-Risk Cohorts</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Vulnerable Student Groups & Placement Bottlenecks
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            AI-detected drop-off vulnerabilities requiring proactive institutional intervention.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>165 Total Students Requiring Support</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cohorts.map((cohort) => {
          const isUrgent = cohort.severity === 'Urgent';
          const isHigh = cohort.severity === 'High';

          return (
            <div
              key={cohort.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                isUrgent
                  ? 'bg-rose-50/40 border-rose-300 shadow-xs'
                  : isHigh
                  ? 'bg-amber-50/30 border-amber-300'
                  : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      isUrgent
                        ? 'bg-rose-600 text-white'
                        : isHigh
                        ? 'bg-amber-500 text-white'
                        : 'bg-blue-600 text-white'
                    }`}>
                      {cohort.severity} Severity
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {cohort.category}
                    </span>
                  </div>

                  <span className="text-xl font-black font-mono text-slate-900">
                    {cohort.count} <span className="text-xs font-semibold text-slate-500">students</span>
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mb-1">{cohort.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {cohort.description}
                </p>

                {/* Affected department pills */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Department Concentration:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cohort.affectedDepts.map((d) => (
                      <span key={d} className="text-[10px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2 text-xs">
                <span className="font-medium text-slate-500 truncate text-[11px]">
                  <strong>Action:</strong> {cohort.recommendedAction}
                </span>

                <button
                  onClick={() => onIntervene && onIntervene(cohort)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap flex-shrink-0 ${
                    isUrgent
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Intervene</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
