const express = require('express');
const adminRouter = express.Router();
const { verifyToken } = require("../../middleware/verifyToken")


const { approval, fetchRecords, registration } = require('../../controllers/admin.controller');

adminRouter
    .put('/approval', verifyToken, approval)
    .get('/fetch', verifyToken, fetchRecords)
    .post('/registration', registration);

module.exports = adminRouter;