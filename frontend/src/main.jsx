import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
//import "/src/index.css";
import "react-toastify/dist/ReactToastify.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import App from "./App.jsx";
import HomeScreen from "./Screens/HomeScreen.jsx";
import LoginScreen from "./Screens/LoginScreen.jsx";
import RigisterScreen from "./Screens/RigisterScreen.jsx";
import ShopScreen from "./Screens/ShopScreen.jsx";
import FruitScreen from "./Screens/FruitsScreen.jsx";
import VegetableScreen from "./Screens/VegetableScreen.jsx";
import BeveragesScreen from "./Screens/BeveragesScreen.jsx";
import ProductDetailsScreen from "./Screens/ProductDetailsScreen.jsx";
import CartScreen from "./Screens/CartScreen.jsx";
import WhishList from "./Screens/WhishListScreen.jsx";

const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signUp" element={<RigisterScreen />} />
      <Route path="/shop" element={<ShopScreen />} />
      <Route path="/Fruits" element={<FruitScreen />} />
      <Route path="/vegetables" element={<VegetableScreen />} />
      <Route path="/Beverages" element={<BeveragesScreen />} />
      <Route
        path="/productDetailsPage/:id"
        element={<ProductDetailsScreen />}
      />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/whishList" element={<WhishList />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
