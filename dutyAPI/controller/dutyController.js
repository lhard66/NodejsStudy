const dbhelper = require('../dal/dbhelper');

function addDuty(dutyJson, callback) {
    if (dutyJson) {
        dbhelper.insertDocuments('duty', [dutyJson], (err, result) => {
            if (err) {
                callback('err');
            } else {
                //更新值日次数
                //遍历值日人的姓名，与员工表相匹配，则将员工表对应的次数+1
                dutyJson.members.forEach(function (element, index) {
                    //dbhelper.updateMany('duty')
                    dbhelper.increment('member', {name: element }, {dutytimes: 1},(err)=>{
                        if(err){
                            console.log(err);
                        }
                    });
                });

                callback(result.ops[0]._id);
            }
        });
    }
}
function listDuty(callback) {
    dbhelper.find('duty', {}, {}, (err, result) => {
        if (err) {
            callback('err');
        } else {
            callback(result);
        }
    });
}
function delDuty(id, callback) {
    dbhelper.deleteById('duty', id, (err, result) => {
        if (err) {
            callback('err');
        } else {
            callback('ok');
        }
    });
}

module.exports = {addDuty, listDuty, delDuty}