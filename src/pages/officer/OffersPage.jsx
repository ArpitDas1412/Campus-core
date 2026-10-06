import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FileText, Plus, Send, Download, Filter, Search, CheckCircle2, 
  Clock, AlertCircle, Users, Briefcase, ChevronRight, Layers, FileCheck, Calendar, ShieldCheck
} from 'lucide-react';
import { offerService } from '../../services/offerService';
import { documentService } from '../../services/documentService';
import { joiningService } from '../../services/joiningService';
import OfferPipeline from '../../components/offers/OfferPipeline';
import OfferTable from '../../components/offers/OfferTable';
import OfferWizard from '../../components/offers/OfferWizard';
import OfferAnalytics from '../../components/offers/OfferAnalytics';
import DocumentTable from '../../components/documents/DocumentTable';
import DocumentReviewModal from '../../components/documents/DocumentReviewModal';
import DocumentRequestModal from '../../components/documents/DocumentRequestModal';
import JoiningTable from '../../components/joining/JoiningTable';
import JoiningUpdateModal from '../../components/joining/JoiningUpdateModal';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

export default function OffersPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('offers'); // 'offers' | 'documents' | 'joining' | 'analytics'
  const [pipelineFilter, setPipelineFilter] = useState('All');
  
  // Data state
  const [offers, setOffers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [joiningRecords, setJoiningRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [docStats, setDocStats] = useState(null);
  const [joiningStats, setJoiningStats] = useState(null);
  const [pipelineData, setPipelineData] = useState([]);

  // Modals
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [reviewingDoc, setReviewingDoc] = useState(null);
  const [requestDocOffer, setRequestDocOffer] = useState(null);
  const [updatingJoining, setUpdatingJoining] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Initial load
  const loadAllData = () => {
    const allOffers = offerService.getOffers();
    setOffers(allOffers);
    setStats(offerService.getOfferStats());
    setPipelineData(offerService.getOfferPipeline());

    const allDocs = documentService.getDocuments();
    setDocuments(allDocs);
    setDocStats(documentService.getDocumentStats());

    const allJoining = joiningService.getJoiningRecords();
    setJoiningRecords(allJoining);
    setJoiningStats(joiningService.getJoiningStats());
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(''), 4000);
  };

  // Offer handlers
  const handleCreateOffer = (newOffer) => {
    loadAllData();
    showToast(`Offer #${newOffer.id} created and sent to ${newOffer.candidateName}!`);
  };

  const handleSendOffer = (offerId) => {
    const updated = offerService.sendOffer(offerId, 'Placement Officer');
    loadAllData();
    showToast(`Offer #${offerId} sent successfully to candidate.`);
  };

  const handleResendOffer = (offerId) => {
    const updated = offerService.resendOffer(offerId, 'Placement Officer');
    loadAllData();
    showToast(`Offer #${offerId} reminder resent.`);
  };

  // Document handlers
  const handleVerifyDocument = (docId, comment) => {
    documentService.verifyDocument(docId, 'Placement Officer', comment);
    loadAllData();
    showToast('Document verified successfully. Notification dispatched to student.');
  };

  const handleRejectDocument = (docId, reason, comment) => {
    documentService.rejectDocument(docId, reason, 'Placement Officer', comment);
    loadAllData();
    showToast('Document rejected and resubmission requested.');
  };

  const handleDocumentRequestSuccess = (data) => {
    documentService.createDocumentRequest(data.candidateId, data.offerId, data.documents, data.deadline);
    loadAllData();
    showToast(`Document submission checklist sent to ${data.candidateName}.`);
  };

  // Joining handlers
  const handleUpdateJoiningStatus = (recordId, newStatus, notes) => {
    joiningService.updateJoiningStatus(recordId, newStatus, 'Placement Officer', notes);
    loadAllData();
    showToast(`Onboarding status updated to "${newStatus}".`);
  };

  const handleSendJoiningReminder = (rec) => {
    joiningService.sendJoiningReminder(rec.id);
    showToast(`Joining date reminder dispatched to ${rec.candidateName}.`);
  };

  // Export report
  const handleExportReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Offer ID,Candidate,Company,Job,CTC,Status,Joining Date"].concat(
        offers.map(o => `"${o.id}","${o.candidateName}","${o.companyName}","${o.jobTitle}","${o.compensation?.totalCTC}","${o.status}","${o.joiningDate}"`)
      ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `campuscore_offers_report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Placement offer report exported successfully.");
  };

  return (
    <DashboardLayout roleKey="officer">
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Toast banner */}
        {notificationMsg && (
          <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 1000, backgroundColor: '#0F172A', color: '#FFFFFF', padding: '12px 18px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
            <CheckCircle2 size={16} color="#34D399" />
            <span>{notificationMsg}</span>
          </div>
        )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Layer 12
                </span>
                <span className="text-xs text-slate-400 font-semibold">•</span>
                <span className="text-xs font-semibold text-slate-500">Placement Lifecycle Operations</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Offers & Documents
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Track final selections, offer acceptance, document verification and joining progress from one workspace.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={handleExportReport}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              <button
                onClick={() => setRequestDocOffer(offers[0] || null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors"
              >
                <FileCheck className="w-4 h-4" />
                <span>Request Documents</span>
              </button>
              <button
                onClick={() => setIsWizardOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Offer</span>
              </button>
            </div>
          </div>

          {/* Sub-navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-200 -mb-px text-xs font-semibold">
            <button
              onClick={() => setActiveTab('offers')}
              className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'offers'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Offers Pipeline</span>
              <span className="text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full">
                {offers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'documents'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Document Verification</span>
              <span className="text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.2 rounded-full font-bold">
                {documents.filter(d => d.status === 'Under Review').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('joining')}
              className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'joining'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Joining Tracker</span>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                {joiningRecords.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Analytics Preview</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          <div 
            onClick={() => { setActiveTab('offers'); setPipelineFilter('Final Selected'); }}
            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-blue-400 transition-colors"
          >
            <span className="text-[11px] font-medium text-slate-500 block truncate">Final Selected</span>
            <div className="text-xl font-bold text-slate-900 mt-1">42</div>
            <span className="text-[10px] text-blue-600 font-semibold">From Layer 10</span>
          </div>

          <div 
            onClick={() => { setActiveTab('offers'); setPipelineFilter('All'); }}
            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-blue-400 transition-colors"
          >
            <span className="text-[11px] font-medium text-slate-500 block truncate">Offers Gen.</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{stats?.offersGenerated || 38}</div>
            <span className="text-[10px] text-slate-400">Total Created</span>
          </div>

          <div 
            onClick={() => { setActiveTab('offers'); setPipelineFilter('Sent'); }}
            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-blue-400 transition-colors"
          >
            <span className="text-[11px] font-medium text-slate-500 block truncate">Offers Sent</span>
            <div className="text-xl font-bold text-blue-600 mt-1">{stats?.offersSent || 36}</div>
            <span className="text-[10px] text-slate-400">Candidate Mailbox</span>
          </div>

          <div 
            onClick={() => { setActiveTab('offers'); setPipelineFilter('Accepted'); }}
            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-emerald-400 transition-colors"
          >
            <span className="text-[11px] font-medium text-slate-500 block truncate">Accepted</span>
            <div className="text-xl font-bold text-emerald-600 mt-1">{stats?.offersAccepted || 29}</div>
            <span className="text-[10px] text-emerald-600 font-medium">80.6% Conversion</span>
          </div>

          <div 
            onClick={() => { setActiveTab('offers'); setPipelineFilter('Sent'); }}
            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-amber-400 transition-colors"
          >
            <span className="text-[11px] font-medium text-slate-500 block truncate">Pending Resp.</span>
            <div className="text-xl font-bold text-amber-600 mt-1">{stats?.pendingResponse || 7}</div>
            <span className="text-[10px] text-slate-400">Active Windows</span>
          </div>

          <div 
            onClick={() => { setActiveTab('documents'); }}
            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-amber-400 transition-colors"
          >
            <span className="text-[11px] font-medium text-slate-500 block truncate">Docs Pending</span>
            <div className="text-xl font-bold text-amber-600 mt-1">{docStats?.pendingVerification || 11}</div>
            <span className="text-[10px] text-amber-600 font-medium">Action Required</span>
          </div>

          <div 
            onClick={() => { setActiveTab('documents'); }}
            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-emerald-400 transition-colors"
          >
            <span className="text-[11px] font-medium text-slate-500 block truncate">Verified</span>
            <div className="text-xl font-bold text-emerald-600 mt-1">{docStats?.verified || 24}</div>
            <span className="text-[10px] text-slate-400">Cleared Checks</span>
          </div>

          <div 
            onClick={() => { setActiveTab('joining'); }}
            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-indigo-400 transition-colors"
          >
            <span className="text-[11px] font-medium text-slate-500 block truncate">Joining Conf.</span>
            <div className="text-xl font-bold text-indigo-600 mt-1">{joiningStats?.confirmed || 18}</div>
            <span className="text-[10px] text-indigo-600 font-medium">Ready for Day 1</span>
          </div>
        </div>

        {/* TAB 1: OFFERS PIPELINE & TABLE */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <OfferPipeline 
              pipelineData={pipelineData} 
              activeFilter={pipelineFilter}
              onSelectStage={(stage) => setPipelineFilter(stage)}
            />

            <OfferTable
              offers={offers}
              onView={(offer) => navigate(`/officer/offers/${offer.id}`)}
              onEdit={(offer) => {
                showToast(`Opening editor for Offer #${offer.id}`);
              }}
              onSend={handleSendOffer}
              onResend={handleResendOffer}
              onRequestDocuments={(offer) => setRequestDocOffer(offer)}
            />
          </div>
        )}

        {/* TAB 2: DOCUMENT VERIFICATION CENTER */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Document Verification Center</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review and verify candidate onboarding credentials before joining confirmation.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">
                  <strong className="text-slate-900">{documents.length}</strong> total documents tracked
                </span>
                <button
                  onClick={() => setRequestDocOffer(offers[0] || null)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  + Request New Document
                </button>
              </div>
            </div>

            <DocumentTable
              documents={documents}
              onReview={(doc) => setReviewingDoc(doc)}
              onVerify={(id) => handleVerifyDocument(id, 'Verified by Placement Cell')}
              onReject={(doc) => setReviewingDoc(doc)}
            />
          </div>
        )}

        {/* TAB 3: JOINING TRACKER */}
        {activeTab === 'joining' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Joining Tracker & Onboarding Operations</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track candidates from accepted offer to successful office reporting and induction.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{joiningStats?.confirmed || 18} Confirmed for 2026/27</span>
                </span>
              </div>
            </div>

            <JoiningTable
              records={joiningRecords}
              onUpdateStatus={(rec) => setUpdatingJoining(rec)}
              onSendReminder={handleSendJoiningReminder}
              onViewRecord={(rec) => navigate(`/officer/offers/${rec.offerId}`)}
            />
          </div>
        )}

        {/* TAB 4: ANALYTICS PREVIEW (LAYER 13 READY) */}
        {activeTab === 'analytics' && (
          <OfferAnalytics
            offerStats={stats}
            docStats={docStats}
            joiningStats={joiningStats}
          />
        )}
      </div>

      {/* CREATE OFFER WIZARD MODAL */}
      {isWizardOpen && (
        <OfferWizard
          onClose={() => setIsWizardOpen(false)}
          onOfferCreated={handleCreateOffer}
        />
      )}

      {/* DOCUMENT REVIEW MODAL */}
      {reviewingDoc && (
        <DocumentReviewModal
          document={reviewingDoc}
          onVerify={handleVerifyDocument}
          onReject={handleRejectDocument}
          onClose={() => setReviewingDoc(null)}
        />
      )}

      {/* DOCUMENT REQUEST MODAL */}
      {requestDocOffer && (
        <DocumentRequestModal
          offer={requestDocOffer}
          onRequestSuccess={handleDocumentRequestSuccess}
          onClose={() => setRequestDocOffer(null)}
        />
      )}

      {/* JOINING UPDATE MODAL */}
      {updatingJoining && (
        <JoiningUpdateModal
          record={updatingJoining}
          onUpdateSuccess={handleUpdateJoiningStatus}
          onClose={() => setUpdatingJoining(null)}
        />
      )}
      </div>
    </DashboardLayout>
  );
}
