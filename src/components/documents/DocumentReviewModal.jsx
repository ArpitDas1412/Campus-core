import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, FileText, AlertTriangle, MessageSquare, ShieldCheck, Download } from 'lucide-react';
import DocumentStatusBadge from './DocumentStatusBadge';

export default function DocumentReviewModal({ document, onVerify, onReject, onClose }) {
  const [rejecting, setRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [officerComment, setOfficerComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!document) return null;

  const handleVerify = () => {
    setSubmitting(true);
    setTimeout(() => {
      onVerify(document.id, officerComment);
      setSubmitting(false);
      onClose();
    }, 400);
  };

  const handleConfirmReject = () => {
    if (!rejectionReason.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      onReject(document.id, rejectionReason.trim(), officerComment);
      setSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{document.type}</h3>
              <DocumentStatusBadge status={document.status} />
            </div>
            <p className="text-xs text-slate-500">
              Submitted by <span className="font-semibold text-slate-800">{document.candidateName || 'Rahul Kumar'}</span> for {document.companyName || 'TechNova Solutions'}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {/* Metadata pill grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Offer ID</span>
              <span className="font-mono font-medium text-slate-800">{document.offerId || 'OFFER-001'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Candidate ID</span>
              <span className="font-mono font-medium text-slate-800">{document.candidateId || 'STU-001'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">File Attached</span>
              <span className="font-mono text-slate-800 truncate block">{document.fileName || 'scan_copy.pdf'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Submitted On</span>
              <span className="font-medium text-slate-800">
                {document.submittedAt ? new Date(document.submittedAt).toLocaleDateString('en-IN') : 'Pending'}
              </span>
            </div>
          </div>

          {/* Document Preview Placeholder */}
          <div className="border-2 border-slate-200 border-dashed rounded-xl p-8 bg-slate-50/70 text-center relative overflow-hidden">
            <div className="w-16 h-20 bg-white border border-slate-200 shadow-sm rounded-lg mx-auto mb-3 flex flex-col items-center justify-center p-2">
              <FileText className="w-8 h-8 text-blue-500 mb-1" />
              <div className="w-full bg-slate-200 h-1 rounded-full mb-1" />
              <div className="w-3/4 bg-slate-200 h-1 rounded-full" />
            </div>
            <h4 className="text-sm font-semibold text-slate-800 mb-1">Demo Document Preview</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Simulated document preview for {document.type} ({document.fileName || 'scan_copy.pdf'}).
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] text-slate-600 font-mono shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>CampusCore Demo Environment • PII Safeguarded</span>
            </div>
          </div>

          {/* Comment / Note input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Officer Review Comments (Optional)
            </label>
            <input
              type="text"
              value={officerComment}
              onChange={(e) => setOfficerComment(e.target.value)}
              placeholder="e.g. Scanned copy verified against university records"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rejection reason box if rejecting */}
          {rejecting && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Specify Reason for Rejection / Resubmission Required *</span>
              </div>
              <textarea
                rows={2}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Document is blurry. Please upload a higher-quality color scan."
                className="w-full text-xs p-2.5 bg-white border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejecting(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg"
                >
                  Cancel Rejection
                </button>
                <button
                  type="button"
                  disabled={!rejectionReason.trim() || submitting}
                  onClick={handleConfirmReject}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-lg transition-colors"
                >
                  Confirm Rejection & Request Resubmission
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!rejecting && (
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Close
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRejecting(true)}
                className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject / Request Resubmission</span>
              </button>
              <button
                type="button"
                onClick={handleVerify}
                disabled={submitting}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{submitting ? 'Verifying...' : 'Approve & Verify'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
