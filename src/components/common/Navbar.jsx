import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Sparkles, Menu, X, ArrowRight, UserCheck, LogOut, ChevronRight, CalendarCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onOpenAbout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getDashboardUrl = (roleKey) => {
    if (roleKey === 'officer') return '/officer/dashboard';
    if (roleKey === 'recruiter') return '/recruiter/dashboard';
    return `/dashboard/${roleKey || 'student'}`;
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.25s ease',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(226, 232, 240, 0.9)' : '1px solid rgba(226, 232, 240, 0.4)',
        boxShadow: isScrolled ? '0 4px 20px -2px rgba(16, 27, 54, 0.06)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #101B36 0%, #3978F6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 8px 16px -4px rgba(57, 120, 246, 0.4)',
              position: 'relative'
            }}
          >
            <GraduationCap size={24} strokeWidth={2.2} />
            <div
              style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#36C5E8',
                border: '2px solid #FFFFFF'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.03em',
                  color: '#101B36'
                }}
              >
                Campus<span style={{ color: '#3978F6' }}>Core</span>
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  backgroundColor: '#EBF9FD',
                  color: '#0E8EA8',
                  border: '1px solid rgba(54, 197, 232, 0.3)'
                }}
              >
                AI Placement
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}
          className="desktop-nav"
        >
          <button
            onClick={() => handleNavClick('hero')}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#334155',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#334155')}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('features')}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#334155',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#334155')}
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('roles')}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#334155',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#334155')}
          >
            For Students
          </button>
          <button
            onClick={() => navigate('/recruiter/dashboard')}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#334155',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#334155')}
          >
            <span>Recruiters (L6)</span>
          </button>
          <button
            onClick={() => navigate('/recruiter/jobs/JOB-2027-001/matching')}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#7C3AED',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#6D28D9')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#7C3AED')}
          >
            <Sparkles size={14} />
            <span>AI Matching</span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '999px',
                backgroundColor: '#F5F3FF',
                color: '#7C3AED',
                border: '1px solid #DDD6FE'
              }}
            >
              L7 Live
            </span>
          </button>
          <button
            onClick={() => navigate('/officer/scheduling')}
            style={{
              fontSize: '14.5px',
              fontWeight: 700,
              color: '#2563EB',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#1D4ED8')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#2563EB')}
          >
            <CalendarCheck size={15} />
            <span>Drive Scheduler</span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '999px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE'
              }}
            >
              L10 Live
            </span>
          </button>
          <button
            onClick={() => {
              if (onOpenAbout) onOpenAbout();
              else handleNavClick('about');
            }}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#334155',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#3978F6')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#334155')}
          >
            About Us
          </button>
        </nav>

        {/* Action Buttons (Right) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-actions">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to={getDashboardUrl(user.roleKey)}
                className="btn btn-secondary btn-sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontWeight: 600
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: '#101B36',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  {user.avatar || 'U'}
                </div>
                <span>Dashboard ({user.roleKey?.toUpperCase()})</span>
              </Link>
              <button
                onClick={logout}
                title="Logout"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#FEE2E2',
                  color: '#EF4444',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FCA5A5')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-ghost btn-sm"
                style={{
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#101B36',
                  padding: '8px 16px'
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm"
                style={{
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '9px 18px',
                  borderRadius: '10px'
                }}
              >
                Get Started
                <ArrowRight size={15} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#F1F5F9',
            color: '#101B36'
          }}
          className="mobile-toggle"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            padding: '20px 24px 28px',
            boxShadow: '0 20px 30px -10px rgba(16, 27, 54, 0.15)'
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={() => handleNavClick('hero')}
              style={{ textAlign: 'left', padding: '10px 0', fontSize: '16px', fontWeight: 600, color: '#101B36' }}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('features')}
              style={{ textAlign: 'left', padding: '10px 0', fontSize: '16px', fontWeight: 600, color: '#101B36' }}
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick('roles')}
              style={{ textAlign: 'left', padding: '10px 0', fontSize: '16px', fontWeight: 600, color: '#101B36' }}
            >
              For Students
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/recruiter/dashboard');
              }}
              style={{ textAlign: 'left', padding: '10px 0', fontSize: '16px', fontWeight: 600, color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span>For Recruiters</span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                L6 Live
              </span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/recruiter/jobs/JOB-2027-001/matching');
              }}
              style={{ textAlign: 'left', padding: '10px 0', fontSize: '16px', fontWeight: 600, color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} />
                <span>AI Candidate Matching</span>
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: '#F5F3FF', color: '#7C3AED' }}>
                L7 Live
              </span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/officer/scheduling');
              }}
              style={{ textAlign: 'left', padding: '10px 0', fontSize: '16px', fontWeight: 600, color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarCheck size={16} />
                <span>Drive Scheduler</span>
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                L10 Live
              </span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAbout) onOpenAbout();
                else handleNavClick('about');
              }}
              style={{ textAlign: 'left', padding: '10px 0', fontSize: '16px', fontWeight: 600, color: '#101B36' }}
            >
              About Us
            </button>

            <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '8px 0' }} />

            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link
                  to={getDashboardUrl(user.roleKey)}
                  className="btn btn-primary"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ width: '100%' }}
                >
                  Go to {user.role} Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary"
                  style={{ width: '100%', color: '#EF4444' }}
                >
                  <LogOut size={16} /> Logout ({user.name})
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link
                  to="/login"
                  className="btn btn-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Responsive CSS for Navbar */}
      <style>{`
        @media (max-width: 868px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
