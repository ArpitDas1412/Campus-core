import React from 'react';
import { useNavigate } from 'react-router-dom';
import OfferStatusBadge from './OfferStatusBadge';
import {
  Building2,
  Calendar,
  MapPin,
  DollarSign,
  ChevronRight,
  Clock,
  Sparkles,
  FileCheck2
} from 'lucide-react';

export default function OfferCard({ offer, isStudent = false, onView }) {
  const navigate = useNavigate();

  const candidateName = offer?.candidateName || offer?.studentName || 'Candidate';
  const companyName = offer?.companyName || offer?.company || 'Company';
  const jobTitle = offer?.jobTitle || offer?.role || 'Software Engineer';
  const ctc = offer?.compensation?.totalCTC || `₹${offer?.packageLpa || '9.0'} LPA`;

  const defaultLink = isStudent ? `/student/offers/${offer?.id}` : `/officer/offers/${offer?.id}`;
  const handleViewClick = () => {
    if (typeof onView === 'function') {
      onView(offer);
    } else {
      navigate(defaultLink);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #E2E8F0',
        padding: '20px 24px',
        boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
      className="animate-fade-in"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#3978F6';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(57, 120, 246, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#E2E8F0';
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(16, 27, 54, 0.03)';
      }}
    >
      <div>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#EEF4FF',
                color: '#3978F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '16px',
                flexShrink: 0
              }}
            >
              {companyName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                {companyName}
              </h3>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#475569', margin: '2px 0 0' }}>
                {jobTitle}
              </p>
            </div>
          </div>

          <OfferStatusBadge status={offer.status} />
        </div>

        {/* Highlights Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            padding: '12px',
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            marginBottom: '16px'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>CTC Package</span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#047857' }}>{ctc}</span>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Location</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>
              {offer.location} ({offer.workMode || 'Hybrid'})
            </span>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Joining Date</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>
              {offer.joiningDate || '1 Dec 2026'}
            </span>
          </div>
        </div>

        {/* Expiry Warning or Accepted Banner */}
        {offer.status === 'Sent' && (
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#FEF3C7',
              borderRadius: '8px',
              border: '1px solid #FDE68A',
              fontSize: '12px',
              color: '#92400E',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '14px'
            }}
          >
            <Clock size={13} />
            <span>Respond before {offer.expiryDate || '25 October 2026'}</span>
          </div>
        )}

        {offer.status === 'Accepted' && (
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#ECFDF5',
              borderRadius: '8px',
              border: '1px solid #A7F3D0',
              fontSize: '12px',
              color: '#065F46',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '14px'
            }}
          >
            <Sparkles size={13} />
            <span>Offer Accepted ✓ Joining confirmed for {offer.joiningDate}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div
        style={{
          borderTop: '1px solid #F1F5F9',
          paddingTop: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>
          Offer #{offer.id}
        </span>
        <button
          onClick={handleViewClick}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3978F6',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background-color 0.15s ease'
          }}
        >
          <span>View Offer Details</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
