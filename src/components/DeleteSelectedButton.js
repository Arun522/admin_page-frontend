import React from 'react';
import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const DeleteSelectedButton = ({ onDeleteSelected }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      size="small" 
      startIcon={<DeleteIcon />}
      onClick={onDeleteSelected}
      style={{ borderRadius: '20px', margin:'20px' }} 

    >
      Delete Selected
    </Button>
  );
};

export default DeleteSelectedButton;
