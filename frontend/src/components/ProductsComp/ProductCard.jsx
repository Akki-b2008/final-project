import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const ProductCard = ({ title, subtitle, price, image, href = "/" }) => {
  return (
    <div className="productCard rounded-md overflow-hidden shadow-md">
      <Link to={href} className="transition-all">
        <div className="product-imgWrapper 
        w-[100%] h-[230px] overflow-hidden rounded-md">
          <img
            src={image}
            alt={title}
            className="w-full"
          />
        </div>

        <div className="product-info p-3 font-montserrat ">
          <h6 className="link title text-[14px] font-[500] text-gray-600">{subtitle}</h6>

          <h3 className="link text-[16px] font-[600] mb-2">{title}</h3>

          <p className="text-[16px] font-[600] text-red-600">{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
