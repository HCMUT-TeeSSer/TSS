import Loading from "@/components/Loading";
import path from "@/constants/path";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import RejectedRoute from "@/components/RejectedRoute";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import AdminLayout from "@/pages/admin/Layout";
import AdminWelcome from "@/pages/admin/Home/AdminWelcome";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const Program = lazy(() => import("@/pages/student/Program"));
const ProgramOverview = lazy(() => import("@/pages/student/ProgramOverview/ProgramOverview"));
const AdminProgram = lazy(() => import("@/pages/admin/Program/Program"));
const AdminTutor = lazy(() => import("@/pages/admin/Tutor/Tutor"));
const AdminMentee = lazy(() => import("@/pages/admin/Student/Mentee"));
const HomePage = lazy(() => import("@/pages/Home/HomePage"));
const MenteeMyProgramDetail = lazy(() => import("@/pages/student/MyProgram/MyProgramDetail"));
const TutorMyProgramDetail = lazy(() => import("@/pages/tutor/ProgramMeet/ProgramMeet"));
const Library = lazy(() => import("@/pages/student/Library/Library"));
const ProgramList = lazy(() => import("@/pages/student/ProgramList/ProgramList"));
const StudentsCompetencies = lazy(() => import("@/pages/student/StudentsCompetencies"));
const TutorCompetencies = lazy(() => import("@/pages/tutor/TutorCompetencies"));
const Sessions = lazy(() => import("@/pages/student/Sessions"));
const ProgramDetail = lazy(() => import("@/pages/student/ProgramDetail"));
const TutorSessions = lazy(() => import("@/pages/tutor/Sessions/Sessions"));
const TutorProgramList = lazy(() => import("@/pages/tutor/ProgramList/ProgramList"));
const TutorProgramDetail = lazy(() => import("@/pages/tutor/ProgramDetail/ProgramDetail"));

export default function useRouteElements() {
  const routeElements = useRoutes([
    // Routes that require user to NOT be authenticated (login page)
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          ),
        },
      ],
    },
    // Protected routes - require authentication
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        // Home page - accessible by all authenticated users
        {
          path: path.home,
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<Loading />}>
                  <HomePage />
                </Suspense>
              ),
            },
          ],
        },
        // Library - accessible by all authenticated users
        {
          path: path.library,
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<Loading />}>
                  <Library />
                </Suspense>
              ),
            },
          ],
        },
        // Student routes - only accessible by students
        {
          path: "",
          element: <ProtectedRoute allowedRoles={["student"]} />,
          children: [
            {
              path: path.student,
              element: <MainLayout />,
              children: [
                {
                  path: path.studentPrograms,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <Program />
                    </Suspense>
                  ),
                },
                {
                  path: path.studentProgramDetail,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <ProgramOverview />
                    </Suspense>
                  ),
                },
                {
                  path: path.studentProgramCompetencies,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <StudentsCompetencies />
                    </Suspense>
                  ),
                },
                {
                  path: path.studentSessions,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <Sessions />
                    </Suspense>
                  ),
                },
                {
                  path: path.studentProgramDetailView,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <ProgramDetail />
                    </Suspense>
                  ),
                },
                {
                  path: path.studentMyProgramDetail,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <MenteeMyProgramDetail />
                    </Suspense>
                  ),
                },
                {
                  path: path.studentProgramList,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <ProgramList />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
        // Tutor routes - only accessible by tutors
        {
          path: "",
          element: <ProtectedRoute allowedRoles={["tutor"]} />,
          children: [
            {
              path: path.tutor,
              element: <MainLayout />,
              children: [
                {
                  path: path.tutorProgramCompetencies,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <TutorCompetencies />
                    </Suspense>
                  ),
                },
                {
                  path: path.tutorPrograms,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <Program />
                    </Suspense>
                  ),
                },
                {
                  path: path.tutorProgramDetail,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <ProgramOverview />
                    </Suspense>
                  ),
                },
                {
                  path: path.tutorMeet,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <TutorMyProgramDetail />
                    </Suspense>
                  ),
                },
                {
                  path: path.tutorSessions,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <TutorSessions />
                    </Suspense>
                  ),
                },
                {
                  path: path.tutorProgramList,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <TutorProgramList />
                    </Suspense>
                  ),
                },
                {
                  path: path.tutorProgramDetailView,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <TutorProgramDetail />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
    // Admin routes - only accessible by admins
    {
      path: path.admin,
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <AdminWelcome />,
        },
        {
          path: path.adminPrograms,
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProgram />
            </Suspense>
          ),
        },
        {
          path: path.adminTutors,
          element: (
            <Suspense fallback={<Loading />}>
              <AdminTutor />
            </Suspense>
          ),
        },
        {
          path: path.adminMentees,
          element: (
            <Suspense fallback={<Loading />}>
              <AdminMentee />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        // 404 page - accessible by all authenticated users
        {
          path: "*",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<Loading />}>
                  <NotFound />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);
  return routeElements;
}
