import React,{useState,useEffect} from 'react';
import Vegetables from '../Components/Vegetables';
//import axios from 'axios';
import API from '../server/api';

const VegetableScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API('/api/products');
                const Vegetables = response.data.data;
                const Veg = Vegetables.filter((veg) => veg.category === 'vegetables')
                setProducts(Veg);
                setLoading(false);
                console.log("Full API response:", Vegetables);
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
    <div className='grid grid-cols-1 place-items-center  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6'>
        {products.map((product) => (
         <Vegetables key={product._id} product={product}/>
        ))}
        </div>
  )
}

export default VegetableScreen;