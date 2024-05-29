const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require("../db/config");


const registration = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json("Please fill out all the required fields");
    }

    try {
        // Check if the email is already registered
        connection.query("SELECT * FROM admins WHERE email = ?", [email], async (error, results) => {
            if (error) {
                console.error("Error fetching the registered admins:", error);
                return res.status(500).json("Error fetching the registered admins");
            }
            if (results.length > 0) {
                return res.status(409).json("email already registered");
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);

                connection.query("INSERT INTO admins (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (error, results) => {
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
const approval = (req, res) => {
    const { userID } = req.body;

    if (!userID) {
        return res.status(400).json("UserID is required");
    }

    // Fetch user by userID
    connection.query("SELECT * FROM users WHERE userID = ?", [userID], (error, results) => {
        if (error) {
            console.error("Error fetching the user:", error);
            return res.status(500).json("Error fetching the user");
        }

        if (results.length === 0) {
            return res.status(404).json("User not found");
        }

        const user = results[0];

        // Check if user is already approved
        if (user.approved) {
            return res.status(409).json("User is already approved");
        }

        // Update user approval status to true
        connection.query("UPDATE users SET approved = ? WHERE userID = ?", [true, userID], (updateError, updateResults) => {
            if (updateError) {
                console.error("Error updating the user:", updateError);
                return res.status(500).json("Error updating the user");
            }

            return res.status(200).json({
                message: "User approved successfully",
                userID: userID
            });
        });
    });
};
const fetchRecords = (req, res) => {
    try {
        connection.query("SELECT * FROM voters", (error, results) => {
            if (error) {
                console.error(error);
                return res.status(403);
            }
            else {
                console.table(results);
                return res.status(200).json(results);
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }

}
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json("Please provide both email and password");
    }

    // Fetch admin by CNIC
    connection.query("SELECT * FROM admins WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.error("Error fetching the user:", error);
            return res.status(500).json("Error fetching the user");
        }

        if (results.length === 0) {
            return res.status(401).json("Invalid email or password");
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json("Error during authentication");
            }

            if (!isMatch) {
                return res.status(401).json("Invalid email or password");
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


module.exports = {
    login,
    approval,
    fetchRecords,
    registration
};
