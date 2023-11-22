import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UpdateById.css';
import { useNavigate } from "react-router-dom";

const UpdateById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [rankOptions, setRankOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [error, setError] = useState(null);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://172.16.4.226:8080/api/employees/${id}`);
      const { firstName: prevFirstName, lastName: prevLastName, department, position, rank } = response.data;
      setFirstName(prevFirstName);
      setLastName(prevLastName);
      setSelectedDepartment(department.id);
      setSelectedPosition(position.id);
      setSelectedRank(rank.id);
    } catch (error) {
      setError(error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const departmentResponse = await axios.get('http://172.16.4.226:8080/api/departments');
      setDepartmentOptions(departmentResponse.data);

      const rankResponse = await axios.get('http://172.16.4.226:8080/api/ranks');
      setRankOptions(rankResponse.data);

      const positionResponse = await axios.get('http://172.16.4.226:8080/api/positions');
      setPositionOptions(positionResponse.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
    fetchDropdownData();
  }, [id]);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleRankChange = (event) => {
    setSelectedRank(event.target.value);
  };

  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://172.16.4.226:8080/api/update/${id}`, {
        firstName,
        lastName,
        department: {
          id: selectedDepartment,
        },
        position: {
          id: selectedPosition,
        },
        rank: {
          id: selectedRank,
        },
      });
      navigate('/employees')
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
        <label className="unique-label">
          Department:
          <select
            className="unique-select"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="">Select Department</option>
            {departmentOptions.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </label>
        <label className="unique-label">
          Rank:
          <select
            className="unique-select"
            value={selectedRank}
            onChange={handleRankChange}
          >
            <option value="">Select Rank</option>
            {rankOptions.map((rank) => (
              <option key={rank.id} value={rank.id}>
                {rank.name}
              </option>
            ))}
          </select>
        </label>
        <label className="unique-label">
          Position:
          <select
            className="unique-select"
            value={selectedPosition}
            onChange={handlePositionChange}
          >
            <option value="">Select Position</option>
            {positionOptions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>
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