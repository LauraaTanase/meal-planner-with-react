import React from 'react';

const SearchBarComponent = ({ searchValue, onSearchChange }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="🔎Search for recipes"
        value={searchValue}
        onChange={(a) => onSearchChange(a.target.value)}
      />
    </div>
  );
};

export default SearchBarComponent;
