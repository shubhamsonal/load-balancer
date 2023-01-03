const express = require('express');
const app = express();
const config = require('./config/serverConfig.json')

app.listen(config.server2.port);

app.get('/healthCheck', async function(req, res) {
    return res.status(200).send(JSON.stringify({status: true}));
});

app.get('/', function (req, res) {
    console.log('here we in server 22---');
    return res.status(200).send('Forwarded to server 2');
  });