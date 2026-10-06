import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { Building, Filter, ChevronDown, CheckCircle } from 'lucide-react';
import { DEPARTMENT_DATA } from '../../data/analytics';

export default function DepartmentPerformanceChart({ onSelectDepartment }) {
  const [filterDept, setFilterDept] = useState('All');

  // Filter department list based on selected filter
  const filteredData =
    filterDept === 'All'
      ? DEPARTMENT_DATA
      : DEPARTMENT_DATA.filter((d) => d.code === filterDept || d.name === filterDept);

  // Custom polished tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            padding: '12px 14px',
            borderRadius: '12px',
            boxShadow: '0 12px 28px rgba(10, 17, 35, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '12px',
            minWidth: '160px'
          }}
        >
          <div style={{ fontWeight: 800, color: '#38BDF8', fontSize: '13px', marginBottom: '6px' }}>
            {d.name}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: '#94A3B8' }}>Placement Rate:</span>
            <strong style={{ color: '#34D399' }}>{d.rate}%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: '#94A3B8' }}>Students Placed:</span>
            <strong style={{ color: '#FFFFFF' }}>{d.placed} / {d.total}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '4px' }}>
            <span style={{ color: '#94A3B8' }}>Average CTC:</span>
            <strong style={{ color: '#FCD34D' }}>{d.avgCtc}</strong>
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
      {/* Header with Title and Filter */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#EBF9FD',
                color: '#0E8EA8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Building size={18} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#101B36', margin: 0 }}>
              Department-wise Placement
            </h3>
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: '4px 0 0' }}>
            Comparative conversion ratios across major engineering disciplines
          </p>
        </div>

        {/* Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
            Filter:
          </span>
          <div style={{ position: 'relative' }}>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              aria-label="Filter by Department"
              style={{
                padding: '7px 32px 7px 12px',
                borderRadius: '10px',
                border: '1.5px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
                fontSize: '13px',
                fontWeight: 700,
                color: '#101B36',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none'
              }}
            >
              <option value="All">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
            <ChevronDown
              size={15}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Bar Chart */}
      <div style={{ width: '100%', height: '280px', flex: 1, minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={filteredData}
            margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: '#64748B', fontSize: 12 }}
              axisLine={{ stroke: '#E2E8F0' }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#101B36', fontSize: 12.5, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              width={140}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="rate"
              radius={[0, 8, 8, 0]}
              barSize={20}
              label={{
                position: 'right',
                formatter: (val) => `${val}%`,
                fill: '#101B36',
                fontSize: 12,
                fontWeight: 700
              }}
            >
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || '#3978F6'}
                  style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                  onClick={() => onSelectDepartment && onSelectDepartment(entry)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Summary Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid #F1F5F9',
          marginTop: '10px',
          fontSize: '12px',
          color: '#64748B'
        }}
      >
        <span>
          Leading: <strong style={{ color: '#3978F6' }}>Computer Science (91%)</strong>
        </span>
        <span>
          Intervention Recommended: <strong style={{ color: '#EF4444' }}>Civil (56%) & Mechanical (63%)</strong>
        </span>
      </div>
    </div>
  );
}
