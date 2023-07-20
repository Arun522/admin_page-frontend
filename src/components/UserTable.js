import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Checkbox, IconButton, TextField } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

const UserTable = ({ users, selectedRows, onEdit, onDelete, onSelectRow, onSelectAllRows }) => {
  const [editModeId, setEditModeId] = useState(null);

  const handleEdit = (id, field, value) => {
    onEdit(id, field, value);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleSelectRow = (id) => {
    onSelectRow(id);
  };

  const handleSelectAllRows = () => {
    onSelectAllRows(selectedRows.length !== users.length);
  };

  const handleCellKeyDown = (event, user) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur(); // Save the changes when Enter is pressed
    }
  };

  const handleEditIconClick = (id) => {
    setEditModeId(id);
  };

  const handleBlur = () => {
    setEditModeId(null);
  };

  const isEditMode = (id) => editModeId === id;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox checked={selectedRows.length === users.length} onChange={handleSelectAllRows} />
          </TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Checkbox checked={selectedRows.includes(user.id)} onChange={() => handleSelectRow(user.id)} />
            </TableCell>
            <TableCell>
              {isEditMode(user.id) ? (
                <TextField
                  value={user.name}
                  onChange={(event) => handleEdit(user.id, 'name', event.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={(event) => handleCellKeyDown(event, user)}
                />
              ) : (
                user.name
              )}
            </TableCell>
            <TableCell>
              {isEditMode(user.id) ? (
                <TextField
                  value={user.email}
                  onChange={(event) => handleEdit(user.id, 'email', event.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={(event) => handleCellKeyDown(event, user)}
                />
              ) : (
                user.email
              )}
            </TableCell>
            <TableCell>
              {isEditMode(user.id) ? (
                <TextField
                  value={user.role}
                  onChange={(event) => handleEdit(user.id, 'role', event.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={(event) => handleCellKeyDown(event, user)}
                />
              ) : (
                user.role
              )}
            </TableCell>
            <TableCell>
              {isEditMode(user.id) ? (
                <IconButton onClick={() => handleBlur()}>
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleEditIconClick(user.id)}>
                  <EditIcon />
                </IconButton>
              )}
              <IconButton onClick={() => handleDelete(user.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
