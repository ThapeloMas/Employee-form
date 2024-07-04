import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    id: '',
    position: '',
    phone: '',
    email: '',
    avatar: null,
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
    setSubmittedData(formData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleRemove = () => {
    setSubmittedData(null);
    setFormData({
      fname: '',
      lname: '',
      id: '',
      position: '',
      phone: '',
      email: '',
      avatar: null,
    });
  };
  


  return (
    <div className="App">
      {!submittedData || isEditing ? (
        <form className="form" onSubmit={handleSubmit}>
        <h2 className='heads'>Employee registration form 📝</h2>
          <label className="avatar">
            Avatar:
            <input type="file" name="avatar" onChange={handleChange} />
          </label>
          <label className="fname">
            First Name:
            <input type="text" name="fname"  pattern="[A-Za-z]*" minLength={2} placeholder="Enter letters only"  value={formData.fname} onChange={handleChange} />
          </label>
          <label className="lname">
            Last Name:
            <input type="text" name="lname" pattern="[A-Za-z]*" minLength={2} placeholder="Enter letters only"   value={formData.lname} onChange={handleChange}/>
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
            <input type="email" name="email" placeholder='Enter your email' value={formData.email}  onChange={handleChange} />
          </label>
          <button type="submit">{isEditing ? 'Update' : 'Register'}</button>
        </form>
      ) : (
        <div className="success-message">
          <h2>Form successfully submitted!😊😊 </h2>
          <p><strong>First Name:</strong> {submittedData.fname}</p>
          <p><strong>Last Name:</strong> {submittedData.lname}</p>
          <p><strong>ID:</strong> {submittedData.id}</p>
          <p><strong>Position:</strong> {submittedData.position}</p>
          <p><strong>Phone Number:</strong> {submittedData.phone}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          {submittedData.avatar && (
            <div>
              <strong>Avatar:</strong>
              <img src={URL.createObjectURL(submittedData.avatar)} alt="avatar" className="avatar-preview" />
            </div>
          )}
          <br></br>
          <button onClick={handleEdit}>Edit</button>
          <br></br>
          <br>
          </br>
          <button onClick={handleRemove}>Remove</button>
        </div>
      )}
    </div>
  );
}

export default App;


