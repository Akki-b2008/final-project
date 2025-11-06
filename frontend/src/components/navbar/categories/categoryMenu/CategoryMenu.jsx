import Button from "@mui/material/Button";
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoChevronDownOutline, IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { FaRegMinusSquare } from "react-icons/fa";

const CategoryMenu = ({ openMenu, setOpenMenu }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleDrawer = () => () => {
    setOpenMenu(!openMenu);
  };

  const toggleSubMenuDrawer = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation">
      <img
        src="https://ik.imagekit.io/sl8w2ayuc/Gemini_Generated_Image_403r65403r65403r.png?updatedAt=1762258564244"
        alt="logo.png"
        className="max-w-[140px] object-cover ml-3"
      />

      <h3 className="p-3 text-[18px] font-[500] flex items-center justify-between font-montserrat">
        Shop By Categories
        <IoCloseSharp
          onClick={toggleDrawer()}
          className="cursor-pointer text-[25px] hover:text-red-500"
        />
      </h3>

      <div className="category-menu-list">
        <ul className="w-full  ">
          <li className="list-none flex  items-center relative  flex-col">
            <Button className="w-full !text-left !justify-start !px-3 !py-2 !font-inter !text-black font-[500]">
              Fashion
            </Button>
            {openSubMenu === 0 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(0)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(0)}
              />
            )}

            <ul
              className={` ${
                openSubMenu === 0 ? "opensubmenu" : ""
              } hidden w-full top-[100%]  items-center `}
            >
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6 !text-black font-[500]">
                  Men
                </Button>
              </li>
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6 !text-black font-[500]">
                  Women
                </Button>
              </li>
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6 !text-black font-[500]">
                  Boys
                </Button>
              </li>
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6 !text-black font-[500]">
                  Girls
                </Button>
              </li>
            </ul>
          </li>

          <li className="list-none flex  items-center relative flex-col">
            <Button className="w-full !text-left !justify-start !px-3 !py-2 !font-inter !text-black font-[500]">
              Electronics
            </Button>
            {openSubMenu === 1 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(1)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(1)}
              />
            )}

            <ul
              className={` ${
                openSubMenu === 1 ? "opensubmenu" : ""
              } hidden w-full top-[100%]  items-center `}
            >
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6   !text-black font-[500]">
                  Smart Watches
                </Button>
              </li>
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6   !text-black font-[500]">
                  Laptops
                </Button>
              </li>
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6   !text-black font-[500]">
                  Tablets
                </Button>
              </li>
            </ul>
          </li>

          <li className="list-none flex  items-center relative flex-col">
            <Button className="w-full !font-inter !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
              Bags
            </Button>
            {openSubMenu === 2 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(2)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(2)}
              />
            )}

            <ul
              className={` ${
                openSubMenu === 2 ? "opensubmenu" : ""
              } hidden w-full top-[100%]  items-center `}
            >
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6   !text-black font-[500]">
                  Men Bags
                </Button>
              </li>
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6   !text-black font-[500]">
                  Women Bags
                </Button>
              </li>
            </ul>
          </li>

          <li className="list-none flex  items-center relative flex-col">
            <Button className="w-full !font-inter !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
              Footwear
            </Button>
            {openSubMenu === 3 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(3)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(3)}
              />
            )}

            <ul
              className={` ${
                openSubMenu === 3 ? "opensubmenu" : ""
              } hidden w-full top-[100%]  items-center `}
            >
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6   !text-black font-[500]">
                  Men footwear
                </Button>
              </li>
              <li className="list-none relative flex items-center w-full ">
                <Button className="w-full  !text-left !justify-start !p-2 !pl-6   !text-black font-[500]">
                  Women footwear
                </Button>
              </li>
            </ul>
          </li>

          <li className="list-none flex  items-center relative flex-col">
            <Button className="w-full !font-inter !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
              Groceries
            </Button>
            {openSubMenu === 4 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(4)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(4)}
              />
            )}
          </li>

          <li className="list-none flex  items-center relative flex-col">
            <Button className="w-full !font-inter !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
              Beauty
            </Button>
            {openSubMenu === 5 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(5)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(5)}
              />
            )}
          </li>

          <li className="list-none flex  items-center relative flex-col">
            <Button className="w-full !font-inter !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
              Wellness
            </Button>
            {openSubMenu === 6 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(6)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(6)}
              />
            )}
          </li>

          <li className="list-none flex  items-center relative flex-col">
            <Button className="w-full !font-inter !text-left !justify-start !px-3 !py-2 !text-black font-[500]">
              jewellery
            </Button>
            {openSubMenu === 7 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(7)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-6 cursor-pointer hover:text-red-500"
                onClick={() => toggleSubMenuDrawer(7)}
              />
            )}
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
          <li className="list-none text-[15px] font-[500] font-montserrat">
            Shop By Category
          </li>
        </ul>
        <IoChevronDownOutline className="list-none text-[16px]" />
      </Button>

      <Drawer open={openMenu} onClose={toggleDrawer()}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default CategoryMenu;
