const http = require('http');
const express = require('express');
const formidable = require('formidable');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
//静态服务
app.use('/duty',express.static('./duty'));

app.get('/', (req, res) => {
    res.send('hello world');
});
app.get('/student/:id/:name', (req, res) => {
    let id = req.params['id'];
    let name = req.params['name'];
    res.send('id=' + id + '---name=' + name);
});
app.get('/addmember', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        console.log(fields);
    });
    console.log(888);
    res.send('ok');
});

app.listen(port, hostname, () => {
    console.log('Server running at http://' + hostname + ':' + port);
});