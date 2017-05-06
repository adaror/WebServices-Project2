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


app.get('/showAllComplains',
    (req,res)=>{
    let allComplains = complainModule.getAllComplains();
    res.status(200).send(allComplains);
});

app.post('/getType/',
    (req,res,next)=>{
    let type = req.body.type_name;
    let parameters = complainModule.getByType(type);
   if (parameters == false){
       next();
   }else{
   res.status(200).send(parameters);}
});

app.get('/getComplainByUserAndType/:user_name,:type_name',
    (req,res,next)=>{
   let user = req.params.user_name;
   let type = req.params.type_name;
   let parameters = complainModule.getByUserAndType(user,type);

    if (parameters == false){
       next();
    }else{
    res.send(parameters);
    }
});

app.all('*',
    (req,res)=>{
    res.json({"Error":"No Parameters Found"});
    });

app.listen(port,
    ()=>{
    console.log(`listening on port ${port}`);
});





