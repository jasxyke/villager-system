import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const LoadingElement = ({
  loading,
  color = "#ffffff",
  size = 50,
  bgColor = "",
  hasMargin = false,
}) => {
  return (
    <BounceLoader
      color={color}
      loading={loading}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
      className={`mx-auto  ${hasMargin && "mt-5 mb-5"}`}
    />
  );
};

export default LoadingElement;
