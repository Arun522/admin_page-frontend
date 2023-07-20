import React from 'react';
import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core';

const TableHeader = ({ isSelectAllChecked, onSelectAllChange, usersOnCurrentPage, selectedRows, onSelectRow }) => {
  const handleSelectAllChange = () => {
    onSelectAllChange();
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox checked={isSelectAllChecked} onChange={handleSelectAllChange} />
        </TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Role</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
