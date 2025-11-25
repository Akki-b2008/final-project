import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Cart from "../pages/cart/Cart";
import Favourites from "../pages/favourites/Favourites";
import Profile from "../pages/profile/Profile";
import ProductListing from "../pages/home/ProductListing";
import ProductDetails from "../pages/productDetails/ProductDetails";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/productsListing"} element={<ProductListing />} />
      <Route path={"/productDetails/:productId"} element={<ProductDetails />} />
      <Route path={"/cart"} element={<Cart />} />
      <Route path={"/favourites"} element={<Favourites />} />
      <Route path={"/profile"} element={<Profile />} />
    </Routes>
  );
};

export default MainRoutes;
