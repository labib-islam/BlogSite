import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = ({ fullHeight = true, fullWidth = true }) => {
  return (
    <div
      className={`${fullHeight && "full-height"} ${fullWidth && "full-width"}`}
    >
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
