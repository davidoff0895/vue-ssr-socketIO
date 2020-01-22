const express = require('express');
const bundleRenderer = require('./bundleRenderer');
const configDevServer = require('./config/configDevServer');
const data = require('./common/info');

const server = express();
server.use(express.json());

let renderer = null;
configDevServer(server, ({bundle}) => {
  renderer = bundleRenderer(bundle);
});
let tableInfo = data;
server.post('/socket.io/', (req, res) => {
  res.end(JSON.stringify(tableInfo))
});

module.exports = server;
