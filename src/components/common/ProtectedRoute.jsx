import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, loading, switchDemoRole } = useAuth();
  const location = useLocation();

  // Infer the appropriate target role if not explicitly passed
  const targetRole = useMemo(() => {
    if (allowedRole) return allowedRole.toLowerCase();
    const path = location.pathname.toLowerCase();
    if (path.startsWith('/officer') || path.startsWith('/analytics')) return 'officer';
    if (path.startsWith('/recruiter')) return 'recruiter';
    if (
      path.startsWith('/student') ||
      path.startsWith('/skill-gap') ||
      path.startsWith('/schedule') ||
      path.startsWith('/messages') ||
      path.startsWith('/notifications') ||
      path.startsWith('/offers') ||
      path.startsWith('/documents') ||
      path.startsWith('/joining') ||
      path.startsWith('/dashboard/student') ||
      path === '/dashboard'
    ) {
      return 'student';
    }
    return user?.roleKey || 'student';
  }, [allowedRole, location.pathname, user?.roleKey]);

  useEffect(() => {
    if (!loading) {
      // 1. If no user session, activate demo session for the target role
      if (!user) {
        switchDemoRole(targetRole);
      }
      // 2. If user is in demo mode and visiting another role's portal, auto-switch
      else if (targetRole && user.roleKey !== targetRole && user.isDemo !== false) {
        switchDemoRole(targetRole);
      }
    }
  }, [loading, user, targetRole, switchDemoRole]);

  // Loading spinner while auth state initializes or demo session switches
  const isTransitioning =
    loading ||
    !user ||
    (targetRole && user.roleKey !== targetRole && user.isDemo !== false);

  if (isTransitioning) {
    return (
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        <Loader2 size={36} className="animate-spin" style={{ color: '#3978F6' }} />
        <p style={{ color: '#64748B', fontWeight: 600, fontSize: '15px' }}>
          Activating {targetRole ? targetRole.toUpperCase() : 'PORTAL'} session...
        </p>
      </div>
    );
  }

  // If user is a custom non-demo account trying to access an unauthorized portal
  if (targetRole && user.roleKey !== targetRole && user.isDemo === false) {
    return (
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '24px',
          textAlign: 'center',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: '#FEF2F2',
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ShieldAlert size={32} />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', margin: 0 }}>
          Access Restricted
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '440px', margin: 0 }}>
          Your account is registered as <strong>{user.role}</strong> and does not have permission to view the {targetRole.toUpperCase()} console.
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button
            onClick={() => switchDemoRole(targetRole)}
            style={{
              padding: '9px 18px',
              backgroundColor: '#3978F6',
              color: '#FFFFFF',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Switch to Demo {targetRole.toUpperCase()}
          </button>
          <button
            onClick={() => {
              if (user.roleKey === 'officer') window.location.href = '/officer/dashboard';
              else if (user.roleKey === 'recruiter') window.location.href = '/recruiter/dashboard';
              else window.location.href = '/dashboard/student';
            }}
            style={{
              padding: '9px 18px',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Return to My Dashboard
          </button>
        </div>
      </div>
    );
  }

  return children;
}
