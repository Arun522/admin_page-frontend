import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { FirstPage, LastPage, ChevronLeft, ChevronRight } from '@material-ui/icons';

const Pagination = ({ currentPage, totalRows, rowsPerPage, onPageChange }) => {
  // Calculate the total number of pages based on totalRows and rowsPerPage
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Handle page change event and call the onPageChange callback with the new page number
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      {/* First Page button */}
      <IconButton onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        <FirstPage />
      </IconButton>

      {/* Previous Page button */}
      <IconButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft />
      </IconButton>

      {/* Pagination buttons */}
      {[...Array(totalPages)].map((_, index) => (
        <IconButton
          key={index}
          onClick={() => handlePageChange(index + 1)}
          color={currentPage === index + 1 ? 'primary' : 'default'}
        >
          {index + 1}
        </IconButton>
      ))}

      {/* Next Page button */}
      <IconButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRight />
      </IconButton>

      {/* Last Page button */}
      <IconButton onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
        <LastPage />
      </IconButton>
    </Box>
  );
};

export default Pagination;
