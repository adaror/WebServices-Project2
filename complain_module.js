/**
 * Created by adaror on 06/05/2017.
 */
const data = require('./data/data.json');

//Return the JSON data file
exports.getAllComplains = ()=> {
    return data;
};

//-------------return complains by type-----------------
exports.getByType = (type)=>{
    for(let i in data.complains){
        if (data.complains[i].type == type){       //if the type in JSON file equal to the parameter
            return data.complains[i].complains;    //return the complains
        }
    }
    return false;
};

//---------return complain by user name and type of complain--------
exports.getByUserAndType = function(user,type){
    var output =`{"result":[`;                  //global string that strings the JSON

    let flag = false;                           //flag that mark if the service was found in the JSON file
    for(var i in data.complains){
        if (data.complains[i].type == type){
            flag = true;
            break;
        }
    }

    if(flag){

     for (let j in data.complains[i].complains)  {              //looking for the user name inside the type section
         if (data.complains[i].complains[j].name == user){
             output += JSON.stringify(data.complains[i].complains[j])+`,`;      //string the json file
         }
     }

     if (output == `{"result":[`){          //if the parameters was incorrect return false
         return false;
     }
     output = output.substr(0,output.length-1);     //erase the last ','
     output+=`]}`;                                  //close the JSON file
     return JSON.parse(output);                     //convers the string to JSON and send back
    }

    return false;
}
