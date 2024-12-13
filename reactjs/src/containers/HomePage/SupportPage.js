import React, { useState } from 'react';
import axios from 'axios';
import './SupportPage.scss';

const SupportPage = () => {
  const [formData, setFormData] = useState({ email: '', name: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/support', formData);
      setSuccessMessage('Support request submitted successfully!');
      setErrorMessage('');
      setFormData({ email: '', name: '', message: '' });
    } catch (error) {
      setErrorMessage('Failed to submit support request.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="support-container">
      <h1>Support Page</h1>
      {successMessage && <p className="message success">{successMessage}</p>}
      {errorMessage && <p className="message error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SupportPage;
