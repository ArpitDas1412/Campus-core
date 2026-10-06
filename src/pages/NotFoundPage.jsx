import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFD',
        padding: '24px',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #101B36 0%, #3978F6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          marginBottom: '20px'
        }}
      >
        <GraduationCap size={32} />
      </div>
      <h1 style={{ fontSize: '64px', fontWeight: 800, color: '#101B36', margin: 0, fontFamily: 'var(--font-heading)' }}>
        404
      </h1>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#475569', marginTop: '8px', marginBottom: '16px' }}>
        Placement Portal Page Not Found
      </h2>
      <p style={{ maxWidth: '420px', fontSize: '14.5px', color: '#64748B', lineHeight: 1.6, marginBottom: '28px' }}>
        The requested routing URL does not exist or has been shifted. Return to the CampusCore landing page or access your role login.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} />
          <span>Return Home</span>
        </Link>
        <Link to="/login" className="btn btn-secondary">
          <span>Go to Login</span>
        </Link>
      </div>
    </div>
  );
}
