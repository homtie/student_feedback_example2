import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FeedbackSubmission } from '../types';

interface FeedbackManagementProps {
  onInspectFeedback?: (feedback: FeedbackSubmission) => void;
}

export const FeedbackManagement: React.FC<FeedbackManagementProps> = ({ onInspectFeedback }) => {
  const { feedbacks, deleteFeedback, sendReminders, exportCSV, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'pending' | 'completed'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const itemsPerPage = 5;

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((fb) => {
      const matchesSearch =
        fb.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fb.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fb.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (fb.comments || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All'
          ? true
          : statusFilter === 'completed'
          ? fb.status === 'completed'
          : fb.status === 'pending';

      return matchesSearch && matchesStatus;
    });
  }, [feedbacks, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage) || 1;
  const paginatedFeedbacks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFeedbacks.slice(start, start + itemsPerPage);
  }, [filteredFeedbacks, currentPage]);

  const handleRowClick = (fb: FeedbackSubmission) => {
    if (onInspectFeedback) {
      onInspectFeedback(fb);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title & Top Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrative Control</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Evaluation Central</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">Feedback Management</h2>
          <p className="text-xs md:text-sm text-slate-500 font-normal mt-0.5">Audit, export, and respond to anonymous student feedback across all campus departments.</p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            id="export-report-btn"
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export CSV
          </button>

          <button
            id="send-reminders-btn"
            onClick={sendReminders}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            Send Reminders
          </button>
        </div>
      </div>

      {/* Filters & Search Card */}
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5 flex flex-col md:flex-row gap-3 items-center border border-slate-200">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
            search
          </span>
          <input
            id="feedback-search-input"
            type="text"
            placeholder="Search courses, instructors, comments..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-xs text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => {
              setStatusFilter('All');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'All'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Submissions
          </button>

          <button
            onClick={() => {
              setStatusFilter('pending');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => {
              setStatusFilter('completed');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'completed'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Course Name</th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Instructor</th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Submission Date</th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs font-normal">
              {paginatedFeedbacks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No feedback records match your query.
                  </td>
                </tr>
              ) : (
                paginatedFeedbacks.map((fb) => (
                  <tr
                    key={fb.id}
                    onClick={() => handleRowClick(fb)}
                    className="border-b border-slate-100 hover:bg-slate-50/80 transition-all cursor-pointer group"
                  >
                    <td className="p-3.5 text-slate-900 font-semibold group-hover:text-blue-600 transition-colors">
                      <div className="truncate max-w-[200px]">{fb.courseName}</div>
                      <span className="text-[10px] font-mono text-slate-400">{fb.courseCode}</span>
                    </td>
                    <td className="p-3.5 text-slate-600 font-medium">{fb.instructorName}</td>
                    <td className="p-3.5 text-slate-500">{fb.submissionDate}</td>
                    <td className="p-3.5">
                      <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`material-symbols-outlined text-[15px] ${
                              star <= fb.overallRating ? 'fill-1 text-amber-400' : 'text-slate-200'
                            }`}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5">
                      {fb.status === 'completed' ? (
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] uppercase tracking-wider">
                          Completed
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px] uppercase tracking-wider">
                          Pending Review
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right relative" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-block relative">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === fb.id ? null : fb.id)}
                          className="text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
                          aria-label="Actions"
                        >
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>

                        {activeMenuId === fb.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-left">
                            <button
                              onClick={() => {
                                handleRowClick(fb);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[16px] text-slate-400">visibility</span>
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                showToast('Response Logged', `Acknowledged feedback for ${fb.courseCode}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[16px] text-emerald-600">check</span>
                              Acknowledge
                            </button>
                            <button
                              onClick={() => {
                                deleteFeedback(fb.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100 mt-1"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                              Delete Entry
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-3.5 border-t border-slate-200 flex justify-between items-center bg-slate-50">
          <span className="text-slate-500 text-xs font-medium">
            Showing{' '}
            {filteredFeedbacks.length === 0
              ? '0'
              : `${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(
                  currentPage * itemsPerPage,
                  filteredFeedbacks.length
                )}`}{' '}
            of {filteredFeedbacks.length} entries
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Previous page"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>

            <span className="text-xs font-bold text-slate-700 px-2">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Next page"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
