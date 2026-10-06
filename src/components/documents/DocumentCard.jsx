import React from 'react';
import { FileText, CheckCircle2, Clock, AlertTriangle, XCircle, Upload, Eye, RefreshCw } from 'lucide-react';
import DocumentStatusBadge from './DocumentStatusBadge';

export default function DocumentCard({ document, onUpload, onReplace, onView, onResubmit }) {
  const isVerified = document.status === 'Verified';
  const isRejected = document.status === 'Rejected';
  const isUnderReview = document.status === 'Under Review';
  const isSubmitted = document.status === 'Submitted';
  const isRequested = document.status === 'Requested';

  return (
    <div className={`p-5 rounded-xl border transition-all ${
      isVerified
        ? 'bg-emerald-50/30 border-emerald-200'
        : isRejected
        ? 'bg-rose-50/30 border-rose-200'
        : isUnderReview
        ? 'bg-amber-50/20 border-amber-200'
        : 'bg-white border-slate-200 hover:border-slate-300'
    } shadow-sm flex flex-col justify-between`}>
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${
              isVerified
                ? 'bg-emerald-100 text-emerald-700'
                : isRejected
                ? 'bg-rose-100 text-rose-700'
                : isUnderReview
                ? 'bg-amber-100 text-amber-700'
                : 'bg-blue-50 text-blue-600'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm leading-snug flex items-center gap-2">
                {document.type}
                {document.required ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                    Required
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    Optional
                  </span>
                )}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {document.fileName ? (
                  <span className="font-mono text-slate-700">{document.fileName} • {document.fileSize || '1.8 MB'}</span>
                ) : (
                  <span className="italic">No file attached</span>
                )}
              </p>
            </div>
          </div>
          <DocumentStatusBadge status={document.status} />
        </div>

        {/* Timestamps & Info */}
        <div className="mt-3 text-xs text-slate-600 space-y-1">
          {document.submittedAt && (
            <div className="flex items-center justify-between text-slate-500">
              <span>Submitted:</span>
              <span className="font-medium text-slate-700">
                {new Date(document.submittedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
          {document.verifiedAt && (
            <div className="flex items-center justify-between text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-[11px] font-medium">
              <span>Verified On:</span>
              <span>{new Date(document.verifiedAt).toLocaleDateString('en-IN')}</span>
            </div>
          )}
        </div>

        {/* Rejection / Resubmission note */}
        {isRejected && document.rejectionReason && (
          <div className="mt-3 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800">
            <div className="flex items-center gap-1.5 font-semibold text-rose-900 mb-0.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Officer Note / Reason:</span>
            </div>
            <p className="text-xs text-rose-700">{document.rejectionReason}</p>
          </div>
        )}

        {/* Officer comments */}
        {document.comments && !isRejected && (
          <div className="mt-2.5 p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600">
            <span className="font-medium text-slate-700">Note: </span>
            {document.comments}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
        {document.fileName && onView && (
          <button
            onClick={() => onView(document)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        )}

        {isRequested && onUpload && (
          <button
            onClick={() => onUpload(document)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>
        )}

        {isRejected && onResubmit && (
          <button
            onClick={() => onResubmit(document)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resubmit Scan</span>
          </button>
        )}

        {(isUnderReview || isSubmitted) && onReplace && (
          <button
            onClick={() => onReplace(document)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
          >
            <Upload className="w-3 h-3" />
            <span>Replace</span>
          </button>
        )}

        {isVerified && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>All Clear</span>
          </span>
        )}
      </div>
    </div>
  );
}
