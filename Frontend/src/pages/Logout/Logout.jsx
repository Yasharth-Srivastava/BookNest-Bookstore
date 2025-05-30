import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
        localStorage.removeItem("user");
        navigate(`/login`);
}

export default Logout