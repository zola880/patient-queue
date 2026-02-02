import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>WEREFA-PRO</h1>
          <p>Smart Patient Queue Management System</p>
        </div>
      </header>

      {/* Main Actions */}
      <main className="home-container">
        <div className="card-grid">
          <Link to="/register" className="card">
            <h3>Patient Registration</h3>
            <p>Register patients quickly and easily</p>
          </Link>

          <Link to="/status" className="card">
            <h3>Queue Status</h3>
            <p>Check your current position in the queue</p>
          </Link>

          <Link to="/emergency" className="card emergency">
            <h3>Emergency</h3>
            <p>Immediate priority access</p>
          </Link>

          <Link to="/staff" className="card staff">
            <h3>Staff Login</h3>
            <p>Secure access for hospital staff</p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 WEREFA-PRO. All rights reserved.</p>
        <p>Contact: info@werefa-pro.com | +251 989 000 256</p>
      </footer>
    </div>
  );
};

export default Home;
