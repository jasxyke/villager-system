import React from "react";

import { FaSearch } from "react-icons/fa";
const SearchInput = ({ query, onSearchChange }) => (
  <div className="flex items-center w-4/12 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-primary">
    <FaSearch size={30} color="white" className="mr-2" />
    <input
      type="text"
      placeholder="SEARCH RESIDENT"
      value={query}
      onChange={onSearchChange}
      className="bg-transparent focus:outline-none w-full text-white"
    />
  </div>
);

export default SearchInput;
