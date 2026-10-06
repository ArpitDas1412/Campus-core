import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  User,
  Calendar,
  Clock,
  MapPin,
  Video,
  ExternalLink,
  Award,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  ChevronRight
} from 'lucide-react';
import { formatTime12h, ATTENDANCE_STATUS, ROUND_RESULT_STATUS, SCHEDULE_STATUS } from '../../data/schedulingConfig';

export default function InterviewDetailsModal({
  interview,
  onClose,
  onRecordAttendance,
  onRecordResult,
  onRescheduleClick,
  onCancelClick
}) {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState(interview?.attendance?.status || ATTENDANCE_STATUS.NOT_MARKED);
  const [result, setResult] = useState(interview?.roundResult?.status || ROUND_RESULT_STATUS.PENDING);
  const [score, setScore] = useState(interview?.roundResult?.score || '');
  const [feedback, setFeedback] = useState(interview?.roundResult?.feedback || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!interview) return null;

  const handleSaveEvaluation = (e) => {
    e.preventDefault();
    if (onRecordAttendance) {
      onRecordAttendance(interview.id, attendance);
    }
    if (onRecordResult) {
      onRecordResult(interview.id, result, score, feedback);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.22)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="animate-fade-in"
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '22px 26px',
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(57, 120, 246, 0.2)',
                color: '#38BDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Calendar size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {interview.candidateName}
              </h3>
              <p style={{ fontSize: '12.5px', color: '#94A3B8', margin: '2px 0 0' }}>
                {interview.studentRoll} • {interview.roundName} ({interview.companyName || 'TechNova'})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Status Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#101B36', fontWeight: 700 }}>
                <Clock size={14} color="#2563EB" />
                {interview.date} at {formatTime12h(interview.startTime)}
              </span>
              <span style={{ color: '#94A3B8' }}>•</span>
              <span style={{ color: '#475569', fontWeight: 600 }}>
                {interview.duration || 30} Mins
              </span>
              <span style={{ color: '#94A3B8' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 600 }}>
                {interview.mode === 'Online' ? <Video size={14} /> : <MapPin size={14} />}
                {interview.roomName || interview.roomId}
              </span>
            </div>

            {interview.meetingLink && (
              <a
                href={interview.meetingLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <span>Join Online Meeting</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Candidate 360 & AI Intelligence Summary */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '16px'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '10px' }}>
              Candidate Intelligence Dossier (Layers 3, 5, 8 & 9)
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
                marginBottom: '14px'
              }}
            >
              <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '11px', color: '#64748B' }}>CGPA (Academics)</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#101B36' }}>{interview.cgpa || '8.8'} / 10</div>
              </div>
              <div style={{ backgroundColor: '#EFF6FF', padding: '10px 12px', borderRadius: '10px', border: '1px solid #BFDBFE' }}>
                <div style={{ fontSize: '11px', color: '#1E40AF' }}>AI Fit Score (L8)</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#2563EB' }}>89% • High Fit</div>
              </div>
              <div style={{ backgroundColor: '#F5F3FF', padding: '10px 12px', borderRadius: '10px', border: '1px solid #DDD6FE' }}>
                <div style={{ fontSize: '11px', color: '#6D28D9' }}>Resume ATS (L5)</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#7C3AED' }}>92 / 100 Score</div>
              </div>
              <div style={{ backgroundColor: '#ECFDF5', padding: '10px 12px', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                <div style={{ fontSize: '11px', color: '#065F46' }}>Shortlist (L9)</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#059669' }}>Recommended</div>
              </div>
            </div>

            {/* Quick Links across Layers */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/recruiter/jobs/${interview.jobId || 'JOB-2027-001'}/matching/${interview.candidateId || 'std-1'}`);
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={12} />
                <span>Explainable Fit Score</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/recruiter/candidates/${interview.candidateId || 'std-1'}`);
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#F8FAFC',
                  color: '#475569',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <User size={12} />
                <span>Candidate Profile</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/student/resume`);
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#F5F3FF',
                  color: '#7C3AED',
                  border: '1px solid #DDD6FE',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <FileText size={12} />
                <span>Resume Dossier</span>
              </button>
            </div>
          </div>

          {/* Interview Evaluation & Attendance Form (Feeds Layer 12) */}
          <form
            onSubmit={handleSaveEvaluation}
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#101B36' }}>
                Session Evaluation & Attendance Tracker
              </div>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                Feeds forward to Layer 12 Offers
              </span>
            </div>

            {saveSuccess && (
              <div
                style={{
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle2 size={14} />
                <span>Evaluation and attendance successfully logged.</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* Attendance */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Candidate Attendance
                </label>
                <select
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value={ATTENDANCE_STATUS.NOT_MARKED}>Not Marked</option>
                  <option value={ATTENDANCE_STATUS.PRESENT}>Present</option>
                  <option value={ATTENDANCE_STATUS.LATE}>Late</option>
                  <option value={ATTENDANCE_STATUS.ABSENT}>Absent</option>
                </select>
              </div>

              {/* Round Result */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Round Decision
                </label>
                <select
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value={ROUND_RESULT_STATUS.PENDING}>Pending Evaluation</option>
                  <option value={ROUND_RESULT_STATUS.PASSED}>Passed (Advance to Next)</option>
                  <option value={ROUND_RESULT_STATUS.HOLD}>Hold / Re-evaluate</option>
                  <option value={ROUND_RESULT_STATUS.FAILED}>Failed</option>
                  <option value={ROUND_RESULT_STATUS.NO_SHOW}>No Show</option>
                </select>
              </div>
            </div>

            {/* Score & Notes */}
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Score (/100)
                </label>
                <input
                  type="number"
                  placeholder="85"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Interviewer Panel Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Strong problem solving, verified system design skills..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                type="submit"
                style={{
                  padding: '8px 18px',
                  backgroundColor: '#101B36',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Save Evaluation
              </button>
            </div>
          </form>
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => onRescheduleClick && onRescheduleClick(interview)}
              style={{
                padding: '8px 14px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RotateCcw size={13} />
              <span>Reschedule</span>
            </button>

            <button
              onClick={() => onCancelClick && onCancelClick(interview)}
              style={{
                padding: '8px 14px',
                backgroundColor: '#FFF1F2',
                color: '#E11D48',
                border: '1px solid #FECDD3',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Cancel Interview
            </button>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              backgroundColor: '#F1F5F9',
              color: '#475569',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
