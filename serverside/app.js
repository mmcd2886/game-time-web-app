const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');
//specify where to find the schema
//////Events
const Tournament = require('./models/tournament')

// connect and display the status 
// mongoose.connect('mongodb://localhost:27017/IT6203', { useNewUrlParser: true })
mongoose.connect('username/pw', { useNewUrlParser: true })
 .then(() => { console.log("connected"); })
 .catch(() => { console.log("error connecting"); });

// use the following code on any request that matches the specified mount path
app.use((req, res, next) => {
   console.log('This line is always called');
   res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE'); //allowable methods
   res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
   next();
});

var distDir = path.join(__dirname, '../dist');
app.use(express.static(distDir));


////////Events//////
 app.get('/tournaments', (req, res, next) => {
 //call mongoose method find (MongoDB db.Tournaments.find())
 Tournament.find() 
   //if data is returned, send data as a response 
   .then(data => res.status(200).json(data))
   //if error, send internal server error
   .catch(err => {
   console.log('Error: ${err}');
   res.status(500).json(err);
 });
});

//to use this middleware in other parts of the application
module.exports=app;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// add the userName to the json array with post
app.post('/tournaments', (req, res, next) => {
 // create a new student variable and save request’s fields 
 { 
   //find a document by id number
   Tournament.findByIdAndUpdate({_id : req.body._id},
   //$addToSet adds the username to the json array and will do nothing if name already exists
     { $addToSet: {
       // _id : req.body._id,
       userNameUpdate : req.body.userNameUpdate}})
    .then((tournament) => {
       if (tournament) { //what was updated
         console.log(tournament);
       } else {
         console.log("no data exist for this id");
       }
    })
   .catch((err) => {
     console.log(err);
    });
   }

});  

// remove the userName from the array with put
app.put('/tournaments', (req, res, next) => {
 { 
   //find a document by id number
   Tournament.findByIdAndUpdate({_id : req.body._id},
   //$pull removes the item from the json array
     { $pull: {
       // _id : req.body._id,
       userNameUpdate : req.body.userNameUpdate}})
    .then((tournament) => {
       if (tournament) { //what was updated
         console.log(tournament);
       } else {
         console.log("no data exist for this id");
       }
    })
   .catch((err) => {
     console.log(err);
    });
   }

});

// update a name using patch
app.patch('/tournaments', (req, res, next) => {
  { 
    //find a document by id number and the selected name from the players list
    Tournament.updateOne({_id : req.body._id, userNameUpdate : req.body.name},
    //$set will update the username
      { $set: {
        //update userNameUpdate to the name that was entered on the form
        "userNameUpdate.$" : req.body.userNameUpdate}})
     .then((tournament) => {
        if (tournament) { //what was updated
          console.log(tournament);
        } else {
          console.log("no data exist for this id");
        }
     })
    .catch((err) => {
      console.log(err);
     });
    }
  });

////////End Events//////

// This allows page reload from any page
app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/game_time', 'index.html'));
});

