import HeroSlider from "../../components/homeComp/HeroSlider";
import HeroCatSlider from "../../components/homeComp/HeroCatSlider";
import FreeShippingAndAds from "../../components/homeComp/FreeShippingAndAds";
import PopularProducts from "../../components/homeComp/PopularProducts";

const Home = () => {
  return (
    <div className="home">
      <HeroSlider />
      <HeroCatSlider />
      <PopularProducts />
      <FreeShippingAndAds />
    </div>
  );
};

export default Home;
