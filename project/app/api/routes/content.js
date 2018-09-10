const SettingsController = require('../controllers/ContentController');

module.exports = function (router) {
    return router.get('/content', SettingsController.baseConfigs)
};