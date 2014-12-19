'use strict';

var Hapi         = require('hapi'),
  server         = new Hapi.Server(),
  routes         = require('./routes/config/routes'),
  plugins        = require('./routes/config/plugins'),
  authentication = require('./routes/config/authentication'),
  mongoose       = require('mongoose').connect(process.env.DB);

server.connection({port:process.env.PORT});
mongoose.connection.once('open', function(){
  server.register(plugins, function(){
    server.auth.strategy('session', 'cookie', true, authentication);
    server.route(routes);
    server.start(function(){
      server.log('info', server.info.uri);
    });
  });
});

module.exports = server;
