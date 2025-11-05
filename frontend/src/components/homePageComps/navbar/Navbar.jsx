import "./navbar.scss";
import Search from "../../homePageComps/navbar/header/search/Search";
import Logo from "../../homePageComps/navbar/header/logo/Logo";
import AccountSection from "./header/account&cart/AccountSection";
import CategoryMenu from "../../homePageComps/navbar/categories/categoryMenu/CategoryMenu";
import CategoryTiles from "../../homePageComps/navbar/categories/categoryTiles/CategoryTiles";
import { useState } from "react";

function Navbar() {
  const [isOpenCategoryMenu, setIsOpenCategoryMenu] = useState(false);

  return (
    <nav>
      <div className="navbar flex justify-between items-center gap-4 w-full py-6 px-8 h-18 border-b-1 border-gray-300 ">
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
