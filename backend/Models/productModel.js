// const mongoose = require('mongoose');
import mongoose from "mongoose";

 const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    description: {
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
    rating: {
        type: Number,
        required: true,
        default: 0
    },

 })


const ProductScheema = new mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
     type: String,
     required: true,
    },
    description:{
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
     quantity:{
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    reviews: [reviewSchema]
},{timestamps: true})


//const Product = mongoose.Model("Product", ProductScheema);
const Product = mongoose.model("Product", ProductScheema)

export default Product;