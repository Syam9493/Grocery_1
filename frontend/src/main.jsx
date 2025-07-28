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
import React, { Suspense, lazy } from 'react';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";



import App from "./App.jsx";
import {SearchProvider} from './Slice/SearchContext'
// import HomeScreen from "./Screens/HomeScreen.jsx";
// import LoginScreen from "./Screens/LoginScreen.jsx";
// import RigisterScreen from "./Screens/RigisterScreen.jsx";
// import ShopScreen from "./Screens/ShopScreen.jsx";
// import FruitScreen from "./Screens/FruitsScreen.jsx";
// import VegetableScreen from "./Screens/VegetableScreen.jsx";
// import BeveragesScreen from "./Screens/BeveragesScreen.jsx";
// import ProductDetailsScreen from "./Screens/ProductDetailsScreen.jsx";
// import CartScreen from "./Screens/CartScreen.jsx";
// import WhishList from "./Screens/WhishListScreen.jsx";
// import PrivateRoute from "./Components/PrivateRoute.jsx";
// import CheckOutScreen from "./Screens/CheckOutScreen.jsx";
// import PaymentScreen from "./Screens/PaymentScreen.jsx";
 
//lazy loading screens
const HomeScreen = lazy(() => import("./Screens/HomeScreen.jsx"));
const LoginScreen = lazy(() => import("./Screens/LoginScreen.jsx"));
const RigisterScreen = lazy(() => import("./Screens/RigisterScreen.jsx"));
const ShopScreen = lazy(() => import("./Screens/ShopScreen.jsx"));
const FruitScreen = lazy(() => import("./Screens/FruitsScreen.jsx"));
const VegetableScreen = lazy(() => import("./Screens/VegetableScreen.jsx"));
const BeveragesScreen = lazy(() => import("./Screens/BeveragesScreen.jsx"));
const ProductDetailsScreen = lazy(() => import("./Screens/ProductDetailsScreen.jsx"));
const CartScreen = lazy(() => import("./Screens/CartScreen.jsx"));
const WhishList = lazy(() => import("./Screens/WhishListScreen.jsx"));
const PrivateRoute = lazy(() => import("./Components/PrivateRoute.jsx"));
const CheckOutScreen = lazy(() => import("./Screens/CheckOutScreen.jsx"));
const PaymentScreen = lazy(() => import("./Screens/PaymentScreen.jsx"));


const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signUp" element={<RigisterScreen />} />
      <Route path="" element={<PrivateRoute/>}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/shop" element={<ShopScreen />} />
      <Route path="/Fruits" element={<FruitScreen />} />
      <Route path="/vegetables" element={<VegetableScreen />} />
      <Route path="/Beverages" element={<BeveragesScreen />} />
      <Route path="/whishList" element={<WhishList />} />
      <Route
        path="/productDetailsPage/:id"
        element={<ProductDetailsScreen />}
      />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/checkOut" element={<CheckOutScreen/>}/>
      <Route path="/payment" element={<PaymentScreen/>}/>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SearchProvider>
        <Suspense fallback={<div className="text-center p-10 text-xl">Loading...</div>}>
         <RouterProvider router={router} />
        </Suspense>
      </SearchProvider>
    </Provider>
  </StrictMode>
);
