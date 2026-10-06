import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, CheckCircle2, UserCheck, UserX, Clock, MapPin, 
  Search, Filter, Bell, Download, ChevronRight, AlertCircle, ShieldCheck
} from 'lucide-react';
import { joiningService } from '../../services/joiningService';
import JoiningTable from '../../components/joining/JoiningTable';
import JoiningUpdateModal from '../../components/joining/JoiningUpdateModal';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

export default function JoiningPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingRecord, setUpdatingRecord] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const loadData = () => {
    setRecords(joiningService.getJoiningRecords());
    setStats(joiningService.getJoiningStats());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleUpdateStatus = (recordId, newStatus, notes) => {
    joiningService.updateJoiningStatus(recordId, newStatus, 'Placement Officer', notes);
    loadData();
    showToast(`Onboarding status updated to "${newStatus}".`);
  };

  const handleSendReminder = (rec) => {
    joiningService.sendJoiningReminder(rec.id);
    showToast(`Onboarding reminder sent to ${rec.candidateName}.`);
  };

  const filteredRecords = records.filter((rec) => {
    if (statusFilter !== 'All' && rec.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        (rec.candidateName || '').toLowerCase().includes(q) ||
        (rec.companyName || '').toLowerCase().includes(q) ||
        (rec.jobTitle || '').toLowerCase().includes(q) ||
        (rec.location || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <DashboardLayout roleKey="officer">
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Toast */}
        {toastMsg && (
          <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 1000, backgroundColor: '#0F172A', color: '#FFFFFF', padding: '12px 18px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
            <CheckCircle2 size={16} color="#34D399" />
            <span>{toastMsg}</span>
          </div>
        )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Layer 12
                </span>
                <span className="text-xs font-semibold text-slate-500">Onboarding Operations</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Joining Tracker
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Track candidates from accepted offer to successful office reporting and onboarding.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-xl border border-blue-200">
                <ShieldCheck className="w-4 h-4" />
                <span>Automated Day 1 Protocols Active</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-6">
          <div 
            onClick={() => setStatusFilter('All')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'All' ? 'bg-blue-50/50 border-blue-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Offers Accepted</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{stats?.acceptedOffers || 29}</div>
            <span className="text-[10px] text-slate-400">Total Hires</span>
          </div>

          <div 
            onClick={() => setStatusFilter('Scheduled')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'Scheduled' ? 'bg-blue-50/50 border-blue-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Joining Sched.</span>
            <div className="text-xl font-bold text-blue-600 mt-1">{stats?.scheduled || 27}</div>
            <span className="text-[10px] text-slate-400">Slot Allocated</span>
          </div>

          <div 
            onClick={() => setStatusFilter('Confirmed')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'Confirmed' ? 'bg-emerald-50/50 border-emerald-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Joining Conf.</span>
            <div className="text-xl font-bold text-emerald-600 mt-1">{stats?.confirmed || 23}</div>
            <span className="text-[10px] text-emerald-600 font-semibold">Docs Cleared</span>
          </div>

          <div 
            onClick={() => setStatusFilter('Joined')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'Joined' ? 'bg-indigo-50/50 border-indigo-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Joined Office</span>
            <div className="text-xl font-bold text-indigo-600 mt-1">{stats?.joined || 18}</div>
            <span className="text-[10px] text-indigo-600 font-medium">Inducted</span>
          </div>

          <div 
            onClick={() => setStatusFilter('Not Scheduled')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'Not Scheduled' ? 'bg-amber-50/50 border-amber-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">Pending Conf.</span>
            <div className="text-xl font-bold text-amber-600 mt-1">{stats?.pendingConfirmation || 5}</div>
            <span className="text-[10px] text-amber-600 font-medium">Follow Up</span>
          </div>

          <div 
            onClick={() => setStatusFilter('No Show')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${statusFilter === 'No Show' ? 'bg-rose-50/50 border-rose-300' : 'bg-white border-slate-200'}`}
          >
            <span className="text-[11px] font-medium text-slate-500 block">No Show</span>
            <div className="text-xl font-bold text-rose-600 mt-1">{stats?.noShow || 1}</div>
            <span className="text-[10px] text-rose-600 font-medium">Logged</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate, role, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            {['All', 'Confirmed', 'Scheduled', 'Joined', 'Not Scheduled', 'No Show'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Joining Table */}
        <JoiningTable
          records={filteredRecords}
          onUpdateStatus={(rec) => setUpdatingRecord(rec)}
          onSendReminder={handleSendReminder}
          onViewRecord={(rec) => navigate(`/officer/offers/${rec.offerId}`)}
        />
      </div>

      {updatingRecord && (
        <JoiningUpdateModal
          record={updatingRecord}
          onUpdateSuccess={handleUpdateStatus}
          onClose={() => setUpdatingRecord(null)}
        />
      )}
      </div>
    </DashboardLayout>
  );
}
