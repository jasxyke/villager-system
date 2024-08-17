import React from "react";
import searchIcon from "../../assets/icons/search.png";

const SearchInput = ({ query, onSearchChange }) => (
  <div className="flex items-center px-4 py-2 bg-[var(--darkGreen)] text-white rounded-md h-14 w-96 text-lg">
    <img src={searchIcon} alt="Search" className="mr-2 w-5 h-5" />
    <input
      type="text"
      placeholder="SEARCH RESIDENT"
      value={query}
      onChange={onSearchChange}
      className="bg-transparent focus:outline-none w-full"
    />
  </div>
);

export default SearchInput;
