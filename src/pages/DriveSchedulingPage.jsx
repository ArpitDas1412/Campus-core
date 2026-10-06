import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/officer/Sidebar';
import Topbar from '../components/officer/Topbar';
import RecruiterLayout from '../components/recruiter/RecruiterLayout';
import ScheduleHeader from '../components/scheduling/ScheduleHeader';
import ScheduleHealth from '../components/scheduling/ScheduleHealth';
import ScheduleCalendar from '../components/scheduling/ScheduleCalendar';
import ScheduleTimeline from '../components/scheduling/ScheduleTimeline';
import ScheduleTable from '../components/scheduling/ScheduleTable';
import ConflictPanel from '../components/scheduling/ConflictPanel';
import ResourcePanel from '../components/scheduling/ResourcePanel';
import ScheduleAuditLog from '../components/scheduling/ScheduleAuditLog';
import ScheduleWizard from '../components/scheduling/ScheduleWizard';
import RescheduleModal from '../components/scheduling/RescheduleModal';
import InterviewDetailsModal from '../components/scheduling/InterviewDetailsModal';
import {
  getDriveSchedule,
  applySlotRecommendation,
  rescheduleInterview,
  cancelInterview,
  publishSchedule,
  recordAttendance,
  recordRoundResult,
  getScheduleAudit
} from '../services/schedulingEngine';
import {
  Calendar as CalendarIcon,
  Clock,
  List,
  AlertTriangle,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  RotateCcw
} from 'lucide-react';

