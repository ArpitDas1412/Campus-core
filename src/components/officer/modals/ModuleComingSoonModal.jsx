import React from 'react';
import Modal from '../../common/Modal';
import {
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Bot
} from 'lucide-react';

export default function ModuleComingSoonModal({
  isOpen,
  onClose,
  moduleKey,
  moduleTitle,
  layerNumber = 3
}) {
  const layerDetails = {
    students: {
      layer: 3,
      title: 'Student Profile & AI Readiness Engine',
      description: 'Granular student profiles, automated resume ATS parsing, verifiable credential portfolios, and continuous readiness scores.',
      highlights: [
        'Automated Resume ATS Scoring & Keyword Extraction',
        'Deep Skill Taxonomy & Verifiable GitHub/LeetCode Sync',
        'Batch Profile Verification & Multi-Format PDF Export'
      ]
    },
    recruiters: {
      layer: 6,
      title: 'Enterprise Recruiter Portal & Job Management',
      description: 'Dedicated portal for corporate partners to submit JDs, define custom hiring workflows, and track university shortlists.',
      highlights: [
        'Multi-Tier Job Requisition & Slot Allocation',
        'Recruiter Dashboard with ATS Applicant Ranking',
        'Direct Candidate Messaging & Instant Offer Issuance'
      ]
    },
    drives: {
      layer: 7,
      title: 'Autonomous Placement Drive Operations',
      description: 'End-to-end management of campus placement seasons, online assessment links, batch eligibility filters, and slot schedules.',
      highlights: [
        'One-Click Batch Eligibility Rule Engine',
        'Automated Hall-Ticket & Slot Generation',
        'Live Multi-Round Shortlisting Management'
      ]
    },
    'ai-matching': {
      layer: 8,
      title: 'Semantic AI Candidate-to-Job Matching Engine',
      description: 'High-dimensional embedding models matching student resumes to incoming job descriptions with explainable AI match scores.',
      highlights: [
        'Semantic JD Compatibility & Skill Gap Heatmaps',
        'Explainable Match Reasoning for Placement Officers',
        'Bias-Mitigated Algorithmic Candidate Shortlists'
      ]
    },
    scheduling: {
      layer: 9,
      title: 'Exam-Aware Intelligent Interview Scheduler',
      description: 'Automated clash-free scheduling engine synchronizing academic timetables, recruiter timezones, and panel availability.',
      highlights: [
        'Zero-Conflict Timetable Sync (College Exams vs Interviews)',
        'Panelist Capacity & Slot Reservation Workflows',
        'Calendar Invites with Google Meet & Teams Integration'
      ]
    },
    offers: {
      layer: 11,
      title: 'Offer Tracker & Dream/Non-Dream Policy Engine',
      description: 'Centralized offer letter vault with automated compliance checking against institutional one-student-one-offer placement policies.',
      highlights: [
        'Offer Letter Parsing & CTC Verification',
        'Tier-1/Dream/Super-Dream Policy Automation',
        'Digital Candidate Acceptance Signatures'
      ]
    },
    analytics: {
      layer: 12,
      title: 'Executive Institutional Analytics & Forecasting',
      description: 'Predictive placement rate models, historic trend comparisons, salary trajectory charts, and recruiter satisfaction benchmarks.',
      highlights: [
        'Predictive Placement Rate Forecasts for Ongoing Season',
        'Salary Quartile Breakdown & Sector-Wise Hiring Trends',
        'Executive PDF Exporter with Instant NAAC/NIRF Tables'
      ]
    },
    'at-risk': {
      layer: 13,
      title: 'Early Warning & Remedial Intervention Module',
      description: 'AI detection system flagging students at risk of non-placement early in the cycle with personalized upskilling roadmaps.',
      highlights: [
        'At-Risk Candidate Identification via ML Classifier',
        'Targeted Coding & Aptitude Remediation Cohorts',
        'Faculty Mentor Assignment & Progress Logs'
      ]
    },
    notifications: {
      layer: 14,
      title: 'Omnichannel Notification & Alert System',
      description: 'Real-time multi-channel delivery of placement drives, test deadlines, and shortlists via Email, SMS, and WhatsApp.',
      highlights: [
        'Priority Push Alerts for Urgent Drive Deadlines',
        'Batch Notification Dispatch to Targeted Student Cohorts',
        'Delivery Status & Open-Rate Analytics'
      ]
    },
    settings: {
      layer: 15,
      title: 'Institutional Configuration & Access Governance',
      description: 'Placement cell policy configuration, role-based access control, institutional branding, and API key management.',
      highlights: [
        'Custom Placement Policy & Eligibility Thresholds',
        'Role-Based Multi-Department Access Delegation',
        'Audit Logging & Security Compliance Controls'
      ]
    }
  };

  const current = layerDetails[moduleKey] || {
    layer: layerNumber,
    title: moduleTitle || 'Advanced CampusCore Module',
    description: 'This intelligent placement capability is part of the 15-layer hackathon architecture and is scheduled for deployment in upcoming layers.',
    highlights: [
      'Seamless data continuity from Layer 2 Command Center',
      'Unified student and recruiter database integration',
      'Full compliance with university placement standards'
    ]
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${moduleTitle || current.title}`}
      subtitle={`Layer ${current.layer} Architecture Module Roadmap`}
      maxWidth="600px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Banner with Layer Tag */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#F8FAFD',
            borderRadius: '16px',
            border: '1.5px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#EEF4FF',
              color: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Layers size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                {current.title}
              </h4>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid #BFDBFE'
                }}
              >
                LAYER {current.layer}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
              {current.description}
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#64748B',
              letterSpacing: '0.05em',
              marginBottom: '10px'
            }}
          >
            Engineered Capabilities Coming in Layer {current.layer}:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {current.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  fontSize: '13px',
                  color: '#334155'
                }}
              >
                <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ padding: '9px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700 }}
          >
            Return to Command Center
          </button>
        </div>
      </div>
    </Modal>
  );
}
