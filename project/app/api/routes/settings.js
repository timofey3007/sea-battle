const SettingsController = require('../controllers/SettingsController');

module.exports = function (router) {
    return router.get('/config', SettingsController.baseConfigs)
};