var probe = require('probe');
var http = require('http');
var net = require('net');
var EventEmitter = require('events').EventEmitter;
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html","charset":"utf-8"});
    res.write(probe.start());//html檔頭
    res.write(probe.body(new EventEmitter(), 'events.EventEmitter', true));//偵測EventEmitter
    res.write(probe.body(net.createServer(function(c){}), 'net.Server', true));//偵測net.Server
    res.write(probe.body(http, 'http', true));//偵測http
    res.write(probe.body(server, 'http.Server', true));//偵測http.Server
    res.write(probe.body(req, 'http.ServerRequest', true));//偵測http.ServerRequest
    res.write(probe.body(res, 'http.ServerResponse', true));//偵測http.ServerResponse
    res.write(probe.end());//html結束
    res.end();
});
server.listen(8443, 'localhost');
