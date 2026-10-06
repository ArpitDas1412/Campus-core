import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck, Filter, Search, CheckCircle2, AlertTriangle, Clock, RefreshCw, Download } from 'lucide-react';
import { documentService } from '../../services/documentService';
import { offerService } from '../../services/offerService';
import DocumentTable from '../../components/documents/DocumentTable';
import DocumentReviewModal from '../../components/documents/DocumentReviewModal';
import DocumentRequestModal from '../../components/documents/DocumentRequestModal';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

export default function DocumentsPage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [stats, setStats] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewingDoc, setReviewingDoc] = useState(null);
  const [requestDocModal, setRequestDocModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const loadData = () => {
    setDocuments(documentService.getDocuments());
    setStats(documentService.getDocumentStats());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleVerify = (docId, comment) => {
    documentService.verifyDocument(docId, 'Placement Officer', comment);
    loadData();
    showToast('Document verified successfully. Notification dispatched to student.');
  };

  const handleReject = (docId, reason, comment) => {
    documentService.rejectDocument(docId, reason, 'Placement Officer', comment);
    loadData();
    showToast('Document rejected. Resubmission notice dispatched to student.');
  };

  const handleRequestSuccess = (data) => {
    documentService.createDocumentRequest(data.candidateId, data.offerId, data.documents, data.deadline);
    loadData();
    showToast('Document request sent successfully.');
  };

  const filteredDocs = documents.filter((doc) => {
    if (statusFilter !== 'All' && doc.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = (doc.candidateName || '').toLowerCase().includes(q);
      const typeMatch = (doc.type || '').toLowerCase().includes(q);
      const compMatch = (doc.companyName || '').toLowerCase().includes(q);
      const idMatch = (doc.candidateId || '').toLowerCase().includes(q);
      return nameMatch || typeMatch || compMatch || idMatch;
    }
    return true;
  });

  return (
    <DashboardLayout roleKey="officer">
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Toast */}
        {toastMsg && (
          <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 1000, backgroundColor: '#0F172A', color: '#FFFFFF', padding: '12px 18px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
            <CheckCircle2 size={16} color="#34D399" />
            <span>{toastMsg}</span>
          </div>
        )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Layer 12
                </span>
                <span className="text-xs font-semibold text-slate-500">Document Management</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Document Verification Center
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Review, verify and track candidate documents required after offer acceptance.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setRequestDocModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
              >
                <FileCheck className="w-4 h-4" />
                <span>Request Documents</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-6">
          <div 
            onClick={() => setStatusFilter('All')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'All' ? 'bg-blue-50/50 border-blue-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Requested</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{stats?.totalRequested || 126}</div>
            <span className="text-[10px] text-slate-400">Total Pipeline</span>
          </div>

          <div 
            onClick={() => setStatusFilter('Submitted')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'Submitted' ? 'bg-blue-50/50 border-blue-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Submitted</span>
            <div className="text-xl font-bold text-blue-600 mt-1">{stats?.submitted || 102}</div>
            <span className="text-[10px] text-slate-400">Scans Uploaded</span>
          </div>

          <div 
            onClick={() => setStatusFilter('Under Review')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'Under Review' ? 'bg-amber-50/50 border-amber-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Under Review</span>
            <div className="text-xl font-bold text-amber-600 mt-1">{stats?.underReview || 18}</div>
            <span className="text-[10px] text-amber-600 font-semibold">Queue Action</span>
          </div>

          <div 
            onClick={() => setStatusFilter('Verified')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'Verified' ? 'bg-emerald-50/50 border-emerald-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Verified</span>
            <div className="text-xl font-bold text-emerald-600 mt-1">{stats?.verified || 84}</div>
            <span className="text-[10px] text-emerald-600 font-medium">Approved</span>
          </div>

          <div 
            onClick={() => setStatusFilter('Rejected')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'Rejected' ? 'bg-rose-50/50 border-rose-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Rejected</span>
            <div className="text-xl font-bold text-rose-600 mt-1">{stats?.rejected || 6}</div>
            <span className="text-[10px] text-rose-600 font-medium">Resubmission Req.</span>
          </div>

          <div 
            onClick={() => setStatusFilter('Requested')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'Requested' ? 'bg-slate-100 border-slate-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Pending Upload</span>
            <div className="text-xl font-bold text-slate-700 mt-1">{stats?.pendingUpload || 24}</div>
            <span className="text-[10px] text-slate-400">Awaiting Student</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate, document, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            {['All', 'Under Review', 'Submitted', 'Verified', 'Rejected', 'Requested'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <DocumentTable
          documents={filteredDocs}
          onReview={(doc) => setReviewingDoc(doc)}
          onVerify={(id) => handleVerify(id, 'Verified by Placement Officer')}
          onReject={(doc) => setReviewingDoc(doc)}
        />
      </div>

      {reviewingDoc && (
        <DocumentReviewModal
          document={reviewingDoc}
          onVerify={handleVerify}
          onReject={handleReject}
          onClose={() => setReviewingDoc(null)}
        />
      )}

      {requestDocModal && (
        <DocumentRequestModal
          offer={offerService.getOffers()[0]}
          onRequestSuccess={handleRequestSuccess}
          onClose={() => setRequestDocModal(false)}
        />
      )}
      </div>
    </DashboardLayout>
  );
}
