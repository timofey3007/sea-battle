const path = require('path');

module.exports = (req, res) => {
    let file = req.params.file;
    let fileLocation = path.resolve('./public/storage/game-files/', file);

    res.download(fileLocation, file);
};