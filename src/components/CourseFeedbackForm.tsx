import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';

interface CourseFeedbackFormProps {
  initialCourseId?: string;
  onSuccess?: () => void;
  isEmbedded?: boolean;
}

export const CourseFeedbackForm: React.FC<CourseFeedbackFormProps> = ({
  initialCourseId,
  onSuccess,
  isEmbedded = false
}) => {
  const {
    courses,
    students,
    activeStudentId,
    setActiveStudentId,
    submitFeedback,
    saveFeedbackDraft,
    showToast
  } = useApp();

  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId || '');
  const [overallRating, setOverallRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [teachingQuality, setTeachingQuality] = useState<number>(5);
  const [courseClarity, setCourseClarity] = useState<number>(5);
  const [engagement, setEngagement] = useState<number>(5);
  const [comments, setComments] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ course?: string; rating?: string; comments?: string }>({});
  const [touched, setTouched] = useState<{ course?: boolean; rating?: boolean; comments?: boolean }>({});
  const [showCriteriaDetail, setShowCriteriaDetail] = useState<boolean>(false);

  // Strength tag options
  const STRENGTH_TAGS = [
    'Clear Explanations',
    'Engaging Lectures',
    'Helpful Office Hours',
    'Practical Labs',
    'Constructive Feedback',
    'Well-Organized Material',
    'Real-World Case Studies',
    'Approachable Instructor'
  ];

  // Set default selected course if not provided
  useEffect(() => {
    if (!selectedCourseId && courses.length > 0) {
      const pendingCourse = courses.find((c) => c.status === 'pending');
      if (pendingCourse) {
        setSelectedCourseId(pendingCourse.id);
      } else {
        setSelectedCourseId(courses[0].id);
      }
    }
  }, [courses, selectedCourseId]);

  // If initialCourseId changes, update selection
  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
      const c = courses.find((x) => x.id === initialCourseId);
      if (c && c.draftRating) {
        setOverallRating(c.draftRating);
      }
      if (c && c.draftComment) {
        setComments(c.draftComment);
      }
    }
  }, [initialCourseId, courses]);

  const activeCourse = courses.find((c) => c.id === selectedCourseId);
  const currentStudent = students.find((s) => s.id === activeStudentId) || students[0];

  // Validation function
  const validateForm = () => {
    const newErrors: { course?: string; rating?: string; comments?: string } = {};

    if (!selectedCourseId) {
      newErrors.course = 'Please select a course to evaluate.';
    }

    if (overallRating < 1 || overallRating > 5) {
      newErrors.rating = 'Please provide a star rating from 1 to 5.';
    }

    if (!comments.trim()) {
      newErrors.comments = 'Feedback comments cannot be blank.';
    } else if (comments.trim().length < 10) {
      newErrors.comments = `Comments are too short (${comments.trim().length}/10 characters minimum).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRatingClick = (rate: number) => {
    setOverallRating(rate);
    setTouched((prev) => ({ ...prev, rating: true }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: undefined }));
    }
  };

  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setComments(val);
    if (touched.comments) {
      if (!val.trim()) {
        setErrors((prev) => ({ ...prev, comments: 'Feedback comments cannot be blank.' }));
      } else if (val.trim().length < 10) {
        setErrors((prev) => ({
          ...prev,
          comments: `Comments are too short (${val.trim().length}/10 characters min).`
        }));
      } else {
        setErrors((prev) => ({ ...prev, comments: undefined }));
      }
    }
  };

  const toggleStrength = (strength: string) => {
    if (selectedStrengths.includes(strength)) {
      setSelectedStrengths(selectedStrengths.filter((s) => s !== strength));
    } else {
      setSelectedStrengths([...selectedStrengths, strength]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ course: true, rating: true, comments: true });

    if (!validateForm()) {
      showToast('Validation Error', 'Please check the required fields before submitting.', 'error');
      return;
    }

    if (!activeCourse) return;

    submitFeedback({
      courseId: activeCourse.id,
      courseCode: activeCourse.code,
      courseName: activeCourse.name,
      instructorId: activeCourse.instructorId,
      instructorName: activeCourse.instructorName,
      studentId: currentStudent.id,
      studentName: isAnonymous ? 'Anonymous Student' : currentStudent.name,
      studentAvatar: currentStudent.avatar,
      isAnonymous,
      overallRating,
      teachingQuality,
      courseClarity,
      engagement,
      comments: comments.trim(),
      strengths: selectedStrengths,
      semester: activeCourse.semester || 'Fall 2023'
    });

    // Reset form state
    setOverallRating(0);
    setComments('');
    setSelectedStrengths([]);
    setErrors({});
    setTouched({});

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleSaveDraft = () => {
    if (!selectedCourseId) {
      showToast('Select a Course', 'Please choose a course to save a draft for.', 'error');
      return;
    }
    saveFeedbackDraft(selectedCourseId, overallRating, comments);
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5:
        return 'Exceptional (5.0)';
      case 4:
        return 'Very Good (4.0)';
      case 3:
        return 'Satisfactory (3.0)';
      case 2:
        return 'Needs Improvement (2.0)';
      case 1:
        return 'Unsatisfactory (1.0)';
      default:
        return 'Select a rating';
    }
  };

  return (
    <div
      id="course-feedback-form-container"
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${
        isEmbedded ? 'p-0 border-0 shadow-none' : 'p-6 sm:p-8'
      }`}
    >
      {/* Form Header */}
      {!isEmbedded && (
        <div className="mb-6 pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Student Evaluation
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                Course Feedback Form
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Submit Course Feedback
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Share your constructive perspective to improve teaching quality and curriculum clarity.
            </p>
          </div>

          {/* Student Selector Switcher */}
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5">Student:</span>
            <select
              value={activeStudentId}
              onChange={(e) => setActiveStudentId(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2.5 py-1 outline-none cursor-pointer"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.major.split('&')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Step 1: Course Selection */}
        <div>
          <label htmlFor="course-select" className="block text-xs font-bold text-slate-800 mb-1.5">
            Select Course <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              id="course-select"
              value={selectedCourseId}
              onChange={(e) => {
                setSelectedCourseId(e.target.value);
                setTouched((prev) => ({ ...prev, course: true }));
                setErrors((prev) => ({ ...prev, course: undefined }));
              }}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-slate-50 transition-all outline-none cursor-pointer appearance-none ${
                errors.course && touched.course
                  ? 'border-rose-400 bg-rose-50/50 text-slate-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-200 text-slate-800 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
              }`}
            >
              <option value="">-- Choose a course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name} ({course.instructorName}){' '}
                  {course.status === 'completed' ? '✓ (Reviewed)' : ''}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
              expand_more
            </span>
          </div>

          {errors.course && touched.course && (
            <p className="text-rose-600 text-[11px] font-medium mt-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">error</span>
              {errors.course}
            </p>
          )}

          {/* Active Course Banner Details */}
          {activeCourse && (
            <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-100 text-[10px]">
                  {activeCourse.code}
                </span>
                <span className="font-semibold text-slate-800">{activeCourse.name}</span>
              </div>
              <div className="text-slate-500 text-[11px] flex items-center gap-3">
                <span>Instructor: <strong className="text-slate-700">{activeCourse.instructorName}</strong></span>
                <span>•</span>
                <span>Dept: <strong className="text-slate-700">{activeCourse.department}</strong></span>
                <span>•</span>
                <span>{activeCourse.credits} Credits</span>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: 1-5 Star Interactive Rating */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Overall Course & Instructor Rating <span className="text-rose-500">*</span>
            </label>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                overallRating > 0
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'text-slate-400 bg-slate-100'
              }`}
            >
              {getRatingLabel(hoverRating || overallRating)}
            </span>
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
              errors.rating && touched.rating
                ? 'border-rose-400 bg-rose-50/30'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            {/* Star Buttons */}
            <div className="flex items-center gap-2" role="group" aria-label="Rating scale from 1 to 5 stars">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = (hoverRating || overallRating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    id={`rating-star-${star}`}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`${star} Star${star > 1 ? 's' : ''}`}
                    className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span
                      className={`material-symbols-outlined text-[32px] sm:text-[36px] transition-colors ${
                        isActive
                          ? 'fill-1 text-amber-400'
                          : 'text-slate-300 hover:text-amber-200'
                      }`}
                    >
                      star
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-slate-500 text-center sm:text-right">
              {overallRating > 0 ? (
                <span className="text-slate-700 font-semibold">
                  You selected <strong>{overallRating} / 5 stars</strong>
                </span>
              ) : (
                <span className="text-slate-400">Click a star (1 to 5) to rate</span>
              )}
            </div>
          </div>

          {errors.rating && touched.rating && (
            <p className="text-rose-600 text-[11px] font-medium mt-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">error</span>
              {errors.rating}
            </p>
          )}
        </div>

        {/* Detailed Criteria Breakdown (Collapsible / Expandable) */}
        <div>
          <button
            type="button"
            onClick={() => setShowCriteriaDetail(!showCriteriaDetail)}
            className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {showCriteriaDetail ? 'keyboard_arrow_up' : 'tune'}
            </span>
            {showCriteriaDetail ? 'Hide Detailed Rating Dimensions' : 'Refine Dimensional Ratings (Teaching, Clarity, Engagement)'}
          </button>

          {showCriteriaDetail && (
            <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-150">
              {/* Teaching Quality */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                  <span>Teaching Quality</span>
                  <span className="font-bold text-blue-600">{teachingQuality} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={teachingQuality}
                  onChange={(e) => setTeachingQuality(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Course Clarity */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                  <span>Course Clarity & Syllabus Structure</span>
                  <span className="font-bold text-emerald-600">{courseClarity} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={courseClarity}
                  onChange={(e) => setCourseClarity(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Engagement */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                  <span>Student Engagement & Discussion</span>
                  <span className="font-bold text-indigo-600">{engagement} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={engagement}
                  onChange={(e) => setEngagement(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Recognized Strengths (Optional Quick Tags) */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Recognized Strengths <span className="text-slate-400 font-normal">(Optional highlights)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {STRENGTH_TAGS.map((tag) => {
              const isSelected = selectedStrengths.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleStrength(tag)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-2xs font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Textual Feedback */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="feedback-comments" className="block text-xs font-bold text-slate-800">
              Written Course Feedback & Comments <span className="text-rose-500">*</span>
            </label>
            <span
              className={`text-[11px] font-semibold ${
                comments.trim().length >= 10 ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              {comments.trim().length} chars (10 min)
            </span>
          </div>

          <textarea
            id="feedback-comments"
            rows={4}
            value={comments}
            onChange={handleCommentsChange}
            onBlur={() => setTouched((prev) => ({ ...prev, comments: true }))}
            placeholder="Share specific insights on lecture delivery, pacing, assignments, office hours, or recommendations..."
            className={`w-full px-4 py-3 rounded-xl border text-xs text-slate-900 outline-none resize-none transition-all ${
              errors.comments && touched.comments
                ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
            }`}
          ></textarea>

          {errors.comments && touched.comments && (
            <p className="text-rose-600 text-[11px] font-medium mt-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">error</span>
              {errors.comments}
            </p>
          )}
        </div>

        {/* Step 4: Submission Settings & Anonymity */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              id="anonymous-checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
            />
            <span>Submit anonymously (Hide my student identity)</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="feedback-save-draft-btn"
              onClick={handleSaveDraft}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Save Draft
            </button>

            <button
              type="submit"
              id="feedback-submit-btn"
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              Submit Feedback
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
