import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {addingToCart} from '../Slice/cartSlice';
import {deletefromWhishList} from '../Slice/WhishListSlice';

const WhishList = ({wishListItems}) => {
  const dispatch = useDispatch();
  const  navigate = useNavigate();

  const date = new Date();
  const getFullYear = date.getFullYear();
  const month = date.getMonth();
  console.log(getFullYear+ " " + month);

   const addToCartHandler = (id) => {
      dispatch(addingToCart(id));
       dispatch(deletefromWhishList(id._id));
      navigate('/cart');
    }
  
   const deleteItmehandler = async (id) => {
       dispatch(deletefromWhishList(id));
   }
  return (
    <>
    {Array.isArray(wishListItems) ? ( wishListItems.map((item)=>(
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
        <td className="p-4">{item.updatedAt}</td>
        <td><button className='flex items-center justify-center bg-green-700 text-white border-gray-50 rounded-4xl px-4 py-2' onClick={() => addToCartHandler(item)}>Add To Cart</button></td>
      </tr>
    ))) : (
      <tr>
        <td>No items in whishList</td>
      </tr>
    )}
    </>
  )
}

export default WhishList