import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
      const response = await axios.post('http://172.16.7.34:8080/api/add', {
        firstName,
        lastName,
      });
      // Clear the input fields on successful submission
      setFirstName('');
      setLastName('');
      // Handle the response data if needed
      console.log('Response:', response.data);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          First name:
          <input type="text" value={firstName} onChange={handleFirstNameChange}/>
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange}/>
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Post;
