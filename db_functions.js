/**
 * Created by adaror on 21/05/2017.
 */
/**
 * Created by adaror on 21/05/2017.
 */
var mongoose = require ('mongoose');
mongoose.connect('mongodb://db_usr:db_pass@ds149551.mlab.com:49551/complainsdb');
const conn = mongoose.connection;
mongoose.Promise = global.Promise;
var Complain = require('./define_schema');
// connect to the database
conn.on('error',
    (err)=>{
    console.log('connection error ${err}');
});

// get the all json file
exports.allComplains = function(){
    return new Promise((resolve,reject)=>{
        Complain.find({},(err,res)=>{
            if (err) reject (err);
            else{resolve(res);}
        });
    });
};
//get elements by type
exports.getByType = (type)=>{
    return new Promise((resolve,reject)=>{
        Complain.find({type:type},(err,res)=>{
            if (err) reject (err);
            else resolve(res);
        });
    });
};
//get elements by type and user name
exports.getByUserAndType = (type,userName)=>{
    return new Promise((resolve,reject)=>{
            Complain.find({type:type,"complains.name":userName},(err,res)=>{
            if (err) reject (err);
            else resolve(res);
        });
    });
};