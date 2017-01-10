const http = require('http');
const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});
app.get('/student/:id/:name', (req, res) => {
    let id = req.params['id'];
    let name = req.params['name'];
    res.send('id=' + id + '---name=' + name);
});

app.listen(port, hostname, () => {
    console.log('Server running at http://' + hostname + ':' + port);
});