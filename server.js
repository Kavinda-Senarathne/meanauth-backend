var express = require ('express');
var app= express();
var port= process.env.PORT|| 8080;
var morgan = require('morgan');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
var router= express.Router();
var appRoutes=require('./app/routes/api')(router);
var path = require('path');

//Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));




app.use('/api',appRoutes);

 mongoose.connect('mongodb://localhost:27017/tutorial', function(err){
   if(err){
    console.log('Not connected to database' +err);
    }else{
   console.log('Database connected successfully'); 
   }
});  
app.get('*',function(req,res){
 res.sendfile(path.join(__dirname+'/app/public/app/views/index.html'));

});

app.listen(port,function(){
   console.log('Running the server' +port );
});