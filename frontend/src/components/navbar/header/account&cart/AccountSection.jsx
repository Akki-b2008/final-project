import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const AccountSection = () => {
  return (
    <div className="account-section flex justify-end w-[20%] text-center mr-4">
      <ul className="list-style-none flex gap-4 items-center text-[#515151]">
        <li className="link text-[18px] ">
          <Link to="/login">Login</Link>
        </li>
        |
        <li className="link text-[18px] ">
          <Link to="/register">Register</Link>
        </li>
        <li className="text-[24px]">
          <Link to="/favourites">
            <IconButton aria-label="favourites">
              <Tooltip title="Favourites" placement="bottom">
                <FaRegHeart />
              </Tooltip>
            </IconButton>
          </Link>
        </li>
        <li className="text-[26px]">
          <Link to="/cart">
            <IconButton aria-label="cart">
              <Tooltip title="Cart" placement="bottom">
                <StyledBadge badgeContent={98} color="primary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </Tooltip>
            </IconButton>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AccountSection;
