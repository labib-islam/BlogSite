import React from "react";
import { BiSolidError } from "react-icons/bi";

import "./ErrorCard.css";

const ErrorCard = ({ error, isErrorBoundary = false, resetErrorBoundary }) => {
  const handleRetry = () => {
    window.location.reload(); // Reload the page
  };

  return (
    <main className="page-error">
      <section className="error__container">
        <div className="error-title__container">
          <figure>
            <BiSolidError className="error-icon" />
          </figure>
          <header>
            {isErrorBoundary ? "Something went wrong" : error.message}
          </header>
        </div>
        {isErrorBoundary ? (
          <p>{error.message}</p>
        ) : error.response?.data.message ? (
          <p>{error.response?.data.message}</p>
        ) : (
          <p>Something went wrong!</p>
        )}
        <button onClick={isErrorBoundary ? resetErrorBoundary : handleRetry}>
          Try Again
        </button>
      </section>
    </main>
  );
};

export default ErrorCard;
