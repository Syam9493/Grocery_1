import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
//import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const NextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: "block",
//         background: "green",
//         borderRadius: "1px",
//       }}
//       onClick={onClick}
//     />
//   );
// };

// const PrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// };

const Categories = () => {
  const icons = [
    {
      _id: 1,
      img: "/Icons/vegetables.png",
      name: "Vegetables",
      Quantity: "52 Products",
      to: "/Vegetables",
    },
    {
      _id: 2,
      img: "/Icons/gift.png",
      name: "Fresh Fruits",
      Quantity: "2 Products",
      to: "/fruits",
    },
    {
      _id: 3,
      img: "/Icons/ingredients.png",
      name: "Milk & Eggs",
      Quantity: "10 Products",
      to: "/Milk-Eggs",
    },
    {
      _id: 4,
      img: "/Icons/bread.png",
      name: "Bekary Items",
      Quantity: "25 Products",
      to: "/BekaryItems",
    },
    {
      _id: 5,
      img: "/Icons/cleaning.png",
      name: "Cleaning Items",
      Quantity: "15 Products",
      to: "/CleaningItems",
    },
    {
      _id: 6,
      img: "/Icons/almonds.png",
      name: "Dry Fruits",
      Quantity: "33 Products",
      to: "/fruits",
    },
    {
      _id: 7,
      img: "/Icons/cocktail.png",
      name: "Cool Drinks",
      Quantity: "20 Products",
      to: "/beverages",
    },
    {
      _id: 8,
      img: "/Icons/rice.png",
      name: "Rice Items",
      Quantity: "20 Products",
      to: "/RiceItems",
    },
    {
      _id: 9,
      img: "/Icons/sunflower-oil.png",
      name: "Oil",
      Quantity: "20 Products",
      to: "/sunflower-oil",
    },
  ];

  // const settings = {
  //   className: "center",
  //   dots: true,
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "60px",
  //   slidesToShow: 3,
  //   slidToScroll: 2,
  //   speed: 500,
  //   // nextArrow: <NextArrow />,
  //   // prevArrow: <PrevArrow />,
  // };
  return (
    <>
      <div className="flex flex-col justify-center items-center mb-16 mt-16">
        <h1 className="text-4xl font-medium text-gray-500">Categories</h1>
        <h1 className="mt-7 font-bold text-4xl/5">
          Featured <span className="text-green-700">Categories</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto">
        <Swiper
          slidesPerView={2}
          spaceBetween={11}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {icons.map((items) => (
            <SwiperSlide>
              <div
                key={items._id}
                className="flex items-center justify-center "
              >
                <Link to={items.to}>
                <div className="flex flex-col items-center justify-center gap-x-4">
                  <div className="bg-gray-100 size-40 shadow-md flex items-center justify-center rounded-full gap-4">
                    <img
                      className="inline-flex rounded-full"
                      src={items.img}
                      alt=""
                    />
                  </div>
                  <h4 className="text-xl font-medium text-black mt-3">
                    {items.name}
                  </h4>
                  <p className="font-semibold font-stretch-50% text-gray-500">
                    {items.Quantity}
                  </p>
                </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Categories;
