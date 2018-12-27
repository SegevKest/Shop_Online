var express = require('express');
var router = express.Router();
const Product= require('../models/product');

// Get all Products
router.get('/', async function(req,res){ //work
    if(req.session.user){
        try{
            let allProducts= await Product.find();
            res.json(allProducts);
        }
        catch(err){
            typeof err === "string" ? res.send(err) : res.sendStatus(500);
        }
        }        
});

//checks if the id of the new Product is taken
router.post('/isTaken', async function(req,res){ //work
    if(req.session.user){
        try{
            let foundItem = await Product.find({id:req.body.id}); 
            foundItem[0] ? res.json(true) : res.json(false);
        }
        catch(err) {
            typeof err === "string" ? res.send(err) : res.sendStatus(500);
        }
    }
});

// Add a Product
router.post('/', async function(req,res){ //work
    if(req.session.user){
        try{
            let addedProduct= new Product(req.body);
            let newProduct = await addedProduct.save();
            res.json(newProduct);
        }
        catch(err){
            typeof err === "string" ? res.send(err) : res.sendStatus(500);
        }
    }
});

// Update a Product
router.put('/:id',async function(req,res){ //work
     if(req.session.user){
        try{
            let foundProduct = await Product.findOneAndUpdate({id:req.params.id}, req.body,{new:true});
            res.json(foundProduct);
        }
        catch(err){
            typeof err === "string" ? res.send(err) : res.sendStatus(500);
        }
  }
});

module.exports=router;