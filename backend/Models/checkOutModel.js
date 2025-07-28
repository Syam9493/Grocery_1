// import mongoose from "mongoose";

// const shippingAddressSchema = new mongoose.Schema({
    
//       Firstname:{
//             type: String,
//             required: true
//         },
//        Lastname:{
//         type: String,
//         required: true
//        },
//        companyName:{
//         type: String,
//         required: true
//        },
//        country:{
//         type: String,
//         required: true
//        },
//        streetAddress:{
//         type: String,
//         required: true
//        },
//        city:{
//         type: String,
//         required: true
//       },
//       state:{
//         type: String,
//         required: true
//       },
//       zipcode:{
//         type: Number,
//         required: true
//       },
//       cellNumber: {
//         type: Number,
//         required: true
//       },
//       email: {
//         type: String,
//         required: true,
//          unique: true
//       },
//       deliveryAddress:{
//         type: Boolean,
//         required: true,
//         default: false
//       }
// });

// const ProductSchema = new mongoose.Schema(
//     {
//         productID:{
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref: "Product"
//         },
//     name: {
//         type: String,
//         required: true
//     },
//     image: [String],
//     weight: {
//         type: String,
//         required: true
//     },
//     subtotal: {
//         type: Number,
//         required: true
//     },
//     totalItems:{
//         type: Number,
//         required: true,
//         default: 0
//     },
//     TotalItemssubtotal: {
//         type: Number,
//         required: true,
//         default: 0
//     },   
//     shippingcost:{
//         type: Number,
//         required: true,
//         default: 0
//     },
//     taxes: {
//         type: Number,
//         required: true,
//         default: 0
//     },
//     couponDiscount: {
//         type: String,
//         default: 0
//     },
//     total:{
//         type: Number,
//         required: true,
//         default: 0
//     },
//     paymentMethod:{
//         type: String,
//         default: null
//     }, 
// }
// );

// const checkOutSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//         unique: true,
//     },
//     shippingAddress:{
//         shippingAddressSchema
//     },
//     cartItems: [ProductSchema],
    
    // paymentResult:{
    //     id:{
    //         type: mongoose.Schema.Types.ObjectId,
    //         default: null
    //        },
    //     status: {type: String, default: null},
    //     update_time: {
    //         type: Date,
    //     },
    //     email: {type: String, default: null}
    // },
//     isPaid: {
//         type: Boolean,
//         default: null
//     },
//     paidAt:{
//         type: Date,
//         default: null
//     },
//     isDelivered:{
//         type: Boolean,
//         default: null
//     },
//     deliveredAt:{
//         type: Date, 
//         default: null

//     }
// }, {timestamps: true});


// const CheckOut = mongoose.model("CheckOut", checkOutSchema);


// export default CheckOut;


import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  name: String,
  image: [String],
  weight: String,
  price: Number,
  quantity: Number,
  subtotal: Number,
});

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shippingAddress: { type: Object, required: true },
  orderItems: [orderItemSchema], // ✅ Add this
  subtotal: Number,
  shippingcost: Number,
  taxes: Number,
  couponDiscount: Number,
  total: Number,
  paymentMethod: { type: Boolean },
  paymentResult: {
    status: String,
    update_time: String,
    email: String,
  },
      paymentResult:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            default: null
           },
        status: {type: String, default: null},
        update_time: {
            type: Date,
        },
        email: {type: String, default: null}
    },
  isPaid: { type: Boolean, default: false },
  paidAt: String,
  isDelivered: { type: Boolean, default: false },
  deliveredAt: String,
});

const checkOutModel = mongoose.model('Order', orderSchema);

export default checkOutModel;
