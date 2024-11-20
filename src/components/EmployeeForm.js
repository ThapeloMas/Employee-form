import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/EmployeeForm.css";

function EmployeeForm() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    idNumber: "",
    role: "",
    photo: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/employees/${currentId}`, form);
      } else {
        await axios.post("http://localhost:5000/employees", form);
      }
      fetchEmployees();
      setFormData({
        name: "",
        surname: "",
        age: "",
        idNumber: "",
        role: "",
        photo: null,
      });
      setIsEditing(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
    setCurrentId(employee.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.idNumber.includes(searchQuery)
  );

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="idNumber"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />
        <input type="file" name="photo" onChange={handleChange} />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <input
        type="text"
        placeholder="Search by ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div>
        {filteredEmployees.map((employee) => (
          <div key={employee.id}>
            <p>
              {employee.name} {employee.surname}
            </p>
            <p>Age: {employee.age}</p>
            <p>ID: {employee.idNumber}</p>
            <p>Role: {employee.role}</p>
            {employee.photo && <img src={employee.photo} alt="Employee" />}

            <button onClick={() => handleEdit(employee)}>Edit</button>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeForm;
