const dbhelper=require('../dal/dbhelper');

function addMember(memJson) {
    //对数据进行合法性验证
    //1.拿到json数据
    if(memJson&&memJson.num&&memJson.name){
        let status='ok';
        dbhelper.insertDocuments('member',[memJson],(error)=>{
            if(error){
                console.log(error);
                status='error';
            }
        });
        return status;
    }

}
module.exports = {addMember}
