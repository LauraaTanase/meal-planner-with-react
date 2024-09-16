import React from "react";

const SearchBarComponent = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="container-fluid d-flex gap-3 align-items-center p-2">
      <div className="d-flex ms-auto w-50 align-items-center">
        <input
          type="search"
          className="form-control"
          placeholder="🔎Search recipes"
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default SearchBarComponent;
