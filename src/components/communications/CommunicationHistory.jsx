import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  Eye,
  Calendar,
  AlertTriangle,
  Download
} from 'lucide-react';
import { getCommunicationHistory } from '../../services/communicationService';

export default function CommunicationHistory() {
  const [history, setHistory] = useState(getCommunicationHistory());
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = history.filter((h) => {
    if (typeFilter !== 'All' && !h.type.toLowerCase().includes(typeFilter.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSubj = (h.subject || '').toLowerCase().includes(q);
      const matchAud = (h.audience || '').toLowerCase().includes(q);
      const matchType = (h.type || '').toLowerCase().includes(q);
      return matchSubj || matchAud || matchType;
    }
    return true;
  });

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 4px 14px rgba(16, 27, 54, 0.04)'
      }}
    >
      {/* Header & Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
            Master Communication Dispatch History
          </h3>
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
            Immutable audit record of all automated placement notifications, announcements, and direct inquiries.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 30px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12.5px',
                outline: 'none'
              }}
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12.5px',
              outline: 'none',
              backgroundColor: '#FFFFFF'
            }}
          >
            <option value="All">All Events</option>
            <option value="Interview">Interviews</option>
            <option value="Announcement">Announcements</option>
            <option value="Shortlisted">Shortlists</option>
            <option value="Direct Message">Messages</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1.5px solid #E2E8F0', color: '#475569', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '12px 14px' }}>Date</th>
              <th style={{ padding: '12px 14px' }}>Type</th>
              <th style={{ padding: '12px 14px' }}>Subject Line</th>
              <th style={{ padding: '12px 14px' }}>Audience</th>
              <th style={{ padding: '12px 14px' }}>Channels</th>
              <th style={{ padding: '12px 14px' }}>Delivered</th>
              <th style={{ padding: '12px 14px' }}>Status</th>
              <th style={{ padding: '12px 14px' }}>Dispatched By</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '36px', textAlign: 'center', color: '#64748B' }}>
                  No communication records match your search criteria.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s ease' }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', color: '#64748B', fontWeight: 600 }}>
                    {item.date}
                  </td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor: item.type.includes('Rescheduled') ? '#FEE2E2' : '#EFF6FF',
                        color: item.type.includes('Rescheduled') ? '#EF4444' : '#2563EB'
                      }}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#101B36', maxWidth: '280px' }}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.subject}
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>
                    {item.audience}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#64748B', fontSize: '12px' }}>
                    {item.channel}
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#10B981' }}>
                    {item.recipients}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      <CheckCircle2 size={12} />
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#64748B', fontSize: '12px' }}>
                    {item.sentBy}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
