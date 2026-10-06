import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Building2,
  User,
  DollarSign,
  FileText,
  Send,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { REQUIRED_DOCUMENT_TYPES } from '../../data/offers';
import { createOffer } from '../../services/offerService';

export default function OfferWizard({ isOpen, onClose, onOfferCreated }) {
  const [step, setStep] = useState(1);
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyId: 'COMP-001',
    companyName: 'TechNova Solutions',
    jobId: 'JOB-2027-001',
    jobTitle: 'Software Engineer',
    candidateId: 'CL-2027-0042',
    candidateName: 'Rahul Kumar',
    candidateDepartment: 'Computer Science & Engineering',
    candidateCgpa: 8.7,
    employmentType: 'Full-time',
    totalCTC: '₹9.2 LPA',
    baseSalary: '₹7.8 LPA',
    variablePay: '₹1.4 LPA',
    joiningBonus: '₹50,000',
    location: 'Bangalore',
    workMode: 'Hybrid',
    joiningDate: '2026-12-01',
    probationPeriod: '6 months',
    noticePeriod: '30 days',
    expiryDate: '2026-10-25',
    requiredDocs: [
      'Resume',
      '10th Marksheet',
      '12th Marksheet',
      'Degree / Provisional Certificate',
      'Aadhaar / Government ID'
    ]
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleToggleDoc = (docType) => {
    if (formData.requiredDocs.includes(docType)) {
      setFormData({
        ...formData,
        requiredDocs: formData.requiredDocs.filter((d) => d !== docType)
      });
    } else {
      setFormData({
        ...formData,
        requiredDocs: [...formData.requiredDocs, docType]
      });
    }
  };

  const handleConfirmSend = (sendImmediately = true) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const payload = {
        ...formData,
        compensation: {
          totalCTC: formData.totalCTC,
          baseSalary: formData.baseSalary,
          variablePay: formData.variablePay,
          joiningBonus: formData.joiningBonus
        },
        documentsRequired: formData.requiredDocs.map((type, idx) => ({
          id: `DOC-REQ-${Date.now()}-${idx}`,
          type,
          required: true,
          status: 'Requested'
        })),
        sendImmediately
      };

      const created = createOffer(payload, 'Placement Officer');
      setIsSubmitting(false);
      setShowSendConfirmation(false);
      if (onOfferCreated) onOfferCreated(created);
      onClose();
    }, 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 1350,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden'
        }}
        className="animate-fade-in"
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                backgroundColor: '#EEF4FF',
                color: '#3978F6',
                padding: '2px 8px',
                borderRadius: '6px'
              }}
            >
              Step {step} of 5
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '4px 0 0' }}>
              Create Placement Employment Offer
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#64748B',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          {[
            { num: 1, label: 'Select Drive' },
            { num: 2, label: 'Select Candidate' },
            { num: 3, label: 'Offer & CTC' },
            { num: 4, label: 'Documents' },
            { num: 5, label: 'Review & Send' }
          ].map((s) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <div
                key={s.num}
                style={{
                  flex: 1,
                  padding: '10px 8px',
                  textAlign: 'center',
                  fontSize: '11.5px',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#3978F6' : isDone ? '#059669' : '#94A3B8',
                  borderBottom: isActive ? '2px solid #3978F6' : '2px solid transparent',
                  backgroundColor: isActive ? '#F8FAFF' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <span>{s.num}.</span>
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Wizard Step Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {/* STEP 1: Select Drive */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Select Placement Drive
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px' }}>
                Select an active recruitment drive with final-selected candidates.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  {
                    id: 'JOB-2027-001',
                    company: 'TechNova Solutions',
                    title: 'Software Engineer',
                    candidates: 1,
                    selected: true
                  },
                  {
                    id: 'JOB-2027-003',
                    company: 'Deloitte',
                    title: 'Analyst — Technology Consulting',
                    candidates: 2,
                    selected: false
                  },
                  {
                    id: 'JOB-2027-005',
                    company: 'Amazon',
                    title: 'Software Development Engineer I',
                    candidates: 1,
                    selected: false
                  }
                ].map((item) => (
                  <label
                    key={item.id}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        jobId: item.id,
                        companyName: item.company,
                        jobTitle: item.title
                      });
                    }}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: formData.jobId === item.id ? '2px solid #3978F6' : '1px solid #E2E8F0',
                      backgroundColor: formData.jobId === item.id ? '#EFF6FF' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="radio"
                        checked={formData.jobId === item.id}
                        onChange={() => {}}
                        style={{ accentColor: '#3978F6' }}
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
                          {item.company}
                        </div>
                        <div style={{ fontSize: '12.5px', color: '#475569' }}>
                          {item.title} ({item.id})
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {item.candidates} Final Selected
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Candidate */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Select Final-Selected Candidate
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px' }}>
                Only candidates who have cleared all interview rounds in Layer 10 are eligible.
              </p>

              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: '2px solid #3978F6',
                  backgroundColor: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#3978F6',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    RK
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#101B36' }}>
                        Rahul Kumar
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: '#DCFCE7',
                          color: '#15803D',
                          padding: '2px 7px',
                          borderRadius: '6px'
                        }}
                      >
                        ✓ Final Round: Passed
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '2px' }}>
                      CSE • CGPA 8.7 • AI Match Fit: 91% • Roll: CL-2027-0042
                    </div>
                  </div>
                </div>
                <CheckCircle2 size={20} color="#3978F6" />
              </div>
            </div>
          )}

          {/* STEP 3: Offer Details & Compensation */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Offer Compensation & Terms
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px' }}>
                Enter the approved salary breakdown, work location, and joining dates.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Total Annual CTC *
                  </label>
                  <input
                    type="text"
                    value={formData.totalCTC}
                    onChange={(e) => setFormData({ ...formData, totalCTC: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: '#059669',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Base Salary
                  </label>
                  <input
                    type="text"
                    value={formData.baseSalary}
                    onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Variable Pay / Performance Bonus
                  </label>
                  <input
                    type="text"
                    value={formData.variablePay}
                    onChange={(e) => setFormData({ ...formData, variablePay: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Joining Bonus (One-time)
                  </label>
                  <input
                    type="text"
                    value={formData.joiningBonus}
                    onChange={(e) => setFormData({ ...formData, joiningBonus: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Location & Work Mode
                  </label>
                  <input
                    type="text"
                    value={`${formData.location} (${formData.workMode})`}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Joining Date *
                  </label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Offer Expiry Date *
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Probation Period
                  </label>
                  <input
                    type="text"
                    value={formData.probationPeriod}
                    onChange={(e) => setFormData({ ...formData, probationPeriod: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Document Requirements */}
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Required Pre-Joining Documents
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px' }}>
                Select documents the candidate must upload upon accepting the offer.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {REQUIRED_DOCUMENT_TYPES.map((docType) => {
                  const isChecked = formData.requiredDocs.includes(docType);
                  return (
                    <label
                      key={docType}
                      onClick={() => handleToggleDoc(docType)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: isChecked ? '1.5px solid #3978F6' : '1px solid #E2E8F0',
                        backgroundColor: isChecked ? '#EFF6FF' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13px',
                        fontWeight: isChecked ? 700 : 500,
                        color: isChecked ? '#1E40AF' : '#334155'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ accentColor: '#3978F6' }}
                      />
                      <span>{docType}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Review */}
          {step === 5 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: '0 0 4px' }}>
                Review Offer Summary
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px' }}>
                Verify terms before dispatching to the student portal.
              </p>

              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  padding: '20px',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Candidate</span>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>{formData.candidateName}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Company & Role</span>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
                      {formData.companyName} — {formData.jobTitle}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Annual CTC</span>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#059669' }}>{formData.totalCTC}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Joining Date</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#101B36' }}>{formData.joiningDate}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Location</span>
                    <span style={{ fontSize: '13px', color: '#334155' }}>{formData.location} ({formData.workMode})</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Offer Expiry</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#B45309' }}>{formData.expiryDate}</span>
                  </div>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px' }}>
                    Required Documents ({formData.requiredDocs.length})
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {formData.requiredDocs.map((doc) => (
                      <span
                        key={doc}
                        style={{
                          fontSize: '11.5px',
                          backgroundColor: '#FFFFFF',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          color: '#334155'
                        }}
                      >
                        ✓ {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  borderRadius: '10px',
                  fontSize: '11.5px',
                  color: '#92400E',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ShieldAlert size={16} />
                <span>
                  <strong>Demo Offer:</strong> Generated by CampusCore. Not a legally binding employment contract.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <button
            onClick={handleBack}
            disabled={step === 1}
            style={{
              padding: '8px 16px',
              borderRadius: '9px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: step === 1 ? '#CBD5E1' : '#334155',
              fontSize: '13px',
              fontWeight: 700,
              cursor: step === 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ChevronLeft size={15} />
            <span>Back</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {step === 5 ? (
              <>
                <button
                  onClick={() => handleConfirmSend(false)}
                  disabled={isSubmitting}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '9px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#334155',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Save Draft
                </button>
                <button
                  onClick={() => setShowSendConfirmation(true)}
                  disabled={isSubmitting}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '9px',
                    border: 'none',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(57, 120, 246, 0.3)'
                  }}
                >
                  <Send size={15} />
                  <span>Send Offer</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                style={{
                  padding: '9px 18px',
                  borderRadius: '9px',
                  border: 'none',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Continue</span>
                <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* STEP 6 Confirmation Modal */}
        {showSendConfirmation && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(16, 27, 54, 0.8)',
              zIndex: 1450,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px 28px',
                maxWidth: '460px',
                width: '100%',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
              }}
              className="animate-fade-in"
            >
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: '0 0 8px' }}>
                Send Offer to {formData.candidateName}?
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, margin: '0 0 16px' }}>
                The candidate will receive an immediate in-app placement notification and offer letter in their student portal.
              </p>

              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  fontSize: '12.5px',
                  color: '#334155'
                }}
              >
                <div><strong>Role:</strong> {formData.jobTitle} ({formData.totalCTC})</div>
                <div><strong>Company:</strong> {formData.companyName}</div>
                <div><strong>Response Window:</strong> Until {formData.expiryDate}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => setShowSendConfirmation(false)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#475569',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirmSend(true)}
                  disabled={isSubmitting}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#3978F6',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Confirm & Send Offer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
