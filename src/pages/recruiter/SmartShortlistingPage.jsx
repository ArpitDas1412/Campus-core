import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import { getJobById } from '../../services/recruiterService';
import { getStoredStudents } from '../../data';
import {
  generateSmartShortlist,
  applyRecruiterDecision,
  exportShortlistReport,
  getShortlistAudit
} from '../../services/shortlistingEngine';
import {
  DEFAULT_SHORTLISTING_CONFIG,
  AI_RECOMMENDATION_STATUS,
  RECRUITER_DECISION_STATUS
} from '../../data/shortlistingConfig';

// Layer 9 UI Components
import ShortlistHeader from '../../components/shortlisting/ShortlistHeader';
import ShortlistStats from '../../components/shortlisting/ShortlistStats';
import ShortlistCriteria from '../../components/shortlisting/ShortlistCriteria';
import ShortlistProcessing from '../../components/shortlisting/ShortlistProcessing';
import ShortlistDistributionChart from '../../components/shortlisting/ShortlistDistributionChart';
import ShortlistMetrics from '../../components/shortlisting/ShortlistMetrics';
import ShortlistFilterBar from '../../components/shortlisting/ShortlistFilterBar';
import CandidateShortlistTable from '../../components/shortlisting/CandidateShortlistTable';
import CandidateShortlistCard from '../../components/shortlisting/CandidateShortlistCard';
import CandidateReasonPanel from '../../components/shortlisting/CandidateReasonPanel';
import { OverrideModal, ShortlistConfirmationModal } from '../../components/shortlisting/RecruiterDecisionModal';
import BulkActionToolbar from '../../components/shortlisting/BulkActionToolbar';
import AuditLog from '../../components/shortlisting/AuditLog';
import AiVsHumanComparison from '../../components/shortlisting/AiVsHumanComparison';
import ShortlistComparison from '../../components/shortlisting/ShortlistComparison';
import ResponsibleAiNotice from '../../components/shortlisting/ResponsibleAiNotice';

import { CheckCircle2, Calendar, Sparkles } from 'lucide-react';

