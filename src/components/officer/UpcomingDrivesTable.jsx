import React from 'react';
import {
  Calendar,
  ExternalLink,
  Users,
  Clock,
  ArrowRight,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function UpcomingDrivesTable({
  drives = [],
  onViewAllDrives,
  onSelectDrive
}) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.04)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#EEF4FF',
              color: '#3978F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Calendar size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Upcoming Placement Drives
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
              Scheduled campus hiring dates and candidate eligibility pools
            </p>
          </div>
        </div>

        {/* View All Drives Button */}
        <button
          onClick={onViewAllDrives}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#3978F6',
            backgroundColor: '#EEF4FF',
            padding: '7px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(57, 120, 246, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#3978F6';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#EEF4FF';
            e.currentTarget.style.color = '#3978F6';
          }}
        >
          <span>View All Drives</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Responsive Table Container */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
            textAlign: 'left'
          }}
        >
          <thead>
            <tr style={{ color: '#64748B', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '8px 14px' }}>Company</th>
              <th style={{ padding: '8px 14px' }}>Role</th>
              <th style={{ padding: '8px 14px' }}>Date</th>
              <th style={{ padding: '8px 14px' }}>Eligible Students</th>
              <th style={{ padding: '8px 14px' }}>Status</th>
              <th style={{ padding: '8px 14px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => {
              const isRegistrationOpen = drive.status === 'Registration Open';

              return (
                <tr
                  key={drive.id}
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    transition: 'all 0.15s ease'
                  }}
                  className="drive-row"
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#F1F5F9';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }}
                >
                  {/* Company Logo + Name */}
                  <td
                    style={{
                      padding: '14px',
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px',
                      border: '1px solid #E2E8F0',
                      borderRight: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          backgroundColor: drive.avatarBg || '#1E3A8A',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {drive.avatarText || drive.company.slice(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#101B36', fontSize: '14px' }}>
                          {drive.company}
                        </div>
                        {drive.fullCompany && drive.fullCompany !== drive.company && (
                          <div style={{ fontSize: '11px', color: '#64748B' }}>
                            {drive.fullCompany}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td
                    style={{
                      padding: '14px',
                      borderTop: '1px solid #E2E8F0',
                      borderBottom: '1px solid #E2E8F0',
                      color: '#334155',
                      fontWeight: 600,
                      fontSize: '13.5px'
                    }}
                  >
                    <div>{drive.role}</div>
                    {drive.ctc && (
                      <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>
                        {drive.ctc}
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td
                    style={{
                      padding: '14px',
                      borderTop: '1px solid #E2E8F0',
                      borderBottom: '1px solid #E2E8F0',
                      color: '#475569',
                      fontSize: '13px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={13} style={{ color: '#94A3B8' }} />
                      <strong style={{ color: '#101B36' }}>{drive.date}</strong>
                    </div>
                  </td>

                  {/* Eligible Students */}
                  <td
                    style={{
                      padding: '14px',
                      borderTop: '1px solid #E2E8F0',
                      borderBottom: '1px solid #E2E8F0',
                      color: '#101B36',
                      fontWeight: 700,
                      fontSize: '13.5px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={14} style={{ color: '#3978F6' }} />
                      <span>{drive.eligibleStudents} students</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td
                    style={{
                      padding: '14px',
                      borderTop: '1px solid #E2E8F0',
                      borderBottom: '1px solid #E2E8F0'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '999px',
                        backgroundColor: isRegistrationOpen ? '#ECFDF5' : '#EFF6FF',
                        color: isRegistrationOpen ? '#059669' : '#2563EB',
                        border: isRegistrationOpen
                          ? '1px solid #A7F3D0'
                          : '1px solid #BFDBFE',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {isRegistrationOpen && (
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#10B981'
                          }}
                        />
                      )}
                      <span>{drive.status}</span>
                    </span>
                  </td>

                  {/* Action */}
                  <td
                    style={{
                      padding: '14px',
                      borderTopRightRadius: '12px',
                      borderBottomRightRadius: '12px',
                      border: '1px solid #E2E8F0',
                      borderLeft: 'none',
                      textAlign: 'right'
                    }}
                  >
                    <button
                      onClick={() => onSelectDrive && onSelectDrive(drive)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#475569',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#3978F6';
                        e.currentTarget.style.color = '#3978F6';
                        e.currentTarget.style.backgroundColor = '#EEF4FF';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = '#CBD5E1';
                        e.currentTarget.style.color = '#475569';
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
