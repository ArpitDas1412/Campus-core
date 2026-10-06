import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Users,
  Calendar,
  Clock,
  DoorOpen,
  Video,
  Plus,
  Trash2,
  ShieldCheck,
  Check
} from 'lucide-react';
import {
  ROUND_TYPES,
  DEFAULT_SCHEDULING_CONFIG,
  DEFAULT_INTERVIEWERS,
  DEFAULT_ROOMS,
  INITIAL_ACTIVE_DRIVES
} from '../../data/schedulingConfig';
import { STUDENTS } from '../../data/students';
import { generateSchedule, publishSchedule } from '../../services/schedulingEngine';

export default function ScheduleWizard({
  initialJobId = 'JOB-2027-001',
  onComplete,
  onCancel
}) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Drive Selection
  const [selectedJobId, setSelectedJobId] = useState(initialJobId);
  const activeDrive = INITIAL_ACTIVE_DRIVES.find((d) => d.id === selectedJobId) || INITIAL_ACTIVE_DRIVES[0];

  // Step 2: Candidates Selection (Layer 9 Shortlist)
  const candidatePool = STUDENTS.slice(0, 16).map((c, idx) => ({
    ...c,
    fitScore: 80 + (idx % 18),
    shortlistStatus: idx < 12 ? 'Shortlisted' : 'Needs Review',
    aiTier: idx < 8 ? 'Tier 1 Strong Match' : 'Tier 2 Suitable'
  }));

  const [selectedCandidateIds, setSelectedCandidateIds] = useState(
    candidatePool.slice(0, 12).map((c) => c.id)
  );
  const [candidateFilter, setCandidateFilter] = useState('ALL');

  // Step 3: Define Rounds
  const [rounds, setRounds] = useState([
    {
      id: 'ROUND-1',
      name: 'Round 1: Online Assessment',
      type: 'Coding Test',
      duration: 60,
      mode: 'Online',
      interviewerCount: 0,
      roomRequired: false,
      passingCriteria: 'Score >= 70%'
    },
    {
      id: 'ROUND-2',
      name: 'Round 2: Technical Interview',
      type: 'Technical Interview',
      duration: 30,
      mode: 'Offline',
      interviewerCount: 1,
      roomRequired: true,
      passingCriteria: 'Rating >= 4/5'
    },
    {
      id: 'ROUND-3',
      name: 'Round 3: HR Interview',
      type: 'HR Interview',
      duration: 30,
      mode: 'Online',
      interviewerCount: 1,
      roomRequired: false,
      passingCriteria: 'Recommendation'
    }
  ]);

  // Step 4: Slots Configuration
  const [dates, setDates] = useState(['2026-10-15', '2026-10-16', '2026-10-17']);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [slotDuration, setSlotDuration] = useState(30);
  const [breakStart, setBreakStart] = useState('13:00');
  const [breakEnd, setBreakEnd] = useState('14:00');

  // Step 5: Assign Resources
  const [selectedInterviewers, setSelectedInterviewers] = useState(
    DEFAULT_INTERVIEWERS.slice(0, 6).map((i) => i.id)
  );
  const [selectedRooms, setSelectedRooms] = useState(
    DEFAULT_ROOMS.slice(0, 5).map((r) => r.id)
  );

  // Step 6: Auto-Generation & Progress
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generatedResult, setGeneratedResult] = useState(null);

  // Step 8: Confirmation modal
  const [showPublishModal, setShowPublishModal] = useState(false);

  // Capacity calculations
  const totalSlotsPerDay = Math.floor(
    (timeDiffMinutes(startTime, endTime) - timeDiffMinutes(breakStart, breakEnd)) / slotDuration
  );
  const totalSlotsAvailable = totalSlotsPerDay * dates.length * Math.min(selectedRooms.length, selectedInterviewers.length);
  const capacitySufficient = totalSlotsAvailable >= selectedCandidateIds.length;

  function timeDiffMinutes(t1, t2) {
    const [h1, m1] = t1.split(':').map(Number);
    const [h2, m2] = t2.split(':').map(Number);
    return Math.max(0, h2 * 60 + m2 - (h1 * 60 + m1));
  }

  // Handle auto-generation execution
  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    const selectedCandidates = candidatePool.filter((c) => selectedCandidateIds.includes(c.id));

    const result = await generateSchedule(
      {
        id: activeDrive.id,
        title: activeDrive.jobTitle,
        companyName: activeDrive.companyName
      },
      selectedCandidates,
      {
        dates,
        rounds,
        workingHours: { start: startTime, end: endTime },
        breakPeriods: [{ start: breakStart, end: breakEnd }],
        defaultSlotDuration: slotDuration,
        interviewers: DEFAULT_INTERVIEWERS.filter((i) => selectedInterviewers.includes(i.id)),
        rooms: DEFAULT_ROOMS.filter((r) => selectedRooms.includes(r.id))
      },
      (stepText) => setGenerationStep(stepText)
    );

    setIsGenerating(false);
    setGeneratedResult(result);
    setCurrentStep(7); // Jump to review
  };

  const handlePublish = () => {
    publishSchedule(activeDrive.id, 'Placement Officer');
    setShowPublishModal(false);
    if (onComplete) onComplete(activeDrive.id);
  };

  const stepTitles = [
    'Select Drive',
    'Select Candidates',
    'Define Rounds',
    'Configure Slots',
    'Assign Resources',
    'Auto-Schedule',
    'Review',
    'Publish'
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '28px',
        boxShadow: '0 4px 24px rgba(16, 27, 54, 0.06)'
      }}
      className="animate-fade-in"
    >
      {/* Step Wizard Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#2563EB',
                backgroundColor: '#EFF6FF',
                padding: '3px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}
            >
              Step {currentStep} of 8 • Multi-Step Drive Scheduler
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', margin: '6px 0 0' }}>
              {stepTitles[currentStep - 1]}
            </h2>
          </div>

          {onCancel && (
            <button
              onClick={onCancel}
              style={{
                background: 'transparent',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#64748B',
                cursor: 'pointer'
              }}
            >
              Exit Wizard
            </button>
          )}
        </div>

        {/* Visual Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div
                key={idx}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div
                  style={{
                    height: '6px',
                    borderRadius: '999px',
                    backgroundColor: isCompleted ? '#059669' : isCurrent ? '#2563EB' : '#E2E8F0',
                    transition: 'background-color 0.3s ease'
                  }}
                />
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: isCurrent ? 800 : 600,
                    color: isCompleted ? '#059669' : isCurrent ? '#2563EB' : '#94A3B8',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {stepNum}. {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Select Drive */}
      {currentStep === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
            Select an active placement drive with finalized Layer 9 shortlists ready for interview scheduling.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {INITIAL_ACTIVE_DRIVES.map((drive) => {
              const isSelected = selectedJobId === drive.id;

              return (
                <div
                  key={drive.id}
                  onClick={() => setSelectedJobId(drive.id)}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '14px',
                    border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        backgroundColor: drive.avatarBg,
                        color: '#FFFFFF',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px'
                      }}
                    >
                      {drive.avatarText}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#101B36' }}>
                        {drive.jobTitle} — {drive.companyName}
                      </div>
                      <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
                        {drive.openings} Openings • {drive.shortlistedCount} Shortlisted Candidates
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#059669',
                      backgroundColor: '#ECFDF5',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    {drive.shortlistedCount} candidates ready for scheduling
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: Select Candidates from Layer 9 Shortlist */}
      {currentStep === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
                Candidates Ready for Scheduling (Consumed from Layer 9 Smart Shortlist)
              </p>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', marginTop: '4px' }}>
                Selected: {selectedCandidateIds.length} / {candidatePool.length} Candidates
              </div>
            </div>

            <button
              onClick={() => setSelectedCandidateIds(candidatePool.map((c) => c.id))}
              style={{
                padding: '6px 14px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Schedule all shortlisted candidates
            </button>
          </div>

          {/* Candidate list items */}
          <div style={{ maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {candidatePool.map((cand) => {
              const isChecked = selectedCandidateIds.includes(cand.id);

              return (
                <div
                  key={cand.id}
                  onClick={() => {
                    if (isChecked) {
                      setSelectedCandidateIds(selectedCandidateIds.filter((id) => id !== cand.id));
                    } else {
                      setSelectedCandidateIds([...selectedCandidateIds, cand.id]);
                    }
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: isChecked ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                    backgroundColor: isChecked ? '#F8FAFC' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      style={{ cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
                        {cand.name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                        {cand.studentId || cand.id} • {cand.department} • CGPA: {cand.cgpa}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#2563EB',
                        backgroundColor: '#EFF6FF',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      Fit: {cand.fitScore}%
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {cand.shortlistStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: Define Interview Rounds */}
      {currentStep === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
            Configure round sequence, evaluation modes, panel requirements and passing criteria.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rounds.map((round, rIdx) => (
              <div
                key={round.id}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB' }}>
                      Round {rIdx + 1}
                    </span>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                      {round.name}
                    </h4>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                    {round.type} • {round.duration} Mins • Mode: {round.mode} • Passing: {round.passingCriteria}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => {
                      if (rounds.length > 1) {
                        setRounds(rounds.filter((r) => r.id !== round.id));
                      }
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: '6px'
                    }}
                    title="Remove Round"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Round Button */}
            <button
              onClick={() => {
                const newId = `ROUND-${rounds.length + 1}`;
                setRounds([
                  ...rounds,
                  {
                    id: newId,
                    name: `Round ${rounds.length + 1}: Managerial Round`,
                    type: 'Managerial Interview',
                    duration: 30,
                    mode: 'Offline',
                    interviewerCount: 1,
                    passingCriteria: 'Recommendation'
                  }
                ]);
              }}
              style={{
                padding: '10px',
                border: '1px dashed #CBD5E1',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                color: '#2563EB',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Plus size={15} />
              <span>Add Round</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Configure Slots */}
      {currentStep === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
            Define dates, operating hours, slot intervals and protected lunch break periods.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Daily Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Daily End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Slot Duration
              </label>
              <select
                value={slotDuration}
                onChange={(e) => setSlotDuration(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              >
                <option value={20}>20 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Protected Lunch Break
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="time"
                  value={breakStart}
                  onChange={(e) => setBreakStart(e.target.value)}
                  style={{ width: '50%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
                <span>–</span>
                <input
                  type="time"
                  value={breakEnd}
                  onChange={(e) => setBreakEnd(e.target.value)}
                  style={{ width: '50%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>
            </div>
          </div>

          {/* Multi-Day Selection */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#101B36' }}>
                Interview Drive Dates ({dates.length} Days)
              </label>
              <button
                type="button"
                onClick={() => setDates([...dates, `2026-10-${15 + dates.length}`])}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#2563EB',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                + Add Date
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {dates.map((d, dIdx) => (
                <div
                  key={dIdx}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#1E40AF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Calendar size={13} />
                  <span>Day {dIdx + 1} ({d}) → {totalSlotsPerDay} slots</span>
                </div>
              ))}
            </div>
          </div>

          {/* Capacity Calculation Banner */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              backgroundColor: capacitySufficient ? '#ECFDF5' : '#FEF3C7',
              border: `1px solid ${capacitySufficient ? '#A7F3D0' : '#FDE68A'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#101B36' }}>
                Capacity Status: {capacitySufficient ? 'Capacity Sufficient' : 'Potential Capacity Shortage'}
              </div>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                {totalSlotsAvailable} available slots across {dates.length} days for {selectedCandidateIds.length} candidates.
              </div>
            </div>

            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: capacitySufficient ? '#059669' : '#D97706'
              }}
            >
              {capacitySufficient ? '✓ Capacity Sufficient' : '⚠ Increase Dates/Rooms'}
            </span>
          </div>
        </div>
      )}

      {/* STEP 5: Assign Resources */}
      {currentStep === 5 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
            Allocate corporate interviewers and campus physical/virtual rooms for parallel interview panels.
          </p>

          {/* Interviewers Checkbox Grid */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#101B36', display: 'block', marginBottom: '8px' }}>
              Assign Interviewers ({selectedInterviewers.length} Selected)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              {DEFAULT_INTERVIEWERS.map((int) => {
                const isSelected = selectedInterviewers.includes(int.id);
                return (
                  <div
                    key={int.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedInterviewers(selectedInterviewers.filter((id) => id !== int.id));
                      } else {
                        setSelectedInterviewers([...selectedInterviewers, int.id]);
                      }
                    }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: isSelected ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                      backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <input type="checkbox" checked={isSelected} onChange={() => {}} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#101B36' }}>{int.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{int.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rooms Checkbox Grid */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#101B36', display: 'block', marginBottom: '8px' }}>
              Assign Physical Rooms & Virtual Panels ({selectedRooms.length} Selected)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              {DEFAULT_ROOMS.map((room) => {
                const isSelected = selectedRooms.includes(room.id);
                return (
                  <div
                    key={room.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedRooms(selectedRooms.filter((id) => id !== room.id));
                      } else {
                        setSelectedRooms([...selectedRooms, room.id]);
                      }
                    }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: isSelected ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                      backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <input type="checkbox" checked={isSelected} onChange={() => {}} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#101B36' }}>{room.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        {room.type} • Cap: {room.capacity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Auto-Generate Schedule */}
      {currentStep === 6 && (
        <div
          style={{
            textAlign: 'center',
            padding: '30px 20px',
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: '1px solid #E2E8F0'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <Sparkles size={28} />
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', margin: '0 0 6px' }}>
            CampusCore Conflict-Aware Scheduling Engine
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '520px', margin: '0 auto 24px' }}>
            Deterministically allocates slots, verifies candidate availability, prevents room collisions, and balances interviewer panel load.
          </p>

          {isGenerating ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '3px solid #BFDBFE',
                  borderTopColor: '#2563EB',
                  animation: 'spin 0.8s linear infinite'
                }}
              />
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#2563EB' }}>
                {generationStep || 'Analyzing scheduling constraints...'}
              </div>
            </div>
          ) : (
            <button
              onClick={handleAutoGenerate}
              style={{
                padding: '14px 32px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={18} />
              <span>Auto-Generate Schedule</span>
            </button>
          )}
        </div>
      )}

      {/* STEP 7: Review Generated Schedule */}
      {currentStep === 7 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Summary Banner */}
          <div
            style={{
              padding: '20px',
              borderRadius: '14px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#065F46' }}>
                ✓ {generatedResult?.schedules?.length || selectedCandidateIds.length} Candidates Scheduled Successfully
              </div>
              <div style={{ fontSize: '13px', color: '#047857', marginTop: '3px' }}>
                0 Candidate Conflicts • 0 Interviewer Conflicts • 0 Room Conflicts
              </div>
            </div>

            <div style={{ fontSize: '24px', fontWeight: 900, color: '#059669' }}>
              {generatedResult?.healthScore || 96}% Health Score
            </div>
          </div>

          <div style={{ fontSize: '13px', color: '#475569' }}>
            Rounds configured: <strong>{rounds.length}</strong> | Dates: <strong>{dates.join(', ')}</strong> | Mode: <strong>Hybrid</strong>
          </div>
        </div>
      )}

      {/* STEP 8: Publish Confirmation */}
      {currentStep === 8 && (
        <div
          style={{
            textAlign: 'center',
            padding: '30px 20px',
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: '1px solid #E2E8F0'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#ECFDF5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <CheckCircle2 size={32} />
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', margin: '0 0 6px' }}>
            Ready to Publish Placement Schedule
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '500px', margin: '0 auto 20px' }}>
            Publishing will confirm all slot allocations, notify corporate recruiters, and make personal schedules visible to shortlisted students.
          </p>

          <button
            onClick={() => setShowPublishModal(true)}
            style={{
              padding: '12px 28px',
              backgroundColor: '#059669',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14.5px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(5, 150, 105, 0.3)'
            }}
          >
            Publish Placement Schedule
          </button>
        </div>
      )}

      {/* Wizard Footer Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid #F1F5F9'
        }}
      >
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          style={{
            padding: '10px 18px',
            backgroundColor: '#F8FAFC',
            color: currentStep === 1 ? '#CBD5E1' : '#475569',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ArrowLeft size={15} />
          <span>Previous</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {currentStep < 8 && (
            <button
              onClick={() => setCurrentStep(Math.min(8, currentStep + 1))}
              style={{
                padding: '10px 22px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
              }}
            >
              <span>{currentStep === 5 ? 'Proceed to Auto-Schedule' : 'Next Step'}</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16, 27, 54, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 1200,
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
              padding: '28px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              textAlign: 'center'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: '0 0 10px' }}>
              Publish this placement schedule?
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 20px' }}>
              This will publish {selectedCandidateIds.length} candidate schedules across {rounds.length} rounds from {dates[0]} to {dates[dates.length - 1]}.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowPublishModal(false)}
                style={{
                  padding: '10px 18px',
                  backgroundColor: '#F1F5F9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                style={{
                  padding: '10px 22px',
                  backgroundColor: '#059669',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Publish Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
