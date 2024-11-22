import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "../superadmin/AdminDashboard.css";


const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore();

  // Fetch employees from Firestore
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const employeesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(employeesList);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, [db]);

  // Delete employee handler
  const handleDelete = async (employeeId) => {
    try {
      await deleteDoc(doc(db, "employees", employeeId)); // Delete from Firestore
      setEmployees(employees.filter((employee) => employee.id !== employeeId)); // Update the state
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-content">
        <button onClick={() => navigate("/employee-form")}>Add Employee</button>
        <button onClick={() => navigate("/add-general-admin")}>
          Add General Admin
        </button>
        <div>
          <h3>Newly Added Employees</h3>
          <ul>
            {employees.map((employee) => (
              <li key={employee.id}>
                {employee.name} {employee.surname} - {employee.role}
                <p>Role: {employee.role}</p>
                {employee.photo && <img src={employee.photo} alt="Employee" />}
                <button
                  onClick={() => navigate(`/edit-employee/${employee.id}`)}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(employee.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
