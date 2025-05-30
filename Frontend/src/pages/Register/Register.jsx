import React from 'react';
import './Register.css';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState(
        {
            username : "",
            email : "",
            password: "",
            address : ""
        }
    )

    const [error, setError] = useState(''); 
    const [successMessage, setSuccessMessage] = useState(''); 

    const handleChange = (e) => {
        const {name , value} = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name] : value
        }));
        // console.log(`${name} : ${value}`);
    }

    console.log("Page loaded")
    const handleClick = async (e) =>{
        e.preventDefault();
        setError(''); 
        setSuccessMessage('');

        if (userData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return; 
        }

        if (!userData.username || !userData.email || !userData.password || !userData.address) {
            setError("Please fill in all required fields.");
            return;
        }
        try{
            const response = await axios.post("http://localhost:1000/api/users/register", userData);
            // console.log("User Registered", response.data);
            setSuccessMessage(response.data.message || "Registration Successful!");
            setUserData({
                username: "",
                email: "",
                password: "",
                address: ""
            });
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }catch(err){
            // console.log("Error", error);
            console.error("Registration failed:", err.response ? err.response.data : err);
            if (err.response) {
                setError(err.response.data.message); // Display error message from backend
            } else {
                setError('An unexpected error occurred during registration. Please try again.');
            }
        }
        // console.log("Clicked");
    };

  return (

    <div className='register-container'>
        <h1 className='title'>Register</h1>
        <div className="form">
            <form>
                <div className='input'>
                    <input
                        type='text'
                        name="username"
                        placeholder='Enter Username'
                        value= {userData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input'>
                    <input
                        type='email'
                        name="email"
                        placeholder='Enter Email'
                        value= {userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className='input'>
                    <input
                        type='password'
                        name="password"
                        placeholder='Enter Password'
                        value= {userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className='input'>
                    <input
                        type='text'
                        name="address"
                        placeholder='Enter Address'
                        value={userData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <button type='submit' onClick={handleClick}>Register</button>
                
            </form>
        </div>
    </div>
  )
}

export default Register