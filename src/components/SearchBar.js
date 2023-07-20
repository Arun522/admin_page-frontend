import React from 'react';
import { TextField } from '@material-ui/core';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <TextField
      label="Search by name, email or role"
      variant="outlined"
      onChange={handleSearch}
      fullWidth
      margin="normal"
    />
  );
};

export default SearchBar;
