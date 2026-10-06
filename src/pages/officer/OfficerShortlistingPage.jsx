import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getJobs } from '../../services/recruiterService';
import { getStoredStudents } from '../../data';
import { generateSmartShortlist } from '../../services/shortlistingEngine';
import {
  Briefcase,
  Building2,
  Users,
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Layers,
  Search
} from 'lucide-react';

export default function OfficerShortlistingPage() {
  const navigate = useNavigate();
  const allJobs = useMemo(() => getJobs(), []);
  const studentsPool = useMemo(() => getStoredStudents(), []);
  const [searchQuery, setSearchQuery] = useState('');

  // Compute shortlisting status for each active drive
  const driveShortlists = useMemo(() => {
    return allJobs.map((job) => {
      const result = generateSmartShortlist(job, studentsPool);
      return {
        job,
        result,
        metrics: result.metrics
      };
    });
  }, [allJobs, studentsPool]);

  // Aggregate Campus Shortlisting Metrics
  const aggregateMetrics = useMemo(() => {
    let totalTarget = 0;
    let totalRecommended = 0;
    let totalShortlisted = 0;
    let totalPending = 0;

    driveShortlists.forEach((item) => {
      totalTarget += item.metrics.targetShortlist || 0;
      totalRecommended += item.metrics.recommendedCount || 0;
      totalShortlisted += item.metrics.shortlistedCount || 0;
      totalPending += item.metrics.needsReviewCount || 0;
    });

    return {
      totalDrives: driveShortlists.length,
      totalTarget,
      totalRecommended,
      totalShortlisted,
      totalPending,
      overallProgressPct: totalTarget > 0 ? Math.round((totalShortlisted / totalTarget) * 100) : 0
    };
  }, [driveShortlists]);

  const filteredDrives = driveShortlists.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.job.title.toLowerCase().includes(q) ||
      item.job.companyName.toLowerCase().includes(q) ||
      item.job.department.toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout roleKey="officer">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Breadcrumb & Layer Tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#2563EB',
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.04em'
              }}
            >
              <Layers size={13} />
              LAYER 9 • OFFICER SHORTLISTING COMMAND
            </span>
          </div>

          <button
            onClick={() => navigate('/officer/ai-matching')}
            style={{
              background: 'none',
              border: 'none',
              color: '#3978F6',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ← View Layer 7 AI Talent Matching
          </button>
        </div>

        {/* Header Banner */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px 28px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(16, 27, 54, 0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#101B36', margin: 0, letterSpacing: '-0.02em' }}>
              Campus Placement Smart Shortlisting Hub
            </h1>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              {aggregateMetrics.totalDrives} Active Corporate Drives
            </span>
          </div>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0, maxWidth: '820px', lineHeight: 1.5 }}>
            Oversee recruiter candidate shortlisting pipelines across all active placement drives, monitor
            AI recommendations, review human overrides, and track fulfillment toward institutional targets.
          </p>
        </div>

        {/* Top Campus Summary KPIs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            marginBottom: '28px'
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', padding: '18px 20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>
              Campus Target Cohort
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#101B36' }}>
              {aggregateMetrics.totalTarget}
            </div>
            <div style={{ fontSize: '11.5px', color: '#2563EB', marginTop: '2px' }}>
              Across {aggregateMetrics.totalDrives} placement drives
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '18px 20px', borderRadius: '14px', border: '1px solid #A7F3D0' }}>
            <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600, marginBottom: '4px' }}>
              AI Recommended Candidates
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#059669' }}>
              {aggregateMetrics.totalRecommended}
            </div>
            <div style={{ fontSize: '11.5px', color: '#059669', marginTop: '2px' }}>
              High-fit candidate pool
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '18px 20px', borderRadius: '14px', border: '1px solid #BFDBFE' }}>
            <div style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600, marginBottom: '4px' }}>
              Candidates Shortlisted
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#2563EB' }}>
              {aggregateMetrics.totalShortlisted}
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
              {aggregateMetrics.overallProgressPct}% of campus target fulfilled
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '18px 20px', borderRadius: '14px', border: '1px solid #FDE68A' }}>
            <div style={{ fontSize: '12px', color: '#D97706', fontWeight: 600, marginBottom: '4px' }}>
              Awaiting Recruiter Review
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#D97706' }}>
              {aggregateMetrics.totalPending}
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
              Potential match candidates
            </div>
          </div>
        </div>

        {/* Search Drives Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '16px'
          }}
        >
          <div style={{ position: 'relative', width: '360px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94A3B8'
              }}
            />
            <input
              type="text"
              placeholder="Search drives by role, company, or branch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                color: '#101B36',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <span style={{ fontSize: '13px', color: '#64748B' }}>
            Showing <strong>{filteredDrives.length}</strong> active placement drives
          </span>
        </div>

        {/* Active Drives Shortlisting Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredDrives.map(({ job, metrics }) => {
            const target = metrics.targetShortlist || 100;
            const shortlisted = metrics.shortlistedCount || 0;
            const recommended = metrics.recommendedCount || 0;
            const pending = metrics.needsReviewCount || 0;
            const progress = Math.min(100, Math.round((shortlisted / target) * 100));

            return (
              <div
                key={job.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '20px 24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px'
                }}
              >
                {/* Left: Job & Company Info */}
                <div style={{ flex: '1 1 320px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                      {job.title}
                    </h3>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#EFF6FF',
                        color: '#2563EB',
                        fontSize: '11px',
                        fontWeight: 800
                      }}
                    >
                      {job.openings} Openings
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#64748B' }}>
                    <span style={{ fontWeight: 600, color: '#334155' }}>{job.companyName}</span>
                    <span>•</span>
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span style={{ color: '#059669', fontWeight: 700 }}>{job.salary}</span>
                  </div>
                </div>

                {/* Middle: Shortlisting Numbers & Progress */}
                <div style={{ flex: '1 1 280px', minWidth: '240px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12.5px',
                      marginBottom: '6px'
                    }}
                  >
                    <span style={{ color: '#64748B' }}>
                      Target Cohort:{' '}
                      <strong style={{ color: '#101B36' }}>
                        {shortlisted} / {target}
                      </strong>
                    </span>
                    <span style={{ fontWeight: 800, color: '#2563EB' }}>{progress}% fulfilled</span>
                  </div>

                  {/* Progress Bar */}
                  <div
                    style={{
                      height: '8px',
                      backgroundColor: '#F1F5F9',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      marginBottom: '8px'
                    }}
                  >
                    <div
                      style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: progress >= 80 ? '#059669' : '#3978F6',
                        borderRadius: '9999px'
                      }}
                    />
                  </div>

                  {/* Metric Chips */}
                  <div style={{ display: 'flex', gap: '10px', fontSize: '11.5px' }}>
                    <span style={{ color: '#059669', fontWeight: 700 }}>
                      ✓ {recommended} AI Recommended
                    </span>
                    <span style={{ color: '#D97706', fontWeight: 700 }}>
                      △ {pending} Awaiting Review
                    </span>
                  </div>
                </div>

                {/* Right: Action Button */}
                <div>
                  <button
                    onClick={() => navigate(`/officer/ai-shortlisting/${job.id}`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      backgroundColor: '#101B36',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(16, 27, 54, 0.2)'
                    }}
                  >
                    <span>Open Shortlisting Workspace</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
