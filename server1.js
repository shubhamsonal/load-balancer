const express = require('express');
const app = express();
const config = require('./config/serverConfig.json')

app.listen(config.server1.port);

app.get('/healthCheck', async function(req, res) {
    return res.status(200).send(JSON.stringify({status: true}));
});

app.get('/', function (req, res) {
    return res.status(200).send('Forwarded to server 1');
  });