import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../superadmin/Navbar.css"

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or local storage
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/add-general-admin">Add General Admin</Link>
        </li>
        <li>
          <Link to="/employee-form">Add Employee</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
