const serverRoutes = require("./routes");
const apiRoutes = require("./app/api/routes");

module.exports = function (app) {
    serverRoutes(app);

    apiRoutes(app);
};
