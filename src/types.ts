export type UserRole = 'student' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  title?: string;
  semester?: string;
  studentId?: string;
}

export interface StudentEnrollment {
  courseId: string;
  courseCode: string;
  courseName: string;
  instructorName: string;
  credits: number;
  semester: string;
  status: 'completed' | 'pending' | 'draft';
  rating?: number; // 1 - 5
  teachingQuality?: number;
  courseClarity?: number;
  engagement?: number;
  comments?: string;
  submissionDate?: string;
  timestamp?: number;
  strengths?: string[];
  areasOfImprovement?: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  avatar: string;
  major: string;
  year: string;
  gpa: number;
  enrollments: StudentEnrollment[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar?: string;
  department: string;
  semester: string;
  progress: number; // 0 - 100 for student
  rating: number; // average rating e.g. 4.6
  totalReviews: number;
  status: 'pending' | 'completed' | 'draft';
  draftRating?: number;
  draftComment?: string;
  credits: number;
  colorTheme: 'primary' | 'tertiary' | 'secondary' | 'sky';
  schedule: string;
  room: string;
}

export interface FeedbackSubmission {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  instructorId: string;
  instructorName: string;
  studentId?: string;
  studentName?: string;
  studentAvatar?: string;
  isAnonymous: boolean;
  overallRating: number; // 1 - 5
  teachingQuality: number; // 1 - 5
  courseClarity: number; // 1 - 5
  engagement: number; // 1 - 5
  materialsResources?: number; // 1 - 5
  assignmentFairness?: number; // 1 - 5
  instructorAvailability?: number; // 1 - 5
  comments: string;
  submissionDate: string; // e.g. 'Oct 24, 2023'
  timestamp: number;
  status: 'completed' | 'pending';
  strengths?: string[];
  areasOfImprovement?: string[];
  semester: string;
}

export interface ActivityItem {
  id: string;
  type: 'submitted' | 'survey' | 'draft' | 'announcement';
  title: string;
  description?: string;
  timeLabel: string;
  timestamp: number;
  courseCode?: string;
  colorType: 'tertiary' | 'secondary' | 'primary' | 'neutral';
}

export interface FacultyStats {
  overallAverageRating: number;
  totalFeedback: number;
  responseRate: number;
  trendPercentage: number;
  activeCoursesCount: number;
  ratingDistribution: {
    excellent5: number; // percentage
    good4: number; // percentage
    averageBelow4: number; // percentage
  };
  coursePerformance: {
    courseId: string;
    code: string;
    name: string;
    rating: number;
    totalFeedback: number;
    color: string;
  }[];
}

export type NavigationTab =
  | 'dashboard'
  | 'courses'
  | 'feedback-form'
  | 'feedback-history'
  | 'analytics'
  | 'reports'
  | 'settings';

