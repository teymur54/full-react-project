import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FindById = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.16.7.34:8080/api/employees/48');
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <h1>Error fetching data</h1>}
      {data ? (
        <div>
        {/* Render details of the employee */}
        <div>
          Name: {data.firstName} <br />
          Surname: {data.lastName}
        </div>
      </div>
      ) : (
        'Loading...'
      )}
    </div>
  )
}

export default FindById
