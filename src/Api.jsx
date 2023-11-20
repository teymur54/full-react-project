import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Api = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfRURJVE9SIl0sImlhdCI6MTcwMDIwMDE4OSwiZXhwIjoxNzAwMjI4OTg5fQ.r1zEtip6rb5KQc2-a45_xZxLablrL1iEH0xedoMDpPc'; 
        const response = await axios.get(
          'http://172.16.4.226:8080/api/v1/allEmployees', 
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });
        const data = response.data
        setData(data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
  //   <div>
  //   {error && <p>Error: {error}</p>}
  //   {data.length === 0 ? (
  //     <p>Loading...</p>
  //   ) : (
  //     <ul>
  //       {data.map((item) => (
  //         <li key={item.id}>{item.name}</li>
  //       ))}
  //     </ul>
  //   )}
  // </div>
  <div>
    {error && <h1>ERROR</h1>}
    {data ? data.map((item) => (
    <>
    <li key={item.id}>{JSON.stringify(item.firstName)}</li>
    <li key={item.id+1}>{JSON.stringify(item.lastName)}</li>
    </>
  )) : 'no'}
  </div>
  );
};

export default Api;