// components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="input-group mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="🔎Caută rețete..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-primary" type="button">
          Caută
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
