import React, { useState } from 'react';
import { X, FileCheck, Calendar, CheckSquare, Square, Send, AlertCircle } from 'lucide-react';
import { REQUIRED_DOCUMENT_TYPES } from '../../data/offers';

export default function DocumentRequestModal({ offer, onRequestSuccess, onClose }) {
  const [selectedDocs, setSelectedDocs] = useState([
    'Aadhaar / Government ID',
    '10th Marksheet',
    '12th Marksheet',
    'Semester Mark Sheets',
    'Resume'
  ]);
  const [deadline, setDeadline] = useState('2026-11-20');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toggleDoc = (doc) => {
    setSelectedDocs(prev => 
      prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]
    );
  };

  const handleSendRequest = () => {
    if (selectedDocs.length === 0) return;
    setSubmitting(true);
    setTimeout(() => {
      onRequestSuccess({
        offerId: offer?.id,
        candidateId: offer?.candidateId,
        candidateName: offer?.candidateName,
        documents: selectedDocs,
        deadline,
        notes
      });
      setSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Request Documents</h3>
            <p className="text-xs text-slate-500">
              Candidate: <span className="font-semibold text-slate-800">{offer?.candidateName || 'Rahul Kumar'}</span> • {offer?.companyName || 'TechNova Solutions'}
            </p>
          </div>
        </div>

        {/* Checkbox list */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Required Documents ({selectedDocs.length} selected)
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
              {REQUIRED_DOCUMENT_TYPES.map((docType) => {
                const isSelected = selectedDocs.includes(docType);
                return (
                  <button
                    key={docType}
                    type="button"
                    onClick={() => toggleDoc(docType)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-colors border ${
                      isSelected
                        ? 'bg-blue-50 border-blue-300 text-blue-900 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                    <span className="truncate">{docType}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submission Deadline */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Submission Deadline</span>
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Optional instructions */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Special Instructions / Notes for Candidate
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Ensure marksheets are scanned in color and self-attested."
              className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSendRequest}
            disabled={selectedDocs.length === 0 || submitting}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Sending Request...' : 'Send Document Request'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
