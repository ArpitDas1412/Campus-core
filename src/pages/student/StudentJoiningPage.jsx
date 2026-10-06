import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, CheckCircle2, Clock, MapPin, Building2, User, 
  FileCheck, ArrowRight, ShieldCheck, Phone, Mail
} from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { joiningService } from '../../services/joiningService';
import { offerService } from '../../services/offerService';
import JoiningTimeline from '../../components/joining/JoiningTimeline';

export default function StudentJoiningPage() {
  const [joiningRecord, setJoiningRecord] = useState(null);
  const [offer, setOffer] = useState(null);

  // Student Rahul Kumar
  const candidateId = 'CL-2027-0042';

  useEffect(() => {
    const studentOffers = offerService.getOffersByCandidate(candidateId);
    const activeOffer = studentOffers[0] || offerService.getOffers()[0];
    setOffer(activeOffer);

    const records = joiningService.getJoiningRecords();
    const studentRecord = records.find(r => r.candidateId === candidateId || r.offerId === activeOffer?.id) || records[0];
    setJoiningRecord(studentRecord);
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
                  Onboarding & Day 1
                </span>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>• Layer 12 Tracker</span>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                My Joining & Onboarding
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
                Onboarding timeline, reporting venue, Day 1 checklist, and corporate induction orientation.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/student/offers"
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
                  textDecoration: 'none'
                }}
              >
                <span>View Offer</span>
              </Link>
              <Link
                to="/student/documents"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <span>View Documents</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Onboarding Timeline Stepper with Countdown */}
          <JoiningTimeline joiningRecord={joiningRecord} offer={offer} />

          {/* Detailed Onboarding Guide */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {/* Left Col: Reporting Instructions */}
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={20} color="#3978F6" />
                  <span>Day 1 Reporting & Induction Guide</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                  <div style={{ padding: '14px 16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <strong style={{ display: 'block', color: '#101B36', fontSize: '14px', marginBottom: '4px' }}>Arrival & Security Badge</strong>
                    <p style={{ margin: 0 }}>
                      Please arrive by <strong>{joiningRecord?.joiningTime || '09:30 AM'} IST</strong> at the TechNova Bangalore Campus, Tower B Security Lobby. Present your government photo ID and placement offer letter at the reception desk to claim your visitor badge.
                    </p>
                  </div>

                  <div style={{ padding: '14px 16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <strong style={{ display: 'block', color: '#101B36', fontSize: '14px', marginBottom: '4px' }}>Orientation Schedule</strong>
                    <p style={{ margin: 0 }}>
                      Day 1 includes IT asset distribution (laptop, access keys), corporate orientation, meet-and-greet with engineering team leadership, and HR benefits walkthrough.
                    </p>
                  </div>

                  <div style={{ padding: '14px 16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <strong style={{ display: 'block', color: '#101B36', fontSize: '14px', marginBottom: '4px' }}>Dress Code & Guidelines</strong>
                    <p style={{ margin: 0 }}>
                      Business casual. Lunch and refreshments will be provided during the campus induction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checklist of what to bring */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileCheck size={20} color="#10B981" />
                  <span>Physical Documents to Carry on Day 1</span>
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#10B981" />
                    <span>Original Government Photo ID (Aadhaar or Passport)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#10B981" />
                    <span>Original 10th & 12th standard marksheets for physical verification</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#10B981" />
                    <span>Degree Completion Certificate / Provisional Degree</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#10B981" />
                    <span>2 Passport sized color photographs</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Col: Point of Contact & Venue */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={20} color="#3978F6" />
                  <span>Reporting Venue</span>
                </h3>
                <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                  <strong style={{ color: '#101B36', display: 'block', fontSize: '14px' }}>TechNova Bangalore HQ</strong>
                  <p style={{ margin: '4px 0 12px' }}>
                    Tower B, 4th Floor, Tech Innovation Park, Outer Ring Road, Bellandur, Bangalore 560103.
                  </p>
                  <div style={{ padding: '10px 12px', backgroundColor: '#EFF6FF', borderRadius: '8px', border: '1px solid #BFDBFE', fontSize: '12px', color: '#1D4ED8', fontWeight: 600 }}>
                    Landmark: Near EcoSpace Tech Park Gate 2
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={20} color="#7C3AED" />
                  <span>HR Point of Contact</span>
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
                    AM
                  </div>
                  <div>
                    <strong style={{ color: '#101B36', display: 'block', fontSize: '14px' }}>Ananya Mehta</strong>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>Talent Acquisition Manager</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} color="#64748B" />
                    <span>ananya.m@technova.demo</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} color="#64748B" />
                    <span>+91 98450 12890</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
