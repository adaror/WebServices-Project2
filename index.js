/**
 * Created by adaror on 06/05/2017.
 */
const express         = require('express'),
      bodyParser      = require('body-parser'),
      app             = express(),
      complainModule  = require('./complain_module'),
      path            = require('path'),
      port            = process.env.PORT || 3000,
      dbFunctions     = require('./db_functions');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//-----------Send all JSON by GET method------------
app.get('/showAllComplains',
    (req,res,next)=>{
    dbFunctions.allComplains().then((result)=>{
   if (result.length===0){
       next();}
else{res.json(result);};
    }),(error)=>{next();};
});

//----------Send Json of complain by complain type using POST------
app.post('/getType/',
    (req,res,next)=>{
    let type = req.body.type_name;
    dbFunctions.getByType(type).then((result)=>{          //call the module function
        if (result.length === 0){next();}
        else{res.json(result);};
    }),(error)=>{next();};                            //if the module return false then fallback
});

//-------------Send JSON of complains by using name and type parameters by GET method--------
app.get('/getComplainByUserAndType/:user_name/:type_name/',
    (req,res,next)=>{
   let user = req.params.user_name;                                 //catch the user name parameter
   let type = req.params.type_name;                                 //catch the type parameter
   dbFunctions.getByUserAndType(type,user).then((result)=>{
       if (result.length===0){next();}
       else{res.json(result);};
   }),(error)=>{next();};
});

//-------------------the API documentation----------------------

app.use('/api', express.static('api'));

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





