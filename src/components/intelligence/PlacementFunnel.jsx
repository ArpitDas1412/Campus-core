import React, { useState } from 'react';
import { 
  Users, ChevronDown, AlertTriangle, ArrowRight, Layers, 
  CheckCircle2, Filter, Sparkles, BarChart2, Info
} from 'lucide-react';

export default function PlacementFunnel({ funnelData = [] }) {
  const [selectedStage, setSelectedStage] = useState(funnelData[0] || null);

  if (!funnelData || funnelData.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              10-Stage Placement Lifecycle Funnel
            </span>
            <span className="text-xs text-slate-400 font-semibold">•</span>
            <span className="text-xs text-slate-500 font-medium">Layers 1–12 Integrated</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Institutional Conversion & Drop-off Pipeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Track student retention from overall campus enrollment to verified Day 1 corporate joining.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            Overall Conversion: <strong className="text-emerald-600 font-mono">1.44% of total</strong> (4.2% of selected)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FUNNEL STEPPER (Left 8 Cols) */}
        <div className="lg:col-span-8 space-y-2">
          {funnelData.map((stage, idx) => {
            const isSelected = selectedStage?.stage === stage.stage;
            const prevStage = idx > 0 ? funnelData[idx - 1] : null;
            const conversionRate = prevStage 
              ? Math.round((stage.count / prevStage.count) * 100) 
              : 100;

            // Width percentage for visual funnel tapering
            const widthPct = Math.max(22, Math.round((stage.count / funnelData[0].count) * 100));

            return (
              <div
                key={stage.stage}
                onClick={() => setSelectedStage(stage)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-2 ring-blue-100'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-900 truncate">{stage.stage}</span>
                    <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {stage.layer}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 font-medium">
                    <span className="text-slate-500 text-[11px]">
                      {idx > 0 && (
                        <span className="text-emerald-700 font-semibold mr-2">
                          {conversionRate}% conv.
                        </span>
                      )}
                      ({stage.pctOfCohort}% of cohort)
                    </span>
                    <span className="font-black text-slate-900 font-mono text-sm min-w-[40px] text-right">
                      {stage.count}
                    </span>
                  </div>
                </div>

                {/* Progress bar visual tapering */}
                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      idx >= 7 ? 'bg-emerald-500' : idx >= 4 ? 'bg-indigo-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* STAGE DRILL-DOWN PANEL (Right 4 Cols) */}
        <div className="lg:col-span-4">
          {selectedStage ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                  Stage Insight
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedStage.layer}</span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">{selectedStage.stage}</h4>
                <div className="text-3xl font-black text-blue-700 font-mono mt-1">
                  {selectedStage.count} <span className="text-sm font-semibold text-slate-500">students</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Represents <strong>{selectedStage.pctOfCohort}%</strong> of total academic enrollment.
                </p>
              </div>

              {selectedStage.dropCount > 0 && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Drop-off to Next Stage</span>
                  </div>
                  <div className="text-xl font-bold text-rose-700 font-mono">
                    -{selectedStage.dropCount} students
                  </div>
                  <p className="text-[11px] text-rose-800 leading-snug">
                    <strong className="font-semibold">Primary Factor:</strong> {selectedStage.dropReason}
                  </p>
                </div>
              )}

              <div className="space-y-2 text-xs border-t border-slate-200 pt-3 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Integrated Layer:</span>
                  <span className="font-semibold text-slate-800">{selectedStage.layer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Institutional Status:</span>
                  <span className="font-semibold text-emerald-600">Active Benchmark ✓</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-1">
                  <Info className="w-3.5 h-3.5 text-blue-500" />
                  <span>Executive Recommendation</span>
                </div>
                Focus retention efforts on converting Shortlisted (312) to Interviewed (184) by running technical interview prep simulations.
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-400">
              Click any stage on the left to inspect drop-off factors and conversion analytics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
