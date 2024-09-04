import React, { useState, useMemo, useEffect } from "react";
import FilterButton from "./FilterButton";
import SearchInput from "../../components/forms/SearchInput";
import HouseDetails from "./HouseDetails";
import BlockList from "./BlockList";
import AddHouse from "./AddHouse";
import MainLogo from "../../components/MainLogo";
import { IoAddCircleOutline } from "react-icons/io5";
import useHouses from "../../hooks/useHouses";

const blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Houses = () => {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddHouseVisible, setAddHouseVisible] = useState(false);
  const { addHouse, searchHouseByOwnerName, loading } = useHouses();

  const handleAddMember = (member) => {
    //
  };

  const handleLotClick = (house) => {
    setSelectedHouse(house);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleSucces = (msg, newHouse) => {
    alert(msg);
    setSelectedHouse(newHouse);
  };

  const handleError = (msg) => {
    alert(msg);
  };

  const handleSearchPress = () => {
    searchHouseByOwnerName(
      searchQuery,
      (house) => {
        setSelectedHouse(house);
      },
      handleError
    );
  };

  const handleAddHouse = (newHouse) => {
    addHouse(newHouse, handleSucces, handleError);
    setAddHouseVisible(false);
  };

  return (
    <div className="flex flex-col justify-between p-10 py-5 bg-gradient-to-b from-[#AEC09A] to-[#344C11] w-full h-full">
      <div className="w-full rounded-lg">
        <MainLogo />

        <div className="bg-green w-full min-h-[400px] overflow-auto px-10 py-8 rounded-lg">
          <div className="flex justify-start items-center mb-10 space-x-10">
            {/* <FilterButton
              isVisible={isFilterVisible}
              onToggle={toggleFilterVisibility}
              onBlockSelection={handleBlockSelection}
              blocks={sampleData}
              selectedBlocks={selectedBlocks}
              setFilteredBlocks={setFilteredBlocks}
            /> */}
            <SearchInput
              query={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchPress={handleSearchPress}
              loading={loading}
            />
            <button
              onClick={() => setAddHouseVisible(true)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-xl h-14 w-52 text-lg  hover:bg-[var(--secondary)]"
            >
              <IoAddCircleOutline size={30} color="white" className="mr-3" />
              {loading ? "Adding house..." : "ADD HOUSE"}
              {/*Add House*/}
            </button>
          </div>
          {selectedHouse ? (
            <HouseDetails
              house={selectedHouse}
              onBack={() => setSelectedHouse(null)}
            />
          ) : (
            <>
              <BlockList blocks={blocks} onLotClick={handleLotClick} />
            </>
          )}
        </div>
      </div>

      {isAddHouseVisible && (
        <AddHouse
          onAdd={handleAddHouse}
          onClose={() => setAddHouseVisible(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Houses;
