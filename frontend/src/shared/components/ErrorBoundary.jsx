import { BiSolidError } from "react-icons/bi";
import "./ErrorBoundary.css";
import ErrorCard from "./ErrorCard";

function ErrorFallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <ErrorCard
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      isErrorBoundary={true}
    />
  );
}

export default ErrorFallback;
