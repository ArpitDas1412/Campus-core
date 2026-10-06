import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, Sparkles, Download, Layers, ShieldCheck, 
  CheckCircle2, ArrowRight, Filter, Calendar, Users, RefreshCw
} from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { intelligenceService } from '../../services/intelligenceService';
import ExecutiveKpiGrid from '../../components/intelligence/ExecutiveKpiGrid';
import PlacementFunnel from '../../components/intelligence/PlacementFunnel';
import DepartmentAnalytics from '../../components/intelligence/DepartmentAnalytics';
import AtRiskRadar from '../../components/intelligence/AtRiskRadar';
import ExecutiveRecommendations from '../../components/intelligence/ExecutiveRecommendations';

export default function CampusIntelligencePage() {
  const navigate = useNavigate();

  const [selectedDept, setSelectedDept] = useState('ALL');
  const [kpis, setKpis] = useState(null);
  const [funnel, setFunnel] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [atRiskCohorts, setAtRiskCohorts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  const loadAllIntelligence = () => {
    setKpis(intelligenceService.getExecutiveKPIs());
    setFunnel(intelligenceService.getPlacementFunnel());
    setDepartments(intelligenceService.getDepartmentMetrics(selectedDept));
    setRecruiters(intelligenceService.getTopRecruiters());
    setAtRiskCohorts(intelligenceService.getAtRiskCohorts());
    setRecommendations(intelligenceService.getExecutiveRecommendations());
  };

  useEffect(() => {
    loadAllIntelligence();
  }, [selectedDept]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleRecommendationAction = (rec) => {
    if (rec.actionType === 'navigate_scheduler') {
      navigate('/officer/scheduling');
      return;
    }

    intelligenceService.triggerRecommendationAction(rec.id);
    showToast(`Executive Action Dispatched: ${rec.title}`);
    loadAllIntelligence();
  };

  const handleExportSummary = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Metric,Value"].concat([
        `"Placement Rate","${kpis?.placementRate}%"`,
        `"Students Placed","${kpis?.studentsPlaced}"`,
        `"Total Offers","${kpis?.totalOffers}"`,
        `"Average CTC","${kpis?.averageCTC}"`,
        `"Highest CTC","${kpis?.highestCTC}"`,
        `"Active Recruiters","${kpis?.activeRecruiters}"`,
        `"Joining Rate","${kpis?.joiningRate}%"`
      ]).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `campuscore_executive_intelligence_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Executive placement summary downloaded.");
  };

  return (
    <DashboardLayout roleKey="officer">
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Toast Notification */}
        {toastMsg && (
          <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 1000, backgroundColor: '#0F172A', color: '#FFFFFF', padding: '12px 18px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
            <CheckCircle2 size={16} color="#34D399" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Header Banner */}
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
                  Layer 13 Live
                </span>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>• Executive Placement Command Center</span>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>Campus Intelligence & Institutional Analytics</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 800, color: '#047857', backgroundColor: '#ECFDF5', padding: '3px 10px', borderRadius: '999px', border: '1px solid #A7F3D0' }}>
                  <Sparkles size={13} />
                  <span>Season 2026–27 Live</span>
                </span>
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
                Executive intelligence synthesizing student readiness, AI matching, shortlists, interview conversion, offers, and Day 1 onboarding.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={handleExportSummary}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Download size={14} />
                <span>Export Executive Brief</span>
              </button>
              <button
                onClick={() => navigate('/officer/offers')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Layers size={14} />
                <span>Open Offers & Docs (L12)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5 Executive Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* SECTION 1: EXECUTIVE DASHBOARD */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                SECTION 1 • EXECUTIVE PLACEMENT DASHBOARD
              </span>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                Updated Real-Time from Layers 1–12
              </span>
            </div>
            <ExecutiveKpiGrid kpis={kpis} />
          </section>

          {/* SECTION 2: 10-STAGE PLACEMENT FUNNEL */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                SECTION 2 • 10-STAGE LIFECYCLE FUNNEL & DROP-OFF CONVERSION
              </span>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                From Enrolled Students to Confirmed Joining
              </span>
            </div>
            <PlacementFunnel funnelData={funnel} />
          </section>

          {/* SECTION 3: DEPARTMENT & COMPANY ANALYTICS */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                SECTION 3 • DEPARTMENT PERFORMANCE & RECRUITER DEMAND
              </span>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                Disciplinary Packages & Mandatory Tech Stacks
              </span>
            </div>
            <DepartmentAnalytics
              departments={departments}
              recruiters={recruiters}
              selectedDept={selectedDept}
              onSelectDept={(code) => setSelectedDept(code)}
            />
          </section>

          {/* SECTION 4: AT-RISK RADAR & SKILL GAP INTELLIGENCE */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                SECTION 4 • AT-RISK COHORTS & SYSTEMIC SKILL GAP RADAR
              </span>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                Cross-Layer Anomaly Detection (Layers 3, 4, 8 & 9)
              </span>
            </div>
            <AtRiskRadar
              atRiskCohorts={atRiskCohorts}
              onContactCohort={(cohort) => {
                showToast(`Cohort alert dispatched to ${cohort.name} mentors.`);
              }}
            />
          </section>

          {/* SECTION 5: EXECUTIVE ACTION CENTER */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                SECTION 5 • PLACEMENT OFFICER RECOMMENDATION & DECISION ENGINE
              </span>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                Prescriptive Automation & Action Dispatcher
              </span>
            </div>
            <ExecutiveRecommendations
              recommendations={recommendations}
              onTriggerAction={handleRecommendationAction}
            />
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
