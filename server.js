
// initiate server
var express = require('express');
var app = express();
var http = require('http');
var port = 20246;


var adminlanding_page = 
`
  <head>
    <meta charset ='utf-8'>
    <title> ADMIN LANDING</title>
  </head>
  <body>  
    <div>
      <h3>ADMIN LANDING:</h3> <br/>
      <label for='checkinID' class='form'>CHECK-IN ID:</label> <br/>
      <input id ='checkinID' class='form' name='checkinID' type='text' placeholder="checkinID" /> <br/>
  
      <button id='checkinStart'>CHECK-IN START</button> <br/>
      <button id='viewHistory'>VIEW HISTORY</button>    
    </div>
    <span></span>
  </body> 
`;

var stop_checkin_1 = `<head>
    <meta charset ='utf-8'>
    <title> CHECK-IN PAGE</title>

    </head>
  <body>
    
    <div>
      <h3>PLEASE CHECK-IN NOW:</h3> <br/>
      <h1 id="K"></h1>

      <label >CHECK-IN ID:</label> <br/>
      <label id="thistopic">`;
var stop_checkin_2 = `</label><br/>
  
      <button id='stopCheckin'>STOP `;

var stop_checkin_3 = ` CHECK-IN</button> <br/>
      <button id='viewCheck'>View Check-ins</button> 
    </div>
    <span></span>
  </body> `;


// initiat mongodb 
//
// collection1: users
//   content: NNULL
//
// collection2: admins
//   content: username:admin password:1234
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://haokunl:TbhNItrL@127.0.0.1:27017/cmpt218_haokunl?authSource=admin";
var url = "mongodb://haokunl:COMPLICATE00@ds121589.mlab.com:21589/asn3";
MongoClient.connect(url, function(err, db) 
{
  if (err) throw err;
  console.log("Database found!");
  var dbo = db.db("asn3");
  //var dbo = db.db("cmpt218_haokunl");


  //-----------------------------------------------------------
  dbo.createCollection("admins", function(err, res) 
  {

    if (err) throw err;
    console.log("Collection admins created!");

    //---------------------------------------------------------
    dbo.createCollection("users", function(err, res) 
    {
  
      if (err) throw err;
      console.log("Collection users created!");
      //-------------------------------------------------------
      
      dbo.createCollection("topics",function(err,res)
      {
        if (err) throw err;
        console.log("Collection topics created!");
        //-----------------------------------------------------
        
        var myobj = {username:"admin", password:"1234"};
        
        dbo.collection("admins").update(myobj,myobj,{upsert:true}, function(err, res) 
        {

          if (err) throw err;
          console.log("primary admin inserted");






app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(function(req,res,next){
  console.log(req.method,' request: ',req.url,JSON.stringify(req.body));
  next();
});

var options = {
  extensions:['html','xml'],
  index:"login.html"
}
app.use('/',express.static('./',options));
app.post('/login/admins',function(req,res){
  //console.log("username: ",req.body.uname," password: ",req.body.pword);
  var value = dbo.collection("admins").findOne({"username":`${req.body.uname}`,"password":`${req.body.pword}`},function (err,value){
    if(value){
      res.send(200,adminlanding_page);
      res.end();
    }
    else{
      res.send(200,"fail");
      res.end();
    }
  });
});

app.post('/login/goback',function(req,res){
  res.send(200,adminlanding_page);
  res.end();
});


app.post('/login/create',function(req,res){
  var myobj = {username:req.body.uname2, password:req.body.pword2};
        
  dbo.collection("admins").update(myobj,myobj,{upsert:true}, function() 
  {
    res.json(myobj);  
  });       

});




app.post('/checkin/topics',function(req,res){
  var newtopic = {topic:`${req.body.topic}`}
  var newnewtopic = {topic:`${req.body.topic}`,starttime:`${req.body.starttime}`};
  var value = dbo.collection("topics").update(newtopic,newnewtopic,{upsert:true},function(err,result){
    if (err) throw err;
    var stop_checkin = stop_checkin_1 + req.body.topic + stop_checkin_2 + req.body.topic + stop_checkin_3;
    res.send(200,stop_checkin);
    res.end();
  }); 
});


app.post('/checkin/stop',function(req,res){
  dbo.collection("topics").updateOne({"topic":req.body.topic},{$set: {"stoptime":req.body.stoptime}});
  res.send(200,"Check-in Stoped , result generated! ");
  res.end();
});

app.post('/checkin/view',function(req,res){
    dbo.collection("users").find({"topic":req.body.topic}).toArray(function(err,result){
    res.json(result);
  });
});

app.post('/checkin/userid',function(req,res){
  var value = dbo.collection("topics").findOne({"topic":req.body.topic},function(err,value){
      if(value){
        if(value.topic === req.body.topic){
          if(value.stoptime){
            var temp = {"topic":req.body.topic,"name":req.body.name,"userid":req.body.userid,"ontime":"no"};
            dbo.collection("users").insertOne(temp);
            res.json(200,temp);
            res.end();
          }
          else{
            var temp = {"topic":req.body.topic,"name":req.body.name,"userid":req.body.userid,"ontime":"yes"};
            dbo.collection("users").insertOne(temp);
            res.json(200,temp);
            res.end();
          }
        }
      }
      else{
        res.send(200,"notopic");
        res.end();
      }
  }); 
});


app.post('/checkin/analysis',function(req,res){

  //dbo.collection("topics").find().toArray(function(err,result){
    //result.forEach(function(doc){      {"topic":doc.topic}
        dbo.collection("users").find().toArray(function(err,result2){
          res.json(result2);
        });

    //}); 
  

  //});


});




        });
      });
    });   
  });
});

http.createServer(app).listen(port);
console.log(`rnuning on port`,port);







