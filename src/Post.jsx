import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Post.css';

const Post = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [rankOptions, setRankOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
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
    }

    fetchData();
  }, []);

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
      const requestBody = {
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
      };

      const response = await axios.post('http://172.16.4.226:8080/api/add', requestBody);

      setSelectedDepartment('');
      setSelectedRank('');
      setSelectedPosition('');
      setFirstName('');
      setLastName('');
      console.log('Response:', response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            <span className="label-text">First name:</span>
            <input
              className="form-input"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </label>
          <label className="form-label">
            <span className="label-text">Last name:</span>
            <input
              className="form-input"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </label>
          <label className="form-label">
            <span className="label-text">Department:</span>
            <select
              className="form-select"
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
          <label className="form-label">
            <span className="label-text">Rank:</span>
            <select
              className="form-select"
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
          <label className="form-label">
            <span className="label-text">Position:</span>
            <select
              className="form-select"
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
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
  );
};

export default Post;