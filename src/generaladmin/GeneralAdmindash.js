import React from "react";
import { Link } from "react-router-dom";
import "./GeneralAdmindash.css"; // Import the CSS file

const GeneralAdmindash = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/employee-form" className="nav-link">
              Add Employees
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      <div className="content">
        <h2>Welcome to the General Admin Dashboard</h2>
        <p>This is where you can manage employees and your profile.</p>
      </div>
    </div>
  );
};

export default GeneralAdmindash;
