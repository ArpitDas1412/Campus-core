import React, { useState } from 'react';
import Modal from '../../common/Modal';
import { Building, User, Mail, Briefcase, Tag, CheckCircle2 } from 'lucide-react';

export default function AddRecruiterModal({ isOpen, onClose, onAddRecruiter }) {
  const [companyName, setCompanyName] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('Information Technology & Software');
  const [hiringRoles, setHiringRoles] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName.trim() || !recruiterName.trim() || !email.trim()) return;

    const newRecruiter = {
      id: `rec-${Date.now()}`,
      company: companyName.trim(),
      shortName: companyName.trim().slice(0, 8),
      recruiterName: recruiterName.trim(),
      email: email.trim(),
      industry: industry.trim(),
      hiringRoles: hiringRoles.split(',').map((r) => r.trim()).filter(Boolean),
      ctcRange: '6.0 - 18.0 LPA',
      activeDrives: 1,
      totalHires: 0,
      status: 'Active',
      logoBg: '#1E3A8A',
      logoColor: '#FFFFFF'
    };

    onAddRecruiter(newRecruiter);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCompanyName('');
      setRecruiterName('');
      setEmail('');
      setHiringRoles('');
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register Corporate Recruiter Partner"
      subtitle="Establish institutional partnership for on-campus and virtual hiring pipelines"
    >
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '30px 20px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#ECFDF5',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <CheckCircle2 size={32} />
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 6px' }}>
            Recruiter Partner Registered!
          </h4>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            {companyName} has been accredited and added to the corporate directory.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Company Name */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
              Company Name *
            </label>
            <div style={{ position: 'relative' }}>
              <Building size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Google India / Cisco Systems"
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Recruiter Name & Email */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
                Lead Recruiter Name *
              </label>
              <div style={{ position: 'relative' }}>
                <User size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  required
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  placeholder="e.g. Shalini Roy"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '10px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
                Corporate Email Address *
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. s.roy@company.com"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '10px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Industry */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
              Industry Sector *
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1.5px solid #CBD5E1',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="Information Technology & Software">Information Technology & Software</option>
              <option value="Fintech & Banking">Fintech & Banking</option>
              <option value="Management Consulting">Management Consulting</option>
              <option value="E-Commerce & Retail Tech">E-Commerce & Retail Tech</option>
              <option value="Automotive & Core Engineering">Automotive & Core Engineering</option>
              <option value="Semiconductors & VLSI">Semiconductors & VLSI</option>
            </select>
          </div>

          {/* Hiring Roles */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
              Hiring Roles / Profiles (Comma separated)
            </label>
            <div style={{ position: 'relative' }}>
              <Briefcase size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="text"
                value={hiringRoles}
                onChange={(e) => setHiringRoles(e.target.value)}
                placeholder="e.g. Software Engineer, Cloud Architect, Data Analyst"
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '10px 18px', borderRadius: '10px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '10px 22px', borderRadius: '10px', fontWeight: 700 }}
            >
              Register Recruiter
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
