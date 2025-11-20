import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="w-[20%] max-w-[130px] ">
      <Link to="/">
        <img
          src="https://ik.imagekit.io/sl8w2ayuc/Gemini_Generated_Image_403r65403r65403r.png?updatedAt=1762258564244"
          alt="logo.png"
          className=" h-full object-cover bg-red-200"
        />
      </Link>
    </div>
  );
};

export default Logo;
