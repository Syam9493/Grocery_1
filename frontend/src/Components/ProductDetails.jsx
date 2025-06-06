import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {addingToCart} from '../Slice/cartSlice';

const ProductDetails = ({product}) => {
  const dispath = useDispatch();
  const  navigate = useNavigate();

  const addToCartHandler = () => {
    dispath(addingToCart(product));
    navigate('/cart');
  }

  const addToWhishList = () => {
    navigate('/whishList');
  }

  return (
    <>
    <div>
        <div className='w-auto h-auto flex justify-center bg-white rounded-xl shadow-xl p-3 sm:w-full'>
      <div className='w-full h-40 md:w-72 md:h-96 p-2'>
        <img src={product.image} className='w-full h-full object-contain'/>
      </div>
      </div>
     
      <div className='m-2 grid grid-cols-4 gap-2'>
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
    <div className='p-3'>
      <div className='mt-2 border-b-2 border-gray-400 '>
        <h2>{product.category}</h2>
      <h1>{product.name}</h1>
      <p>⭐⭐⭐⭐⭐ <span>{product.rating}</span></p>
      <p>₹ {product.price}</p>
      <p>{product.description}</p>
      <div>
        <h1>Weight</h1>
        <div className='flex flex-row gap-3'>
        <button>{product.weight}</button>
        <button>{product.weight}</button>
        <button>{product.weight}</button>
        <button>{product.weight}</button>
        </div>
      </div>
      <div className='flex flex-row gap-3'>
        <button>hlo</button>
        <button onClick={addToCartHandler}>Add To Cart</button>
        <button>Buy Now</button>
        <button onClick={addToWhishList}>❤️</button>
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