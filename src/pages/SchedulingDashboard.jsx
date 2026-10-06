import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/officer/Sidebar';
import Topbar from '../components/officer/Topbar';
import ScheduleHeader from '../components/scheduling/ScheduleHeader';
import ScheduleStats from '../components/scheduling/ScheduleStats';
import ScheduleHealth from '../components/scheduling/ScheduleHealth';
import ActiveDriveList from '../components/scheduling/ActiveDriveList';
import ConflictPanel from '../components/scheduling/ConflictPanel';
import ResourcePanel from '../components/scheduling/ResourcePanel';
import ScheduleAuditLog from '../components/scheduling/ScheduleAuditLog';
import ScheduleWizard from '../components/scheduling/ScheduleWizard';
import RescheduleModal from '../components/scheduling/RescheduleModal';
import {
  getDriveSchedule,
  detectScheduleConflicts,
  applySlotRecommendation,
  rescheduleInterview,
  getScheduleAudit
} from '../services/schedulingEngine';

export default function SchedulingDashboard() {
  const navigate = useNavigate();
  const [activeDate, setActiveDate] = useState('2026-10-15');
  const [showWizard, setShowWizard] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('JOB-2027-001');

  // Load drive schedule
  const defaultDrive = getDriveSchedule('JOB-2027-001');
  const [driveSchedule, setDriveSchedule] = useState(defaultDrive);
  const [auditLogs, setAuditLogs] = useState(getScheduleAudit());
  const [toastMessage, setToastMessage] = useState(null);
  const [rescheduleItem, setRescheduleItem] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApplyRecommendation = (scheduleId, recommendation) => {
    const updated = applySlotRecommendation(scheduleId, recommendation, 'Placement Officer');
    if (updated) {
      const refreshed = getDriveSchedule('JOB-2027-001');
      setDriveSchedule({ ...refreshed });
      setAuditLogs(getScheduleAudit());
      showToast(`Conflict resolved! Moved interview to ${recommendation.label || recommendation.time}`);
    }
  };

  const handleConfirmReschedule = (reschedulePayload) => {
    if (!rescheduleItem) return;
    rescheduleInterview(rescheduleItem.id, reschedulePayload, reschedulePayload.reason, 'Placement Officer');
    const refreshed = getDriveSchedule('JOB-2027-001');
    setDriveSchedule({ ...refreshed });
    setAuditLogs(getScheduleAudit());
    setRescheduleItem(null);
    showToast('Interview successfully rescheduled and audit trail updated.');
  };

  const conflicts = driveSchedule?.conflicts || [];
  const criticalCount = conflicts.filter((c) => c.severity === 'Critical').length;
  const warningCount = conflicts.filter((c) => c.severity === 'Warning').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFD' }}>
      {/* Officer Sidebar (with Scheduling highlighted) */}
      <Sidebar activeModule="scheduling" />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar />

        <main style={{ padding: '24px 32px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
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

          {/* Top Header */}
          <ScheduleHeader
            activeDate={activeDate}
            onDateChange={setActiveDate}
            onCreateScheduleClick={() => setShowWizard(true)}
          />

          {/* Wizard Modal View if triggered */}
          {showWizard ? (
            <div style={{ marginBottom: '24px' }}>
              <ScheduleWizard
                initialJobId={selectedJobId}
                onCancel={() => setShowWizard(false)}
                onComplete={(jobId) => {
                  setShowWizard(false);
                  const refreshed = getDriveSchedule(jobId);
                  setDriveSchedule({ ...refreshed });
                  setAuditLogs(getScheduleAudit());
                  showToast('Placement drive schedule successfully generated and saved!');
                }}
              />
            </div>
          ) : (
            <>
              {/* 6 KPI Cards */}
              <ScheduleStats />

              {/* Schedule Health Card */}
              <ScheduleHealth
                healthScore={driveSchedule?.healthScore || 96}
                validCount={382}
                warningCount={warningCount || 6}
                criticalCount={criticalCount || 1}
                onResolveClick={() => {
                  const elem = document.getElementById('conflict-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                onRefresh={() => {
                  const refreshed = getDriveSchedule('JOB-2027-001');
                  setDriveSchedule({ ...refreshed });
                  showToast('Collision detection re-evaluated.');
                }}
              />

              {/* Active Placement Drives Section */}
              <ActiveDriveList
                onSelectDrive={(jobId, isWizard = false) => {
                  setSelectedJobId(jobId);
                  if (isWizard) {
                    setShowWizard(true);
                  } else {
                    navigate(`/officer/scheduling/${jobId}`);
                  }
                }}
              />

              {/* Conflict Panel (Section 19-24) */}
              <div id="conflict-section" style={{ marginBottom: '24px' }}>
                <ConflictPanel
                  conflicts={conflicts}
                  onApplyRecommendation={handleApplyRecommendation}
                  onManuallyReschedule={(item) => setRescheduleItem(item)}
                />
              </div>

              {/* Resource Capacity Panel (Section 38-40) */}
              <ResourcePanel schedules={driveSchedule?.schedules || []} />

              {/* Schedule Audit Activity Trail (Section 37) */}
              <ScheduleAuditLog auditLogs={auditLogs} />
            </>
          )}

          {/* Reschedule Modal */}
          {rescheduleItem && (
            <RescheduleModal
              interview={rescheduleItem}
              onClose={() => setRescheduleItem(null)}
              onConfirmReschedule={handleConfirmReschedule}
            />
          )}
        </main>
      </div>
    </div>
  );
}
