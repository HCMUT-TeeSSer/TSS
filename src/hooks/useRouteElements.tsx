import Loading from "@/components/Loading";
import path from "@/constants/path";
import MainLayout from "@/layouts/MainLayout";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Program = lazy(() => import("@/pages/mentee/Program"));
const HomePage = lazy(() => import("@/pages/Home/HomePage"));
const MenteeMyProgramDetail = lazy(() => import("@/pages/mentee/MyProgram/MyProgramDetail"));
const TutorMyProgramDetail = lazy(() => import("@/pages/tutor/MyProgram/MyProgramDetail"));

const StudentsCompetencies = lazy(() => import("@/pages/mentee/StudentsCompetencies"));
const TutorCompetencies = lazy(() => import("@/pages/tutor/TutorCompetencies"));
const Sessions = lazy(() => import("@/pages/mentee/Sessions"));
const ProgramDetail = lazy(() => import("@/pages/mentee/ProgramDetail"));

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
            {
              // Route: /mentee/programs/my-program/:programId
              // Lưu ý: path con không cần bắt đầu bằng "/" nếu muốn nối tiếp path cha
              path: "my-program/:programId",
              element: (
                <Suspense fallback={<Loading />}>
                  <MenteeMyProgramDetail />
                </Suspense>
              ),
            },
            //
            {
              // element: <ProgramLayout />,
              children: [
                // {
                //   path: path.profile,
                //   element: (
                //     <Suspense fallback={<Loading />}>
                //       <Profile />
                //     </Suspense>
                //   ),
                // },
                // {
                //   path: path.changePassword,
                //   element: (
                //     <Suspense fallback={<Loading />}>
                //       <ChangePassword />
                //     </Suspense>
                //   ),
                // },
                // {
                //   path: path.historyPurchase,
                //   element: (
                //     <Suspense fallback={<Loading />}>
                //       <HistoryPurchase />
                //     </Suspense>
                //   ),
                // },
              ],
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
            {
              path: "programs",
              element: (
                <Suspense fallback={<Loading />}>
                  <Program />
                </Suspense>
              ),
            },
            {
              // Route: /mentee/programs/my-program/:programId
              // Lưu ý: path con không cần bắt đầu bằng "/" nếu muốn nối tiếp path cha
              path: "my-program/:programId",
              element: (
                <Suspense fallback={<Loading />}>
                  <TutorMyProgramDetail />
                </Suspense>
              ),
            },
            //
            {
              // element: <ProgramLayout />,
              children: [
                // {
                //   path: path.profile,
                //   element: (
                //     <Suspense fallback={<Loading />}>
                //       <Profile />
                //     </Suspense>
                //   ),
                // },
                // {
                //   path: path.changePassword,
                //   element: (
                //     <Suspense fallback={<Loading />}>
                //       <ChangePassword />
                //     </Suspense>
                //   ),
                // },
                // {
                //   path: path.historyPurchase,
                //   element: (
                //     <Suspense fallback={<Loading />}>
                //       <HistoryPurchase />
                //     </Suspense>
                //   ),
                // },
              ],
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
          path: path.home,
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          ),
        },
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
