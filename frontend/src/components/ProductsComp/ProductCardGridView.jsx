import { Link } from "react-router-dom";
import "./ProductCard.css";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { LuExpand } from "react-icons/lu";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

const ProductCardGridView = ({
  productName,
  brandName,
  price,
  rating,
  image1,
  image2,
  href = "/",
}) => {
  return (
    <div className="productCard rounded-md overflow-hidden shadow-md pb-3 flex flex-col justify-between gap-4">
      <Link to={href} className="transition-all">
        <div className="product-imgWrapper w-full overflow-hidden group relative">
          <div className="images h-[250px] overflow-hidden ">
            <img src={image1} alt={productName} className="w-full" />

            <img
              src={image2}
              className="w-full transition-all duration-500 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>

          <div className="productCard-actions flex flex-col items-center gap-2 w-[50px] absolute top-[-130px] right-[3px] opacity-0 transition-all duration-300 group-hover:top-[15px] group-hover:opacity-500">
            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-red-500 hover:!text-white group">
              <LuExpand className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
            </Button>

            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-red-500 hover:!text-white group">
              <BiGitCompare className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
            </Button>

            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-red-500 hover:!text-white group">
              <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
            </Button>
          </div>
        </div>

        <div className="product-info p-3 font-montserrat flex flex-col gap-2">
          <h6 className="text-[13px] font-[500] text-gray-600">{brandName}</h6>
          <h3 className="text-[15px] font-[600]">{productName}</h3>
          <p className="text-[16px] font-[600] text-red-600 flex items-center justify-between">
            {price}
            <span>
             <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
            </span>
          </p>
        </div>
      </Link>

      <div className="productCard-addToCart p-2 w-[90%] m-auto flex gap-4 justify-center items-center border border-red-500 rounded-md text-red-500 cursor-pointer ">
        <HiOutlineShoppingCart size={22} />
        <button className="uppercase text-[14px] cursor-pointer">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCardGridView;
