'use strict';

exports.baseConfigs = function (req, res) {
    res.json({
        en: require('../../lang/en'),
    });
};