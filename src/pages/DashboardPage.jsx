import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Briefcase,
  Building,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Clock,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  FileText,
  UserCheck,
  Award,
  AlertCircle,
  Building2,
  FileCheck2,
  Cpu,
  Users,
  Target
} from 'lucide-react';
import MyResumeCard from '../components/student/MyResumeCard';

export default function DashboardPage() {
  const { role } = useParams();
  const { user } = useAuth();

  const currentRole = role || user?.roleKey || 'student';

  if (currentRole === 'officer') {
    return <Navigate to="/officer/dashboard" replace />;
  }

  if (currentRole === 'recruiter') {
    return <Navigate to="/recruiter/dashboard" replace />;
  }

  return (
    <DashboardLayout roleKey={currentRole}>
      {/* 1. LAYER 1 STATUS BANNER */}
      <div
        style={{
          padding: '20px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.05)',
          marginBottom: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
        className="animate-fade-in"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
              flexShrink: 0
            }}
          >
            <Sparkles size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                CampusCore System Active: Welcome, {user?.name || 'Authorized User'}!
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}
              >
                ROLE: {user?.role || currentRole.toUpperCase()}
              </span>
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
                LAYERS 1–6 LIVE
              </span>
            </div>
            <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
              All 6 system layers are operational. Explore the AI Recruiter Portal, Resume Intelligence, Skill-Gap Analyzer, and 360° Profiles.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            to="/recruiter/dashboard"
            style={{
              padding: '8px 14px',
              backgroundColor: '#7C3AED',
              color: '#FFFFFF',
              borderRadius: '10px',
              fontSize: '12.5px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Building size={14} />
            <span>Open Recruiter Portal (L6)</span>
            <ArrowRight size={13} />
          </Link>
          <div
            style={{
              padding: '8px 14px',
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              fontSize: '12.5px',
              color: '#475569'
            }}
          >
            Connected to: <strong style={{ color: '#101B36' }}>{user?.orgName || 'Institutional Consortium'}</strong>
          </div>
        </div>
      </div>

      {/* 2. ROLE SPECIFIC DASHBOARD CONTENT */}
      {currentRole === 'student' && <StudentDashboardView user={user} />}
      {currentRole === 'officer' && <OfficerDashboardView user={user} />}
      {currentRole === 'recruiter' && <RecruiterDashboardView user={user} />}
      {currentRole === 'admin' && <AdminDashboardView user={user} />}

      {/* 3. 15-LAYER ARCHITECTURE ROADMAP PREVIEW */}
      <div
        style={{
          marginTop: '40px',
          padding: '28px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 16px rgba(16, 27, 54, 0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} style={{ color: '#3978F6' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#101B36', margin: 0 }}>
              CampusCore 15-Layer Implementation Architecture
            </h3>
          </div>
          <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 700 }}>
            ● Layers 1 to 6 Operational & Deployed
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px'
          }}
        >
          {/* Layer 1 */}
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              padding: '16px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '12px',
              display: 'block'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <CheckCircle2 size={15} style={{ color: '#10B981' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#065F46' }}>Layer 1 • Live</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>Auth & Design System</div>
            <div style={{ fontSize: '12px', color: '#047857', marginTop: '3px' }}>
              4 Roles, Demo logins, Design Tokens & Auth Context
            </div>
          </Link>

          {/* Layer 2 */}
          <Link
            to="/officer/dashboard"
            style={{
              textDecoration: 'none',
              padding: '16px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '12px',
              display: 'block'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <CheckCircle2 size={15} style={{ color: '#10B981' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#065F46' }}>Layer 2 • Live</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>Placement Officer Console</div>
            <div style={{ fontSize: '12px', color: '#047857', marginTop: '3px' }}>
              Operations KPIs, batch eligibility, drives & at-risk detection
            </div>
          </Link>

          {/* Layer 3 */}
          <Link
            to="/officer/students"
            style={{
              textDecoration: 'none',
              padding: '16px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '12px',
              display: 'block'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <CheckCircle2 size={15} style={{ color: '#10B981' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#065F46' }}>Layer 3 • Live</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>Student 360° Readiness</div>
            <div style={{ fontSize: '12px', color: '#047857', marginTop: '3px' }}>
              Full readiness profiles, verified credentials & cohort registry
            </div>
          </Link>

          {/* Layer 4 */}
          <Link
            to="/skill-gap"
            style={{
              textDecoration: 'none',
              padding: '16px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '12px',
              display: 'block'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <CheckCircle2 size={15} style={{ color: '#10B981' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#065F46' }}>Layer 4 • Live</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>AI Skill-Gap Analyzer</div>
            <div style={{ fontSize: '12px', color: '#047857', marginTop: '3px' }}>
              JD comparison engine, missing skill detection & roadmaps
            </div>
          </Link>

          {/* Layer 5 */}
          <Link
            to="/officer/resume-intelligence"
            style={{
              textDecoration: 'none',
              padding: '16px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '12px',
              display: 'block'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <CheckCircle2 size={15} style={{ color: '#10B981' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#065F46' }}>Layer 5 • Live</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>Resume Intelligence</div>
            <div style={{ fontSize: '12px', color: '#047857', marginTop: '3px' }}>
              AI parsing, ATS readiness scores & profile synchronization
            </div>
          </Link>

          {/* Layer 6 */}
          <Link
            to="/recruiter/dashboard"
            style={{
              textDecoration: 'none',
              padding: '16px',
              backgroundColor: '#F5F3FF',
              border: '1.5px solid #C4B5FD',
              borderRadius: '12px',
              display: 'block'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <CheckCircle2 size={15} style={{ color: '#7C3AED' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#6D28D9' }}>Layer 6 • Live</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>Recruiter & Company Portal</div>
            <div style={{ fontSize: '12px', color: '#6D28D9', marginTop: '3px' }}>
              TechNova hiring portal, drive creator, pipelines & offers
            </div>
          </Link>

          {/* Layer 7 */}
          <Link
            to="/recruiter/jobs/JOB-2027-001/matching"
            style={{
              textDecoration: 'none',
              padding: '16px',
              backgroundColor: '#FAF5FF',
              border: '1.5px solid #D8B4FE',
              borderRadius: '12px',
              display: 'block'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={15} style={{ color: '#9333EA' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#7E22CE' }}>Layer 7 • Live (New)</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>AI Candidate Matching</div>
            <div style={{ fontSize: '12px', color: '#7E22CE', marginTop: '3px' }}>
              Multi-vector ranking, skill matching, projects & resume signals
            </div>
          </Link>

          {/* Layer 8 */}
          <Link
            to="/recruiter/jobs/JOB-2027-001/matching/std-1"
            style={{
              textDecoration: 'none',
              padding: '16px',
              backgroundColor: '#FAF5FF',
              border: '1.5px solid #D8B4FE',
              borderRadius: '12px',
              display: 'block'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <CheckCircle2 size={15} style={{ color: '#7C3AED' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#7E22CE' }}>Layer 8 • Live</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>Explainable Fit Score</div>
            <div style={{ fontSize: '12px', color: '#7E22CE', marginTop: '3px' }}>
              XAI radar weights, factor explanations, gap breakdown & what-if simulator
            </div>
          </Link>

          {/* Layer 9 */}
          <Link
            to="/recruiter/jobs/JOB-2027-001/shortlisting"
            style={{
              textDecoration: 'none',
              padding: '16px',
              backgroundColor: '#ECFDF5',
              border: '1.5px solid #A7F3D0',
              borderRadius: '12px',
              display: 'block'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <CheckCircle2 size={15} style={{ color: '#059669' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#065F46' }}>Layer 9 • Live</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>Smart Shortlisting</div>
            <div style={{ fontSize: '12px', color: '#047857', marginTop: '3px' }}>
              Deterministic recommendation tiers, ratio management & recruiter overrides
            </div>
          </Link>

          {/* Layer 10 */}
          <Link
            to="/officer/scheduling"
            style={{
              textDecoration: 'none',
              padding: '16px',
              backgroundColor: '#EFF6FF',
              border: '1.5px solid #BFDBFE',
              borderRadius: '12px',
              display: 'block'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={15} style={{ color: '#2563EB' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#1E40AF' }}>Layer 10 • Live (New)</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>Drive Scheduler & Interviews</div>
            <div style={{ fontSize: '12px', color: '#1E40AF', marginTop: '3px' }}>
              Conflict-aware slot allocation, alternative recommendations & attendance
            </div>
          </Link>

          {/* Layer 11-15 */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#F8FAFD',
              border: '1px solid #E2E8F0',
              borderRadius: '12px'
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
              Layers 11–15 (Upcoming)
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>Communication & Offers</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>
              Communication Center, Offer Tracking & Institutional Analytics
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* =========================================================================
   ROLE VIEW 1: STUDENT
   ========================================================================= */
function StudentDashboardView({ user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Quick Launchpad to all 6 Layers */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 2px 10px rgba(16, 27, 54, 0.04)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} style={{ color: '#3978F6' }} />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
            Jump to System Layers:
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Link
            to="/student/schedule"
            style={{
              padding: '6px 12px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Calendar size={13} />
            <span>Layer 10: My Schedule</span>
          </Link>

          <Link
            to="/recruiter/jobs/JOB-2027-001/matching"
            style={{
              padding: '6px 12px',
              backgroundColor: '#FAF5FF',
              color: '#9333EA',
              border: '1px solid #E9D5FF',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={13} />
            <span>Layer 7: AI Matching</span>
          </Link>

          <Link
            to="/recruiter/dashboard"
            style={{
              padding: '6px 12px',
              backgroundColor: '#F5F3FF',
              color: '#7C3AED',
              border: '1px solid #DDD6FE',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Building size={13} />
            <span>Layer 6: Recruiter Hub</span>
          </Link>

          <Link
            to="/officer/resume-intelligence"
            style={{
              padding: '6px 12px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileText size={13} />
            <span>Layer 5: Resume AI</span>
          </Link>

          <Link
            to="/skill-gap"
            style={{
              padding: '6px 12px',
              backgroundColor: '#F0FDF4',
              color: '#059669',
              border: '1px solid #BBF7D0',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Target size={13} />
            <span>Layer 4: Skill-Gap Analyzer</span>
          </Link>

          <Link
            to="/officer/students"
            style={{
              padding: '6px 12px',
              backgroundColor: '#F8FAFC',
              color: '#475569',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users size={13} />
            <span>Layer 3: 360° Profiles</span>
          </Link>

          <Link
            to="/officer/dashboard"
            style={{
              padding: '6px 12px',
              backgroundColor: '#F8FAFC',
              color: '#475569',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Briefcase size={13} />
            <span>Layer 2: Officer Console</span>
          </Link>
        </div>
      </div>

      {/* 4 Student KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Overall Skill Match
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#3978F6' }}>92%</div>
          <div style={{ fontSize: '12px', color: '#10B981', marginTop: '4px', fontWeight: 600 }}>
            Top 5% in CSE Cohort
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Readiness Index
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#101B36' }}>94/100</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            Aptitude + Technical + GD
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Active Applications
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#8B5CF6' }}>6</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            2 in Technical Interview
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Offers Received
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981' }}>1 Offer</div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px', fontWeight: 600 }}>
            Verified Package: 18.5 LPA
          </div>
        </div>
      </div>

      {/* Layer 5: My Resume Intelligence Card */}
      <MyResumeCard user={user} />

      {/* Main Student Modules Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '24px' }}>
        {/* Active Placement Applications */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#101B36', marginBottom: '16px' }}>
            My Active Placement Applications
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#101B36' }}>Microsoft India</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Software Development Engineer (Cloud) • 24 LPA</div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                Technical Round 2
              </span>
            </div>

            <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#101B36' }}>Nexus AI Labs</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Machine Learning Associate • 18.5 LPA</div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#059669' }}>
                Offer Released 🎉
              </span>
            </div>

            <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#101B36' }}>Deloitte USI</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Tech Analyst • 12 LPA</div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: '#F1F5F9', color: '#475569' }}>
                Aptitude Cleared
              </span>
            </div>
          </div>
        </div>

        {/* AI Skill Profile & Recommendations */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#101B36', marginBottom: '16px' }}>
            AI Skill Assessment Radar
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>Data Structures & Algorithms</span>
                <strong style={{ color: '#3978F6' }}>96%</strong>
              </div>
              <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '96%', height: '100%', backgroundColor: '#3978F6' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>System Design & Cloud Architecture</span>
                <strong style={{ color: '#0E8EA8' }}>88%</strong>
              </div>
              <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '88%', height: '100%', backgroundColor: '#0E8EA8' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>Full-Stack Development (React/Node)</span>
                <strong style={{ color: '#10B981' }}>94%</strong>
              </div>
              <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '94%', height: '100%', backgroundColor: '#10B981' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ROLE VIEW 2: PLACEMENT OFFICER
   ========================================================================= */
function OfficerDashboardView({ user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 4 Officer KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Registered Students
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#101B36' }}>1,240</div>
          <div style={{ fontSize: '12px', color: '#10B981', marginTop: '4px', fontWeight: 600 }}>
            98.5% Profile Verification
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Active Recruitment Drives
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0E8EA8' }}>14 Live</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            4 Visiting On-Campus This Week
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Total Offers Issued
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981' }}>320 Offers</div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px', fontWeight: 600 }}>
            Avg CTC: 11.8 LPA
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Placement Percentage
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#3978F6' }}>92.4%</div>
          <div style={{ fontSize: '12px', color: '#3978F6', marginTop: '4px', fontWeight: 600 }}>
            On Track for 96% Target
          </div>
        </div>
      </div>

      {/* Drive Management Overview */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#101B36', marginBottom: '16px' }}>
          Upcoming Placement Drive Schedules
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { company: 'Google India', role: 'Software Engineer', date: 'Tomorrow, 09:30 AM', students: '124 Shortlisted', status: 'Slot Confirmed' },
            { company: 'Microsoft India', role: 'Cloud Solution Architect', date: 'Oct 08, 10:00 AM', students: '88 Shortlisted', status: 'Assessment Pending' },
            { company: 'Deloitte USI', role: 'Technology Consultant', date: 'Oct 12, 11:00 AM', students: '240 Registered', status: 'Registration Open' }
          ].map((d, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
              <div>
                <strong style={{ color: '#101B36' }}>{d.company}</strong> — <span style={{ color: '#475569', fontSize: '13px' }}>{d.role}</span>
                <div style={{ fontSize: '12px', color: '#64748B' }}>{d.date} • {d.students}</div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#059669' }}>
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ROLE VIEW 3: RECRUITER
   ========================================================================= */
function RecruiterDashboardView({ user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 4 Recruiter KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Open Job Requisitions
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#8B5CF6' }}>8 Active</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            Engineering, Product & Data
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            AI-Matched Candidates
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#3978F6' }}>45 Matched</div>
          <div style={{ fontSize: '12px', color: '#10B981', marginTop: '4px', fontWeight: 600 }}>
            &gt;90% JD Compatibility
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Interviews Scheduled
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0E8EA8' }}>18 Slots</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            Conducting Virtually & On-Campus
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Offers Accepted
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981' }}>12 Hires</div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px', fontWeight: 600 }}>
            85% Offer Acceptance Rate
          </div>
        </div>
      </div>

      {/* Recruiter Shortlist Pipeline */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#101B36', marginBottom: '16px' }}>
          Candidate Shortlisting Pipeline Preview
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { name: 'Aarav Sharma', branch: 'B.Tech CSE', score: '92% Match', status: 'Interview Round 2' },
            { name: 'Ananya Deshmukh', branch: 'B.Tech AI & Data Science', score: '95% Match', status: 'Offer Released' },
            { name: 'Rohan Gupta', branch: 'B.Tech IT', score: '88% Match', status: 'Coding Assessment Cleared' }
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
              <div>
                <strong style={{ color: '#101B36' }}>{c.name}</strong> • <span style={{ color: '#64748B', fontSize: '13px' }}>{c.branch}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#3978F6' }}>{c.score}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: '#F1F5F9', color: '#475569' }}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ROLE VIEW 4: COLLEGE ADMINISTRATOR
   ========================================================================= */
function AdminDashboardView({ user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 4 Admin KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Colleges Governed
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#101B36' }}>4 Institutions</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            Consortium Level Overview
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Total Degree Cohorts
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#3978F6' }}>12 Cohorts</div>
          <div style={{ fontSize: '12px', color: '#10B981', marginTop: '4px', fontWeight: 600 }}>
            UG Engineering & PG Tech
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            NAAC/NIRF Accreditation
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981' }}>Grade A++</div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px', fontWeight: 600 }}>
            Audit Score: 3.82/4.00
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Platform Audit Status
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0E8EA8' }}>100% Secure</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            Zero Governance Discrepancies
          </div>
        </div>
      </div>

      {/* Institutional Overview */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#101B36', marginBottom: '16px' }}>
          Cross-Department Placement Velocity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { dept: 'Computer Science & Engineering', placed: '96.2%', offers: '184 Offers', ctc: '14.2 LPA Avg' },
            { dept: 'Information Technology', placed: '94.0%', offers: '112 Offers', ctc: '12.6 LPA Avg' },
            { dept: 'Electronics & Telecommunication', placed: '89.5%', offers: '78 Offers', ctc: '9.8 LPA Avg' }
          ].map((d, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
              <div>
                <strong style={{ color: '#101B36' }}>{d.dept}</strong>
                <div style={{ fontSize: '12px', color: '#64748B' }}>{d.offers} • {d.ctc}</div>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#10B981' }}>
                {d.placed}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
