import React, { useState } from 'react';
import {
  Settings,
  User,
  Building,
  Bell,
  Shield,
  Sliders,
  CheckCircle2,
  Lock,
  Mail,
  Smartphone
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function RecruiterSettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [toastMessage, setToastMessage] = useState(null);

  // Settings State
  const [profileForm, setProfileForm] = useState({
    name: 'Ananya Mehta',
    role: 'Talent Acquisition Manager',
    email: 'recruiter@campuscore.demo',
    phone: '+91 98765 43210'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailInstantApps: true,
    interviewConfirmations: true,
    weeklyDigest: true,
    aiShortlistAlerts: true
  });

  const [recruitmentDefaults, setRecruitmentDefaults] = useState({
    defaultMinCGPA: 7.5,
    maxBacklogs: 0,
    interviewBufferMinutes: 15,
    autoAcknowledgeApplications: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setToastMessage('Settings successfully saved in local state!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs = [
    { id: 'Profile', label: 'Recruiter Profile', icon: User },
    { id: 'Preferences', label: 'Recruitment Preferences', icon: Sliders },
    { id: 'Notifications', label: 'Notification Settings', icon: Bell },
    { id: 'Security', label: 'Security & Auth', icon: Shield }
  ];

  return (
    <RecruiterLayout>
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
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: 600,
            zIndex: 99
          }}
        >
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#101B36',
            margin: '0 0 4px',
            letterSpacing: '-0.02em'
          }}
        >
          Recruiter Portal Settings
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
          Manage your recruiter credentials, candidate notification preferences, and default drive criteria.
        </p>
      </div>

      {/* Layout: Sidebar Tabs + Settings Card */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 280px) 1fr',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* Navigation Tabs */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid #E2E8F0',
            padding: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                  color: isSelected ? '#2563EB' : '#475569',
                  fontSize: '13.5px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={17} color={isSelected ? '#2563EB' : '#64748B'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Pane */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '28px 32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          {/* TAB 1: PROFILE */}
          {activeTab === 'Profile' && (
            <form onSubmit={handleSave}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 16px' }}>
                Recruiter Identity & Contact
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '520px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Official Title / Designation
                  </label>
                  <input
                    type="text"
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                  />
                </div>

                <div style={{ paddingTop: '10px' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 22px',
                      borderRadius: '8px',
                      backgroundColor: '#3978F6',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Save Profile Changes
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: PREFERENCES */}
          {activeTab === 'Preferences' && (
            <form onSubmit={handleSave}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 16px' }}>
                Default Drive Eligibility Preferences
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '520px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Default Minimum Cutoff CGPA
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={recruitmentDefaults.defaultMinCGPA}
                    onChange={(e) =>
                      setRecruitmentDefaults({
                        ...recruitmentDefaults,
                        defaultMinCGPA: parseFloat(e.target.value) || 0
                      })
                    }
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Maximum Allowed Backlogs
                  </label>
                  <input
                    type="number"
                    value={recruitmentDefaults.maxBacklogs}
                    onChange={(e) =>
                      setRecruitmentDefaults({
                        ...recruitmentDefaults,
                        maxBacklogs: parseInt(e.target.value) || 0
                      })
                    }
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Panel Interview Break Buffer (Minutes)
                  </label>
                  <input
                    type="number"
                    value={recruitmentDefaults.interviewBufferMinutes}
                    onChange={(e) =>
                      setRecruitmentDefaults({
                        ...recruitmentDefaults,
                        interviewBufferMinutes: parseInt(e.target.value) || 15
                      })
                    }
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                  />
                </div>

                <div style={{ paddingTop: '10px' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 22px',
                      borderRadius: '8px',
                      backgroundColor: '#3978F6',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Save Recruitment Defaults
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'Notifications' && (
            <form onSubmit={handleSave}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 16px' }}>
                Notification Preferences
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '540px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: '#334155', fontWeight: 600, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailInstantApps}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailInstantApps: e.target.checked
                      })
                    }
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span>Instant email alert on new candidate applications</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: '#334155', fontWeight: 600, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={notificationSettings.interviewConfirmations}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        interviewConfirmations: e.target.checked
                      })
                    }
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span>Real-time candidate interview slot confirmations</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: '#334155', fontWeight: 600, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={notificationSettings.aiShortlistAlerts}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        aiShortlistAlerts: e.target.checked
                      })
                    }
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span>Layer 7 AI candidate matching completions</span>
                </label>

                <div style={{ paddingTop: '10px' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 22px',
                      borderRadius: '8px',
                      backgroundColor: '#3978F6',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Update Notifications
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 4: SECURITY */}
          {activeTab === 'Security' && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 16px' }}>
                Account Security & Credentials
              </h2>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  marginBottom: '20px',
                  maxWidth: '520px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <Shield size={18} color="#10B981" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>
                    Two-Factor Authentication: Enabled
                  </span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                  Secured with CampusCore SSO and corporate one-time passcodes.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '520px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Password reset link sent to recruiter@campuscore.demo');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#334155',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    width: 'fit-content'
                  }}
                >
                  <Lock size={15} />
                  <span>Change Password</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </RecruiterLayout>
  );
}
