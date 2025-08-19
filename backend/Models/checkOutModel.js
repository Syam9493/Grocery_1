import mongoose from "mongoose";

// user order Item data

const orderItemSchema = mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  name: String,
  image: [String],
  weight: String,
  price: Number,
  quantity: Number,
  subtotal: Number,
});

// unique user order
const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
  paymentResult: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    status: { type: String, default: null },
    update_time: {
      type: Date,
    },
    email: { type: String, default: null },
  },
  isPaid: { type: Boolean, default: false },
  paidAt: String,
  isDelivered: { type: Boolean, default: false },
  deliveredAt: String,
});

const checkOutModel = mongoose.model("Order", orderSchema);

export default checkOutModel;
