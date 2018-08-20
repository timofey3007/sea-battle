module.exports = function (req, res, next) {
    res.render('main', {
        title: 'Sea battle',
        NODE_ENV: process.env.NODE_ENV,
    });
};