import Loading from "@/components/Loading";
import path from "@/constants/path";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import RejectedRoute from "@/components/RejectedRoute";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const Program = lazy(() => import("@/pages/mentee/Program"));
const ProgramOverview = lazy(() => import("@/pages/mentee/ProgramOverview/ProgramOverview"));
const AdminProgram = lazy(() => import("@/pages/admin/Program/Program"));
const AdminTutor = lazy(() => import("@/pages/admin/Tutor/Tutor"));
const AdminMentee = lazy(() => import("@/pages/admin/Mentee/Mentee"));
const HomePage = lazy(() => import("@/pages/Home/HomePage"));
const MenteeMyProgramDetail = lazy(() => import("@/pages/mentee/MyProgram/MyProgramDetail"));
const TutorMyProgramDetail = lazy(() => import("@/pages/tutor/MyProgram/MyProgramDetail"));
const Library = lazy(() => import("@/pages/mentee/Library/Library"));
const ProgramList = lazy(() => import("@/pages/mentee/Program List/ProgramList"));
const StudentsCompetencies = lazy(() => import("@/pages/mentee/StudentsCompetencies"));
const TutorCompetencies = lazy(() => import("@/pages/tutor/TutorCompetencies"));
const Sessions = lazy(() => import("@/pages/mentee/Sessions"));
const ProgramDetail = lazy(() => import("@/pages/mentee/ProgramDetail"));

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
        // Student routes - only accessible by students
        {
          path: "",
          element: <ProtectedRoute allowedRoles={["student"]} />,
          children: [
            {
              path: path.mentee,
              element: <MainLayout />,
              children: [
                {
                  path: "programs",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <Program />
                    </Suspense>
                  ),
                },
                {
                  path: "programs/:programId",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <ProgramOverview />
                    </Suspense>
                  ),
                },
                {
                  path: "programs/:programId/competencies",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <StudentsCompetencies />
                    </Suspense>
                  ),
                },
                {
                  path: "sessions",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <Sessions />
                    </Suspense>
                  ),
                },
                {
                  path: "program-detail",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <ProgramDetail />
                    </Suspense>
                  ),
                },
                {
                  path: "my-program/:programId",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <MenteeMyProgramDetail />
                    </Suspense>
                  ),
                },
                {
                  path: "library",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <Library />
                    </Suspense>
                  ),
                },
                {
                  path: "program-list",
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
      ],
    },
    // Admin routes - only accessible by admins
    {
      path: path.admin,
      element: <ProtectedRoute allowedRoles={["admin"]} />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProgram />
            </Suspense>
          ),
        },
        {
          path: "programs",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProgram />
            </Suspense>
          ),
        },
        {
          path: "tutors",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminTutor />
            </Suspense>
          ),
        },
        {
          path: "mentees",
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
        // Tutor routes - only accessible by tutors
        {
          path: "",
          element: <ProtectedRoute allowedRoles={["tutor"]} />,
          children: [
            {
              path: path.tutor,
              // element: <MainLayout />, // duplicated layout
              children: [
                {
                  path: "programs/:programId/competencies",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <TutorCompetencies />
                    </Suspense>
                  ),
                },
                {
                  path: "programs",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <Program />
                    </Suspense>
                  ),
                },
                {
                  path: "programs/:programId",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <ProgramOverview />
                    </Suspense>
                  ),
                },
                {
                  path: "my-program/:programId",
                  element: (
                    <Suspense fallback={<Loading />}>
                      <TutorMyProgramDetail />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
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
