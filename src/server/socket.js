var args = require('minimist')(process.argv.slice(2));
var http = require('http');
var port = 8007;
var host = 'localhost';
var path = require('path');
var httpServer = http.createServer(handleHttpNew).listen(port, host);
var clientDir = path.join(__dirname, '..', 'client', 'app', 'socket');
var nodeStatic = require('node-static');
var staticFiles = new nodeStatic.Server(clientDir);
var io = require('socket.io').listen(httpServer);

if (args.help || !args.name) {
    help();
    process.exit(1);
}

var name = process.argv[2];

console.log('hello ' + args.name);

function help() {
    console.log('call me with --help');
}

function handleHttp(req, res) {
    setTimeout(function() {
        var num = Math.random();
        setTimeout(function() {
            res.end('hello' + num);
        }, 2000);
    }, 1000);
}

function handleHttpNew(req, res) {
    if (req.method === 'GET') {
        try {
            req.addListener('end', function() {
                req.url = req.url.replace(/^\/(\d+).*$/, '/$1.html');
                staticFiles.serve(req, res);
            });
            req.resume();
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log('else');
        res.writeHead(403);
        res.end('out');
    }
}
io.on('connection', handleIo);

function handleIo(socket) {
    console.log('user connected');
    var interval = setInterval(function() {
        io.emit('hello', new Date());
    }, 1000);

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('clientMsg', function(msg) {
        socket.broadcast.emit('serverMsg', msg);
    });
}