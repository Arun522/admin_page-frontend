import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import DeleteSelectedButton from './DeleteSelectedButton';
import { Container, Typography, Grid, Box } from '@material-ui/core';

const AdminInterface = () => {
  // State to hold the list of all users
  const [users, setUsers] = useState([]);

  // State to hold the list of users after filtering/searching
  const [filteredUsers, setFilteredUsers] = useState([]);

  // State to hold the IDs of selected rows in the table
  const [selectedRows, setSelectedRows] = useState([]);

  // State to keep track of the current page number in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 10;

  // Fetch the list of users from the API on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the API and update the state
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle user search based on the query
  const handleSearch = (query) => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  // Handle editing a user's field
  const handleEdit = (id, field, value) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, [field]: value };
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  // Handle deleting a user
  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    // Check if the current page becomes empty after deletion
    if ((currentPage - 1) * rowsPerPage >= updatedUsers.length) {
      // If the current page is empty, set the current page to the previous page
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle selecting/unselecting a row in the table
  const handleSelectRow = (id) => {
    const isSelected = selectedRows.includes(id);
    let updatedSelectedRows = [];

    if (isSelected) {
      updatedSelectedRows = selectedRows.filter(rowId => rowId !== id);
    } else {
      updatedSelectedRows = [...selectedRows, id];
    }

    setSelectedRows(updatedSelectedRows);
  };

  // Handle selecting/unselecting all rows in the table
  const handleSelectAllRows = (selectAll) => {
    let updatedSelectedRows = [];
    if (selectAll) {
      const startIdx = (currentPage - 1) * rowsPerPage;
      const endIdx = startIdx + rowsPerPage;
      const usersOnCurrentPage = filteredUsers.slice(startIdx, endIdx);
      updatedSelectedRows = usersOnCurrentPage.map(user => user.id);
    }
    setSelectedRows(updatedSelectedRows);
  };

  // Handle deleting all selected rows
  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(user => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows([]);
  };

  // Handle changing the current page number in pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the index of the last and first rows to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Get the current rows to display on the current page
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Admin Interface
      </Typography>
      {/* Search Bar component to filter users based on search query */}
      <SearchBar onSearch={handleSearch} />

      {/* UserTable component to display the list of users in a table */}
      <UserTable
        users={currentRows}
        selectedRows={selectedRows}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelectRow={handleSelectRow}
        onSelectAllRows={handleSelectAllRows}
      />

      <Box mt={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            {/* DeleteSelectedButton to delete all selected rows */}
            <DeleteSelectedButton onDeleteSelected={handleDeleteSelected} />
          </Grid>
          <Grid item container justifyContent="center">
            {/* Pagination component to handle pagination */}
            <Pagination
              currentPage={currentPage}
              totalRows={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminInterface;
