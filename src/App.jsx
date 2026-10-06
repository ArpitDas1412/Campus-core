import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import OfficerDashboardPage from './pages/OfficerDashboardPage';
import StudentDirectoryPage from './pages/StudentDirectoryPage';
import StudentProfilePage from './pages/StudentProfilePage';
import AddStudentPage from './pages/AddStudentPage';
import StudentSkillGapPage from './pages/StudentSkillGapPage';
import ResumeIntelligencePage from './pages/ResumeIntelligencePage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

// Layer 6: AI-Powered Recruiter & Company Portal Pages
import RecruiterDashboardPage from './pages/recruiter/RecruiterDashboardPage';
import CompanyProfilePage from './pages/recruiter/CompanyProfilePage';
import JobsListPage from './pages/recruiter/JobsListPage';
import CreateJobPage from './pages/recruiter/CreateJobPage';
import JobDetailPage from './pages/recruiter/JobDetailPage';
import CandidatesPage from './pages/recruiter/CandidatesPage';
import CandidateProfileRecruiterPage from './pages/recruiter/CandidateProfileRecruiterPage';
import ShortlistsPage from './pages/recruiter/ShortlistsPage';
import InterviewsPage from './pages/recruiter/InterviewsPage';
import OffersPage from './pages/recruiter/OffersPage';
import RecruitmentAnalyticsPage from './pages/recruiter/RecruitmentAnalyticsPage';
import TalentInsightsPage from './pages/recruiter/TalentInsightsPage';
import MessagesPage from './pages/recruiter/MessagesPage';
import RecruiterNotificationsPage from './pages/recruiter/RecruiterNotificationsPage';
import RecruiterSettingsPage from './pages/recruiter/RecruiterSettingsPage';

// Layer 7: AI-Powered Candidate Matching & Talent Discovery Pages
import AiMatchingPage from './pages/recruiter/AiMatchingPage';
import OfficerAiMatchingPage from './pages/officer/OfficerAiMatchingPage';

// Layer 8: Explainable AI Fit Score & Match Intelligence Pages
import ExplainableFitScorePage from './pages/ExplainableFitScorePage';

// Layer 9: AI-Powered Smart Shortlisting & Decision Engine Pages
import SmartShortlistingPage from './pages/recruiter/SmartShortlistingPage';
import OfficerShortlistingPage from './pages/officer/OfficerShortlistingPage';

// Layer 10: Intelligent Placement Drive Scheduler & Conflict-Aware Interview Management Pages
import SchedulingDashboard from './pages/SchedulingDashboard';
import DriveSchedulingPage from './pages/DriveSchedulingPage';
import StudentSchedulePage from './pages/StudentSchedulePage';

// Layer 11: Intelligent Communication Center, Notifications & Placement Updates Pages
import CommunicationCenterPage from './pages/officer/CommunicationCenterPage';
import AnnouncementsPage from './pages/officer/AnnouncementsPage';
import TemplatesPage from './pages/officer/TemplatesPage';
import CommunicationHistoryPage from './pages/officer/CommunicationHistoryPage';
import StudentNotificationsPage from './pages/student/StudentNotificationsPage';
import StudentMessagesPage from './pages/student/StudentMessagesPage';

// Layer 12: Offer & Document Tracker Pages
import OfficerOffersPage from './pages/officer/OffersPage';
import OfficerOfferDetailPage from './pages/officer/OfferDetailPage';
import OfficerDocumentsPage from './pages/officer/DocumentsPage';
import OfficerDocumentReviewPage from './pages/officer/DocumentReviewPage';
import OfficerJoiningPage from './pages/officer/JoiningPage';

import RecruiterOfferDetailPage from './pages/recruiter/RecruiterOfferDetailPage';

import StudentOffersPage from './pages/student/StudentOffersPage';
import StudentOfferDetailPage from './pages/student/StudentOfferDetailPage';
import StudentDocumentsPage from './pages/student/StudentDocumentsPage';
import StudentJoiningPage from './pages/student/StudentJoiningPage';

import OfferPreviewPage from './pages/OfferPreviewPage';

