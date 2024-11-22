import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/auth";
import Login from "./components/superadmin/Login";
import Register from "./components/superadmin/Register";
import AdminDashboard from "./components/superadmin/AdminDashboard";
import EmployeeForm from "./components/EmployeeForm";
import AddgeneralAdmin from "./components/superadmin/AddgeneralAdmin";
import GeneralAdmindash from "./generaladmin/GeneralAdmindash";

const EmailLinkHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = firebase.auth();

    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // If email not in storage, ask the user
        email = window.prompt("Please provide your email for confirmation:");
      }

      auth
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          console.log("Successfully signed in", result);
          window.localStorage.removeItem("emailForSignIn");
          navigate("/general-admin-dash"); // Redirect to GeneralAdmindash
        })
        .catch((error) => {
          console.error("Error signing in with email link", error);
        });
    }
  }, [navigate]);

  return <p>Validating email link...</p>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
        <Route path="/add-general-admin" element={<AddgeneralAdmin />} />
        <Route path="/general-admin-dash" element={<GeneralAdmindash />} />
        <Route path="/email-handler" element={<EmailLinkHandler />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
