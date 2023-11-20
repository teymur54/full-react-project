import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AllEmployees.css'; // Import the CSS file
import DeleteById from './DeleteById';
import UpdateById from './UpdateById';
import { Link } from 'react-router-dom';

const AllEmployees = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({ currentPage: 0, totalPages: 0, sortBy: 'lastName' });
  const [pageSize, setPageSize] = useState(5); // Default page size

  const pageSizeOptions = [5, 10, 15, 20]; // Page size options for the dropdown

  const fetchData = async (pageNumber, size, sortBy) => {
    try {
      const response = await axios.get(`http://172.16.4.226:8080/api/pageEmployees?pageSize=${size}&pageNumber=${pageNumber}&sortBy=${sortBy}`);
      setEmployeeData(response.data.content); // Update the employee data
      setPaginationInfo({
        currentPage: response.data.number,
        totalPages: response.data.totalPages,
        sortBy: sortBy,
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(0, pageSize, paginationInfo.sortBy); // Fetch initial data for the first page with default page size and sorting
  }, [pageSize, paginationInfo.sortBy]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://172.16.4.226:8080/api/delete/${id}`);
      // After successful deletion, fetch updated data for the current page
      fetchData(paginationInfo.currentPage, pageSize, paginationInfo.sortBy);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleUpdate = (employeeId) => {
    // Navigate to UpdateById component with the employee information for editing
    navigate(`/update/${employeeId}`);
  };

  const handlePageSizeChange = (e) => {
    const selectedPageSize = parseInt(e.target.value, 10);
    setPageSize(selectedPageSize);
  };

  const handleSortByChange = (e) => {
    const selectedSortBy = e.target.value;
    setPaginationInfo({ ...paginationInfo, sortBy: selectedSortBy });
  };

  const nextPage = () => {
    const nextPageNumber = paginationInfo.currentPage + 1;
    if (nextPageNumber < paginationInfo.totalPages) {
      fetchData(nextPageNumber, pageSize, paginationInfo.sortBy);
    }
  };

  const prevPage = () => {
    const prevPageNumber = paginationInfo.currentPage - 1;
    if (prevPageNumber >= 0) {
      fetchData(prevPageNumber, pageSize, paginationInfo.sortBy);
    }
  };

  return (
    <div className='all-employee-container'>
      {error && <h1>Error fetching data</h1>}
      <div className="pagination-options">
        <div className="pagination-elements">
          <button disabled={paginationInfo.currentPage === 0} onClick={prevPage}>
            Previous Page
          </button>
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button disabled={paginationInfo.currentPage === paginationInfo.totalPages - 1} onClick={nextPage}>
            Next Page
          </button>
          <select onChange={handleSortByChange} value={paginationInfo.sortBy}>
            <option value="lastName">Sort by Last Name</option>
            <option value="firstName">Sort by First Name</option>
          </select>
        </div>
      </div>
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
              <div key={item.id} className='buttons-div'>
                <Link to={`/update/${item.id}`}>
                  <button onClick={() => handleUpdate(item.id)} className='update-button'>Update</button>
                </Link>
                <DeleteById employee={item} handleDelete={handleDelete} />
              </div>
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