// Layer 13: Campus Intelligence & Executive Placement Analytics
import CampusIntelligencePage from './pages/officer/CampusIntelligencePage';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ErrorBoundary>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/register" element={<AuthPage initialMode="register" />} />

          {/* Layer 6: AI-Powered Recruiter & Company Portal */}
          <Route
            path="/recruiter/dashboard"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <RecruiterDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/company"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <CompanyProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/create"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <CreateJobPage />
              </ProtectedRoute>
            }
          />
          {/* Layer 8: Explainable AI Fit Score & Match Intelligence */}
          <Route
            path="/recruiter/jobs/:jobId/matching/:candidateId"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <ExplainableFitScorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/:jobId/matching"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <AiMatchingPage />
              </ProtectedRoute>
            }
          />
          {/* Layer 9: AI-Powered Smart Shortlisting & Decision Engine */}
          <Route
            path="/recruiter/jobs/:jobId/shortlisting/:candidateId"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <SmartShortlistingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/:jobId/shortlisting"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <SmartShortlistingPage />
              </ProtectedRoute>
            }
          />
          {/* Layer 10: Intelligent Placement Drive Scheduler & Conflict-Aware Management */}
          <Route
            path="/recruiter/jobs/:jobId/scheduling/:scheduleId"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <DriveSchedulingPage isRecruiter={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/:jobId/scheduling"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <DriveSchedulingPage isRecruiter={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/:jobId/candidates"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <CandidatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/:jobId"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <JobDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <JobsListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/candidates/:candidateId"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <CandidateProfileRecruiterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/candidates"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <CandidatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/shortlists"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <ShortlistsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/interviews"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <InterviewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/offers"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <OffersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/offers/:offerId"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <RecruiterOfferDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/analytics"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <RecruitmentAnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/talent-insights"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <TalentInsightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/messages"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/notifications"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <RecruiterNotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/settings"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <RecruiterSettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter"
            element={<Navigate to="/recruiter/dashboard" replace />}
          />

          {/* Layer 3: Student Readiness & 360 Profile Routes */}
          <Route
            path="/officer/students"
            element={
              <ProtectedRoute allowedRole="officer">
                <StudentDirectoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/students/add"
            element={
              <ProtectedRoute allowedRole="officer">
                <AddStudentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/students/:studentId/skill-gap"
            element={
              <ProtectedRoute allowedRole="officer">
                <StudentSkillGapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/students/:studentId"
            element={
              <ProtectedRoute>
                <StudentProfilePage />
              </ProtectedRoute>
            }
          />
          {/* Student Profile Routes */}
          <Route
            path="/student/profile/:studentId"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={<Navigate to="/student/profile" replace />}
          />
          <Route
            path="/skill-gap"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentSkillGapPage />
              </ProtectedRoute>
            }
          />

          {/* Layer 5: Resume Intelligence & Profile Extraction */}
          <Route
            path="/officer/resume-intelligence"
            element={
              <ProtectedRoute allowedRole="officer">
                <ResumeIntelligencePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/students/:studentId/resume"
            element={
              <ProtectedRoute allowedRole="officer">
                <ResumeIntelligencePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/resume"
            element={
              <ProtectedRoute allowedRole="student">
                <ResumeIntelligencePage />
              </ProtectedRoute>
            }
          />
          {/* Layer 10: Student Personal Placement Schedule */}
          <Route
            path="/student/schedule"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentSchedulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={<Navigate to="/student/schedule" replace />}
          />

          {/* Layer 11: Student Communication & Notifications */}
          <Route
            path="/student/notifications"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentNotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/messages"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentMessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={<Navigate to="/student/notifications" replace />}
          />
          <Route
            path="/messages"
            element={<Navigate to="/student/messages" replace />}
          />

          {/* Layer 12: Student Offer, Document & Joining Portal */}
          <Route
            path="/student/offers"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentOffersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/offers/:offerId"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentOfferDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/documents"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDocumentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/joining"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentJoiningPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offers"
            element={<Navigate to="/student/offers" replace />}
          />
          <Route
            path="/documents"
            element={<Navigate to="/student/documents" replace />}
          />
          <Route
            path="/joining"
            element={<Navigate to="/student/joining" replace />}
          />

          {/* Shared Offer Preview Route */}
          <Route
            path="/offer/:offerId/preview"
            element={<OfferPreviewPage />}
          />

          {/* Layer 7: AI-Powered Candidate Matching & Talent Discovery */}
          <Route
            path="/officer/ai-matching"
            element={
              <ProtectedRoute allowedRole="officer">
                <OfficerAiMatchingPage />
              </ProtectedRoute>
            }
          />
          {/* Layer 8: Officer Explainable AI Fit Score */}
          <Route
            path="/officer/ai-matching/:jobId/:candidateId"
            element={
              <ProtectedRoute allowedRole="officer">
                <ExplainableFitScorePage />
              </ProtectedRoute>
            }
          />
          {/* Layer 9: Officer Smart Shortlisting */}
          <Route
            path="/officer/ai-shortlisting/:jobId/:candidateId"
            element={
              <ProtectedRoute allowedRole="officer">
                <SmartShortlistingPage isOfficer={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/ai-shortlisting/:jobId"
            element={
              <ProtectedRoute allowedRole="officer">
                <SmartShortlistingPage isOfficer={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/ai-shortlisting"
            element={
              <ProtectedRoute allowedRole="officer">
                <OfficerShortlistingPage />
              </ProtectedRoute>
            }
          />
          {/* Layer 10: Placement Officer Scheduling Command Center & Drive Scheduler */}
          <Route
            path="/officer/scheduling/:jobId"
            element={
              <ProtectedRoute allowedRole="officer">
                <DriveSchedulingPage isRecruiter={false} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/scheduling"
            element={
              <ProtectedRoute allowedRole="officer">
                <SchedulingDashboard />
              </ProtectedRoute>
            }
          />

          {/* Layer 11: Placement Officer Intelligent Communication Center */}
          <Route
            path="/officer/communications"
            element={
              <ProtectedRoute allowedRole="officer">
                <CommunicationCenterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/communications/announcements"
            element={
              <ProtectedRoute allowedRole="officer">
                <AnnouncementsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/communications/templates"
            element={
              <ProtectedRoute allowedRole="officer">
                <TemplatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/communications/history"
            element={
              <ProtectedRoute allowedRole="officer">
                <CommunicationHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-shortlisting"
            element={<Navigate to="/recruiter/jobs/JOB-2027-001/shortlisting" replace />}
          />
          {/* Layer 8: Shared Direct Route */}
          <Route
            path="/fit-score/:jobId/:candidateId"
            element={
              <ProtectedRoute>
                <ExplainableFitScorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-matching"
            element={<Navigate to="/recruiter/jobs/JOB-2027-001/matching" replace />}
          />

          {/* Layer 12: Placement Officer Offers, Documents & Joining Command Center */}
          <Route
            path="/officer/offers"
            element={
              <ProtectedRoute allowedRole="officer">
                <OfficerOffersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/offers/:offerId"
            element={
              <ProtectedRoute allowedRole="officer">
                <OfficerOfferDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/documents"
            element={
              <ProtectedRoute allowedRole="officer">
                <OfficerDocumentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/documents/:documentId"
            element={
              <ProtectedRoute allowedRole="officer">
                <OfficerDocumentReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/joining"
            element={
              <ProtectedRoute allowedRole="officer">
                <OfficerJoiningPage />
              </ProtectedRoute>
            }
          />

          {/* Layer 13: Campus Intelligence & Executive Placement Analytics */}
          <Route
            path="/officer/analytics"
            element={
              <ProtectedRoute allowedRole="officer">
                <CampusIntelligencePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/intelligence"
            element={<Navigate to="/officer/analytics" replace />}
          />
          <Route
            path="/analytics"
            element={<Navigate to="/officer/analytics" replace />}
          />

          {/* Layer 2: Placement Officer Command Center */}
          <Route
            path="/officer/dashboard"
            element={
              <ProtectedRoute allowedRole="officer">
                <OfficerDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/:tab"
            element={
              <ProtectedRoute allowedRole="officer">
                <OfficerDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer"
            element={<Navigate to="/officer/dashboard" replace />}
          />
          <Route
            path="/dashboard/officer"
            element={<Navigate to="/officer/dashboard" replace />}
          />
          <Route
            path="/dashboard/recruiter"
            element={<Navigate to="/recruiter/dashboard" replace />}
          />

          {/* Role-Based Protected Dashboards */}
          <Route
            path="/dashboard/:role"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/student" replace />}
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </ErrorBoundary>
      </HashRouter>
    </AuthProvider>
  );
}

