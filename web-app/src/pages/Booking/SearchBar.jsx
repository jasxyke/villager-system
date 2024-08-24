import React, { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Search:", search);
  };

  return (
    <div className="flex items-center bg-green rounded-lg w-64">
      <button
        onClick={handleSubmit}
        className="bg-green px-4 py-2 rounded-l-lg hover:bg-paleGreen"
      >
        🔍
      </button>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full py-2 px-4 text-white rounded-r-lg bg-green"
      />
    </div>
  );
};

export default SearchBar;
