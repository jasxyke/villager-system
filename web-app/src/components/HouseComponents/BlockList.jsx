import React from "react";
import chevronRightIcon from "../../assets/icons/chevron-right.png";
import chevronDownIcon from "../../assets/icons/chevron-down.png";
import ProfileIcon from "../../assets/icons/profile.png";
import homeIcon from "../../assets/icons/Home.png";

const BlockList = ({ blocks, openBlock, onBlockClick, onLotClick }) => (
  <div className="flex flex-col space-y-2">
    {blocks.map((block, index) => (
      <div key={index} className="bg-[var(--darkGreen)] text-white rounded-xl">
        <div
          className="flex items-center px-8 py-4 cursor-pointer justify-between"
          onClick={() =>
            onBlockClick(openBlock === block.name ? null : block.name)
          }
        >
          <div className="flex items-center space-x-4">
            <img src={homeIcon} alt="Home" className="w-8 h-8" />
            <span className="text-xl font-bold">{block.name}</span>
          </div>
          <img
            src={openBlock === block.name ? chevronDownIcon : chevronRightIcon}
            alt={openBlock === block.name ? "Collapse" : "Expand"}
            className="w-8 h-8"
          />
        </div>

        {openBlock === block.name && (
          <div className="p-8 space-y-4 bg-[var(--darkGreen)]">
            {block.lots.map((lot, index) => (
              <div
                key={index}
                className="bg-[var(--mutedGreen)] flex items-center p-6 text-black rounded-xl cursor-pointer justify-between hover:bg-[var(--mintGreen)] transition-colors"
                onClick={() => onLotClick(lot)}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={ProfileIcon}
                    alt="Profile"
                    className="mr-4 w-8 h-8"
                  />
                  <span className="text-lg font-medium">LOT {lot.lot}:</span>
                  <span className="text-lg font-medium"> {lot.resident}</span>
                </div>
                <img
                  src={chevronRightIcon}
                  alt="View Details"
                  className="w-8 h-8"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default BlockList;
