import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Mock browser globals needed by components
globalThis.window = {
  location: { pathname: '/', search: '', hash: '' },
  addEventListener: () => {},
  removeEventListener: () => {},
  scrollTo: () => {},
  alert: () => {},
  confirm: () => true
};
globalThis.document = {
  title: '',
  addEventListener: () => {},
  removeEventListener: () => {},
  createElement: () => ({ style: {}, setAttribute: () => {}, appendChild: () => {} }),
  getElementById: () => null
};
const store = {};
globalThis.localStorage = {
  getItem: (k) => store[k] || null,
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
  clear: () => { for (const k in store) delete store[k]; }
};

import { MemoryRouter, Routes, Route } from 'react-router-dom';

async function run() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  const { AuthProvider, DEMO_ACCOUNTS } = await vite.ssrLoadModule('/src/context/AuthContext.jsx');

  const pagesToTest = [
    { name: 'LandingPage', path: '/src/pages/LandingPage.jsx', url: '/' },
    { name: 'AuthPage (login)', path: '/src/pages/AuthPage.jsx', url: '/login', props: { initialMode: 'login' } },
    { name: 'DashboardPage (student)', path: '/src/pages/DashboardPage.jsx', url: '/dashboard/student', role: 'student' },
    { name: 'OfficerDashboardPage', path: '/src/pages/OfficerDashboardPage.jsx', url: '/officer/dashboard', role: 'officer' },
    { name: 'StudentDirectoryPage', path: '/src/pages/StudentDirectoryPage.jsx', url: '/officer/students', role: 'officer' },
    { name: 'StudentProfilePage', path: '/src/pages/StudentProfilePage.jsx', url: '/officer/students/CL-2027-0042', role: 'officer' },
    { name: 'AddStudentPage', path: '/src/pages/AddStudentPage.jsx', url: '/officer/students/add', role: 'officer' },
    { name: 'StudentSkillGapPage', path: '/src/pages/StudentSkillGapPage.jsx', url: '/skill-gap', role: 'student' },
    { name: 'ResumeIntelligencePage', path: '/src/pages/ResumeIntelligencePage.jsx', url: '/student/resume', role: 'student' },
    { name: 'SchedulingDashboard', path: '/src/pages/SchedulingDashboard.jsx', url: '/officer/scheduling', role: 'officer' },
    { name: 'DriveSchedulingPage (officer)', path: '/src/pages/DriveSchedulingPage.jsx', url: '/officer/scheduling/JOB-2027-001', role: 'officer', props: { isRecruiter: false } },
    { name: 'StudentSchedulePage', path: '/src/pages/StudentSchedulePage.jsx', url: '/student/schedule', role: 'student' },
    { name: 'CommunicationCenterPage', path: '/src/pages/officer/CommunicationCenterPage.jsx', url: '/officer/communications', role: 'officer' },
    { name: 'AnnouncementsPage', path: '/src/pages/officer/AnnouncementsPage.jsx', url: '/officer/communications/announcements', role: 'officer' },
    { name: 'TemplatesPage', path: '/src/pages/officer/TemplatesPage.jsx', url: '/officer/communications/templates', role: 'officer' },
    { name: 'CommunicationHistoryPage', path: '/src/pages/officer/CommunicationHistoryPage.jsx', url: '/officer/communications/history', role: 'officer' },
    { name: 'StudentNotificationsPage', path: '/src/pages/student/StudentNotificationsPage.jsx', url: '/student/notifications', role: 'student' },
    { name: 'StudentMessagesPage', path: '/src/pages/student/StudentMessagesPage.jsx', url: '/student/messages', role: 'student' },
    { name: 'RecruiterDashboardPage', path: '/src/pages/recruiter/RecruiterDashboardPage.jsx', url: '/recruiter/dashboard', role: 'recruiter' },
    { name: 'CompanyProfilePage', path: '/src/pages/recruiter/CompanyProfilePage.jsx', url: '/recruiter/company', role: 'recruiter' },
    { name: 'JobsListPage', path: '/src/pages/recruiter/JobsListPage.jsx', url: '/recruiter/jobs', role: 'recruiter' },
    { name: 'CreateJobPage', path: '/src/pages/recruiter/CreateJobPage.jsx', url: '/recruiter/jobs/create', role: 'recruiter' },
    { name: 'JobDetailPage', path: '/src/pages/recruiter/JobDetailPage.jsx', url: '/recruiter/jobs/JOB-2027-001', role: 'recruiter' },
    { name: 'CandidatesPage', path: '/src/pages/recruiter/CandidatesPage.jsx', url: '/recruiter/candidates', role: 'recruiter' },
    { name: 'CandidateProfileRecruiterPage', path: '/src/pages/recruiter/CandidateProfileRecruiterPage.jsx', url: '/recruiter/candidates/CL-2027-0042', role: 'recruiter' },
    { name: 'ShortlistsPage', path: '/src/pages/recruiter/ShortlistsPage.jsx', url: '/recruiter/shortlists', role: 'recruiter' },
    { name: 'InterviewsPage', path: '/src/pages/recruiter/InterviewsPage.jsx', url: '/recruiter/interviews', role: 'recruiter' },
    { name: 'RecruiterOffersPage', path: '/src/pages/recruiter/OffersPage.jsx', url: '/recruiter/offers', role: 'recruiter' },
    { name: 'RecruiterOfferDetailPage', path: '/src/pages/recruiter/RecruiterOfferDetailPage.jsx', url: '/recruiter/offers/OFFER-2027-001', role: 'recruiter' },
    { name: 'RecruitmentAnalyticsPage', path: '/src/pages/recruiter/RecruitmentAnalyticsPage.jsx', url: '/recruiter/analytics', role: 'recruiter' },
    { name: 'TalentInsightsPage', path: '/src/pages/recruiter/TalentInsightsPage.jsx', url: '/recruiter/talent-insights', role: 'recruiter' },
    { name: 'MessagesPage', path: '/src/pages/recruiter/MessagesPage.jsx', url: '/recruiter/messages', role: 'recruiter' },
    { name: 'RecruiterNotificationsPage', path: '/src/pages/recruiter/RecruiterNotificationsPage.jsx', url: '/recruiter/notifications', role: 'recruiter' },
    { name: 'RecruiterSettingsPage', path: '/src/pages/recruiter/RecruiterSettingsPage.jsx', url: '/recruiter/settings', role: 'recruiter' },
    { name: 'AiMatchingPage', path: '/src/pages/recruiter/AiMatchingPage.jsx', url: '/recruiter/jobs/JOB-2027-001/matching', role: 'recruiter' },
    { name: 'OfficerAiMatchingPage', path: '/src/pages/officer/OfficerAiMatchingPage.jsx', url: '/officer/ai-matching', role: 'officer' },
    { name: 'ExplainableFitScorePage', path: '/src/pages/ExplainableFitScorePage.jsx', url: '/recruiter/jobs/JOB-2027-001/matching/CL-2027-0042', role: 'recruiter' },
    { name: 'SmartShortlistingPage', path: '/src/pages/recruiter/SmartShortlistingPage.jsx', url: '/recruiter/jobs/JOB-2027-001/shortlisting', role: 'recruiter' },
    { name: 'OfficerShortlistingPage', path: '/src/pages/officer/OfficerShortlistingPage.jsx', url: '/officer/ai-shortlisting', role: 'officer' },
    { name: 'OfficerOffersPage', path: '/src/pages/officer/OffersPage.jsx', url: '/officer/offers', role: 'officer' },
    { name: 'OfficerOfferDetailPage', path: '/src/pages/officer/OfferDetailPage.jsx', url: '/officer/offers/OFFER-2027-001', role: 'officer' },
    { name: 'OfficerDocumentsPage', path: '/src/pages/officer/DocumentsPage.jsx', url: '/officer/documents', role: 'officer' },
    { name: 'OfficerDocumentReviewPage', path: '/src/pages/officer/DocumentReviewPage.jsx', url: '/officer/documents/DOC-2027-001', role: 'officer' },
    { name: 'OfficerJoiningPage', path: '/src/pages/officer/JoiningPage.jsx', url: '/officer/joining', role: 'officer' },
    { name: 'StudentOffersPage', path: '/src/pages/student/StudentOffersPage.jsx', url: '/student/offers', role: 'student' },
    { name: 'StudentOfferDetailPage', path: '/src/pages/student/StudentOfferDetailPage.jsx', url: '/student/offers/OFFER-2027-001', role: 'student' },
    { name: 'StudentDocumentsPage', path: '/src/pages/student/StudentDocumentsPage.jsx', url: '/student/documents', role: 'student' },
    { name: 'StudentJoiningPage', path: '/src/pages/student/StudentJoiningPage.jsx', url: '/student/joining', role: 'student' },
    { name: 'OfferPreviewPage', path: '/src/pages/OfferPreviewPage.jsx', url: '/offer/OFFER-2027-001/preview' },
    { name: 'CampusIntelligencePage', path: '/src/pages/officer/CampusIntelligencePage.jsx', url: '/officer/analytics', role: 'officer' },
    { name: 'NotFoundPage', path: '/src/pages/NotFoundPage.jsx', url: '/404' }
  ];

  let passed = 0;
  let failed = 0;
  const errors = [];

  for (const page of pagesToTest) {
    try {
      // Set logged-in session if specified
      if (page.role && DEMO_ACCOUNTS[page.role]) {
        const acc = DEMO_ACCOUNTS[page.role];
        store['campuslink_session_v1'] = JSON.stringify({
          email: acc.email,
          role: acc.role,
          roleKey: acc.roleKey,
          name: acc.name,
          avatar: acc.avatar,
          orgName: acc.orgName,
          details: acc.details,
          isDemo: true
        });
      } else {
        delete store['campuslink_session_v1'];
      }

      window.location.pathname = page.url;

      const mod = await vite.ssrLoadModule(page.path);
      const Component = mod.default || mod[Object.keys(mod)[0]];

      if (!Component) {
        throw new Error(`No export found in ${page.path}`);
      }

      const html = renderToString(
        React.createElement(
          AuthProvider,
          null,
          React.createElement(
            MemoryRouter,
            { initialEntries: [page.url] },
            React.createElement(Component, page.props || {})
          )
        )
      );

      console.log(`✓ [PASS] ${page.name} (${html.length} bytes rendered)`);
      passed++;
    } catch (err) {
      console.error(`✗ [FAIL] ${page.name}:`, err.message);
      if (err.stack) {
        console.error(err.stack.split('\n').slice(0, 5).join('\n'));
      }
      errors.push({ name: page.name, path: page.path, error: err.message, stack: err.stack });
      failed++;
    }
  }

  console.log(`\n============================`);
  console.log(`Results: ${passed} passed, ${failed} failed out of ${pagesToTest.length} pages.`);
  console.log(`============================\n`);

  await vite.close();
}

run().catch(console.error);
