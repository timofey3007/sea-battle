const express = require('express');
const router = express.Router();

const apiPrefix = '/api/v1';

const apiRoutes = {
    translations: require("./translations"),
    settings: require("./settings"),
};

module.exports = function (app) {
    // getting application translations
    app.use(apiPrefix, apiRoutes.translations(router));

    // getting application settings
    app.use(apiPrefix, apiRoutes.settings(router));
};
