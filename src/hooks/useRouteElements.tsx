import Loading from "@/components/Loading";
import path from "@/constants/path";
import MainLayout from "@/layouts/MainLayout";
import ProgramDetail from "@/pages/mentee/ProgramDetail/ProgramDetail";
import Sessions from "@/pages/mentee/Sessions";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const NotFound = lazy(() => import("@/pages/NotFound"));
const StudentsCompetencies = lazy(() => import("@/pages/StudentsCompetencies"));
const TutorCompetencies = lazy(() => import("@/pages/TutorCompetencies"));

const Program = lazy(() => import("@/pages/mentee/Program"));
// function ProtectedRoute() {
//   const { isAuthenticated } = useContext(AppContext);
//   return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
// }

// function RejectedRoute() {
//   const { isAuthenticated } = useContext(AppContext);
//   return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
// }

export default function useRouteElements() {
  const routeElements = useRoutes([
    // {
    //   path: "",
    //   // element: <RejectedRoute />,
    //   children: [
    //     {
    //       path: "",
    //       element: <RegisterLayout />,
    //       children: [
    //         {
    //           path: path.login,
    //           element: (
    //             <Suspense fallback={<Loading />}>
    //               <Login />
    //             </Suspense>
    //           ),
    //         },
    //         {
    //           path: path.register,
    //           element: (
    //             <Suspense fallback={<Loading />}>
    //               <Register />
    //             </Suspense>
    //           ),
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      path: "",
      // element: <ProtectedRoute />,
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
        {
          path: path.tutor,
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
          ],
        },
      ],
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "*",
          element: (
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return routeElements;
}
