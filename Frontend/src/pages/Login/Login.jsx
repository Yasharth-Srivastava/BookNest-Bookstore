import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {

    const navigate = useNavigate();
    const [userAuth, setUserAuth] = useState(
        {
            userEmail: "",
            userPassword: ""
        }
    )

    const [error, setError] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUserAuth((prevUser) => ({
            ...prevUser,
            [name]:value
        }))
        // console.log(`Changed, ${name}, ${value}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setSuccessMessage('');

        if (!userAuth.userEmail || !userAuth.userPassword) {
            setError("Please enter both email and password.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:1000/api/users/login", userAuth);
            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                console.log("Login successful:", response.data.user);
                
                setSuccessMessage(response.data.message || "Login successful!");
                setTimeout(() => {
                    navigate(`/home`); 
                }, 500); 
            } else {
                setError("Login failed. Invalid Credentials.");
            }
            navigate(`/home`);
        } catch (err) {
            // console.log("error")
            if (err.response) {
                setError(err.response.data.message); // Display error message from backend
            } else {
                setError('An unexpected error occurred during login. Please try again.');
            }
        }
        // console.log("clicked");
    }
  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="login-form-wrapper">
        <form className="login-form">
          <input
            type="email"
            name="userEmail"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="userPassword"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />

          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          
          <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
