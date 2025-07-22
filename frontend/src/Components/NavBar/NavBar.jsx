// import React, { useState, useEffect } from "react";
// import {
//   // FaMapMarkerAlt,
//   FaSearch,
//   FaHeart,
//   FaShoppingCart,
//   FaUser,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { GiFruitBowl } from "react-icons/gi";
// import {Menu,MenuButton,MenuItem, MenuItems} from '@headlessui/react';
// import {
//   PencilIcon,
//   UserMinusIcon,
//   UserPlusIcon
// } from '@heroicons/react/16/solid';

// import {useDispatch}  from 'react-redux';
// import { useNavigate,useLocation  } from 'react-router-dom';

// import Location from "../Location";
// import {logOut} from '../../Slice/authSlice';

// const Navbar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);       // add loading flag
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [keyword, setKeyword] = useState([]);

//   //console.log(keyword);

//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   const userName = userInfo?.name;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//     const currentPath = location.pathname;

//     const search = (e) => {
//        e.preventDefault();
//     const query = new URLSearchParams();
//     if (keyword.trim()) {
//       query.set('keyword', keyword);
//     }

//     navigate(`${currentPath}?${query.toString()}`);
//     }

//    useEffect(() => {
//     if (keyword === '') {
//       navigate(currentPath); // reset to full category page
//     }
//   }, [keyword, navigate, currentPath]);

//   useEffect(() => {
//     const auth = localStorage.getItem("userInfo");

//     if (auth) {
//       try {
//         const user = JSON.parse(auth);
//         if (user && user._id) {
//           setIsLoggedIn(true);
//         }
//       } catch (err) {
//         console.error("Invalid user data in localStorage", err.message);
//       }
//     }

