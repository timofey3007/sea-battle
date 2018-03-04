const sys = require('sys');
const http = require('http');
const router = require('./app/router');

// const public = require('./routes/public');

// const server  = http.createServer(function (req, res) {
//     if (req.url.match(/\.(css|js|png|jpg|jpeg)$/)) {
//         public(req, res);
//
//         return;
//     }
//
//
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('Hello World\n');
// });

const server = http.createServer(function (req, res) {
    let handler = router.route(req);

    handler.process(req, res);
});

server.listen(80);
sys.puts('Server is running');
