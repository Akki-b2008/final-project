import React from "react";
import FreeShippingBanner from "./freeShippingBanner/FreeShippingBanner";
import AdsBannerSlides from "./freeShippingBanner/AdsBannerSlides";

const FreeShippingAndAds = () => {
  return (
    <section className="py-16  bg-white ">
      <div className="container flex flex-col gap-8">
      <FreeShippingBanner />
      <AdsBannerSlides items={4} />
      </div>
    </section>
  );
};

export default FreeShippingAndAds;
