const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// attention email doit etre unique -
const userSchema =mongoose.Schema({
    email:{ type:String, required:true, unique:true},
    password: { type:String, required:true},
   
});

// un seul utilisateur avec la même adresse mail
userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('User', userSchema);