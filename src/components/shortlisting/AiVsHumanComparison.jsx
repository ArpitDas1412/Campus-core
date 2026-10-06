import React from 'react';
import { UserCheck, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import RecommendationBadge from './RecommendationBadge.jsx';
import {
  AI_RECOMMENDATION_STATUS,
  RECRUITER_DECISION_STATUS,
  STATUS_STYLES
} from '../../data/shortlistingConfig.js';

export default function AiVsHumanComparison({ candidates = [] }) {
  // Show candidates who have had decisions or top candidates
  const evaluatedPool = candidates.slice(0, 10);

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
          marginBottom: '16px'
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
            <UserCheck size={18} />
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
              AI Recommendation vs Human Recruiter Decision
            </h3>
            <span style={{ fontSize: '12.5px', color: '#64748B' }}>
              Transparency comparison tracking alignment, modifications, and human oversight
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: '11.5px',
            color: '#2563EB',
            backgroundColor: '#EFF6FF',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontWeight: 800
          }}
        >
          AI RECOMMENDS • HUMANS DECIDE
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
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
              <th style={{ padding: '12px 14px' }}>AI Fit Score</th>
              <th style={{ padding: '12px 14px' }}>AI Recommendation</th>
              <th style={{ padding: '12px 14px' }}>Recruiter Decision</th>
              <th style={{ padding: '12px 14px' }}>Alignment Status</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>Human Justification</th>
            </tr>
          </thead>
          <tbody>
            {evaluatedPool.map((item) => {
              const recStatus = item.aiRecommendation?.status;
              const decStatus = item.recruiterDecision?.status;
              const isOverridden = item.recruiterDecision?.overridden;
              const decMeta = STATUS_STYLES[decStatus] || STATUS_STYLES[RECRUITER_DECISION_STATUS.PENDING];

              let alignmentLabel = 'Aligned';
              let alignmentColor = '#059669';
              let alignmentBg = '#ECFDF5';

              if (decStatus === RECRUITER_DECISION_STATUS.PENDING) {
                alignmentLabel = 'Pending Review';
                alignmentColor = '#64748B';
                alignmentBg = '#F1F5F9';
              } else if (isOverridden) {
                alignmentLabel = 'Human Override';
                alignmentColor = '#7C3AED';
                alignmentBg = '#F5F3FF';
              }

              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '12.5px' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#101B36' }}>
                    <div>{item.student?.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>
                      {item.student?.id} • {item.student?.department}
                    </div>
                  </td>

                  <td style={{ padding: '12px 14px' }}>
                    <strong style={{ color: '#101B36' }}>{item.aiRecommendation?.score}%</strong>
                  </td>

                  <td style={{ padding: '12px 14px' }}>
                    <RecommendationBadge status={recStatus} size="sm" />
                  </td>

                  <td style={{ padding: '12px 14px' }}>
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
                      {decStatus}
                    </span>
                  </td>

                  <td style={{ padding: '12px 14px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        backgroundColor: alignmentBg,
                        color: alignmentColor,
                        fontSize: '11px',
                        fontWeight: 800
                      }}
                    >
                      {alignmentLabel}
                    </span>
                  </td>

                  <td style={{ padding: '12px 14px', textAlign: 'right', color: '#475569', fontSize: '11.5px' }}>
                    {item.recruiterDecision?.reason || (decStatus === 'Pending' ? 'Awaiting action' : 'Consistent with AI ranking')}
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