//     setLoading(false); // stop loading after check
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const NavigationMenuList = [
//     { name: "Home", to: "/" },
//     { name: "Shop", to: "/shop" },
//     { name: "Fruits", to: "/Fruits" },
//     { name: "Vegetables", to: "/vegetables" },
//     { name: "Beverages", to: "/Beverages" },
//     { name: "Abouts Us", to: "/aboutUs" },
//     { name: "Blog", to: "/blog" },
//   ];

//   const logoutHandler = () => {
//      dispatch(logOut());
//      navigate('/login');
//   }

//   if(loading) <div>Loading...</div>

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="bg-green-700 shadow-md sticky top-0 z-50 rounded-t-xl">
//         <div className="max-w-full mx-auto px-16">
//           {/* Top Row - Always visible (logo + icons) */}
//           <div className="flex items-center justify-between py-3 mb-4">
//             {/* Left side - Logo and Mobile Menu */}
//             <div className="flex items-center gap-3">
//               {/* Mobile Menu Button - visible only on small screens */}
//               <button
//                 className="md:hidden text-white hover:text-yellow-300"
//                 onClick={toggleSidebar}
//               >
//                 {isSidebarOpen ? (
//                   <FaTimes className="text-xl" />
//                 ) : (
//                   <FaBars className="text-xl" />
//                 )}
//               </button>

//               {/* Logo */}
//               <div className="flex items-center gap-1">
//                 <div className="shadow-md rounded-full bg-yellow-300 p-1 text-green-800 hover:text-green-600 focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-yellow-300 focus:outline-hidden">
//                   <GiFruitBowl className="h-8 w-8 rounded-full " />
//                 </div>
//                 <span className="font-bold text-3xl text-white shadow-gray-400 sm:inline">
//                   <Link to="/">
//                     Grocery<span className="text-yellow-300">.</span>
//                   </Link>
//                 </span>
//               </div>
//             </div>
//             {/* Location - Only visible on desktop */}
//             <div className="hidden absolute md:left-1/5 md:flex flex-col items-center gap-1 text-white">
//               {/* <FaMapMarkerAlt className="text-sm" /> */}
//               <span className="font-sans font-bold text-[1.1rem]">
//                 Location
//               </span>
//               <span className="text-sm">
//                 <Location />
//               </span>
//             </div>

//             {/* Icons - Always visible */}
//             <div className="flex items-center gap-4 lef-2/6">
//               <button className="text-white hover:text-yellow-300 p-1">
//                 <Link to="/whishList">
//                   <FaHeart className="text-lg" />
//                 </Link>
//               </button>
//               <button className="text-white hover:text-yellow-300 p-1">
//                 <Link to="/cart">
//                   <FaShoppingCart className="text-lg" />
//                 </Link>
//               </button>
//             <div className="text-white hover:text-yellow-300 p-1">
//       <Menu>
//         <MenuButton className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white">
//          <FaUser className="text-lg" />
//         </MenuButton>

//         <MenuItems
//           transition
//           anchor="bottom end"
//           className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-50 p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-50"
//         >
//          {isLoggedIn ?
//          <>
//          <MenuItem>
//             <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
//               <UserMinusIcon className="size-4 fill-green-700" />
//               <h2>{userName}</h2>
//               <kbd className="ml-auto hidden font-sans text-xs text-green-700 group-data-focus:inline">🆑E</kbd>
//             </button>
//           </MenuItem>

//          <MenuItem>
//             <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10" onClick={logoutHandler}>
//               <UserMinusIcon className="size-4 fill-green-700" />
//               Logout
//               <kbd className="ml-auto hidden font-sans text-xs text-green-700 group-data-focus:inline">🆑E</kbd>
//             </button>
//           </MenuItem>
//           <MenuItem>
//             <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
//               <PencilIcon className="size-4 fill-green-700" />
//               Edit
//               <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘E</kbd>
//             </button>
//           </MenuItem>
//           </> :
//            <MenuItem>
//             <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
//               <PencilIcon className="size-4 fill-green-700" />
//               <Link to="/login">Login</Link>
//               <kbd className="ml-auto hidden font-sans text-xs text-green-700 group-data-focus:inline">🆑E</kbd>
//             </button>
//           </MenuItem>  }
//           <div className="my-1 h-px bg-white/5" />
//         </MenuItems>
//       </Menu>
//     </div>
//             </div>
//           </div>
//           {/* Search Bar - Mobile version (below) */}
//           <div className="pb-3 md:hidden">
//             <div className="relative">
//               <form onSubmit={search}>
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={keyword}
//                 onChange={(e) => setKeyword(e.target.value)}
//                 className="w-full font-sans font-semibold text-[1rem] py-2 px-4 pr-10 border rounded-full outline-2 -outline-offset-2 outline-yellow-400 focus:outline-3 focus:-outline-offset-3 focus:outline-yellow-300 text-sm text-white"
//               />
//               <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                 <FaSearch className="text-sm" />
//               </button>
//               </form>
//             </div>
//           </div>
//           {/* Search Bar - Desktop version (in row) */}
//           <div className="hidden md:block absolute top-3 left-3/5 transform -translate-x-2/4 w-1/3">
//             <div className="relative">
//               <form onSubmit={search}>
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={keyword}
//                 onChange={(e) => setKeyword(e.target.value)}
//                 className="text-white font-sans font-semibold text-[1rem] w-full py-2 px-4 pr-10 border rounded-full outline-1 -outline-offset-1 outline-yellow-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-300 shadow-md text-sm"
//               />
//               <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                 <FaSearch className="text-sm" />
//               </button>
//               </form>
//             </div>
//           </div>
//           <div className="hidden md:flex items-center justify-between gap-3 p-3">
//             <button
//               type="button"
//               className="flex items-center gap-2 border border-gray-300 rounded-xl transform bg-yellow-300 p-2"
//             >
//               <span>
//                 <FaBars />
//               </span>
//               Browse All Categories
//             </button>
//             {NavigationMenuList.map(({ name, to }) => (
//               <div key={name} className="p-2">
//                 <ul className="flex items-center gap-9 text-white">
//                   <li className="font-sans font-semibold text-[1.1rem]">
//                     <Link to={to}>{name}</Link>
//                   </li>
//                 </ul>
//               </div>
//             ))}
//             <div className="p-2 text-yellow-300">
//               <button>Recently Viewed</button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-green-700 shadow-lg transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out md:hidden`}
//       >
//         <div className="flex items-center justify-between p-4 border-b text-white">
//           <h3 className="text-lg font-semibold">Menu</h3>
//           <button
//             onClick={toggleSidebar}
//             className="text-white hover:text-yellow-300"
//           >
//             <FaTimes className="text-xl" />
//           </button>
//         </div>
//         <div className="p-4">
//           <ul className="space-y-3 text-white">
//             {NavigationMenuList.map((item) => (
//               <li
//                 className="font-sans font-semibold text-[1.1rem]"
//                 key={item.name}
//                 onClick={() => setIsSidebarOpen(false)}
//               >
//                 <Link
//                   to={item.to}
//                   key={item.name}
//                   className="block py-2 hover:text-yellow-400"
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Overlay - visible when sidebar is open */}
//       {/* {isSidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )} */}
//     </>
//   );
// };

// export default Navbar;

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
import { useSearch } from "../../Slice/SearchContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userName = userInfo?.name;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  // const currentPath = location.pathname;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const { searchTerm, setSearchTerm } = useSearch();
  const location = useLocation();
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
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (searchTerm.trim()) {
      query.set("keyword", searchTerm.trim());
      navigate(`${location.pathname}?${query.toString()}`);
    } else {
      // ✅ Clear the URL & refresh the page
      navigate(location.pathname); // Remove query params
    }
  };

  // useEffect(() => {
  //   if (keyword === "") navigate(currentPath);
  // }, [keyword, navigate, currentPath]);

  useEffect(() => {
    const auth = localStorage.getItem("userInfo");
    if (auth) {
      try {
        const user = JSON.parse(auth);
        if (user && user._id) setIsLoggedIn(true);
      } catch (err) {
        console.error("Invalid user data in localStorage", err.message);
      }
    }
    setLoading(false);
  }, []);

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
                            {userName}
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

          {/* Search - Desktop */}
          {/* <div className="hidden md:flex justify-center w-full my-2 -space-y-4">
            <form onSubmit={handleSearch} className="w-2/3 relative">
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
          </div> */}

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center justify-between gap-4 p-3 overflow-x-auto whitespace-nowrap">
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
