import React from "react";

const TextInput = ({
  label,
  value,
  changeText,
  disabled = false,
  width = "s",
  textColor = "black",
  bgColor = "white",
}) => {
  return (
    <div className="mb-2">
      <p className={`text-${textColor} mb-1`}>{label}</p>
      <input
        type="text"
        value={value}
        className={`border w-full rounded-md p-2 bg-${bgColor} text-black`}
        onChange={(e) => changeText(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
