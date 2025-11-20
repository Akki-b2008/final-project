import "./navbar.css";
import Search from "../navbar/header/search/Search";
import Logo from "../navbar/header/logo/Logo";
import AccountSection from "./header/account&cart/AccountSection";
import CategoryMenu from "../navbar/categories/categoryMenu/CategoryMenu";
import CategoryTiles from "../navbar/categories/categoryTiles/CategoryTiles";
import { useState } from "react";

function Navbar() {
  const [isOpenCategoryMenu, setIsOpenCategoryMenu] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="navbar flex justify-between items-center gap-4 w-full py-6 px-8 h-18 border-b-[1.8px] border-[rgba(204,202,202,0.7)] ">
        <Logo />
        <Search />
        <AccountSection />
      </div>

      <div className="flex items-center gap-10 w-full py-3 px-8 border-b-2 shadow-md border-gray-300">
        <CategoryMenu
          openMenu={isOpenCategoryMenu}
          setOpenMenu={setIsOpenCategoryMenu}
        />
        <CategoryTiles />
      </div>
    </nav>
  );
}

export default Navbar;
