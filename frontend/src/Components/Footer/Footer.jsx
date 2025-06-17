import React from "react";
import { Link } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-green-700 shadow-md rounded-b-xl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2  justify-items-start sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 text-white">
          <div>
            {/* <div className="flex items-center gap-2"> */}
            <div className="flex gap-1">
              <div className="w-fit rounded-full bg-yellow-300 p-1 text-green-700 hover:text-green-600 focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-yellow-300 focus:outline-hidden">
                <GiFruitBowl className="h-8 w-8 rounded-full " />
              </div>
              <span className="font-bold text-3xl text-white inset-0 sm:inline">
                Grocery<span className="text-yellow-300">.</span>
              </span>
            </div>
            <p className="font-sans font-semibold text-md leading-8">
              Perspiciatis, dicta iste inventore, laudantium quam eaque neque
              amet fugiat iusto saepe deleniti harum expedita veritatis fuga.
            </p>
          </div>
          <ul className="leading-8">
            <h2 className="font-sans font-bold text-xl">Company</h2>
            <li className="font-sans font-semibold text-md">About Us</li>
            <li className="font-sans font-semibold text-md">Blog</li>
            <li className="font-sans font-semibold text-md">Contact Us</li>
            <li className="font-sans font-semibold text-md">Career</li>
          </ul>

          <ul className="leading-8">
            <li className="font-sans font-bold text-xl">Customer-Services</li>
            <li className="font-sans font-semibold text-md">My Account</li>
            <li className="font-sans font-semibold text-md">Trak Your Order</li>
            <li className="font-sans font-semibold text-md">Return</li>
            <li className="font-sans font-semibold text-md">FAQ</li>
          </ul>
          <ul className="leading-8">
            <h2 className="font-sans font-bold text-xl">Our-Information</h2>
            <li className="font-sans font-semibold text-md">Privacy</li>
            <li className="font-sans font-semibold text-md">
              Terms&Conditions
            </li>
            <li className="font-sans font-semibold text-md">Return Policy</li>
            <li className="font-sans font-semibold text-md">Security</li>
          </ul>
          <ul className="leading-8">
            <h2 className="font-sans font-bold text-xl">Contact</h2>
            <li className="font-sans font-semibold text-md">+919493900569</li>
            <li className="font-sans font-semibold text-md">SyamD@gmail.com</li>
            <li className="font-sans font-semibold text-md">7-10,ilavaram,</li>
            <li className="font-sans font-semibold text-md">Andhra Pradesh</li>
          </ul>
        </div>
        <div className="border-b-1 border-gray-500 py-4"></div>
        <p className="py-9 font-bold text-white">
          CopyRight &copy; {year}{" "}
          <span className="text-yellow-400">Best Grocery Store.</span> All
          Rights Reserved
        </p>
      </div>
    </footer>
    // </div>
  );
};

export default Footer;
