const express = require('express');
const authRouter = express.Router();

const { registration, login } = require("../../controllers/users.controller")

authRouter
    .post('/registration', registration)
    .post('/login', login)

module.exports = authRouter;