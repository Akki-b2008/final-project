import React from "react";

const FooterCompany = () => {
  return (
    <div className="font-montserrat ">
      <ul className="font-[600] text-[18px] mb-2">Our Company</ul>
      <li className="list-none text-[13px] mb-2 cursor-pointer hover:text-red-500 text-[rgba(104,100,100,0.99)]">
        Delivery
      </li>

      <li className="list-none text-[13px] mb-2 cursor-pointer hover:text-red-500 text-[rgba(104,100,100,0.99)]">
        Legal Notice
      </li>

      <li className="list-none text-[13px] mb-2 cursor-pointer hover:text-red-500 text-[rgba(104,100,100,0.99)]">
        Terms and conditions of use
      </li>

      <li className="list-none text-[13px] mb-2 cursor-pointer hover:text-red-500 text-[rgba(104,100,100,0.99)]">
        About us
      </li>

      <li className="list-none text-[13px] mb-2 cursor-pointer hover:text-red-500 text-[rgba(104,100,100,0.99)]">
        Secure payment
      </li>
    </div>
  );
};

export default FooterCompany;
