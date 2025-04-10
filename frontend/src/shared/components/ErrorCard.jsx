import React from "react";

import "./ErrorCard.css";

const ErrorCard = ({ error }) => {
  return (
    <main className="page-error">
      <section className="error__container">
        <header>{error}</header>
      </section>
    </main>
  );
};

export default ErrorCard;
