const TranslationsController = require('../controllers/TranslationsController');

module.exports = function (router) {
    return router.get('/lang', TranslationsController.baseConfigs)
};