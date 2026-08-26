import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FeedbackSubmission } from '../types';

interface FacultyDashboardProps {
  onInspectFeedback?: (feedback: FeedbackSubmission) => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ onInspectFeedback }) => {
  const {
    facultyStats,
    feedbacks,
    selectedCourseFilter,
    setSelectedCourseFilter,
    activeSemester,
    setActiveSemester,
    setCurrentTab
  } = useApp();

  const [activeBarHover, setActiveBarHover] = useState<string | null>(null);

  // Filter feedback for cards
  const displayFeedbacks = feedbacks.slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title & Dropdown Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Faculty Intelligence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Fall 2023 - Spring 2024</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Faculty Analytics Hub</h1>
          <p className="text-xs md:text-sm text-slate-500">Real-time student sentiment, course evaluation scores & response analytics.</p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <select
            id="faculty-course-filter"
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3.5 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-2xs font-semibold cursor-pointer"
          >
            <option value="All Courses">All Courses (5)</option>
            <option value="MAT301">Advanced Calculus (MAT301)</option>
            <option value="PHY101">Intro to Physics (PHY101)</option>
            <option value="CS201">Computer Science Core (CS201)</option>
            <option value="CS-401">Advanced Algorithms (CS-401)</option>
            <option value="DS-205">UI/UX Design (DS-205)</option>
          </select>

          <select
            id="faculty-semester-filter"
            value={activeSemester}
            onChange={(e) => setActiveSemester(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3.5 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-2xs font-semibold cursor-pointer"
          >
            <option value="Fall 2023">Fall 2023</option>
            <option value="Spring 2024">Spring 2024</option>
            <option value="Summer 2023">Summer 2023</option>
          </select>

          <button
            onClick={() => setCurrentTab('analytics')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-3.5 py-2 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">monitoring</span>
            <span>Analytics Grid</span>
          </button>
        </div>
      </div>

      {/* Bento Metric Cards (3 Columns with Bento Grid styling) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Metric 1: Overall Average Rating (Primary Blue Featured Bento Card) */}
        <div className="md:col-span-4 bg-blue-600 text-white rounded-2xl p-6 shadow-sm border border-blue-700 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[11px] font-bold tracking-wider text-blue-100 uppercase">Overall Rating</span>
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <span className="material-symbols-outlined fill-1 text-[20px]">star</span>
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-black tracking-tight flex items-baseline gap-1">
              {facultyStats.overallAverageRating.toFixed(1)}
              <span className="text-lg font-bold text-blue-200">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-blue-100 font-medium">
              <span className="material-symbols-outlined text-[16px] text-emerald-300">verified</span>
              <span>Top 5% Faculty percentile this term</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Total Feedback Received */}
        <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Total Submissions</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <span className="material-symbols-outlined text-[20px]">forum</span>
            </div>
          </div>

          <div>
            <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {facultyStats.totalFeedback}
            </div>
            <p className="text-xs text-emerald-600 mt-3 flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +{facultyStats.trendPercentage}% from last semester
            </p>
          </div>
        </div>

        {/* Metric 3: Response Rate */}
        <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Engagement Rate</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </div>
          </div>

          <div>
            <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {facultyStats.responseRate}%
            </div>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              98/104 enrolled students participated
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Visualizations: Course-wise Performance & Rating Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Course-wise Performance Overview (8 cols Bento) */}
        <div className="md:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Comparative Analytics</span>
                <h3 className="text-base font-bold text-slate-900">Course-wise Performance Overview</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-600 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
                Max Scale 5.0
              </span>
            </div>

            {/* Interactive Bar Chart */}
            <div className="h-60 flex items-end justify-around gap-6 px-6 pb-6 border-b border-slate-100 relative">
              {/* Y Axis Guides */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-slate-400 text-[10px] font-mono pb-6 pointer-events-none">
                <span>5.0</span>
                <span>4.0</span>
                <span>3.0</span>
                <span>2.0</span>
                <span>1.0</span>
                <span>0.0</span>
              </div>

              {/* Bar 1: MAT301 */}
              <div
                className="w-16 md:w-20 bg-blue-600 hover:bg-blue-700 rounded-t-xl transition-all duration-200 relative group cursor-pointer"
                style={{ height: '92%' }}
                onMouseEnter={() => setActiveBarHover('MAT301: 4.6 / 5 (54 reviews • Calculus)')}
                onMouseLeave={() => setActiveBarHover(null)}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  4.6 / 5.0
                </div>
              </div>

              {/* Bar 2: PHY101 */}
              <div
                className="w-16 md:w-20 bg-slate-900 hover:bg-black rounded-t-xl transition-all duration-200 relative group cursor-pointer"
                style={{ height: '98%' }}
                onMouseEnter={() => setActiveBarHover('PHY101: 4.9 / 5 (62 reviews • Physics)')}
                onMouseLeave={() => setActiveBarHover(null)}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  4.9 / 5.0
                </div>
              </div>

              {/* Bar 3: CS201 */}
              <div
                className="w-16 md:w-20 bg-slate-300 hover:bg-slate-400 rounded-t-xl transition-all duration-200 relative group cursor-pointer"
                style={{ height: '86%' }}
                onMouseEnter={() => setActiveBarHover('CS201: 4.3 / 5 (40 reviews • Algorithms)')}
                onMouseLeave={() => setActiveBarHover(null)}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  4.3 / 5.0
                </div>
              </div>
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-around mt-3 text-xs font-bold text-slate-700">
              <span className="text-center w-20">MAT301</span>
              <span className="text-center w-20">PHY101</span>
              <span className="text-center w-20">CS201</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
            <span className="font-medium text-slate-600">{activeBarHover || 'Hover over course bars to inspect granular ratings'}</span>
            <span className="font-bold text-blue-600">Department Average: 4.6</span>
          </div>
        </div>

        {/* Right: Rating Distribution Donut Chart (4 cols Bento) */}
        <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sentiment Share</span>
              <h3 className="text-base font-bold text-slate-900">Rating Distribution</h3>
            </div>

            {/* Donut graphic */}
            <div className="relative w-full aspect-square max-h-44 flex items-center justify-center my-1">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="12"
                />
                {/* Segment 1: Excellent 65% (Blue-600) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#2563eb"
                  strokeWidth="12"
                  strokeDasharray={`${facultyStats.ratingDistribution.excellent5 * 2.387} 238.7`}
                  strokeDashoffset="0"
                  className="transition-all duration-700"
                />
                {/* Segment 2: Good 25% (Emerald-500) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeDasharray={`${facultyStats.ratingDistribution.good4 * 2.387} 238.7`}
                  strokeDashoffset={`-${facultyStats.ratingDistribution.excellent5 * 2.387}`}
                  className="transition-all duration-700"
                />
                {/* Segment 3: Average <4 10% (Amber-400) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="12"
                  strokeDasharray={`${facultyStats.ratingDistribution.averageBelow4 * 2.387} 238.7`}
                  strokeDashoffset={`-${(facultyStats.ratingDistribution.excellent5 + facultyStats.ratingDistribution.good4) * 2.387}`}
                  className="transition-all duration-700"
                />
              </svg>

              {/* Center stat in donut */}
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-2xl font-black text-slate-900">{facultyStats.totalFeedback}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Responses</span>
              </div>
            </div>

            {/* Legend with percentages */}
            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-slate-700 font-medium">Excellent (5 Stars)</span>
                </div>
                <span className="font-bold text-slate-900">{facultyStats.ratingDistribution.excellent5}%</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-700 font-medium">Good (4 Stars)</span>
                </div>
                <span className="font-bold text-slate-900">{facultyStats.ratingDistribution.good4}%</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="text-slate-700 font-medium">Moderate (&lt;4 Stars)</span>
                </div>
                <span className="font-bold text-slate-900">{facultyStats.ratingDistribution.averageBelow4}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Student Feedback Cards (Bento Stream) */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Stream</span>
            <h3 className="text-lg font-bold text-slate-900">Recent Student Reviews</h3>
          </div>
          <button
            id="view-all-feedback-btn"
            onClick={() => setCurrentTab('feedback-history')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Feedback</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayFeedbacks.map((fb, idx) => {
            return (
              <div
                key={fb.id || idx}
                onClick={() => onInspectFeedback && onInspectFeedback(fb)}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 card-hover flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    {/* Stars */}
                    <div className="flex text-blue-600 gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`material-symbols-outlined text-[16px] ${
                            star <= fb.overallRating ? 'fill-1 text-blue-600' : 'text-slate-200'
                          }`}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      {fb.courseCode}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed mb-5 font-normal">
                    "{fb.comments}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                    <img
                      src={fb.studentAvatar}
                      alt="Student Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="material-symbols-outlined text-[18px] text-slate-400 flex items-center justify-center h-full">
                      person
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">
                      {fb.isAnonymous ? 'Anonymous Student' : fb.studentName || 'Student'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {idx === 0 ? '2 days ago' : idx === 1 ? '5 days ago' : '1 week ago'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
