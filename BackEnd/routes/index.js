var express = require('express');
var router = express.Router();
const User= require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/isUserLogged',async function(req,res){
  if(req.session.user){
    let foundUser= await User.find({id:req.session.user.id});
    res.json(foundUser[0]);
  }
  else
    res.sendStatus(403);
});

router.post('/idEmailTaken', async function(req,res){
  let idFlag=false, emailFlag=false;
  try{
      let isTaken = await User.find({id:req.body.id});
      let emailTaken = await User.find( {email:req.body.email});
      idFlag = isTaken[0] ? true : false;
      emailFlag = emailTaken[0] ? true : false;
      idFlag && emailFlag ? res.json([true,true]) : 
        ( idFlag ? res.json([true,false]) : (emailFlag ? res.json([false,true]) : res.json([false,false]))); // true: taken ; false:untaken
  }
  catch(err){
    typeof err === "string" ? res.send(err) : res.sendStatus(500);
  }
});
// Register 
router.post('/register', async function(req,res){ //work
  let newUserObj=req.body;
  if(newUserObj.id && newUserObj.firstName 
    && newUserObj.lastName && newUserObj.email
    && newUserObj.password && newUserObj.city
    && newUserObj.street ){
      try{
        await bcrypt.hash(newUserObj.password,saltRounds,async function(err,hash){
            if(err) res.send(err);
            newUserObj.password=hash;
            let newUser = new User(newUserObj);
            newUser.isAdmin[0] = false;
            await newUser.save();
            res.json(newUser);
        });
      }
      catch(err){
        typeof err === "string" ? res.send(err) : res.sendStatus(500);
      }
  }
  else
    res.sendStatus(403);
});

//Login 
router.post('/login', async function(req,res){  //work
  let username=req.body.email;
  let password=req.body.password;
  try{
    let foundUsername= await User.find({email:username});    
    if(foundUsername[0]) {
      let match= await bcrypt.compare(password, foundUsername[0].password);
      if(match) {
        req.session.user={ id : foundUsername[0].id };
        const foundUser = foundUsername[0];
        delete foundUser.password;
        res.json(foundUser);
      }
      else
        res.json({Error:{validPassword:false}});
    }
    else
      res.json({error:"Not Valid Information"}); 
  }
  catch(err){
    typeof err === "string" ? res.send(err) : res.sendStatus(500);
  }
});

//Log out
router.get('/logout', function(req,res){ //work
    if(req.session.user)
        req.session.destroy(err=>err);
    res.json({loggedOut:true});
});

module.exports = router;
