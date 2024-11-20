import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import EmployeeForm from "./components/EmployeeForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
