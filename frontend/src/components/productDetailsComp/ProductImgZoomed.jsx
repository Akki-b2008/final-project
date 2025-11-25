import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const slides = [];

const ProductImgZoomed = () => {
  return (
    <div className="productZoomContainer w-[35%] flex gap-3">
      <div className="slider w-[15%] h-[400px]">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          direction="vertical"
          className="zoomProductSliderThumbs h-[400px] overflow-hidden"
        >
          <SwiperSlide>
            <div className="item">
              <img
                src="https://serviceapi.spicezgold.com/download/1742451791426_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvotwal6de-0-202404071601.webp"
                className="w-full h-full object-cover "
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item ">
              <img
                src="https://serviceapi.spicezgold.com/download/1742451791426_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvotwal6de-0-202404071601.webp"
                className="w-full h-full object-cover "
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item ">
              <img
                src="https://serviceapi.spicezgold.com/download/1742451791426_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvotwal6de-0-202404071601.webp"
                className="w-full h-full object-cover "
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item ">
              <img
                src="https://serviceapi.spicezgold.com/download/1742451791426_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvotwal6de-0-202404071601.webp"
                className="w-full h-full object-cover "
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item ">
              <img
                src="https://serviceapi.spicezgold.com/download/1742451791426_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvotwal6de-0-202404071601.webp"
                className="w-full h-full object-cover "
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="zoomContainer w-[85%] h-[400px] overflow-hidden">
        <InnerImageZoom
          src="https://serviceapi.spicezgold.com/download/1742451791426_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvotwal6de-0-202404071601.webp"
          zoomType="hover"
          zoomScale={1}
          className="h-full"
        />
      </div>
    </div>
  );
};

export default ProductImgZoomed;
