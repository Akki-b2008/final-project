import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const CategoryTiles = () => {
  return (
    <div className="ml-2 w-[80%]">
      <ul className="category-tiles flex items-center gap-10 ">
        <li className="hover:text-red-500 relative cursor-pointer transition text-[15px] font-[500]">
          <Link to="/">Home</Link>
        </li>

        <li className="hover:text-red-500 relative cursor-pointer transition text-[15px] font-[500]">
          <Link to="/">Fashion</Link>
          <div className="submenu absolute top-[180%] left-[0%] border-1-gray-300 bg-white shadow-md  min-w-[200px] opacity-0 transition-all ">
            <ul className=" flex flex-col gap-2">
              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Men
                  </Button>
                </Link>
              </li>

              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Women
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Boys
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Girls
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="hover:text-red-500 relative cursor-pointer transition text-[15px] font-[500]">
          <Link to="/">Electronics</Link>
          <div className="submenu absolute top-[180%] left-[0%] border-1-gray-300 bg-white shadow-md  min-w-[200px] opacity-0 transition-all ">
            <ul className=" flex flex-col gap-2">
              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Smart Watches
                  </Button>
                </Link>
              </li>

              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Laptops
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Mobiles
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Girls
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="hover:text-red-500 relative cursor-pointer transition text-[15px] font-[500]">
          <Link to="/">Bags</Link>
          <div className="submenu absolute top-[180%] left-[0%] border-1-gray-300 bg-white shadow-md  min-w-[200px] opacity-0 transition-all ">
            <ul className=" flex flex-col gap-2">
              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Men Bags
                  </Button>
                </Link>
              </li>

              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Women Bags
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="hover:text-red-500 relative cursor-pointer transition text-[15px] font-[500]">
          <Link to="/">Footwear</Link>
          <div className="submenu absolute top-[180%] left-[0%] border-1-gray-300 bg-white shadow-md  min-w-[200px] opacity-0 transition-all ">
            <ul className=" flex flex-col gap-2">
              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Men Footwears
                  </Button>
                </Link>
              </li>

              <li>
                <Link to="/">
                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none !pl-4">
                    Women Footwears
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="hover:text-red-500 relative cursor-pointer transition text-[15px] font-[500]">
          <Link to="/">Groceries</Link>
        </li>

        <li className="hover:text-red-500 relative cursor-pointer transition text-[15px] font-[500]">
          <Link to="/">Beauty</Link>
        </li>

        <li className="hover:text-red-500 relative cursor-pointer transition text-[15px] font-[500]">
          <Link to="/">Wellness</Link>
        </li>

        <li className="hover:text-red-500 relative cursor-pointer transition text-[15px] font-[500]">
          <Link to="/">Jewellery</Link>
        </li>
      </ul>
    </div>
  );
};

export default CategoryTiles;
