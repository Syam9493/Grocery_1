import mongoose from "mongoose";



const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    }    
}],
totalItems:{
    type: Number,
    required: true
},
subtotal: {
    type: Number,
    required: true
},   
shippingcost:{
    type: Number,
    required: true
},
taxes: {
    type: Number,
    required: true
},
couponDiscount: {
    type: String,
},
total:{
    type: Number,
    required: true
}
},{timestamps: true});


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;