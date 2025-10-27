import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiMapPin,
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAppContext } from "../../context/AppContext.jsx";
import "./navbar.scss";

const NAV_LINKS = [
  {
    label: "New Arrivals",
    to: { pathname: "/" },
  },
  {
    label: "Women",
    to: { pathname: "/", search: "?category=women" },
  },
  {
    label: "Men",
    to: { pathname: "/", search: "?category=men" },
  },
  {
    label: "Accessories",
    to: { pathname: "/", search: "?category=accessories" },
  },
  {
    label: "Sale",
    to: { pathname: "/", search: "?category=sale" },
  },
];

const Navbar = () => {
  const { theme, toggleTheme } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand" aria-label="Luxe homepage">
          <span className="navbar__brand-icon">
            <FiMapPin />
          </span>
          <span className="navbar__brand-name">Luxe</span>
        </Link>

        <button
          type="button"
          className="navbar__menu-toggle"
          onClick={handleMenuToggle}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className={`navbar__links ${isMenuOpen ? "is-open" : ""}`}>
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive, location }) => {
                const matches = item.match ? item.match(location) : isActive;
                return `navbar__link ${matches ? "is-active" : ""}`;
              }}
              onClick={handleNavLinkClick}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__icon-button"
            aria-label="Search"
          >
            <FiSearch />
          </button>
          <button
            type="button"
            className="navbar__icon-button"
            aria-label="Account"
          >
            <FiUser />
          </button>
          <button
            type="button"
            className="navbar__icon-button"
            aria-label="Shopping bag"
          >
            <FiShoppingBag />
          </button>
          <button
            type="button"
            className="navbar__icon-button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
