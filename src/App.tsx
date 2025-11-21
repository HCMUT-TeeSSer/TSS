import ErrorBoundary from "@/components/ErrorBoundary";
import useRouteElements from "@/hooks/useRouteElements";
import { ToastContainer } from "react-toastify";

const App = () => {
  const routeElements = useRouteElements();
  return (
    <ErrorBoundary>
      {routeElements}
      <ToastContainer />
    </ErrorBoundary>
  );
};
export default App;
