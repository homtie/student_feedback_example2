import React from 'react';
import { FeedbackSubmission } from '../types';

interface FeedbackDetailModalProps {
  feedback: FeedbackSubmission | null;
  onClose: () => void;
}

export const FeedbackDetailModal: React.FC<FeedbackDetailModalProps> = ({ feedback, onClose }) => {
  if (!feedback) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 md:p-7 flex flex-col gap-5 relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Course & Author Header */}
        <div className="flex items-center gap-3.5 pr-8">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">school</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{feedback.courseName}</h3>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-mono font-bold">
                {feedback.courseCode}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Instructor: {feedback.instructorName} • {feedback.submissionDate}
            </p>
          </div>
        </div>

        {/* Rating Breakdown Grid */}
        <div className="bg-slate-50 rounded-xl p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center border border-slate-100">
          <div className="p-1.5">
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Overall</span>
            <div className="flex items-center justify-center gap-1 mt-0.5 text-amber-400">
              <span className="material-symbols-outlined fill-1 text-[16px]">star</span>
              <span className="font-extrabold text-sm text-slate-900">{feedback.overallRating} / 5</span>
            </div>
          </div>

          <div className="p-1.5">
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Teaching</span>
            <div className="flex items-center justify-center gap-1 mt-0.5 text-blue-600">
              <span className="material-symbols-outlined fill-1 text-[16px]">star</span>
              <span className="font-extrabold text-sm text-slate-900">{feedback.teachingQuality} / 5</span>
            </div>
          </div>

          <div className="p-1.5">
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Clarity</span>
            <div className="flex items-center justify-center gap-1 mt-0.5 text-emerald-600">
              <span className="material-symbols-outlined fill-1 text-[16px]">star</span>
              <span className="font-extrabold text-sm text-slate-900">{feedback.courseClarity} / 5</span>
            </div>
          </div>

          <div className="p-1.5">
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Engagement</span>
            <div className="flex items-center justify-center gap-1 mt-0.5 text-blue-600">
              <span className="material-symbols-outlined fill-1 text-[16px]">star</span>
              <span className="font-extrabold text-sm text-slate-900">{feedback.engagement} / 5</span>
            </div>
          </div>
        </div>

        {/* Written Review */}
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Student Feedback & Comments
          </h4>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed italic">
            "{feedback.comments}"
          </div>
        </div>

        {/* Strengths & Highlights */}
        {feedback.strengths && feedback.strengths.length > 0 && (
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Recognized Strengths
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {feedback.strengths.map((str, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100"
                >
                  ✓ {str}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Student metadata */}
        <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
              <img src={feedback.studentAvatar} alt="Student" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-slate-800">
              {feedback.isAnonymous ? 'Anonymous Student Submission' : feedback.studentName}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-[10px] uppercase tracking-wider">
            {feedback.status}
          </span>
        </div>
      </div>
    </div>
  );
};
