import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  Building,
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Building2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Zap,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import Modal from '../components/common/Modal';

export default function AuthPage({ initialMode = 'login' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, isAuthenticated, user } = useAuth();

  // Mode: 'login' | 'register'
  const urlMode = searchParams.get('mode');
  const [mode, setMode] = useState(urlMode || initialMode);

  // Role: 'student' | 'officer' | 'recruiter' | 'admin'
  const urlRole = searchParams.get('role');
  const [selectedRole, setSelectedRole] = useState(
    ['student', 'officer', 'recruiter', 'admin'].includes(urlRole) ? urlRole : 'student'
  );

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    if (urlRole && ['student', 'officer', 'recruiter', 'admin'].includes(urlRole)) {
      setSelectedRole(urlRole);
    }
  }, [urlRole]);

  useEffect(() => {
    if (urlMode && ['login', 'register'].includes(urlMode)) {
      setMode(urlMode);
    }
  }, [urlMode]);

  // If already authenticated and visits login, allow redirect to their dashboard
  useEffect(() => {
    if (isAuthenticated && user?.roleKey) {
      // User is already logged in
    }
  }, [isAuthenticated, user]);

  const handleRoleChange = (roleKey) => {
    setSelectedRole(roleKey);
    setErrorMessage('');
    setSuccessMessage('');
    // Update URL query without refresh
    setSearchParams({ role: roleKey, mode });
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
    setSearchParams({ role: selectedRole, mode: newMode });
  };

  // Helper to load Demo Credentials securely into the form
  const handleFillDemo = (roleKey = selectedRole) => {
    const demo = DEMO_ACCOUNTS[roleKey];
    if (demo) {
      setSelectedRole(roleKey);
      setEmail(demo.email);
      setPassword(demo.password);
      setErrorMessage('');
      setSuccessMessage(`Demo credentials loaded for ${demo.role}. Click "Sign In" below.`);
    }
  };

  // Login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your registered institutional or corporate email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(email, password, selectedRole);
      if (res.success) {
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 }
          });
        } catch (e) {}
        const effectiveRole = res.user?.roleKey || selectedRole;
        if (effectiveRole === 'officer') {
          navigate('/officer/dashboard');
        } else if (effectiveRole === 'recruiter') {
          navigate('/recruiter/dashboard');
        } else {
          navigate(`/dashboard/${effectiveRole}`);
        }
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Registration handler
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!orgName.trim()) {
      setErrorMessage(
        selectedRole === 'recruiter'
          ? 'Please enter your corporate company name.'
          : 'Please enter your college or university name.'
      );
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('You must agree to the institutional placement terms and privacy policy.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        roleKey: selectedRole,
        orgName: orgName.trim()
      });

      if (res.success) {
        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.7 }
          });
        } catch (e) {}
        const effectiveRole = res.user?.roleKey || selectedRole;
        if (effectiveRole === 'officer') {
          navigate('/officer/dashboard');
        } else if (effectiveRole === 'recruiter') {
          navigate('/recruiter/dashboard');
        } else {
          navigate(`/dashboard/${effectiveRole}`);
        }
      } else {
        setErrorMessage(res.error || 'Registration could not be completed.');
      }
    } catch (err) {
      setErrorMessage('Server error during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetSuccess(true);
    setTimeout(() => {
      setForgotModalOpen(false);
      setResetSuccess(false);
      setResetEmail('');
      setSuccessMessage('A simulated password reset link has been dispatched to your email.');
    }, 1800);
  };

  const roleMeta = {
    student: {
      title: 'Student Portal',
      desc: 'Access placement applications, ATS scores, and recruiter drives.',
      icon: GraduationCap,
      color: '#3978F6',
      badge: 'Student',
      emailPlaceholder: 'student@campuscore.demo'
    },
    officer: {
      title: 'Placement Officer Console',
      desc: 'Coordinate campus drives, slots, eligibility batches, and statistics.',
      icon: Briefcase,
      color: '#0E8EA8',
      badge: 'Placement Officer',
      emailPlaceholder: 'officer@campuscore.demo'
    },
    recruiter: {
      title: 'Recruiter Hub',
      desc: 'Source verified student talent, schedule interviews, and issue offers.',
      icon: Building,
      color: '#8B5CF6',
      badge: 'Recruiter',
      emailPlaceholder: 'recruiter@campuscore.demo'
    },
    admin: {
      title: 'College Administrator',
      desc: 'Multi-department governance, accreditation compliance, and audits.',
      icon: ShieldCheck,
      color: '#101B36',
      badge: 'Administrator',
      emailPlaceholder: 'admin@campuscore.demo'
    }
  };

  const currentRoleMeta = roleMeta[selectedRole];
  const CurrentRoleIcon = currentRoleMeta.icon;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFD',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'linear-gradient(135deg, #F8FAFD 0%, #EEF4FE 50%, #F8FAFD 100%)'
      }}
    >
      {/* Top Simple Navigation Header */}
      <header
        style={{
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)'
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #101B36 0%, #3978F6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <GraduationCap size={20} />
          </div>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: '#101B36'
            }}
          >
            Campus<span style={{ color: '#3978F6' }}>Core</span>
          </span>
        </Link>

        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '13.5px',
            fontWeight: 600,
            color: '#64748B',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#64748B')}
        >
          <ChevronLeft size={16} />
          <span>Back to Landing Page</span>
        </Link>
      </header>

      {/* Main Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 16px'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '540px',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(16, 27, 54, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8)',
            overflow: 'hidden',
            border: '1px solid #E2E8F0'
          }}
          className="animate-scale-in"
        >
          {/* Header Accent Bar with Selected Role Color */}
          <div
            style={{
              height: '5px',
              backgroundColor: currentRoleMeta.color,
              transition: 'background-color 0.3s ease'
            }}
          />

          <div style={{ padding: '32px 32px 36px' }}>
            {/* Role Selector Tabs (STUDENT, OFFICER, RECRUITER, ADMIN) */}
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748B',
                  marginBottom: '10px'
                }}
              >
                Select Your Role Portal:
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '6px',
                  backgroundColor: '#F1F5F9',
                  padding: '5px',
                  borderRadius: '14px'
                }}
              >
                {[
                  { key: 'student', label: 'Student', icon: GraduationCap },
                  { key: 'officer', label: 'Officer', icon: Briefcase },
                  { key: 'recruiter', label: 'Recruiter', icon: Building },
                  { key: 'admin', label: 'Admin', icon: ShieldCheck }
                ].map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.key;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => handleRoleChange(r.key)}
                      style={{
                        padding: '10px 4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        borderRadius: '10px',
                        backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                        color: isSelected ? '#101B36' : '#64748B',
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: '11.5px',
                        boxShadow: isSelected ? '0 2px 8px rgba(16, 27, 54, 0.08)' : 'none',
                        border: isSelected ? '1px solid #E2E8F0' : '1px solid transparent',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <Icon
                        size={17}
                        style={{
                          color: isSelected ? currentRoleMeta.color : '#94A3B8'
                        }}
                      />
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Role Header Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: '14px',
                backgroundColor: '#F8FAFD',
                border: '1px solid #E2E8F0',
                marginBottom: '24px'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: currentRoleMeta.color,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <CurrentRoleIcon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#101B36', margin: 0 }}>
                    {currentRoleMeta.title}
                  </h2>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#EEF4FF',
                      color: '#3978F6'
                    }}
                  >
                    {mode === 'login' ? 'SIGN IN' : 'REGISTER'}
                  </span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
                  {currentRoleMeta.desc}
                </p>
              </div>
            </div>

            {/* Quick Demo Pre-fill Bar (Saves Hackathon Evaluator Time) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                backgroundColor: '#FFFBEB',
                borderRadius: '10px',
                border: '1px solid #FDE68A',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={15} style={{ color: '#D97706' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#92400E' }}>
                  Hackathon Demo Account Available
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleFillDemo(selectedRole)}
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#B45309',
                  backgroundColor: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #FCD34D',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FEF3C7')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
              >
                Autofill Credentials
              </button>
            </div>

            {/* Alert Messages */}
            {errorMessage && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px 14px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '10px',
                  color: '#B91C1C',
                  fontSize: '13px',
                  marginBottom: '18px'
                }}
                className="animate-fade-in"
              >
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                <span style={{ flex: 1 }}>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px 14px',
                  backgroundColor: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  borderRadius: '10px',
                  color: '#065F46',
                  fontSize: '13px',
                  marginBottom: '18px'
                }}
                className="animate-fade-in"
              >
                <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                <span style={{ flex: 1 }}>{successMessage}</span>
              </div>
            )}

            {/* =======================================================
                FORM A: LOGIN MODE
               ======================================================= */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Email Field */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#101B36',
                      marginBottom: '6px'
                    }}
                  >
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail
                      size={18}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8'
                      }}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={currentRoleMeta.emailPlaceholder}
                      style={{
                        width: '100%',
                        padding: '11px 14px 11px 38px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '14px',
                        color: '#101B36',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#3978F6')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#CBD5E1')}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#101B36' }}>
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(true)}
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#3978F6',
                        backgroundColor: 'transparent',
                        padding: 0
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock
                      size={18}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8'
                      }}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      style={{
                        width: '100%',
                        padding: '11px 40px 11px 38px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '14px',
                        color: '#101B36',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#3978F6')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#CBD5E1')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#3978F6',
                      cursor: 'pointer'
                    }}
                  />
                  <label htmlFor="rememberMe" style={{ fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                    Remember my login session on this browser
                  </label>
                </div>

                {/* Submit Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '15px',
                    fontWeight: 700,
                    marginTop: '8px',
                    borderRadius: '12px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to {currentRoleMeta.badge}</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                {/* Switch to Register */}
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '16px',
                    fontSize: '13.5px',
                    color: '#64748B'
                  }}
                >
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('register')}
                    style={{
                      color: '#3978F6',
                      fontWeight: 700,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Register Here
                  </button>
                </div>
              </form>
            ) : (
              /* =======================================================
                 FORM B: REGISTER MODE
                 ======================================================= */
              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '5px' }}>
                    Full Legal Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User
                      size={18}
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
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '14px',
                        color: '#101B36',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '5px' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail
                      size={18}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8'
                      }}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aarav@college.edu"
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '14px',
                        color: '#101B36',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Institution / Company Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '5px' }}>
                    {selectedRole === 'recruiter' ? 'Company / Organization Name' : 'College / Institution Name'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building2
                      size={18}
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
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder={
                        selectedRole === 'recruiter'
                          ? 'e.g. Nexus Software Solutions Pvt Ltd'
                          : 'e.g. National Institute of Technology'
                      }
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '14px',
                        color: '#101B36',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '5px' }}>
                    Create Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock
                      size={18}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8'
                      }}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      style={{
                        width: '100%',
                        padding: '10px 40px 10px 38px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '14px',
                        color: '#101B36',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8'
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '5px' }}>
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock
                      size={18}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8'
                      }}
                    />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      style={{
                        width: '100%',
                        padding: '10px 40px 10px 38px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '14px',
                        color: '#101B36',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8'
                      }}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                      marginTop: '3px',
                      accentColor: '#3978F6'
                    }}
                  />
                  <label htmlFor="agreeTerms" style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.4 }}>
                    I agree to the institutional placement code of conduct, automated verification protocols, and privacy policy.
                  </label>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '15px',
                    fontWeight: 700,
                    marginTop: '8px',
                    borderRadius: '12px'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete {currentRoleMeta.badge} Registration</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                {/* Switch to Login */}
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '16px',
                    fontSize: '13.5px',
                    color: '#64748B'
                  }}
                >
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('login')}
                    style={{
                      color: '#3978F6',
                      fontWeight: 700,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Log In Here
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Password"
        subtitle={`Password recovery for ${currentRoleMeta.badge}`}
      >
        <form onSubmit={handlePasswordReset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13.5px', color: '#475569', margin: 0 }}>
            Enter your registered institutional or corporate email address below. We will send a secure token link to reset your password.
          </p>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
              Your Email Address
            </label>
            <input
              type="email"
              required
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="e.g. user@campuscore.demo"
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1.5px solid #CBD5E1',
                fontSize: '14px'
              }}
            />
          </div>

          {resetSuccess ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                borderRadius: '8px',
                fontSize: '13px'
              }}
            >
              <CheckCircle2 size={16} />
              <span>Reset instructions sent successfully! Closing...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </Modal>

      {/* Subtle Bottom Footer */}
      <footer
        style={{
          padding: '20px',
          textAlign: 'center',
          fontSize: '12.5px',
          color: '#94A3B8',
          borderTop: '1px solid #E2E8F0'
        }}
      >
        CampusCore Placement OS • Layer 1 Security & Authentication Layer • Demo Protected
      </footer>
    </div>
  );
}
