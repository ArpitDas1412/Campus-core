import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Send, Eye, FileCheck, CheckCircle2, 
  Calendar, MapPin, Building2, User, DollarSign, Clock, ShieldCheck, History
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import { offerService } from '../../services/offerService';
import { documentService } from '../../services/documentService';
import { joiningService } from '../../services/joiningService';
import OfferStatusBadge from '../../components/offers/OfferStatusBadge';
import AcceptanceTimeline from '../../components/offers/AcceptanceTimeline';
import OfferPreview from '../../components/offers/OfferPreview';
import DocumentRequestModal from '../../components/documents/DocumentRequestModal';

export default function RecruiterOfferDetailPage() {
  const { offerId } = useParams();
  const navigate = useNavigate();

  const [offer, setOffer] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [joiningRecord, setJoiningRecord] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [requestDocOpen, setRequestDocOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const loadData = () => {
    const all = offerService.getOffers();
    const found = all.find(o => o.id === offerId) || all[0];
    setOffer(found);
    if (found) {
      setDocuments(documentService.getDocumentsByOffer(found.id));
      setJoiningRecord(joiningService.getJoiningRecords().find(j => j.offerId === found.id) || null);
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
      <RecruiterLayout>
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
          <p>Offer not found.</p>
          <Link to="/recruiter/offers" style={{ color: '#2563EB', fontWeight: 600 }}>← Return to Offers</Link>
        </div>
      </RecruiterLayout>
    );
  }

  const handleResend = () => {
    offerService.resendOffer(offer.id, 'TechNova Recruiter');
    loadData();
    showToast(`Offer notification resent to ${offer.candidateName}.`);
  };

  const handleDocumentRequestSuccess = (data) => {
    documentService.createDocumentRequest(offer.candidateId, offer.id, data.documents, data.deadline);
    loadData();
    showToast('Additional onboarding credentials requested.');
  };

  return (
    <RecruiterLayout>
      {/* Toast */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            right: '32px',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: 600,
            zIndex: 99
          }}
        >
          <CheckCircle2 size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          to="/recruiter/offers"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#64748B',
            textDecoration: 'none',
            marginBottom: '12px'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Company Offers</span>
        </Link>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#64748B', fontSize: '13px' }}>#{offer.id}</span>
              <OfferStatusBadge status={offer.status} />
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>• Drive: {offer.jobId}</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', margin: '4px 0 2px' }}>
              {offer.candidateName} — {offer.jobTitle}
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Company: <strong style={{ color: '#1E293B' }}>{offer.companyName}</strong> • Offer Issued: {new Date(offer.offerDate).toLocaleDateString('en-IN')}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPreviewOpen(true)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#1E293B',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Eye size={14} color="#2563EB" />
              <span>Preview Offer Letter</span>
            </button>

            <button
              onClick={handleResend}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #BFDBFE',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Send size={14} />
              <span>Resend Reminder</span>
            </button>

            <button
              onClick={() => setRequestDocOpen(true)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#7C3AED',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FileCheck size={14} />
              <span>Request Documents</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Acceptance Timeline */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#2563EB" />
              <span>Offer Acceptance & Review Progress</span>
            </h3>
            <AcceptanceTimeline offer={offer} />
          </div>

          {/* Compensation Card */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DollarSign size={16} color="#059669" />
                <span>Authorized Compensation</span>
              </h3>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#059669', fontFamily: 'monospace' }}>
                {offer.compensation?.totalCTC || '₹9.2 LPA'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', backgroundColor: '#F8FAFC', padding: '14px', borderRadius: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', display: 'block' }}>Base Salary</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>{offer.compensation?.baseSalary || '₹7.8 LPA'}</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', display: 'block' }}>Variable Pay</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>{offer.compensation?.variablePay || '₹1.4 LPA'}</span>
              </div>
            </div>
          </div>

          {/* Documents status */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck size={16} color="#7C3AED" />
              <span>Onboarding Credentials Status</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {documents.map(d => (
                <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', border: '1px solid #F1F5F9', backgroundColor: '#FAFAFA', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={15} color="#3B82F6" />
                    <span style={{ fontWeight: 600, color: '#334155' }}>{d.type}</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: d.status === 'Verified' ? '#ECFDF5' : '#FEF3C7', color: d.status === 'Verified' ? '#065F46' : '#92400E' }}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Candidate Card */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
              Selected Candidate
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#2563EB', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                {offer.candidateName?.charAt(0) || 'R'}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#101B36', fontSize: '14.5px' }}>{offer.candidateName}</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>{offer.candidateId} • CSE</div>
                <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600, marginTop: '2px' }}>Layer 10 Final Selection Cleared ✓</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Joining Target:</span>
                <span style={{ fontWeight: 600, color: '#101B36' }}>{new Date(offer.joiningDate).toLocaleDateString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Location & Mode:</span>
                <span style={{ fontWeight: 600, color: '#101B36' }}>{offer.location} ({offer.workMode})</span>
              </div>
            </div>
          </div>

          {/* Audit Trail */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <History size={14} />
              <span>Offer Events</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              {(offer.auditLog || []).slice(-4).reverse().map((log, i) => (
                <div key={i} style={{ borderLeft: '2px solid #3B82F6', paddingLeft: '10px' }}>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{log.action}</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{log.actor} • {new Date(log.timestamp).toLocaleDateString('en-IN')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
    </RecruiterLayout>
  );
}
