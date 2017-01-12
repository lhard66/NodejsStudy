const dbhelper = require('../dal/dbhelper');

function addDuty(dutyJson, callback) {
    if (dutyJson) {
        dbhelper.insertDocuments('duty', [dutyJson], (err, result) => {
            if (err) {
                callback('err');
            } else {
                callback(result.ops[0]._id);
            }
        })
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