export default function SmartShortlistingPage({ isOfficer = false }) {
  const { jobId, candidateId } = useParams();
  const navigate = useNavigate();

  const activeJobId = jobId || 'JOB-2027-001';
  const currentJob = useMemo(() => getJobById(activeJobId), [activeJobId]);
  const studentsPool = useMemo(() => getStoredStudents(), []);

  // Configuration state
  const [config, setConfig] = useState(DEFAULT_SHORTLISTING_CONFIG);

  // Shortlisting generated state
  const [shortlistData, setShortlistData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);

  // Active view tab: 'roster' | 'comparison' | 'audit' | 'analytics'
  const [activeTab, setActiveTab] = useState('roster');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Selected candidate ids for bulk actions
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Side-by-side comparison pool (up to 3)
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Active side-over reason panel
  const [activeReasonCandidate, setActiveReasonCandidate] = useState(null);
  const [isReasonPanelOpen, setIsReasonPanelOpen] = useState(false);

  // Modals for Recruiter Decision & Override
  const [confirmShortlistModal, setConfirmShortlistModal] = useState({ isOpen: false, item: null });
  const [overrideModal, setOverrideModal] = useState({
    isOpen: false,
    item: null,
    targetDecision: RECRUITER_DECISION_STATUS.SHORTLISTED
  });

  // Layer 10 Scheduling Handoff Toast
  const [schedulingToast, setSchedulingToast] = useState(null);
  const [notificationToast, setNotificationToast] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    recommendation: 'All',
    decision: 'All',
    department: 'All',
    sortBy: 'score_desc'
  });

  // Run initial shortlisting on mount
  useEffect(() => {
    if (currentJob && studentsPool) {
      runInitialShortlist();
    }
  }, [currentJob, studentsPool]);

  // If candidateId in URL, open their reason panel
  useEffect(() => {
    if (candidateId && shortlistData?.candidates) {
      const found = shortlistData.candidates.find((c) => c.candidateId === candidateId);
      if (found) {
        setActiveReasonCandidate(found);
        setIsReasonPanelOpen(true);
      }
    }
  }, [candidateId, shortlistData]);

  // Run shortlisting with simulation
  const runInitialShortlist = () => {
    const result = generateSmartShortlist(currentJob, studentsPool, config);
    setShortlistData(result);
  };

  const handleRunShortlistWithAnimation = () => {
    setIsProcessing(true);
    setProcessingStep(1);

    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= 8) {
          clearInterval(stepInterval);
          setIsProcessing(false);
          const fresh = generateSmartShortlist(currentJob, studentsPool, config);
          setShortlistData(fresh);
          showToast('Smart Shortlist generated and updated with AI recommendations!');
          return 8;
        }
        return prev + 1;
      });
    }, 220);
  };

  const showToast = (msg) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Recruiter Decision Handlers
  const handleDecisionChange = (cId, newStatus) => {
    const item = shortlistData?.candidates.find((c) => c.candidateId === cId);
    applyRecruiterDecision(
      activeJobId,
      cId,
      newStatus,
      'Recruiter manual review',
      isOfficer ? 'Placement Officer' : 'Ananya Mehta',
      item?.aiRecommendation?.status
    );

    // Refresh data
    const updated = generateSmartShortlist(currentJob, studentsPool, config);
    setShortlistData(updated);
    showToast(`Candidate status updated to "${newStatus}"`);
  };

  const handleConfirmOverride = (cId, newStatus, reason) => {
    const item = shortlistData?.candidates.find((c) => c.candidateId === cId);
    applyRecruiterDecision(
      activeJobId,
      cId,
      newStatus,
      reason,
      isOfficer ? 'Placement Officer' : 'Ananya Mehta',
      item?.aiRecommendation?.status
    );

    const updated = generateSmartShortlist(currentJob, studentsPool, config);
    setShortlistData(updated);
    showToast(`Decision recorded with human justification: "${reason}"`);
  };

  // Bulk Decision
  const handleBulkDecision = (status) => {
    selectedIds.forEach((cId) => {
      const item = shortlistData?.candidates.find((c) => c.candidateId === cId);
      applyRecruiterDecision(
        activeJobId,
        cId,
        status,
        `Bulk updated ${selectedIds.size} candidates`,
        isOfficer ? 'Placement Officer' : 'Ananya Mehta',
        item?.aiRecommendation?.status
      );
    });

    setSelectedIds(new Set());
    const updated = generateSmartShortlist(currentJob, studentsPool, config);
    setShortlistData(updated);
    showToast(`Updated ${selectedIds.size} candidates to "${status}"`);
  };

  // Export handlers
  const handleExport = (format) => {
    if (shortlistData?.candidates) {
      exportShortlistReport(shortlistData.candidates, currentJob, format);
      showToast(`Exported ${currentJob.title} Shortlisting Report as ${format.toUpperCase()}`);
    }
  };

  // Checkbox Selection
  const handleToggleSelect = (cId) => {
    const next = new Set(selectedIds);
    if (next.has(cId)) next.delete(cId);
    else next.add(cId);
    setSelectedIds(next);
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.size === filteredCandidates.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredCandidates.map((c) => c.candidateId)));
    }
  };

  // Compare up to 3 candidates
  const handleToggleCompare = (item) => {
    const exists = selectedForCompare.some((c) => c.candidateId === item.candidateId);
    if (exists) {
      setSelectedForCompare(selectedForCompare.filter((c) => c.candidateId !== item.candidateId));
    } else {
      if (selectedForCompare.length >= 3) {
        showToast('You can compare a maximum of 3 candidates simultaneously.');
        return;
      }
      const updated = [...selectedForCompare, item];
      setSelectedForCompare(updated);
      if (updated.length >= 2) {
        setIsCompareModalOpen(true);
      }
    }
  };

  // Move to Scheduling (Layer 10 Handoff)
  const handleMoveToScheduling = (candidateName) => {
    navigate(isOfficer ? `/officer/scheduling/${job.id}` : `/recruiter/jobs/${job.id}/scheduling`);
  };

  // Filtered & Sorted Candidates
  const allCandidates = shortlistData?.candidates || [];
  const filteredCandidates = useMemo(() => {
    return allCandidates
      .filter((item) => {
        // Search
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const name = (item.student?.name || '').toLowerCase();
          const id = (item.student?.id || '').toLowerCase();
          const dept = (item.student?.department || '').toLowerCase();
          const skills = (item.student?.skills || []).map((s) => (s.name || s).toLowerCase()).join(' ');
          if (!name.includes(q) && !id.includes(q) && !dept.includes(q) && !skills.includes(q)) {
            return false;
          }
        }

        // AI Recommendation
        if (filters.recommendation !== 'All' && item.aiRecommendation?.status !== filters.recommendation) {
          return false;
        }

        // Recruiter Decision
        if (filters.decision !== 'All' && item.recruiterDecision?.status !== filters.decision) {
          return false;
        }

        // Department
        if (filters.department !== 'All') {
          const dept = (item.student?.department || item.student?.deptCode || '').toUpperCase();
          if (!dept.includes(filters.department.toUpperCase())) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'score_desc') return b.aiRecommendation.score - a.aiRecommendation.score;
        if (filters.sortBy === 'score_asc') return a.aiRecommendation.score - b.aiRecommendation.score;
        if (filters.sortBy === 'skills_desc')
          return b.criteria.requiredSkillCoverage - a.criteria.requiredSkillCoverage;
        if (filters.sortBy === 'cgpa_desc')
          return parseFloat(b.student?.cgpa || 0) - parseFloat(a.student?.cgpa || 0);
        if (filters.sortBy === 'rank_asc') return a.rank - b.rank;
        return 0;
      });
  }, [allCandidates, filters]);

  const metrics = shortlistData?.metrics || {};

  return (
    <RecruiterLayout>
      {/* Toast Notification */}
      {notificationToast && (
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
            fontWeight: 700,
            zIndex: 1050
          }}
        >
          <CheckCircle2 size={18} />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Layer 10 Scheduling Handoff Toast */}
      {schedulingToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '32px',
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            padding: '14px 22px',
            borderRadius: '12px',
            boxShadow: '0 12px 30px rgba(16, 27, 54, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13.5px',
            fontWeight: 600,
            zIndex: 1050,
            border: '1px solid #334155',
            maxWidth: '460px'
          }}
        >
          <Calendar size={20} style={{ color: '#36C5E8', flexShrink: 0 }} />
          <span>{schedulingToast}</span>
        </div>
      )}

      {/* Processing Animation Modal */}
      {isProcessing && <ShortlistProcessing currentStep={processingStep} />}

      {/* Page Header */}
      <ShortlistHeader
        job={currentJob}
        onRunShortlist={handleRunShortlistWithAnimation}
        onExport={handleExport}
        isProcessing={isProcessing}
        isOfficer={isOfficer}
      />

      {/* Top 6 KPI Cards */}
      <ShortlistStats metrics={metrics} />

      {/* Shortlist Strategy & Configurable AI Criteria */}
      <ShortlistCriteria
        config={config}
        onChangeConfig={(newCfg) => setConfig(newCfg)}
        onApplyCriteria={(newCfg) => {
          setConfig(newCfg);
          const fresh = generateSmartShortlist(currentJob, studentsPool, newCfg);
          setShortlistData(fresh);
          showToast('Updated shortlisting criteria applied!');
        }}
        job={currentJob}
        isProcessing={isProcessing}
      />

      {/* Navigation Tabs between Roster, AI vs Human, Decision Audit, Analytics */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '20px',
          overflowX: 'auto'
        }}
      >
        {[
          { key: 'roster', label: `Shortlist Roster (${filteredCandidates.length})` },
          { key: 'comparison', label: 'AI vs Human Alignment' },
          { key: 'audit', label: `Decision Audit Trail (${shortlistData?.auditTrail?.length || 3})` },
          { key: 'analytics', label: 'Cohort Quality & Distribution' }
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '10px 16px',
                border: 'none',
                borderBottom: isActive ? '3px solid #3978F6' : '3px solid transparent',
                backgroundColor: 'transparent',
                color: isActive ? '#101B36' : '#64748B',
                fontSize: '13.5px',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          );
        })}

        {/* Scheduling Queue CTA */}
        <div style={{ marginLeft: 'auto', paddingBottom: '4px' }}>
          <button
            onClick={() => handleMoveToScheduling(selectedIds.size > 0 ? `${selectedIds.size} candidates` : 'All Shortlisted')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            title="Layer 10 Scheduling Integration"
          >
            <Calendar size={14} />
            <span>Move to Scheduling →</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SHORTLIST ROSTER */}
      {activeTab === 'roster' && (
        <>
          {/* Filters Bar */}
          <ShortlistFilterBar
            filters={filters}
            onChangeFilter={(k, v) => setFilters({ ...filters, [k]: v })}
            onResetFilters={() =>
              setFilters({
                search: '',
                recommendation: 'All',
                decision: 'All',
                department: 'All',
                sortBy: 'score_desc'
              })
            }
            totalCount={allCandidates.length}
            filteredCount={filteredCandidates.length}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
          />

          {/* Table or Cards View */}
          {viewMode === 'table' ? (
            <CandidateShortlistTable
              candidates={filteredCandidates}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onOpenReasonPanel={(item) => {
                setActiveReasonCandidate(item);
                setIsReasonPanelOpen(true);
              }}
              onChangeDecision={handleDecisionChange}
              onOpenOverrideModal={(item, target) => {
                setOverrideModal({ isOpen: true, item, targetDecision: target });
              }}
              selectedForCompare={selectedForCompare}
              onToggleCompare={handleToggleCompare}
              jobId={activeJobId}
              isOfficer={isOfficer}
            />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '16px'
              }}
            >
              {filteredCandidates.map((item) => (
                <CandidateShortlistCard
                  key={item.id}
                  item={item}
                  isSelected={selectedIds.has(item.candidateId)}
                  onToggleSelect={handleToggleSelect}
                  onOpenReasonPanel={(it) => {
                    setActiveReasonCandidate(it);
                    setIsReasonPanelOpen(true);
                  }}
                  onChangeDecision={handleDecisionChange}
                  onOpenOverrideModal={(it, target) => {
                    setOverrideModal({ isOpen: true, item: it, targetDecision: target });
                  }}
                  jobId={activeJobId}
                  isOfficer={isOfficer}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* TAB 2: AI VS HUMAN COMPARISON */}
      {activeTab === 'comparison' && <AiVsHumanComparison candidates={allCandidates} />}

      {/* TAB 3: DECISION AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <AuditLog auditTrail={shortlistData?.auditTrail || []} candidates={allCandidates} />
      )}

      {/* TAB 4: COHORT QUALITY & DISTRIBUTION */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ShortlistDistributionChart
            metrics={metrics}
            onFilterCategory={(catId) => {
              setFilters({ ...filters, recommendation: catId });
              setActiveTab('roster');
            }}
          />
          <ShortlistMetrics metrics={metrics} />
        </div>
      )}

      {/* Responsible AI Disclaimer Banner */}
      <div style={{ marginTop: '24px' }}>
        <ResponsibleAiNotice />
      </div>

      {/* Floating Bulk Action Bar */}
      <BulkActionToolbar
        selectedCount={selectedIds.size}
        onClearSelection={() => setSelectedIds(new Set())}
        onBulkDecision={handleBulkDecision}
        onBulkExport={() => handleExport('csv')}
      />

      {/* Side Reason Drawer ("Why Included?" & "Why Not?") */}
      <CandidateReasonPanel
        isOpen={isReasonPanelOpen}
        onClose={() => setIsReasonPanelOpen(false)}
        item={activeReasonCandidate}
        jobId={activeJobId}
        isOfficer={isOfficer}
        onOpenOverrideModal={(it, target) => {
          setOverrideModal({ isOpen: true, item: it, targetDecision: target });
        }}
      />

      {/* Recruiter Decision Override Modal */}
      <OverrideModal
        isOpen={overrideModal.isOpen}
        onClose={() => setOverrideModal({ isOpen: false, item: null, targetDecision: null })}
        candidateItem={overrideModal.item}
        targetDecision={overrideModal.targetDecision}
        onConfirmOverride={handleConfirmOverride}
      />

      {/* Shortlist Confirmation Modal */}
      <ShortlistConfirmationModal
        isOpen={confirmShortlistModal.isOpen}
        onClose={() => setConfirmShortlistModal({ isOpen: false, item: null })}
        candidateItem={confirmShortlistModal.item}
        onConfirm={(cId) => handleDecisionChange(cId, RECRUITER_DECISION_STATUS.SHORTLISTED)}
      />

      {/* Candidate Comparison Modal */}
      <ShortlistComparison
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        selectedCandidates={selectedForCompare}
        onRemoveCandidate={(cId) =>
          setSelectedForCompare(selectedForCompare.filter((c) => c.candidateId !== cId))
        }
        job={currentJob}
      />
    </RecruiterLayout>
  );
}
