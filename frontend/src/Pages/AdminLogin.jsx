import React, { useState } from "react";
import logo from "./logo.png";
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('token', data.token);
                console.log(sessionStorage);
                console.log('Login successful');
                navigate('/admin-dashboard');
            } else {
                console.error(data);
                alert(data);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
    };

    const handleClick = () => {
        navigate('/register');
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "black",
        // background: "linear-gradient(135deg, #00401A 0%, #007F0E 100%)",
        fontFamily: "Arial, sans-serif",
    };

    const subHeaderStyle = {
        marginBottom: "20px",
        fontSize: "18px",
        color: "#fff",
        textAlign: "center",
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        width: "300px",
    };

    const inputStyle = {
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "16px",
        width: "100%",
    };

    const buttonStyle = {
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "red",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold",
        width: "100%",
    };

    const registerButtonStyle = {
        marginTop: "10px",
        padding: "10px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#007F0E",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold",
        width: "100px",
        textAlign: "center",
    };

    const registerTextStyle = {
        color: "#fff",
        marginTop: "20px",
        textAlign: "center",
        fontSize: "16px",
    };

    return (
        <div style={containerStyle}>
            <h3 style={subHeaderStyle}>Admin Login</h3>
            <form style={formStyle} onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    style={inputStyle}
                    required
                />
                {emailError && (
                    <span style={{ color: "red", marginBottom: "10px" }}>
                        {emailError}
                    </span>
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>
                    Login
                </button>
            </form>
            <p style={registerTextStyle}>Don't have an account? Create one</p>
            <button onClick={handleClick} style={registerButtonStyle}>Register</button>
        </div>
    );
};

export default AdminLogin;
