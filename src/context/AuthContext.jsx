import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEMO_ACCOUNTS = {
  student: {
    email: 'student@campuscore.demo',
    password: 'Student123',
    role: 'STUDENT',
    roleKey: 'student',
    name: 'Aarav Sharma',
    avatar: 'AS',
    orgName: 'National Institute of Technology',
    details: {
      degree: 'B.Tech - Computer Science',
      year: 'Final Year (2026)',
      cgpa: '8.92',
      skillMatch: '92%',
      readinessScore: '94/100',
      activeApplications: 6,
      offersReceived: 1
    }
  },
  officer: {
    email: 'officer@campuscore.demo',
    password: 'Officer123',
    role: 'PLACEMENT OFFICER',
    roleKey: 'officer',
    name: 'Dr. Priya Sharma',
    avatar: 'PS',
    orgName: 'National Institute of Technology',
    details: {
      designation: 'Head of Corporate Relations & Placements',
      department: 'Placement Cell',
      registeredStudents: 1248,
      activeDrives: 12,
      totalOffers: 386,
      placementRate: '78.6%'
    }
  },
  recruiter: {
    email: 'recruiter@campuscore.demo',
    password: 'Recruiter123',
    role: 'RECRUITER',
    roleKey: 'recruiter',
    name: 'Ananya Mehta',
    avatar: 'AM',
    orgName: 'TechNova Solutions',
    details: {
      designation: 'Talent Acquisition Manager',
      company: 'TechNova Solutions',
      openRoles: 4,
      applications: 684,
      eligibleCandidates: 312,
      aiRecommended: 128,
      shortlistedCandidates: 86,
      interviewsScheduled: 42,
      offers: 18
    }
  },
  admin: {
    email: 'admin@campuscore.demo',
    password: 'Admin123',
    role: 'COLLEGE ADMINISTRATOR',
    roleKey: 'admin',
    name: 'Prof. Rajesh Verma',
    avatar: 'RV',
    orgName: 'Apex Educational Consortium',
    details: {
      designation: 'Dean of Academic & Institutional Affairs',
      collegesManaged: 4,
      accreditationStatus: 'NAAC A++ Ready',
      totalCohorts: 12,
      platformAuditStatus: '100% Compliant'
    }
  }
};

const STORAGE_KEY = 'campuscore_session_v1';
const LEGACY_STORAGE_KEY = 'campuslink_session_v1';
const REGISTERED_USERS_KEY = 'campuscore_registered_users_v1';
const LEGACY_REGISTERED_USERS_KEY = 'campuslink_registered_users_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage with legacy fallback
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load session from localStorage', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password, roleKey) => {
    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. Check Demo Accounts (support both @campuscore.demo and legacy @campuslink.demo)
    const demoAccount = DEMO_ACCOUNTS[roleKey];
    const isDemoEmail = demoAccount && (
      demoAccount.email.toLowerCase() === normalizedEmail ||
      demoAccount.email.replace('@campuscore.demo', '@campuslink.demo').toLowerCase() === normalizedEmail
    );

    if (demoAccount && isDemoEmail) {
      if (demoAccount.password === cleanPassword) {
        const sessionData = {
          email: demoAccount.email,
          role: demoAccount.role,
          roleKey: demoAccount.roleKey,
          name: demoAccount.name,
          avatar: demoAccount.avatar,
          orgName: demoAccount.orgName,
          details: demoAccount.details,
          isDemo: true,
          loggedInAt: new Date().toISOString()
        };
        setUser(sessionData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
        localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(sessionData));
        return { success: true, user: sessionData };
      } else {
        return { success: false, error: 'Incorrect password for this account. Please try again.' };
      }
    }

    // 2. Check Custom Registered Users
    try {
      const registered = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
      const found = registered.find(
        (u) => u.email.toLowerCase() === normalizedEmail && u.roleKey === roleKey
      );

      if (found) {
        if (found.password === cleanPassword) {
          const sessionData = {
            email: found.email,
            role: found.role,
            roleKey: found.roleKey,
            name: found.name,
            avatar: found.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
            orgName: found.orgName,
            details: found.details || {},
            isDemo: false,
            loggedInAt: new Date().toISOString()
          };
          setUser(sessionData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
          return { success: true, user: sessionData };
        } else {
          return { success: false, error: 'Invalid password. Please check your credentials.' };
        }
      }
    } catch (e) {
      console.error('Error reading registered users', e);
    }

    // No matching account found
    return {
      success: false,
      error: `No ${DEMO_ACCOUNTS[roleKey]?.role || 'user'} found with email "${email}". Use the Demo Login or create an account.`
    };
  };

  const register = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { fullName, email, password, roleKey, orgName } = formData;
    const normalizedEmail = email.trim().toLowerCase();

    // Check if demo email
    if (Object.values(DEMO_ACCOUNTS).some((d) => d.email.toLowerCase() === normalizedEmail)) {
      return { success: false, error: 'This email is reserved for demo accounts. Please use a different email or log in directly.' };
    }

    try {
      const registered = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
      if (registered.some((u) => u.email.toLowerCase() === normalizedEmail && u.roleKey === roleKey)) {
        return { success: false, error: 'An account with this email and role already exists. Please log in.' };
      }

      const roleTitle = DEMO_ACCOUNTS[roleKey]?.role || 'STUDENT';
      const initials = fullName
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'CL';

      const newUser = {
        name: fullName,
        email: normalizedEmail,
        password,
        roleKey,
        role: roleTitle,
        orgName: orgName || 'Affiliated Institution',
        avatar: initials,
        details: {
          degree: 'Registered Candidate',
          readinessScore: '85/100',
          skillMatch: '88%'
        },
        createdAt: new Date().toISOString()
      };

      registered.push(newUser);
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registered));

      const sessionData = {
        email: newUser.email,
        role: newUser.role,
        roleKey: newUser.roleKey,
        name: newUser.name,
        avatar: newUser.avatar,
        orgName: newUser.orgName,
        details: newUser.details,
        isDemo: false,
        loggedInAt: new Date().toISOString()
      };

      setUser(sessionData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));

      return { success: true, user: sessionData };
    } catch (e) {
      console.error('Registration failed', e);
      return { success: false, error: 'Failed to save account. Please try again.' };
    }
  };

  const switchDemoRole = (roleKey) => {
    const demoAccount = DEMO_ACCOUNTS[roleKey];
    if (demoAccount) {
      const sessionData = {
        email: demoAccount.email,
        role: demoAccount.role,
        roleKey: demoAccount.roleKey,
        name: demoAccount.name,
        avatar: demoAccount.avatar,
        orgName: demoAccount.orgName,
        details: demoAccount.details,
        isDemo: true,
        loggedInAt: new Date().toISOString()
      };
      setUser(sessionData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(sessionData));
      return sessionData;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        switchDemoRole,
        demoAccounts: DEMO_ACCOUNTS,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
