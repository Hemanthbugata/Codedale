import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import UserProfile from '../components/UserProfile';
import NotFound from '../components/NotFound';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <nav>
        <NavLink to="/">Home</NavLink> | <NavLink to="/about">About</NavLink> |{' '}
        <NavLink to="/contact">Contact</NavLink> | <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;