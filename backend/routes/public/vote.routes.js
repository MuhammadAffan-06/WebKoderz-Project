const express = require('express');
const userRouter = express.Router();

const { vote } = require("../../controllers/users.controller");
const { verifyToken } = require('../../middleware/verifyToken');


userRouter
    .post("/vote", verifyToken, vote)


module.exports = userRouter;