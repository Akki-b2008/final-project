import Button from "@mui/material/Button";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className="w-[40%] text-center relative navbar-search-bar">
      <input
        type="text"
        className="navbar-search-input w-full h-12 bg-[#E5E5E5] px-4 py-2 rounded-[5px] border-none focus:outline-none text-[18px] text-[#515151]"
        placeholder="what are you looking for..."
      />
      <Button className="!absolute right-[8px] top-[5px] z-[50] !w-[40px] !min-w-[40px] !h-[40px] !rounded-full !text-[#515151]">
        <IoSearch className="text-2xl" />
      </Button>
    </div>
  );
};

export default Search;
