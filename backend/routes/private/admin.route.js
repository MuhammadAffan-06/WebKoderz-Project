const express = require('express');
const adminRouter = express.Router();
const { verifyToken } = require("../../middleware/verifyToken")


const { approval, fetchRecords, registration, login, fetchAllRecords } = require('../../controllers/admin.controller');

adminRouter
    .put('/approval', verifyToken, approval)
    .get('/fetch', verifyToken, fetchRecords)
    .get('/fetch-all', verifyToken, fetchAllRecords)
    .post('/registration', registration)
    .post('/login', login);

module.exports = adminRouter;