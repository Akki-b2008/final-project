import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCardGridView";

const productsData = [
  {
    id: 1,
    productName: "Women Wide Leg",
    brandName: "Soylent Green",
    price: "₹799",
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/441015307_ltyellow/oxford-regular-fit-shirt-with-patch-pocket-model3-441015307_ltyellow-3-202104091000.jpg?im=Resize=(600,750)",

    href: "/",
  },
  {
    id: 2,
    productName: "Minimalist Smartwatch",
    brandName: "GadgetHub",
    price: "₹4,999",
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/441015307_ltyellow/oxford-regular-fit-shirt-with-patch-pocket-model3-441015307_ltyellow-3-202104091000.jpg?im=Resize=(600,750)",
    href: "/",
  },
  {
    id: 3,
    productName: "Leather Office Bag",
    brandName: "Urban Street",
    price: "₹2,499",
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/441015307_ltyellow/oxford-regular-fit-shirt-with-patch-pocket-model3-441015307_ltyellow-3-202104091000.jpg?im=Resize=(600,750)",
    href: "/",
  },
  {
    id: 4,
    productName: "Wireless Earbuds",
    brandName: "SoundWave",
    price: "₹1,799",
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/441015307_ltyellow/oxford-regular-fit-shirt-with-patch-pocket-model3-441015307_ltyellow-3-202104091000.jpg?im=Resize=(600,750)",
    href: "/",
  },
  {
    id: 5,
    productName: "Fitness Tracker",
    brandName: "WellnessPro",
    price: "₹1,299",
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/441015307_ltyellow/oxford-regular-fit-shirt-with-patch-pocket-model3-441015307_ltyellow-3-202104091000.jpg?im=Resize=(600,750)",
    href: "/",
  },
  {
    id: 6,
    productName: "Casual Sneakers",
    brandName: "StreetStyle",
    price: "₹2,199",
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/441015307_ltyellow/oxford-regular-fit-shirt-with-patch-pocket-model3-441015307_ltyellow-3-202104091000.jpg?im=Resize=(600,750)",
    href: "/",
  },
  {
    id: 7,
    productName: "Denim Jacket",
    brandName: "Blue Horizon",
    price: "₹1,999",
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/441015307_ltyellow/oxford-regular-fit-shirt-with-patch-pocket-model3-441015307_ltyellow-3-202104091000.jpg?im=Resize=(600,750)",
    href: "/",
  },
  {
    id: 8,
    productName: "Classic Aviators",
    brandName: "SunGuard",
    price: "₹999",
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/441015307_ltyellow/oxford-regular-fit-shirt-with-patch-pocket-model3-441015307_ltyellow-3-202104091000.jpg?im=Resize=(600,750)",
    href: "/",
  },
  {
    id: 9,
    productName: "Classic Aviators",
    brandName: "SunGuard",
    price: "₹999",
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/441015307_ltyellow/oxford-regular-fit-shirt-with-patch-pocket-model3-441015307_ltyellow-3-202104091000.jpg?im=Resize=(600,750)",
    href: "/",
  }
];

const ProductsSlider = (props) => {
  return (
    <div className="productSlider">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={24}
        pagination={{ clickable: true }}
        modules={[Navigation]}
        navigation={true}
        className="sliderhome"
      >
        {productsData.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
