var Hapi = require('hapi');
var fs = require('fs');

var server = new Hapi.Server();

server.connection({ port: 8001, routes: { cors: true } });

server.route({
    method: 'GET',
    path: '/launches',
    handler: function(request, reply) {
        var data=fs.readFileSync('./resources/launches.json', 'utf8');
        reply(data);
    }
})

server.route({
    method: 'GET',
    path: '/launchpads',
    handler: function(request, reply) {
        var data=fs.readFileSync('./resources/launchpads.json', 'utf8');
        reply(data);
    }
})

server.start();