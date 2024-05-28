const express = require('express');
const adminRouter = require('./admin.route');
const privateRouter = express.Router();



privateRouter.use('/admin', adminRouter);

module.exports = privateRouter;