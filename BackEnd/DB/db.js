var express = require('express');
var app = express();
const mongoose=require('mongoose'); //Mongoose
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User= require('../models/user');

module.exports= {
    // Automatic load Admin
    addAdmin:async ()=>{
        let adminObj={
            id:207331208,
            firstName:"Segev", 
            lastName:"Kestenbaum",
            email:"segev.kest@gmail.com",
            password:"bak021",
            city:"Kadima",
            street:"HaKalanit",
            isAdmin:[true]
        };
        await bcrypt.hash(adminObj.password, saltRounds,function(err,hash){
            if(err) throw err;
            adminObj.password=hash;
            return new User(adminObj).save();
        });
    },

};