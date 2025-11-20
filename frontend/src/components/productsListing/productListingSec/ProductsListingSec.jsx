import Button from "@mui/material/Button";
import { IoGridSharp } from "react-icons/io5";
import ProductCardGridView from "../../ProductsComp/ProductCardGridView";
import ProductCardListView from "../../ProductsComp/ProductCardListView";
import { IoMenuSharp } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const productsData = [
  {
    id: 1,
    productName: "Women Wide Leg",
    brandName: "Soylent Green",
    price: "₹799",
    rating: 2.7,
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/442317554_grey/men-striped-scarved-with-tassels-model-442317554_grey-0-202310061324.jpg?im=Resize=(280,280)",

    href: "/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 2,
    productName: "Minimalist Smartwatch",
    brandName: "GadgetHub",
    price: "₹4,999",
    rating: 3.3,
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/442317554_grey/men-striped-scarved-with-tassels-model-442317554_grey-0-202310061324.jpg?im=Resize=(280,280)",
    href: "/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 3,
    productName: "Leather Office Bag",
    brandName: "Urban Street",
    price: "₹2,499",
    rating: 4,
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/442317554_grey/men-striped-scarved-with-tassels-model-442317554_grey-0-202310061324.jpg?im=Resize=(280,280)",
    href: "/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 4,
    productName: "Wireless Earbuds",
    brandName: "SoundWave",
    price: "₹1,799",
    rating: 4.7,
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/442317554_grey/men-striped-scarved-with-tassels-model-442317554_grey-0-202310061324.jpg?im=Resize=(280,280)",
    href: "/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 5,
    productName: "Fitness Tracker",
    brandName: "WellnessPro",
    price: "₹1,299",
    rating: 1,
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/442317554_grey/men-striped-scarved-with-tassels-model-442317554_grey-0-202310061324.jpg?im=Resize=(280,280)",
    href: "/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 6,
    productName: "Casual Sneakers",
    brandName: "StreetStyle",
    price: "₹2,199",
    rating: 5,
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/442317554_grey/men-striped-scarved-with-tassels-model-442317554_grey-0-202310061324.jpg?im=Resize=(280,280)",
    href: "/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 7,
    productName: "Denim Jacket",
    brandName: "Blue Horizon",
    price: "₹1,999",
    rating: 3,
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/442317554_grey/men-striped-scarved-with-tassels-model-442317554_grey-0-202310061324.jpg?im=Resize=(280,280)",
    href: "/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 8,
    productName: "Classic Aviators",
    brandName: "SunGuard",
    price: "₹999",

    rating: 2,
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/442317554_grey/men-striped-scarved-with-tassels-model-442317554_grey-0-202310061324.jpg?im=Resize=(280,280)",
    href: "/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 9,
    productName: "Classic Aviators",
    brandName: "SunGuard",
    price: "₹999",

    rating: 3,
    image1:
      "https://www.jiomart.com/images/product/original/420500217_red/men-typographic-print-slim-fit-crew-neck-t-shirt-model-420500217_red-0-202506231016.jpg?im=Resize=(280,280)",
    image2:
      "https://www.jiomart.com/images/product/original/442317554_grey/men-striped-scarved-with-tassels-model-442317554_grey-0-202310061324.jpg?im=Resize=(280,280)",
    href: "/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const ProductsListingSec = () => {
  const [isProductView, setIsProductView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="productsListingWrapper overflow-visible w-[80%] py-6">
      <div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between sticky top-34 z-10">
        <div className="productListing-col1  flex items-center ">
          <Button
            className={`!capitalize !rounded-[50px] !w-[34px] !h-[34px] !min-w-[34px] !font-montserrat !font-[500] !text-[16px] !text-[rgba(0,0,0,0.7)] ${
              isProductView === "list" ? "!bg-[rgb(203,201,201)]" : ""
            }
               `}
            onClick={() => setIsProductView("list")}
          >
            <IoMenuSharp
              className={`text-[22px] ${
                isProductView === "list" ? "text-red-500" : ""
              }`}
            />
          </Button>

          <Button
            className={`!capitalize !rounded-[50px]  !w-[32px] !h-[32px] !min-w-[32px] !font-montserrat !font-[500] !text-[16px] !text-[rgba(0,0,0,0.7)] ${
              isProductView === "grid" ? "!bg-[rgb(203,201,201)]" : ""
            }
               `}
            onClick={() => setIsProductView("grid")}
          >
            <IoGridSharp
              className={`text-[22px] ${
                isProductView === "grid" ? "text-red-500 " : ""
              }`}
            />
          </Button>

          <span className="font-montserrat ml-3 text-[16px] text-[rgba(0,0,0,0.7)] font-[500]">
            There are 9 products.
          </span>
        </div>

        <div className="productListing-col2 flex items-center gap-2">
          <span className="font-montserrat ml-3 text-[16px] text-[rgba(0,0,0,0.7)] font-[500]">
            Sort by :
          </span>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="!text-[rgba(0,0,0,0.7)] !pl-2 !mr-3 !bg-white !text-[12px] font-[400] !font-montserrat"
          >
            Relevance
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem
              onClick={handleClose}
              className="!text-black !pl-2  !text-[13px] !font-[500] !px-[20px] !hover:bg-[rgba(0,0,0,0.5)]"
            >
              Name, A to Z
            </MenuItem>

            <MenuItem
              onClick={handleClose}
              className="!text-black !pl-2  !text-[13px] !font-[500] !px-[20px] !hover:bg-[rgba(0,0,0,0.5)]"
            >
              Name, Z to A
            </MenuItem>

            <MenuItem
              onClick={handleClose}
              className="!text-black !pl-2  !text-[13px] !font-[500] !px-[20px] !hover:bg-[rgba(0,0,0,0.5)]"
            >
              Price, Low to High
            </MenuItem>

            <MenuItem
              onClick={handleClose}
              className="!text-black !pl-2  !text-[13px] !font-[500] !px-[20px] !hover:bg-[rgba(0,0,0,0.5)]"
            >
              Price, High to Low
            </MenuItem>
          </Menu>
        </div>
      </div>

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {productsData.map(
          (product) =>
            isProductView === "grid" && (
              <ProductCardGridView key={product.id} {...product} />
            )
        )}
      </div>

      <div className="flex flex-col gap-4 ">
        {productsData.map(
          (product) =>
            isProductView === "list" && (
              <ProductCardListView key={product.id} {...product} />
            )
        )}
      </div>
    </div>
  );
};

export default ProductsListingSec;
