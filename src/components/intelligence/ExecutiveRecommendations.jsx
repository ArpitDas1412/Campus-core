import React, { useState } from 'react';
import { 
  Sparkles, AlertCircle, ArrowRight, CheckCircle2, ShieldCheck, 
  Send, ExternalLink, Zap, Info, TrendingUp
} from 'lucide-react';

export default function ExecutiveRecommendations({ recommendations = [], onAction }) {
  const [triggeredRecs, setTriggeredRecs] = useState({});

  const handleExecute = (rec) => {
    setTriggeredRecs(prev => ({ ...prev, [rec.id]: true }));
    if (onAction) {
      onAction(rec);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Prescriptive Intelligence Engine
            </span>
            <span className="text-xs text-slate-400 font-semibold">•</span>
            <span className="text-xs text-slate-500 font-medium">Automated Placement Guidance</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Executive Directives & Institutional Recommendations
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Actionable insights derived across student readiness, recruiter mandates, and onboarding schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>4 High-Impact Recommendations Ready</span>
          </span>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const isTriggered = triggeredRecs[rec.id];

          const badgeStyles = {
            blue: 'bg-blue-50 text-blue-700 border-blue-200',
            amber: 'bg-amber-50 text-amber-800 border-amber-200',
            emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            purple: 'bg-purple-50 text-purple-700 border-purple-200'
          };

          return (
            <div
              key={rec.id}
              className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${badgeStyles[rec.badgeColor] || badgeStyles.blue}`}>
                    {rec.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 font-mono">
                    {rec.type}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{rec.title}</h4>
                
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Observation:</strong> {rec.observation}
                </p>

                <p className="text-xs text-slate-700 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <strong className="text-blue-700 font-semibold">Executive Action: </strong>
                  {rec.recommendation}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold pt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Projected Outcome: {rec.metricImpact}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col items-end justify-center flex-shrink-0 min-w-[200px]">
                {isTriggered ? (
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Directive Dispatched ✓</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleExecute(rec)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-500/10 hover:shadow-md"
                  >
                    <span>{rec.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <span className="text-[10px] text-slate-400 mt-1.5">
                  Connects to Layer 10/11/12
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demonstrative AI Notice as required */}
      <div className="mt-6 p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3 text-xs text-amber-900">
        <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-800 leading-relaxed">
          <strong>CampusCore Executive Intelligence Disclaimer:</strong> Demonstrative and illustrative AI recommendations synthesized from institutional placement parameters. Not scientifically validated predictions.
        </p>
      </div>
    </div>
  );
}
