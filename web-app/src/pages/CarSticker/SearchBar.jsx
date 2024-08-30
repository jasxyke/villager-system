import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search query:", query);
  };

  return (
    <div className="">
      <div className="">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="flex-grow p-2 border border-gray-300 rounded-l-lg outline-none w-96"
        />
        <button
          onClick={handleSearch}
          className="bg-secondary text-white p-2 rounded-r-lg hover:bg-paleGreen"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
