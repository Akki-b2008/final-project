import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Link } from "react-router-dom";

const heroCatSlider = [
  {
    id: 1,
    alt: "Fashion category",
    catName: "Fashion",
    image:
      "https://serviceapi.spicezgold.com/download/1761905882455_file_1734525204708_fash.png",
  },
  {
    id: 2,
    alt: "Electronics category",
    catName: "Electronics",
    image:
      "https://serviceapi.spicezgold.com/download/1761905929738_file_1734525218436_ele.png",
  },
  {
    id: 3,
    alt: "Bags category",
    catName: "Bags",
    image:
      "https://serviceapi.spicezgold.com/download/1761905971086_file_1734525231018_bag.png",
  },
  {
    id: 4,
    alt: "Footwear category",
    catName: "Footwear",
    image:
      "https://serviceapi.spicezgold.com/download/1761905982766_file_1734525239704_foot.png",
  },
  {
    id: 5,
    alt: "Grocery category",
    catName: "Grocery",
    image:
      "https://serviceapi.spicezgold.com/download/1761905996339_file_1734525248057_gro.png",
  },
  {
    id: 6,
    alt: "Beauty category",
    catName: "Beauty",
    image:
      "https://serviceapi.spicezgold.com/download/1761906005923_file_1734525255799_beauty(1).png",
  },
  {
    id: 7,
    alt: "Wellness category",
    catName: "Wellness",
    image:
      "https://serviceapi.spicezgold.com/download/1761906015678_file_1734525275367_well.png",
  },
  {
    id: 8,
    alt: "Jewellery category",
    catName: "Jewellery",
    image:
      "https://serviceapi.spicezgold.com/download/1761906025549_file_1734525286186_jw.png",
  },
];

const HeroCatSlider = () => {
  return (
    <section className="heroCatSlider py-4 pb-6 bg-[#e7e2e2c5]">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          className="mySwiper"
        >
          {heroCatSlider.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Link to="/">
                <div className="item p-3 bg-white rounded-sm text-center flex flex-col items-center justify-center">
                  <img
                    src={`${slide.image}`}
                    alt={slide.alt}
                    className="w-[70px]"
                  />
                  <h3 className="text-[16px] font-[600] mt-3">
                    {slide.catName}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroCatSlider;
