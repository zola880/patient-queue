import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to WEREFA-Pro</h1>
        <p>Smart Queue Management for a Better Healthcare Experience</p>
      </section>

      <div className="card-grid">
        <div className="home-card">
          <div className="icon">🏥</div>
          <h3>Patients</h3>
          <p>Register for a consultation and get your digital token instantly.</p>
          <Link to="/register" className="home-btn">Register Now</Link>
        </div>

        <div className="home-card">
          <div className="icon">⏱️</div>
          <h3>Live Queue</h3>
          <p>Check your current position and estimated waiting time from anywhere.</p>
          <Link to="/status" className="home-btn secondary">View Status</Link>
        </div>

        <div className="home-card">
          <div className="icon">👨‍⚕️</div>
          <h3>Staff Portal</h3>
          <p>Manage patient flow, call the next token, and handle emergencies.</p>
          <Link to="/staff" className="home-btn staff">Login to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;