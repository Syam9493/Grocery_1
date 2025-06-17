import React, { useState } from "react";
import {
  // FaMapMarkerAlt,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";
import Location from "../Location";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const NavigationMenuList = [
    { name: "Home", to: "/" },
    { name: "Shop", to: "/shop" },
    { name: "Fruits", to: "/fruits" },
    { name: "Vegetables", to: "/vegetables" },
    { name: "Beverages", to: "/beverages" },
    { name: "Abouts Us", to: "/aboutUs" },
    { name: "Blog", to: "/blog" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-green-700 shadow-md sticky top-0 z-50 rounded-t-xl">
        <div className="max-w-7xl mx-auto px-2">
          {/* Top Row - Always visible (logo + icons) */}
          <div className="flex items-center justify-between py-3 mb-4">
            {/* Left side - Logo and Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button - visible only on small screens */}
              <button
                className="md:hidden text-white hover:text-yellow-300"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>

              {/* Logo */}
              <div className="flex items-center gap-1">
                <div className="shadow-md rounded-full bg-yellow-300 p-1 text-green-800 hover:text-green-600 focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-yellow-300 focus:outline-hidden">
                  <GiFruitBowl className="h-8 w-8 rounded-full " />
                </div>
                <span className="font-bold text-3xl text-white shadow-gray-400 sm:inline">
                  <Link to="/">
                    {" "}
                    Grocery<span className="text-yellow-300">.</span>
                  </Link>
                </span>
              </div>
            </div>
            {/* Location - Only visible on desktop */}
            <div className="hidden absolute left-1/4 md:flex flex-col items-center gap-1 text-white">
              {/* <FaMapMarkerAlt className="text-sm" /> */}
              <span className="font-sans font-semibold text-[1.1rem]">
                Location
              </span>
              <span className="text-sm">
                <Location />
              </span>
            </div>

            {/* Icons - Always visible */}
            <div className="flex items-center gap-4 lef-2/6">
              <button className="text-white hover:text-yellow-300 p-1">
                <Link to="/whishList">
                  <FaHeart className="text-lg" />
                </Link>
              </button>
              <button className="text-white hover:text-yellow-300 p-1">
                <Link to="/cart">
                  <FaShoppingCart className="text-lg" />
                </Link>
              </button>
              <button className="text-white hover:text-yellow-300 p-1">
                <Link to="/login">
                  <FaUser className="text-lg" />
                </Link>
              </button>
            </div>
          </div>
          {/* Search Bar - Mobile version (below) */}
          <div className="pb-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full font-sans font-semibold text-[1rem] py-2 px-4 pr-10 border rounded-full outline-2 -outline-offset-2 outline-yellow-400 focus:outline-3 focus:-outline-offset-3 focus:outline-yellow-300 text-sm text-white"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <FaSearch className="text-sm" />
              </button>
            </div>
          </div>
          {/* Search Bar - Desktop version (in row) */}
          <div className="hidden md:block absolute top-3 left-3/5 transform -translate-x-2/4 w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="text-white font-sans font-semibold text-[1rem] w-full py-2 px-4 pr-10 border rounded-full outline-1 -outline-offset-1 outline-yellow-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-300 shadow-md text-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <FaSearch className="text-sm" />
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-between gap-3 p-3">
            <button
              type="button"
              className="flex items-center gap-2 border border-gray-300 rounded-xl transform bg-yellow-300 p-2"
            >
              <span>
                <FaBars />
              </span>
              Browse All Categories
            </button>
            {NavigationMenuList.map(({ name, to }) => (
              <div key={name} className="p-2">
                <ul className="flex items-center gap-9 text-white">
                  <li className="font-sans font-semibold text-[1.1rem]">
                    <Link to={to}>{name}</Link>
                  </li>
                </ul>
              </div>
            ))}
            <div className="p-2 text-yellow-300">
              <button>Recently Viewed</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-green-700 shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b text-white">
          <h3 className="text-lg font-semibold">Menu</h3>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-yellow-300"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="p-4">
          <ul className="space-y-3 text-white">
            {NavigationMenuList.map((item) => (
              <li
                className="font-sans font-semibold text-[1.1rem]"
                key={item.name}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Link
                  to={item.to}
                  key={item.name}
                  className="block py-2 hover:text-yellow-400"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay - visible when sidebar is open */}
      {/* {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )} */}
    </>
  );
};

export default Navbar;
