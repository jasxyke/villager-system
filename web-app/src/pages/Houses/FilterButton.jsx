import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
const FilterButton = ({
  isVisible,
  onToggle,
  onBlockSelection,
  blocks,
  selectedBlocks,
  setFilteredBlocks,
  onClearAll,
}) => {
  // Added state to track if "Show All" is checked
  const [showAll, setShowAll] = useState(true); // "All" is initially checked

  useEffect(() => {
    // Effect to update filtered blocks based on "Show All" and selected blocks
    if (showAll) {
      setFilteredBlocks(blocks); // Show all blocks
    } else {
      const filtered = blocks.filter((block) => selectedBlocks[block.name]); // Filter based on selected blocks
      setFilteredBlocks(filtered);
    }
  }, [showAll, selectedBlocks, blocks, setFilteredBlocks]);

  // Handler for "Show All" checkbox change
  const handleShowAllChange = () => {
    setShowAll((prev) => !prev);
  };

  // Handler for block selection change
  const handleBlockSelection = (blockName) => {
    onBlockSelection(blockName);
    // Recalculate filtered blocks based on updated selections
    if (showAll) {
      setFilteredBlocks(blocks); // Show all blocks if "Show All" is checked
    } else {
      const filtered = blocks.filter((block) => selectedBlocks[block.name]);
      setFilteredBlocks(filtered);
    }
  };

  // Handler to clear all filters and reset "Show All"
  const handleClearAll = () => {
    setShowAll(true); // Uncheck "Show All"
    setFilteredBlocks(blocks); // Show all blocks
    onClearAll();
  };

  // Calculate total number of blocks
  const totalBlocks = blocks.length;

  /*const handleViewAll = () => {
      setFilteredBlocks(blocks);
      onToggle();
    };*/

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-x-3 px-4 py-2 bg-primary text-white rounded-xl h-14 w-40 text-lg"
      >
        <CiFilter size={30} />
        FILTER
      </button>
      {isVisible && (
        <div className="absolute left-0 mt-2 w-[230px] bg-white shadow-lg rounded-lg p-4 z-10">
          {/*<div className="text-[#344C11] font-bold mb-2">FILTERS</div>*/}
          <div className="flex flex-col space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showAll}
                onChange={handleShowAllChange}
                className="mr-2"
              />
              All ({totalBlocks})
            </label>
            <hr className="my-2 border-gray-300" />
            <div className="flex flex-wrap -mx-2">
              {blocks.map((block, index) => (
                <label
                  key={index}
                  className="flex items-center w-1/2 px-2 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedBlocks[block.name]}
                    onChange={() => onBlockSelection(block.name)}
                    className="mr-2"
                    disabled={showAll} // Disable individual checkboxes if "Show All" is checked
                  />
                  {block.name}
                </label>
              ))}
            </div>
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="flex justify-end">
            <button
              onClick={handleClearAll}
              className="text-sm underline flex justify-end pr-1"
            >
              Clear All
            </button>
          </div>

          {/*<button
            onClick={handleViewAll}
            className="mt-3 text-[#344C11] text-sm underline"
          >
            <img
              src={chevronDownIcon}
              alt="Chevron Down"
              className="inline w-4 h-4"
            />
            View all...
          </button>*/}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
