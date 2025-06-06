// import React from 'react';
// import Shop from '../Components/Shop';
// import axios from "axios"
// import { useState, useEffect } from 'react';


// const ShopScreen = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const API = "http://localhost:5000/Products";

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get(API);
//                 setProducts(response.data);
//                 console.log("Full API response:", response.data);
//             } catch (err) {
//                 console.log(err);
//                 setError("Failed to fetch products");
//                 setLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//     if (!products.length) return <div>No products found</div>;



//   return (
//       <Shop>
//         <div className='row-span-6'>
//            <div className=''>
//            </div>
//         </div>
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
//             {products.map((product) => (
//           <div key={product.id} className='w-52 h-5xl bg-white rounded-xl shadow-xl p-3'>
//               <div className='flex felx-row justify-between'>
//               <p className='bg-green-700 px-3 py-1.5 font-semibold text-md/1 text-white text-center rounded-r-full'>25% off</p>
//                <div className='bg-gray-100 p-2 shadow-2xl rounded-full'>
//                 <button className='size-6'>❤️</button>  
//                </div>
//           </div>
//           <div className='block'>
//          <img src="/Fruits/Apple.jpeg" alt="Apple" className='mt-10 size-md rounded-md'/>
//           </div>
//           <div className='mt-6 flex flex-row justify-between'>
//               <h1 className='font-semibold text-md/1 text-green-700'>{product.name}</h1>    
//               <h3>⭐ <span className='font-bold'> 5.0</span></h3>
//           </div>
//           <div>
//           <h2 className='mt-0.5 font-bold text-start'>Fresh Apple</h2>
//           </div>
//           <div>
//               <p className='mt-4 text-sm/1 text-gray-400'>500g</p>
//           </div>
//           <div className='mt-5 flex flex-row  justify-between'>
//             <h3>$11.75</h3>
//           <button className='bg-green-200 rounded-2xl font-bold text-md/5 text-green-700 px-2 py-1'><span className='mr-1'>👜</span>Add</button>
//           </div>
//           </div>  
//           ))}       
//         </div>
//       </Shop> 
//   )
// }


// //96183541

// export default ShopScreen


import React from 'react';
import Shop from '../Components/Shop';
//import axios from 'axios';
import API from '../server/api';
import { useState, useEffect } from 'react';

const ShopScreen = () => {
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API('/api/products');
                console.log(response.data.data);
                 //const allProducts = [...response.data.data.vegetables, ...response.data.data.Fruits, ...response.data.data.Beverages];
                setProducts(response.data.data);
                setLoading(false);
                console.log("Full API response:", response.data);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch products");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!products.length) return <div>No products found</div>;

    return (
        <>
           <div className='grid grid-flow-col  bg-white mt-4 mb-4 p-5'>
           <div className='hidden md:grid md:grid-cols-1 md:p-7'>
                      <div className='flex flex-col'>
                  <h2 className='font-bold text-xl/1'>Filter Option</h2>
                     <span className='w-auto mt-4 border-b-2'></span>
                      </div>
                 <div>
      
                 </div>
              </div>
               <div className='grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {products && products.map((product) => (
                    <Shop key={product._id} product={product}/>
                ))}
                </div>
            </div>
        </> 
    );
}

export default ShopScreen;

