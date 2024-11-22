import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/superadmin/AdminDashboard";
import EmployeeForm from "./components/EmployeeForm";
import AddgeneralAdmin from "./components/superadmin/AddgeneralAdmin";
import GeneralAdmindash from "./generaladmin/GeneralAdmindash";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Super Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="superadmin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-general-admin"
          element={
            <ProtectedRoute role="superadmin">
              <AddgeneralAdmin />
            </ProtectedRoute>
          }
        />

        {/* General Admin Routes */}
        <Route
          path="/general-admin-dash"
          element={
            <ProtectedRoute role="general-admin">
              <GeneralAdmindash />
            </ProtectedRoute>
          }
        />

        {/* Shared Routes */}
        <Route
          path="/employee-form"
          element={
            <ProtectedRoute>
              <EmployeeForm />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
