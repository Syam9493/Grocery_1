import { useContext } from "react";
import { ClipLoader } from "react-spinners";

import { ProductContext } from "../../Screens/ProductDetailsScreen";

const Rating = () => {
  const { product, loading } = useContext(ProductContext);
  return <>{loading ? <ClipLoader /> : <div>{product.data.rating}</div>}</>;
};

export default Rating;
