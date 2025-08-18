import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ClipLoader } from "react-spinners";

import Vegetables from "../Components/Vegetables";
import { useGetFilteredProductsQuery } from '../ApiSlice/ProductApiSlice';
///import {useGetProductsQuery} from '../ApiSlice/ProductApiSlice';
import {useGetUserWishListQuery} from '../ApiSlice/whishListSlice.js';
import useAuthUser from '../Hooks/useAuthUser.js';

const VegetableScreen = () => {
  const location = useLocation();
  const ProductData = location.pathname.substring(1);
  const {userID} = useAuthUser();

  const { data: response, isLoading, isError } = useGetFilteredProductsQuery(ProductData);
  const {data: wishListItems} = useGetUserWishListQuery(userID);
  
   useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
  

 if (isLoading) return( <div className="flex justify-center m-20">
        <ClipLoader size={100} />
      </div>);
  if (isError) return <p>Error: {isError?.error || 'Something went wrong'}</p>;

  // Get the actual products array
  const products = response?.data || [];

  return (
    <>
    <div className="grid grid-cols-1 place-items-center  md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 gap-4 p-6">
      {products.map(product => (
        <Vegetables key={product._id} product={product} wishListItems={wishListItems} />
      ))}
      </div>
    </>
  );
};



// const VegetableScreen = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [VisibleProducts, setVisibleProducts] = useState(6);


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await API("/api/products/vegetables");
//         const Vegetables = response.data.data;
//         console.log(Vegetables);
//         setProducts(Vegetables);
//         setLoading(false);
//       } catch (err) {
//         console.log(err);
//         setError("Failed to fetch products");
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const loadMoreProductshandler = () => {
//     setVisibleProducts((prevCount) => prevCount + 6);
//   };

//   const decresMoreProductshandler = () => {
//     setVisibleProducts(6);
//   };

//   const visibeProducts = products.slice(0, VisibleProducts);

//   if (loading)
//     return (
//       <div className="flex justify-center m-20">
//         <ClipLoader size={100} />
//       </div>
//     );
//   if (error) return <div>{error}</div>;
//   if (!products.length) return <div>No products found</div>;

//   return (
//     <>
//       <div className="grid grid-cols-1 place-items-center  md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 gap-4 p-6">
//         {visibeProducts.map((product) => (
//           <Vegetables key={product._id} product={product} />
//         ))}
//       </div>
//       <div className="m-7 flex items-center justify-center">
//         {VisibleProducts < products.length ? (
//           <button
//             className=" w-60  bg-green-700 rounded-2xl font-sans font-semibold text-[1rem] text-white px-4 py-3"
//             onClick={loadMoreProductshandler}
//           >
//             Load Products
//           </button>
//         ) : (
//           <button
//             className=" w-60  bg-green-700 rounded-2xl font-sans font-semibold text-[1rem] text-white px-4 py-3"
//             onClick={decresMoreProductshandler}
//           >
//             Remove Products
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

export default VegetableScreen;
