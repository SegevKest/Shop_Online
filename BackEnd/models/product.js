const mongoose=require('mongoose');

const product= mongoose.model('product',{
    id:String,
    name:String, 
    catagoryId:String,
    price:Number,
    imgUrl:String,
});

module.exports=product;