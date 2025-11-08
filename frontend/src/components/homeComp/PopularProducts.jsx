import LeftSection from "./popularProductsComp/LeftSection";
import ProductsSlider from "../ProductsComp/ProductsSlider";
import RightSection from "./popularProductsComp/RightSection";

const PopularProducts = () => {
  return (
    <section className="bg-white py-8">
      <div className="container flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <LeftSection />
          <RightSection />
        </div>

        <ProductsSlider items={6} />
      </div>
    </section>
  );
};

export default PopularProducts;
