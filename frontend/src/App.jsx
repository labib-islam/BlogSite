import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes";
import { ErrorBoundary } from "react-error-boundary";
import Auth from "./shared/pages/Auth";
import React, { Suspense, useContext } from "react";
import ErrorFallback from "./shared/components/ErrorBoundary";
import AuthContext from "./shared/contexts/AuthContext";
import ErrorCard from "./shared/components/ErrorCard";
import LoadingSpinner from "./shared/components/LoadingSpinner";
// const AppRoutes = React.lazy(() => import("./AppRoutes"));

function App() {
  const { role, authError } = useContext(AuthContext);

  if (authError) return <ErrorCard error={authError} />;
  if (role === undefined) return <LoadingSpinner />;

  return (
    <>
      <AppRoutes />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
