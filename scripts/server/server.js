const express = require('express');
const bundleRenderer = require('./bundleRenderer');
const configDevServer = require('./config/configDevServer');

const server = express();
server.use(express.json());

let renderer = null;
configDevServer(server, ({bundle}) => {
  renderer = bundleRenderer(bundle);
});

module.exports = server;
