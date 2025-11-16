import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";

const heroSlides = [
  {
    id: 1,
    alt: "Stay ahead with the latest tech",
    image:
      "https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg",
  },
  {
    id: 2,
    alt: "Fresh arrivals for every style",
    image:
      "https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg",
  },
  {
    id: 3,
    alt: "Exclusive deals you cannot miss",
    image: "https://serviceapi.spicezgold.com/download/1759938751802_30744.jpg",
  },
  {
    id: 4,
    alt: "Upgrade your workspace essentials",
    image: "https://serviceapi.spicezgold.com/download/1762393391071_34296.jpg",
  },
];

const HeroSlider = () => {
  return (
    <section className="home-slider py-4 pt-6 bg-[#e7e2e2c5]">
      <div className="container">
        <Swiper
          spaceBetween={24}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Navigation, Autoplay]}
          navigation={true}
          className="sliderhome"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id} className="sliderhome">
              <div className="item rounded-[20px] overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[20px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSlider;
