import React, { useState } from 'react';
import './App.css';
import Home from './Home';
import About from './About';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Post from './Post';
import AllEmployees from './AllEmployees';
import DeleteById from './DeleteById';
import UpdateById from './UpdateById';

function App() {
  const [focusedLink, setFocusedLink] = useState(null);

  const handleLinkClick = (linkName) => {
    setFocusedLink(linkName);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link
          to="/"
          className={`nav-link ${focusedLink === 'home' ? 'focused' : ''}`}
          onClick={() => handleLinkClick('home')}
        >
          Home
        </Link>
        <Link
          to="/post"
          className={`nav-link ${focusedLink === 'post' ? 'focused' : ''}`}
          onClick={() => handleLinkClick('post')}
        >
          Post
        </Link>
        <Link
          to="/employees"
          className={`nav-link ${focusedLink === 'employees' ? 'focused' : ''}`}
          onClick={() => handleLinkClick('employees')}
        >
          Employees List
        </Link>
        <Link
          to="/about"
          className={`nav-link ${focusedLink === 'about' ? 'focused' : ''}`}
          onClick={() => handleLinkClick('about')}
        >
          About
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post" element={<Post />} />
        <Route path="/employees" element={<AllEmployees />} />
        <Route path="/delete" element={<DeleteById />} />
        <Route path="/update/:id" element={<UpdateById />} />
      </Routes>
    </Router>
  );
}

export default App;