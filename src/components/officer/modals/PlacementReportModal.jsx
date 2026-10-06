import React, { useState } from 'react';
import Modal from '../../common/Modal';
import {
  FileSpreadsheet,
  Download,
  Printer,
  CheckCircle2,
  Building,
  GraduationCap,
  Award,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PlacementReportModal({ isOpen, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Institutional Placement Summary Report"
      subtitle="Comprehensive NAAC/NIRF-ready placement audit for Academic Cycle 2026–27"
      maxWidth="680px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Top Header Card */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(57, 120, 246, 0.25)',
                color: '#38BDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>
                CampusCore Executive Audit Report
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                Generated on: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • Verified by Dr. Priya Sharma
              </div>
            </div>
          </div>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              backgroundColor: '#ECFDF5',
              color: '#059669',
              padding: '3px 8px',
              borderRadius: '6px'
            }}
          >
            OFFICIAL AUDIT
          </span>
        </div>

        {/* 6 Key Stat Summary Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}
        >
          <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Total Students</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', marginTop: '2px' }}>1,248</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '2px' }}>100% Registered</div>
          </div>

          <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Eligible Students</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#3978F6', marginTop: '2px' }}>1,120</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>89.7% of cohort</div>
          </div>

          <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Placed Students</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', marginTop: '2px' }}>981</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '2px' }}>Unique hires</div>
          </div>

          <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Placement Percentage</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#101B36', marginTop: '2px' }}>78.6%</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '2px' }}>Target: 75.0% (Met)</div>
          </div>

          <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Active Recruiters</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#8B5CF6', marginTop: '2px' }}>42</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>8 Fortune 500</div>
          </div>

          <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Offers Extended</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0E8EA8', marginTop: '2px' }}>386</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '2px' }}>Avg CTC: 11.4 LPA</div>
          </div>
        </div>

        {/* Department Breakdown Mini Table */}
        <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', fontWeight: 700, fontSize: '13px', color: '#101B36', borderBottom: '1px solid #E2E8F0' }}>
            Department Cohort Performance Breakdown
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ color: '#64748B', borderBottom: '1px solid #F1F5F9' }}>
                <th style={{ padding: '8px 14px', textAlign: 'left' }}>Branch</th>
                <th style={{ padding: '8px 14px', textAlign: 'left' }}>Registered</th>
                <th style={{ padding: '8px 14px', textAlign: 'left' }}>Placed</th>
                <th style={{ padding: '8px 14px', textAlign: 'right' }}>Placement %</th>
                <th style={{ padding: '8px 14px', textAlign: 'right' }}>Avg Package</th>
              </tr>
            </thead>
            <tbody>
              {[
                { branch: 'Computer Science', reg: 340, placed: 310, rate: '91%', ctc: '14.2 LPA' },
                { branch: 'Information Technology', reg: 220, placed: 191, rate: '87%', ctc: '12.6 LPA' },
                { branch: 'ECE', reg: 240, placed: 190, rate: '79%', ctc: '9.8 LPA' },
                { branch: 'EEE', reg: 160, placed: 114, rate: '71%', ctc: '8.4 LPA' },
                { branch: 'Mechanical', reg: 180, placed: 113, rate: '63%', ctc: '7.6 LPA' },
                { branch: 'Civil', reg: 108, placed: 60, rate: '56%', ctc: '6.8 LPA' }
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '8px 14px', fontWeight: 600, color: '#101B36' }}>{row.branch}</td>
                  <td style={{ padding: '8px 14px', color: '#475569' }}>{row.reg}</td>
                  <td style={{ padding: '8px 14px', color: '#475569' }}>{row.placed}</td>
                  <td style={{ padding: '8px 14px', textAlign: 'right', fontWeight: 700, color: '#059669' }}>{row.rate}</td>
                  <td style={{ padding: '8px 14px', textAlign: 'right', fontWeight: 600, color: '#101B36' }}>{row.ctc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '12.5px', fontWeight: 600 }}>
            <ShieldCheck size={16} />
            <span>Digital Cryptographic Audit Signature Verified</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              className="btn btn-secondary"
              style={{ padding: '9px 14px', borderRadius: '10px', fontSize: '13px' }}
            >
              <Printer size={15} />
              <span>Print View</span>
            </button>

            <button
              onClick={handleDownload}
              className="btn btn-primary"
              disabled={downloading}
              style={{ padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 700 }}
            >
              {downloading ? (
                <span>Generating PDF...</span>
              ) : downloadSuccess ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> Downloaded!
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Download size={15} /> Export Audit Report (PDF)
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
