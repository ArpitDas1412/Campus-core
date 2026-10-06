import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { TrendingUp, Calendar, ChevronDown, CheckCircle2 } from 'lucide-react';
import { PROGRESS_DATA } from '../../data/analytics';

export default function PlacementProgressChart() {
  const [selectedYear, setSelectedYear] = useState('2026–27');
  const chartData = PROGRESS_DATA[selectedYear] || PROGRESS_DATA['2026–27'];

  // Custom polished tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: '#101B36',
            color: '#FFFFFF',
            padding: '12px 16px',
            borderRadius: '12px',
            boxShadow: '0 12px 28px rgba(10, 17, 35, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '12.5px',
            minWidth: '170px'
          }}
        >
          <div style={{ fontWeight: 800, color: '#38BDF8', marginBottom: '6px', fontSize: '13.5px' }}>
            {label} ({selectedYear})
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', marginBottom: '4px' }}>
            <span style={{ color: '#94A3B8' }}>Placement Rate:</span>
            <strong style={{ color: '#34D399' }}>{dataPoint.rate}%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', marginBottom: '4px' }}>
            <span style={{ color: '#94A3B8' }}>Season Target:</span>
            <strong style={{ color: '#93C5FD' }}>{dataPoint.target}%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '4px' }}>
            <span style={{ color: '#94A3B8' }}>Offers Released:</span>
            <strong style={{ color: '#FCD34D' }}>{dataPoint.offers}</strong>
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
      {/* Header with Title and Year Selector */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
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
                backgroundColor: '#EEF4FF',
                color: '#3978F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TrendingUp size={18} />
            </div>
            <h3
              style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#101B36',
                margin: 0
              }}
            >
              Placement Progress
            </h3>
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: '4px 0 0' }}>
            Cumulative placement velocity by academic cycle month
          </p>
        </div>

        {/* Academic Year Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
            Academic Year:
          </span>
          <div style={{ position: 'relative' }}>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Select Academic Year"
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
              <option value="2026–27">2026–27 (Current)</option>
              <option value="2025–26">2025–26</option>
              <option value="2024–25">2024–25</option>
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

      {/* Main Chart Container */}
      <div style={{ width: '100%', height: '280px', flex: 1, minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="placementGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3978F6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3978F6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              tick={{ fill: '#64748B', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="rate"
              name="Placement Rate"
              stroke="#3978F6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#placementGradient)"
              activeDot={{ r: 6, fill: '#3978F6', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="target"
              name="Benchmark Target"
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Snapshot Metrics */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid #F1F5F9',
          marginTop: '12px',
          fontSize: '12.5px',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3978F6' }} />
            <span style={{ color: '#475569' }}>Actual Placement (Current: <strong>78.6%</strong>)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '2px', backgroundColor: '#10B981' }} />
            <span style={{ color: '#475569' }}>Institutional Target (<strong>75.0%</strong>)</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 600 }}>
          <CheckCircle2 size={15} />
          <span>Ahead of target by +3.6%</span>
        </div>
      </div>
    </div>
  );
}
