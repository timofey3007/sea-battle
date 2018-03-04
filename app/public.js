const fs = require('fs');
const path = require('path');

function public(req, res) {
    const extension = path.extname(req.url);

    let head = getHeadType(extension.substr(1));
    let relativePath = req.url.substr(1);

    res.statusCode = 200;
    res.setHeader('Content-Type', head);

    const stream = fs.createReadStream(path.resolve('public', relativePath));

    stream.pipe(res);

    stream.on('error', (error) => {
        res.writeHead(500, {'Content-Type': 'text/plain'});

        if (error.code === 'ENOENT') {
            res.end('Not found');

            return;
        }

        res.end(error.message);
    });
}

function getHeadType(extension) {
    if (extension === 'css') {
        return 'text/css';
    }

    if (extension === 'js') {
        return 'text/javascript';
    }

    if (extension === 'html') {
        return 'text/html';
    }

    if (extension === 'png') {
        return 'image/png';
    }

    if (extension === 'jpg') {
        return 'image/jpg';
    }

    if (extension === 'jpeg') {
        return 'image/jpeg';
    }

    return 'text/plain';
}

module.exports = public;