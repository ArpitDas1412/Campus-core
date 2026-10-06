import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  AlertTriangle,
  Users,
  Eye,
  Copy,
  Archive,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { PRIORITIES } from '../../data/communicationRules';

export default function AnnouncementList({
  announcements = [],
  onOpenCreate,
  onViewAnnouncement
}) {
  const [filterType, setFilterType] = useState('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const types = ['All', 'Interview', 'Schedule Change', 'Assessment', 'Placement Drive'];

  const filtered = announcements.filter((a) => {
    if (filterType !== 'All' && a.type !== filterType) return false;
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
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Campus Placement Announcements
            </h3>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '999px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE'
              }}
            >
              {announcements.length} Published
            </span>
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
            Official notices broadcasted to shortlisted candidate batches, departments, and recruiter panels.
          </p>
        </div>

        <button
          onClick={onOpenCreate}
          style={{
            padding: '9px 16px',
            borderRadius: '10px',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}
        >
          <Plus size={15} />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: filterType === t ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
              backgroundColor: filterType === t ? '#EFF6FF' : '#FFFFFF',
              color: filterType === t ? '#2563EB' : '#64748B',
              fontSize: '12px',
              fontWeight: filterType === t ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((ann) => {
          const isUrgent = ann.priority === PRIORITIES.URGENT;
          const readPercentage = Math.round((ann.readCount / (ann.audience.recipientCount || 1)) * 100);

          return (
            <div
              key={ann.id}
              style={{
                borderRadius: '14px',
                border: isUrgent ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
                backgroundColor: isUrgent ? '#FFF5F5' : '#FFFFFF',
                padding: '20px',
                boxShadow: isUrgent ? '0 4px 12px rgba(239, 68, 68, 0.08)' : '0 2px 6px rgba(16, 27, 54, 0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: isUrgent ? '#EF4444' : '#EFF6FF',
                      color: isUrgent ? '#FFFFFF' : '#2563EB',
                      textTransform: 'uppercase'
                    }}
                  >
                    {isUrgent ? '⚠ URGENT' : ann.type}
                  </span>

                  <span
                    style={{
                      fontSize: '11.5px',
                      color: '#64748B',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Users size={13} color="#2563EB" />
                    <span>{ann.audience.target} ({ann.audience.recipientCount} Recipients)</span>
                  </span>
                </div>

                <div style={{ fontSize: '11.5px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  <span>{new Date(ann.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Title & Body */}
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#101B36', margin: '0 0 8px' }}>
                {ann.title}
              </h4>

              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.55, margin: '0 0 16px' }}>
                {ann.content}
              </p>

              {/* Read Progress & Actions Footer */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '14px',
                  borderTop: isUrgent ? '1px solid #FECACA' : '1px solid #F1F5F9'
                }}
              >
                {/* Read Rate Metric */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '120px', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${readPercentage}%`, height: '100%', backgroundColor: '#10B981', borderRadius: '999px' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>
                    {readPercentage}% Read ({ann.readCount}/{ann.audience.recipientCount})
                  </span>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onViewAnnouncement && onViewAnnouncement(ann)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: '#101B36',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Eye size={13} />
                    <span>View Analytics</span>
                  </button>
                  <button
                    onClick={() => alert(`Announcement ${ann.id} duplicated into drafts.`)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: '#64748B',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                    title="Duplicate"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
