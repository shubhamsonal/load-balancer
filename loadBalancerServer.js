const express = require('express');
const app = express();
const axios = require('axios');

const config = require('./config/serverConfig.json')

app.listen(config.mainServer.port);

app.get('/healthCheck', async function(req, res) {
    return res.status(200).send(JSON.stringify({status: true}));
});
const serverMap = {
    1: "server1",
    2 : "server2",
    3: "server3"
}
let serverCount = 1;
const handleServers = async (req, res) => {
    try {
        serverCount += 1;
        serverCount = serverCount > 3 ? 1 :  serverCount;

        console.log(config[serverMap[serverCount]].host)
        const response = await axios({
            url: config[serverMap[serverCount]].host,
            headers: req.headers,
            method: req.method,
          });
        return res.send(response.data);        
    } catch (error) {
       await handleServers(req, res);  
    }
    console.log(req.method);
    console.log(res.headers);
    console.log(req.data);
    console.log(req.url);

    return res.status(200).send('done!!!!');
}

app.use((req, res) => { handleServers(req, res) })

