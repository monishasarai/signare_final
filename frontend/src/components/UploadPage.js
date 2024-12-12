import React, { useState } from 'react';
import './UploadPage.css'; // Import the CSS for styling
import Navbar from './Navbar';
const UploadPage = () => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    userName: '',
    email: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here (e.g., send data to the backend)
    console.log(formData);
  };

  return (
    <div><Navbar /> {/* Include the Navbar */}
    <div
     className="upload-page">
      <div className="form-container">
        <div className='hey'>Upload Image and Details</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="accountNumber">Account Number:</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>

          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview"   />
            </div>
          )}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UploadPage;