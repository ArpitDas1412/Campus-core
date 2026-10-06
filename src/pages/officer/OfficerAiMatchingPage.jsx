import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getJobs, getJobById } from '../../services/recruiterService';
import { getStoredStudents } from '../../data';
import { runCandidateMatching } from '../../services/candidateMatcher';

import MatchingHeader from '../../components/matching/MatchingHeader';
import MatchingIntroCard from '../../components/matching/MatchingIntroCard';
import MatchingProgress from '../../components/matching/MatchingProgress';
import MatchingSummaryKpis from '../../components/matching/MatchingSummaryKpis';
import TopMatchesSpotlight from '../../components/matching/TopMatchesSpotlight';
import MatchDistributionChart from '../../components/matching/MatchDistributionChart';
import SkillDemandChart from '../../components/matching/SkillDemandChart';
import MatchInsightCard from '../../components/matching/MatchInsightCard';
import MatchFilters from '../../components/matching/MatchFilters';
import CandidateRankingTable from '../../components/matching/CandidateRankingTable';
import MatchDetailDrawer from '../../components/matching/MatchDetailDrawer';
import CandidateComparisonModal from '../../components/matching/CandidateComparisonModal';
import IneligibleCandidatesModal from '../../components/matching/IneligibleCandidatesModal';

