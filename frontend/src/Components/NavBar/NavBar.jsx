import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PencilIcon, UserMinusIcon, UserIcon } from "@heroicons/react/16/solid";

import { useDispatch } from "react-redux";
import { logOut } from "../../Slice/authSlice";
import Location from "../Location";
import { useSearch } from "../../Contexts/SearchContext";
import useAuthUser from "../../Hooks/useAuthUser";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useAuthUser();
  const { searchTerm, setSearchTerm } = useSearch();
  const location = useLocation();

  const Name = user?.name;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  // const currentPath = location.pathname;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/login");
  };

  // const search = (e) => {
  //   e.preventDefault();
  //   const query = new URLSearchParams();

  //   // Always set keyword
  //   query.set("keyword", searchTerm.trim());

  //   // Optional: Reset to first page
  //   query.set("page", 1);

  //   navigate(`${currentPath}?${query.toString()}`);
  // };

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const keyword = params.get("keyword") || "";
  //    if (keyword !== searchTerm) {
  //     setSearchTerm(keyword);
  //   }
  // }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (!searchTerm && params.get("keyword")) {
      params.delete("keyword");
      navigate(`${location.pathname}`, { replace: true });
    }
  }, [searchTerm, navigate, location]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (searchTerm.trim()) {
      query.set("keyword", searchTerm.trim());
      navigate(`/shop?${query.toString()}`);
    } else {
      // ✅ Clear the URL & refresh the page
      navigate(location.pathname); // Remove query params
    }
  };

  // useEffect(() => {
  //   if (keyword === "") navigate(currentPath);
  // }, [keyword, navigate, currentPath]);

  useEffect(() => {
    const checkAuth = () => {
      try {
        setIsLoggedIn(!!user);
        setLoading(false);
      } catch (err) {
        console.error("Error checking auth status:", err);
        setLoading(false);
      }
    };

    checkAuth();
  }, [user]);

  if (loading)
    return <div className="text-center py-4 text-white">Loading...</div>;

  const NavigationMenuList = [
    { name: "Home", to: "/" },
    { name: "Shop", to: "/shop" },
    { name: "Fruits", to: "/Fruits" },
    { name: "Vegetables", to: "/vegetables" },
    { name: "Beverages", to: "/Beverages" },
    { name: "About Us", to: "/aboutUs" },
    { name: "Blog", to: "/blog" },
  ];

  return (
    <>
      <nav className="bg-green-700 shadow-md sticky top-0 z-50 rounded-t-xl pb-2">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16">
          {/* Top Row */}
          {/* <div className="flex items-center justify-between gap-3 py-3"> */}
          <div className="flex items-center gap-4 p-2">
            {/* Left - Logo and Sidebar Toggle */}
            <div className="flex items-center gap-3">
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

              <div className="flex items-center gap-1">
                <div className="shadow-md rounded-full bg-yellow-300 p-1 text-green-800">
                  <GiFruitBowl className="h-8 w-8" />
                </div>
                <span className="font-bold text-3xl text-white">
                  <Link to="/">
                    Grocery<span className="text-yellow-300">.</span>
                  </Link>
                </span>
              </div>
            </div>

            {/* Center - Location (Desktop Only) */}
            <div className="hidden md:flex flex-col items-center gap-1 text-white">
              <span className="font-bold text-[1.1rem]">Location</span>
              <span className="text-sm">
                <Location />
              </span>
            </div>

            {/* Search - Desktop */}
            <div className="hidden md:flex md:items-center w-full">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className=" w-full py-2 px-4 border rounded-full text-white bg-green-800 placeholder-white focus:outline-yellow-300"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                  <FaSearch />
                </button>
              </form>
            </div>

            <Link
              to="/whishList"
              className="text-white hover:text-yellow-300 p-1"
            >
              <FaHeart className="text-lg" />
            </Link>

            <Link to="/cart" className="text-white hover:text-yellow-300 p-1">
              <FaShoppingCart className="text-lg" />
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="text-white hover:text-yellow-300 p-1">
                <Menu>
                  <MenuButton className="inline-flex items-center gap-2 px-3 py-1.5">
                    <FaUser className="text-lg" />
                  </MenuButton>
                  <MenuItems
                    transition
                    anchor="bottom end"
                    className="z-50 w-52 mt-2 rounded-xl border bg-white p-1 text-sm text-black shadow-lg"
                  >
                    {isLoggedIn ? (
                      <>
                        <MenuItem>
                          <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                            <UserIcon className="size-4 fill-green-700" />
                            {Name || "Guest User"}
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            onClick={logoutHandler}
                            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                          >
                            <UserMinusIcon className="size-4 fill-green-700" />
                            Logout
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                            <PencilIcon className="size-4 fill-green-700" />
                            Edit
                          </button>
                        </MenuItem>
                      </>
                    ) : (
                      <MenuItem>
                        <Link
                          to="/login"
                          className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                        >
                          <PencilIcon className="size-4 fill-green-700" />
                          Login
                        </Link>
                      </MenuItem>
                    )}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          {/* Search - Mobile */}
          <div className="md:hidden mb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 pr-10 border rounded-full text-white bg-green-800 placeholder-white focus:outline-yellow-300"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center justify-between gap-4 p-3 whitespace-nowrap">
            <button className="flex items-center gap-2 border border-gray-300 bg-yellow-300 rounded-xl p-2">
              <FaBars />
              Browse All Categories
            </button>
            {NavigationMenuList.map(({ name, to }) => (
              <Link
                key={name}
                to={to}
                className="text-white font-semibold text-[1.1rem] hover:text-yellow-400"
              >
                {name}
              </Link>
            ))}
            <button className="text-yellow-300 hover:underline">
              Recently Viewed
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-[60] w-64 bg-green-700 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <div className="flex flex-col items-center gap-1 text-white">
            <span className="font-bold text-base md:text-[1.1rem]">
              Location
            </span>
            <span className="text-sm">
              <Location />
            </span>
          </div>
        </div>
        <div className="p-4">
          <ul className="space-y-3 text-white">
            {NavigationMenuList.map(({ name, to }) => (
              <li key={name} onClick={() => setIsSidebarOpen(false)}>
                <Link to={to} className="block py-2 hover:text-yellow-400">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;
