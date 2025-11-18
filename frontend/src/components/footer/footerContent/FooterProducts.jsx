import React from "react";

const FooterProducts = () => {
  return (
    <div className="font-montserrat ">
      <ul className="font-[600] text-[18px] mb-2">Products</ul>
      <li className="list-none text-[13px] mb-2 cursor-pointer hover:text-red-500 text-[rgba(104,100,100,0.99)]">
        Prices drop
      </li>

      <li className="list-none text-[13px] mb-2 cursor-pointer hover:text-red-500 text-[rgba(104,100,100,0.99)]">
        New products
      </li>

      <li className="list-none text-[13px] mb-2 cursor-pointer hover:text-red-500 text-[rgba(104,100,100,0.99)]">
        Best sales
      </li>

      <li className="list-none text-[13px] mb-2 cursor-pointer hover:text-red-500 text-[rgba(104,100,100,0.99)]">
        Contact us
      </li>

      <li className="list-none text-[13px] mb-2 cursor-pointer hover:text-red-500 text-[rgba(104,100,100,0.99)]">
        Stores
      </li>
    </div>
  );
};

export default FooterProducts;
