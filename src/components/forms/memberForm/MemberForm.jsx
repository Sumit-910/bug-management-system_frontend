import { useState } from 'react';
import Select from 'react-select';

import './MemberForm.css';

const MemberForm = ({ users, onSubmit }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const options = users.map(user => ({
    value: user.id,
    label: user.name,
  }));

  const handleChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUsers.length > 0) {
      onSubmit(selectedUsers);
      setSelectedUsers([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Select Members</label>
        <Select
          isMulti
          options={options}
          onChange={handleChange}
          classNamePrefix="react-select"
          placeholder="Select members"
          value={options.filter(option => selectedUsers.includes(option.value))}
          styles={{
            multiValue: (base) => ({
              ...base,
              backgroundColor: '#e0e0e0',
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: '#333',
            }),
            multiValueRemove: (base) => ({
              ...base,
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#ff0000',
                color: 'white',
              },
            }),
          }}
        />
      </div>

      <button type="submit" disabled={selectedUsers.length === 0}>
        Add
      </button>
    </form>
  );
};

export default MemberForm;
