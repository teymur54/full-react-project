import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllEmployees.css'; // Import the CSS file
import DeleteById from './DeleteById';


const AllEmployees = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://172.16.7.34:8080/api/employees');
      setEmployeeData(response.data); // Update the employee data
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://172.16.7.34:8080/api/delete/${id}`);
      // After successful deletion, fetch updated data
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div>
      {error && <h1>Error fetching data</h1>}
      {employeeData ? (
        <ul>
          {employeeData.map((item) => (
            <div key={item.id} className="employee-container">
              <div className="name-section">
                <span>Name:</span> {item.firstName}
              </div>
              <div className="surname-section">
                <span>Surname:</span> {item.lastName}
              </div>
              <DeleteById employee={item} handleDelete={handleDelete} key={item.id} />
            </div>
          ))}
        </ul>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default AllEmployees;