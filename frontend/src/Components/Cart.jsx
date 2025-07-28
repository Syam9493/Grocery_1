import React, { useState } from "react";
import { Link } from "react-router-dom"; // fixed: should be 'react-router-dom'
import CartAlert from "./CartAlert";
import Quantity from "./Quantity";

const Cart = ({ product, refetch }) => {
  const [open, setOpen] = useState(false);
  const [id, setid] = useState("");

  return (
    <React.Fragment>
      {product.map((item) => (
        <tr key={item._id} className="bg-white rounded-lg shadow-sm mt-4">
          <td className="flex items-center gap-4 p-4">
            <button
              className="text-xl text-gray-500 hover:text-red-500"
              onClick={() => {
                setOpen(true);
                setid(item.productID); // ✅ only set ID
              }}
            >
              x
            </button>
            <img
              src={item.image[0]}
              alt={item.name}
              className="size-16 border border-gray-200 shadow-gray-200 object-contain rounded p-1.5"
            />
            <div className="px-7">
              <Link to={`/productDetailsPage/${item._id}`}>
                <p className="font-medium">{item.name}</p>
              </Link>
              <p className="text-sm text-gray-400">{item.weight}</p>
            </div>
          </td>
          <td className="p-4">₹{item.price}</td>
          <td className="p-1">
            <Quantity product={{ _id: item.productID, quantity: item.quantity }} refetch={refetch} />
          </td>
          <td className="p-4">₹{item.subtotal}</td>
        </tr>
      ))}
      
      {open && (
        <tr>
          <td colSpan="4">
            <div className="p-4">
             {open && (
  <CartAlert open={open} setOpen={setOpen} id={id} refetch={refetch} />
)}
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default Cart;
