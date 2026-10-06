import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  Play,
  RotateCcw,
  Check,
  UserCheck
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import {
  getDriveSchedule,
  rescheduleInterview,
  cancelInterview,
  recordAttendance,
  recordRoundResult,
  formatTime12h
} from '../../services/schedulingEngine';
import RescheduleModal from '../../components/scheduling/RescheduleModal';
import InterviewDetailsModal from '../../components/scheduling/InterviewDetailsModal';

export default function InterviewsPage() {
  const navigate = useNavigate();

  // Load drive schedule items for TechNova
  const [driveData, setDriveData] = useState(() => getDriveSchedule('JOB-2027-001'));
  const [activeTab, setActiveTab] = useState('TODAY'); // 'TODAY', 'UPCOMING', 'COMPLETED', 'PENDING_FEEDBACK'
  const [interviewerFilter, setInterviewerFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const [rescheduleItem, setRescheduleItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmReschedule = (reschedulePayload) => {
    if (!rescheduleItem) return;
    rescheduleInterview(rescheduleItem.id, reschedulePayload, reschedulePayload.reason, 'Recruiter (Ananya Mehta)');
    setDriveData({ ...getDriveSchedule('JOB-2027-001') });
    setRescheduleItem(null);
    showToast('Interview successfully rescheduled.');
  };

  const handleCancelInterview = (item) => {
    if (window.confirm(`Cancel interview with ${item.candidateName}?`)) {
      cancelInterview(item.id, 'Recruiter requested change', 'Recruiter (Ananya Mehta)');
      setDriveData({ ...getDriveSchedule('JOB-2027-001') });
      showToast(`Interview with ${item.candidateName} cancelled.`);
    }
  };

  const allInterviews = driveData?.schedules || [];

  // Recruiter Dashboard KPIs (Section 30)
  const kpiData = {
    today: 42,
    upcoming: 86,
    completed: 120,
    pendingFeedback: 14
  };

  const filteredInterviews = allInterviews.filter((item) => {
    if (interviewerFilter !== 'ALL' && !item.interviewerIds?.includes(interviewerFilter)) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = (item.candidateName || '').toLowerCase().includes(q);
      const matchRoll = (item.studentRoll || '').toLowerCase().includes(q);
      if (!matchName && !matchRoll) return false;
    }

    if (activeTab === 'TODAY') return item.date === '2026-10-15';
    if (activeTab === 'UPCOMING') return item.date !== '2026-10-15' && item.status !== 'Completed';
    if (activeTab === 'COMPLETED') return item.status === 'Completed' || item.roundResult?.status === 'Passed';
    if (activeTab === 'PENDING_FEEDBACK') return item.roundResult?.status === 'Pending';
    return true;
  });

  return (
    <RecruiterLayout>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            right: '32px',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
            fontSize: '13.5px',
            fontWeight: 700,
            zIndex: 1200
          }}
          className="animate-fade-in"
        >
          {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#2563EB',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                padding: '2px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}
            >
              Layer 10 • Recruiter Interview Console
            </span>
          </div>

          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#101B36',
              margin: '0 0 4px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-heading)'
            }}
          >
            Interview Management
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
            Conduct evaluations, manage interview panels, and coordinate conflict-aware schedules for TechNova Solutions.
          </p>
        </div>

        {/* Quick link to Full Drive Scheduler */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => navigate('/recruiter/jobs/JOB-2027-001/scheduling')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '12px',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)'
            }}
          >
            <Calendar size={16} />
            <span>Open Drive Scheduler</span>
          </button>
        </div>
      </div>

      {/* Recruiter Section 30: 4 KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '24px'
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Today's Interviews
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#2563EB', marginTop: '6px' }}>
            {kpiData.today}
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>Day 1 drive in progress</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Upcoming
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#101B36', marginTop: '6px' }}>
            {kpiData.upcoming}
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>Next 48 hours</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Completed
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#059669', marginTop: '6px' }}>
            {kpiData.completed}
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>Evaluations recorded</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Pending Feedback
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#D97706', marginTop: '6px' }}>
            {kpiData.pendingFeedback}
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>Awaiting panel score</div>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '12px 18px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Tab Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[
            { id: 'TODAY', label: "Today's Panels (15 Oct)" },
            { id: 'UPCOMING', label: 'Upcoming (16–17 Oct)' },
            { id: 'COMPLETED', label: 'Completed' },
            { id: 'PENDING_FEEDBACK', label: 'Pending Feedback' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: activeTab === tab.id ? '#2563EB' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : '#64748B',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '6px 10px'
            }}
          >
            <Search size={14} color="#94A3B8" />
            <input
              type="text"
              placeholder="Filter candidate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '12.5px',
                width: '160px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Recruiter Section 31: Interview Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {filteredInterviews.map((item) => {
          const hasConflict = item.hasConflict || item.conflictStatus === 'Conflict';

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: `1.5px solid ${hasConflict ? '#FECACA' : '#E2E8F0'}`,
                padding: '20px',
                boxShadow: '0 2px 8px rgba(16, 27, 54, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(16, 27, 54, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 27, 54, 0.03)';
              }}
            >
              {/* Card Header: Candidate Name, Round & Conflict Alert */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '0 0 2px' }}>
                      {item.candidateName}
                    </h3>
                    <div style={{ fontSize: '12.5px', color: '#2563EB', fontWeight: 700 }}>
                      {item.jobTitle || 'Software Engineer'} • {item.roundName || 'Technical Interview'}
                    </div>
                  </div>

                  {hasConflict && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#DC2626',
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FECACA',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <AlertTriangle size={12} />
                      Conflict
                    </span>
                  )}
                </div>

                {/* Date, Time, Room & Interviewer */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#101B36', fontWeight: 700 }}>
                    <Clock size={14} color="#2563EB" />
                    <span>{formatTime12h(item.startTime)} — {item.date}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#475569' }}>
                    {item.mode === 'Online' ? <Video size={13} color="#2563EB" /> : <MapPin size={13} color="#059669" />}
                    <span>{item.roomName || item.roomId}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
                    <Users size={13} />
                    <span>{item.interviewerNames?.[0] || 'Priya Nair (Senior Engineering Manager)'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: [View Candidate], [Start Interview], [Reschedule] */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  paddingTop: '12px',
                  borderTop: '1px solid #F1F5F9'
                }}
              >
                <button
                  onClick={() => setDetailItem(item)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    backgroundColor: '#F8FAFC',
                    color: '#334155',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View Candidate
                </button>

                <button
                  onClick={() => setDetailItem(item)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Play size={12} fill="#FFFFFF" />
                  <span>Start Interview</span>
                </button>

                <button
                  onClick={() => setRescheduleItem(item)}
                  title="Reschedule Interview"
                  style={{
                    padding: '8px',
                    backgroundColor: '#F1F5F9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reschedule Modal */}
      {rescheduleItem && (
        <RescheduleModal
          interview={rescheduleItem}
          onClose={() => setRescheduleItem(null)}
          onConfirmReschedule={handleConfirmReschedule}
        />
      )}

      {/* Interview Details & Evaluation Modal */}
      {detailItem && (
        <InterviewDetailsModal
          interview={detailItem}
          onClose={() => setDetailItem(null)}
          onRecordAttendance={(id, status) => {
            recordAttendance(id, status);
            setDriveData({ ...getDriveSchedule('JOB-2027-001') });
            showToast('Attendance recorded.');
          }}
          onRecordResult={(id, result, score, feedback) => {
            recordRoundResult(id, result, score, feedback);
            setDriveData({ ...getDriveSchedule('JOB-2027-001') });
            showToast(`Evaluation saved: Round marked as ${result}.`);
          }}
          onRescheduleClick={(item) => {
            setDetailItem(null);
            setRescheduleItem(item);
          }}
          onCancelClick={(item) => {
            setDetailItem(null);
            handleCancelInterview(item);
          }}
        />
      )}
    </RecruiterLayout>
  );
}
