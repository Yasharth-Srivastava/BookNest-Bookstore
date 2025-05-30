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
        try {
            const response = await axios.post("http://localhost:1000/api/users/login", userAuth);
            localStorage.setItem("user",JSON.stringify(response.data.user));
            // console.log(response.data);
            navigate(`/home`);
        } catch (error) {
            // console.log("error")
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
          <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
