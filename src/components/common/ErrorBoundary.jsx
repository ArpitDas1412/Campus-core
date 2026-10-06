import React from 'react';
import { AlertTriangle, RefreshCw, Home, Sparkles, ShieldAlert } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CampusCore ErrorBoundary caught an exception:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleSwitchRole = (roleKey) => {
    try {
      const demoAccounts = {
        student: {
          email: 'student@campuscore.demo',
          role: 'STUDENT',
          roleKey: 'student',
          name: 'Aarav Sharma',
          avatar: 'AS',
          orgName: 'National Institute of Technology',
          isDemo: true
        },
        officer: {
          email: 'officer@campuscore.demo',
          role: 'PLACEMENT OFFICER',
          roleKey: 'officer',
          name: 'Dr. Priya Sharma',
          avatar: 'PS',
          orgName: 'National Institute of Technology',
          isDemo: true
        },
        recruiter: {
          email: 'recruiter@campuscore.demo',
          role: 'RECRUITER',
          roleKey: 'recruiter',
          name: 'Ananya Mehta',
          avatar: 'AM',
          orgName: 'TechNova Solutions',
          isDemo: true
        }
      };

      if (demoAccounts[roleKey]) {
        localStorage.setItem('campuscore_session_v1', JSON.stringify(demoAccounts[roleKey]));
        localStorage.setItem('campuslink_session_v1', JSON.stringify(demoAccounts[roleKey]));
      }

      if (roleKey === 'student') window.location.href = '/dashboard/student';
      else if (roleKey === 'officer') window.location.href = '/officer/dashboard';
      else if (roleKey === 'recruiter') window.location.href = '/recruiter/dashboard';
    } catch (e) {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F8FAFC',
            padding: '24px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid #E2E8F0',
              padding: '36px 32px',
              boxShadow: '0 20px 40px -10px rgba(16, 27, 54, 0.08)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: '#EF4444'
              }}
            >
              <ShieldAlert size={32} />
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '999px', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '11px', fontWeight: 700, marginBottom: '12px' }}>
              <Sparkles size={12} />
              <span>CampusCore System Recovery</span>
            </div>

            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '0 0 8px' }}>
              Something interrupted this view
            </h1>

            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: '0 0 24px' }}>
              CampusCore encountered an unexpected component issue on this route. You can reload this view or return to any active placement dashboard below.
            </p>

            {this.state.error && (
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  textAlign: 'left',
                  marginBottom: '24px',
                  fontSize: '12px',
                  color: '#991B1B',
                  fontFamily: 'monospace',
                  maxHeight: '120px',
                  overflowY: 'auto'
                }}
              >
                <strong>Error:</strong> {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
              <button
                onClick={this.handleReload}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(57, 120, 246, 0.3)'
                }}
              >
                <RefreshCw size={15} />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Home size={15} />
                <span>Go to Homepage</span>
              </button>
            </div>

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '18px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '10px' }}>
                Quick Demo Session Switch:
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button
                  onClick={() => this.handleSwitchRole('student')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: '1px solid #BFDBFE',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    cursor: 'pointer'
                  }}
                >
                  Student Portal
                </button>
                <button
                  onClick={() => this.handleSwitchRole('officer')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: '1px solid #BAE6FD',
                    backgroundColor: '#F0F9FF',
                    color: '#0284C7',
                    cursor: 'pointer'
                  }}
                >
                  Officer Console
                </button>
                <button
                  onClick={() => this.handleSwitchRole('recruiter')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: '1px solid #DDD6FE',
                    backgroundColor: '#F5F3FF',
                    color: '#7C3AED',
                    cursor: 'pointer'
                  }}
                >
                  Recruiter Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
