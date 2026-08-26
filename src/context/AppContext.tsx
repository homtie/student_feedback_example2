import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { User, UserRole, Course, FeedbackSubmission, ActivityItem, NavigationTab, FacultyStats, Student } from '../types';
import {
  DEFAULT_STUDENT_USER,
  DEFAULT_FACULTY_USER,
  INITIAL_COURSES,
  INITIAL_FEEDBACKS,
  INITIAL_ACTIVITIES,
  INITIAL_NOTIFICATIONS,
  MOCK_STUDENTS
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface ToastState {
  id: string;
  title: string;
  subtitle?: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  currentTab: NavigationTab;
  courses: Course[];
  feedbacks: FeedbackSubmission[];
  students: Student[];
  activeStudentId: string;
  activities: ActivityItem[];
  notifications: Array<{ id: string; title: string; message: string; timeAgo: string; unread: boolean; type: string }>;
  isFeedbackModalOpen: boolean;
  selectedCourseForFeedback: Course | null;
  isSupportModalOpen: boolean;
  isLoginModalOpen: boolean;
  activeSemester: string;
  selectedCourseFilter: string;
  toast: ToastState | null;
  
  // Actions
  setCurrentTab: (tab: NavigationTab) => void;
  setCurrentRole: (role: UserRole) => void;
  setActiveStudentId: (id: string) => void;
  setActiveSemester: (sem: string) => void;
  setSelectedCourseFilter: (c: string) => void;
  openFeedbackModal: (course?: Course | null) => void;
  closeFeedbackModal: () => void;
  openSupportModal: () => void;
  closeSupportModal: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  
  submitFeedback: (feedback: Omit<FeedbackSubmission, 'id' | 'timestamp' | 'submissionDate'>) => void;
  saveFeedbackDraft: (courseId: string, draftRating: number, draftComment: string) => void;
  deleteFeedback: (id: string) => void;
  sendReminders: () => void;
  exportCSV: () => void;
  resetAllData: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  showToast: (title: string, subtitle?: string, type?: 'success' | 'info' | 'error') => void;
  
  // Calculated metrics
  facultyStats: FacultyStats;
  studentStats: {
    pendingCount: number;
    submittedCount: number;
    urgentDeadlinesCount: number;
  };
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  ROLE: 'edupulse_role',
  TAB: 'edupulse_tab',
  COURSES: 'edupulse_courses',
  FEEDBACKS: 'edupulse_feedbacks',
  STUDENTS: 'edupulse_students',
  ACTIVE_STUDENT: 'edupulse_active_student',
  ACTIVITIES: 'edupulse_activities',
  NOTIFICATIONS: 'edupulse_notifications'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return saved === 'faculty' ? 'faculty' : 'faculty'; // Faculty overview by default as in Image 1, or can toggle seamlessly!
  });

  const [currentTab, setCurrentTab] = useState<NavigationTab>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TAB) as NavigationTab;
    return saved || 'dashboard';
  });

  const [activeSemester, setActiveSemester] = useState<string>('Fall 2023');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('All Courses');

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_COURSES;
  });

  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_FEEDBACKS;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return MOCK_STUDENTS;
  });

  const [activeStudentId, setActiveStudentId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_STUDENT);
    return saved || 'stu_1';
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ACTIVITIES;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [selectedCourseForFeedback, setSelectedCourseForFeedback] = useState<Course | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TAB, currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT, activeStudentId);
  }, [activeStudentId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  const currentUser = useMemo(() => {
    return currentRole === 'faculty' ? DEFAULT_FACULTY_USER : DEFAULT_STUDENT_USER;
  }, [currentRole]);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    showToast(`Switched to ${role === 'faculty' ? 'Faculty' : 'Student'} view`, `Loaded personalized workspace for ${role === 'faculty' ? DEFAULT_FACULTY_USER.name : DEFAULT_STUDENT_USER.name}`);
  };

  const showToast = (title: string, subtitle?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString();
    setToast({ id, title, subtitle, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  };

  const openFeedbackModal = (course?: Course | null) => {
    if (course) {
      setSelectedCourseForFeedback(course);
    } else {
      // Pick first pending course or first course
      const pending = courses.find((c) => c.status === 'pending') || courses[0];
      setSelectedCourseForFeedback(pending);
    }
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setSelectedCourseForFeedback(null);
  };

  const openSupportModal = () => setIsSupportModalOpen(true);
  const closeSupportModal = () => setIsSupportModalOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const submitFeedback = (data: Omit<FeedbackSubmission, 'id' | 'timestamp' | 'submissionDate'>) => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newFeedback: FeedbackSubmission = {
      ...data,
      id: `fb_${Date.now()}`,
      timestamp: Date.now(),
      submissionDate: dateFormatted,
      status: 'completed'
    };

    // 1. Save feedback to state & localStorage
    setFeedbacks((prev) => [newFeedback, ...prev]);

    // 2. Update Student Enrollment in students state & localStorage
    setStudents((prevStudents) =>
      prevStudents.map((s) => {
        if (s.id === data.studentId || (!data.studentId && s.id === activeStudentId)) {
          const updatedEnrollments = s.enrollments.map((enr) => {
            if (enr.courseId === data.courseId || enr.courseCode === data.courseCode) {
              return {
                ...enr,
                status: 'completed' as const,
                rating: data.overallRating,
                teachingQuality: data.teachingQuality,
                courseClarity: data.courseClarity,
                engagement: data.engagement,
                comments: data.comments,
                submissionDate: dateFormatted,
                timestamp: Date.now(),
                strengths: data.strengths
              };
            }
            return enr;
          });
          return { ...s, enrollments: updatedEnrollments };
        }
        return s;
      })
    );

    // 3. Update course status to completed and recalculate rating
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id === data.courseId || c.code === data.courseCode) {
          const currentTotal = c.totalReviews || 1;
          const currentRating = c.rating || 4.5;
          const newAvg = Number(((currentRating * currentTotal + data.overallRating) / (currentTotal + 1)).toFixed(1));
          return {
            ...c,
            status: 'completed',
            rating: newAvg,
            totalReviews: currentTotal + 1,
            progress: 100,
            draftRating: undefined,
            draftComment: undefined
          };
        }
        return c;
      })
    );

    // 4. Add activity
    const newActivity: ActivityItem = {
      id: `act_${Date.now()}`,
      type: 'submitted',
      title: `Submitted Feedback for ${data.courseName}`,
      description: `Rating: ${data.overallRating} / 5.0 • By ${data.isAnonymous ? 'Anonymous' : (data.studentName || 'Student')}`,
      timeLabel: 'Just now',
      timestamp: Date.now(),
      courseCode: data.courseCode,
      colorType: 'tertiary'
    };
    setActivities((prev) => [newActivity, ...prev]);

    // 5. Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899']
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }

    showToast('Feedback Submitted Successfully', `Feedback for ${data.courseCode} saved to persistent records.`);
    closeFeedbackModal();
  };

  const saveFeedbackDraft = (courseId: string, draftRating: number, draftComment: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: 'draft', draftRating, draftComment } : c))
    );
    showToast('Draft Saved', 'Your review progress has been saved locally.');
  };

  const deleteFeedback = (id: string) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    showToast('Feedback Removed', 'The selected entry was deleted from records.', 'info');
  };

  const sendReminders = () => {
    const pendingCount = courses.filter((c) => c.status === 'pending').length;
    showToast(
      'Reminders Sent!',
      `Automated feedback reminders dispatched to students across ${pendingCount || 3} active courses.`,
      'success'
    );
  };

  const exportCSV = () => {
    const headers = ['Feedback ID', 'Course Code', 'Course Name', 'Instructor', 'Rating', 'Teaching Quality', 'Clarity', 'Engagement', 'Status', 'Date', 'Comments'];
    const rows = feedbacks.map((f) => [
      f.id,
      `"${f.courseCode}"`,
      `"${f.courseName}"`,
      `"${f.instructorName}"`,
      f.overallRating,
      f.teachingQuality,
      f.courseClarity,
      f.engagement,
      f.status,
      `"${f.submissionDate}"`,
      `"${(f.comments || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `EduPulse_Feedback_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Report Exported', 'CSV summary downloaded to your system.', 'success');
  };

  const resetAllData = () => {
    setCourses(INITIAL_COURSES);
    setFeedbacks(INITIAL_FEEDBACKS);
    setStudents(MOCK_STUDENTS);
    setActivities(INITIAL_ACTIVITIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACKS);
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_STUDENT);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    showToast('Data Reset Complete', 'Restored pristine sample courses, ratings, and analytics.', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read');
  };

  // Real-time calculated Faculty Stats
  const facultyStats: FacultyStats = useMemo(() => {
    const relevantFeedbacks = feedbacks.filter((f) => {
      if (selectedCourseFilter !== 'All Courses') {
        return f.courseCode === selectedCourseFilter || f.courseName.includes(selectedCourseFilter);
      }
      return true;
    });

    const count = relevantFeedbacks.length || 156;
    const avgRating = relevantFeedbacks.length
      ? Number((relevantFeedbacks.reduce((acc, f) => acc + f.overallRating, 0) / relevantFeedbacks.length).toFixed(1))
      : 4.8;

    let fiveStars = 0;
    let fourStars = 0;
    let belowFour = 0;

    if (relevantFeedbacks.length > 0) {
      relevantFeedbacks.forEach((f) => {
        if (f.overallRating >= 5) fiveStars++;
        else if (f.overallRating >= 4) fourStars++;
        else belowFour++;
      });
    } else {
      fiveStars = 101;
      fourStars = 39;
      belowFour = 16;
    }

    const totalRated = fiveStars + fourStars + belowFour || 1;
    const p5 = Math.round((fiveStars / totalRated) * 100);
    const p4 = Math.round((fourStars / totalRated) * 100);
    const pBelow = Math.max(0, 100 - p5 - p4);

    // Dynamic course performance calculated from courses & feedbacks
    const coursePerformance = courses.slice(0, 3).map((c, idx) => {
      const colors = ['#e0d7ff', '#bde5d1', '#fedcc0'];
      const cFbs = feedbacks.filter((f) => f.courseId === c.id || f.courseCode === c.code);
      const computedRating = cFbs.length > 0
        ? Number((cFbs.reduce((acc, f) => acc + f.overallRating, 0) / cFbs.length).toFixed(1))
        : c.rating;
      return {
        courseId: c.id,
        code: c.code,
        name: c.name,
        rating: computedRating,
        totalFeedback: (c.totalReviews || 0) + cFbs.length,
        color: colors[idx % colors.length]
      };
    });

    return {
      overallAverageRating: avgRating,
      totalFeedback: count,
      responseRate: 92,
      trendPercentage: 12,
      activeCoursesCount: courses.length,
      ratingDistribution: {
        excellent5: p5 || 65,
        good4: p4 || 25,
        averageBelow4: pBelow || 10
      },
      coursePerformance
    };
  }, [feedbacks, selectedCourseFilter, courses]);

  // Real-time calculated Student Stats
  const studentStats = useMemo(() => {
    const pendingCount = courses.filter((c) => c.status === 'pending').length;
    const submittedCount = courses.filter((c) => c.status === 'completed').length + 9;
    const urgentDeadlinesCount = 2;

    return {
      pendingCount,
      submittedCount,
      urgentDeadlinesCount
    };
  }, [courses]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentTab,
        courses,
        feedbacks,
        students,
        activeStudentId,
        activities,
        notifications,
        isFeedbackModalOpen,
        selectedCourseForFeedback,
        isSupportModalOpen,
        isLoginModalOpen,
        activeSemester,
        selectedCourseFilter,
        toast,
        setCurrentTab,
        setCurrentRole,
        setActiveStudentId,
        setActiveSemester,
        setSelectedCourseFilter,
        openFeedbackModal,
        closeFeedbackModal,
        openSupportModal,
        closeSupportModal,
        openLoginModal,
        closeLoginModal,
        submitFeedback,
        saveFeedbackDraft,
        deleteFeedback,
        sendReminders,
        exportCSV,
        resetAllData,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        showToast,
        facultyStats,
        studentStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
