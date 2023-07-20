import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, Checkbox, Button, TextField } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@material-ui/icons';

const TableRowComponent = ({ user, isSelected, onEdit, onDelete, onSelectRow }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedRole, setEditedRole] = useState(user.role);

  useEffect(() => {
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedRole(user.role);
  }, [user]); // Listen for changes to the "user" prop and update the state

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
    onEdit(user.id, 'name', editedName);
    onEdit(user.id, 'email', editedEmail);
    onEdit(user.id, 'role', editedRole);
  };

  const handleDelete = () => {
    onDelete(user.id);
  };

  const handleSelectRow = () => {
    onSelectRow(user.id);
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={isSelected} onChange={handleSelectRow} />
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <TextField
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            variant="outlined"
          />
        ) : (
          user.name
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <TextField
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            variant="outlined"
          />
        ) : (
          user.email
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <TextField
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
            variant="outlined"
          />
        ) : (
          user.role
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <>
            <Button variant="contained" color="primary" onClick={handleSave}>
              <SaveIcon />
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setIsEditMode(false)}>
              <CancelIcon />
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              <EditIcon />
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              <DeleteIcon />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
