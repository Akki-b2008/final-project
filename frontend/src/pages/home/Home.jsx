import HeroSlider from "../../components/homeComp/HeroSlider";
import HeroCatSlider from "../../components/homeComp/HeroCatSlider";
import FreeShippingAndAds from "../../components/homeComp/FreeShippingAndAds";

const Home = () => {
  return (
    <div className="home">
      <div className="bg-[#e7e2e2c5]">
        <HeroSlider />
        <HeroCatSlider />
      </div>

     

      <FreeShippingAndAds />
    </div>
  );
};

export default Home;
