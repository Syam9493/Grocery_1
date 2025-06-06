import React from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const Fruits = ({product}) => {
    // const params = useParams();
    // const  id = params._id; 
    const navigate = useNavigate();

    const addToCartHandler = () => {
        navigate(`/productDetailsPage/${product._id}`);
    }

  return (
    <>
     <div key={product._id} className='w-64 h-5xl bg-white rounded-xl shadow-xl p-3'>
                        <div className='flex flex-row justify-between'>
                            <p className='bg-green-700 px-3 py-1.5 font-semibold text-md/1 text-white text-center rounded-r-full'>25% off</p>
                            <div className='bg-gray-100 p-2 shadow-2xl rounded-full'>
                                <button className='size-6' onClick={addToCartHandler}>❤️</button>  
                            </div>
                        </div>
                        <Link to={`/productDetailsPage` + "/" + product._id}>
                        <div className='w-full h-48 flex items-center justify-center p-2'>
                            <img 
                                src={product.image || "/Fruits/Apple.jpeg"} 
                                alt={product.name} 
                                className='w-full h-full object-contain'
                            />
                        </div>
                        </Link>
                        <div className='mt-6 flex flex-row justify-between'>
                            <h1 className='font-semibold text-md/1 text-green-700'>{product.category || 'Fresh Product'}</h1>    
                            <h3>⭐ <span className='font-bold'> {product.rating || 5.0}</span></h3>
                        </div>
                        <div>
                            <h2 className='mt-0.5 font-bold text-start'><Link to={`/productDetailsPage` + "/" + product._id}>{product.name}</Link></h2>
                        </div>
                        <div>
                            <p className='mt-4 text-sm/1 text-gray-400'>{product.weight || '500g'}</p>
                        </div>
                        <div className='mt-5 flex flex-row justify-between'>
                            <h3>₹{product.price || '11.75'}</h3>
                            <button className='bg-green-200 rounded-2xl font-semibold text-md/1 text-green-700 px-2 py-1' onClick={addToCartHandler}>
                                <span className='mr-1'>👜</span>Add
                            </button>
                        </div>
                    </div>
    </>
  )
}

export default Fruits