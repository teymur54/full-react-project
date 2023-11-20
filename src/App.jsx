import React from 'react';
import './App.css';
import Home from './Home';
import About from './About';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Post from './Post';
import AllEmployees from './AllEmployees';
import DeleteById from './DeleteById';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/post" className="nav-link">
          Post
        </Link>
        <Link to="/employees" className="nav-link">
          Employees List
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/post' element={<Post />} />
        <Route path='/employees' element={<AllEmployees />} />
        <Route path='/delete' element={<DeleteById />} /> 
      </Routes>
    </Router>
  );
}

export default App;