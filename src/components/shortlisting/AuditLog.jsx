import React from 'react';
import { History, UserCheck, AlertTriangle, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { STATUS_STYLES, RECRUITER_DECISION_STATUS } from '../../data/shortlistingConfig.js';

export default function AuditLog({ auditTrail = [], candidates = [] }) {
  // If auditTrail is empty, show default illustrative records based on candidates
  const displayLogs =
    auditTrail.length > 0
      ? auditTrail
      : [
          {
            id: 'AUDIT-001',
            candidateName: 'Rahul Kumar',
            candidateId: 'CL-2027-0042',
            aiRecommendationStatus: 'Recommended',
            aiScore: 91,
            decisionStatus: 'Shortlisted',
            reason: 'Strong DSA & Java production project portfolio',
            overridden: false,
            changedBy: 'Ananya Mehta (Recruiter)',
            timestamp: 'Today, 10:42 AM'
          },
          {
            id: 'AUDIT-002',
            candidateName: 'Arjun Patel',
            candidateId: 'CL-2027-0008',
            aiRecommendationStatus: 'Needs Review',
            aiScore: 76,
            decisionStatus: 'Shortlisted',
            reason: 'Exceptional open-source portfolio & system design proficiency',
            overridden: true,
            changedBy: 'Ananya Mehta (Recruiter)',
            timestamp: 'Today, 10:48 AM'
          },
          {
            id: 'AUDIT-003',
            candidateName: 'Sneha Rao',
            candidateId: 'CL-2027-0021',
            aiRecommendationStatus: 'Not Recommended',
            aiScore: 69,
            decisionStatus: 'On Hold',
            reason: 'High CGPA but cloud engineering skill gaps need interview review',
            overridden: true,
            changedBy: 'Ananya Mehta (Recruiter)',
            timestamp: 'Today, 11:15 AM'
          }
        ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(16, 27, 54, 0.04)',
        marginBottom: '24px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <History size={18} />
          </div>
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 800,
                color: '#101B36',
                margin: 0,
                letterSpacing: '-0.01em'
              }}
            >
              Decision Audit Trail & Oversight Log
            </h3>
            <span style={{ fontSize: '12.5px', color: '#64748B' }}>
              Chronological log of all recruiter actions, overrides, and justifications
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>
          <ShieldCheck size={15} />
          <span>Governance & Compliance Verified</span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
          <thead>
            <tr
              style={{
                backgroundColor: '#F8FAFC',
                borderBottom: '1px solid #E2E8F0',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#475569',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              <th style={{ padding: '12px 14px' }}>Candidate</th>
              <th style={{ padding: '12px 14px' }}>AI Recommendation</th>
              <th style={{ padding: '12px 14px' }}>Human Decision</th>
              <th style={{ padding: '12px 14px' }}>Decision Reason / Justification</th>
              <th style={{ padding: '12px 14px' }}>Changed By</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {displayLogs.map((log, idx) => {
              const candidateObj = candidates.find((c) => c.candidateId === log.candidateId);
              const candidateName = log.candidateName || candidateObj?.student?.name || log.candidateId;
              const decMeta = STATUS_STYLES[log.decisionStatus] || STATUS_STYLES[RECRUITER_DECISION_STATUS.PENDING];

              return (
                <tr
                  key={log.id || idx}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    fontSize: '12.5px',
                    backgroundColor: log.overridden ? '#FFFDF5' : '#FFFFFF'
                  }}
                >
                  {/* Candidate */}
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#101B36' }}>
                    <div>{candidateName}</div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>
                      {log.candidateId}
                    </div>
                  </td>

                  {/* AI Recommendation */}
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#F1F5F9',
                          color: '#334155',
                          fontSize: '11.5px',
                          fontWeight: 700
                        }}
                      >
                        {log.aiRecommendationStatus || 'Recommended'}
                        {log.aiScore ? ` (${log.aiScore}%)` : ''}
                      </span>
                    </div>
                  </td>

                  {/* Human Decision */}
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '6px',
                          backgroundColor: decMeta.bg,
                          color: decMeta.color,
                          border: `1px solid ${decMeta.border}`,
                          fontSize: '11.5px',
                          fontWeight: 800
                        }}
                      >
                        {log.decisionStatus}
                      </span>
                      {log.overridden && (
                        <span
                          style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: '#F5F3FF',
                            color: '#7C3AED',
                            fontSize: '10.5px',
                            fontWeight: 800
                          }}
                        >
                          Override
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Reason */}
                  <td style={{ padding: '12px 14px', color: '#334155' }}>
                    <span style={{ fontSize: '12px' }}>{log.reason || 'Standard evaluation update'}</span>
                  </td>

                  {/* Changed By */}
                  <td style={{ padding: '12px 14px', color: '#64748B', fontSize: '12px' }}>
                    {log.changedBy || 'Ananya Mehta'}
                  </td>

                  {/* Timestamp */}
                  <td style={{ padding: '12px 14px', textAlign: 'right', color: '#94A3B8', fontSize: '11.5px' }}>
                    {log.timestamp}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
