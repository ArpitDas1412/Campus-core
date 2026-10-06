import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/landing/HeroSection';
import LiveLayersNavigator from '../components/landing/LiveLayersNavigator';
import Layer10ShowcaseSection from '../components/landing/Layer10ShowcaseSection';
import ImpactSection from '../components/landing/ImpactSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import RolesSection from '../components/landing/RolesSection';
import AboutSection from '../components/landing/AboutSection';
import Footer from '../components/common/Footer';
import Modal from '../components/common/Modal';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Navigation */}
      <Navbar onOpenAbout={() => setAboutModalOpen(true)} />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        {/* B. Hero Section */}
        <HeroSection onExploreClick={handleExploreClick} />

        {/* Live Operational Layers 1-10 Navigator */}
        <LiveLayersNavigator />

        {/* Layer 10 Spotlight: Conflict-Aware Drive Scheduler & Sandbox */}
        <Layer10ShowcaseSection />

        {/* C. Trust & Impact Section */}
        <ImpactSection />

        {/* D. Features Section */}
        <FeaturesSection onSelectFeature={(feat) => setSelectedFeature(feat)} />

        {/* E. How It Works */}
        <HowItWorksSection />

        {/* F. User Role Section */}
        <RolesSection />

        {/* About Section */}
        <AboutSection />
      </main>

      {/* G. Footer */}
      <Footer onOpenAbout={() => setAboutModalOpen(true)} />

      {/* Feature Detail Modal */}
      <Modal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature?.title || 'Feature Architecture'}
        subtitle={selectedFeature?.subtitle}
      >
        {selectedFeature && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: selectedFeature.bgGlow,
                border: `1px solid ${selectedFeature.accentColor}33`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: selectedFeature.accentColor,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <selectedFeature.icon size={22} />
              </div>
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: selectedFeature.accentColor
                  }}
                >
                  {selectedFeature.tag}
                </span>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#101B36' }}>
                  Enterprise Placement Module
                </div>
              </div>
            </div>

            <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
              {selectedFeature.description}
            </p>

            <div
              style={{
                padding: '12px 16px',
                backgroundColor: '#F8FAFD',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                fontSize: '13px',
                color: '#64748B'
              }}
            >
              <strong style={{ color: '#101B36' }}>Layers 1–10 Live Architecture:</strong> Fully operational with active demo accounts, student databases, AI resume parser, ATS compatibility, skill-gap analyzers, corporate recruiter portal, AI candidate matching, explainable fit scores, smart shortlisting, and conflict-aware drive scheduler.
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                onClick={() => {
                  setSelectedFeature(null);
                  navigate('/login');
                }}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Access Role Portals
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setSelectedFeature(null)}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* About Modal (from navbar/footer) */}
      <Modal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        title="About CampusCore"
        subtitle="AI-Powered Campus-to-Corporate Placement Platform"
        maxWidth="640px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
            CampusCore was conceptualized to resolve the critical communication gap between educational
            institutions and enterprise employers during campus hiring cycles.
          </p>

          <div
            style={{
              padding: '16px',
              backgroundColor: '#F1F5FB',
              borderRadius: '14px',
              border: '1px solid #E2E8F0'
            }}
          >
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', marginBottom: '8px' }}>
              Placement Architecture Overview (Layers 1–10 Operational):
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#334155' }}>
              <li>• <strong>Layer 1 (Complete):</strong> Role-Based Authentication & 4 Portals (Officer, Student, Recruiter, Dean).</li>
              <li>• <strong>Layer 2 (Complete):</strong> Placement Officer Command Center & Institutional KPIs.</li>
              <li>• <strong>Layer 3 (Complete):</strong> Student Readiness & 360° Profile System.</li>
              <li>• <strong>Layer 4 (Complete):</strong> AI-Powered Skill-Gap Analyzer & Readiness Roadmaps.</li>
              <li>• <strong>Layer 5 (Complete):</strong> AI Resume Intelligence & ATS Scoring.</li>
              <li>• <strong>Layer 6 (Complete):</strong> AI-Powered Recruiter & Company Portal (TechNova Solutions).</li>
              <li>• <strong>Layer 7 (Complete):</strong> AI-Powered Candidate Matching & Talent Discovery.</li>
              <li>• <strong>Layer 8 (Complete):</strong> Explainable AI Fit Scores & Match Intelligence.</li>
              <li>• <strong>Layer 9 (Complete):</strong> AI-Powered Smart Shortlisting & Decision Engine.</li>
              <li>• <strong>Layer 10 (Complete):</strong> Intelligent Placement Drive Scheduler & Conflict Management.</li>
            </ul>
          </div>

          <button
            onClick={() => setAboutModalOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Got it, Let's Explore
          </button>
        </div>
      </Modal>
    </div>
  );
}
