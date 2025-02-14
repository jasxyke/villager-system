import React, { useState, useEffect } from "react";
import FilterButton from "./FilterButton";
import SearchInput from "../../components/forms/SearchInput";
import HouseDetails from "./HouseDetails";
import BlockList from "./BlockList";
import AddHouse from "./AddHouse";
import MainLogo from "../../components/MainLogo";
import { IoAddCircleOutline } from "react-icons/io5";
import useHouses from "../../hooks/useHouses";
import { useSettings } from "../../contexts/SettingsContext";
import LoadingPage from "../../components/LoadingScreen/LoadingPage";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import { FaHome } from "react-icons/fa";
import { useAlert } from "../../contexts/AlertBox/AlertContext";

const Houses = () => {
  const [blocks, setBlocks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddHouseVisible, setAddHouseVisible] = useState(false);
  const { addHouse, searchHouseByOwnerName, loading, fetchMatchingHouses } =
    useHouses();

  const { settings, loading: settingsLoading, error } = useSettings();

  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const { showAlert } = useAlert();

  useEffect(() => {
    if (!settingsLoading && settings?.village_blocks) {
      const numberOfBlocks = parseInt(settings.village_blocks, 10);
      const blocksArray = Array.from(
        { length: numberOfBlocks },
        (_, index) => index + 1
      );
      setBlocks(blocksArray);
    }
  }, [settings, settingsLoading]);

  const handleAddMember = (member) => {};

  const handleLotClick = (house) => {
    setSelectedHouse(house);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      if (query.trim()) {
        fetchMatchingHouses(
          query,
          (results) => setSearchResults(results),
          (error) => console.error(error)
        );
      } else {
        setSearchResults([]);
      }
    }, 1000); // Wait 1 second after user stops typing

    setDebounceTimeout(newTimeout);
  };

  const handleSucces = (msg, newHouse) => {
    showAlert(msg, false);
    setSelectedHouse(newHouse);
  };

  const handleError = (msg) => {
    showAlert(msg, true);
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

  if (settingsLoading && !settings) return <LoadingPage />;

  return (
    <div className="flex flex-col justify-between p-10 py-5 bg-gradient-to-b from-[#AEC09A] to-[#344C11] w-full h-full">
      <div className="w-full rounded-lg">
        <MainLogo />

        <div className="bg-green w-full min-h-[400px] overflow-auto px-10 py-8 rounded-lg">
          <div className="flex justify-start mb-10 space-x-10">
            <div className="flex flex-col search-container">
              <SearchInput
                query={searchQuery}
                onSearchChange={handleSearchChange}
                onSearchPress={handleSearchPress}
                loading={loading}
              />
              {searchResults.length > 0 && (
                <ul className="search-results">
                  {searchResults.map((house) => (
                    <li
                      key={house.id}
                      className="search-result-item p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => {
                        setSelectedHouse(house);
                        setSearchResults([]);
                        setSearchQuery("");
                      }}
                    >
                      <FaHome className="mr-2 text-green-500" />
                      {/* House icon */}
                      {house.residents[0]?.user?.lastname},{" "}
                      {house.residents[0]?.user?.firstname}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => setAddHouseVisible(true)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-xl h-14 w-52 text-lg  hover:bg-[var(--secondary)]"
            >
              <IoAddCircleOutline size={30} color="white" className="mr-3" />
              {loading ? <LoadingContainer size={35} /> : "ADD HOUSE"}
            </button>
          </div>
          {selectedHouse ? (
            <HouseDetails
              house={selectedHouse}
              onBack={() => setSelectedHouse(null)}
            />
          ) : settingsLoading ? (
            <LoadingContainer />
          ) : (
            <BlockList blocks={blocks} onLotClick={handleLotClick} />
          )}
        </div>
      </div>

      {isAddHouseVisible && (
        <AddHouse
          onAdd={handleAddHouse}
          onClose={() => setAddHouseVisible(false)}
          loading={loading}
          blocks={blocks}
        />
      )}
    </div>
  );
};

export default Houses;
