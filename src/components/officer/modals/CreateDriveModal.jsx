import React, { useState } from 'react';
import Modal from '../../common/Modal';
import { Building, Briefcase, FileText, Calendar, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CreateDriveModal({ isOpen, onClose, onAddDrive }) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('7.0 CGPA, B.Tech CSE/IT/ECE with no active backlogs');
  const [deadline, setDeadline] = useState('Oct 25, 2026');
  const [driveDate, setDriveDate] = useState('Oct 28');
  const [eligibleCount, setEligibleCount] = useState(165);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    const newDrive = {
      id: `drv-${Date.now()}`,
      company: company.trim(),
      fullCompany: company.trim(),
      role: role.trim(),
      date: driveDate.trim() || 'Oct 28',
      eligibleStudents: parseInt(eligibleCount, 10) || 120,
      status: 'Registration Open',
      ctc: '8.5 - 14.0 LPA',
      deadline: deadline.trim(),
      description: description.trim() || 'Campus recruitment drive for technical engineering roles.',
      departments: ['CSE', 'IT', 'ECE'],
      avatarBg: '#0E8EA8',
      avatarText: company.trim().slice(0, 3).toUpperCase()
    };

    onAddDrive(newDrive);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCompany('');
      setRole('');
      setDescription('');
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Placement Drive"
      subtitle="Schedule a recruitment drive, set eligibility criteria and open student registrations"
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
            Placement Drive Scheduled!
          </h4>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            {company} ({role}) drive is now active and published to student portals.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Company & Job Role */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
                Hiring Company *
              </label>
              <div style={{ position: 'relative' }}>
                <Building size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Cisco Systems"
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
                Job Role / Designation *
              </label>
              <div style={{ position: 'relative' }}>
                <Briefcase size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Cloud Security Engineer"
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

          {/* Job Description */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
              Job Description & Key Responsibilities
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline role expectations, technical stack requirements, compensation package, and interview stages..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1.5px solid #CBD5E1',
                fontSize: '13.5px',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Eligibility Criteria */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
              Eligibility Criteria *
            </label>
            <div style={{ position: 'relative' }}>
              <ShieldCheck size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="text"
                required
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                placeholder="e.g. CGPA >= 7.5, CSE/IT, no backlogs"
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

          {/* Deadline & Drive Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
                Application Deadline *
              </label>
              <input
                type="text"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Oct 24, 2026"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
                Drive Date *
              </label>
              <input
                type="text"
                required
                value={driveDate}
                onChange={(e) => setDriveDate(e.target.value)}
                placeholder="e.g. Oct 28"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#101B36', marginBottom: '6px' }}>
                Eligible Pool
              </label>
              <input
                type="number"
                value={eligibleCount}
                onChange={(e) => setEligibleCount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
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
              Schedule Drive Slot
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
