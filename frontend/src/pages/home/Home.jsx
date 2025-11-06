import PopularProducts from "../../components/homeComp/PopularProducts";
import SwiperCategories from "../../components/homeComp/HeroCatSlider";
import HeroSlider from "../../components/homeComp/HeroSlider";
import HeroCatSlider from "../../components/homeComp/HeroCatSlider";

const Home = () => {
  return (
    <div className="home">
      <div className="bg-[#e7e2e2c5]">
        <HeroSlider />
        <HeroCatSlider />
      </div>

      <PopularProducts />
    </div>
  );
};

export default Home;
