import React, { useState } from "react";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [cnicError, setCnicError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, cnic, password })
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        console.error(data);
        alert(data);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  const handleClick = () => {
    navigate('/login');
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

  const loginTextStyle = {
    marginTop: "20px",
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
  };

  const loginButtonStyle = {
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

  return (
    <div style={containerStyle}>
      <img
        src={logo}
        alt="Logo"
        style={{ marginBottom: "20px", width: "150px", marginTop: "100px" }}
      />
      <h1 style={headerStyle}>Register with Election Commission of Pakistan</h1>
      <h3 style={subHeaderStyle}>Create your account</h3>
      <form style={formStyle} onSubmit={handleRegister}>
        <h2>Registration</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          required
        />
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
          Register
        </button>
      </form>
      <p style={loginTextStyle}>Already have an account?</p>
      <button onClick={handleClick} style={loginButtonStyle}>Login</button>
    </div>
  );
};

export default UserRegistration;
