import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Link } from "react-router-dom";
import BannerBox from "./BannerBox";

const AdsBannerSlides = (props) => {
  return (
    <div className="w-full px-8">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        className="mySwiper"
      >
        <SwiperSlide>
          <BannerBox img={"Banners/banner1.webp"} link={"/"} />
        </SwiperSlide>

        <SwiperSlide>
          <BannerBox img={"Banners/banner2.webp"} link={"/"} />
        </SwiperSlide>

        <SwiperSlide>
          <BannerBox img={"Banners/banner3.webp"} link={"/"} />
        </SwiperSlide>

        <SwiperSlide>
          <BannerBox img={"Banners/banner4.webp"} link={"/"} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlides;
