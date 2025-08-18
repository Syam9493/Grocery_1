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
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}
)

const wishListSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    products: [ProductSchema]
})

const Wishlist = mongoose.model("Wishlist", wishListSchema);

export default Wishlist;