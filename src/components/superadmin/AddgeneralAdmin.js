import React, { useState } from "react";
import axios from "axios";

const AddgeneralAdmin = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "", 
    age: "",
    idNumber: "",
    role: "", 
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminData({ ...adminData, photo: reader.result }); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(adminData).forEach((key) => {
      form.append(key, adminData[key]);
    });

    try {
      console.log(adminData);
      await axios.post("http://localhost:3001/admins", adminData);

      window.localStorage.setItem("emailForSignIn", adminData.email);
      alert(
        `Admin added successfully. ${adminData.email}.`
      );
    } catch (error) {
      console.error("Error adding admin:", error.message);
      alert("Error adding admin. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add General Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={adminData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={adminData.surname}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={adminData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={adminData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={adminData.age}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="idNumber"
          placeholder="ID Number"
          value={adminData.idNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
};

export default AddgeneralAdmin;
