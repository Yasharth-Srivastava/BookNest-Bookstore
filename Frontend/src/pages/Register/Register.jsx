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
        try{
            const response = await axios.post("http://localhost:1000/api/users/register", userData);
            // console.log("User Registered", response.data);
            alert("Registration Successful");
            navigate('/login');
        }catch(error){
            // console.log("Error", error);
            alert("Someting went wrong");
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

                <button type='submit' onClick={handleClick}>Register</button>
                
            </form>
        </div>
    </div>
  )
}

export default Register