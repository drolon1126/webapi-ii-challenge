const express = require('express');

const apiRoutes = require('./routes/apiRoutes');

const server = express();

server.use(express.json());
server.use('/api', apiRoutes);

server.get('/', (req, res) => {
  res.send('The api is working');
});

module.exports = server;