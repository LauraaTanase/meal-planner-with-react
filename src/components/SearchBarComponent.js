import React from 'react';

const SearchBarComponent = ({ searchValue, onSearchChange, placeholder }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder='🔎search for recipes'
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBarComponent;
