import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { AiFillGift } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoWalletOutline } from "react-icons/io5";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { PiKeyReturn } from "react-icons/pi";

const FooterFeatures = () => {
  return (
    <div className="flex gap-7 md:gap-12  whitespace-nowrap overflow-x-auto items-center font-montserrat justify-start md:justify-center pb-10">
      <div className="flex-none flex flex-col gap-1 items-center ">
        <LiaShippingFastSolid className="text-[42px]" />
        <h2 className="text-[16px] font-[500]">Free Shipping</h2>
        <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.7)]">
          For all Orders Over 500 INR
        </p>
      </div>

      <div className="flex-none flex flex-col gap-1 items-center ">
        <PiKeyReturn className="text-[42px]" />
        <h2 className="text-[16px] font-[500]">30 Days Returns</h2>
        <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.7)]">
          For an Exchange Product
        </p>
      </div>

      <div className="flex-none flex flex-col gap-1 items-center ">
        <LiaGiftSolid className="text-[42px]" />
        <h2 className="text-[16px] font-[500]">Special Gifts</h2>
        <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.7)]">
          Our First Product Order
        </p>
      </div>

      <div className="flex-none flex flex-col gap-1 items-center ">
        <IoWalletOutline className="text-[42px]" />
        <h2 className="text-[16px] font-[500]">Secured Payment</h2>
        <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.7)]">
          Payment Cards Accepted
        </p>
      </div>

      <div className="flex-none flex flex-col gap-1 items-center ">
        <BiSupport className="text-[42px]" />
        <h2 className="text-[16px] font-[500]">Support 24/7</h2>
        <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.7)]">
          Contact us Anytime
        </p>
      </div>
    </div>
  );
};
export default FooterFeatures;
