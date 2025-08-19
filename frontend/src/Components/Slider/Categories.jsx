import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Categories.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Categories = () => {
  const icons = [
    {
      _id: 1,
      img: "/Icons/vegetables.png",
      name: "Vegetables",
      Quantity: "52 Products",
      to: "/vegetables",
    },
    {
      _id: 2,
      img: "/Icons/gift.png",
      name: "Fresh Fruits",
      Quantity: "2 Products",
      to: "/Fruits",
    },
    {
      _id: 3,
      img: "/Icons/ingredients.png",
      name: "Milk & Eggs",
      Quantity: "10 Products",
      to: "/milkAndEggs",
    },
    {
      _id: 4,
      img: "/Icons/bread.png",
      name: "Bakery Items",
      Quantity: "25 Products",
      to: "/bakeryItems",
    },
    {
      _id: 5,
      img: "/Icons/cleaning.png",
      name: "Cleaning Items",
      Quantity: "15 Products",
      to: "/cleaningItems",
    },
    {
      _id: 6,
      img: "/Icons/almonds.png",
      name: "Dry Fruits",
      Quantity: "33 Products",
      to: "/dryFruits",
    },
    {
      _id: 7,
      img: "/Icons/cocktail.png",
      name: "Cool Drinks",
      Quantity: "20 Products",
      to: "/Beverages",
    },
    {
      _id: 8,
      img: "/Icons/rice.png",
      name: "Rice Items",
      Quantity: "20 Products",
      to: "/riceItems",
    },
    {
      _id: 9,
      img: "/Icons/sunflower-oil.png",
      name: "Oil",
      Quantity: "20 Products",
      to: "/oilItems",
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

      <div className="relative group">
        <Swiper
          slidesPerView={2}
          spaceBetween={11}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {icons.map((items) => (
            <SwiperSlide key={items._id}>
              <div className="flex items-center justify-center">
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
                    <p className="font-semibold text-gray-500">
                      {items.Quantity}
                    </p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* custom arrows */}
        <button className="swiper-button-prev-custom">
          <FaChevronLeft />
        </button>
        <button className="swiper-button-next-custom">
          <FaChevronRight />
        </button>
      </div>
    </>
  );
};

export default Categories;
