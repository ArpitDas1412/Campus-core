import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Award,
  CheckCircle2,
  Lock,
  FileText
} from 'lucide-react';
import Modal from './Modal';

export default function Footer({ onOpenAbout }) {
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | 'contact' | 'security'

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer
        style={{
          backgroundColor: '#101B36',
          color: '#CBD5E1',
          paddingTop: '80px',
          paddingBottom: '40px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '250px',
            background: 'radial-gradient(ellipse at top, rgba(57, 120, 246, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Main Footer Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '48px',
              paddingBottom: '60px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Col 1: Brand & Mission */}
            <div style={{ maxWidth: '320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #3978F6 0%, #36C5E8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  <GraduationCap size={22} />
                </div>
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Campus<span style={{ color: '#36C5E8' }}>Core</span>
                </span>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: '#94A3B8',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}
              >
                Bridging Campus Talent with Corporate Opportunities through AI-powered placement management,
                resume intelligence, and real-time recruitment analytics.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#34D399',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981'
                    }}
                  />
                  Placement System Operational
                </span>
              </div>
            </div>

            {/* Col 2: Navigation & Product */}
            <div>
              <h4
                style={{
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 700,
                  marginBottom: '20px',
                  letterSpacing: '0.02em'
                }}
              >
                PLATFORM
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <li>
                  <button
                    onClick={() => scrollToSection('features')}
                    style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#36C5E8')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    Core Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#36C5E8')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('impact')}
                    style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#36C5E8')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    Trust & Impact Statistics
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (onOpenAbout) onOpenAbout();
                      else scrollToSection('about');
                    }}
                    style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#36C5E8')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    About CampusCore
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Portal Access Roles */}
            <div>
              <h4
                style={{
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 700,
                  marginBottom: '20px',
                  letterSpacing: '0.02em'
                }}
              >
                ROLE ACCESS
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <li>
                  <Link
                    to="/login?role=student"
                    style={{ color: '#94A3B8', transition: 'color 0.2s' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login?role=officer"
                    style={{ color: '#94A3B8', transition: 'color 0.2s' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    Placement Officer Hub
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login?role=recruiter"
                    style={{ color: '#94A3B8', transition: 'color 0.2s' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    Corporate Recruiter Portal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login?role=admin"
                    style={{ color: '#94A3B8', transition: 'color 0.2s' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    College Administrator Console
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal & Contact */}
            <div>
              <h4
                style={{
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 700,
                  marginBottom: '20px',
                  letterSpacing: '0.02em'
                }}
              >
                COMPLIANCE & CONTACT
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#36C5E8')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    <ShieldCheck size={14} /> Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('terms')}
                    style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#36C5E8')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    <FileText size={14} /> Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('contact')}
                    style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#36C5E8')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    <Mail size={14} /> Contact Placement Desk
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              paddingTop: '28px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              fontSize: '13.5px',
              color: '#64748B'
            }}
          >
            <div>
              Copyright © 2026 <span style={{ color: '#FFFFFF', fontWeight: 600 }}>CampusCore</span>. All rights reserved.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span>National Hackathon Layer 1 Foundation</span>
              <span>•</span>
              <span style={{ color: '#94A3B8' }}>Version 1.0.0-PRO</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PRIVACY POLICY MODAL */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title="Privacy Policy"
        subtitle="Last Updated: October 2026"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '15px', color: '#101B36', marginBottom: '6px' }}>1. Data Protection & Student Privacy</h4>
            <p style={{ color: '#475569', fontSize: '13.5px' }}>
              CampusCore safeguards all student academic transcripts, placement resumes, verification records, and
              corporate recruitment communications with 256-bit TLS encryption at rest and in transit.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '15px', color: '#101B36', marginBottom: '6px' }}>2. Role-Based Data Isolation</h4>
            <p style={{ color: '#475569', fontSize: '13.5px' }}>
              Recruiters may only access resumes of candidates who have explicitly opted into their verified recruitment drive.
              College Placement Cells retain sovereign governance over student eligibility thresholds.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '15px', color: '#101B36', marginBottom: '6px' }}>3. AI Ethical Processing</h4>
            <p style={{ color: '#475569', fontSize: '13.5px' }}>
              Our matching algorithms evaluate strictly objective skills, verified projects, and academic benchmarks
              without demographic bias.
            </p>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
          >
            I Understand
          </button>
        </div>
      </Modal>

      {/* TERMS & CONDITIONS MODAL */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title="Terms & Conditions"
        subtitle="Platform Guidelines & Hackathon Usage"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '15px', color: '#101B36', marginBottom: '6px' }}>1. Permitted Use</h4>
            <p style={{ color: '#475569', fontSize: '13.5px' }}>
              CampusCore is an enterprise recruitment management platform designed for educational institutions,
              students, and verified corporate hiring partners.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '15px', color: '#101B36', marginBottom: '6px' }}>2. Authentication Integrity</h4>
            <p style={{ color: '#475569', fontSize: '13.5px' }}>
              Users must log in using authorized role credentials. Demo credentials provided in Layer 1 are designed
              for evaluation and testing of role workflows.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '15px', color: '#101B36', marginBottom: '6px' }}>3. Academic Placement Policy</h4>
            <p style={{ color: '#475569', fontSize: '13.5px' }}>
              All placement offers and acceptances issued through CampusCore conform to institutional placement cell guidelines.
            </p>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
          >
            Accept & Continue
          </button>
        </div>
      </Modal>

      {/* CONTACT DESK MODAL */}
      <Modal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        title="CampusCore Placement Helpdesk"
        subtitle="Get in touch with the Institutional Support Team"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '16px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail style={{ color: '#3978F6' }} size={18} />
              <div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Corporate Inquiries</div>
                <div style={{ fontWeight: 600, color: '#101B36' }}>partnerships@campuscore.edu</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone style={{ color: '#36C5E8' }} size={18} />
              <div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>T&P Central Helpline</div>
                <div style={{ fontWeight: 600, color: '#101B36' }}>+91 (020) 2590-8800</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin style={{ color: '#101B36' }} size={18} />
              <div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Campus Placement Headquarters</div>
                <div style={{ fontWeight: 600, color: '#101B36' }}>University Innovation Park, Block C</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
