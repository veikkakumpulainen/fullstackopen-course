import React from "react";

const Filter = ({ searchName, handleSearchChange }) => {
  return (
    <div>
      find countries <input value={searchName} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
