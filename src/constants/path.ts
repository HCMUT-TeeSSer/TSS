const path = {
  home: "/",
  docs: "/docs",
  login: "/login",

  mentee: "/mentee",
  menteeProfile: "/mentee/profile",
  menteePrograms: "/mentee/programs",
  menteeProgramDetail: "/mentee/programs/:programId",
  menteeMyPrograms: "/mentee/my-programs",
  menteeMyProgramDetail: "/mentee/my-programs/:programId",

  admin: "/admin",
  adminProgram: "/admin/Program",
  adminTutor: "/admin/Tutor",
  adminMentee: "/admin/Mentee",

  tutor: "/tutor",
  TutorPrograms: "/tutor/programs",
  TutorProgramDetail: "/tutor/programs/:programId",
  tutorMyPrograms: "/tutor/my-programs",
  tutorMyProgramDetail: "/tutor/my-programs/:programId",
} as const;

export default path;
