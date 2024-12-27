import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({
  query,
  onSearchChange,
  onSearchPress,
  loading = false,
}) => {
  // Function to handle keypress in the input
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchChange();
    }
  };

  return (
    <div className="flex items-center w-[300px] h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-primary">
      <FaSearch size={30} color="white" className="mr-2" />
      <input
        type="text"
        placeholder="SEARCH RESIDENT"
        value={query}
        onChange={onSearchChange}
        onKeyDown={handleKeyDown}
        className="bg-transparent focus:outline-none w-full text-white"
      />
      <button
        onClick={onSearchChange}
        className="bg-secondary p-2 rounded-md mr-2 flex justify-center items-center"
      >
        {!loading ? (
          "Search"
        ) : (
          <ClipLoader color="white" loading={loading} size={20} />
        )}
      </button>
    </div>
  );
};

export default SearchInput;
