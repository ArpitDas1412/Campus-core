import React from 'react';
import Modal from '../../common/Modal';
import {
  Sparkles,
  AlertTriangle,
  BrainCircuit,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export default function InsightDetailModal({ isOpen, onClose, insight }) {
  if (!insight) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={insight.actionLabel}
      subtitle={`CampusCore Placement Intelligence: ${insight.number}`}
      maxWidth="620px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Main Observation Card */}
        <div
          style={{
            padding: '18px 20px',
            backgroundColor: '#F8FAFD',
            borderRadius: '16px',
            border: '1.5px solid #CBD5E1'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE'
              }}
            >
              ✦ AI OBSERVATION
            </span>
            <span style={{ fontSize: '11.5px', color: '#64748B' }}>{insight.badge}</span>
          </div>

          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '0 0 10px', lineHeight: 1.4 }}>
            "{insight.text}"
          </h4>

          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
            {insight.details}
          </p>
        </div>

        {/* Dynamic Context Breakdown depending on insight ID */}
        {insight.id === 'ai-1' && (
          <div>
            <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#101B36', marginBottom: '10px' }}>
              Identified Skill Shortfall Distribution (186 Candidates Analyzed):
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { skill: 'Java Multithreading & Concurrency', gap: '44% Below Benchmark', students: '82 students' },
                { skill: 'Advanced SQL (Window Functions & Indexing)', gap: '39% Below Benchmark', students: '72 students' },
                { skill: 'Microservices & REST Architecture', gap: '28% Below Benchmark', students: '52 students' }
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    fontSize: '13px'
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#101B36' }}>{item.skill}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11.5px', color: '#EF4444', fontWeight: 700 }}>{item.gap}</span>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>({item.students})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {insight.id === 'ai-2' && (
          <div>
            <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#101B36', marginBottom: '10px' }}>
              At-Risk Student Intervention Cohort (74 Candidates):
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { branch: 'Civil Engineering', count: '32 students', primaryIssue: 'Core Aptitude & Soft-Skills' },
                { branch: 'Mechanical Engineering', count: '26 students', primaryIssue: 'Basic Coding Assessment' },
                { branch: 'Electrical & Electronics', count: '16 students', primaryIssue: 'Resume ATS Compatibility' }
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    fontSize: '13px'
                  }}
                >
                  <div>
                    <strong style={{ color: '#991B1B' }}>{item.branch}</strong>
                    <div style={{ fontSize: '11.5px', color: '#7F1D1D' }}>{item.primaryIssue}</div>
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#B91C1C' }}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {insight.id === 'ai-3' && (
          <div>
            <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#101B36', marginBottom: '10px' }}>
              Current Corporate Hiring Demand Index:
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { role: 'Full-Stack (React/Node/PostgreSQL)', demand: '+340% YoY', avgCtc: '14.5 LPA' },
                { role: 'Cloud Platform & DevOps (AWS/GCP)', demand: '+220% YoY', avgCtc: '16.0 LPA' },
                { role: 'AI/ML Engineering (PyTorch/LLMs)', demand: '+180% YoY', avgCtc: '18.2 LPA' }
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#F5F3FF',
                    border: '1px solid #DDD6FE',
                    fontSize: '13px'
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#4C1D95' }}>{item.role}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>{item.demand}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#101B36' }}>{item.avgCtc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '9px 18px', borderRadius: '10px' }}
          >
            Close Insight
          </button>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ padding: '9px 20px', borderRadius: '10px', fontWeight: 700 }}
          >
            Launch Remedial Workflow
          </button>
        </div>
      </div>
    </Modal>
  );
}
