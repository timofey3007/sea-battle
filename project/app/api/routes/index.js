const express = require('express');
const router = express.Router();

const apiPrefix = '/api/v1';

const apiRoutes = {
    settings: require("./settings")
};

module.exports = function (app) {
    app.use(apiPrefix, apiRoutes.settings(router));
};
