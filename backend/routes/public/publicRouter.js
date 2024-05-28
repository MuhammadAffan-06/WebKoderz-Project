const express = require('express');
const authRouter = require('../public/auth.routes');
const userRouter = require('../public/vote.routes');
const publicRouter = express.Router();


publicRouter
    .use('/auth', authRouter)
    .use('/user', userRouter);

module.exports = publicRouter;
