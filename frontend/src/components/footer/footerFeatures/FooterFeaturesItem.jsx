import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { AiFillGift } from "react-icons/ai";

const FooterFeaturesItem = () => {
  return (
    <div className="flex gap-5 whitespace-nowrap overflow-x-auto justify-center items-center py-10 ">
      <div className="flex flex-col gap-1 justify-center align-center">
        <TbTruckDelivery className="text-[50px] " />
        <h2 className="text-[18px] font-[500]">Free Shipping</h2>
        <p className="text-[14px] font-[400] text-[rgba(0,0,0,0.7)]">
          For all Orders Over 500 INR
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <TbTruckDelivery className="text-[50px] " />
        <h2 className="text-[18px] font-[500]">30 Days Returns</h2>
        <p className="text-[14px] font-[400] text-[rgba(0,0,0,0.7)]">
          For an Exchange Product
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <TbTruckDelivery className="text-[50px] " />
        <h2 className="text-[18px] font-[500]">Special Gifts</h2>
        <p className="text-[14px] font-[400] text-[rgba(0,0,0,0.7)]">
          Our First Product Order
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <TbTruckDelivery className="text-[50px] " />
        <h2 className="text-[18px] font-[500]">Secured Payment</h2>
        <p className="text-[14px] font-[400] text-[rgba(0,0,0,0.7)]">
          Payment Cards Accepted
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <TbTruckDelivery className="text-[50px] " />
        <h2 className="text-[18px] font-[500]">Support 24/7</h2>
        <p className="text-[14px] font-[400] text-[rgba(0,0,0,0.7)]">
          Contact us Anytime
        </p>
      </div>
    </div>
  );
};
export default FooterFeaturesItem;
