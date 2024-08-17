import React from "react";
import filterIcon from "../../assets/icons/filter.png";
import chevronDownIcon from "../../assets/icons/chevron-down.png";
import chevronRightIcon from "../../assets/icons/chevron-right.png";

const FilterButton = ({
  isVisible,
  onToggle,
  onBlockSelection,
  blocks,
  selectedBlocks,
  setFilteredBlocks,
}) => {
  const handleViewAll = () => {
    setFilteredBlocks(blocks);
    onToggle();
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center px-4 py-2 bg-[var(--darkGreen)] text-white rounded-md h-14 w-40 text-lg"
      >
        <img
          src={filterIcon}
          alt="Filter"
          className="text-2xl text-white p-2 w-12 h-12"
        />
        FILTER
      </button>
      {isVisible && (
        <div className="absolute left-0 mt-2 w-[200px] bg-white shadow-lg rounded-lg p-4 z-10">
          <div className="text-[#344C11] font-bold mb-2">FILTERS</div>
          <div className="flex flex-col space-y-2">
            {blocks.map((block, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedBlocks[block.name]}
                  onChange={() => onBlockSelection(block.name)}
                  className="mr-2"
                />
                {block.name}
              </label>
            ))}
          </div>
          <button
            onClick={handleViewAll}
            className="mt-3 text-[#344C11] text-sm underline"
          >
            <img
              src={chevronDownIcon}
              alt="Chevron Down"
              className="inline w-4 h-4"
            />
            View all...
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
