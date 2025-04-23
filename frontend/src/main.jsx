import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./shared/contexts/AuthContext.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./shared/components/ErrorBoundary.jsx";
import LoadingSpinner from "./shared/components/LoadingSpinner.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      <Suspense fallback={<LoadingSpinner />}>
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
