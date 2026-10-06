import React, { useState } from 'react';
import {
  FileText,
  Edit3,
  Copy,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Briefcase,
  Search,
  Filter
} from 'lucide-react';
import { getAllTemplates, saveTemplate, duplicateTemplate, restoreDefaultTemplate } from '../../services/templateService';
import TemplateEditor from './TemplateEditor';

export default function TemplateManager() {
  const [templates, setTemplates] = useState(getAllTemplates());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTemplate, setEditingTemplate] = useState(null);

  const categories = ['All', 'Interviews', 'Shortlisting', 'Results', 'Reminders', 'Offers', 'Compliance'];

  const refreshTemplates = () => {
    setTemplates(getAllTemplates());
  };

  const handleEdit = (tpl) => {
    setEditingTemplate(tpl);
  };

  const handleDuplicate = (tplId) => {
    duplicateTemplate(tplId);
    refreshTemplates();
  };

  const handleRestore = (tplId) => {
    restoreDefaultTemplate(tplId);
    refreshTemplates();
  };

  const handleSave = (updated) => {
    saveTemplate(updated);
    refreshTemplates();
  };

  const filtered = templates.filter((t) => {
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = t.name.toLowerCase().includes(q);
      const matchSubj = (t.subject || '').toLowerCase().includes(q);
      const matchEvent = t.eventType.toLowerCase().includes(q);
      return matchName || matchSubj || matchEvent;
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
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Placement Notification & Message Templates
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
              {templates.length} System Templates
            </span>
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
            Standardized message formats with dynamic variable replacement for automated schedule alerts and announcements.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search templates..."
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
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: selectedCategory === cat ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
              backgroundColor: selectedCategory === cat ? '#EFF6FF' : '#FFFFFF',
              color: selectedCategory === cat ? '#2563EB' : '#64748B',
              fontSize: '12px',
              fontWeight: selectedCategory === cat ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px'
        }}
      >
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            style={{
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(16, 27, 54, 0.02)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#2563EB';
              e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(37, 99, 235, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(16, 27, 54, 0.02)';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#F1F5F9',
                    color: '#475569',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  {tpl.category}
                </span>

                <span style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace' }}>
                  {tpl.eventType}
                </span>
              </div>

              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', margin: '0 0 6px' }}>
                {tpl.name}
              </h4>

              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#2563EB',
                  backgroundColor: '#EFF6FF',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  marginBottom: '10px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                Subject: {tpl.subject}
              </div>

              <p
                style={{
                  fontSize: '12.5px',
                  color: '#64748B',
                  lineHeight: 1.5,
                  margin: '0 0 12px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {tpl.body}
              </p>

              {/* Supported Variables */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                {tpl.variables?.slice(0, 4).map((v) => (
                  <span
                    key={v}
                    style={{
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#F8FAFC',
                      color: '#64748B',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    {`{{${v}}}`}
                  </span>
                ))}
                {tpl.variables?.length > 4 && (
                  <span style={{ fontSize: '10px', color: '#94A3B8', alignSelf: 'center' }}>
                    +{tpl.variables.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>
                <CheckCircle2 size={13} />
                <span>Active</span>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => handleDuplicate(tpl.id)}
                  style={{
                    padding: '5px 8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#64748B',
                    fontSize: '11.5px',
                    cursor: 'pointer'
                  }}
                  title="Duplicate Template"
                >
                  <Copy size={13} />
                </button>

                <button
                  onClick={() => handleEdit(tpl)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit & Preview</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {editingTemplate && (
        <TemplateEditor
          isOpen={!!editingTemplate}
          template={editingTemplate}
          onClose={() => setEditingTemplate(null)}
          onSave={handleSave}
          onRestoreDefault={handleRestore}
        />
      )}
    </div>
  );
}
