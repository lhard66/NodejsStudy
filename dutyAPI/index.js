const http = require('http');
const express = require('express');
const formidable = require('formidable');
const memberCtrl = require('./controller/memberController');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
//静态服务
app.use('/duty', express.static('./duty'));

app.get('/', (req, res) => {
    res.send('hello world');
});
app.get('/student/:id/:name', (req, res) => {
    let id = req.params['id'];
    let name = req.params['name'];
    res.send('id=' + id + '---name=' + name);
});
app.post('/duty/addmem', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        //拿到json，交由对应的控制器处理
        let status = memberCtrl.addMember(fields.params);
        res.send(status);
    });
});
app.get('/duty/listmem', (req, res) => {
    //返回json数据
    memberCtrl.listMember(objJson => {
        res.send(objJson);
    });
});
app.get('/duty/delmem/', (req, res) => {
    let id = req.query.id;
    if (id) {
        memberCtrl.delMember(id, (error, result) => {
            res.send("ok");
        })
    }else {
        res.send("err");
    }

});

app.listen(port, hostname, () => {
    console.log('Server running at http://' + hostname + ':' + port);
});