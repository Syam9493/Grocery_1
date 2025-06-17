import React from "react";
import "./App.css";
import {ToastContainer} from 'react-toastify'
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
//import HeroSection from "./Components/HeroSection/HeroSection";
import Categories from "./Components/Slider/Categories";
//import { FaLifeRing } from "react-icons/fa";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer/>
    </>
  );
}

export default App;
