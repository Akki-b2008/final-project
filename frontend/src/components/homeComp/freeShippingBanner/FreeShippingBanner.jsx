import { LiaShippingFastSolid } from "react-icons/lia";

const FreeShippingBanner = () => {
  return (
    <div className="container ">
      <div
        className="freeShipping w-[80%] m-auto py-4 px-6
        flex items-center justify-between border-[red] border-2 bg-white rounded-[6px] shadow-md"
      >
        <div className="freeShipping-col1 text-center flex items-center gap-4">
          <LiaShippingFastSolid className="text-[50px]" />
          <span className="text-[20px] uppercase font-montserrat font-[600]">
            Free Shipping
          </span>
        </div>

        <div className="freeShipping-col2 font-inter">
          <p>Free Delivery Now On Your First Order and over 500 INR</p>
        </div>

        <h1 className="font-bold text-xl ">- Only 500 INR*</h1>
      </div>
    </div>
  );
};

export default FreeShippingBanner;
