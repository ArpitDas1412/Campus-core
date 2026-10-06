import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { UserCheck, ArrowRight, ShieldAlert } from 'lucide-react';
import { STUDENT_READINESS_DATA } from '../../data/analytics';

export default function StudentReadinessCard({ onAnalyzeReadiness }) {
  const total = STUDENT_READINESS_DATA.reduce((acc, curr) => acc + curr.count, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <div style={{ fontWeight: 800, color: data.color, marginBottom: '3px' }}>
            {data.status}
          </div>
          <div>{data.count} Students ({data.percentage}%)</div>
          <div style={{ fontSize: '10.5px', color: '#CBD5E1', marginTop: '3px' }}>
            {data.description}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 4px 20px -2px rgba(16, 27, 54, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#ECFDF5',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <UserCheck size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Student Readiness
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0' }}>
              ATS score & mock interview readiness breakdown
            </p>
          </div>
        </div>

        <button
          onClick={onAnalyzeReadiness}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12.5px',
            fontWeight: 700,
            color: '#3978F6',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          <span>Analyze Readiness</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Donut Chart with Center Metric */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={STUDENT_READINESS_DATA}
              innerRadius={55}
              outerRadius={78}
              paddingAngle={3}
              dataKey="count"
              stroke="#FFFFFF"
              strokeWidth={2}
            >
              {STUDENT_READINESS_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#101B36', lineHeight: 1 }}>
            {total}
          </div>
          <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px', fontWeight: 600 }}>
            Students
          </div>
        </div>
      </div>

      {/* 4 Segment Breakdown Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
        {STUDENT_READINESS_DATA.map((item) => (
          <div
            key={item.status}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              fontSize: '12.5px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '3px',
                  backgroundColor: item.color
                }}
              />
              <span style={{ color: '#334155', fontWeight: 600 }}>{item.status}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ color: '#101B36' }}>{item.count} students</strong>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                ({item.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
