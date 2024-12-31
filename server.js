const http = require('http');
const app  = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.SERVER_PORT || 3000;

const server = http.createServer(app);

server.listen(port);