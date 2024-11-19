import React from "react";

const StickerDefaultTable = ({ handleClick, children, index }) => {
  return (
    <div
      className={`grid grid-cols-5 gap-4 p-4 ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } hover:bg-grey-100 cursor-pointer text-black border-b border-gray-300`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default StickerDefaultTable;