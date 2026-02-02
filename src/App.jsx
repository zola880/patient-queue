import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import StaffDashboard from './components/StaffDashboard';
import WaitingStatus from './components/WaitingStatus';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <header style={{ background: '#5abfcc', padding: '15px', textAlign: 'center', color: 'white' }}>
        <h1>WEREFA-PRO</h1>
        <nav>
          <Link to="/" style={navLink}>Home</Link>
          <Link to="/register" style={navLink}>Register</Link>
          <Link to="/status" style={navLink}>Queue</Link>
          <Link to="/contact" style={navLink}>Contact</Link>
          <Link to="/staff" style={navLink}>Staff</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/status" element={<WaitingStatus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/staff" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

const navLink = { color: 'white', margin: '0 10px', textDecoration: 'none', fontWeight: 'bold' };

export default App;