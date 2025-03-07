import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error("Caught an error:", error);

  return (
    <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
      <h2>Oops! Something went wrong.</h2>
      <p>{error?.message || "An unexpected error occurred."}</p>
      <a href="/">Go back to Home</a>
    </div>
  );
};

export default ErrorBoundary;
