import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const withSuspense = (importFn, fallback = "Loading...") => {
  const Component = lazy(importFn);
  return (props) => (
    <React.Suspense fallback={<div>{fallback}</div>}>
      <Component {...props} />
    </React.Suspense>
  );
};

const Home = withSuspense(
  () => import("../pages/home/Home.jsx"),
  "Loading Home..."
);
const Cart = withSuspense(
  () => import("../pages/cart/Cart.jsx"),
  "Loading Cart..."
);
const Checkout = withSuspense(
  () => import("../pages/checkout/Checkout.jsx"),
  "Loading Checkout..."
);
const NotFound = withSuspense(
  () => import("../pages/notFound/NotFound.jsx"),
  "Loading..."
);
const Orders = withSuspense(
  () => import("../pages/orders/Orders.jsx"),
  "Loading Orders..."
);
const OrderDetails = withSuspense(
  () => import("../pages/orders/OrderDetails.jsx"),
  "Loading Order..."
);
const LoginSignup = withSuspense(
  () => import("../pages/loginSignup/LoginSignup.jsx"),
  "Loading Auth..."
);
const ProductDetails = withSuspense(
  () => import("../pages/productDetails/ProductDetails.jsx"),
  "Loading Product..."
);
const Profile = withSuspense(
  () => import("../pages/profile/Profile.jsx"),
  "Loading Profile..."
);
const SellerDashboard = withSuspense(
  () => import("../pages/sellerDashboard/SellerDashboard.jsx"),
  "Loading Dashboard..."
);
const SellerOrders = withSuspense(
  () => import("../pages/sellerOrders/SellerOrders.jsx"),
  "Loading Seller Orders..."
);
const SellerProducts = withSuspense(
  () => import("../pages/sellerProducts/SellerProducts.jsx"),
  "Loading Seller Products..."
);

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
    <Route path="/orders/:orderId" element={<OrderDetails />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/seller/orders" element={<SellerOrders />} />
      <Route path="/seller/products" element={<SellerProducts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
