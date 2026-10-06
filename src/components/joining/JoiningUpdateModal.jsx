import React, { useState } from 'react';
import { X, CheckCircle2, UserCheck, UserX, XCircle, AlertTriangle, Calendar } from 'lucide-react';
import { JOINING_STATUSES } from '../../data/offers';

export default function JoiningUpdateModal({ record, onUpdateSuccess, onClose }) {
  const [selectedStatus, setSelectedStatus] = useState(record?.status || 'Scheduled');
  const [notes, setNotes] = useState(record?.notes || '');
  const [confirmedRisk, setConfirmedRisk] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!record) return null;

  const requiresSpecialConfirmation = ['Joined', 'No Show', 'Cancelled'].includes(selectedStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requiresSpecialConfirmation && !confirmedRisk && selectedStatus !== record.status) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      onUpdateSuccess(record.id, selectedStatus, notes);
      setSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900">Update Onboarding Status</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Candidate: <span className="font-semibold text-slate-800">{record.candidateName || 'Rahul Kumar'}</span> • {record.companyName || 'TechNova'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Current Onboarding Milestone
            </label>
            <div className="space-y-1.5">
              {JOINING_STATUSES.map((status) => (
                <label
                  key={status}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedStatus === status
                      ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{status}</span>
                  <input
                    type="radio"
                    name="joiningStatus"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setConfirmedRisk(false);
                    }}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Internal Officer / Onboarding Remarks
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Reporting confirmed with HR team; ID badge issued."
              className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Risk confirmation checkbox for terminal states */}
          {requiresSpecialConfirmation && selectedStatus !== record.status && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Confirmation Required</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-snug">
                Updating status to <strong className="font-semibold text-amber-950">{selectedStatus}</strong> is a high-impact lifecycle event. This update will be logged in the immutable audit trail and sent to the recruiter.
              </p>
              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmedRisk}
                  onChange={(e) => setConfirmedRisk(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 mt-0.5"
                />
                <span className="text-xs text-amber-900 font-medium select-none">
                  I confirm this candidate's onboarding outcome as {selectedStatus}.
                </span>
              </label>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || (requiresSpecialConfirmation && selectedStatus !== record.status && !confirmedRisk)}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
            >
              {submitting ? 'Saving...' : 'Update Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
