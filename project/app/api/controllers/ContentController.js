'use strict';

const fs = require('fs');
const path = require('path');
const url = require('url');

exports.baseConfigs = function (req, res) {
    let dir = __dirname + '/../../../public/storage/game-files';

    scanRecursive(dir, function (error, loadingFiles) {
        if (error) throw error;

        res.json(loadingFiles.map(path => url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: '/download' + path.split('game-files')[1]
        })));
    });
};

const scanRecursive = function (dir, done) {
    let results = [];

    fs.readdir(dir, function (err, list) {
        if (err) return done(err);

        let pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function (file) {
            file = path.resolve(dir, file);

            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    scanRecursive(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};