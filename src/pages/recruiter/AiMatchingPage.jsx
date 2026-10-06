import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import { getJobById } from '../../services/recruiterService';
import { getStoredStudents } from '../../data';
import { runCandidateMatching } from '../../services/candidateMatcher';

// Layer 7 UI Components
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

export default function AiMatchingPage() {
  const { jobId, candidateId } = useParams();
  const navigate = useNavigate();

  // Load selected job and student pool
  const currentJob = useMemo(() => getJobById(jobId || 'JOB-2027-001'), [jobId]);
  const studentsPool = useMemo(() => getStoredStudents(), []);

  // UI States
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState(7);
  const [matchingResults, setMatchingResults] = useState(null);

  // Active Modals & Drawers
  const [selectedMatchCandidate, setSelectedMatchCandidate] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isIneligibleModalOpen, setIsIneligibleModalOpen] = useState(false);
  const [shortlistedIds, setShortlistedIds] = useState(new Set());
  const [lastAnalyzedTime, setLastAnalyzedTime] = useState('Just now');

  // Filter & Search States
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

  // Initial Run on mount
  useEffect(() => {
    runMatchingAnalysis();
  }, [currentJob, studentsPool]);

  // If candidateId param is given, automatically open their detail drawer
  useEffect(() => {
    if (candidateId && matchingResults?.eligibleCandidates) {
      const found = matchingResults.eligibleCandidates.find(
        (c) => c.candidateId === candidateId || c.student?.id === candidateId
      );
      if (found) {
        setSelectedMatchCandidate(found);
        setIsDetailDrawerOpen(true);
      }
    }
  }, [candidateId, matchingResults]);

  // Execute AI Matching with animated sequence
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

  // Filter and Sort Handlers
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

  // Compare Handler (up to 3 candidates)
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

  // Shortlist action
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

  // Filtered Candidates memo
  const filteredCandidates = useMemo(() => {
    if (!matchingResults?.eligibleCandidates) return [];

    let list = [...matchingResults.eligibleCandidates];

    // Search filter across Name, Skills, Projects, Dept
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      list = list.filter((c) => {
        const student = c.student || {};
        const nameMatch = (student.name || '').toLowerCase().includes(q);
        const deptMatch = (student.deptCode || student.department || '').toLowerCase().includes(q);
        const rollMatch = (student.rollNo || '').toLowerCase().includes(q);

        const skillMatch = (student.skills || []).some((s) => {
          const sName = typeof s === 'string' ? s : s.name;
          return sName && sName.toLowerCase().includes(q);
        });

        const projMatch = (student.projects || []).some((p) =>
          (p.name || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
        );

        return nameMatch || deptMatch || rollMatch || skillMatch || projMatch;
      });
    }

    // Tier filter
    if (filters.tier !== 'All') {
      list = list.filter((c) => c.recommendationTier?.label === filters.tier);
    }

    // Department filter
    if (filters.department !== 'All') {
      const targetDept = filters.department.toUpperCase();
      list = list.filter((c) => {
        const d = (c.student?.deptCode || c.student?.department || '').toUpperCase();
        return d.includes(targetDept);
      });
    }

    // Min Score filter
    if (filters.minScore !== 'All') {
      const minS = parseInt(filters.minScore, 10);
      list = list.filter((c) => c.matchScore >= minS);
    }

    // Min CGPA filter
    if (filters.minCgpa !== 'All') {
      const minC = parseFloat(filters.minCgpa);
      list = list.filter((c) => parseFloat(c.student?.cgpa || 0) >= minC);
    }

    // Skill Coverage filter
    if (filters.skillCoverage !== 'All') {
      const minCoverage = parseInt(filters.skillCoverage, 10);
      list = list.filter((c) => {
        const total = c.skillMatch?.requiredTotal || 1;
        const matched = c.skillMatch?.requiredMatched || 0;
        const pct = Math.round((matched / total) * 100);
        return pct >= minCoverage;
      });
    }

    // Experience filter
    if (filters.experience === 'internship') {
      list = list.filter((c) => c.experienceMatch?.score >= 85);
    } else if (filters.experience === 'none') {
      list = list.filter((c) => c.experienceMatch?.score < 85);
    }

    // Sort order
    list.sort((a, b) => {
      if (filters.sortBy === 'cgpa_desc') {
        return parseFloat(b.student?.cgpa || 0) - parseFloat(a.student?.cgpa || 0);
      } else if (filters.sortBy === 'skill_desc') {
        return (b.skillMatch?.score || 0) - (a.skillMatch?.score || 0);
      } else if (filters.sortBy === 'project_desc') {
        return (b.projectRelevance?.score || 0) - (a.projectRelevance?.score || 0);
      } else if (filters.sortBy === 'resume_desc') {
        return (b.resumeRelevance?.score || 0) - (a.resumeRelevance?.score || 0);
      } else if (filters.sortBy === 'experience_desc') {
        return (b.experienceMatch?.score || 0) - (a.experienceMatch?.score || 0);
      }
      return b.matchScore - a.matchScore;
    });

    return list;
  }, [matchingResults, filters]);

  // CSV Export Download
  const handleExportResults = () => {
    if (!matchingResults?.eligibleCandidates) return;

    const headers = [
      'Rank',
      'Candidate ID',
      'Name',
      'Department',
      'CGPA',
      'Eligibility',
      'AI Match Score',
      'Recommendation Tier',
      'Required Skills Covered',
      'Project Relevance',
      'Resume Relevance'
    ];

    const rows = matchingResults.eligibleCandidates.map((c) => [
      c.rank,
      c.candidateId,
      `"${c.student?.name || ''}"`,
      c.student?.deptCode || c.student?.department,
      c.student?.cgpa,
      c.eligible ? 'Eligible' : 'Ineligible',
      `${c.matchScore}%`,
      `"${c.recommendationTier?.label || ''}"`,
      `"${c.skillMatch?.requiredMatched}/${c.skillMatch?.requiredTotal}"`,
      `${c.projectRelevance?.score}%`,
      `${c.resumeRelevance?.score}%`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CampusCore_AI_Matching_${currentJob?.title?.replace(/\s+/g, '_')}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <RecruiterLayout activeItem="jobs">
      {/* 1. Page Header */}
      <MatchingHeader
        job={currentJob}
        isProcessing={isProcessing}
        onRerunMatching={runMatchingAnalysis}
        onExport={handleExportResults}
      />

      {/* 2. AI Matching Engine Intro & Config Info Card */}
      <MatchingIntroCard lastAnalyzed={lastAnalyzedTime} />

      {/* 3. Animated Processing State OR Main Results */}
      {isProcessing ? (
        <MatchingProgress currentStep={progressStep} totalSteps={7} />
      ) : (
        <>
          {/* 4. Top KPI Summary Strip */}
          <MatchingSummaryKpis
            summary={matchingResults}
            selectedTierFilter={filters.tier}
            onSelectTierFilter={(tierVal) => handleFilterChange('tier', tierVal)}
            onOpenIneligible={() => setIsIneligibleModalOpen(true)}
          />

          {/* 5. Top AI Matches Spotlight Cards */}
          <TopMatchesSpotlight
            topMatches={matchingResults?.topMatches}
            onOpenMatchDetails={(cand) => {
              setSelectedMatchCandidate(cand);
              setIsDetailDrawerOpen(true);
            }}
            selectedForCompare={selectedForCompare}
            onToggleCompare={handleToggleCompare}
          />

          {/* 6. Two-Column Visual Analytics: Distribution & Skill Demand */}
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

          {/* 7. AI Matching Talent Insight Card */}
          <MatchInsightCard aiInsight={matchingResults?.aiInsight} />

          {/* Compare Sticky Floating Strip (if candidates selected) */}
          {selectedForCompare.length > 0 && (
            <div
              style={{
                position: 'sticky',
                top: '80px',
                zIndex: 90,
                padding: '12px 20px',
                backgroundColor: '#101B36',
                color: '#FFFFFF',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(16, 27, 54, 0.25)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
              className="animate-fade-in"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>
                  Comparing Candidates ({selectedForCompare.length} of 3 selected):
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {selectedForCompare.map((c) => (
                    <span
                      key={c.candidateId}
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF'
                      }}
                    >
                      {c.student?.name} ({c.matchScore}%)
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View Comparison Modal →
                </button>
                <button
                  onClick={() => setSelectedForCompare([])}
                  style={{
                    padding: '7px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#94A3B8',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* 8. Search & Multi-Attribute Filters */}
          <MatchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            resultCount={filteredCandidates.length}
          />

          {/* 9. Candidate Ranking Table */}
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

      {/* 10. Match Detail Drawer */}
      <MatchDetailDrawer
        candidate={selectedMatchCandidate}
        job={currentJob}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
      />

      {/* 11. Candidate Comparison Modal */}
      <CandidateComparisonModal
        candidates={selectedForCompare}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveCandidate={handleRemoveCompare}
      />

      {/* 12. Ineligible Candidates Modal */}
      <IneligibleCandidatesModal
        ineligibleCandidates={matchingResults?.ineligibleCandidates}
        job={currentJob}
        isOpen={isIneligibleModalOpen}
        onClose={() => setIsIneligibleModalOpen(false)}
      />
    </RecruiterLayout>
  );
}
