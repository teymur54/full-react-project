import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateById.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateById = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Accessing the employee ID from the URL
  const [employee, setEmployee] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://172.16.4.226:8080/api/employees/${id}`);
      const { firstName: prevFirstName, lastName: prevLastName } = response.data;
      setFirstName(prevFirstName);
      setLastName(prevLastName);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [id]);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://172.16.4.226:8080/api/update/${id}`, {
        firstName,
        lastName,
      });
      navigate('/employees');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="form-container unique-form">
      {error && <h1 className="unique-error">Error fetching data</h1>}
      <form onSubmit={handleSubmit} className="unique-form">
        <label className="unique-label">
          First name:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            className="unique-input"
          />
        </label>
        <label className="unique-label">
          Last name:
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            className="unique-input"
          />
        </label>
        <br />
        <button type="submit" className="unique-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateById;