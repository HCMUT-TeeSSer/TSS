import Loading from "@/components/Loading";
import path from "@/constants/path";
import MainLayout from "@/layouts/MainLayout";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Library = lazy(() => import("@/pages/mentee/Library"));
const ProgramList = lazy(() => import("@/pages/mentee/ProgramList"));

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
              path: "",
              // element: <ProgramLayout />,
              children: [
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
