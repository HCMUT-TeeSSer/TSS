const path = {
  home: "/",
  docs: "/docs",
  mentee: "/mentee",
  menteeProfile: "/mentee/profile",
  menteePrograms: "/mentee/programs",
  menteeMyProgram: "/mentee/programs/my-program",
  menteeProgramDetail: "/mentee/programs/:programId",
  admin: "/admin",
  adminProgram: "/admin/Program",
  adminTutor: "/admin/Tutor",
  adminMentee: "/admin/Mentee",
} as const;

export default path;
