/**
 * Created by adaror on 06/05/2017.
 */
const express         = require('express'),
      bodyParser      = require('body-parser'),
      app             = express(),
      complainModule  = require('./complain_module'),
      port            = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//-----------Send all JSON by GET method------------
app.get('/showAllComplains',
    (req,res)=>{
    let allComplains = complainModule.getAllComplains();
    res.status(200).json(allComplains);
});

//----------Send Json of complain by complain type using POST------
app.post('/getType/',
    (req,res,next)=>{
    let type = req.body.type_name;
    let parameters = complainModule.getByType(type);//call the module function
   if (parameters == false){                        //if the module return false then fallback
       next();
   }else{
   res.status(200).json(parameters);}
});

//-------------Send JSON of complains by using name and type parameters by GET method--------
app.get('/getComplainByUserAndType/:user_name/:type_name',
    (req,res,next)=>{
   let user = req.params.user_name;                                 //catch the user name parameter
   let type = req.params.type_name;                                 //catch the type parameter
   let parameters = complainModule.getByUserAndType(user,type);     //call the function

    if (parameters == false){
       next();
    }else{
    res.status(200).json(parameters);
    }
});

//----------Fallback - return error if one of the parameters was wrong-----------
app.all('*',
    (req,res)=>{
    res.json({"Error":"No Parameters Found"});
    });

//---------------listening to port-------------------
app.listen(port,
    ()=>{
    console.log(`listening on port ${port}`);
});





