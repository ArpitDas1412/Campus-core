import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Eye,
  RotateCcw,
  Check,
  Save,
  Code2,
  Info
} from 'lucide-react';
import { renderTemplate } from '../../services/templateService';
import { DEMO_PREVIEW_DATA } from '../../data/communicationTemplates';

export default function TemplateEditor({
  isOpen,
  onClose,
  template,
  onSave,
  onRestoreDefault
}) {
  const [subject, setSubject] = useState(template?.subject || '');
  const [body, setBody] = useState(template?.body || '');
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' | 'preview'

  if (!isOpen || !template) return null;

  const insertVariable = (varName) => {
    setBody((prev) => `${prev} {{${varName}}}`);
  };

  const rendered = renderTemplate({ subject, body }, DEMO_PREVIEW_DATA);

  const handleSave = () => {
    onSave({
      ...template,
      subject,
      body
    });
    onClose();
  };

  const handleRestore = () => {
    if (confirm('Restore this template to the factory default? Custom edits will be overwritten.')) {
      onRestoreDefault(template.id);
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
    >
      <div
        style={{
          width: '100%',
          maxWidth: '740px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(16, 27, 54, 0.25)',
          border: '1.5px solid #E2E8F0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                {template.name}
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE'
                }}
              >
                {template.category}
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
              System Event: <code>{template.eventType}</code>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {template.isSystem && (
              <button
                type="button"
                onClick={handleRestore}
                style={{
                  background: 'none',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '11.5px',
                  color: '#64748B',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RotateCcw size={12} />
                <span>Restore Default</span>
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#64748B'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', padding: '8px 24px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('edit')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: activeTab === 'edit' ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
              backgroundColor: activeTab === 'edit' ? '#EFF6FF' : '#FFFFFF',
              color: activeTab === 'edit' ? '#2563EB' : '#64748B',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Code2 size={14} />
            <span>Editor & Variables</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: activeTab === 'preview' ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
              backgroundColor: activeTab === 'preview' ? '#EFF6FF' : '#FFFFFF',
              color: activeTab === 'preview' ? '#2563EB' : '#64748B',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Eye size={14} />
            <span>Live Rendered Preview</span>
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'edit' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Variable Insertion Pills */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                  Click to Insert Dynamic Variable:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {template.variables?.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => insertVariable(v)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#F1F5F9',
                        border: '1px solid #CBD5E1',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        color: '#0F172A',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title={`Insert {{${v}}}`}
                    >
                      <span>+ {`{{${v}}}`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                  Template Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    outline: 'none',
                    fontWeight: 600
                  }}
                />
              </div>

              {/* Body */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#101B36', marginBottom: '6px' }}>
                  Template Message Body
                </label>
                <textarea
                  rows={8}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: 'monospace',
                    lineHeight: 1.5
                  }}
                />
              </div>
            </div>
          ) : (
            /* Live Rendered Preview using Demo Candidate Rahul Kumar */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', fontSize: '12px', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={14} />
                <span>Showing live rendered preview using candidate data for <strong>Rahul Kumar (TechNova Solutions)</strong></span>
              </div>

              {/* Rendered Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1.5px solid #CBD5E1',
                  padding: '24px',
                  boxShadow: '0 4px 12px rgba(16, 27, 54, 0.05)'
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#101B36', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
                  {rendered.subject}
                </div>

                <div style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {rendered.body}
                </div>
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
            gap: '10px'
          }}
        >
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Save size={14} />
            <span>Save Template</span>
          </button>
        </div>
      </div>
    </div>
  );
}
