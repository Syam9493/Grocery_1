import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {addingToCart} from '../Slice/cartSlice';
import {addToWishList} from '../Slice/WhishListSlice';
import { increaseQty, decreaseQty} from '../Slice/cartSlice';

const ProductDetails = ({product}) => {
  const dispatch = useDispatch();
  const  navigate = useNavigate();

  //console.log(product._id);

  const addToCartHandler = () => {
    dispatch(addingToCart(product));
    navigate('/cart');
  }

  const addToWhishList = () => {
    dispatch(addToWishList(product));
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
    <div>
        <div className='w-auto h-auto flex justify-center bg-white rounded-xl shadow-xl p-3 sm:w-full'>
      <div className='w-full h-40 md:w-72 md:h-96 p-2'>
        <img src={product.image} className='w-full h-full object-contain'/>
      </div>
      </div>
     
      <div className='m-2 p-3 grid grid-cols-4 gap-2'>
         <div className='bg-white shadow-xl w-full h-16 rounded-2xl p-2 sm:h-16 md:h-24 lg:h-32'>
         <img src={product.image} className='w-full h-full object-contain'/>
         </div>
         <div className='bg-white shadow-xl w-full h-16 rounded-2xl p-2 sm:h-16 md:h-24 lg:h-32'>
         <img src={product.image} className='w-full h-full object-contain'/>
         </div>
         <div className='bg-white shadow-xl w-full h-16 rounded-2xl p-2 sm:h-16 md:h-24 lg:h-32'>
         <img src={product.image} className='w-full h-full object-contain'/>
         </div>
         <div className='bg-white shadow-xl w-full h-16 rounded-2xl p-2 sm:h-16 md:h-24 lg:h-32'>
         <img src={product.image} className='w-full h-full object-contain'/>
         </div>
      </div>
    </div>
    <div className='m-2 p-3'>
      <div className='mt-2 p-5 border-b-2 border-gray-400 '>
        <h2 className='p-3'>{product.category}</h2>
      <h1 className='p-3'>{product.name}</h1>
      <p className='p-3'>⭐⭐⭐⭐⭐ <span>{product.rating}</span></p>
      <p className='p-3'>₹ {product.price}</p>
      <p className='p-3'>{product.description}</p>
      <div className=' p-3'>
        <h1>Weight</h1>
        <div className='flex flex-row gap-3'>
        <button>{product.weight}</button>
        <button>{product.weight}</button>
        <button>{product.weight}</button>
        <button>{product.weight}</button>
        </div>
      </div>
      <div className='flex flex-row gap-3'>
        <div className="flex items-center justify-center border rounded-3xl p-1">
            <button className="px-2 border-r-2 border-gray-400 h-10" onClick={() => decreaseQtyHandler(product._id)} >-</button>
            <span className="px-3 divider lg:divider-horizontal">{product.quantity}</span>
            <button className="px-2 border-l-2 border-gray-400 h-10" onClick={() => increaseQtyHandler(product._id)}>+</button>
          </div>
        <button className='flex items-center justify-center bg-green-700 text-white border-gray-50 rounded-4xl px-4 py-2' onClick={addToCartHandler}>Add To Cart</button>
        <button className='flex items-center justify-center bg-yellow-300 text-black border-gray-50 rounded-4xl px-4 py-2'>Buy Now</button>
        <button className='flex items-center justify-center bg-gray-100 text-white border-gray-50 rounded-full px-4 py-2'  onClick={addToWhishList}>❤️</button>
      </div>
      </div>
      <div>
        <p>hello</p>
      </div>
      </div>
      </>
  )
}

export default ProductDetails