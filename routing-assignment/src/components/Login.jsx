import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogin = () =>{
        setIsAuthenticated(true);
        navigate("/dashboard");
    }
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
    };
export default Login;