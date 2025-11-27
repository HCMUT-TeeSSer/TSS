import Loading from "@/components/Loading";
import path from "@/constants/path";
import MainLayout from "@/layouts/MainLayout";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Program = lazy(() => import("@/pages/mentee/Program"));
const AdminProgram = lazy(() => import("@/pages/admin/Program/Program"));
const AdminTutor = lazy(() => import("@/pages/admin/Tutor/Tutor"));
const AdminMentee = lazy(() => import("@/pages/admin/Mentee/Mentee"));

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
      path: path.admin, // Ví dụ '/admin'
      element: <MainLayout />,
      children: [
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
