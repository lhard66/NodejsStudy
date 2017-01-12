const http = require('http');
const express = require('express');
const formidable = require('formidable');
const memberCtrl = require('./controller/memberController');
const dutyCtrl = require('./controller/dutyController');

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
    } else {
        res.send("err");
    }
});
app.post('/duty/addduty/', (req, res) => {
    //拿到json
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        if (fields) {
            dutyCtrl.addDuty(fields, result => {
                if (result != 'err') {
                    res.send(result);
                }
            });
        } else {
            res.send('err');
        }
    });
    //把json给控制器

    //处理异常

});
app.get('/duty/listduty', (req, res) => {
    dutyCtrl.listDuty(result => {
        if (result != 'err') {
            res.send(result);
        } else {
            res.send('error');
        }
    })
});
app.get('/duty/delduty', (req, res) => {
    let id = req.query.id;
    if (id) {
        dutyCtrl.delDuty(id, stat => {
            res.send(stat);
        });
    } else {
        res.send('err');
    }

});

app.listen(port, hostname, () => {
    console.log('Server running at http://' + hostname + ':' + port);
});