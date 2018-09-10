const express = require('express');
const router = express.Router();

module.exports = function (app) {
    app.use('/', router.get('/', require("./main")));

    // define a route to download a file
    app.get('/download/:file(*)', require("./content-download"));
};
