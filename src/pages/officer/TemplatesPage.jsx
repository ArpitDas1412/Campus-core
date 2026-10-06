import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/officer/Sidebar';
import Topbar from '../../components/officer/Topbar';
import TemplateManager from '../../components/communications/TemplateManager';
import TemplateEditor from '../../components/communications/TemplateEditor';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function TemplatesPage() {
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFD' }}>
      <Sidebar activeModule="communications" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Notification Templates"
          subtitle="Manage event-driven notification copy, variable bindings, and channel previews."
          badgeText="Layer 11 Live"
        />

        <main style={{ padding: '24px 32px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {toastMessage && (
            <div
              style={{
                position: 'fixed',
                top: '84px',
                right: '32px',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                padding: '12px 20px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
                fontSize: '13.5px',
                fontWeight: 700,
                zIndex: 1300,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              className="animate-fade-in"
            >
              <CheckCircle2 size={16} />
              <span>{toastMessage}</span>
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <Link
              to="/officer/communications"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#3978F6',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                marginBottom: '6px'
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Communication Center</span>
            </Link>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Placement Notification Templates
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '3px 0 0' }}>
              Dynamic copy templates for interview scheduling, rescheduling, cancellations, reminders, and offer releases.
            </p>
          </div>

          <TemplateManager onEditTemplate={(tpl) => setEditingTemplate(tpl)} />

          {editingTemplate && (
            <TemplateEditor
              template={editingTemplate}
              isOpen={!!editingTemplate}
              onClose={() => setEditingTemplate(null)}
              onSave={(updated) => {
                setEditingTemplate(null);
                showToast(`✓ Template "${updated.name}" updated successfully!`);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
