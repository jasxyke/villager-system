import React, { useState, useMemo } from "react";
import mainLogo from "../../assets/logo.png";
import FilterButton from "../../components/HouseComponents/FilterButton";
import SearchInput from "../../components/HouseComponents/SearchInput";
import HouseDetails from "../../components/HouseComponents/HouseDetails";
import BlockList from "../../components/HouseComponents/BlockList";
import AddHouse from "../../components/HouseComponents/AddHouse";

const sampleData = [
  {
    name: "Block 1",
    lots: [
      {
        lot: "1",
        resident: "Maricar Reyes",
        ownerStatus: "OWNER",
        members: [
          { name: "Juanito Reyes", type: "Family" },
          { name: "Francisco Reyes", type: "Family" },
          { name: "Richard Tan", type: "Employee" },
        ],
      },
      {
        lot: "2",
        resident: "Romeo Hart",
        ownerStatus: "TENANT",
        members: [{ name: "Mary Smith", type: "Family" }],
      },
      {
        lot: "3",
        resident: "Ash Yamzon",
        ownerStatus: "OWNER",
        members: [{ name: "Mary Smith", type: "Family" }],
      },
    ],
  },
  {
    name: "Block 2",
    lots: [
      {
        lot: "1",
        resident: "Romeo Hart",
        ownerStatus: "OWNER",
        members: [
          { name: "Robert Johnson", type: "Family" },
          { name: "Emily Johnson", type: "Family" },
        ],
      },
    ],
  },
  {
    name: "Block 3",
    lots: [
      {
        lot: "1",
        resident: "Robert Johnson",
        ownerStatus: "OWNER",
        members: [
          { name: "Robert Johnson", type: "Family" },
          { name: "Emily Johnson", type: "Family" },
        ],
      },
    ],
  },
  {
    name: "Block 4",
    lots: [
      {
        lot: "1",
        resident: "Ash Yamzon",
        ownerStatus: "OWNER",
        members: [
          { name: "Robert Johnson", type: "Family" },
          { name: "Emily Johnson", type: "Family" },
        ],
      },
    ],
  },
];

const ITEMS_PER_PAGE = 2;

const Houses = () => {
  const [filteredBlocks, setFilteredBlocks] = useState(sampleData);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedBlocks, setSelectedBlocks] = useState(
    sampleData.reduce((acc, block) => ({ ...acc, [block.name]: true }), {})
  );

  const [openBlock, setOpenBlock] = useState(null);
  const [selectedLot, setSelectedLot] = useState(null);
  const [blockName, setBlockName] = useState(null);
  const [newMember, setNewMember] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddHouseVisible, setAddHouseVisible] = useState(false);

  const toggleFilterVisibility = () => setFilterVisible((prev) => !prev);

  const handleBlockSelection = (blockName) => {
    const updatedSelection = {
      ...selectedBlocks,
      [blockName]: !selectedBlocks[blockName],
    };
    setSelectedBlocks(updatedSelection);
    setFilteredBlocks(
      sampleData.filter((block) => updatedSelection[block.name])
    );
    setCurrentPage(1);
  };

  const handleLotClick = (lot, blockName) => {
    setSelectedLot(lot);
    setBlockName(blockName);
  };

  const handleAddMember = (member) => {
    if (selectedLot) {
      setSelectedLot((prev) => ({
        ...prev,
        members: [...prev.members, member],
      }));
      setNewMember("");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredBlocks(
      sampleData
        .map((block) => ({
          ...block,
          lots: block.lots.filter(
            (lot) =>
              lot.lot.toLowerCase().includes(query) ||
              lot.resident.toLowerCase().includes(query) ||
              lot.members.some((member) =>
                member.name.toLowerCase().includes(query)
              )
          ),
        }))
        .filter((block) => block.lots.length > 0)
    );
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleAddHouse = (newHouse) => {
    const blockExists = filteredBlocks.find(
      (block) => block.name === newHouse.name
    );

    if (blockExists) {
      // If the block exists, add the new lot to it
      setFilteredBlocks((prevBlocks) =>
        prevBlocks.map((block) =>
          block.name === newHouse.name
            ? { ...block, lots: [...block.lots, ...newHouse.lots] }
            : block
        )
      );
    } else {
      // If the block doesn't exist, add the new block
      setFilteredBlocks((prevBlocks) => [...prevBlocks, newHouse]);
    }
    setAddHouseVisible(false);
    setCurrentPage(1);
  };

  // Calculate the blocks to display based on pagination
  const paginatedBlocks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredBlocks.slice(startIndex, endIndex);
  }, [filteredBlocks, currentPage]);

  // Pagination control functions
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredBlocks.length / ITEMS_PER_PAGE);
  const showPrevNext = totalPages > 1;
  const showPageNumbers = totalPages <= 5;

  return (
    <div className="flex flex-col justify-between p-5 bg-gradient-to-b from-[#AEC09A] to-[#344C11] min-h-screen w-full">
      <div className="w-[calc(100%-300px)] max-w-[1200px] rounded-lg ml-[300px] box-border">
        <div className="flex justify-center items-center pt-5 mb-5">
          <img src={mainLogo} alt="Main Logo" className="w-[120px] h-auto" />
        </div>

        <div className="bg-[var(--fourth)] w-full min-h-[700px] max-h-[90vh] overflow-auto p-16 rounded-lg">
          <div className="flex justify-start items-center mb-10 space-x-10">
            <FilterButton
              isVisible={isFilterVisible}
              onToggle={toggleFilterVisibility}
              onBlockSelection={handleBlockSelection}
              blocks={sampleData}
              selectedBlocks={selectedBlocks}
              setFilteredBlocks={setFilteredBlocks}
            />
            <SearchInput
              query={searchQuery}
              onSearchChange={handleSearchChange}
            />
            <button
              onClick={() => setAddHouseVisible(true)}
              className="flex items-center px-4 py-2 bg-[var(--darkGreen)] text-white rounded-md h-14 w-40 text-lg"
            >
              Add House
            </button>
          </div>
          {selectedLot ? (
            <HouseDetails
              lot={selectedLot}
              blockName={blockName}
              onBack={() => setSelectedLot(null)}
              onAddMember={handleAddMember}
              newMember={newMember}
              setNewMember={setNewMember}
            />
          ) : (
            <>
              <BlockList
                blocks={paginatedBlocks}
                openBlock={openBlock}
                onBlockClick={setOpenBlock}
                onLotClick={(lot) => handleLotClick(lot, openBlock)}
              />
              {showPrevNext && (
                <div className="flex justify-center mt-4 space-x-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[var(--darkGreen)] text-white rounded"
                  >
                    Previous
                  </button>
                  {showPageNumbers && (
                    <>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-4 py-2 rounded ${
                              currentPage === page
                                ? "bg-[var(--mutedGreen)] text-black"
                                : "bg-[var(--darkGreen)] text-white"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </>
                  )}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[var(--darkGreen)] text-black rounded hover:bg-[var(--mutedGreen)]"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {isAddHouseVisible && (
        <AddHouse
          onAdd={handleAddHouse}
          onClose={() => setAddHouseVisible(false)}
        />
      )}
    </div>
  );
};

export default Houses;