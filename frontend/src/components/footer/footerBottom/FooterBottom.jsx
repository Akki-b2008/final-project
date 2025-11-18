import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterBottom = () => {
  return (
    <div className="flex flex-col items-center bg-white py-4  border-t border-[rgba(121,120,120,0.5)]">
      <div className="flex gap-4 mb-4">
        <Link
          to={"https://www.linkedin.com/in/akash-rathore-652955239/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="p-[10px] text-[20px]  border rounded-[50px] border-[rgba(121,120,120,0.5)]
        hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <FaLinkedinIn />
          </button>
        </Link>

        <Link
          to={"https://x.com/Akashb_2008"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="p-[10px] text-[20px]  border rounded-[50px] border-[rgba(121,120,120,0.5)]
        hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <FaXTwitter />
          </button>
        </Link>

        <Link
          to={"https://github.com/Akki-b2008"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="p-[10px] text-[20px]  border rounded-[50px] border-[rgba(121,120,120,0.5)]
        hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <FaGithub />
          </button>
        </Link>
      </div>

      <h3 className="font-montserrat text-[14px]">
        © 2025 -MicroServices based Ecommerce Project
      </h3>

      <div></div>
    </div>
  );
};

export default FooterBottom;
