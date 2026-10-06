import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileCheck, CheckCircle2, Clock, AlertTriangle, ShieldCheck, 
  UploadCloud, ArrowRight, Eye, RefreshCw
} from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { documentService } from '../../services/documentService';
import { offerService } from '../../services/offerService';
import DocumentCard from '../../components/documents/DocumentCard';
import DocumentUploader from '../../components/documents/DocumentUploader';

export default function StudentDocumentsPage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [activeUploadDoc, setActiveUploadDoc] = useState(null);
  const [previewingDoc, setPreviewingDoc] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  // Student Rahul Kumar
  const candidateId = 'CL-2027-0042';

  const loadDocuments = () => {
    const studentDocs = documentService.getDocumentsByCandidate(candidateId);
    setDocuments(studentDocs || []);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleUploadSuccess = (fileData) => {
    if (!activeUploadDoc) return;
    documentService.submitDocument(
      activeUploadDoc.id,
      fileData.fileName,
      fileData.fileSize,
      'Rahul Kumar'
    );
    setActiveUploadDoc(null);
    loadDocuments();
    showToast(`${activeUploadDoc.type} submitted for verification.`);
  };

  const verifiedCount = documents.filter(d => d.status === 'Verified').length;
  const underReviewCount = documents.filter(d => d.status === 'Under Review' || d.status === 'Submitted').length;
  const requiredCount = documents.filter(d => d.required).length;
  const allVerified = verifiedCount > 0 && verifiedCount >= requiredCount;

  return (
    <DashboardLayout roleKey="student">
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* Toast */}
        {toastMsg && (
          <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 1000, backgroundColor: '#0F172A', color: '#FFFFFF', padding: '12px 18px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
            <CheckCircle2 size={16} color="#34D399" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Header */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1.5px solid #E2E8F0',
            padding: '24px 28px',
            marginBottom: '24px',
            boxShadow: '0 4px 16px rgba(16, 27, 54, 0.04)'
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, color: '#1D4ED8', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
                  Onboarding Checklist
                </span>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>• Layer 12 Verification</span>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                My Verification Documents
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
                Complete and track mandatory academic and identity credentials for your placement offers.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/student/offers"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: '#F8FAFC',
                  color: '#334155',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <span>My Offers</span>
              </Link>
              <Link
                to="/student/joining"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: '#3978F6',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <span>Go to Joining Tracker</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Verification Progress Banner */}
        <div
          style={{
            padding: '24px',
            borderRadius: '18px',
            border: allVerified ? '1.5px solid #A7F3D0' : '1.5px solid #E2E8F0',
            backgroundColor: allVerified ? '#ECFDF5' : '#FFFFFF',
            marginBottom: '24px',
            boxShadow: '0 2px 10px rgba(16, 27, 54, 0.04)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 9px', borderRadius: '6px', backgroundColor: allVerified ? '#D1FAE5' : '#EFF6FF', color: allVerified ? '#065F46' : '#1D4ED8', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                {allVerified ? 'Document Verification Complete ✓' : 'Verification In Progress'}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
                {verifiedCount} of {requiredCount} Mandatory Documents Verified
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
                {allVerified 
                  ? 'All placement credentials have been verified by the placement cell and company HR.'
                  : `${underReviewCount} document(s) currently under review by placement officers.`}
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ minWidth: '220px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                <span>Verification</span>
                <span>{Math.round((verifiedCount / (requiredCount || 1)) * 100)}%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#F1F5F9', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
                <div 
                  style={{
                    height: '100%',
                    borderRadius: '999px',
                    transition: 'all 0.5s ease',
                    backgroundColor: allVerified ? '#10B981' : '#3978F6',
                    width: `${Math.min(100, Math.round((verifiedCount / (requiredCount || 1)) * 100))}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Demo environment disclaimer */}
        <div style={{ padding: '14px 18px', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px', fontSize: '12px', color: '#92400E' }}>
          <ShieldCheck size={18} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, lineHeight: 1.4 }}>
            CampusCore demonstration mode. Document uploads and verification workflows are simulated. Avoid uploading sensitive personal records.
          </p>
        </div>

        {/* Documents Grid */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', fontWeight: 700, padding: '0 4px', marginBottom: '14px' }}>
            <span>CREDENTIAL VERIFICATION CHECKLIST</span>
            <span style={{ color: '#2563EB' }}>OFFER: TECHNOVA SOLUTIONS</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onUpload={(d) => setActiveUploadDoc(d)}
                onReplace={(d) => setActiveUploadDoc(d)}
                onResubmit={(d) => setActiveUploadDoc(d)}
                onView={(d) => setPreviewingDoc(d)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* UPLOADER MODAL */}
      {activeUploadDoc && (
        <DocumentUploader
          document={activeUploadDoc}
          onUploadSuccess={handleUploadSuccess}
          onClose={() => setActiveUploadDoc(null)}
        />
      )}

      {/* PREVIEW MODAL */}
      {previewingDoc && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', padding: '20px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', maxWidth: '480px', width: '100%', padding: '28px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101B36', marginBottom: '4px' }}>{previewingDoc.type}</h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '20px' }}>{previewingDoc.fileName || 'document_scan.pdf'}</p>
            <div style={{ border: '2px dashed #CBD5E1', borderRadius: '14px', padding: '32px 16px', backgroundColor: '#F8FAFC', marginBottom: '20px' }}>
              <Eye size={36} color="#3978F6" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontSize: '13.5px', fontWeight: 700, color: '#101B36', margin: 0 }}>Simulated Document Viewer</p>
              <p style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '4px' }}>CampusCore Verification Audit Passed ✓</p>
            </div>
            <button
              onClick={() => setPreviewingDoc(null)}
              style={{ padding: '8px 20px', fontSize: '13px', fontWeight: 600, color: '#475569', backgroundColor: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
