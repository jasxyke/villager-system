import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const LoadingContainer = ({
  loading,
  color = "#ffffff",
  size = 50,
  bgColor = "",
}) => {
  return (
    <div
      className={`flex justify-center items-center w-full h-full bg-${bgColor}`}
    >
      <BounceLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="mt-10 mb-10"
      />
    </div>
  );
};

export default LoadingContainer;
