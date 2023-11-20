import React from 'react';
import axios from 'axios';

const DeleteById = ({ employee, handleDelete }) => {
  return (
    <div>
      <span>
        <button onClick={() => handleDelete(employee.id)}>Delete</button>
      </span>
      <br />
    </div>
  );
};

export default DeleteById;