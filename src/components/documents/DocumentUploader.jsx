import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, ShieldAlert } from 'lucide-react';

export default function DocumentUploader({ document, onUploadSuccess, onClose }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const MAX_SIZE_MB = 5;

  const validateAndSetFile = (file) => {
    setError('');
    if (!file) return;

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds ${MAX_SIZE_MB}MB limit.`);
      return;
    }

    // Allow PDF, JPG, PNG, DOC, DOCX
    const isValidType = ALLOWED_TYPES.includes(file.type) || 
      file.name.endsWith('.pdf') || 
      file.name.endsWith('.jpg') || 
      file.name.endsWith('.jpeg') || 
      file.name.endsWith('.png') || 
      file.name.endsWith('.doc') || 
      file.name.endsWith('.docx');

    if (!isValidType) {
      setError('Unsupported file type. Please upload PDF, JPG, PNG, DOC, or DOCX.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSimulateUpload = () => {
    if (!selectedFile) return;
    setUploading(true);
    setProgress(10);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
              setUploading(false);
              onUploadSuccess({
                fileName: selectedFile.name,
                fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
              });
            }, 400);
          }, 400);
          return 90;
        }
        return prev + 25;
      });
    }, 200);
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

        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-900">Upload Placement Document</h3>
          <p className="text-xs text-slate-500 mt-1">
            Uploading scan for <span className="font-semibold text-blue-600">{document?.type || 'Required Document'}</span>
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-blue-500 bg-blue-50/50'
              : 'border-slate-200 hover:border-blue-400 bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e) => e.target.files?.[0] && validateAndSetFile(e.target.files[0])}
          />

          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>

          <p className="text-sm font-semibold text-slate-800">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-slate-400 mt-1">
            PDF, JPG, PNG, DOC or DOCX (Max size: 5 MB)
          </p>
        </div>

        {/* Selected file preview */}
        {selectedFile && (
          <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="truncate">
                <p className="text-xs font-medium text-slate-800 truncate">{selectedFile.name}</p>
                <p className="text-[10px] text-slate-400">{(selectedFile.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
              className="text-slate-400 hover:text-rose-500 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Progress bar */}
        {uploading && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>Simulating scan upload...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-3.5 p-2.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Disclaimer as required by Section 24 & 49 */}
        <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">Demonstration Environment Notice</p>
            <p className="text-[11px] text-amber-800 mt-0.5">
              Demo upload — files are stored locally for prototype demonstration purposes. Do not submit sensitive government documents.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSimulateUpload}
            disabled={!selectedFile || uploading}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            {uploading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>Submit Document</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
