const http = require('http');

const public = require('./routes/public');

const server  = http.createServer(function (req, res) {
    if (req.url.match(/\.(css|js|png|jpg|jpeg)$/)) {
        public(req, res);

        return;
    }


    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World\n');
});

server.listen(8080);
