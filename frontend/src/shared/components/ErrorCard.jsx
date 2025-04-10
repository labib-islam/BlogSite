import React from "react";
import { BiSolidError } from "react-icons/bi";

import "./ErrorCard.css";

const ErrorCard = ({ error }) => {
  return (
    <main className="page-error">
      <section className="error__container">
        <div className="error-title__container">
          <figure>
            <BiSolidError className="error-icon" />
          </figure>
          <header>{error.message}</header>
        </div>
        {error.response?.data.message ? (
          <p>{error.response?.data.message}</p>
        ) : (
          <p>Something went wrong!</p>
        )}
      </section>
    </main>
  );
};

export default ErrorCard;
