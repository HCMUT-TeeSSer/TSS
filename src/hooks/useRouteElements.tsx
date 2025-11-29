import Loading from "@/components/Loading";
import path from "@/constants/path";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import RejectedRoute from "@/components/RejectedRoute";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import MyProgramLayout from "@/layouts/student/MyProgramLayout";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const Program = lazy(() => import("@/pages/mentee/Program"));
const AdminProgram = lazy(() => import("@/pages/admin/Program/Program"));
const AdminTutor = lazy(() => import("@/pages/admin/Tutor/Tutor"));
const AdminMentee = lazy(() => import("@/pages/admin/Mentee/Mentee"));
const HomePage = lazy(() => import("@/pages/Home/HomePage"));
const MenteeMyProgramDetail = lazy(() => import("@/pages/mentee/MyProgram/MyProgramDetail"));
const TutorMyProgramDetail = lazy(() => import("@/pages/tutor/MyProgram/MyProgramDetail"));

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
              children: [
                // NHÓM 1: Các trang dùng MainLayout (Programs, Competencies...)
                {
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
                      path: "competencies",
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
                  ],
                },
                // NHÓM 2: Trang MyProgram dùng Layout riêng (MyProgramLayout)
                {
                  path: "my-programs",
                  element: <MyProgramLayout />, // Layout này đã có Header/Footer
                  children: [
                    {
                      path: ":programId",
                      element: (
                        <Suspense fallback={<Loading />}>
                          <MenteeMyProgramDetail />
                        </Suspense>
                      ),
                    },
                  ],
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
              children: [
                // Nhóm 1: Các trang dùng MainLayout bình thường
                {
                  element: <MainLayout />,
                  children: [
                    {
                      path: "competencies",
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
                  ],
                },
                // Nhóm 2: Trang chi tiết dùng MyProgramLayout riêng
                {
                  path: "my-programs",
                  element: <MyProgramLayout />,
                  children: [
                    {
                      path: ":programId",
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
