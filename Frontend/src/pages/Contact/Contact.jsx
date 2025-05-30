// Contact.jsx
import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({  message: '' });
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(`${e.target.name} - ${e.target.value}`)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitted Data:", formData);
    const response = await axios.post("http://localhost:1000/api/messages/new-message", {user, formData})
    // console.log(response.data)
    alert("Thank you for contacting us!");
    setFormData({  message: '' });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <div className="contact-wrapper">
        <form className="contact-form">

          <label>Message</label>
          <textarea
            name="message"
            rows="7"
            value={formData.message}
            required
            onChange={handleChange}
            placeholder="Your Message"
          />

          <button type="submit" onClick={handleSubmit}>Send Message</button>
        </form>

        <div className="contact-info">
          <h2>Our Info</h2>
          <p><strong>Address:</strong> 123 Book Street, Knowledge City, IN</p>
          <p><strong>Email:</strong> support@booknest.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Hours:</strong> Mon–Sat: 9AM – 6PM</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
