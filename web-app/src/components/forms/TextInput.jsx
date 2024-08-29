import React from "react";

const TextInput = ({
  label,
  value,
  changeText,
  disabled = false,
  width = "s",
  textColor = "black",
  bgColor = "white",
  error = "", // New error prop
}) => {
  return (
    <div className="mb-2">
      <p className={`text-${textColor} mb-1`}>{label}</p>
      <input
        type="text"
        value={value}
        className={`border w-full rounded-md p-2 bg-${bgColor} text-black ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onChange={(e) => changeText(e.target.value)}
        disabled={disabled}
      />
      {/* Conditionally render the error message if it exists */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
