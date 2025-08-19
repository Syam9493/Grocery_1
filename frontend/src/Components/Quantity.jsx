import { useUpdateQuantityMutation } from "../ApiSlice/cartApi.js";

import useAuthUser from "../Hooks/useAuthUser.js";

const Quantity = ({ product, refetch }) => {
  ///console.log(product);

  const { userID } = useAuthUser(); // get userID from custom hook

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

  const decreaseQtyHandler = async (id, quantity) => {
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
      <div
        key={product._id}
        className="inline-flex items-center border border-black rounded-full overflow-hidden"
      >
        <button
          className="px-3 py-1 border-r border-gray-400 text-sm"
          onClick={() => decreaseQtyHandler(product._id, product.quantity - 1)}
          disabled={product.quantity === 1}
        >
          -
        </button>

        <h1 className="px-4 text-sm">{product.quantity}</h1>

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
