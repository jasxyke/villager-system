import React from "react";

const StickerDefaultTable = ({ handleClick, children }) => {
  return (
    <div
      className="flex border mb-2 items-center hover:bg-darkerGreen cursor-pointer text-white"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default StickerDefaultTable;
