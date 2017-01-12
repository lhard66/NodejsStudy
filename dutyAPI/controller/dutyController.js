const dbhelper = require('../dal/dbhelper');

function addDuty(dutyJson,callback) {
    if(dutyJson){
        console.log(dutyJson);
        dbhelper.insertDocuments('duty',[dutyJson],(err)=>{
            if(err){
                callback('err');
            }else {
                callback('ok');
            }
        })
    }
}

module.exports={addDuty}