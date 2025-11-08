import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";

const productsData = [
  {
    id: 1,
    title: "Women Wide Leg",
    subtitle: "Soylent Green",
    price: "₹799",
    image:
      "https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg",
    href: "/",
  },
  {
    id: 2,
    title: "Minimalist Smartwatch",
    subtitle: "GadgetHub",
    price: "₹4,999",
    image:
      "https://serviceapi.spicezgold.com/download/1759451984694_pexels-on-shot-2798478.jpg",
    href: "/",
  },
  {
    id: 3,
    title: "Leather Office Bag",
    subtitle: "Urban Street",
    price: "₹2,499",
    image:
      "https://serviceapi.spicezgold.com/download/1735793110791_pexels-heitor-verdi-4835239.jpg",
    href: "/",
  },
  {
    id: 4,
    title: "Wireless Earbuds",
    subtitle: "SoundWave",
    price: "₹1,799",
    image:
      "https://serviceapi.spicezgold.com/download/1734029139186_pexels-cottonbro-5083408.jpg",
    href: "/",
  },
  {
    id: 5,
    title: "Fitness Tracker",
    subtitle: "WellnessPro",
    price: "₹1,299",
    image:
      "https://serviceapi.spicezgold.com/download/1729075843478_pexels-andres-ayrton-6551422.jpg",
    href: "/",
  },
  {
    id: 6,
    title: "Casual Sneakers",
    subtitle: "StreetStyle",
    price: "₹2,199",
    image:
      "https://serviceapi.spicezgold.com/download/1743985760457_pexels-ray-piedra-1478442.jpg",
    href: "/",
  },
  {
    id: 7,
    title: "Denim Jacket",
    subtitle: "Blue Horizon",
    price: "₹1,999",
    image:
      "https://serviceapi.spicezgold.com/download/1736017635802_pexels-kaique-rocha-338109.jpg",
    href: "/",
  },
  {
    id: 8,
    title: "Classic Aviators",
    subtitle: "SunGuard",
    price: "₹999",
    image:
      "https://serviceapi.spicezgold.com/download/1718942750434_pexels-porapak-apichodilok-346745.jpg",
    href: "/",
  },
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
