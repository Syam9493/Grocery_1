import React from "react";
import { GiFruitBowl } from "react-icons/gi";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-green-700 shadow-md rounded-b-xl text-white">
      <div className="max-w-full mx-auto px-4 sm:px-8 lg:px-16 py-8">
        {/* Grid Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Logo & About */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <div className="rounded-full bg-yellow-300 p-1 text-green-700">
                <GiFruitBowl className="h-8 w-8" />
              </div>
              <span className="text-3xl font-bold">
                Grocery<span className="text-yellow-300">.</span>
              </span>
            </div>
            <p className="text-sm leading-6 font-medium">
              Perspiciatis, dicta iste inventore, laudantium quam eaque neque
              amet fugiat iusto saepe deleniti harum expedita veritatis fuga.
            </p>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-xl font-bold mb-2">Company</h2>
            <ul className="space-y-1 text-sm font-medium">
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact Us</li>
              <li>Career</li>
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h2 className="text-xl font-bold mb-2">Customer Services</h2>
            <ul className="space-y-1 text-sm font-medium">
              <li>My Account</li>
              <li>Track Your Order</li>
              <li>Return</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Our Information */}
          <div>
            <h2 className="text-xl font-bold mb-2">Our Information</h2>
            <ul className="space-y-1 text-sm font-medium">
              <li>Privacy</li>
              <li>Terms & Conditions</li>
              <li>Return Policy</li>
              <li>Security</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-bold mb-2">Contact</h2>
            <ul className="space-y-1 text-sm font-medium">
              <li>+91 94939 00569</li>
              <li>SyamD@gmail.com</li>
              <li>7-10, Ilavaram</li>
              <li>Andhra Pradesh</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-500"></div>

        {/* Footer Bottom Text */}
        <p className="text-center font-semibold text-sm">
          &copy; {year}{" "}
          <span className="text-yellow-400">Best Grocery Store.</span> All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
