var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var valueSchema = new schema({
    name:String,
    complain:String
});

var complainSchema = new schema({
            complainId:Number,
            type:String,
            complains:[valueSchema]
    },{collection: 'complainsDB'});
var Complain = mongoose.model('complain',complainSchema);
module.exports = Complain;