import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferStatusBadge from './OfferStatusBadge';
import {
  Search,
  Filter,
  Eye,
  Send,
  FileCheck2,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  Building2,
  UserCheck
} from 'lucide-react';

export default function OfferTable({
  offers = [],
  onSendOffer,
  onRequestDocs,
  role = 'officer'
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');

  const companies = ['All', ...new Set(offers.map((o) => o.companyName || o.company).filter(Boolean))];

  const filtered = offers.filter((o) => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (companyFilter !== 'All' && (o.companyName || o.company) !== companyFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = o.candidateName?.toLowerCase().includes(q) || o.studentName?.toLowerCase().includes(q);
      const matchId = o.id?.toLowerCase().includes(q);
      const matchJob = o.jobTitle?.toLowerCase().includes(q) || o.role?.toLowerCase().includes(q);
      const matchComp = o.companyName?.toLowerCase().includes(q) || o.company?.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchJob && !matchComp) return false;
    }
    return true;
  });

  const getDocProgress = (docs = []) => {
    if (!docs || docs.length === 0) return { verified: 0, total: 0, text: 'Not requested' };
    const verified = docs.filter((d) => d.status === 'Verified').length;
    return {
      verified,
      total: docs.length,
      text: `${verified}/${docs.length} Verified`,
      isComplete: verified === docs.length
    };
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 2px 10px rgba(16, 27, 54, 0.03)',
        overflow: 'hidden'
      }}
    >
      {/* Search and Filters Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          backgroundColor: '#F8FAFC'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px', maxWidth: '400px' }}>
          <div
            style={{
              position: 'relative',
              width: '100%'
            }}
          >
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94A3B8'
              }}
            />
            <input
              type="text"
              placeholder="Search candidate, job, offer ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '9px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                color: '#101B36'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#334155',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Viewed">Viewed</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
            <option value="Expired">Expired</option>
          </select>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#334155',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {companies.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Companies' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Body */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '950px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1.5px solid #E2E8F0' }}>
              <th style={{ padding: '12px 18px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>CANDIDATE</th>
              <th style={{ padding: '12px 18px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>JOB & COMPANY</th>
              <th style={{ padding: '12px 18px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>OFFER ID</th>
              <th style={{ padding: '12px 18px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>SALARY / CTC</th>
              <th style={{ padding: '12px 18px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>JOINING DATE</th>
              <th style={{ padding: '12px 18px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>STATUS</th>
              <th style={{ padding: '12px 18px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>DOCUMENTS</th>
              <th style={{ padding: '12px 18px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>JOINING</th>
              <th style={{ padding: '12px 18px', fontSize: '12px', fontWeight: 700, color: '#475569', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                  No offers match your current filters.
                </td>
              </tr>
            ) : (
              filtered.map((offer) => {
                const docProg = getDocProgress(offer.documentsRequired);
                const candidateName = offer.candidateName || offer.studentName;
                const companyName = offer.companyName || offer.company;
                const jobTitle = offer.jobTitle || offer.role;
                const ctc = offer.compensation?.totalCTC || `₹${offer.packageLpa || '9.0'} LPA`;

                const detailUrl =
                  role === 'recruiter'
                    ? `/recruiter/offers/${offer.id}`
                    : `/officer/offers/${offer.id}`;

                return (
                  <tr
                    key={offer.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Candidate */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            backgroundColor: '#3978F6',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '12.5px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {candidateName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36' }}>
                            {candidateName}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                            {offer.candidateDepartment || 'Computer Science'} • CGPA {offer.candidateCgpa || 8.5}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Job & Company */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                        {jobTitle}
                      </div>
                      <div style={{ fontSize: '12px', color: '#3978F6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Building2 size={12} />
                        <span>{companyName}</span>
                      </div>
                    </td>

                    {/* Offer ID */}
                    <td style={{ padding: '14px 18px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          backgroundColor: '#F1F5F9',
                          color: '#334155',
                          padding: '3px 7px',
                          borderRadius: '6px',
                          fontFamily: 'monospace'
                        }}
                      >
                        {offer.id}
                      </span>
                    </td>

                    {/* Salary / CTC */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#047857' }}>
                        {ctc}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        {offer.workMode || 'Hybrid'}
                      </div>
                    </td>

                    {/* Joining Date */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#101B36' }}>
                        {offer.joiningDate || '1 Dec 2026'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                        Offered: {offer.offerDate || '15 Oct'}
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px 18px' }}>
                      <OfferStatusBadge status={offer.status} />
                    </td>

                    {/* Documents */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: docProg.isComplete ? '#059669' : '#475569' }}>
                        {docProg.text}
                      </div>
                      {docProg.total > 0 && (
                        <div
                          style={{
                            width: '80px',
                            height: '5px',
                            backgroundColor: '#E2E8F0',
                            borderRadius: '3px',
                            marginTop: '4px',
                            overflow: 'hidden'
                          }}
                        >
                          <div
                            style={{
                              width: `${(docProg.verified / docProg.total) * 100}%`,
                              height: '100%',
                              backgroundColor: docProg.isComplete ? '#10B981' : '#3978F6'
                            }}
                          />
                        </div>
                      )}
                    </td>

                    {/* Joining Status */}
                    <td style={{ padding: '14px 18px' }}>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor:
                            offer.joining?.status === 'Confirmed'
                              ? '#ECFDF5'
                              : offer.joining?.status === 'Joined'
                              ? '#F0FDF4'
                              : '#F8FAFC',
                          color:
                            offer.joining?.status === 'Confirmed'
                              ? '#065F46'
                              : offer.joining?.status === 'Joined'
                              ? '#15803D'
                              : '#64748B'
                        }}
                      >
                        {offer.joining?.status || 'Scheduled'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => navigate(detailUrl)}
                          title="View Offer Details"
                          style={{
                            padding: '6px 10px',
                            borderRadius: '7px',
                            border: '1px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            color: '#1E293B',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>

                        {offer.status === 'Draft' && onSendOffer && (
                          <button
                            onClick={() => onSendOffer(offer.id)}
                            title="Send Offer to Candidate"
                            style={{
                              padding: '6px 10px',
                              borderRadius: '7px',
                              border: 'none',
                              backgroundColor: '#3978F6',
                              color: '#FFFFFF',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Send size={13} />
                            <span>Send</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
