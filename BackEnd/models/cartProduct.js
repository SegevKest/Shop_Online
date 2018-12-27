const mongoose=require('mongoose');

const cartProduct= mongoose.model('cartProduct',{
    cartId:String,
    productId:String,
    productName: String,
    amount:Number,
    totalPrice:Number
});

module.exports=cartProduct;