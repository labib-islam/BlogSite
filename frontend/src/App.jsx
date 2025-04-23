import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes";
import { ErrorBoundary } from "react-error-boundary";
import Auth from "./shared/pages/Auth";
import React, { Suspense, useContext } from "react";
import ErrorFallback from "./shared/components/ErrorBoundary";
import AuthContext from "./shared/contexts/AuthContext";
import ErrorCard from "./shared/components/ErrorCard";
import LoadingSpinner from "./shared/components/LoadingSpinner";
import axios from "axios";
// const AppRoutes = React.lazy(() => import("./AppRoutes"));

// Set base URL
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "authToken"
)}`;

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
