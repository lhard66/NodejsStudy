const dbhelper=require('../dal/dbhelper');

function addMember(memJson) {
    //对数据进行合法性验证
    //1.拿到json数据
    if(memJson&&memJson.num&&memJson.name){
        console.log([memJson]);
        dbhelper.insertDocuments('member',[memJson],(error,result)=>{
           console.log(result);
        });
    }
    //2.插入数据库

}
module.exports = {addMember}
