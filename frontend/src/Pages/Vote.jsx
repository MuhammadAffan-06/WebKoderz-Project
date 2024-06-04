import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import logo from "./logo.png";

const Vote = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [cnic, setCnic] = useState("");
    const [votedFor, setVotedFor] = useState("PPP");
    const [nameError, setNameError] = useState("");
    const [cnicError, setCnicError] = useState("");

    const handleVote = async (e) => {
        e.preventDefault();
        if (!name || nameError || !cnic || cnicError) {
            alert("Please fill out the form correctly.");
            return;
        }
        try {
            const response = await fetch('http://localhost:5001/user/vote', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, cnic, votedFor })
            });
            const data = await response.json();

            if (response.ok) {
                console.log('Vote submitted successfully');
                alert('Vote submitted successfully');
                navigate('/');
            } else {
                console.error(data);
                alert(data);
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            alert('An error occurred while submitting your vote. Please try again.');
        }
    };

    const handleNameChange = (e) => {
        const inputName = e.target.value;
        if (/^[A-Za-z\s]*$/.test(inputName) || inputName === "") {
            setName(inputName);
            setNameError("");
        } else {
            setNameError("Name should not contain numbers");
        }
    };

    const handleCnicChange = (e) => {
        const inputCnic = e.target.value;
        if (/^\d*$/.test(inputCnic)) {
            setCnic(inputCnic);
            setCnicError("");
        } else {
            setCnicError("CNIC should contain only numbers");
        }
    };

    const outerContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #00401A 0%, #007F0E 100%)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

    const headerStyle = {
        marginBottom: "20px",
        fontSize: "36px",
        color: "white",
        fontFamily: "'Georgia', serif",
        textAlign: "center",
    };

    const descriptionStyle = {
        marginBottom: "20px",
        fontSize: "18px",
        color: "white",
        textAlign: "center",
        maxWidth: "600px",
        lineHeight: "1.5",
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
        boxSizing: "border-box",
    };

    const inputStyle = {
        marginBottom: "20px",
        padding: "15px",
        borderRadius: "8px",
        border: "2px solid #ccc",
        fontSize: "16px",
        width: "100%",
        boxSizing: "border-box",
        transition: "all 0.3s ease",
        outline: "none",
    };

    const selectStyle = {
        marginBottom: "20px",
        padding: "15px",
        borderRadius: "8px",
        border: "2px solid #ccc",
        fontSize: "16px",
        width: "100%",
        boxSizing: "border-box",
        transition: "all 0.3s ease",
        outline: "none",
    };

    const buttonStyle = {
        padding: "15px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "red",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold",
        width: "100%",
        boxSizing: "border-box",
        transition: "all 0.3s ease",
    };

    return (
        <>
            <Navbar />
            <div style={outerContainerStyle}>
                <div style={containerStyle}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ marginBottom: "20px", width: "150px", marginTop: "100px" }}
                    />
                    <h1 style={headerStyle}>Vote</h1>
                    <p style={descriptionStyle}>
                        Voting is a fundamental right and a cornerstone of democracy. Your vote is your voice in deciding the future of our nation. By participating in the election process, you contribute to shaping the policies and leadership that will impact our lives. Make sure your voice is heard—cast your vote today!
                    </p>
                    <form style={formStyle} onSubmit={handleVote}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={handleNameChange}
                            style={inputStyle}
                            required
                        />
                        {nameError && <span style={{ color: "red", marginBottom: "10px" }}>{nameError}</span>}
                        <input
                            type="text"
                            placeholder="CNIC"
                            value={cnic}
                            onChange={handleCnicChange}
                            style={inputStyle}
                            required
                        />
                        {cnicError && <span style={{ color: "red", marginBottom: "10px" }}>{cnicError}</span>}
                        <label htmlFor="">Select a Party:</label>
                        <select
                            value={votedFor}
                            onChange={(e) => setVotedFor(e.target.value)}
                            style={selectStyle}
                            required
                        >
                            <option value="PPP">PPP</option>
                            <option value="MQM">MQM</option>
                            <option value="PMLN">PMLN</option>
                            <option value="TLP">TLP</option>
                        </select>
                        <button type="submit" style={buttonStyle}>Submit Vote</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Vote;
