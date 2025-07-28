import {useContext} from 'react';
import { ClipLoader } from "react-spinners";
import { ProductContext } from '../../Screens/ProductDetailsScreen';

const AdditionalInformation = () => {
  const {product, loading} = useContext(ProductContext)
   const details = {
    'Name': product.data.name,
    'Category': product.data.category,
    'Weight': product.data.weight,
    'Price': `₹${product.data.price}`,
    'Rating': product.data.rating,
    'Quantity': product.data.quantity,
  };
   
   return(
    <>
    {loading? <ClipLoader/> :
    <div className="overflow-x-auto rounded-lg shadow-md m-4 sm:m-6">
  <table className="min-w-full table-auto border-collapse text-left text-sm sm:text-base">
    <thead>
      <tr className="bg-yellow-400">
        <th className="px-4 py-3 sm:px-10 sm:py-3 font-bold text-base sm:text-xl">Attribute</th>
        <th className="px-4 py-3 sm:px-10 sm:py-3 font-bold text-base sm:text-xl">Details</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(details).map(([key, value], index) => (
        <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
          <td className="px-4 py-3 sm:px-6 sm:py-4 break-words max-w-xs">{key}</td>
          <td className="px-4 py-3 sm:px-6 sm:py-4 break-words max-w-xs">{value}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

}
    </>
   )
}

export default AdditionalInformation