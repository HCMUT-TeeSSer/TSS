import ErrorBoundary from "@/components/ErrorBoundary";
import useRouteElements from "@/hooks/useRouteElements";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  const routeElements = useRouteElements();
  return (
    <AuthProvider>
      <ErrorBoundary>
        {routeElements}
        <ToastContainer />
      </ErrorBoundary>
    </AuthProvider>
  );
};
export default App;
