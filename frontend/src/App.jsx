import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes";
import { ErrorBoundary } from "react-error-boundary";
import Auth from "./shared/pages/Auth";
import React, { Suspense } from "react";
import ErrorFallback from "./shared/components/ErrorBoundary";
// const AppRoutes = React.lazy(() => import("./AppRoutes"));

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors />
    </>
  );
}

export default App;
