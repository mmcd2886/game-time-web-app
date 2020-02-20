/////////Events Schema/////////


const mongoose = require('mongoose');

//define a schema/ blueprint 
    const tournamentSchema = new mongoose.Schema({
// clicked name on the players list   
    name: { type: String },
// _id represents the object id for the json array   
    _id: mongoose.Schema.Types.ObjectId,
// userNameUpdate stores user names in an array. 'required: true' -> if empty form is submitted it will be a string not null. 
    userNameUpdate: {type: Array, required: true }  
    
  });
//use the blueprint to create the model 
// Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('tournament',tournamentSchema,'Tournaments');

