import React from 'react';

const SelectAllCheckbox = ({ onSelectAllRows, isChecked }) => {
  const handleSelectAllRows = () => {
    onSelectAllRows();
  };

  return (
    <div>
      <input type="checkbox" checked={isChecked} onChange={handleSelectAllRows} />
    </div>
  );
};

export default SelectAllCheckbox;
