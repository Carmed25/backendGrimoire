const mongoose = require('mongoose');

// attention email doit etre unique - A MODIFIER
const userSchema =mongoose.Schema({
    email:{ type:String, required:true},
    password: { type:String, required:true},
   
});

module.exports=mongoose.model('User', userSchema);