import React,{useState,useEffect} from 'react';
import Beverages from '../Components/Beverages';
import API from '../server/api';

const BeveragesScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API("/api/products");
                const beverages = response.data.data;
                const Beverages = beverages.filter((bev) => bev.category === 'Beverages')
                setProducts(Beverages);
                setLoading(false);
                console.log("Full API response:", Beverages);
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
            {/* <div className='grid grid-cols-1 p-7'>
                <div className='flex flex-col'>
            <h2 className='font-bold text-xl/1'>Filter Option</h2>
               <span className='w-auto mt-4 border-b-2'></span>
                </div>
           <div>

           </div>
        </div> */}
            <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6'>
                {products.map((product) => (
                   <Beverages key={product._id} product={product}/>
                ))}
            </div>
        </> 
    );
}

export default BeveragesScreen