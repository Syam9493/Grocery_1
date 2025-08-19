import { useContext } from "react";
import { ProductContext } from "../../Screens/ProductDetailsScreen";

const ProductDescription = () => {
  const { product, loading } = useContext(ProductContext);

  if (loading) <div>loading...</div>;
  return <div>{product?.data?.description}</div>;
};

export default ProductDescription;
