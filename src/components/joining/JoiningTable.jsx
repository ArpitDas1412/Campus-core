import React from 'react';
import { Calendar, MapPin, Clock, Bell, Edit3, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import JoiningStatusBadge from './JoiningStatusBadge';
import OfferStatusBadge from '../offers/OfferStatusBadge';

export default function JoiningTable({ 
  records = [], 
  onUpdateStatus, 
  onSendReminder, 
  onViewRecord,
  isLoading = false 
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
        <p className="text-sm text-slate-500 font-medium">Loading onboarding records...</p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Calendar className="w-6 h-6" />
        </div>
        <h4 className="text-base font-semibold text-slate-900 mb-1">No joining records found</h4>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Joining records are populated as soon as candidates accept their formal employment offers.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4">Candidate</th>
              <th className="py-3.5 px-4">Company & Role</th>
              <th className="py-3.5 px-4">Joining Date & Reporting</th>
              <th className="py-3.5 px-4">Location & Mode</th>
              <th className="py-3.5 px-4">Documents</th>
              <th className="py-3.5 px-4">Joining Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {records.map((rec) => {
              const joiningDateObj = new Date(rec.joiningDate);
              const formattedDate = joiningDateObj.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{rec.candidateName || 'Candidate'}</div>
                    <div className="text-xs text-slate-500">{rec.candidateId} • {rec.department || 'CSE'}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">{rec.companyName || 'Company'}</div>
                    <div className="text-xs text-slate-500">{rec.jobTitle || 'Role'}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-slate-900 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Reporting: {rec.joiningTime || '09:30 AM'}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-xs text-slate-800 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate max-w-[160px]" title={rec.location}>{rec.location || 'Bangalore'}</span>
                    </div>
                    <span className="inline-block mt-0.5 text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded font-medium">
                      {rec.workMode || 'Hybrid'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{
                            width: `${(Math.min(rec.verifiedDocs || 4, rec.requiredDocs || 5) / (rec.requiredDocs || 5)) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        {rec.verifiedDocs || 4}/{rec.requiredDocs || 5}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">Verified</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <JoiningStatusBadge status={rec.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {onSendReminder && (
                        <button
                          onClick={() => onSendReminder(rec)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-slate-200"
                          title="Send onboarding reminder"
                        >
                          <Bell className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onUpdateStatus && (
                        <button
                          onClick={() => onUpdateStatus(rec)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Status</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
