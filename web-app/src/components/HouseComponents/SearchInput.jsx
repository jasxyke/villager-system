import React from "react";
import searchIcon from "../../assets/icons/search.png";

const SearchInput = ({ query, onSearchChange }) => (
  <div className="flex items-center w-4/12 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
    <img
      src={searchIcon}
      alt="Search"
      className="text-5xl text-white p-2 w-12 h-12"
    />
    <span className="w-1 h-full bg-[var(--fourth)]" />
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
