const path = {
  home: "/",
  docs: "/docs",
  login: "/login",
  mentee: "/mentee",
  menteeProfile: "/mentee/profile",
  menteePrograms: "/mentee/programs",
  menteeProgramDetail: "/mentee/programs/:programId",
  menteeMyProgram: "/mentee/my-program",
  menteeMyProgramDetail: "/mentee/my-program/:programId",

  tutor: "/tutor",
  TutorProgram: "/tutor/programs",
  TutorProgramDetail: "/tutor/programs/:programId",
  tutorMyProgram: "/tutor/my-program",
  tutorMyProgramDetail: "/tutor/my-program/:programId",
} as const;

export default path;
