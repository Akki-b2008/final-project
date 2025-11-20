import Sidebar from "../../components/productsListing/sidebar/Sidebar";
import ProductsListingSec from "../../components/productsListing/productListingSec/ProductsListingSec";

const ProductListing = () => {
  return (
    <section className=" bg-white ">
      <div className="container flex gap-3 items-start overflow-visible">
        <Sidebar />
        <ProductsListingSec />
      </div>
    </section>
  );
};

export default ProductListing;
