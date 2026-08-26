import React from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    activities,
    studentStats,
    openFeedbackModal,
    setCurrentTab
  } = useApp();

  const handleActionClick = (course: Course) => {
    openFeedbackModal(course);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Workspace</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Active Term 2024</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 max-w-2xl font-normal">
            Evaluate your courses, submit anonymous faculty reviews, and track real-time ratings.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentTab('feedback-form')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">rate_review</span>
            Course Feedback Form
          </button>

          <button
            onClick={() => setCurrentTab('analytics')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">insights</span>
            Live Analytics
          </button>
        </div>
      </section>

      {/* Summary Cards (Bento row) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Feedback Pending */}
        <div
          id="student-pending-card"
          onClick={() => setCurrentTab('courses')}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 card-hover relative overflow-hidden group cursor-pointer flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Pending Evaluations</span>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md text-[10px] font-bold uppercase tracking-wider">
              Action Required
            </span>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{studentStats.pendingCount}</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Courses waiting for your feedback</p>
          </div>
        </div>

        {/* Card 2: Feedback Submitted */}
        <div
          id="student-submitted-card"
          onClick={() => setCurrentTab('feedback-history')}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 card-hover relative overflow-hidden group cursor-pointer flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Completed Reviews</span>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md text-[10px] font-bold uppercase tracking-wider">
              Verified
            </span>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{studentStats.submittedCount}</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Submitted anonymously to faculty</p>
          </div>
        </div>

        {/* Card 3: Upcoming Deadlines */}
        <div
          id="student-deadlines-card"
          onClick={() => openFeedbackModal()}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 card-hover relative overflow-hidden group cursor-pointer flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Upcoming Cutoff</span>
            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[10px] font-bold uppercase tracking-wider">
              In 3 Days
            </span>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{studentStats.urgentDeadlinesCount}</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Midterm faculty survey closes soon</p>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Courses Requiring Feedback & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Courses Requiring Feedback) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Course Grid</span>
              <h2 className="text-lg font-bold text-slate-900">Courses Requiring Evaluation</h2>
            </div>
            <button
              onClick={() => setCurrentTab('courses')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Courses</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="flex flex-col gap-3.5">
            {/* Course 1: Advanced Algorithms */}
            {courses.find((c) => c.code === 'CS-401') && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 card-hover flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px]">code</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 truncate">Advanced Algorithms</h4>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        CS-401
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate mt-0.5">Prof. Eleanor Vance</p>
                  </div>
                </div>

                <div className="flex-1 w-full md:w-48">
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-500 text-[11px]">Syllabus Progress</span>
                    <span className="text-blue-600 font-bold text-[11px]">75%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                    <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <button
                  id="btn-feedback-cs401"
                  onClick={() => handleActionClick(courses.find((c) => c.code === 'CS-401')!)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer"
                >
                  Give Feedback
                </button>
              </div>
            )}

            {/* Course 2: UI/UX Design */}
            {courses.find((c) => c.code === 'DS-205') && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 card-hover flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px]">design_services</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 truncate">UI/UX Design</h4>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        DS-205
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate mt-0.5">Prof. Marcus Thorne</p>
                  </div>
                </div>

                <div className="flex-1 w-full md:w-48">
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-500 text-[11px]">Syllabus Progress</span>
                    <span className="text-emerald-600 font-bold text-[11px]">90%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <button
                  id="btn-feedback-ds205"
                  onClick={() => handleActionClick(courses.find((c) => c.code === 'DS-205')!)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer"
                >
                  Give Feedback
                </button>
              </div>
            )}

            {/* Course 3: Data Structures */}
            {courses.find((c) => c.code === 'CS-302') && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 card-hover flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px]">data_object</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 truncate">Data Structures</h4>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        CS-302
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate mt-0.5">Prof. Sarah Jenkins</p>
                  </div>
                </div>

                <div className="flex-1 w-full md:w-48">
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-500 text-[11px]">Syllabus Progress</span>
                    <span className="text-slate-700 font-bold text-[11px]">45%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                    <div className="bg-slate-500 h-2 rounded-full transition-all" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <button
                  id="btn-draft-cs302"
                  onClick={() => handleActionClick(courses.find((c) => c.code === 'CS-302')!)}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer"
                >
                  Start Draft
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Recent Activity Timeline) */}
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Activity Log</span>
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col gap-5">
            {activities.map((act, index) => {
              const isLast = index === activities.length - 1;

              const badgeStyles =
                act.colorType === 'tertiary'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : act.colorType === 'secondary'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-slate-100 text-slate-600 border border-slate-200';

              const iconName =
                act.type === 'submitted' ? 'check' : act.type === 'survey' ? 'campaign' : 'edit_note';

              return (
                <div key={act.id} className="flex gap-3.5 relative">
                  {!isLast && (
                    <div className="w-px bg-slate-200 absolute top-7 bottom-[-20px] left-[13px] z-0"></div>
                  )}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center relative z-10 flex-shrink-0 ${badgeStyles}`}
                  >
                    <span className="material-symbols-outlined text-[14px]">{iconName}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 leading-snug">
                      {act.title}
                    </p>
                    <span className="text-[11px] text-slate-400 font-normal mt-0.5 block">{act.timeLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
