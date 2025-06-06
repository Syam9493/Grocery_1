import React,{ useState} from 'react';
import {useDispatch} from 'react-redux';
import {deletefromCart, Increment} from '../Slice/cartSlice';



const Cart = ({product}) => {
 
  const dispatch = useDispatch();
  const [quantity, updateQuantity] = useState(1);
  //   const [cartItems, setCartItems] = useState([]);

  // // Load cart from localStorage
  // useEffect(() => {
  //   const stored = JSON.parse(localStorage.getItem('cart')) || [];
  //   setCartItems(stored);
  // }, []);

  // // Sync to localStorage when cartItems change
  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cartItems));
  // }, [cartItems]);

  // const increment = (id, type) => {
  //   const updated = cartItems.map(item => {
  //     if (item.id === id) {
  //       const newQty = type === 'increment' ? item.qty + 1 : item.qty - 1;
  //       return {
  //         ...item,
  //         qty: newQty < 1 ? 1 : newQty,
  //       };
  //     }
  //     return item;
  //   });

  //   setCartItems(updated);
  // };

   /* when user clic the increment button it needs to e update qat based on item */
   const increment = async (id) => {
  //  const stored = JSON.parse(localStorage.getItem('cart')) || [];
  //   setCartItems(stored);
    // dispatch(Increment(cartItems));
    updateQuantity(quantity +1);
    console.log(id)
   }
   const decrement = async(id) => {
    console.log(id)
    updateQuantity(quantity - 1);
   }

   const deleteItmehandler = async (id) => {
    console.log("my name is tharun")
       dispatch(deletefromCart(id));
   }
    
  return (
    <>
     {product.map((item) => (
           <tr key={item._id} className="bg-white rounded-lg shadow-sm mt-4">
        <td className="flex items-center gap-4 p-4">
          <button className="text-xl text-gray-500 hover:text-red-500" onClick={() => deleteItmehandler(item._id)}>x</button>
          <img src={item.image} alt={item.name} className="size-14 object-contain rounded" />
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-400">{item.weight}</p>
          </div>
        </td>
        <td className="p-4">₹{item.price}</td>
        <td className="p-4">
          <div className="flex items-center border rounded-3xl px-2 py-1">
            <button className="px-2" onClick={() =>  decrement(item._id)} disabled={quantity === 1}>-</button>
            <span className="px-3">{quantity}</span>
            <button className="px-2" onClick={() => increment(item._id)}>+</button>
          </div>
        </td>
        <td className="p-4">₹{item.price}</td>
      </tr>
          ))}
    </>
  )
}

export default Cart;