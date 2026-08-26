import { Student } from '../types';

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'stu_1',
    name: 'Alex Vance',
    email: 'alex.vance@institution.edu',
    studentId: 'STU-2023-8942',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcSD5dBNsiqNfOF_-qN3NTnOcJl9TLtMn4KVC3KUBubO_r7yrueEWWyCeRnfKQcbs_A5Vs7K8RrQA78fHdCBwE24GJWrRPfelnQySAOyrnAYZAR8CwIav5IqGDQ-7gONdEjXdOEmmmGFflvlpKqSqlF-g3r-zkAwS0YP2motterNJylNem803yiCWG1AXrkBCMbjdTRNCxv9LE-aymc87U_g_oqwSMqF4KEKc2H89SpUgvtbN7-zgu',
    major: 'Computer Science & Engineering',
    year: 'Junior (Year 3)',
    gpa: 3.84,
    enrollments: [
      {
        courseId: 'c_mat301',
        courseCode: 'MAT301',
        courseName: 'Advanced Calculus',
        instructorName: 'Prof. Isaac Newton',
        credits: 4,
        semester: 'Fall 2023',
        status: 'completed',
        rating: 5,
        teachingQuality: 5,
        courseClarity: 5,
        engagement: 4,
        comments: 'Professor explains complex calculus concepts incredibly well. The visual proofs during lectures helped connect abstract theorems to practice.',
        submissionDate: 'Oct 24, 2023',
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
        strengths: ['Clear Explanations', 'Visual Demonstrations'],
        areasOfImprovement: ['Faster homework grading']
      },
      {
        courseId: 'c_phy101',
        courseCode: 'PHY101',
        courseName: 'Intro to Physics',
        instructorName: 'Dr. Sarah Miller',
        credits: 4,
        semester: 'Fall 2023',
        status: 'pending'
      },
      {
        courseId: 'c_cs201',
        courseCode: 'CS201',
        courseName: 'Computer Science Core',
        instructorName: 'Dr. Alan Turing',
        credits: 3,
        semester: 'Fall 2023',
        status: 'completed',
        rating: 5,
        teachingQuality: 5,
        courseClarity: 4,
        engagement: 5,
        comments: 'Exceptional introduction to memory models and computation. The programming labs were challenging but immensely rewarding.',
        submissionDate: 'Oct 20, 2023',
        timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
        strengths: ['Inspiring Lectures', 'Practical Coding Labs']
      },
      {
        courseId: 'c_cs302',
        courseCode: 'CS-302',
        courseName: 'Data Structures',
        instructorName: 'Prof. Sarah Jenkins',
        credits: 4,
        semester: 'Fall 2023',
        status: 'draft',
        rating: 4,
        comments: 'Very thorough structure. Still drafting my detailed review on binary tree assignments.'
      }
    ]
  },
  {
    id: 'stu_2',
    name: 'Marcus Chen',
    email: 'm.chen@institution.edu',
    studentId: 'STU-2023-7129',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIypy6qMGdysCrxY5Zgm79C_txvkyBYmz8mDiW-QUkIlQeJuefpSmtMnMSWBE2KODTBJYkAD5gY77-4_ZVR0H8PNKdvTq_8jUEjD20pQtSCQUuyuDjfqtO83x0to5bDO3UdfcOTLBCxWn4gbZOE4jKT2H_tl2kZMOOoGFBr0NDe28BzL3TjYWP9h3o4BYzbfZOnOyjCmRduHJYt_6VKuGeEGRK5R1d7FsGI7Tt1bJrZ5tAPu__HL2I',
    major: 'Applied Physics & Mathematics',
    year: 'Senior (Year 4)',
    gpa: 3.92,
    enrollments: [
      {
        courseId: 'c_phy101',
        courseCode: 'PHY101',
        courseName: 'Intro to Physics',
        instructorName: 'Dr. Sarah Miller',
        credits: 4,
        semester: 'Fall 2023',
        status: 'completed',
        rating: 4,
        teachingQuality: 4,
        courseClarity: 5,
        engagement: 4,
        comments: 'Dr. Miller creates an open lecture atmosphere. Lab equipment was top notch and experiments lined up nicely with midterms.',
        submissionDate: 'Oct 22, 2023',
        timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
        strengths: ['Well-equipped Labs', 'Open Office Hours'],
        areasOfImprovement: ['Extend session Q&A by 10 mins']
      },
      {
        courseId: 'c_mat301',
        courseCode: 'MAT301',
        courseName: 'Advanced Calculus',
        instructorName: 'Prof. Isaac Newton',
        credits: 4,
        semester: 'Fall 2023',
        status: 'completed',
        rating: 4,
        teachingQuality: 4,
        courseClarity: 4,
        engagement: 5,
        comments: 'Challenging problem sets that push rigorous mathematical thinking.',
        submissionDate: 'Oct 19, 2023',
        timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
        strengths: ['Rigorous Problem Sets']
      },
      {
        courseId: 'c_cs401',
        courseCode: 'CS-401',
        courseName: 'Advanced Algorithms',
        instructorName: 'Prof. Eleanor Vance',
        credits: 4,
        semester: 'Fall 2023',
        status: 'pending'
      }
    ]
  },
  {
    id: 'stu_3',
    name: 'Sophia Rodriguez',
    email: 's.rodriguez@institution.edu',
    studentId: 'STU-2023-4518',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3CkTiBeokJGkV9_nVmxrAkTx8dnCs0fngjW4JKyIWzmv92xGn_jjX85kvFFpl1YLwSr0XMgO-JuxE7YCTj60jzpmsO_qOzfq0iWlXmdysfmmWPrSF2iREKbygYEH_ndzH-1iNxNGbitovCEw2ADkGkdI-TarnDFj4L3BBSipq7Hg97fJyU7muJLCXcE5GF9Ta5tFFHsYohz9Bqo8_6ggUhS7HaApMpG2p1D4Q3ZlOfQcFFXV6hi1a',
    major: 'Human-Centered Design & CS',
    year: 'Sophomore (Year 2)',
    gpa: 3.76,
    enrollments: [
      {
        courseId: 'c_ds205',
        courseCode: 'DS-205',
        courseName: 'UI/UX Design',
        instructorName: 'Prof. Marcus Thorne',
        credits: 3,
        semester: 'Fall 2023',
        status: 'completed',
        rating: 5,
        teachingQuality: 5,
        courseClarity: 5,
        engagement: 5,
        comments: 'Studio critiques transformed our prototype fidelity. Professor Thorne provides invaluable industry insight and design system tips.',
        submissionDate: 'Oct 15, 2023',
        timestamp: Date.now() - 11 * 24 * 60 * 60 * 1000,
        strengths: ['Critique Sessions', 'Industry Standard Tooling']
      },
      {
        courseId: 'c_his101',
        courseCode: 'HIS-101',
        courseName: 'Modern History',
        instructorName: 'Dr. Howard Zinn',
        credits: 3,
        semester: 'Fall 2023',
        status: 'completed',
        rating: 5,
        teachingQuality: 5,
        courseClarity: 5,
        engagement: 5,
        comments: 'Engaging storytelling and thought-provoking seminar discussions throughout the semester.',
        submissionDate: 'Oct 18, 2023',
        timestamp: Date.now() - 8 * 24 * 60 * 60 * 1000,
        strengths: ['Engaging Lectures', 'Debate Opportunities']
      },
      {
        courseId: 'c_cs201',
        courseCode: 'CS201',
        courseName: 'Computer Science Core',
        instructorName: 'Dr. Alan Turing',
        credits: 3,
        semester: 'Fall 2023',
        status: 'pending'
      }
    ]
  },
  {
    id: 'stu_4',
    name: 'David Kim',
    email: 'd.kim@institution.edu',
    studentId: 'STU-2023-9031',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdWYyeWEu-7NYk77WG3_jSmX0IwJL_OMIYpqIExG7jSMYh3j77IyMuch3b7QDFIFTvhJaNc0_bvqkwS9h8LpJIb7G1S_Oe-3QTkb1xG7VoZykv8KjFyUDkydAFMtDUUgn_2j_R7GfYzRY_vY3qwRcjM5AuGHJuPRCkrrdwyjmGrAUu8BJw2bWyXM5m-x8jNrgDafo-Q8GSDH29ciK42hgItinExFUD7vlOI1lydoUgCwFWWrXg4kCt',
    major: 'Computer Systems Engineering',
    year: 'Senior (Year 4)',
    gpa: 3.65,
    enrollments: [
      {
        courseId: 'c_cs401',
        courseCode: 'CS-401',
        courseName: 'Advanced Algorithms',
        instructorName: 'Prof. Eleanor Vance',
        credits: 4,
        semester: 'Fall 2023',
        status: 'completed',
        rating: 4,
        teachingQuality: 4,
        courseClarity: 4,
        engagement: 5,
        comments: 'Deep dive into dynamic programming and graph algorithms. Very demanding workload, but the mastery acquired is immense.',
        submissionDate: 'Oct 23, 2023',
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        strengths: ['Deep Technical Rigor', 'Challenging Assignments'],
        areasOfImprovement: ['Provide more practice exams']
      },
      {
        courseId: 'c_cs302',
        courseCode: 'CS-302',
        courseName: 'Data Structures',
        instructorName: 'Prof. Sarah Jenkins',
        credits: 4,
        semester: 'Fall 2023',
        status: 'pending'
      },
      {
        courseId: 'c_mat301',
        courseCode: 'MAT301',
        courseName: 'Advanced Calculus',
        instructorName: 'Prof. Isaac Newton',
        credits: 4,
        semester: 'Fall 2023',
        status: 'completed',
        rating: 5,
        teachingQuality: 5,
        courseClarity: 5,
        engagement: 5,
        comments: 'Outstanding instructional clarity. Highly recommend this course to anyone pursuing engineering.',
        submissionDate: 'Oct 17, 2023',
        timestamp: Date.now() - 9 * 24 * 60 * 60 * 1000
      }
    ]
  },
  {
    id: 'stu_5',
    name: 'Elena Rostova',
    email: 'e.rostova@institution.edu',
    studentId: 'STU-2023-6320',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa36uhyAeOVv-6T6zHA20NEZh4bfOJRP19KIxOlKiwpRaDhydvXLFf42f6SSez1mMjDfvZU9hoGY5k8sHASxvUrUg6RaMNJ5mFqa4VJ9nB_CTiVL7avsSU9wAwwxwSjQ9ReMGeL5h9e4iaBubRfWv6XGZ8maviMRfhyw3ew3hJyYKkTBLs2xwfux9ZMx6aaJ04MvS1x2VUxMjzJs0EsiTpOe_icp2gGBR7ZpkFs94HrnPdFP37uq-Q',
    major: 'Physics & Data Science',
    year: 'Junior (Year 3)',
    gpa: 3.88,
    enrollments: [
      {
        courseId: 'c_phy101',
        courseCode: 'PHY101',
        courseName: 'Intro to Physics',
        instructorName: 'Dr. Sarah Miller',
        credits: 4,
        semester: 'Fall 2023',
        status: 'completed',
        rating: 5,
        teachingQuality: 5,
        courseClarity: 5,
        engagement: 5,
        comments: 'Dr. Miller is phenomenal at connecting theoretical mechanics to astronomical phenomena. One of the best physics courses on campus.',
        submissionDate: 'Oct 25, 2023',
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
        strengths: ['Inspiring Insights', 'Thorough Study Guides']
      },
      {
        courseId: 'c_ds205',
        courseCode: 'DS-205',
        courseName: 'UI/UX Design',
        instructorName: 'Prof. Marcus Thorne',
        credits: 3,
        semester: 'Fall 2023',
        status: 'pending'
      },
      {
        courseId: 'c_his101',
        courseCode: 'HIS-101',
        courseName: 'Modern History',
        instructorName: 'Dr. Howard Zinn',
        credits: 3,
        semester: 'Fall 2023',
        status: 'pending'
      }
    ]
  },
  {
    id: 'stu_6',
    name: 'Jordan Taylor',
    email: 'j.taylor@institution.edu',
    studentId: 'STU-2023-1180',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIypy6qMGdysCrxY5Zgm79C_txvkyBYmz8mDiW-QUkIlQeJuefpSmtMnMSWBE2KODTBJYkAD5gY77-4_ZVR0H8PNKdvTq_8jUEjD20pQtSCQUuyuDjfqtO83x0to5bDO3UdfcOTLBCxWn4gbZOE4jKT2H_tl2kZMOOoGFBr0NDe28BzL3TjYWP9h3o4BYzbfZOnOyjCmRduHJYt_6VKuGeEGRK5R1d7FsGI7Tt1bJrZ5tAPu__HL2I',
    major: 'Applied Mathematics',
    year: 'Freshman (Year 1)',
    gpa: 3.52,
    enrollments: [
      {
        courseId: 'c_mat301',
        courseCode: 'MAT301',
        courseName: 'Advanced Calculus',
        instructorName: 'Prof. Isaac Newton',
        credits: 4,
        semester: 'Fall 2023',
        status: 'completed',
        rating: 4,
        teachingQuality: 4,
        courseClarity: 4,
        engagement: 4,
        comments: 'Found the lectures fast-paced, but the TA recitation hours and video recordings saved me. Good course overall.',
        submissionDate: 'Oct 21, 2023',
        timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
        strengths: ['Recorded Lectures', 'Helpful TAs'],
        areasOfImprovement: ['Slow down on multivariable integration']
      },
      {
        courseId: 'c_cs201',
        courseCode: 'CS201',
        courseName: 'Computer Science Core',
        instructorName: 'Dr. Alan Turing',
        credits: 3,
        semester: 'Fall 2023',
        status: 'draft',
        rating: 3,
        comments: 'Working on feedback regarding the pace of assignments...'
      }
    ]
  }
];
