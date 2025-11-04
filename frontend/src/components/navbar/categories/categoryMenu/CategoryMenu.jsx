import Button from "@mui/material/Button";
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoChevronDownOutline, IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

const CategoryMenu = ({ open, setOpen }) => {
  const toggleDrawer = () => () => {
    setOpen(!open);
  };

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation">
      <img
        src="https://ik.imagekit.io/sl8w2ayuc/Gemini_Generated_Image_403r65403r65403r.png?updatedAt=1762258564244"
        alt="logo.png"
        className="max-w-[140px] object-cover ml-3"
      />

      <h3 className="p-3 text-[16px] font-[500] flex items-center justify-between">
        Shop By Categories{" "}
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[20px] "
        />
      </h3>

      <div className="category-menu-list">
        <ul className="w-full">
          <li className="list-none flex items-center relative ">
            <Button className="w-full !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
              Fashion
            </Button>
            <FaRegSquarePlus className="absolute top-1/2 right-6 transform -translate-y-1/2" />

            <ul className="submenu absolute w-full top-[100%]  items-center">
              <li className="list-none relative flex items-center w-full pr-[15%] pl-[5%]">
                <Button className="w-full !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
                  Men
                </Button>
                <FaRegSquarePlus className="absolute top-1/2 right-6 transform -translate-y-1/2" />
              </li>
              <li className="list-none relative flex items-center w-full pr-[15%] pl-[5%]">
                <Button className="w-full !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
                  Women
                </Button>
                <FaRegSquarePlus className="absolute top-1/2 right-6 transform -translate-y-1/2" />
              </li>
              <li className="list-none relative flex items-center w-full pr-[15%] pl-[5%]">
                <Button className="w-full !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
                  Boys
                </Button>
                <FaRegSquarePlus className="absolute top-1/2 right-6 transform -translate-y-1/2" />
              </li>
              <li className="list-none relative flex items-center w-full pr-[15%] pl-[5%]">
                <Button className="w-full !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
                  Girls
                </Button>
                <FaRegSquarePlus className="absolute top-1/2 right-6 transform -translate-y-1/2" />
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Divider />
    </Box>
  );

  return (
    <div className="w-[20%] flex items-center ">
      <Button
        onClick={toggleDrawer()}
        className="flex !justify-between items-center w-full !text-black  "
      >
        <ul className="flex items-center gap-3">
          <li className="list-none text-[22px]">
            <CgMenuLeftAlt />
          </li>
          <li className="list-none text-[15px] font-[500]">Shop By Category</li>
        </ul>
        <IoChevronDownOutline className="list-none text-[16px]" />
      </Button>

      <Drawer open={open} onClose={toggleDrawer()}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default CategoryMenu;
