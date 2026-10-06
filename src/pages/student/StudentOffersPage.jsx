import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Award, CheckCircle2, Clock, ChevronRight, FileCheck, Calendar } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { offerService } from '../../services/offerService';
import OfferCard from '../../components/offers/OfferCard';

export default function StudentOffersPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Student Rahul Kumar: CL-2027-0042
  const candidateId = 'CL-2027-0042';

  useEffect(() => {
    // Load student's offers
    const studentOffers = offerService.getOffersByCandidate(candidateId);
    setOffers(studentOffers || []);
    setLoading(false);
  }, []);

  return (
    <DashboardLayout roleKey="student">
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1.5px solid #E2E8F0',
            padding: '24px 28px',
            marginBottom: '24px',
            boxShadow: '0 4px 16px rgba(16, 27, 54, 0.04)'
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, color: '#1D4ED8', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
                  Placement Hub
                </span>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>• Layer 12 Tracker</span>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                My Official Placement Offers
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
                Review extended offers, compare CTC breakdowns, and formalize employment acceptances.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => navigate('/student/documents')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: '#F8FAFC',
                  color: '#334155',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <FileCheck size={14} style={{ color: '#2563EB' }} />
                <span>My Documents</span>
              </button>
              <button
                onClick={() => navigate('/student/joining')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: '#F8FAFC',
                  color: '#334155',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Calendar size={14} style={{ color: '#7C3AED' }} />
                <span>My Joining</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
              <p style={{ fontSize: '14px', color: '#64748B' }}>Retrieving official placement offers...</p>
            </div>
          ) : offers.length === 0 ? (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '48px 24px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(16, 27, 54, 0.04)',
                maxWidth: '520px',
                margin: '0 auto'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <Briefcase size={28} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', marginBottom: '6px' }}>
                No Active Employment Offers Yet
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
                When recruiters conclude final placement interview rounds and extend a formal offer letter, it will appear here for your review and acceptance.
              </p>
              <button
                onClick={() => navigate('/dashboard/student')}
                style={{
                  padding: '9px 18px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                View Placement Schedule & Applications
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', fontWeight: 700, padding: '0 4px', marginBottom: '14px' }}>
                <span>ACTIVE PLACEMENT OFFERS ({offers.length})</span>
                <span style={{ color: '#059669' }}>CONFIDENTIAL & VERIFIED</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                {offers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    isStudent={true}
                    onView={() => navigate(`/student/offers/${offer.id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
