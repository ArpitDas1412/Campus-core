import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  Clock,
  FileCheck,
  Send,
  Users,
  Search,
  Filter,
  DollarSign,
  Calendar,
  ExternalLink,
  ChevronRight,
  Eye,
  FileText,
  AlertCircle
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import { offerService } from '../../services/offerService';
import { documentService } from '../../services/documentService';
import { joiningService } from '../../services/joiningService';
import OfferStatusBadge from '../../components/offers/OfferStatusBadge';
import DocumentRequestModal from '../../components/documents/DocumentRequestModal';

export default function OffersPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [requestDocOffer, setRequestDocOffer] = useState(null);

  // Recruiter company: COMP-001 (TechNova Solutions)
  const companyId = 'COMP-001';

  const loadData = () => {
    const allOffers = offerService.getOffers();
    const companyOffers = allOffers.filter(o => o.companyId === companyId || o.companyName?.includes('TechNova'));
    setOffers(companyOffers);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendOffer = (offerId) => {
    offerService.sendOffer(offerId, 'TechNova Recruiter');
    loadData();
    showToast(`Offer #${offerId} dispatched to candidate.`);
  };

  const handleResendOffer = (offerId) => {
    offerService.resendOffer(offerId, 'TechNova Recruiter');
    loadData();
    showToast(`Offer notification resent for #${offerId}.`);
  };

  const handleDocumentRequestSuccess = (data) => {
    documentService.createDocumentRequest(data.candidateId, data.offerId, data.documents, data.deadline);
    loadData();
    showToast(`Onboarding documents requested from ${data.candidateName}.`);
  };

  const filteredOffers = offers.filter((o) => {
    const matchesTab = activeTab === 'All' || o.status === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (o.candidateName || o.studentName || '').toLowerCase().includes(q) ||
      (o.jobTitle || '').toLowerCase().includes(q) ||
      (o.id || '').toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  // Calculate recruiter KPIs
  const sentCount = offers.filter(o => o.status === 'Sent' || o.status === 'Accepted' || o.status === 'Viewed').length;
  const acceptedCount = offers.filter(o => o.status === 'Accepted').length;
  const pendingCount = offers.filter(o => o.status === 'Sent' || o.status === 'Viewed').length;
  const declinedCount = offers.filter(o => o.status === 'Declined').length;
  const docsPendingCount = offers.filter(o => o.status === 'Accepted').length; // candidates with docs in verification
  const joiningConfirmedCount = offers.filter(o => o.status === 'Accepted').length;

  return (
    <RecruiterLayout>
      {/* Toast */}
      {toastMessage && (
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
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#2563EB', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '4px', border: '1px solid #BFDBFE' }}>
              Layer 12
            </span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>TechNova Corporate Portal</span>
          </div>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#101B36',
              margin: '0 0 4px',
              letterSpacing: '-0.02em'
            }}
          >
            Offer Management
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
            Manage candidate offers, track acceptance, request verification documents, and monitor onboarding.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: '#10B981', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '6px 12px', borderRadius: '8px', fontWeight: 600 }}>
            ✓ Real-time Candidate Acceptance Sync
          </span>
        </div>
      </div>

      {/* 6 KPIs as per Section 44 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '14px',
          marginBottom: '24px'
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 18px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Offers Sent
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', marginTop: '4px' }}>
            {sentCount}
          </div>
          <div style={{ fontSize: '11px', color: '#3B82F6', marginTop: '2px' }}>
            Corporate quota
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 18px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Accepted
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
            {acceptedCount}
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', marginTop: '2px' }}>
            Confirmed candidates
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 18px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Pending
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>
            {pendingCount}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            Review window open
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 18px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Declined
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>
            {declinedCount}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            Opted out
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 18px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Docs Pending
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>
            {docsPendingCount}
          </div>
          <div style={{ fontSize: '11px', color: '#F59E0B', marginTop: '2px' }}>
            Verification cycle
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 18px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Joining Confirmed
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#6366F1', marginTop: '4px' }}>
            {joiningConfirmedCount}
          </div>
          <div style={{ fontSize: '11px', color: '#6366F1', marginTop: '2px' }}>
            Day 1 scheduled
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
          {['All', 'Accepted', 'Sent', 'Draft', 'Declined'].map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: isSelected ? '1px solid #3978F6' : '1px solid transparent',
                  backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                  color: isSelected ? '#2563EB' : '#64748B',
                  fontSize: '13px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94A3B8'
            }}
          />
          <input
            type="text"
            placeholder="Search candidate or offer ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Recruiter Offers Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 20px', fontWeight: 600 }}>Candidate</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Role & ID</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Compensation</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Joining Date</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '14px 20px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
                  No company offers found matching your filters.
                </td>
              </tr>
            ) : (
              filteredOffers.map((o) => (
                <tr
                  key={o.id}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    fontSize: '13.5px',
                    color: '#334155',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontWeight: 700, color: '#101B36' }}>{o.candidateName || o.studentName}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{o.candidateId || o.studentId} • CSE</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#1E293B' }}>{o.jobTitle}</div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>#{o.id}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 800, color: '#059669', fontFamily: 'monospace' }}>
                      {o.compensation?.totalCTC || o.packageLpa || '₹9.2 LPA'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      Base: {o.compensation?.baseSalary || '₹7.8 LPA'}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                      <Calendar size={13} color="#3B82F6" />
                      <span>{new Date(o.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{o.location} ({o.workMode})</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <OfferStatusBadge status={o.status} />
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        onClick={() => navigate(`/recruiter/offers/${o.id}`)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#1E293B',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>

                      {o.status === 'Draft' && (
                        <button
                          onClick={() => handleSendOffer(o.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#2563EB',
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Send size={13} />
                          <span>Send</span>
                        </button>
                      )}

                      {o.status === 'Sent' && (
                        <button
                          onClick={() => handleResendOffer(o.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px solid #BFDBFE',
                            backgroundColor: '#EFF6FF',
                            color: '#2563EB',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Resend
                        </button>
                      )}

                      {o.status === 'Accepted' && (
                        <button
                          onClick={() => setRequestDocOffer(o)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px solid #DDD6FE',
                            backgroundColor: '#F5F3FF',
                            color: '#7C3AED',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Request Docs
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Document Request Modal */}
      {requestDocOffer && (
        <DocumentRequestModal
          offer={requestDocOffer}
          onRequestSuccess={handleDocumentRequestSuccess}
          onClose={() => setRequestDocOffer(null)}
        />
      )}
    </RecruiterLayout>
  );
}
