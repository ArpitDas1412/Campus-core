import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, FileText, CheckCircle2, XCircle, AlertTriangle, 
  MessageSquare, ShieldCheck, Download, User, Building2, Calendar
} from 'lucide-react';
import { documentService } from '../../services/documentService';
import DocumentStatusBadge from '../../components/documents/DocumentStatusBadge';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

export default function DocumentReviewPage() {
  const { documentId } = useParams();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [officerComment, setOfficerComment] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const loadDoc = () => {
    const doc = documentService.getDocuments().find(d => d.id === documentId);
    if (doc) {
      setDocument(doc);
      setOfficerComment(doc.comments || '');
    } else {
      const fallback = documentService.getDocuments()[0];
      setDocument(fallback);
    }
  };

  useEffect(() => {
    loadDoc();
  }, [documentId]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-sm">
          <p className="text-sm text-slate-600 mb-4">Document #{documentId} not found.</p>
          <Link to="/officer/documents" className="text-xs font-semibold text-blue-600 hover:underline">
            ← Return to Document Center
          </Link>
        </div>
      </div>
    );
  }

  const handleVerify = () => {
    documentService.verifyDocument(document.id, 'Placement Officer', officerComment);
    loadDoc();
    showToast('Document verified successfully! Notification sent to student.');
  };

  const handleConfirmReject = () => {
    if (!rejectionReason.trim()) return;
    documentService.rejectDocument(document.id, rejectionReason.trim(), 'Placement Officer', officerComment);
    setIsRejecting(false);
    loadDoc();
    showToast('Document rejected and resubmission requested.');
  };

  return (
    <DashboardLayout roleKey="officer">
      <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link
            to="/officer/documents"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Document Verification Center</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 hidden sm:block">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sm font-bold text-slate-400">#{document.id}</span>
                  <DocumentStatusBadge status={document.status} />
                  <span className="text-xs text-slate-400 font-semibold">•</span>
                  <span className="text-xs text-slate-500 font-medium">Offer Ref: {document.offerId}</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mt-1">
                  Reviewing: {document.type}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">{document.candidateName || 'Rahul Kumar'}</span>
                  <span>•</span>
                  <span>{document.companyName || 'TechNova Solutions'}</span>
                  <span>•</span>
                  <span>Submitted: {document.submittedAt ? new Date(document.submittedAt).toLocaleDateString('en-IN') : 'Pending'}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setIsRejecting(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject / Resubmit</span>
              </button>
              <button
                onClick={handleVerify}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Verify</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Preview Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Document Scan Preview</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {document.fileName || 'document_scan.pdf'} • {document.fileSize || '1.8 MB'}
                </span>
              </div>

              {/* Realistic Placeholder Preview Area */}
              <div className="border-2 border-slate-200 border-dashed rounded-2xl p-12 bg-slate-50/70 text-center relative overflow-hidden min-h-[380px] flex flex-col items-center justify-center">
                <div className="w-20 h-28 bg-white border border-slate-200 shadow-md rounded-xl flex flex-col items-center justify-center p-3 mb-4">
                  <FileText className="w-10 h-10 text-blue-500 mb-2" />
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mb-1.5" />
                  <div className="w-3/4 bg-slate-200 h-1.5 rounded-full mb-1.5" />
                  <div className="w-1/2 bg-slate-200 h-1.5 rounded-full" />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">Demo Document Preview</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  High-resolution simulated preview for candidate credential <strong className="text-slate-700">{document.type}</strong>.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-700 font-medium shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>CampusCore Demonstration Mode • PII Redacted</span>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Officer Verification Notes
                </label>
                <textarea
                  rows={3}
                  value={officerComment}
                  onChange={(e) => setOfficerComment(e.target.value)}
                  placeholder="Add optional internal review notes or candidate feedback..."
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => {
                      documentService.verifyDocument(document.id, 'Placement Officer', officerComment);
                      showToast('Officer comments saved.');
                    }}
                    className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              {/* Rejection Form */}
              {isRejecting && (
                <div className="mt-5 p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Rejection Reason (Will be communicated to candidate) *</span>
                  </div>
                  <textarea
                    rows={2}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g. Scanned copy is illegible. Please upload a clear original color scan."
                    className="w-full text-xs p-2.5 bg-white border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsRejecting(false)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmReject}
                      disabled={!rejectionReason.trim()}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-lg transition-colors shadow-xs"
                    >
                      Confirm Rejection & Request Resubmission
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Info Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">
                Candidate Information
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-base shadow-sm">
                  {document.candidateName?.split(' ').map(n => n[0]).join('') || 'RK'}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{document.candidateName || 'Rahul Kumar'}</h4>
                  <p className="text-xs text-slate-500">{document.candidateId || 'STU-001'} • CSE</p>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Company:</span>
                  <span className="font-semibold text-slate-800">{document.companyName || 'TechNova Solutions'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Offer Ref:</span>
                  <Link to={`/officer/offers/${document.offerId}`} className="font-mono text-blue-600 hover:underline">
                    {document.offerId}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mandatory:</span>
                  <span className="font-medium text-slate-800">{document.required ? 'Yes (Required)' : 'Optional'}</span>
                </div>
              </div>
            </div>

            {/* Audit log for this document */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">
                Verification Audit History
              </h3>
              <div className="space-y-3 relative pl-4 border-l-2 border-slate-100 text-xs">
                {(document.auditLog || []).slice().reverse().map((log, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white ring-1 ring-slate-200" />
                    <div>
                      <span className="font-semibold text-slate-800 block text-xs">{log.action}</span>
                      <p className="text-[11px] text-slate-500">
                        {log.actor} ({log.role})
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(log.timestamp).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}
