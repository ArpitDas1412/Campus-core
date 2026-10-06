import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, XCircle, Clock, Building2, MapPin, 
  DollarSign, Calendar, FileCheck, Eye, ShieldCheck, AlertCircle, ArrowRight
} from 'lucide-react';
import { offerService } from '../../services/offerService';
import OfferStatusBadge from '../../components/offers/OfferStatusBadge';
import OfferPreview from '../../components/offers/OfferPreview';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

export default function StudentOfferDetailPage() {
  const { offerId } = useParams();
  const navigate = useNavigate();

  const [offer, setOffer] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [reviewedCheck, setReviewedCheck] = useState(false);
  const [declineReason, setDeclineReason] = useState('Another offer');
  const [otherDeclineReason, setOtherDeclineReason] = useState('');
  const [actionProcessing, setActionProcessing] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const loadOffer = () => {
    const found = offerService.getOffer(offerId) || offerService.getOffers()[0];
    setOffer(found);
  };

  useEffect(() => {
    loadOffer();
  }, [offerId]);

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-sm">
          <p className="text-sm text-slate-600 mb-4">Offer #{offerId} not found.</p>
          <Link to="/student/offers" className="text-xs font-semibold text-blue-600 hover:underline">
            ← Return to My Offers
          </Link>
        </div>
      </div>
    );
  }

  const isAccepted = offer.acceptance?.status === 'Accepted' || offer.status === 'Accepted';
  const isDeclined = offer.acceptance?.status === 'Declined' || offer.status === 'Declined';
  const isPending = !isAccepted && !isDeclined;

  const handleConfirmAccept = () => {
    if (!reviewedCheck) return;
    setActionProcessing(true);
    setTimeout(() => {
      offerService.acceptOffer(offer.id, offer.candidateName || 'Rahul Kumar');
      setActionProcessing(false);
      setShowAcceptModal(false);
      setActionSuccess('accepted');
      loadOffer();
    }, 600);
  };

  const handleConfirmDecline = () => {
    setActionProcessing(true);
    const finalReason = declineReason === 'Other' ? otherDeclineReason : declineReason;
    setTimeout(() => {
      offerService.declineOffer(offer.id, finalReason, offer.candidateName || 'Rahul Kumar');
      setActionProcessing(false);
      setShowDeclineModal(false);
      setActionSuccess('declined');
      loadOffer();
    }, 600);
  };

  return (
    <DashboardLayout roleKey="student">
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* Top Banner */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link
            to="/student/offers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Offers</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm">
                {offer.companyName?.charAt(0) || 'T'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">#{offer.id}</span>
                  <OfferStatusBadge status={offer.status} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
                  {offer.jobTitle}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="font-semibold text-slate-700">{offer.companyName}</span>
                  <span>•</span>
                  <span>Offer Extended: {new Date(offer.offerDate).toLocaleDateString('en-IN')}</span>
                  <span>•</span>
                  <span className="text-amber-700 font-medium">Expires: {new Date(offer.expiryDate).toLocaleDateString('en-IN')}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-xs"
              >
                <Eye className="w-4 h-4 text-blue-600" />
                <span>View Full Offer Letter</span>
              </button>

              {isAccepted && (
                <button
                  onClick={() => navigate('/student/documents')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>My Required Documents</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Post-Action Success Banner */}
        {actionSuccess === 'accepted' && (
          <div className="mb-6 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-950">
                    Congratulations! Your offer has been accepted.
                  </h3>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Your acceptance has been registered with {offer.companyName} and the Placement Office.
                  </p>
                  <p className="text-xs font-semibold text-emerald-900 mt-1">
                    Next step: Complete your document verification checklist.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/student/documents')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors whitespace-nowrap"
              >
                <span>View Required Documents</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {actionSuccess === 'declined' && (
          <div className="mb-6 p-4 bg-slate-100 border border-slate-300 rounded-2xl flex items-center gap-3 text-slate-700 text-xs">
            <XCircle className="w-5 h-5 text-slate-500" />
            <span>You have declined this placement offer. This decision has been communicated to the recruiter and recorded.</span>
          </div>
        )}

        {/* DECISION ACTION CALLOUT (IF PENDING) */}
        {isPending && (
          <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Decision Pending — Respond Before {new Date(offer.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Please review the terms of employment, compensation breakdown, and joining date below before confirming.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowDeclineModal(true)}
                className="px-4 py-2 text-xs font-semibold text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors"
              >
                Decline Offer
              </button>
              <button
                onClick={() => setShowAcceptModal(true)}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Accept Offer</span>
              </button>
            </div>
          </div>
        )}

        {/* MAIN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT 2 COLUMNS */}
          <div className="md:col-span-2 space-y-6">
            {/* 1. COMPENSATION CARD */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Annual Compensation Package</span>
                </h3>
                <span className="text-xl font-black text-emerald-600 font-mono">
                  {offer.compensation?.totalCTC || '₹9.2 LPA'}
                </span>
              </div>

              {/* CTC bar visualization */}
              <div className="space-y-2 mb-5">
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: '75%' }} title="Base Salary" />
                  <div className="bg-blue-500 h-full" style={{ width: '15%' }} title="Performance Bonus" />
                  <div className="bg-purple-500 h-full" style={{ width: '10%' }} title="Benefits" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Base: {offer.compensation?.baseSalary || '₹7.8 LPA'}</span>
                  <span>Variable: {offer.compensation?.variablePay || '₹1.4 LPA'}</span>
                  <span>Bonus: {offer.compensation?.joiningBonus || 'Included'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Fixed Base Salary</span>
                  <span className="font-bold text-slate-900 text-sm">{offer.compensation?.baseSalary || '₹7.8 LPA'}</span>
                  <span className="text-[10px] text-slate-400 block">Monthly disbursement</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Performance Variable</span>
                  <span className="font-bold text-slate-900 text-sm">{offer.compensation?.variablePay || '₹1.4 LPA'}</span>
                  <span className="text-[10px] text-slate-400 block">Annual evaluation</span>
                </div>
              </div>
            </div>

            {/* 2. EMPLOYMENT & ONBOARDING LOGISTICS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Role & Workplace Details</span>
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Joining Date</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5 text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    {new Date(offer.joiningDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Work Location & Mode</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5 text-sm">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {offer.location} ({offer.workMode})
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Employment Type</span>
                  <span className="font-semibold text-slate-800">{offer.employmentType || 'Full-time'}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Probation Term</span>
                  <span className="font-semibold text-slate-800">{offer.probationPeriod || '6 months'}</span>
                </div>
              </div>
            </div>

            {/* 3. REQUIRED DOCUMENTS PREVIEW */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-indigo-600" />
                  <span>Onboarding Verification Documents</span>
                </h3>
                <Link to="/student/documents" className="text-xs font-semibold text-blue-600 hover:underline">
                  Open Document Center →
                </Link>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                These credentials must be uploaded upon offer acceptance before final induction.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['10th Marksheet', '12th Marksheet', 'Semester Mark Sheets', 'Degree Certificate', 'Government ID', 'Resume'].map((doc) => (
                  <div key={doc} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">
                Current Status
              </h3>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-600">Decision</span>
                <OfferStatusBadge status={offer.status} />
              </div>

              {isAccepted && (
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold">Offer Accepted by Candidate</span>
                  </div>
                  <button
                    onClick={() => navigate('/student/joining')}
                    className="w-full py-2 px-3 text-xs font-semibold text-center text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
                  >
                    View Joining Roadmap →
                  </button>
                </div>
              )}

              {isDeclined && (
                <div className="p-3 bg-slate-100 text-slate-600 rounded-xl text-xs">
                  <span className="font-semibold block mb-0.5">Offer Declined</span>
                  <span>Reason recorded: {offer.acceptance?.declineReason || 'Declined'}</span>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900">
              <div className="flex items-center gap-2 font-bold text-amber-950 mb-1">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>CampusCore Demonstration Mode</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Demo document generated by CampusCore for placement lifecycle demonstration. Not a legally binding employment document.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ACCEPT OFFER MODAL */}
      {showAcceptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Accept this offer?</h3>
            <p className="text-xs text-slate-500 mb-4">
              Please review the employment terms before confirming your acceptance.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Company:</span>
                <span className="font-semibold text-slate-900">{offer.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Role:</span>
                <span className="font-semibold text-slate-900">{offer.jobTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Compensation (CTC):</span>
                <span className="font-bold text-emerald-600 font-mono">{offer.compensation?.totalCTC}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Joining Date:</span>
                <span className="font-semibold text-slate-900">{new Date(offer.joiningDate).toLocaleDateString('en-IN')}</span>
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 mb-5 select-none">
              <input
                type="checkbox"
                checked={reviewedCheck}
                onChange={(e) => setReviewedCheck(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <span className="font-medium">
                I confirm that I have reviewed the offer details and agree to submit required onboarding documents.
              </span>
            </label>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowAcceptModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAccept}
                disabled={!reviewedCheck || actionProcessing}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{actionProcessing ? 'Registering Acceptance...' : 'Confirm Acceptance'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DECLINE OFFER MODAL */}
      {showDeclineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Decline this offer?</h3>
            <p className="text-xs text-slate-500 mb-4">
              Please let us know your reason for declining (optional feedback for placement cell):
            </p>

            <div className="space-y-3 mb-5 text-xs">
              <select
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Another offer">Accepted Another Offer</option>
                <option value="Role mismatch">Role / Profile Mismatch</option>
                <option value="Compensation">Compensation Expectations</option>
                <option value="Location">Location Preference</option>
                <option value="Higher studies">Pursuing Higher Studies</option>
                <option value="Personal reason">Personal / Family Reasons</option>
                <option value="Other">Other Reason</option>
              </select>

              {declineReason === 'Other' && (
                <textarea
                  rows={2}
                  value={otherDeclineReason}
                  onChange={(e) => setOtherDeclineReason(e.target.value)}
                  placeholder="Optional details..."
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowDeclineModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleConfirmDecline}
                disabled={actionProcessing}
                className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
              >
                {actionProcessing ? 'Processing...' : 'Confirm Decline'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OFFER LETTER PREVIEW MODAL */}
      {previewOpen && (
        <OfferPreview
          offer={offer}
          onClose={() => setPreviewOpen(false)}
        />
      )}
      </div>
    </DashboardLayout>
  );
}
