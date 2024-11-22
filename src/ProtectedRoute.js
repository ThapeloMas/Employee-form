import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth"; // Assume a custom hook for authentication

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth(); // Get current user and role from context or auth hook

  if (!user) {
    return <Navigate to="/login" />; // Redirect if not logged in
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />; // Redirect if role doesn't match
  }

  return children; // Render the child components if checks pass
};

export default ProtectedRoute;
