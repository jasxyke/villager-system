import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import useHouses from "../../hooks/useHouses";
import Lots from "./Lots";
const BlockList = ({ blocks, onLotClick }) => {
  const [openBlock, setOpenBlock] = useState(null);
  const [house, setHouse] = useState(null);
  const { houses, getHousesPerBlock, loading } = useHouses();

  const handleBlockClick = (blockNumber) => {
    if (openBlock !== blockNumber) {
      getHousesPerBlock(blockNumber);
    }
    setOpenBlock(blockNumber);
  };

  return (
    <div
      className="flex flex-col overflow-y-auto"
      style={{ minHeight: "500px", maxHeight: "500px", height: "500px" }}
    >
      {blocks.map((block, index) => (
        <div
          key={index}
          className="bg-primary text-white border-b-2 border-green"
        >
          <div
            className="flex items-center px-8 py-4 cursor-pointer justify-between"
            onClick={() => handleBlockClick(openBlock === block ? null : block)}
          >
            <div className="flex items-center space-x-4">
              <FaHome size={30} color="white" />
              <span className="text-xl">BLOCK {block}</span>
            </div>
            {openBlock === block ? (
              <IoIosArrowDown size={30} color="white" />
            ) : (
              <MdKeyboardArrowRight color="white" size={30} />
            )}
            {/* <img
              src={openBlock === block.name ? chevronDownIcon : chevronRightIcon}
              alt={openBlock === block.name ? "Collapse" : "Expand"}
              className="w-8 h-8"
            /> */}
          </div>

          {openBlock === block && (
            <div className="bg-darkGreen">
              {loading ? (
                <LoadingContainer />
              ) : houses === null ? null : (
                <Lots houses={houses} onLotClick={onLotClick} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlockList;