import {
  Briefcase,
  Building,
  Target,
  Sparkles,
  Users,
  AlertTriangle,
  GraduationCap,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function OfficerAiMatchingPage() {
  const navigate = useNavigate();

  // Load drives & student pool
  const allJobs = useMemo(() => getJobs(), []);
  const [selectedJobId, setSelectedJobId] = useState(allJobs[0]?.id || 'JOB-2027-001');
  const currentJob = useMemo(() => getJobById(selectedJobId), [selectedJobId]);
  const studentsPool = useMemo(() => getStoredStudents(), []);

  // UI States
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState(7);
  const [matchingResults, setMatchingResults] = useState(null);

  // Modals & Drawers
  const [selectedMatchCandidate, setSelectedMatchCandidate] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isIneligibleModalOpen, setIsIneligibleModalOpen] = useState(false);
  const [shortlistedIds, setShortlistedIds] = useState(new Set());
  const [lastAnalyzedTime, setLastAnalyzedTime] = useState('Just now');

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    tier: 'All',
    department: 'All',
    minScore: 'All',
    minCgpa: 'All',
    skillCoverage: 'All',
    experience: 'All',
    sortBy: 'score_desc'
  });

  // Run matching on selection
  useEffect(() => {
    runMatchingAnalysis();
  }, [selectedJobId, studentsPool]);

  const runMatchingAnalysis = () => {
    setIsProcessing(true);
    setProgressStep(1);

    const stepInterval = setInterval(() => {
      setProgressStep((prev) => {
        if (prev >= 7) {
          clearInterval(stepInterval);
          return 7;
        }
        return prev + 1;
      });
    }, 280);

    setTimeout(() => {
      const results = runCandidateMatching(studentsPool, currentJob);
      setMatchingResults(results);
      setIsProcessing(false);
      setLastAnalyzedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 2000);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      tier: 'All',
      department: 'All',
      minScore: 'All',
      minCgpa: 'All',
      skillCoverage: 'All',
      experience: 'All',
      sortBy: 'score_desc'
    });
  };

  const handleToggleCompare = (candidate) => {
    setSelectedForCompare((prev) => {
      const exists = prev.some((c) => c.candidateId === candidate.candidateId);
      if (exists) {
        return prev.filter((c) => c.candidateId !== candidate.candidateId);
      } else {
        if (prev.length >= 3) {
          return [prev[1], prev[2], candidate];
        }
        return [...prev, candidate];
      }
    });
  };

  const handleRemoveCompare = (candidateIdToRemove) => {
    setSelectedForCompare((prev) => prev.filter((c) => c.candidateId !== candidateIdToRemove));
  };

  const handleShortlistCandidate = (candidate) => {
    setShortlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(candidate.candidateId)) {
        next.delete(candidate.candidateId);
      } else {
        next.add(candidate.candidateId);
      }
      return next;
    });
  };

  // Filtered Candidates
  const filteredCandidates = useMemo(() => {
    if (!matchingResults?.eligibleCandidates) return [];

    let list = [...matchingResults.eligibleCandidates];

    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      list = list.filter((c) => {
        const student = c.student || {};
        return (
          (student.name || '').toLowerCase().includes(q) ||
          (student.deptCode || student.department || '').toLowerCase().includes(q) ||
          (student.rollNo || '').toLowerCase().includes(q)
        );
      });
    }

    if (filters.tier !== 'All') {
      list = list.filter((c) => c.recommendationTier?.label === filters.tier);
    }

    if (filters.department !== 'All') {
      const targetDept = filters.department.toUpperCase();
      list = list.filter((c) => (c.student?.deptCode || c.student?.department || '').toUpperCase().includes(targetDept));
    }

    if (filters.minScore !== 'All') {
      list = list.filter((c) => c.matchScore >= parseInt(filters.minScore, 10));
    }

    if (filters.minCgpa !== 'All') {
      list = list.filter((c) => parseFloat(c.student?.cgpa || 0) >= parseFloat(filters.minCgpa));
    }

    list.sort((a, b) => b.matchScore - a.matchScore);
    return list;
  }, [matchingResults, filters]);

  // CSV Export Download
  const handleExportResults = () => {
    if (!matchingResults?.eligibleCandidates) return;
    const headers = ['Rank', 'Candidate ID', 'Name', 'Department', 'CGPA', 'Match Score', 'Recommendation Tier'];
    const rows = matchingResults.eligibleCandidates.map((c) => [
      c.rank,
      c.candidateId,
      `"${c.student?.name || ''}"`,
      c.student?.deptCode || c.student?.department,
      c.student?.cgpa,
      `${c.matchScore}%`,
      `"${c.recommendationTier?.label || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Officer_Talent_Matching_${currentJob?.title}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout roleKey="officer">
      {/* Officer Drive Selection Bar */}
      <div
        style={{
          padding: '18px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 2px 10px rgba(16, 27, 54, 0.04)',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Briefcase size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#3978F6', textTransform: 'uppercase' }}>
              Placement Officer Console
            </div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              AI Talent Matching across Placement Drives
            </h2>
          </div>
        </div>

        {/* Drive Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Select Placement Drive:</span>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            style={{
              padding: '9px 14px',
              borderRadius: '10px',
              border: '1.5px solid #3978F6',
              backgroundColor: '#FFFFFF',
              color: '#101B36',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer'
            }}
          >
            {allJobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title} — {j.companyName} ({j.salary})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Officer Macro KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          marginBottom: '24px'
        }}
      >
        <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Active Matching Drives</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', marginTop: '4px' }}>{allJobs.length} Live</div>
          <div style={{ fontSize: '11.5px', color: '#059669', marginTop: '2px' }}>TechNova, Microsoft, Barclays</div>
        </div>

        <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Candidates Analyzed</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#3978F6', marginTop: '4px' }}>1,248 Students</div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>Full CSE, IT, ECE batch</div>
        </div>

        <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Strong Matches (90%+)</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {matchingResults?.distribution?.strong || 24} Candidates
          </div>
          <div style={{ fontSize: '11.5px', color: '#059669', marginTop: '2px' }}>Prime recommendation cadre</div>
        </div>

        <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Candidates With Skill Gaps</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>
            {(matchingResults?.distribution?.partial || 40) + (matchingResults?.distribution?.low || 8)} Students
          </div>
          <div style={{ fontSize: '11.5px', color: '#D97706', marginTop: '2px' }}>Actionable training roadmaps</div>
        </div>
      </div>

      {/* Main Matching Dashboard View */}
      <MatchingHeader
        job={currentJob}
        isProcessing={isProcessing}
        onRerunMatching={runMatchingAnalysis}
        onExport={handleExportResults}
        isOfficer={true}
      />

      <MatchingIntroCard lastAnalyzed={lastAnalyzedTime} />

      {isProcessing ? (
        <MatchingProgress currentStep={progressStep} totalSteps={7} />
      ) : (
        <>
          <MatchingSummaryKpis
            summary={matchingResults}
            selectedTierFilter={filters.tier}
            onSelectTierFilter={(tierVal) => handleFilterChange('tier', tierVal)}
            onOpenIneligible={() => setIsIneligibleModalOpen(true)}
          />

          <TopMatchesSpotlight
            topMatches={matchingResults?.topMatches}
            onOpenMatchDetails={(cand) => {
              setSelectedMatchCandidate(cand);
              setIsDetailDrawerOpen(true);
            }}
            selectedForCompare={selectedForCompare}
            onToggleCompare={handleToggleCompare}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}
          >
            <MatchDistributionChart
              distribution={matchingResults?.distribution}
              totalEligible={matchingResults?.eligibleCount}
            />
            <SkillDemandChart skillDemandVsSupply={matchingResults?.skillDemandVsSupply} />
          </div>

          <MatchInsightCard aiInsight={matchingResults?.aiInsight} />

          <MatchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            resultCount={filteredCandidates.length}
          />

          <CandidateRankingTable
            candidates={filteredCandidates}
            onOpenMatchDetails={(cand) => {
              setSelectedMatchCandidate(cand);
              setIsDetailDrawerOpen(true);
            }}
            selectedForCompare={selectedForCompare}
            onToggleCompare={handleToggleCompare}
            onShortlistCandidate={handleShortlistCandidate}
            shortlistedIds={shortlistedIds}
          />
        </>
      )}

      {/* Modals */}
      <MatchDetailDrawer
        candidate={selectedMatchCandidate}
        job={currentJob}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
      />

      <CandidateComparisonModal
        candidates={selectedForCompare}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveCandidate={handleRemoveCompare}
      />

      <IneligibleCandidatesModal
        ineligibleCandidates={matchingResults?.ineligibleCandidates}
        job={currentJob}
        isOpen={isIneligibleModalOpen}
        onClose={() => setIsIneligibleModalOpen(false)}
      />
    </DashboardLayout>
  );
}
