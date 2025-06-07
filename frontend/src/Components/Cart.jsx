import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {deletefromCart, increaseQty, decreaseQty} from '../Slice/cartSlice';
import {addToWishList} from '../Slice/WhishListSlice';



const Cart = ({product}) => {
  const dispatch = useDispatch();
   const  navigate = useNavigate();

  
   const deleteItmehandler = async (id) => {
       dispatch(deletefromCart(id));
   }

   const addToCartHandler = (id) => {
         dispatch(addToWishList(id));
         navigate('/whishList');
       }

     const increaseQtyHandler = (id) => {
    dispatch(increaseQty(id));
  };

  const decreaseQtyHandler = (id) => {
    dispatch(decreaseQty(id));
  };
    
  return (
    <>
     {product.map((item) => (
           <tr key={item._id} className="bg-white rounded-lg shadow-sm mt-4">
        <td className="flex items-center gap-4 p-4">
          <button className="text-xl text-gray-500 hover:text-red-500" onClick={() => {deleteItmehandler(item._id) ?  addToCartHandler(item) : deleteItmehandler(item._id) }  }>x</button>
          <img src={item.image} alt={item.name} className="size-14 object-contain rounded" />
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-400">{item.weight}</p>
          </div>
        </td>
        <td className="p-4">₹{item.price}</td>
        <td className="p-4">
          <div className="flex items-center justify-center border rounded-3xl p-1">
            <button className="px-2 border-r-2 border-gray-400 h-10" onClick={() => decreaseQtyHandler(item._id)} >-</button>
            <span className="px-3 divider lg:divider-horizontal">{item.quantity}</span>
            <button className="px-2 border-l-2 border-gray-400 h-10" onClick={() => increaseQtyHandler(item._id)}>+</button>
          </div>
        </td>
        <td className="p-4">₹{item.price * item.quantity}</td>
      </tr>
          ))}
    </>
  )
}

export default Cart;