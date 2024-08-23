import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
const LoadingPage = ({ color, loading, size = 100 }) => {
  return (
    <div className="container flex justify-center items-center h-full">
      <MoonLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingPage;
