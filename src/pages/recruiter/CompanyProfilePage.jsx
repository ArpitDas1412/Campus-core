import React, { useState } from 'react';
import {
  Building2,
  Globe,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Edit3,
  CheckCircle2,
  X,
  Upload,
  Sparkles,
  Shield,
  Layers,
  Award
} from 'lucide-react';
import RecruiterLayout from '../../components/recruiter/RecruiterLayout';
import recruiterService from '../../services/recruiterService';

export default function CompanyProfilePage() {
  const [company, setCompany] = useState(recruiterService.getCompany());
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(company);
  const [saveToast, setSaveToast] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    const updated = recruiterService.updateCompany(editForm);
    setCompany(updated);
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        const updated = recruiterService.updateCompany({ logoUrl: reader.result });
        setCompany(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    const updated = recruiterService.updateCompany({ logoUrl: null });
    setCompany(updated);
  };

  return (
    <RecruiterLayout>
      {/* Toast */}
      {saveToast && (
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
          <span>Company profile updated successfully</span>
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: '#101B36',
                margin: 0,
                letterSpacing: '-0.02em'
              }}
            >
              Company Profile
            </h1>
            <span
              style={{
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontWeight: 700,
                border: '1px solid #A7F3D0'
              }}
            >
              Verified Partner
            </span>
          </div>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Manage your corporate identity, campus branding, and hiring preferences for CampusCore.
          </p>
        </div>

        <button
          onClick={() => {
            setEditForm(company);
            setIsEditing(true);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '8px',
            backgroundColor: '#3978F6',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(57, 120, 246, 0.3)'
          }}
        >
          <Edit3 size={15} />
          <span>Edit Company Profile</span>
        </button>
      </div>

      {/* Disclaimer banner */}
      <div
        style={{
          padding: '12px 18px',
          borderRadius: '10px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          fontSize: '12.5px',
          color: '#64748B',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Shield size={16} color="#3978F6" />
        <span>
          <strong>Fictional Demo Environment:</strong> TechNova Solutions is an illustrative corporate
          partner profile for CampusCore hackathon demonstration purposes.
        </span>
      </div>

      {/* Two Column Layout: Main Profile & Recruitment Preferences */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Left Card: Company Overview & Logo */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px 28px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          {/* Logo & Headline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
              paddingBottom: '24px',
              borderBottom: '1px solid #F1F5F9'
            }}
          >
            <div
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '16px',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(57, 120, 246, 0.25)',
                overflow: 'hidden',
                flexShrink: 0
              }}
            >
              {logoPreview || company.logoUrl ? (
                <img
                  src={logoPreview || company.logoUrl}
                  alt={company.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                'TN'
              )}
            </div>

            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                {company.name}
              </h2>
              <div style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 500 }}>
                {company.industry}
              </div>

              {/* Logo actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#F8FAFC',
                    color: '#334155',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Upload size={12} />
                  <span>Upload Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                {(logoPreview || company.logoUrl) && (
                  <button
                    onClick={handleRemoveLogo}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      border: '1px solid #FECACA',
                      backgroundColor: '#FEF2F2',
                      color: '#DC2626',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
              margin: '20px 0',
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC'
            }}
          >
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                Founded Year
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginTop: '2px' }}>
                {company.foundedYear}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                Company Size
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginTop: '2px' }}>
                {company.companySize}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                Headquarters
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#101B36', marginTop: '2px' }}>
                {company.headquarters}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                Website
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#3978F6', marginTop: '2px' }}>
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#3978F6', textDecoration: 'none' }}
                >
                  {company.website}
                </a>
              </div>
            </div>
          </div>

          {/* About Company */}
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#101B36', marginBottom: '8px' }}>
              About the Company
            </h3>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              {company.about}
            </p>
          </div>
        </div>

        {/* Right Card: Campus Recruitment Preferences */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px 28px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <Sparkles size={18} color="#3978F6" />
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Recruitment Preferences
            </h2>
          </div>

          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 20px', lineHeight: 1.5 }}>
            These criteria guide CampusCore's automated candidate matching and determine default
            eligibility rules for new placement drives.
          </p>

          {(() => {
            const prefs = company?.recruitmentPreferences || company?.preferences || {};
            const departments = prefs.departments || prefs.preferredDepartments || ['CSE', 'IT', 'ECE'];
            const minCGPA = prefs.minCGPA || 7.5;
            const gradYears = prefs.graduationYears || prefs.preferredGraduationYears || [2027];
            const skills = prefs.skills || prefs.preferredSkills || ['Java', 'Python', 'React', 'SQL', 'AWS'];
            const locations = prefs.locations || ['Bangalore', 'Hyderabad', 'Pune'];
            const workModes = prefs.workModes || ['Hybrid', 'On-site'];

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Preferred Departments */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Target Departments
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {departments.map((dept) => (
                      <span
                        key={dept}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '6px',
                          backgroundColor: '#EFF6FF',
                          color: '#2563EB',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          border: '1px solid #BFDBFE'
                        }}
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Min CGPA & Grad Years */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                      Minimum CGPA Rule
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
                      {minCGPA} / 10.0
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                      Graduation Batches
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', marginTop: '4px' }}>
                      {gradYears.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Core Preferred Skills */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    High-Demand Skill Set
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#F1F5F9',
                          color: '#334155',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: '1px solid #E2E8F0'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hiring Locations & Work Modes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Hiring Hubs
                    </div>
                    <div style={{ fontSize: '13px', color: '#334155', fontWeight: 600 }}>
                      {locations.join(' • ')}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Work Arrangement
                    </div>
                    <div style={{ fontSize: '13px', color: '#334155', fontWeight: 600 }}>
                      {workModes.join(' / ')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(3px)',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              border: '1px solid #E2E8F0'
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                backgroundColor: '#FFFFFF',
                zIndex: 2
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                Edit Company Profile
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Industry
                    </label>
                    <input
                      type="text"
                      value={editForm.industry}
                      onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Founded Year
                    </label>
                    <input
                      type="number"
                      value={editForm.foundedYear}
                      onChange={(e) => setEditForm({ ...editForm, foundedYear: parseInt(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Company Size
                    </label>
                    <input
                      type="text"
                      value={editForm.companySize}
                      onChange={(e) => setEditForm({ ...editForm, companySize: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Headquarters
                    </label>
                    <input
                      type="text"
                      value={editForm.headquarters}
                      onChange={(e) => setEditForm({ ...editForm, headquarters: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Website (fictional)
                  </label>
                  <input
                    type="text"
                    value={editForm.website}
                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    About Company
                  </label>
                  <textarea
                    rows={4}
                    value={editForm.about}
                    onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px',
                    paddingTop: '16px',
                    borderTop: '1px solid #E2E8F0'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    style={{
                      padding: '9px 18px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: '#475569',
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
                      padding: '9px 22px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#3978F6',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(57, 120, 246, 0.3)'
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </RecruiterLayout>
  );
}
