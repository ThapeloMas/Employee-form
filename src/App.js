
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    id: '',
    position: '',
    phone: '',
    email: '',
    avatar: null,
  });
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({
        ...formData,
        avatar: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing !== false) {
      const updatedEmployees = [...employees];
      updatedEmployees[currentIndex] = formData;
      axios.put(`http://localhost:5000/employees/${formData.id}`, formData)
        .then(response => {
          setEmployees(updatedEmployees);
        })
        .catch(error => {
          console.error('There was an error updating the data!', error);
        });
    } else {
      axios.post('http://localhost:5000/employees', formData)
        .then(response => {
          setEmployees([...employees, response.data]);
        })
        .catch(error => {
          console.error('There was an error posting the data!', error);
        });
    }
    setFormData({
      fname: '',
      lname: '',
      id: '',
      position: '',
      phone: '',
      email: '',
      avatar: null,
    });
    setIsEditing(false);
    setCurrentIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(employees[index]);
    setCurrentIndex(index);
    setIsEditing(true);
  };

  const handleRemove = (index) => {
    const employeeId = employees[index].id;
    axios.delete(`http://localhost:5000/employees/${employeeId}`)
      .then(response => {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
      })
      .catch(error => {
        console.error('There was an error deleting the data!', error);
      });
    setFormData({
      fname: '',
      lname: '',
      id: '',
      position: '',
      phone: '',
      email: '',
      avatar: null,
    });
    setIsEditing(false);
    setCurrentIndex(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className='heads'>Employee registration form 📝</h2>
        <label className="avatar">
          Avatar:
          <input type="file" name="avatar" onChange={handleChange} />
        </label>
        <label className="fname">
          First Name:
          <input type="text" name="fname" pattern="[A-Za-z]*" minLength={2} placeholder="Enter letters only" value={formData.fname} onChange={handleChange} />
        </label>
        <label className="lname">
          Last Name:
          <input type="text" name="lname" pattern="[A-Za-z]*" minLength={2} placeholder="Enter letters only" value={formData.lname} onChange={handleChange} />
        </label>
        <label className="id">
          ID:
          <input type="text" name="id" pattern='\d*' minLength={13} maxLength={13} placeholder='Enter only numbers' value={formData.id} onChange={handleChange} />
        </label>
        <label className="position">
          Position:
          <input type="text" name="position" placeholder='Enter your Position' value={formData.position} onChange={handleChange} />
        </label>
        <label className="phone">
          Phone Number:
          <input type="text" name="phone" pattern='\d*' minLength={10} maxLength={10} placeholder='Enter only numbers' value={formData.phone} onChange={handleChange} />
        </label>
        <label className="email">
          Email:
          <input type="email" name="email" placeholder='Enter your email' value={formData.email} onChange={handleChange} />
        </label>
        <button type="submit">{isEditing ? 'Update' : 'Register'}</button>
      </form>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search employees... 🔎"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {filteredEmployees.length > 0 && (
        <div className="employee-list">
          <h2 className='heads'>Employee List 📃</h2>
          {filteredEmployees.map((employee, index) => (
            <div key={index} className="success-message">
              <p><strong>First Name:</strong> {employee.fname}</p>
              <p><strong>Last Name:</strong> {employee.lname}</p>
              <p><strong>ID:</strong> {employee.id}</p>
              <p><strong>Position:</strong> {employee.position}</p>
              <p><strong>Phone Number:</strong> {employee.phone}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              {employee.avatar && (
                <div>
                  <strong>Avatar:</strong>
                  <img src={URL.createObjectURL(employee.avatar)} alt="avatar" className="avatar-preview" />
                </div>
              )}
              <br></br>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <br></br>
              <br></br>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;


