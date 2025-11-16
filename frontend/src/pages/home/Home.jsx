import HeroSlider from "../../components/homeComp/HeroSlider";
import HeroCatSlider from "../../components/homeComp/HeroCatSlider";
import FreeShippingAndAds from "../../components/homeComp/FreeShippingAndAds";
import PopularProducts from "../../components/homeComp/PopularProducts";
import LatestProducts from "../../components/homeComp/LatestProducts";
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div className="home">
      <HeroSlider />
      <HeroCatSlider />
      <PopularProducts />
      <FreeShippingAndAds />
      <LatestProducts />
      <Footer />
    </div>
  );
};

export default Home;
