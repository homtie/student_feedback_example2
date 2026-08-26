import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';

export const CoursesView: React.FC = () => {
  const { courses, openFeedbackModal, activeSemester, setActiveSemester } = useApp();
  const [filterDept, setFilterDept] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const departments = ['All', 'Computer Science', 'Mathematics', 'Physics', 'Design Sciences', 'Humanities'];

  const filteredCourses = courses.filter((c) => {
    const matchesDept = filterDept === 'All' || c.department === filterDept;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Directory</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Semester Course List</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">Enrolled Courses</h2>
          <p className="text-xs md:text-sm text-slate-500 font-normal mt-0.5">
            Manage your registered courses, view faculty instructors, and submit mandatory evaluations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={activeSemester}
            onChange={(e) => setActiveSemester(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3.5 py-2 outline-none shadow-xs cursor-pointer"
          >
            <option value="Fall 2023">Fall 2023</option>
            <option value="Spring 2024">Spring 2024</option>
          </select>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5 flex flex-col md:flex-row gap-3 items-center border border-slate-200">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search by course title, code, or professor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs text-slate-900 placeholder:text-slate-400 transition-all"
          />
        </div>

        <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterDept === dept
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const isCompleted = course.status === 'completed';
          const isDraft = course.status === 'draft';

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-5 shadow-sm card-hover border border-slate-200 flex flex-col justify-between"
            >
              <div>
                {/* Badge & Schedule */}
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    {course.code}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {course.credits} Credits
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{course.name}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {course.instructorName} • <span className="text-slate-400">{course.department}</span>
                </p>

                {/* Logistics */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[15px] text-slate-400">schedule</span>
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[15px] text-slate-400">room</span>
                    <span>{course.room}</span>
                  </div>
                </div>

                {/* Rating & Progress */}
                <div className="mt-4 bg-slate-50 rounded-xl p-3 flex justify-between items-center text-xs border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Average Rating</span>
                    <div className="flex items-center gap-1 font-bold text-slate-900 mt-0.5">
                      <span className="material-symbols-outlined text-[15px] text-amber-400 fill-1">star</span>
                      <span>{course.rating.toFixed(1)} / 5</span>
                      <span className="text-slate-400 font-normal text-[11px]">({course.totalReviews})</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Syllabus</span>
                    <span className="font-bold text-blue-600 mt-0.5 block">{course.progress}%</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3.5 border-t border-slate-100">
                {isCompleted ? (
                  <button
                    onClick={() => openFeedbackModal(course)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Submitted (Update)
                  </button>
                ) : isDraft ? (
                  <button
                    onClick={() => openFeedbackModal(course)}
                    className="w-full py-2.5 px-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Resume Draft Review
                  </button>
                ) : (
                  <button
                    onClick={() => openFeedbackModal(course)}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">rate_review</span>
                    Give Course Feedback
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
