import React from 'react';
import { Eye, CheckCircle2, XCircle, Clock, AlertTriangle, FileText, Download } from 'lucide-react';
import DocumentStatusBadge from './DocumentStatusBadge';

export default function DocumentTable({ documents = [], onReview, onVerify, onReject, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
        <p className="text-sm text-slate-500 font-medium">Loading verification queue...</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-base font-semibold text-slate-900 mb-1">Queue is clear!</h4>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          All submitted placement documents have been reviewed and verified.
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
              <th className="py-3.5 px-4">Document Type</th>
              <th className="py-3.5 px-4">Company & Drive</th>
              <th className="py-3.5 px-4">Submitted At</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">File Details</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-medium text-slate-900">{doc.candidateName || 'Rahul Kumar'}</div>
                  <div className="text-xs text-slate-500">{doc.candidateId} • {doc.department || 'CSE'}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-slate-800">{doc.type}</span>
                  </div>
                  {doc.required && (
                    <span className="inline-block mt-0.5 text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-medium border border-amber-200">
                      Mandatory
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <div className="text-slate-800 font-medium">{doc.companyName || 'TechNova Solutions'}</div>
                  <div className="text-xs text-slate-500">{doc.jobTitle || 'Software Engineer'}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-slate-700 text-xs">
                    {doc.submittedAt ? new Date(doc.submittedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }) : 'Pending Upload'}
                  </span>
                  {doc.submittedAt && (
                    <div className="text-[10px] text-slate-400">
                      {new Date(doc.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <DocumentStatusBadge status={doc.status} />
                </td>
                <td className="py-3.5 px-4">
                  {doc.fileName ? (
                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-slate-700 truncate max-w-[150px]" title={doc.fileName}>
                        {doc.fileName}
                      </span>
                      <span className="text-[10px] text-slate-400">{doc.fileSize || '1.8 MB'}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No file uploaded</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {onReview && (
                      <button
                        onClick={() => onReview(doc)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                        title="Review and preview document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>
                    )}
                    {doc.status === 'Under Review' && onVerify && (
                      <button
                        onClick={() => onVerify(doc.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                        title="Mark document as Verified"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify</span>
                      </button>
                    )}
                    {doc.status === 'Under Review' && onReject && (
                      <button
                        onClick={() => onReject(doc)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
                        title="Reject document and request resubmission"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
