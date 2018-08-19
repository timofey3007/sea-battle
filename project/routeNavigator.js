const express = require('express');
const router = express.Router();
const routes = require("./routes");

module.exports = function (app) {
  app.use('/', router.get('/', routes.main));
  app.use('/game', router.get('/game', routes.game));
  app.use('/users', router.get('/users', routes.users));
};
