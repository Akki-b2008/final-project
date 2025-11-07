import React from "react";
import { Link } from "react-router-dom";

const BannerBox = (props) => {
  return (
    <Link to="/">
      <div className="box bannerBox overflow-hidden rounded-[8px] group">
        <img
          src={props.img}
          alt="banner1"
          className="w-full group-hover:scale-105 transition-all"
        />
      </div>
    </Link>
  );
};

export default BannerBox;
