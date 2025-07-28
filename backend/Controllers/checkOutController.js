import checkOutModel from '../Models/checkOutModel.js';

const checkOut = async (req, res) => {
  try {
    const { shippingAddress, orderItems, subtotal, shippingcost, taxes, total, paymentMethod, paymentResult, paidAt, deliveredAt, user } = req.body;


    if (!orderItems || orderItems.length === 0) {
  return res.status(400).json({ message: 'No cart items' });
   }


 const order = await checkOutModel.create({
      user,
      shippingAddress,
      orderItems, // ✅ store your array here
      subtotal,
      shippingcost,
      taxes,
      total,
      paymentMethod,
      paymentResult,
      isPaid: false,
      paidAt,
      isDelivered: false,
      deliveredAt,
    });

    res.status(201).json(order);


  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Order creation failed', error: error.message });
  }
};

export default checkOut;