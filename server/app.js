var connect = require('connect'),
    serveStatic = require('serve-static'),
    morgan = require('morgan'),
    port = process.env.PORT,

    app = connect();

app.use(morgan('dev'));
app.use(serveStatic('public'));

app.listen(port);
console.log('Node listening on port ' + port);
