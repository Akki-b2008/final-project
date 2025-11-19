import React from "react";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";

const ByPrice = () => {
  const [priceValue, setPriceValue] = useState([100, 100000]);

  return (
    <div className="box mb-5">
      <h2 className="w-full pr-5 font-montserrat text-[17px] font-[600] mb-3 flex items-center">
        Shop By Price
      </h2>

      <RangeSlider
        value={priceValue}
        onInput={setPriceValue}
        min={100}
        max={100000}
        step={5}
      />

      <div className="flex gap-2 pt-2 pb-2 priceRange font-montserrat">
        <span className="text-[15px]">
          From: <strong className="text-[15px]">Rs: {priceValue[0]}</strong>
        </span>
        <span className="ml-auto text-[15px]">
          To: <strong className="text-[15px]">Rs: {priceValue[1]}</strong>
        </span>
      </div>
    </div>
  );
};

export default ByPrice;
