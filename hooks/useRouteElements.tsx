import Loading from "@/components/Loading";
import path from "@/constants/path";
import MainLayout from "@/layouts/MainLayout";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const Library = lazy(() => import("@/pages/component/Library"));
const ProgramList = lazy(() => import("@/pages/component/ProgramList"));

export default function useRouteElements() {
  return useRoutes([
    {
      path: path.mentee,
      element: <MainLayout />,
      children: [
        {
          path: "library",
          element: (
            <Suspense fallback={<Loading />}>
              <Library />
            </Suspense>
          )
        },
        {
          path: "program-list",
          element: (
            <Suspense fallback={<Loading />}>
              <ProgramList />
            </Suspense>
          )
        }
      ]
    }
  ]);
}
