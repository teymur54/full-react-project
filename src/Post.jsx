import React, { useState } from 'react';
import axios from 'axios';
import './Post.css';

const Post = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://172.16.4.226:8080/api/add', {
        firstName,
        lastName,
      });
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
        <br />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Post;