/**
 * Created by adaror on 06/05/2017.
 */
const data = require('./data/data.json');

exports.getAllComplains = ()=> {
    return data;
};

exports.getByType = (type)=>{
    for(let i in data.complains){
        if (data.complains[i].type == type){
            return data.complains[i].complains;
        }
    }
    return false;
};

exports.getByUserAndType = function(user,type){
    var output =`{"result":[`;

    let flag = false;
    for(var i in data.complains){
        if (data.complains[i].type == type){
            flag = true;
            break;
        }
    }

    if(flag){

     for (let j in data.complains[i].complains)  {
         if (data.complains[i].complains[j].name == user){
             output += JSON.stringify(data.complains[i].complains[j])+`,`;
         }
     }

     if (output == `{"result":[`){
         return false;
     }
     output = output.substr(0,output.length-1);
     output+=`]}`;
     return JSON.parse(output);
    }

    return false;
}
