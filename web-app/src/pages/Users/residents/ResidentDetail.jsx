import React from "react";

const ResidentDetail = ({
  label,
  value,
  changeText,
  disabled = false,
  width = "",
}) => {
  return (
    <div className="">
      <p className="text-white mb-1">{label}</p>
      <input
        type="text"
        value={value}
        className={
          width !== ""
            ? `w-[${width}] rounded-md text-center py-2 bg-greyGreen text-black`
            : "rounded-md text-center py-2 bg-greyGreen text-black"
        }
        onChange={(e) => changeText(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default ResidentDetail;
