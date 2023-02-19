var express = require('express')
var path = require('path');

 var bodyParser = require('body-parser');
 var compiler = require('compilex');


 var app = express();
 app.use(bodyParser());
app.listen(9000);
 var option = {stats:true};

 compiler.init(option);


 app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

 });


 app.post("/compile",function(req,res){
    var code = req.body.code;
    var envData = {OS:"windows",cmd:"g++",options:{timeout:10000}}
    compiler.compileCPP(envData,code,function(data){
        if(data.error)
        {
            res.send(data.error);
        }
        else{
            res.send(data.output);
        }
    });

 })


 compiler.flush(function(){
    console.log("All files flushed!")
 });