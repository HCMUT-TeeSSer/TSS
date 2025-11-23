import Loading from "@/components/Loading";
import path from "@/constants/path";
import MainLayout from "@/layouts/MainLayout";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const NotFound = lazy(() => import("@/pages/NotFound"));
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
              path: "",
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
            {
              path: path.menteePrograms, // Route /mentee/programs
              children: [
                {
                  // Thêm route chi tiết: /mentee/programs/:programId
                  path: path.menteeProgramDetail,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <Program />
                    </Suspense>
                  ),
                },
              ],
            },
            {
              path: "",
              element: (
                <div className='p-4'>
                  <h1 className='text-2xl font-bold'>Trang chủ Mentee (Demo)</h1>
                  <p>Vui lòng truy cập đường dẫn demo chi tiết chương trình để xem Lịch hẹn.</p>
                  <p>
                    Demo Link:{" "}
                    <a href='/mentee/programs/123' className='text-blue-600 hover:underline'>
                      /mentee/programs/123
                    </a>
                  </p>
                </div>
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
