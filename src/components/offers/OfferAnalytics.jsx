import React from 'react';
import { getOfferStats, getCompanyOfferStats, getDepartmentOfferStats } from '../../services/offerService';
import { BarChart3, TrendingUp, CheckCircle2, FileCheck2, UserCheck, ShieldCheck } from 'lucide-react';

export default function OfferAnalytics() {
  const stats = getOfferStats();
  const companyStats = getCompanyOfferStats();
  const deptStats = getDepartmentOfferStats();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 5 KPI Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px'
        }}
      >
        {[
          { label: 'Offer Acceptance Rate', value: `${stats.acceptanceRate}%`, sub: '29 / 36 Dispatched', color: '#10B981', icon: CheckCircle2 },
          { label: 'Offer Decline Rate', value: `${stats.declineRate}%`, sub: '3 Alternative selections', color: '#EF4444', icon: TrendingUp },
          { label: 'Document Completion', value: `${stats.documentCompletionRate}%`, sub: '102 / 126 Submitted', color: '#3978F6', icon: FileCheck2 },
          { label: 'Document Verification', value: `${stats.documentVerificationRate}%`, sub: '84 Cleared proofs', color: '#8B5CF6', icon: ShieldCheck },
          { label: 'Joining Confirmation', value: `${stats.joiningConfirmationRate}%`, sub: '23 / 29 Confirmed', color: '#0E8EA8', icon: UserCheck }
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1.5px solid #E2E8F0',
                padding: '16px 18px',
                boxShadow: '0 2px 6px rgba(16, 27, 54, 0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>{kpi.label}</span>
                <Icon size={16} color={kpi.color} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#101B36', lineHeight: 1.1 }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '4px' }}>
                {kpi.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Breakdown: By Company & By Department */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Company Acceptance Metrics */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1.5px solid #E2E8F0',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(16, 27, 54, 0.03)'
          }}
        >
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: '0 0 14px' }}>
            Offer Acceptance by Recruiter Partner
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {companyStats.map((c) => (
              <div key={c.company}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                  <span style={{ color: '#101B36' }}>{c.company}</span>
                  <span style={{ color: '#059669' }}>{c.rate}% ({c.accepted}/{c.sent})</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${c.rate}%`, height: '100%', backgroundColor: '#10B981', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Conversion */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1.5px solid #E2E8F0',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(16, 27, 54, 0.03)'
          }}
        >
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: '0 0 14px' }}>
            Offer Conversion by Department
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {deptStats.map((d) => (
              <div key={d.department}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                  <span style={{ color: '#101B36' }}>{d.department}</span>
                  <span style={{ color: '#3978F6' }}>{d.rate}% ({d.accepted}/{d.offers})</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${d.rate}%`, height: '100%', backgroundColor: '#3978F6', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
