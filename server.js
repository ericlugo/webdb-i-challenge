const express = require('express');
const accountRouter = require('./routers/accountRouter.js');

const server = express();

server.use(express.json());
server.use(`/api/accounts`, accountRouter);

server.get('/', (request, response) => {
  response.send(`
      <h1>Web DB I Challenge!</h1>
      <p>Please see the <a href='https://github.com/ericlugo/webdb-i-challenge'>README</a> for more information on where to go!</p>
    `);
});

module.exports = server;
