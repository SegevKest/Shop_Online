const mongoose=require('mongoose');


const user= mongoose.model('user',{
    id:String,
    firstName:String, 
    lastName:String,
    email:String,
    password:String,
    city:String,
    street:String,
    isAdmin:[{type:Boolean},{default:false}]
});

module.exports=user;