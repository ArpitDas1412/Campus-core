import React, { useState } from 'react';
import { X, Save, CheckCircle2 } from 'lucide-react';

export default function EditStudentModal({ isOpen, onClose, student, onSave }) {
  if (!isOpen || !student) return null;

  const [formData, setFormData] = useState({
    name: student.name || '',
    department: student.department || 'Computer Science & Engineering',
    graduationYear: student.graduationYear || 2027,
    cgpa: student.cgpa || 8.0,
    email: student.email || '',
    phone: student.phone || '',
    placementStatus: student.placementStatus || 'Not Placed',
    readinessScore: student.readinessScore || 80,
    tenthPercentage: student.academic?.tenthPercentage || student.tenthPercentage || 90,
    twelfthPercentage: student.academic?.twelfthPercentage || student.twelfthPercentage || 88,
    backlogs: student.academic?.backlogs ?? student.backlogs ?? 0,
    attendance: student.academic?.attendance || 90,
    preferredRoles: (student.careerPreferences?.roles || []).join(', '),
    preferredLocations: (student.careerPreferences?.locations || []).join(', '),
    expectedSalary: student.careerPreferences?.expectedSalary || '6-10 LPA',
    skills: (student.skills || []).join(', ')
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    if (formData.cgpa < 0 || formData.cgpa > 10) errs.cgpa = 'CGPA must be between 0.0 and 10.0';
    if (formData.readinessScore < 0 || formData.readinessScore > 100) errs.readinessScore = 'Score must be 0-100';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const calculateReadinessLevel = (score) => {
    if (score >= 85) return 'Job Ready';
    if (score >= 70) return 'Nearly Ready';
    if (score >= 50) return 'Needs Improvement';
    return 'Critical';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedStudent = {
      ...student,
      name: formData.name.trim(),
      department: formData.department,
      graduationYear: parseInt(formData.graduationYear, 10),
      cgpa: parseFloat(formData.cgpa),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      placementStatus: formData.placementStatus,
      readinessScore: parseInt(formData.readinessScore, 10),
      readinessLevel: calculateReadinessLevel(parseInt(formData.readinessScore, 10)),
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      academic: {
        ...(student.academic || {}),
        degree: student.academic?.degree || 'B.Tech',
        department: formData.department,
        graduationYear: parseInt(formData.graduationYear, 10),
        cgpa: parseFloat(formData.cgpa),
        tenthPercentage: parseFloat(formData.tenthPercentage),
        twelfthPercentage: parseFloat(formData.twelfthPercentage),
        backlogs: parseInt(formData.backlogs, 10),
        attendance: parseInt(formData.attendance, 10)
      },
      careerPreferences: {
        ...(student.careerPreferences || {}),
        roles: formData.preferredRoles.split(',').map(s => s.trim()).filter(Boolean),
        locations: formData.preferredLocations.split(',').map(s => s.trim()).filter(Boolean),
        expectedSalary: formData.expectedSalary
      }
    };

    onSave(updatedStudent);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 40px rgba(16, 27, 54, 0.2)',
          border: '1px solid #E2E8F0'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 10
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#101B36' }}>
              Edit Student Profile
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748B' }}>
              Updating {student.name} ({student.id})
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: '#F1F5F9',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              color: '#64748B'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            
            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: errors.name ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0',
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              />
              {errors.name && <span style={{ fontSize: '11px', color: '#EF4444' }}>{errors.name}</span>}
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: errors.email ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0',
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              />
              {errors.email && <span style={{ fontSize: '11px', color: '#EF4444' }}>{errors.email}</span>}
            </div>

            {/* Department */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Department
              </label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '13.5px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>

            {/* Graduation Year */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Graduation Year
              </label>
              <select
                value={formData.graduationYear}
                onChange={e => setFormData({ ...formData, graduationYear: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '13.5px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value={2027}>2027</option>
                <option value={2028}>2028</option>
                <option value={2029}>2029</option>
              </select>
            </div>

            {/* CGPA */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                CGPA (out of 10) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: errors.cgpa ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0',
                  fontSize: '13.5px'
                }}
              />
              {errors.cgpa && <span style={{ fontSize: '11px', color: '#EF4444' }}>{errors.cgpa}</span>}
            </div>

            {/* Readiness Score */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Readiness Score (0-100) *
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.readinessScore}
                onChange={e => setFormData({ ...formData, readinessScore: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: errors.readinessScore ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0',
                  fontSize: '13.5px'
                }}
              />
              {errors.readinessScore && <span style={{ fontSize: '11px', color: '#EF4444' }}>{errors.readinessScore}</span>}
            </div>

            {/* Placement Status */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Placement Status
              </label>
              <select
                value={formData.placementStatus}
                onChange={e => setFormData({ ...formData, placementStatus: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '13.5px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="Not Placed">Not Placed</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Placed">Placed</option>
                <option value="Offer Accepted">Offer Accepted</option>
                <option value="Offer Declined">Offer Declined</option>
              </select>
            </div>

            {/* Backlogs */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Active Backlogs
              </label>
              <input
                type="number"
                min="0"
                value={formData.backlogs}
                onChange={e => setFormData({ ...formData, backlogs: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '13.5px'
                }}
              />
            </div>
          </div>

          {/* Skills (Comma separated) */}
          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Skills (comma-separated list)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={e => setFormData({ ...formData, skills: e.target.value })}
              placeholder="Java, Python, React, SQL, AWS, Machine Learning"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1.5px solid #E2E8F0',
                fontSize: '13.5px'
              }}
            />
          </div>

          {/* Career Preferences */}
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Preferred Roles
              </label>
              <input
                type="text"
                value={formData.preferredRoles}
                onChange={e => setFormData({ ...formData, preferredRoles: e.target.value })}
                placeholder="Software Engineer, Full Stack Developer"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '13.5px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Preferred Locations
              </label>
              <input
                type="text"
                value={formData.preferredLocations}
                onChange={e => setFormData({ ...formData, preferredLocations: e.target.value })}
                placeholder="Bangalore, Hyderabad, Pune"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '13.5px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Expected Salary
              </label>
              <input
                type="text"
                value={formData.expectedSalary}
                onChange={e => setFormData({ ...formData, expectedSalary: e.target.value })}
                placeholder="₹6–10 LPA"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '13.5px'
                }}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                border: '1.5px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: '#64748B',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)'
              }}
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
