const dbhelper = require('../dal/dbhelper');

function addMember(memJson,callback) {
    //对数据进行合法性验证
    //1.拿到json数据
    if (memJson && memJson.num && memJson.name) {
        dbhelper.insertDocuments('member', [memJson], (error,result) => {
            if (error) {
                callback('err');
            }else {
                callback(result.ops[0]._id);
            }
        });
    }else {
        callback('err');
    }
}
function listMember(callback) {
    dbhelper.find('member', {}, {}, (err, docs) => {
        if (!err) {
            callback(docs);
        } else {
            callback('error');
        }
    });
}
function delMember(id, callback) {
    dbhelper.deleteById('member', id, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(result);
        }
    });
}
module.exports = {addMember, listMember, delMember}
