import React from "react";
import FreeShippingBanner from "./freeShippingBanner/FreeShippingBanner";
import AdsBannerSlides from "./freeShippingBanner/AdsBannerSlides";

const FreeShippingAndAds = () => {
  return (
    <section className="py-16 px-8 flex flex-col gap-8 bg-white ">
      <FreeShippingBanner />
      <AdsBannerSlides items={4} />
    </section>
  );
};

export default FreeShippingAndAds;
