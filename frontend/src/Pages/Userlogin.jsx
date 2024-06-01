import React, { useState } from "react";
import logo from "./logo.png";
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [cnicError, setCnicError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cnic, password })
      });
      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('token', data.token);
        console.log(sessionStorage);
        console.log('Login successful');
        navigate('/'); // Replace with the actual route you want to navigate to after login
      } else {
        console.error(data);
        alert(data); // You can replace this with a more user-friendly error display
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  const handleCnicChange = (e) => {
    const inputCnic = e.target.value;
    // Check if inputCnic is numeric
    if (/^\d+$/.test(inputCnic) || inputCnic === "") {
      setCnic(inputCnic);
      setCnicError("");
    } else {
      setCnicError("CNIC should contain only numbers");
    }
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
    background: "linear-gradient(135deg, #00401A 0%, #007F0E 100%)",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    marginBottom: "20px",
    fontSize: "36px",
    color: "#fff",
    fontFamily: "'Georgia', serif",
    textAlign: "center",
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
      <img
        src={logo}
        alt="Logo"
        style={{ marginBottom: "20px", width: "150px", marginTop: "60px" }}
      />
      <h1 style={headerStyle}>Welcome to Election Commission of Pakistan</h1>
      <h3 style={subHeaderStyle}>Login into your account</h3>
      <form style={formStyle} onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="CNIC"
          value={cnic}
          onChange={handleCnicChange}
          style={inputStyle}
          required
        />
        {cnicError && (
          <span style={{ color: "red", marginBottom: "10px" }}>
            {cnicError}
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

export default UserLogin;
