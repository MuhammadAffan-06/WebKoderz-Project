const express = require('express');
const publicRouter = require("../routes/public/publicRouter");
const privateRouter = require("../routes/private/privateRouter");
const router = express.Router();

router.use(publicRouter, privateRouter);

module.exports = router;
