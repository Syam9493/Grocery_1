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
import "/src/index.css";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, lazy } from "react";
import { ClipLoader } from "react-spinners";

import App from "./App.jsx";
import { SearchProvider } from "./Contexts/SearchContext.jsx";

//lazy loading screens
const HomeScreen = lazy(() => import("./Screens/HomeScreen.jsx"));
const LoginScreen = lazy(() => import("./Screens/LoginScreen.jsx"));
const RigisterScreen = lazy(() => import("./Screens/RigisterScreen.jsx"));
const ShopScreen = lazy(() => import("./Screens/ShopScreen.jsx"));
const FruitScreen = lazy(() => import("./Screens/FruitsScreen.jsx"));
const VegetableScreen = lazy(() => import("./Screens/VegetableScreen.jsx"));
const BeveragesScreen = lazy(() => import("./Screens/BeveragesScreen.jsx"));
const ProductDetailsScreen = lazy(() =>
  import("./Screens/ProductDetailsScreen.jsx")
);
const CartScreen = lazy(() => import("./Screens/CartScreen.jsx"));
const BakeryItemsScreen = lazy(() => import("./Screens/BakeryItemsScreen.jsx"));
const CleaningItemsScreen = lazy(() =>
  import("./Screens/CleaningItemsScreen.jsx")
);
const MilkAndEggsScreen = lazy(() => import("./Screens/MilkAndEggsScreen.jsx"));
const RiceItemsScreen = lazy(() => import("./Screens/RiceItemsScreen.jsx"));
const DryFruitsScreen = lazy(() => import("./Screens/DryFruitsScreen.jsx"));
const OilItemsScreen = lazy(() => import("./Screens/OilItemsScreen.jsx"));
const WhishList = lazy(() => import("./Screens/WhishListScreen.jsx"));
const PrivateRoute = lazy(() => import("./Components/PrivateRoute.jsx"));
const CheckOutScreen = lazy(() => import("./Screens/CheckOutScreen.jsx"));
const PaymentScreen = lazy(() => import("./Screens/PaymentScreen.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="signUp" element={<RigisterScreen />} />
      <Route path="shop" element={<ShopScreen />} />
      <Route path="Fruits" element={<FruitScreen />} />
      <Route path="vegetables" element={<VegetableScreen />} />
      <Route path="Beverages" element={<BeveragesScreen />} />
      <Route path="whishList" element={<WhishList />} />
      <Route path="bakeryItems" element={<BakeryItemsScreen />} />
      <Route path="cleaningItems" element={<CleaningItemsScreen />} />
      <Route path="milkAndEggs" element={<MilkAndEggsScreen />} />
      <Route path="riceItems" element={<RiceItemsScreen />} />
      <Route path="dryFruits" element={<DryFruitsScreen />} />
      <Route path="oilItems" element={<OilItemsScreen />} />
      <Route path="productDetailsPage/:id" element={<ProductDetailsScreen />} />
      <Route path="cart" element={<CartScreen />} />

      <Route element={<PrivateRoute />}>
        <Route path="checkout" element={<CheckOutScreen />} />
        <Route path="payment" element={<PaymentScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SearchProvider>
        <Suspense
          fallback={
            <div className="text-center p-10 text-xl">
              <ClipLoader size={100} />
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </SearchProvider>
    </Provider>
  </StrictMode>
);
