// import React from "react";
// import { Link } from "react-router-dom";
// import { GiFruitBowl } from "react-icons/gi";

// const Footer = () => {
//   const date = new Date();
//   const year = date.getFullYear();

//   return (
//     <footer className="bg-green-700 shadow-md rounded-b-xl">
//       <div className="max-w-full mx-auto px-16 py-8">
//         <div className="grid grid-cols-2  justify-items-start sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 text-white">
//           <div>
//             {/* <div className="flex items-center gap-2"> */}
//             <div className="flex gap-1">
//               <div className="w-fit rounded-full bg-yellow-300 p-1 text-green-700 hover:text-green-600 focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-yellow-300 focus:outline-hidden">
//                 <GiFruitBowl className="h-8 w-8 rounded-full " />
//               </div>
//               <span className="font-bold text-3xl text-white inset-0 sm:inline">
//                 Grocery<span className="text-yellow-300">.</span>
//               </span>
//             </div>
//             <p className="font-sans font-semibold text-md leading-8 mr-7">
//               Perspiciatis, dicta iste inventore, laudantium quam eaque neque
//               amet fugiat iusto saepe deleniti harum expedita veritatis fuga.
//             </p>
//           </div>
//           <ul className="leading-8">
//             <h2 className="font-sans font-bold text-xl">Company</h2>
//             <li className="font-sans font-semibold text-md">About Us</li>
//             <li className="font-sans font-semibold text-md">Blog</li>
//             <li className="font-sans font-semibold text-md">Contact Us</li>
//             <li className="font-sans font-semibold text-md">Career</li>
//           </ul>

//           <ul className="leading-8">
//             <li className="font-sans font-bold text-xl">Customer-Services</li>
//             <li className="font-sans font-semibold text-md">My Account</li>
//             <li className="font-sans font-semibold text-md">Trak Your Order</li>
//             <li className="font-sans font-semibold text-md">Return</li>
//             <li className="font-sans font-semibold text-md">FAQ</li>
//           </ul>
//           <ul className="leading-8">
//             <h2 className="font-sans font-bold text-xl">Our-Information</h2>
//             <li className="font-sans font-semibold text-md">Privacy</li>
//             <li className="font-sans font-semibold text-md">
//               Terms&Conditions
//             </li>
//             <li className="font-sans font-semibold text-md">Return Policy</li>
//             <li className="font-sans font-semibold text-md">Security</li>
//           </ul>
//           <ul className="leading-8">
//             <h2 className="font-sans font-bold text-xl">Contact</h2>
//             <li className="font-sans font-semibold text-md">+919493900569</li>
//             <li className="font-sans font-semibold text-md">SyamD@gmail.com</li>
//             <li className="font-sans font-semibold text-md">7-10,ilavaram,</li>
//             <li className="font-sans font-semibold text-md">Andhra Pradesh</li>
//           </ul>
//         </div>
//         <div className="border-b-1 border-gray-500 py-4"></div>
//         <p className="py-9 font-bold text-white">
//           CopyRight &copy; {year}{" "}
//           <span className="text-yellow-400">Best Grocery Store.</span> All
//           Rights Reserved
//         </p>
//       </div>
//     </footer>
//     // </div>
//   );
// };

// export default Footer;

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
          &copy; {year} <span className="text-yellow-400">Best Grocery Store.</span> All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

