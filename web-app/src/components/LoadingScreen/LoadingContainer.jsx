import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const LoadingContainer = ({ loading, color = "#ffffff", size = 50 }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <BounceLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingContainer;
