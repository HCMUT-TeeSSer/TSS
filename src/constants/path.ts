const path = {
  home: "/",
  docs: "/docs",
  login: "/login",

  student: "/student",
  studentProfile: "/student/profile",
  studentPrograms: "/student/programs",
  studentProgramDetail: "/student/programs/:programId",
  studentMyProgram: "/student/my-program",
  studentMyProgramDetail: "/student/my-program/:programId",
  studentSessions: "/student/sessions/:programId",
  studentMeet: "/student/meet/:programId",
  studentCompetence: "/student/competence/:programId",

  tutor: "/tutor",
  tutorProfile: "/tutor/profile",
  TutorProgram: "/tutor/programs",
  TutorProgramDetail: "/tutor/programs/:programId",
  tutorMyProgram: "/tutor/my-program",
  tutorMyProgramDetail: "/tutor/my-program/:programId",
  tutorSessions: "/tutor/sessions/:programId",
  tutorMeet: "/tutor/meet/:programId",
  tutorCompetence: "/tutor/competence/:programId",

  admin: "/admin",
  adminProfile: "/admin/profile",
  adminWelcome: "/admin/home",
  adminProgram: "/admin/programs",
  adminTutor: "/admin/tutors",
  adminStudent: "/admin/students",
} as const;

export default path;