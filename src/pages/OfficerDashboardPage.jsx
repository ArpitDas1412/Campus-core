import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/officer/Sidebar';
import Topbar from '../components/officer/Topbar';
import WelcomeBanner from '../components/officer/WelcomeBanner';
import KpiSection from '../components/officer/KpiSection';
import PlacementProgressChart from '../components/officer/PlacementProgressChart';
import DepartmentPerformanceChart from '../components/officer/DepartmentPerformanceChart';
import UpcomingDrivesTable from '../components/officer/UpcomingDrivesTable';
import RecentActivityFeed from '../components/officer/RecentActivityFeed';
import AiInsightsSection from '../components/officer/AiInsightsSection';
import QuickActions from '../components/officer/QuickActions';
import StudentReadinessCard from '../components/officer/StudentReadinessCard';
import ResumeIntelligenceSummaryCard from '../components/officer/ResumeIntelligenceSummaryCard';
import RecruiterPipelineFunnel from '../components/officer/RecruiterPipelineFunnel';
import NotificationPanel from '../components/officer/NotificationPanel';
import SearchModal from '../components/officer/SearchModal';
import AddStudentModal from '../components/officer/modals/AddStudentModal';
import AddRecruiterModal from '../components/officer/modals/AddRecruiterModal';
import CreateDriveModal from '../components/officer/modals/CreateDriveModal';
import PlacementReportModal from '../components/officer/modals/PlacementReportModal';
import ModuleComingSoonModal from '../components/officer/modals/ModuleComingSoonModal';
import InsightDetailModal from '../components/officer/modals/InsightDetailModal';

import {
  getStoredStudents,
  saveStoredStudents,
  getStoredRecruiters,
  saveStoredRecruiters,
  getStoredDrives,
  saveStoredDrives,
  getStoredNotifications,
  saveStoredNotifications
} from '../data';

