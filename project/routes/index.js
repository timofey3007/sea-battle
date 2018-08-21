const express = require('express');
const router = express.Router();

module.exports = function (app) {
    app.use('/', router.get('/', require("./main")));
};
