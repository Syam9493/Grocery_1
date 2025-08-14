import {useUpdateQuantityMutation} from '../ApiSlice/cartApi.js';
import {useSelector} from 'react-redux'

const Quantity = ({ product, refetch }) => {

  ///console.log(product);

  const reduxUser = useSelector((state) => state.userInfo?.user);
       const localUser = (() => {
         try {
           const persistedRoot = localStorage.getItem("persist:root");
           if (persistedRoot) {
             const parsedRoot = JSON.parse(persistedRoot);
             if (parsedRoot.userInfo) {
               return JSON.parse(parsedRoot.userInfo).user;
             }
           }
           return JSON.parse(localStorage.getItem("userInfo"))?.user || null;
         } catch {
           return null;
         }
       })();
     
       const user = reduxUser || localUser;
       const userID = user?.id;


  const [updateQuantity] = useUpdateQuantityMutation();
  

  const increaseQtyHandler = async (id, quantity) => {
    const productID = String(id);
    try {
      await updateQuantity({ userID, productID, quantity });
      await refetch();
    } catch (err) {
      console.error("Failed to increase quantity:", err);
      // Optionally show a toast or error message
    }
  };

  const decreaseQtyHandler = async(id,quantity) => {
    const productID = String(id);
    try {
      await updateQuantity({ userID, productID, quantity });
      await refetch();
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
      // Optionally show a toast or error message
    }
  };



  return (
    <>
      <div key={product._id} className="inline-flex items-center border border-black rounded-full overflow-hidden">
      <button
         className="px-3 py-1 border-r border-gray-400 text-sm"
        onClick={() => decreaseQtyHandler(product._id, product.quantity - 1)}
        disabled={product.quantity===1}
      >
        -
      </button>

      <h1 className="px-4 text-sm">
        {product.quantity}
      </h1>

      <button
       className="px-3 py-1 border-l border-gray-400 text-sm"
        onClick={() => increaseQtyHandler(product._id, product.quantity + 1)}
      >
        +
      </button>
    </div>
    </>
  );
};

export default Quantity;






