import React from "react";
import  {Link} from 'react-router-dom'
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
            <p className="leading-8">
              Perspiciatis, dicta iste inventore, laudantium quam eaque neque
              amet fugiat iusto saepe deleniti harum expedita veritatis fuga.
            </p>
          </div>
          <ul className="leading-8">
            <h2 className="text-xl">Company</h2>
            <li>About Us</li>
            <li>Blog</li>
            <li>Contact Us</li>
            <li>Career</li>
          </ul>

          <ul className="leading-8">
            <li className="text-xl">Customer-Services</li>
            <li>My Account</li>
            <li>Trak Your Order</li>
            <li>Return</li>
            <li>FAQ</li>
          </ul>
          <ul className="leading-8">
            <h2 className="text-xl">Our-Information</h2>
            <li>Privacy</li>
            <li>Terms&Conditions</li>
            <li>Return Policy</li>
            <li>Security</li>
          </ul>
          <ul className="leading-8">
            <h2 className="text-xl">Contact</h2>
            <li>+919493900569</li>
            <li>SyamD@gmail.com</li>
            <li>7-10,ilavaram,</li>
            <li>Andhra Pradesh</li>
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
