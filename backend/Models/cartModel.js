import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema(
    {
        productID:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
    name: {
        type: String,
        required: true
    },
    image: [String],
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
}
)


const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    cartItems: [ProductSchema],
totalItems:{
    type: Number,
},
subtotal: {
    type: Number,
},   
shippingcost:{
    type: Number,
},
taxes: {
    type: Number,
},
couponDiscount: {
    type: String,
    default: null
},
total:{
    type: Number,
}
},{timestamps: true});


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