export default function OfficerDashboardPage() {
  const { user } = useAuth();

  // State Management with LocalStorage backing
  const [students, setStudents] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [drives, setDrives] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // UI Interactive States
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Modals
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [addRecruiterOpen, setAddRecruiterOpen] = useState(false);
  const [createDriveOpen, setCreateDriveOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState({
    isOpen: false,
    moduleKey: '',
    moduleTitle: '',
    layerNumber: 3
  });
  const [selectedInsight, setSelectedInsight] = useState(null);

  // Analytics scroll ref
  const analyticsSectionRef = useRef(null);

  // Load initial data
  useEffect(() => {
    setStudents(getStoredStudents());
    setRecruiters(getStoredRecruiters());
    setDrives(getStoredDrives());
    setNotifications(getStoredNotifications());
  }, []);

  // Keyboard shortcut (Cmd/Ctrl + K) for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for Add Student
  const handleAddStudent = (newStudent) => {
    const updated = [newStudent, ...students];
    setStudents(updated);
    saveStoredStudents(updated);
  };

  // Handlers for Add Recruiter
  const handleAddRecruiter = (newRecruiter) => {
    const updated = [newRecruiter, ...recruiters];
    setRecruiters(updated);
    saveStoredRecruiters(updated);
  };

  // Handlers for Create Drive
  const handleAddDrive = (newDrive) => {
    const updated = [newDrive, ...drives];
    setDrives(updated);
    saveStoredDrives(updated);
  };

  // Handlers for Notifications
  const handleMarkAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    saveStoredNotifications(updated);
  };

  // Unread notifications count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Navigation module click handler
  const handleNavigateModule = (moduleKey, label, isComingSoon, layerNumber) => {
    if (isComingSoon) {
      setComingSoonModal({
        isOpen: true,
        moduleKey,
        moduleTitle: label,
        layerNumber: layerNumber || 3
      });
    }
  };

  // Scroll to analytics smoothly
  const handleScrollToAnalytics = () => {
    if (analyticsSectionRef.current) {
      analyticsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#F8FAFD',
        color: '#101B36',
        position: 'relative'
      }}
    >
      {/* 1. LEFT PERSISTENT SIDEBAR */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onNavigateModule={handleNavigateModule}
        activeModule="dashboard"
      />

      {/* 2. MAIN CONTENT AREA */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          position: 'relative'
        }}
      >
        {/* Top Header */}
        <Topbar
          onOpenSearch={() => setSearchModalOpen(true)}
          onToggleNotifications={() => setNotificationPanelOpen(!notificationPanelOpen)}
          unreadCount={unreadCount}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
        />

        {/* Dropdown Notification Panel Overlay */}
        <NotificationPanel
          isOpen={notificationPanelOpen}
          onClose={() => setNotificationPanelOpen(false)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
        />

        {/* Dashboard Body Content */}
        <main
          style={{
            flex: 1,
            padding: '28px 32px 60px',
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px'
          }}
          className="dashboard-main-content"
        >
          {/* Section 4: Welcome Banner */}
          <WelcomeBanner
            onCreateDrive={() => setCreateDriveOpen(true)}
            onViewAnalytics={handleScrollToAnalytics}
          />

          {/* Section 5: Key Performance Indicators (6 KPI Cards) */}
          <KpiSection
            onCardClick={(cardId) => {
              if (cardId === 'studentsAtRisk') {
                setSelectedInsight({
                  id: 'ai-2',
                  number: 'INSIGHT 02',
                  text: '74 students may require intervention before the next recruitment cycle.',
                  actionLabel: 'View At-Risk Students',
                  badge: 'Student Welfare',
                  impact: 'Urgent',
                  details: 'These 74 students in Mech, Civil, and EEE have readiness scores below 50% or unverified mock interviews. Early intervention cohorts could recover ~55 offers.'
                });
              } else if (cardId === 'activeDrives') {
                setComingSoonModal({
                  isOpen: true,
                  moduleKey: 'drives',
                  moduleTitle: 'Placement Drives',
                  layerNumber: 7
                });
              } else if (cardId === 'activeRecruiters') {
                setComingSoonModal({
                  isOpen: true,
                  moduleKey: 'recruiters',
                  moduleTitle: 'Recruiters Directory',
                  layerNumber: 6
                });
              }
            }}
          />

          {/* Section 10: CampusCore AI Insights (Prominent Visual Feature) */}
          <AiInsightsSection
            onInsightAction={(insight) => {
              setSelectedInsight(insight);
            }}
          />

          {/* Section 6 & 7: Charts Grid (Placement Progress & Department Performance) */}
          <div
            ref={analyticsSectionRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
              gap: '24px'
            }}
            className="charts-grid"
          >
            {/* Section 6: Placement Progress Chart */}
            <PlacementProgressChart />

            {/* Section 7: Department Performance Chart */}
            <DepartmentPerformanceChart
              onSelectDepartment={(dept) => {
                navigate('/officer/analytics');
              }}
            />
          </div>

          {/* Section 12 & 13: Student Readiness & Recruiter Pipeline */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '24px'
            }}
            className="middle-metrics-grid"
          >
            {/* Section 12: Student Readiness */}
            <StudentReadinessCard
              onAnalyzeReadiness={() => {
                setComingSoonModal({
                  isOpen: true,
                  moduleKey: 'students',
                  moduleTitle: 'Student Readiness Diagnostic',
                  layerNumber: 3
                });
              }}
            />

            {/* Section 28 (Layer 5): Resume Intelligence Summary Card */}
            <ResumeIntelligenceSummaryCard />

            {/* Section 13: Recruiter Pipeline Funnel */}
            <RecruiterPipelineFunnel
              onInspectFunnel={() => {
                setComingSoonModal({
                  isOpen: true,
                  moduleKey: 'recruiters',
                  moduleTitle: 'Recruiter Funnel Deep-Dive',
                  layerNumber: 6
                });
              }}
            />
          </div>

          {/* Section 8 & 9: Upcoming Placement Drives & Recent Placement Activity */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.55fr) minmax(0, 1fr)',
              gap: '24px'
            }}
            className="table-activity-grid"
          >
            {/* Section 8: Upcoming Drives Table */}
            <UpcomingDrivesTable
              drives={drives}
              onViewAllDrives={() => {
                setComingSoonModal({
                  isOpen: true,
                  moduleKey: 'drives',
                  moduleTitle: 'All Placement Drives',
                  layerNumber: 7
                });
              }}
              onSelectDrive={(drive) => {
                setComingSoonModal({
                  isOpen: true,
                  moduleKey: 'drives',
                  moduleTitle: `${drive.company} — ${drive.role} Drive Details`,
                  layerNumber: 7
                });
              }}
            />

            {/* Section 9: Recent Activity Feed */}
            <RecentActivityFeed
              onActivityClick={(act) => {
                if (act.type === 'alert') {
                  setSelectedInsight({
                    id: 'ai-2',
                    number: 'INSIGHT 02',
                    text: '74 students may require intervention before the next recruitment cycle.',
                    actionLabel: 'View At-Risk Students',
                    badge: 'Student Welfare',
                    impact: 'Urgent',
                    details: 'These 74 students in Mech, Civil, and EEE have readiness scores below 50% or unverified mock interviews.'
                  });
                }
              }}
            />
          </div>

          {/* Section 11: Quick Actions */}
          <QuickActions
            onAddStudent={() => setAddStudentOpen(true)}
            onAddRecruiter={() => setAddRecruiterOpen(true)}
            onCreateDrive={() => setCreateDriveOpen(true)}
            onGenerateReport={() => setReportModalOpen(true)}
          />
        </main>
      </div>

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={(type, item) => {
          if (type === 'student') {
            setComingSoonModal({
              isOpen: true,
              moduleKey: 'students',
              moduleTitle: `Student Profile: ${item.name} (${item.department})`,
              layerNumber: 3
            });
          } else if (type === 'recruiter') {
            setComingSoonModal({
              isOpen: true,
              moduleKey: 'recruiters',
              moduleTitle: `Recruiter Partner: ${item.company}`,
              layerNumber: 6
            });
          } else if (type === 'drive') {
            setComingSoonModal({
              isOpen: true,
              moduleKey: 'drives',
              moduleTitle: `Drive: ${item.company} (${item.role})`,
              layerNumber: 7
            });
          }
        }}
      />

      <AddStudentModal
        isOpen={addStudentOpen}
        onClose={() => setAddStudentOpen(false)}
        onAddStudent={handleAddStudent}
      />

      <AddRecruiterModal
        isOpen={addRecruiterOpen}
        onClose={() => setAddRecruiterOpen(false)}
        onAddRecruiter={handleAddRecruiter}
      />

      <CreateDriveModal
        isOpen={createDriveOpen}
        onClose={() => setCreateDriveOpen(false)}
        onAddDrive={handleAddDrive}
      />

      <PlacementReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      <ModuleComingSoonModal
        isOpen={comingSoonModal.isOpen}
        onClose={() =>
          setComingSoonModal({ isOpen: false, moduleKey: '', moduleTitle: '', layerNumber: 3 })
        }
        moduleKey={comingSoonModal.moduleKey}
        moduleTitle={comingSoonModal.moduleTitle}
        layerNumber={comingSoonModal.layerNumber}
      />

      <InsightDetailModal
        isOpen={!!selectedInsight}
        onClose={() => setSelectedInsight(null)}
        insight={selectedInsight}
      />
    </div>
  );
}
