import "./navbar.scss";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Navbar() {
  return (
    <div className="navbar flex justify-between items-center gap-4 w-full py-4 px-8 h-18 border-b-2 border-gray-300 ">
      <div className="w-[30%] t">
        {/* <img
          src="../../public/logo/logo.png"
          alt="logo.png"
          className="max-w-[140px] h-full object-cover"
        /> */}
        logo
      </div>

      <div className="w-[40%] text-center relative navbar-search-bar">
        <input
          type="text"
          className="navbar-search-input w-full h-12 bg-[#E5E5E5] px-4 py-2 rounded-[5px] border-none focus:outline-none text-[18px] text-[#515151]"
          placeholder="what are you looking for..."
        />
        <Button className="!absolute right-[8px] top-[5px] z-[50] !w-[40px] !min-w-[40px] !h-[40px] !rounded-full !text-[#383737]">
          <IoSearch className="text-2xl"/>
        </Button>
      </div>

      <div className="flex justify-end w-[30%] text-center mr-4">
        <ul className="list-style-none flex gap-10 items-center text-[#515151]">
          <li className="text-[18px]">
            <Link to="/login">Login | </Link>
            <Link to="/register">Register</Link>
          </li>
          <li className="text-[24px]">
            <Link to="/favorites">
              <FaRegHeart />
            </Link>
          </li>
          <li className="text-[26px]">
            <Link to="/cart">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="primary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
