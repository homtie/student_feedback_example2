import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ReportsView: React.FC = () => {
  const { facultyStats, feedbacks, exportCSV, showToast } = useApp();
  const [reportPeriod, setReportPeriod] = useState('Fall 2023');

  const criteriaMetrics = [
    { name: 'Teaching Quality', score: 4.8, max: 5.0, color: 'bg-primary' },
    { name: 'Course Clarity', score: 4.6, max: 5.0, color: 'bg-tertiary' },
    { name: 'Student Engagement', score: 4.7, max: 5.0, color: 'bg-secondary' },
    { name: 'Materials & Labs', score: 4.9, max: 5.0, color: 'bg-primary' },
    { name: 'Fairness & Grading', score: 4.5, max: 5.0, color: 'bg-tertiary' }
  ];

  const topRecognitions = [
    { label: 'Clear Explanations', count: 48, percentage: 92 },
    { label: 'Visual Demonstrations', count: 41, percentage: 84 },
    { label: 'Constructive Feedback', count: 39, percentage: 78 },
    { label: 'Helpful Office Hours', count: 36, percentage: 72 },
    { label: 'Practical Industry Relevance', count: 30, percentage: 65 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quality Assurance</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Institutional Reports</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">Academic Reports & Insights</h2>
          <p className="text-xs md:text-sm text-slate-500 font-normal mt-0.5">
            Holistic quality assurance metrics, multi-dimensional ratings, and longitudinal trends.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3.5 py-2 outline-none shadow-xs cursor-pointer"
          >
            <option value="Fall 2023">Fall 2023 (Current)</option>
            <option value="Spring 2023">Spring 2023</option>
            <option value="Fall 2022">Fall 2022</option>
          </select>

          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Download CSV
          </button>
        </div>
      </div>

      {/* High-level metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 card-hover">
          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
            Overall Score
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {facultyStats.overallAverageRating.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
          </div>
          <span className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">trending_up</span> Top 5% Campus-wide
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 card-hover">
          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
            Participation Rate
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">92.4%</div>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            156 of 168 registered students
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 card-hover">
          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
            Net Sentiment
          </span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">+88</div>
          <span className="text-xs text-slate-500 font-medium mt-1 block">94% Positive Feedback</span>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 card-hover">
          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
            Department Rank
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1"># 1</div>
          <span className="text-xs text-slate-500 font-medium mt-1 block">Computer Science & Math</span>
        </div>
      </div>

      {/* Criteria Breakdown & Top Strengths */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Criteria Performance */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-4">Evaluation by Dimension</h3>
          <div className="space-y-4">
            {criteriaMetrics.map((crit) => (
              <div key={crit.name}>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="text-slate-700">{crit.name}</span>
                  <span className="text-blue-600 font-mono">{crit.score} / 5.0</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(crit.score / crit.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Key Strengths Recognized */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4">Top Student Highlights</h3>
            <div className="space-y-3">
              {topRecognitions.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-700 font-semibold">{item.label}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-[11px]">
                    {item.percentage}% of reviews
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => showToast('Full accreditation evaluation generated in PDF format')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Generate Full Accreditation Report →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
