const http = require('http');

const app = require('./app'); //importing app.js

const port = process.env.PORT || 3000;

const server =  http.createServer(app); //passing app as a parameter

server.listen(port);