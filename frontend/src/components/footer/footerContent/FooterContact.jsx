import { TiMessage } from "react-icons/ti";

const FooterContact = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 font-montserrat mb-4">
        <h2 className="text-[18px]  font-[600]">Contact us</h2>
        <p className="text-[13px] ">
          Classyshop - Mega Super Store
          <br />
          507-Union Trade Centre France
        </p>
      </div>

      <div className="flex flex-col gap-2 font-montserrat mb-4">
        <p>sales@.pixelbay.com</p>
        <h1 className="text-[22px] text-red-500">
          <span>(+91)</span> 8596748596
        </h1>
      </div>

      <div className="flex gap-2 items-center font-montserrat">
        <TiMessage className="text-[45px] text-red-500 " />
        <h2 className="text-[15px] font-[600]">
          Online Chat
          <br />
          Get Expert Help
        </h2>
      </div>
    </div>
  );
};

export default FooterContact;
