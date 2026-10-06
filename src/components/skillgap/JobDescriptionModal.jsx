import React, { useState } from 'react';
import { X, FileText, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { parseJobDescription } from '../../services/skillGapAnalyzer';

export default function JobDescriptionModal({ isOpen, onClose, onApplyCustomRole }) {
  if (!isOpen) return null;

  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedResult, setParsedResult] = useState(null);

  const sampleJDs = [
    {
      title: "FinTech Enterprise Software Engineer",
      text: `Role: Software Engineer — Core Platforms
Requirements:
- Strong foundations in Java and Object-Oriented Programming (OOP)
- Proficient in SQL, relational databases (PostgreSQL/MySQL), and REST APIs
- Experience with Data Structures & Algorithms for low-latency transaction processing
- Nice to have: Experience with AWS cloud infrastructure (EC2, S3) and Docker containers
- Degree: B.Tech in Computer Science or Information Technology with 7.5+ CGPA`
    },
    {
      title: "Cloud & Distributed Systems SDE",
      text: `Role: Cloud Systems Engineer
Requirements:
- Hands-on proficiency in Python or Go, Linux systems, and TCP/IP Networking
- Experience in AWS (IAM, VPC, EC2, Lambda) and Kubernetes cluster deployments
- Working knowledge of Terraform Infrastructure-as-Code and CI/CD pipelines
- Strong analytical and debugging capabilities
- Freshers or 2027 graduates welcome to apply`
    },
    {
      title: "Modern Full Stack Web Engineer",
      text: `Role: Full Stack Engineer
Requirements:
- Proven experience with React, JavaScript (ES6+), HTML5, and CSS3
- Server-side capabilities in Node.js, Express, and RESTful microservices
- Database experience with PostgreSQL and MongoDB
- Experience writing unit tests and using Git version control
- Bachelor's degree in engineering or equivalent practical experience`
    }
  ];

  const handleParse = () => {
    if (!text || text.trim().length < 20) {
      setError('Please paste or write a detailed job description (minimum 20 characters).');
      return;
    }
    setError('');
    setIsParsing(true);

    setTimeout(() => {
      const parsed = parseJobDescription(text);
      setIsParsing(false);
      if (parsed.error) {
        setError(parsed.error);
      } else {
        setParsedResult(parsed);
      }
    }, 600);
  };

  const handleConfirmRole = () => {
    if (parsedResult) {
      onApplyCustomRole(parsedResult);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 27, 54, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1100,
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
          maxWidth: '760px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px rgba(16, 27, 54, 0.25)',
          overflow: 'hidden',
          border: '1px solid #E2E8F0'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(57, 120, 246, 0.2)',
                color: '#36C5E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                Analyze Any Job Description
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#93C5FD' }}>
                CampusCore AI parses skills, prerequisites, and compares against candidate profile
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          
          {/* Preset Buttons */}
          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>
              Load Sample Recruiter Job Description:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {sampleJDs.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setText(s.text);
                    setError('');
                    setParsedResult(null);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = '#3978F6'}
                  onMouseOut={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
              Paste Full Job Description *
            </label>
            <textarea
              rows={7}
              placeholder="Paste raw recruiter job posting, JD bullet points, or skills list here..."
              value={text}
              onChange={e => setText(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px',
                borderRadius: '10px',
                border: error ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                fontSize: '13px',
                lineHeight: 1.5,
                outline: 'none',
                fontFamily: "'Inter', sans-serif"
              }}
              onFocus={e => e.target.style.borderColor = '#3978F6'}
              onBlur={e => e.target.style.borderColor = '#CBD5E1'}
            />
            {error && <span style={{ fontSize: '11.5px', color: '#EF4444', display: 'block', marginTop: '4px' }}>{error}</span>}
          </div>

          {/* Action Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
            <button
              onClick={handleParse}
              disabled={isParsing}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: '#3978F6',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: isParsing ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px rgba(57, 120, 246, 0.25)'
              }}
            >
              <Sparkles size={16} />
              <span>{isParsing ? 'Extracting Requirements...' : '✦ Analyze Job Description'}</span>
            </button>
          </div>

          {/* Parsed Preview if available */}
          {parsedResult && (
            <div
              style={{
                padding: '18px 20px',
                borderRadius: '12px',
                backgroundColor: '#F0F9FF',
                border: '1.5px solid #BAE6FD',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#0369A1' }}>
                <CheckCircle2 size={18} />
                <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 800 }}>
                  Successfully Extracted Job Criteria: "{parsedResult.title}"
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '12px', fontSize: '12.5px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#0369A1', fontWeight: 700, display: 'block' }}>
                    EXTRACTED REQUIRED SKILLS ({parsedResult.requiredSkills.length})
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {parsedResult.requiredSkills.map((s, i) => (
                      <span key={i} style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#FFFFFF', border: '1px solid #7DD3FC', color: '#0284C7', fontWeight: 600 }}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#0369A1', fontWeight: 700, display: 'block' }}>
                    PREFERRED / BONUS SKILLS ({parsedResult.preferredSkills.length})
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {parsedResult.preferredSkills.length === 0 ? (
                      <span style={{ color: '#64748B', fontStyle: 'italic' }}>None specified</span>
                    ) : (
                      parsedResult.preferredSkills.map((s, i) => (
                        <span key={i} style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', color: '#475569' }}>
                          {s.name}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #E0F2FE', fontSize: '12px', color: '#0369A1' }}>
                • Experience Scope: <strong>{parsedResult.experienceRequirement}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#64748B',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>

          {parsedResult && (
            <button
              onClick={handleConfirmRole}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Benchmark Student Against this JD</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
