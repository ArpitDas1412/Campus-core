import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Send, Eye, FileCheck, XCircle, CheckCircle2, 
  Clock, MapPin, Building2, User, DollarSign, Calendar, ShieldCheck, History, Bell
} from 'lucide-react';
import { offerService } from '../../services/offerService';
import { documentService } from '../../services/documentService';
import { joiningService } from '../../services/joiningService';
import OfferStatusBadge from '../../components/offers/OfferStatusBadge';
import AcceptanceTimeline from '../../components/offers/AcceptanceTimeline';
import OfferPreview from '../../components/offers/OfferPreview';
import DocumentRequestModal from '../../components/documents/DocumentRequestModal';
import DocumentReviewModal from '../../components/documents/DocumentReviewModal';
import JoiningStatusBadge from '../../components/joining/JoiningStatusBadge';
import JoiningUpdateModal from '../../components/joining/JoiningUpdateModal';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

export default function OfferDetailPage() {
  const { offerId } = useParams();
  const navigate = useNavigate();

  const [offer, setOffer] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [joiningRecord, setJoiningRecord] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [requestDocOpen, setRequestDocOpen] = useState(false);
  const [reviewingDoc, setReviewingDoc] = useState(null);
  const [updatingJoining, setUpdatingJoining] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const loadData = () => {
    const foundOffer = offerService.getOffer(offerId);
    if (!foundOffer) {
      // Fallback to first offer if ID not found
      const fallback = offerService.getOffers()[0];
      setOffer(fallback);
      if (fallback) {
        setDocuments(documentService.getDocumentsByOffer(fallback.id));
        setJoiningRecord(joiningService.getJoiningRecords().find(j => j.offerId === fallback.id) || null);
      }
    } else {
      setOffer(foundOffer);
      setDocuments(documentService.getDocumentsByOffer(foundOffer.id));
      setJoiningRecord(joiningService.getJoiningRecords().find(j => j.offerId === foundOffer.id) || null);
    }
  };

  useEffect(() => {
    loadData();
  }, [offerId]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-sm">
          <p className="text-sm text-slate-600 mb-4">Offer #{offerId} not found.</p>
          <Link to="/officer/offers" className="text-xs font-semibold text-blue-600 hover:underline">
            ← Return to Offers
          </Link>
        </div>
      </div>
    );
  }

  const handleResend = () => {
    offerService.resendOffer(offer.id, 'Placement Officer');
    loadData();
    showToast(`Offer reminder resent to ${offer.candidateName}.`);
  };

  const handleCancelOffer = () => {
    if (window.confirm(`Are you sure you want to cancel Offer #${offer.id}?`)) {
      offerService.cancelOffer(offer.id, 'Cancelled by Placement Officer', 'Placement Officer');
      loadData();
      showToast(`Offer #${offer.id} has been cancelled.`);
    }
  };

  const handleVerifyDocument = (docId, comment) => {
    documentService.verifyDocument(docId, 'Placement Officer', comment);
    loadData();
    showToast('Document verified successfully.');
  };

  const handleRejectDocument = (docId, reason, comment) => {
    documentService.rejectDocument(docId, reason, 'Placement Officer', comment);
    loadData();
    showToast('Document marked for resubmission.');
  };

  const handleDocumentRequestSuccess = (data) => {
    documentService.createDocumentRequest(offer.candidateId, offer.id, data.documents, data.deadline);
    loadData();
    showToast('Additional documents requested from candidate.');
  };

  const handleUpdateJoiningStatus = (recordId, newStatus, notes) => {
    joiningService.updateJoiningStatus(recordId, newStatus, 'Placement Officer', notes);
    loadData();
    showToast(`Joining status updated to ${newStatus}.`);
  };

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

      {/* Top Banner */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link
            to="/officer/offers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Offers & Documents</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 hidden sm:block">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sm font-bold text-slate-400">#{offer.id}</span>
                  <OfferStatusBadge status={offer.status} />
                  <span className="text-xs text-slate-400 font-semibold">•</span>
                  <span className="text-xs text-slate-500 font-medium">Drive ID: {offer.jobId}</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mt-1">
                  {offer.candidateName} — {offer.jobTitle}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">{offer.companyName}</span>
                  <span>•</span>
                  <span>Offer Date: {new Date(offer.offerDate).toLocaleDateString('en-IN')}</span>
                  <span>•</span>
                  <span className="text-amber-700 font-medium">Expires: {new Date(offer.expiryDate).toLocaleDateString('en-IN')}</span>
                </p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setPreviewOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-xs"
              >
                <Eye className="w-4 h-4" />
                <span>View Offer Letter</span>
              </button>
              <button
                onClick={handleResend}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Resend Notice</span>
              </button>
              <button
                onClick={() => setRequestDocOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors"
              >
                <FileCheck className="w-4 h-4" />
                <span>Request Documents</span>
              </button>
              {offer.status !== 'Cancelled' && (
                <button
                  onClick={handleCancelOffer}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Cancel Offer</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT 2 COLUMNS: PRIMARY WORKSPACE */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. ACCEPTANCE TIMELINE */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Offer Acceptance & Decision Timeline</span>
              </h3>
              <AcceptanceTimeline offer={offer} />
            </div>

            {/* 2. COMPENSATION BREAKDOWN */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Compensation Package & Structure</span>
                </h3>
                <span className="text-lg font-black text-emerald-600 font-mono">
                  {offer.compensation?.totalCTC || '₹9.2 LPA'}
                </span>
              </div>

              {/* CTC bar visualization */}
              <div className="space-y-2 mb-5">
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: '75%' }} title="Base Salary 75%" />
                  <div className="bg-blue-500 h-full" style={{ width: '15%' }} title="Variable Pay 15%" />
                  <div className="bg-purple-500 h-full" style={{ width: '10%' }} title="Benefits 10%" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    Base Salary: {offer.compensation?.baseSalary || '₹7.8 LPA'}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                    Performance Bonus: {offer.compensation?.variablePay || '₹1.4 LPA'}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                    Joining Bonus: {offer.compensation?.joiningBonus || 'Included'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Base Fixed</span>
                  <span className="font-semibold text-slate-900">{offer.compensation?.baseSalary || '₹7.8 LPA'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Variable / Performance</span>
                  <span className="font-semibold text-slate-900">{offer.compensation?.variablePay || '₹1.4 LPA'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Joining Bonus</span>
                  <span className="font-semibold text-slate-900">{offer.compensation?.joiningBonus || '₹50,000'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Standard Benefits</span>
                  <span className="font-semibold text-slate-900">Health + Term Cover</span>
                </div>
              </div>
            </div>

            {/* 3. DOCUMENTS CHECKLIST FOR THIS CANDIDATE */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-blue-600" />
                    <span>Candidate Verification Documents</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {documents.filter(d => d.status === 'Verified').length} of {documents.length} credentials cleared
                  </p>
                </div>
                <button
                  onClick={() => setRequestDocOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                >
                  + Add Document
                </button>
              </div>

              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg text-xs font-bold ${
                        doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                        doc.status === 'Under Review' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-900">{doc.type}</span>
                          {doc.required && (
                            <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded font-semibold border border-rose-200">
                              Required
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {doc.fileName || 'Pending candidate upload'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        doc.status === 'Under Review' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {doc.status}
                      </span>
                      {doc.fileName && (
                        <button
                          onClick={() => setReviewingDoc(doc)}
                          className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
                        >
                          Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. ONBOARDING & JOINING STATUS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Onboarding & Induction Roadmap</span>
                </h3>
                {joiningRecord && (
                  <button
                    onClick={() => setUpdatingJoining(true)}
                    className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
                  >
                    Update Onboarding State
                  </button>
                )}
              </div>

              {joiningRecord ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Joining Date</span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {new Date(joiningRecord.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="text-[11px] text-slate-500 block">Reporting: {joiningRecord.joiningTime || '09:30 AM'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Reporting Location</span>
                    <span className="font-semibold text-slate-900">{joiningRecord.location}</span>
                    <span className="text-[11px] text-slate-500 block">Mode: {joiningRecord.workMode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Current State</span>
                    <div className="mt-1">
                      <JoiningStatusBadge status={joiningRecord.status} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                  Onboarding logistics will be initialized automatically when the candidate accepts the offer.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: CANDIDATE INFO & AUDIT TRAIL */}
          <div className="space-y-6">
            {/* Candidate Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">
                Candidate Profile
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-base shadow-sm">
                  {offer.candidateName?.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{offer.candidateName}</h4>
                  <p className="text-xs text-slate-500">{offer.candidateId} • CSE</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">CGPA 8.7 • Fit Score 91%</p>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Layer 10 Result:</span>
                  <span className="font-semibold text-emerald-600">Final Round Passed ✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Employment Type:</span>
                  <span className="font-medium text-slate-800">{offer.employmentType || 'Full-time'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Probation Period:</span>
                  <span className="font-medium text-slate-800">{offer.probationPeriod || '6 months'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Notice Period:</span>
                  <span className="font-medium text-slate-800">{offer.noticePeriod || '30 days'}</span>
                </div>
              </div>
            </div>

            {/* Audit Trail */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span>Lifecycle Audit Trail</span>
              </h3>

              <div className="space-y-3 relative pl-4 border-l-2 border-slate-100 text-xs">
                {(offer.auditLog || []).slice(-5).reverse().map((log, idx) => (
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

            {/* Layer 11 Communications Notice */}
            <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-xs text-blue-900">
              <div className="flex items-center gap-2 font-bold text-blue-950 mb-1">
                <Bell className="w-4 h-4 text-blue-600" />
                <span>Connected to Layer 11</span>
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                All offer actions, reminders, and verification milestones automatically trigger notifications across Candidate, Recruiter, and Placement Cell channels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {previewOpen && (
        <OfferPreview
          offer={offer}
          onClose={() => setPreviewOpen(false)}
        />
      )}

      {requestDocOpen && (
        <DocumentRequestModal
          offer={offer}
          onRequestSuccess={handleDocumentRequestSuccess}
          onClose={() => setRequestDocOpen(false)}
        />
      )}

      {reviewingDoc && (
        <DocumentReviewModal
          document={reviewingDoc}
          onVerify={handleVerifyDocument}
          onReject={handleRejectDocument}
          onClose={() => setReviewingDoc(null)}
        />
      )}

      {updatingJoining && joiningRecord && (
        <JoiningUpdateModal
          record={joiningRecord}
          onUpdateSuccess={handleUpdateJoiningStatus}
          onClose={() => setUpdatingJoining(false)}
        />
      )}
      </div>
    </DashboardLayout>
  );
}
