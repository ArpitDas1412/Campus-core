import React, { useState } from 'react';
import {
  CheckSquare,
  Bell,
  CalendarPlus,
  Download,
  Star,
  X,
  CheckCircle2
} from 'lucide-react';

export default function StudentBulkActions({
  selectedCount,
  onClearSelection,
  onSendNotification,
  onAddToDrive,
  onExport,
  onMarkPriority,
  onAnalyzeSelected
}) {
  if (selectedCount === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        backgroundColor: '#101B36',
        color: '#FFFFFF',
        borderRadius: '14px',
        boxShadow: '0 10px 25px -5px rgba(16, 27, 54, 0.3)',
        marginBottom: '16px',
        gap: '12px'
      }}
      className="animate-scale-in"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            backgroundColor: '#3978F6',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 800
          }}
        >
          {selectedCount}
        </div>
        <span style={{ fontSize: '13.5px', fontWeight: 700 }}>
          {selectedCount} student{selectedCount > 1 ? 's' : ''} selected
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={onAnalyzeSelected}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '8px',
            backgroundColor: '#3978F6',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3978F6')}
        >
          <span>✦ Analyze Selected Students</span>
        </button>

        <button
          onClick={onSendNotification}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
        >
          <Bell size={14} />
          <span>Send Notification</span>
        </button>

        <button
          onClick={onAddToDrive}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
        >
          <CalendarPlus size={14} />
          <span>Add to Drive</span>
        </button>

        <button
          onClick={onMarkPriority}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
        >
          <Star size={14} />
          <span>Mark Priority</span>
        </button>

        <button
          onClick={onExport}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '8px',
            backgroundColor: '#3978F6',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(57, 120, 246, 0.4)'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2762DC')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3978F6')}
        >
          <Download size={14} />
          <span>Export Cohort</span>
        </button>

        <button
          onClick={onClearSelection}
          title="Deselect all"
          style={{
            padding: '6px',
            color: '#94A3B8',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