export default function DriveSchedulingPage({ isRecruiter = false }) {
  const { jobId = 'JOB-2027-001' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const startInWizard = queryParams.get('wizard') === 'true';

  const [activeDate, setActiveDate] = useState('2026-10-15');
  const [activeView, setActiveView] = useState('CALENDAR'); // 'CALENDAR', 'TIMELINE', 'TABLE', 'CONFLICTS', 'RESOURCES'
  const [showWizard, setShowWizard] = useState(startInWizard);
  const [toastMessage, setToastMessage] = useState(null);

  const [driveSchedule, setDriveSchedule] = useState(() => getDriveSchedule(jobId));
  const [auditLogs, setAuditLogs] = useState(() => getScheduleAudit(jobId));

  const [rescheduleItem, setRescheduleItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [showPublishModal, setShowPublishModal] = useState(false);

  useEffect(() => {
    const data = getDriveSchedule(jobId);
    setDriveSchedule({ ...data });
    setAuditLogs(getScheduleAudit(jobId));
  }, [jobId]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApplyRecommendation = (scheduleId, recommendation) => {
    const updated = applySlotRecommendation(scheduleId, recommendation, isRecruiter ? 'Recruiter (Ananya Mehta)' : 'Placement Officer');
    if (updated) {
      const refreshed = getDriveSchedule(jobId);
      setDriveSchedule({ ...refreshed });
      setAuditLogs(getScheduleAudit(jobId));
      showToast(`Conflict resolved! Moved interview to ${recommendation.label || recommendation.time}`);
    }
  };

  const handleConfirmReschedule = (reschedulePayload) => {
    if (!rescheduleItem) return;
    rescheduleInterview(
      rescheduleItem.id,
      reschedulePayload,
      reschedulePayload.reason,
      isRecruiter ? 'Recruiter' : 'Placement Officer'
    );
    const refreshed = getDriveSchedule(jobId);
    setDriveSchedule({ ...refreshed });
    setAuditLogs(getScheduleAudit(jobId));
    setRescheduleItem(null);
    showToast('Interview successfully rescheduled and audit log updated.');
  };

  const handleCancelInterview = (item) => {
    if (window.confirm(`Cancel interview for ${item.candidateName}?`)) {
      cancelInterview(item.id, 'Cancelled via Schedule Command Roster', isRecruiter ? 'Recruiter' : 'Placement Officer');
      const refreshed = getDriveSchedule(jobId);
      setDriveSchedule({ ...refreshed });
      setAuditLogs(getScheduleAudit(jobId));
      showToast(`Interview for ${item.candidateName} cancelled.`);
    }
  };

  const handlePublishDrive = () => {
    publishSchedule(jobId, isRecruiter ? 'TechNova Lead Recruiter' : 'Placement Officer');
    const refreshed = getDriveSchedule(jobId);
    setDriveSchedule({ ...refreshed });
    setAuditLogs(getScheduleAudit(jobId));
    setShowPublishModal(false);
    showToast('Placement drive schedule officially published to students!');
  };

  // Demo step 13: Intentionally inject a conflict for Rahul Kumar
  const handleTriggerDemoConflict = () => {
    const schedules = driveSchedule.schedules || [];
    const rahul = schedules.find((s) => s.candidateId === 'std-1');
    if (rahul) {
      rahul.startTime = '10:00';
      rahul.endTime = '10:30';
      rahul.hasConflict = true;
      rahul.conflictStatus = 'Conflict';
      rahul.conflictDetail = 'Simultaneous Infosys Online Assessment at 10:00 AM';

      // Update conflicts list
      const conflicts = driveSchedule.conflicts || [];
      const hasConflictAlready = conflicts.some((c) => c.candidateId === 'std-1');
      if (!hasConflictAlready) {
        conflicts.unshift({
          id: `CONF-DEMO-${Date.now()}`,
          severity: 'Critical',
          type: 'Candidate Conflict',
          title: 'Candidate Double-Booked at 10:00 AM',
          candidateId: 'std-1',
          candidateName: 'Rahul Kumar',
          date: '2026-10-15',
          time: '10:00 AM',
          scheduleId: rahul.id,
          description: 'Rahul Kumar has an existing interview scheduled with Infosys at 10:00 AM on 15 Oct 2026.',
          recommendations: [
            { date: '2026-10-15', time: '10:30', label: '10:30 AM — Room A102', roomId: 'ROOM-A102', roomName: 'Room A102', interviewerId: 'INT-002', interviewerName: 'Priya Nair', isConflictFree: true },
            { date: '2026-10-15', time: '11:00', label: '11:00 AM — Room A103', roomId: 'ROOM-A103', roomName: 'Room A103', interviewerId: 'INT-003', interviewerName: 'Arjun Kapoor', isConflictFree: true },
            { date: '2026-10-15', time: '14:30', label: '02:30 PM — Online Panel', roomId: 'PANEL-ONLINE-1', roomName: 'Google Meet Panel 1', interviewerId: 'INT-004', interviewerName: 'Sneha Deshmukh', isConflictFree: true }
          ]
        });
      }
      setDriveSchedule({ ...driveSchedule, schedules, conflicts, healthScore: 92 });
      showToast('Judge Demo: Moved Rahul Kumar into 10:00 AM conflicting slot.');
    }
  };

  const conflicts = driveSchedule?.conflicts || [];
  const criticalCount = conflicts.filter((c) => c.severity === 'Critical').length;
  const isPublished = driveSchedule?.published;

  const content = (
    <div style={{ padding: isRecruiter ? '0' : '24px 32px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
      {/* Toast */}
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

      {/* Schedule Header */}
      <ScheduleHeader
        jobTitle={driveSchedule.jobTitle}
        companyName={driveSchedule.companyName}
        activeDate={activeDate}
        onDateChange={setActiveDate}
        onCreateScheduleClick={() => setShowWizard(!showWizard)}
        isRecruiter={isRecruiter}
      />

      {/* Judge Demonstration Control Ribbon */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1.5px solid #BFDBFE',
          padding: '14px 20px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="#2563EB" />
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#101B36' }}>
            Interactive Demo Tools:
          </span>
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Test conflict detection, alternative slot recommendation, and publishing live.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Step 13: Simulate Conflict */}
          <button
            onClick={handleTriggerDemoConflict}
            style={{
              padding: '6px 12px',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <AlertTriangle size={13} />
            <span>Simulate Rahul Conflict (10:00 AM)</span>
          </button>

          {/* Publish Button */}
          <button
            onClick={() => setShowPublishModal(true)}
            style={{
              padding: '6px 14px',
              backgroundColor: isPublished ? '#ECFDF5' : '#059669',
              color: isPublished ? '#059669' : '#FFFFFF',
              border: isPublished ? '1px solid #A7F3D0' : 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle2 size={13} />
            <span>{isPublished ? '✓ Published Schedule' : 'Publish Schedule'}</span>
          </button>

          {/* Student Schedule View Jump */}
          <button
            onClick={() => navigate('/student/schedule')}
            style={{
              padding: '6px 12px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Eye size={13} />
            <span>Open Student Schedule</span>
          </button>
        </div>
      </div>

      {/* Schedule Health Card */}
      <ScheduleHealth
        healthScore={driveSchedule.healthScore || 96}
        validCount={driveSchedule.schedules?.length || 96}
        warningCount={driveSchedule.conflicts?.filter((c) => c.severity === 'Warning').length || 2}
        criticalCount={criticalCount}
        onResolveClick={() => setActiveView('CONFLICTS')}
        onRefresh={() => {
          const refreshed = getDriveSchedule(jobId);
          setDriveSchedule({ ...refreshed });
          showToast('Schedule re-evaluated.');
        }}
      />

      {/* Main View Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#FFFFFF',
          padding: '8px 12px',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          marginBottom: '20px',
          flexWrap: 'wrap',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}
      >
        <button
          onClick={() => setActiveView('CALENDAR')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeView === 'CALENDAR' ? '#2563EB' : 'transparent',
            color: activeView === 'CALENDAR' ? '#FFFFFF' : '#64748B',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <CalendarIcon size={14} />
          <span>Calendar View</span>
        </button>

        <button
          onClick={() => setActiveView('TIMELINE')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeView === 'TIMELINE' ? '#2563EB' : 'transparent',
            color: activeView === 'TIMELINE' ? '#FFFFFF' : '#64748B',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Clock size={14} />
          <span>Timeline View</span>
        </button>

        <button
          onClick={() => setActiveView('TABLE')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeView === 'TABLE' ? '#2563EB' : 'transparent',
            color: activeView === 'TABLE' ? '#FFFFFF' : '#64748B',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <List size={14} />
          <span>Schedule Table ({driveSchedule.schedules?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveView('CONFLICTS')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeView === 'CONFLICTS' ? '#DC2626' : criticalCount > 0 ? '#FEF2F2' : 'transparent',
            color: activeView === 'CONFLICTS' ? '#FFFFFF' : criticalCount > 0 ? '#DC2626' : '#64748B',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <AlertTriangle size={14} />
          <span>Conflicts ({conflicts.length})</span>
        </button>

        <button
          onClick={() => setActiveView('RESOURCES')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeView === 'RESOURCES' ? '#2563EB' : 'transparent',
            color: activeView === 'RESOURCES' ? '#FFFFFF' : '#64748B',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Users size={14} />
          <span>Resource Capacity</span>
        </button>
      </div>

      {/* Wizard Modal Component */}
      {showWizard && (
        <div style={{ marginBottom: '24px' }}>
          <ScheduleWizard
            initialJobId={jobId}
            onCancel={() => setShowWizard(false)}
            onComplete={() => {
              setShowWizard(false);
              const refreshed = getDriveSchedule(jobId);
              setDriveSchedule({ ...refreshed });
              setAuditLogs(getScheduleAudit(jobId));
              showToast('Schedule successfully generated and published!');
            }}
          />
        </div>
      )}

      {/* Active Tab View Rendering */}
      {activeView === 'CALENDAR' && (
        <ScheduleCalendar
          schedules={driveSchedule.schedules || []}
          activeDate={activeDate}
          onSelectInterview={(item) => setDetailItem(item)}
        />
      )}

      {activeView === 'TIMELINE' && (
        <ScheduleTimeline
          schedules={driveSchedule.schedules || []}
          activeDate={activeDate}
          onSelectInterview={(item) => setDetailItem(item)}
        />
      )}

      {activeView === 'TABLE' && (
        <ScheduleTable
          schedules={driveSchedule.schedules || []}
          onStartInterviewClick={(item) => setDetailItem(item)}
          onRescheduleClick={(item) => setRescheduleItem(item)}
          onCancelClick={handleCancelInterview}
        />
      )}

      {activeView === 'CONFLICTS' && (
        <ConflictPanel
          conflicts={conflicts}
          onApplyRecommendation={handleApplyRecommendation}
          onManuallyReschedule={(item) => setRescheduleItem(item)}
        />
      )}

      {activeView === 'RESOURCES' && (
        <ResourcePanel schedules={driveSchedule.schedules || []} />
      )}

      {/* Bottom Audit Log */}
      <div style={{ marginTop: '24px' }}>
        <ScheduleAuditLog auditLogs={auditLogs} />
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
            const refreshed = getDriveSchedule(jobId);
            setDriveSchedule({ ...refreshed });
          }}
          onRecordResult={(id, result, score, notes) => {
            recordRoundResult(id, result, score, notes);
            const refreshed = getDriveSchedule(jobId);
            setDriveSchedule({ ...refreshed });
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

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16, 27, 54, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '28px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <CheckCircle2 size={28} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 10px' }}>
              Publish this placement schedule?
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 20px' }}>
              {driveSchedule.schedules?.length || 96} Candidates • {driveSchedule.rounds?.length || 4} Rounds • 15 Oct – 17 Oct • 0 Critical Conflicts
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowPublishModal(false)}
                style={{
                  padding: '10px 18px',
                  backgroundColor: '#F1F5F9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handlePublishDrive}
                style={{
                  padding: '10px 22px',
                  backgroundColor: '#059669',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Publish Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isRecruiter) {
    return <RecruiterLayout>{content}</RecruiterLayout>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFD' }}>
      <Sidebar activeModule="scheduling" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar />
        <main>{content}</main>
      </div>
    </div>
  );
}
