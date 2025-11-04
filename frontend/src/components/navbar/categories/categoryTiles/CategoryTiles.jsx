const CategoryTiles = () => {
  return (
    <div className="ml-2 w-[80%]">
      <ul className="flex items-center gap-10 ">
        <li className="link relative cursor-pointer transition text-[15px] font-[500]">Home</li>
        <li className="link relative cursor-pointer transition text-[15px] font-[500]">
          Fashion
          {/* <ul className="absolute top-[190%] left-0  bg-white border-1-gray-300 shadow-md p-4  ">
            <li className="link">Clothing</li>
            <li className="link">Accessories</li>
            <li className="link">Footwear</li>
          </ul> */}
        </li>
        <li className="link relative cursor-pointer transition text-[15px] font-[500]">Electronics</li>
        <li className="link relative cursor-pointer transition text-[15px] font-[500]">Bags</li>
        <li className="link relative cursor-pointer transition text-[15px] font-[500]">Footwear</li>
        <li className="link relative cursor-pointer transition text-[15px] font-[500]">Groceries</li>
        <li className="link relative cursor-pointer transition text-[15px] font-[500]">Beauty</li>
        <li className="link relative cursor-pointer transition text-[15px] font-[500]">Wellness</li>
        <li className="link relative cursor-pointer transition text-[15px] font-[500]">Jewellery</li>
      </ul>
    </div>
  );
};

export default CategoryTiles;
