import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    shippingAddress:{
        Firstname:{
            type: String,
            required: true
        },
       Lastname:{
        type: String,
        required: true
       },
       home:{
        type: String,
        required: true
       },
       country:{
        type: String,
        required: true
       },
       streetAddress:{
        type: String,
        required: true
       },
       city:{
        type: String,
        required: true
      },
      state:{
        type: String,
        required: true
      },
      zipcode:{
        type: Number,
        required: true
      },
      cellNumber: {
        type: Number,
        required: true
      },
      email: {
        type: String,
        required: true,
         unique: true
      },
      deliveryAddress:{
        type: Boolean,
        required: true,
        default: false
      }
    },
    totalItems:{
        type: Number,
        required: true,
        default: 0
    },
    subtotal: {
        type: Number,
        required: true,
        default: 0
    },   
    shippingcost:{
        type: Number,
        required: true,
        default: 0
    },
    taxes: {
        type: Number,
        required: true,
        default: 0
    },
    couponDiscount: {
        type: String,
        default: 0
    },
    total:{
        type: Number,
        required: true,
        default: 0
    },
    paymentMethod:{
        type: String,
        required: true
    },
    paymentResult:{
        id:{type: String, required: true},
        status: {type: String, required: true},
        update_time: {
            type: String,
            required: true
        },
        email: {type: String, required: true}
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt:{
        type: Date
    },
    isDelivered:{
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt:{
        type: Date
    }
}, {timestamps: true});


const CheckOut = mongoose.model("CheckOut", checkOutSchema);


export default CheckOut;