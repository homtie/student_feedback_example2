import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';

interface FeedbackModalProps {
  course?: Course | null;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ course, onClose }) => {
  const { courses, currentUser, submitFeedback, saveFeedbackDraft, showToast } = useApp();

  // If no course passed, use first available
  const activeCourse = course || courses.find((c) => c.status === 'pending') || courses[0];

  const [step, setStep] = useState<number>(2); // Start at Step 2 to match Image 9 or let user navigate 1..4

  // Form states
  const [teachingQuality, setTeachingQuality] = useState<number>(activeCourse.draftRating || 5);
  const [hoverTeaching, setHoverTeaching] = useState<number>(0);

  const [courseClarity, setCourseClarity] = useState<number>(4);
  const [hoverClarity, setHoverClarity] = useState<number>(0);

  const [engagement, setEngagement] = useState<number>(4);
  const [hoverEngagement, setHoverEngagement] = useState<number>(0);

  const [workloadRating, setWorkloadRating] = useState<number>(4);
  const [materialsRating, setMaterialsRating] = useState<number>(5);
  const [fairnessRating, setFairnessRating] = useState<number>(5);

  const [writtenFeedback, setWrittenFeedback] = useState<string>(
    activeCourse.draftComment || ''
  );
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([
    'Clear Explanations',
    'Interactive Labs'
  ]);
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
  const [studyHours, setStudyHours] = useState<string>('3-6 hours');

  const strengthOptions = [
    'Clear Explanations',
    'Interactive Labs',
    'Helpful Office Hours',
    'Real-World Projects',
    'Engaging Discussions',
    'Constructive Feedback',
    'Great Visual Aids'
  ];

  const improvementOptions = [
    'More Q&A Time',
    'Pacing Adjustments',
    'More Practice Problems',
    'Earlier Assignment Feedback',
    'Recorded Lectures'
  ];

  const toggleStrength = (tag: string) => {
    setSelectedStrengths((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleImprovement = (tag: string) => {
    setSelectedImprovements((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSaveDraft = () => {
    if (activeCourse) {
      saveFeedbackDraft(activeCourse.id, teachingQuality, writtenFeedback);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Final Submit
      const overallAvg = Math.round(
        (teachingQuality + courseClarity + engagement + materialsRating + fairnessRating) / 5
      );

      submitFeedback({
        courseId: activeCourse.id,
        courseCode: activeCourse.code,
        courseName: activeCourse.name,
        instructorId: activeCourse.instructorId,
        instructorName: activeCourse.instructorName,
        studentId: currentUser.id,
        studentName: isAnonymous ? 'Anonymous Student' : currentUser.name,
        studentAvatar: isAnonymous
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIypy6qMGdysCrxY5Zgm79C_txvkyBYmz8mDiW-QUkIlQeJuefpSmtMnMSWBE2KODTBJYkAD5gY77-4_ZVR0H8PNKdvTq_8jUEjD20pQtSCQUuyuDjfqtO83x0to5bDO3UdfcOTLBCxWn4gbZOE4jKT2H_tl2kZMOOoGFBr0NDe28BzL3TjYWP9h3o4BYzbfZOnOyjCmRduHJYt_6VKuGeEGRK5R1d7FsGI7Tt1bJrZ5tAPu__HL2I'
          : currentUser.avatar,
        isAnonymous,
        overallRating: overallAvg,
        teachingQuality,
        courseClarity,
        engagement,
        materialsResources: materialsRating,
        assignmentFairness: fairnessRating,
        comments: writtenFeedback || 'Great course structure, engaging delivery and solid assignments.',
        strengths: selectedStrengths,
        areasOfImprovement: selectedImprovements,
        semester: activeCourse.semester
      });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  // Step Title helper
  const getStepTitle = (s: number) => {
    switch (s) {
      case 1:
        return 'Overview & Course Pace';
      case 2:
        return 'Rating & Feedback';
      case 3:
        return 'Detailed Criteria & Highlights';
      case 4:
        return 'Review & Anonymity';
      default:
        return 'Feedback';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-150">
      <div className="w-full max-w-[760px] flex flex-col gap-5 my-auto">
        {/* Header & Progress */}
        <header className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Student Evaluation</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Course Feedback: {activeCourse.name}
            </h1>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium mt-0.5">
              <span className="material-symbols-outlined text-[16px] text-blue-400">person</span>
              Instructor: {activeCourse.instructorName} • {activeCourse.code}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        {/* Main Form Card */}
        <article className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 relative overflow-hidden">
          {/* Progress Bar Header */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">
                Step {step} of 4 • {getStepTitle(step)}
              </span>
              <span className="text-xs text-slate-400 font-mono font-medium">
                {Math.round((step / 4) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content Steps */}
          <div>
            {/* STEP 1: Course Overview & Expectations */}
            {step === 1 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <section className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-slate-900">Course Workload & Pacing</h3>
                  <p className="text-xs text-slate-500">
                    How balanced did you find the weekly workload and homework tempo for {activeCourse.code}?
                  </p>
                  <div className="flex gap-2 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setWorkloadRating(star)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <span
                          className={`material-symbols-outlined text-[30px] ${
                            star <= workloadRating ? 'fill-1 text-amber-400' : 'text-slate-200'
                          }`}
                        >
                          star
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-100" />

                <section className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-slate-900">Weekly Study Hours</h3>
                  <p className="text-xs text-slate-500">
                    Average time spent outside lecture on assignments, readings, and lab work.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    {['< 3 hours', '3-6 hours', '6-10 hours', '10+ hours'].map((hours) => (
                      <button
                        key={hours}
                        type="button"
                        onClick={() => setStudyHours(hours)}
                        className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                          studyHours === hours
                            ? 'bg-blue-50 text-blue-700 border-blue-300 font-bold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {hours}
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* STEP 2: Rating & Feedback */}
            {step === 2 && (
              <form className="flex flex-col gap-5 animate-in fade-in duration-200">
                {/* Rating Section 1: Teaching Quality */}
                <section className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-bold text-slate-900">Teaching Quality & Delivery</label>
                    <span className="text-xs font-bold text-amber-600">
                      {hoverTeaching || teachingQuality} / 5 Stars
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    How effectively did the instructor explain core concepts and answer inquiries?
                  </p>
                  <div className="flex gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled =
                        hoverTeaching > 0 ? star <= hoverTeaching : star <= teachingQuality;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverTeaching(star)}
                          onMouseLeave={() => setHoverTeaching(0)}
                          onClick={() => setTeachingQuality(star)}
                          className="p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group"
                        >
                          <span
                            className={`material-symbols-outlined text-[32px] transition-transform group-hover:scale-110 ${
                              isFilled ? 'fill-1 text-amber-400' : 'text-slate-200'
                            }`}
                          >
                            star
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Rating Section 2: Course Clarity */}
                <section className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-bold text-slate-900">Course Clarity & Structure</label>
                    <span className="text-xs font-bold text-amber-600">
                      {hoverClarity || courseClarity} / 5 Stars
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Were weekly milestones, syllabus requirements, and evaluation metrics well organized?
                  </p>
                  <div className="flex gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled =
                        hoverClarity > 0 ? star <= hoverClarity : star <= courseClarity;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverClarity(star)}
                          onMouseLeave={() => setHoverClarity(0)}
                          onClick={() => setCourseClarity(star)}
                          className="p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group"
                        >
                          <span
                            className={`material-symbols-outlined text-[32px] transition-transform group-hover:scale-110 ${
                              isFilled ? 'fill-1 text-amber-400' : 'text-slate-200'
                            }`}
                          >
                            star
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Rating Section 3: Engagement */}
                <section className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-bold text-slate-900">Student Engagement & Discussion</label>
                    <span className="text-xs font-bold text-amber-600">
                      {hoverEngagement || engagement} / 5 Stars
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    How engaging and interactive were class workshops, coding sessions, and discussions?
                  </p>
                  <div className="flex gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled =
                        hoverEngagement > 0 ? star <= hoverEngagement : star <= engagement;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverEngagement(star)}
                          onMouseLeave={() => setHoverEngagement(0)}
                          onClick={() => setEngagement(star)}
                          className="p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group"
                        >
                          <span
                            className={`material-symbols-outlined text-[32px] transition-transform group-hover:scale-110 ${
                              isFilled ? 'fill-1 text-amber-400' : 'text-slate-200'
                            }`}
                          >
                            star
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Text Area */}
                <section className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="optional-feedback"
                      className="text-sm font-bold text-slate-900 flex items-center gap-2"
                    >
                      Written Feedback & Commentary
                    </label>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                      Optional
                    </span>
                  </div>
                  <textarea
                    id="optional-feedback"
                    rows={3}
                    value={writtenFeedback}
                    onChange={(e) => setWrittenFeedback(e.target.value)}
                    placeholder="Share any additional thoughts about your experience with this instructor..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none font-normal"
                  ></textarea>
                </section>
              </form>
            )}

            {/* STEP 3: Detailed Criteria & Tag Highlights */}
            {step === 3 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <section className="flex flex-col gap-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-900">Course Materials & Labs</label>
                    <p className="text-[11px] text-slate-500">Quality of lecture slides, repo code, and homework</p>
                    <div className="flex gap-1.5 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setMaterialsRating(star)}
                          className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
                        >
                          <span
                            className={`material-symbols-outlined text-[24px] ${
                              star <= materialsRating ? 'fill-1 text-amber-400' : 'text-slate-300'
                            }`}
                          >
                            star
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="flex flex-col gap-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-900">Assignment Fairness & Rubric</label>
                    <p className="text-[11px] text-slate-500">Clarity of grading criteria and timeliness of scores</p>
                    <div className="flex gap-1.5 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFairnessRating(star)}
                          className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
                        >
                          <span
                            className={`material-symbols-outlined text-[24px] ${
                              star <= fairnessRating ? 'fill-1 text-amber-400' : 'text-slate-300'
                            }`}
                          >
                            star
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Key Strengths */}
                <section className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Strengths (Select applicable)</label>
                  <div className="flex flex-wrap gap-2">
                    {strengthOptions.map((tag) => {
                      const active = selectedStrengths.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleStrength(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            active
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold shadow-xs'
                              : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Areas for Improvement */}
                <section className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Constructive Suggestions</label>
                  <div className="flex flex-wrap gap-2">
                    {improvementOptions.map((tag) => {
                      const active = selectedImprovements.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleImprovement(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            active
                              ? 'bg-blue-50 text-blue-700 border border-blue-300 font-bold shadow-xs'
                              : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            )}

            {/* STEP 4: Review & Anonymity Settings */}
            {step === 4 && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{activeCourse.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {activeCourse.code} • {activeCourse.instructorName}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-xs">
                      Overall: {Math.round((teachingQuality + courseClarity + engagement + materialsRating + fairnessRating) / 5)} / 5
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 border-y border-slate-200">
                    <div>
                      <span className="text-slate-400 text-[11px] block">Teaching</span>
                      <span className="font-bold text-slate-900">{teachingQuality} ★</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Clarity</span>
                      <span className="font-bold text-slate-900">{courseClarity} ★</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Engagement</span>
                      <span className="font-bold text-slate-900">{engagement} ★</span>
                    </div>
                  </div>

                  {writtenFeedback && (
                    <div className="text-xs text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200">
                      "{writtenFeedback}"
                    </div>
                  )}
                </div>

                {/* Privacy & Anonymity Setting */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <input
                    id="anonymous-toggle"
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-blue-600 rounded focus:ring-blue-600 cursor-pointer"
                  />
                  <label htmlFor="anonymous-toggle" className="text-xs cursor-pointer">
                    <span className="font-bold text-slate-900 block">Submit as Anonymous Student</span>
                    <span className="text-slate-600 block mt-0.5">
                      Your name and identity will remain strictly protected and aggregated into general faculty reporting.
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Navigation Buttons */}
        <nav className="flex justify-between items-center mt-1">
          <button
            id="modal-prev-btn"
            type="button"
            onClick={handlePrev}
            className="px-5 py-2.5 rounded-xl border border-white/20 text-white font-bold text-xs hover:bg-white/10 transition-all flex items-center gap-2 uppercase tracking-wider cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Previous
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="hidden sm:inline-flex px-4 py-2.5 text-xs font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Save Draft
            </button>

            <button
              id="modal-next-btn"
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center gap-2 uppercase tracking-wider cursor-pointer shadow-md"
            >
              {step === 4 ? 'Submit Evaluation' : 'Next Step'}
              <span className="material-symbols-outlined text-[16px]">
                {step === 4 ? 'check' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};
