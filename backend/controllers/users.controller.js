const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require("../db/config");

const registration = async (req, res) => {
    const { name, cnic, password } = req.body;
    if (!name || !cnic || !password) {
        return res.status(400).json("Please fill out all the required fields");
    }

    try {
        // Check if the CNIC is already registered
        connection.query("SELECT * FROM users WHERE cnic = ?", [cnic], async (error, results) => {
            if (error) {
                console.error("Error fetching the registered users:", error);
                return res.status(500).json("Error fetching the registered users");
            }
            if (results.length > 0) {
                return res.status(409).json("CNIC already registered");
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                connection.query("INSERT INTO users (name, cnic, password) VALUES (?, ?, ?)", [name, cnic, hashedPassword], (error, results) => {
                    if (error) {
                        console.error("Error registering the user:", error);
                        return res.status(500).json("Error registering the user");
                    }
                    return res.status(201).json("Successfully registered");
                });
            } catch (hashError) {
                console.error("Error hashing the password:", hashError);
                return res.status(500).json("Error processing the password");
            }
        });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json("Internal server error");
    }
};
const login = async (req, res) => {
    const { cnic, password } = req.body;

    if (!cnic || !password) {
        return res.status(400).json("Please provide both CNIC and password");
    }

    // Fetch user by CNIC
    connection.query("SELECT * FROM users WHERE cnic = ?", [cnic], (error, results) => {
        if (error) {
            console.error("Error fetching the user:", error);
            return res.status(500).json("Error fetching the user");
        }

        if (results.length === 0) {
            return res.status(401).json("Invalid CNIC or password");
        }
        const user = results[0];
        if (user.approved == false) {
            return res.status(403).json("User not appproved yet! Contact admin");
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json("Error during authentication");
            }

            if (!isMatch) {
                return res.status(401).json("Invalid CNIC or password");
            }

            // Generate JWT token
            const token = jwt.sign({ userID: user.userID }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({
                message: "Login successful",
                token: token
            });
        });
    });
};
const vote = async (req, res) => {
    const { name, cnic, votedFor } = req.body;

    // Check if the voter has already voted
    connection.query("SELECT * FROM voters WHERE CNIC=?", [cnic], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json("Internal Server Error");
        }
        if (results.length === 0 || results[0].votedFor === null) {
            connection.query("INSERT INTO voters (name, cnic, votedFor) VALUES (?, ?, ?)", [name, cnic, votedFor], (insertError, insertResults) => {
                if (insertError) {
                    console.error(insertError);
                    return res.status(500).json("Internal Server Error");
                }
                return res.status(200).json("Voted Successfully");
            });
        } else {
            return res.status(400).json("User has already voted");
        }
    });
};
module.exports = {
    registration,
    login,
    vote
};
